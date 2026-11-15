#!/usr/bin/env node
/**
 * Produce a small, deterministic context file for the scheduled lesson agent.
 *
 * Usage:
 *   node scripts/build-generation-index.mjs         # regenerate
 *   node scripts/build-generation-index.mjs --check # fail if committed index is stale
 *
 * Source of truth remains data/lessons.js.
 */
import fs from 'node:fs';
import vm from 'node:vm';

const sourcePath = 'data/lessons.js';
const outputPath = 'data/generation-index.json';
const checkOnly = process.argv.includes('--check');

const ctx = { window: {} };
vm.runInNewContext(fs.readFileSync(sourcePath, 'utf8'), ctx, { timeout: 1500 });
const registry = ctx.window.CE_DATA;
if (!registry || !Array.isArray(registry.days) || !registry.G) {
  console.error('Missing or invalid source registry: ' + sourcePath);
  process.exit(1);
}

const chunks = Object.entries(registry.G)
  .map(([id, value]) => [id, value.phrase, value.d])
  .sort((a,b) => a[2] - b[2] || a[0].localeCompare(b[0]));

const topics = registry.days.map(d => d.scenario_type
  ? [d.day, d.theme, d.micro, d.scenario_type]
  : [d.day, d.theme, d.micro]);

const recent = registry.days.slice(-7).map(d => ({
  day: d.day, date: d.date, theme: d.theme, foundation: d.micro,
  everyday: d.small, scenario: d.scenario,
  ...(d.scenario_type ? { scenario_type: d.scenario_type } : {}),
  new: d.chunks.filter(id => registry.G[id]?.d === d.day),
  review: d.chunks.filter(id => registry.G[id]?.d < d.day),
}));

const last = registry.days.at(-1);
const index = {
  schema_version: 1,
  source: sourcePath,
  latest_day: last?.day ?? 0,
  latest_date: last?.date ?? null,
  lesson_count: registry.days.length,
  distinct_chunks: chunks.length,
  chunks, topics, recent
};
const serialized = JSON.stringify(index) + '\n';
if (checkOnly) {
  if (!fs.existsSync(outputPath)) {
    console.error('Missing generation index: run node scripts/build-generation-index.mjs');
    process.exit(1);
  }
  if (fs.readFileSync(outputPath, 'utf8') !== serialized) {
    console.error('Stale generation index: update data/generation-index.json from the current registry.');
    console.error('Run: node scripts/build-generation-index.mjs');
    process.exit(1);
  }
  console.log('Generation index verified: Day ' + index.latest_day +
    ', ' + index.distinct_chunks + ' distinct chunks, ' + index.recent.length + ' recent lessons.');
} else {
  fs.writeFileSync(outputPath, serialized, 'utf8');
  console.log('Regenerated ' + outputPath + ' (' + serialized.length + ' characters).');
}
