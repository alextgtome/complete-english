#!/usr/bin/env node
/**
 * Regression test: render every existing lesson with a lightweight DOM stub.
 *
 * Checks that foundations come first, the six/seven chunk cards belong to
 * one 35-minute block with five explicit steps, and speaking/writing follow.
 * This catches JS syntax/runtime regressions and accidental breakup of the
 * same chunk exercise across unrelated sections.
 */
import fs from 'node:fs';
import vm from 'node:vm';

const registryContext = {window: {}};
vm.runInNewContext(fs.readFileSync('data/lessons.js', 'utf8'), registryContext, {timeout:1500});
const data = registryContext.window.CE_DATA;
if (!data?.days?.length) throw Error('No lesson registry');
const app = fs.readFileSync('assets/app.js', 'utf8');

const selectors = [
  'id="foundations"', 'id="chunks"', 'id="chunk-workflow"',
  'id="chunk-noticing"', 'id="substitutions"', 'id="chunk-story"',
  'id="chunk-recall"', 'id="chunk-recovery"', 'id="speaking"', 'id="writing"'
];
const problems=[];
for (const day of data.days) {
  const n = day.day;
  const root = {innerHTML:'',textContent:''};
  const dummy = () => ({
    dataset:{},value:'',checked:false,textContent:'',
    classList:{toggle:()=>false},addEventListener:()=>{},setAttribute:()=>{},
    focus:()=>{},select:()=>{}
  });
  const doc = {
    body:{dataset:{view:'lesson',day:String(n)}},
    getElementById:id=>id==='root'?root:dummy(),
    querySelectorAll:()=>[]
  };
  try {
    vm.runInNewContext(app,{
      window:{CE_DATA:data},
      document:doc,
      localStorage:{getItem:()=>null,setItem:()=>{}},
      navigator:{}
    },{timeout:2000});
  } catch (e) {
    problems.push('Day '+n+': cannot render: '+String(e));
    continue;
  }
  const html=root.innerHTML;
  const indices=selectors.map(x=>html.indexOf(x));
  if (indices.some(x=>x<0) || indices.some((x,i)=>i>0&&x<=indices[i-1])) {
    problems.push('Day '+n+': the four blocks and five chunk steps are missing or out of order');
  }
  if (!html.includes('same '+day.chunks.length+' expressions you just read') ||
      !html.includes('one 35-minute exercise') ||
      !html.includes('Reading the cards is part of Step 1')) {
    problems.push('Day '+n+': no clear explanation that chunk cards and five steps belong together');
  }
  if ((html.match(/<article class="chunk">/g)||[]).length!==day.chunks.length) {
    problems.push('Day '+n+': chunk cards do not match canonical lesson registry');
  }
  if ((html.match(/STEP [1-5] OF 5/g)||[]).length!==5) {
    problems.push('Day '+n+': must show exactly five numbered practice steps');
  }
  if (html.includes('class="steps"') || html.includes('03 — Guided substitution')) {
    problems.push('Day '+n+': old disconnected substitution layout returned');
  }
  if (!html.includes('id="copyVoice"') || !html.includes('id="notes"')) {
    problems.push('Day '+n+': voice or writing controls missing');
  }
  if (day.noticing&&!html.includes(day.noticing.replaceAll('&','&amp;').replaceAll('<','&lt;').replaceAll('>','&gt;').replaceAll('"','&quot;').replaceAll("'",'&#39;'))) {
    problems.push('Day '+n+': original noticing text missing');
  }
}
if (problems.length){
  console.error('Lesson layout validation FAILED:\n'+problems.map(x=>' - '+x).join('\n'));
  process.exit(1);
}
console.log('Lesson layout validation PASSED: '+data.days.length+
  ' days rendered with all blocks and five connected Natural Chunks steps.');
