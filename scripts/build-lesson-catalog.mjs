#!/usr/bin/env node
/**
 * Build compact existence manifest and individually classified lesson snapshots.
 *
 * Canonical source: data/lessons.js. The snapshots are DERIVED, not independently
 * editable. A scheduled agent can check the ~300-byte manifest and then fetch
 * only the one corresponding day file without loading the full archive.
 *
 * Usage:
 *   node scripts/build-lesson-catalog.mjs
 *   node scripts/build-lesson-catalog.mjs --check
 */
import fs from 'node:fs';
import path from 'node:path';
import vm from 'node:vm';

const root = process.cwd();
const check = process.argv.includes('--check');
const read = file => fs.readFileSync(path.join(root, file), 'utf8');
const write = (file, content) => {
  const dest = path.join(root, file);
  fs.mkdirSync(path.dirname(dest), { recursive: true });
  fs.writeFileSync(dest, content, 'utf8');
};
const pad = n => String(n).padStart(3, '0');
const ctx = { window: {} };
vm.runInNewContext(read('data/lessons.js'), ctx, { timeout: 1000 });
const data = ctx.window.CE_DATA;
if (!data?.days || !data.focusDrills) throw Error('Missing canonical registry');

const types = new Set(['everyday', 'workplace', 'interview']);
const entries = {};
const expected = new Map();
let last = 0;
for (const lesson of data.days) {
  const n = lesson.day;
  const type = lesson.scenario_type;
  if (!Number.isInteger(n) || n !== last + 1) {
    throw Error('Expected strictly consecutive Day '+(last+1));
  }
  if (!types.has(type)) throw Error('Missing/invalid scenario_type for Day '+n+': '+type);
  if (!data.focusDrills[n]) throw Error('Missing focus drill for Day '+n);
  last = n;
  entries[String(n)] = type;
  const file = 'data/lesson-records/'+type+'/day-'+pad(n)+'.json';
  const record = {
    schema_version: 1,
    day: n,
    type,
    lesson,
    focus_drill: data.focusDrills[n],
    ...(n===16 ? { special_drills: data.specialDrills16 } : {})
  };
  expected.set(file, JSON.stringify(record)+'\n');
}
const manifestPath = 'data/lesson-manifest.json';
expected.set(manifestPath, JSON.stringify({schema_version:1,latest_day:last,days:entries})+'\n');

const allRecordPaths = [];
const base = path.join(root, 'data/lesson-records');
if (fs.existsSync(base)) {
  for (const type of types) {
    const dir = path.join(base, type);
    if (!fs.existsSync(dir)) continue;
    allRecordPaths.push(...fs.readdirSync(dir).filter(x=>x.endsWith('.json')).map(x=>'data/lesson-records/'+type+'/'+x));
  }
}
let problems = [];
for (const [filename, content] of expected) {
  if (check) {
    try {
      if (read(filename) !== content) problems.push('Missing or stale: '+filename);
    } catch (_) { problems.push('Missing or stale: '+filename); }
  } else write(filename, content);
}
if (check) {
  for (const filename of allRecordPaths) {
    if (!expected.has(filename)) problems.push('Untracked stale day record: '+filename);
  }
  if (problems.length) {
    console.error('Lesson catalog FAIL ('+problems.length+'):\n'+problems.join('\n'));
    console.error('Regenerate with: node scripts/build-lesson-catalog.mjs');
    process.exit(1);
  }
  console.log('Lesson catalog OK: '+last+' classified lessons; tiny manifest and individual records match the canonical registry.');
} else {
  console.log('Generated '+expected.size+' files ('+last+' lesson records + 1 manifest).');
}
