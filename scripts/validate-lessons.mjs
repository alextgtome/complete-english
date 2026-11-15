#!/usr/bin/env node
/**
 * Complete English: static course pre-publication checks.
 * Run: node scripts/validate-lessons.mjs
 *
 * Structural checks and selected grammar regression checks.
 * These do NOT replace a human/LLM editorial review of every exercise.
 */
import fs from 'node:fs';
import path from 'node:path';
import vm from 'node:vm';

const root = process.cwd();
const read = file => fs.readFileSync(path.join(root, file), 'utf8');
const exists = file => fs.existsSync(path.join(root, file));
const errors = [];
const fail = message => errors.push(message);
const truthyText = value => typeof value === 'string' && value.trim().length > 0;
const canonical = value => String(value ?? '')
  .normalize('NFKC').toLowerCase()
  .replace(/[’‘]/g, "'")
  .replace(/[^\p{L}\p{N}]+/gu, ' ')
  .trim().replace(/\s+/g, ' ');
const pad = n => String(n).padStart(3, '0');

let config;
let data;
try {
  config = JSON.parse(read('course.config.json'));
} catch (e) {
  fail('Cannot read course.config.json: ' + String(e));
}
try {
  const context = { window: {} };
  vm.runInNewContext(read('data/lessons.js'), context, { timeout: 1000 });
  data = context.window.CE_DATA;
} catch (e) {
  fail('Cannot read data/lessons.js: ' + String(e));
}
if (!config || !data) {
  console.error(errors.join('\n'));
  process.exit(1);
}
if (config.total_days !== 150 || config.start_date !== '2026-10-29' || config.timezone !== 'America/Sao_Paulo') {
  fail('Course identity/config must retain 150 days, 2026-10-29 start and America/Sao_Paulo timezone');
}
const speakingMix = config.speaking_mix || {};
const scenarioRotation = speakingMix.scenario_type_by_modulo_7 || {};
const expectedRotation = { 0:'everyday', 1:'interview', 2:'workplace', 3:'everyday', 4:'interview', 5:'workplace', 6:'everyday' };
for (const [remainder, expected] of Object.entries(expectedRotation)) {
  if (scenarioRotation[remainder] !== expected) {
    fail('Speaking rotation must assign remainder ' + remainder + ' to ' + expected);
  }
}
for (const [category, count] of [['everyday', 3],['workplace', 2],['interview', 2]]) {
  const field = category + '_scenario_days_per_seven';
  if (speakingMix[field] !== count) fail('Expected '+count+' '+category+' scenario days each week');
}
if (speakingMix.prospective_from_day !== 18) fail('New scenario rotation must apply from Day 18');

const mins = config.daily_minutes || {};
if (mins.foundations !== 15 || mins.chunks !== 35 || mins.speaking !== 30 || mins.writing !== 10) {
  fail('Daily minutes must remain exactly 15 + 35 + 30 + 10');
}
if (Object.values(mins).reduce((sum, n) => sum + n, 0) !== 90) {
  fail('Total daily minutes must equal 90');
}
if (!Array.isArray(data.days) || !data.G || !data.F || !data.focusDrills || !data.av || !data.bv) {
  fail('Registry must contain days, G, F, focusDrills, av and bv');
}
if (errors.length) {
  console.error(errors.join('\n'));
  process.exit(1);
}

const daySet = new Set();
const allIds = new Set();
const firstSeenById = new Map();
const registeredPhrases = new Map();
for (const [id, chunk] of Object.entries(data.G)) {
  if (!truthyText(id) || !chunk || !truthyText(chunk.phrase) ||
      !truthyText(chunk.pt) || !truthyText(chunk.when) || !truthyText(chunk.ex) ||
      !Number.isInteger(chunk.d)) {
    fail('Chunk ' + id + ' is missing first-use day, English expression, PT-BR translation, Quando usar, or example');
    continue;
  }
  const key = canonical(chunk.phrase);
  if (registeredPhrases.has(key)) {
    fail('Duplicate normalized NEW phrase: ' + id + ' (' + chunk.phrase + ') duplicates ' + registeredPhrases.get(key));
  }
  registeredPhrases.set(key, id);
}

const startTime = Date.parse(config.start_date + 'T00:00:00Z');
if (!Number.isFinite(startTime)) fail('Invalid start_date in config');
for (const [index, lesson] of data.days.entries()) {
  const n = lesson?.day;
  if (!Number.isInteger(n) || n < 1 || n > config.total_days) {
    fail('Bad day number at position ' + index);
    continue;
  }
  if (daySet.has(n)) fail('Duplicate day number ' + n);
  daySet.add(n);
  if (index !== n - 1) fail('Lessons must be consecutive and ordered starting at Day 1: found ' + n + ' at index ' + index);
  const expectedDate = new Date(startTime + (n - 1) * 86400000).toISOString().slice(0, 10);
  if (lesson.date !== expectedDate) fail('Day ' + n + ' has date ' + lesson.date + ', expected ' + expectedDate);
  for (const field of ['theme', 'micro', 'small', 'scenario', 'writing']) {
    if (!truthyText(lesson[field])) fail('Day ' + n + ' lacks ' + field);
  }
  if (!data.F[lesson.micro]) fail('Day ' + n + ' uses unknown foundations skill ' + lesson.micro);
  if (!['everyday','workplace','interview'].includes(lesson.scenario_type)) fail('Day '+n+' lacks an accurate scenario_type classification');
  if (n >= speakingMix.prospective_from_day) {
    const required = scenarioRotation[String(n % 7)];
    if (lesson.scenario_type !== required) {
      fail('Day ' + n + ' must have scenario_type "' + required +
           '", got "' + String(lesson.scenario_type) + '"');
    }
  }
  const chunks = lesson.chunks;
  const expectedCount = n === 1 ? 7 : 6;
  if (!Array.isArray(chunks) || chunks.length !== expectedCount) {
    fail('Day ' + n + ': expected ' + expectedCount + ' chunk references');
    continue;
  }
  if (new Set(chunks).size !== chunks.length) fail('Day ' + n + ' repeats a chunk ID in one lesson');
  let newCount = 0;
  let reviewCount = 0;
  for (const id of chunks) {
    const ch = data.G[id];
    if (!ch) {
      fail('Day ' + n + ' refers to nonexistent chunk ID: ' + id);
      continue;
    }
    allIds.add(id);
    if (!firstSeenById.has(id)) firstSeenById.set(id, n);
    if (ch.d === n) newCount++;
    else if (ch.d < n) reviewCount++;
    else fail('Day ' + n + ' references a future new chunk ' + id + ' (first use Day ' + ch.d + ')');
  }
  const knownHistoricalExceptions = config.historical_exceptions || {};
  const requiredNew = knownHistoricalExceptions[String(n)]?.new_count ?? config.chunk_policy.new_per_day;
  if (n >= config.chunk_policy.strict_from_day || knownHistoricalExceptions[String(n)]) {
    if (newCount !== requiredNew || reviewCount !== chunks.length - requiredNew) {
      fail('Day ' + n + ' has ' + newCount + ' NEW and ' + reviewCount +
           ' REVIEW, expected ' + requiredNew + ' NEW and ' + (chunks.length-requiredNew) + ' REVIEW');
    }
  }
  const htmlPath = 'lessons/day-' + pad(n) + '.html';
  if (!exists(htmlPath)) {
    fail('Missing HTML file ' + htmlPath);
  } else {
    const html = read(htmlPath);
    if (!html.includes('data-day="' + n + '"')) fail(htmlPath + ': wrong data-day');
    if (!html.includes('../data/lessons.js') || !html.includes('../assets/app.js')) {
      fail(htmlPath + ': must reference shared course data and renderer');
    }
  }
}
for (const [id, ch] of Object.entries(data.G)) {
  if (!allIds.has(id)) fail('Orphan chunk ' + id + ' is never referenced by any lesson');
  const first = firstSeenById.get(id);
  if (first !== undefined && ch.d !== first) {
    fail('Chunk ' + id + ' is listed as first use Day ' + ch.d + ', but first appears in Day ' + first);
  }
}
const historyFiles = fs.readdirSync(path.join(root, 'lessons')).filter(x => /^day-\d{3}\.html$/.test(x));
for (const filename of historyFiles) {
  const n = Number(filename.slice(4, 7));
  if (!daySet.has(n)) fail('Orphan lesson file without registry record: ' + filename);
}
for (const [name, foundation] of Object.entries(data.F)) {
  if (!Array.isArray(foundation.qs) || !Array.isArray(foundation.ans) ||
      foundation.qs.length < 6 || foundation.qs.length > 10 ||
      foundation.qs.length !== foundation.ans.length) {
    fail('Foundations "' + name + '" must provide 6–10 cue/answer pairs');
  }
}
if (!Array.isArray(data.reflexPool) || data.reflexPool.length < 8) {
  fail('Reflex pool should include at least eight daily-life cue/response pairs');
}

let drillSteps = 0;
const invalidAgreement = [
  /\b(?:our engineers|the engineers|we|they|you|i)\s+(?:checks|does|is|has|works|needs|runs|plans|tests|reviews)\b/i,
  /\b(?:he|she|it)\s+(?:are|do|have)\b/i,
];
function inspectDrill(day, label, item) {
  if (!Array.isArray(item) || !truthyText(item[0]) || !Array.isArray(item[1])) {
    fail('Day ' + day + ', ' + label + ': missing base sentence or cues');
    return;
  }
  const [base, cues] = item;
  if (cues.length < 4 || cues.length > 6) {
    fail('Day ' + day + ', ' + label + ': expected 4–6 substitution cues, got ' + cues.length);
  }
  let current = base;
  for (const [index, cue] of cues.entries()) {
    if (!Array.isArray(cue) || cue.length < 2 || cue.length > 3 ||
        !truthyText(cue[0]) || !truthyText(cue[1])) {
      fail('Day ' + day + ', ' + label + ', step ' + (index+1) + ': invalid cue');
      continue;
    }
    const [from, to, note] = cue;
    if (!current.includes(from)) {
      fail('Day ' + day + ', ' + label + ', step ' + (index+1) +
           ': substring "' + from + '" not found in previous sentence "' + current + '"');
      continue;
    }
    const prior = current;
    current = current.replace(from, to);
    if (current === prior) fail('Day ' + day + ', ' + label + ', step ' + (index+1) + ': no actual change');
    for (const regexp of invalidAgreement) {
      if (regexp.test(current)) {
        fail('Day ' + day + ', ' + label + ', step ' + (index+1) +
             ': likely subject–verb agreement error: "' + current + '"');
        break;
      }
    }
    if (/Our engineers check/.test(current) &&
        /The team checks/.test(prior) && !truthyText(note)) {
      fail('Day ' + day + ', ' + label + ', step ' + (index+1) +
           ': linked subject/verb change requires a grammar note');
    }
    drillSteps++;
  }
}
for (const d of data.days) {
  const n = d.day;
  if (!data.focusDrills[n]) {
    fail('Day ' + n + ' has no focusDrills entry');
    continue;
  }
  const series = n === 16
    ? [data.focusDrills[n], data.specialDrills16?.scheduling, data.specialDrills16?.technical]
    : [data.av[(n-1) % data.av.length], data.bv[(n-1) % data.bv.length], data.focusDrills[n]];
  if (series.length !== 3) fail('Day ' + n + ' must contain exactly three substitution series');
  series.forEach((item, j) => inspectDrill(n, 'series ' + (j+1), item));
}
if (!exists('assets/app.js') || !exists('assets/site.css') || !exists('index.html')) {
  fail('Missing required shared website files');
}
if (errors.length) {
  console.error('\nComplete English validation FAILED (' + errors.length + ' issues):');
  errors.forEach(e => console.error(' - ' + e));
  process.exit(1);
}
console.log('Complete English validation PASSED: ' + data.days.length +
  ' days, ' + Object.keys(data.G).length + ' distinct chunks, ' + drillSteps + ' substitution steps.');
console.log('Note: structural and selected regression checks do not replace editorial English review.');
