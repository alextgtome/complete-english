
(()=>{
const data=window.CE_DATA;
const esc=s=>String(s??'').replaceAll('&','&amp;').replaceAll('<','&lt;').replaceAll('>','&gt;').replaceAll('"','&quot;').replaceAll("'",'&#39;');
const pad=n=>String(n).padStart(3,'0'), link=n=>'day-'+pad(n)+'.html';
const dateNice=iso=>new Date(iso+'T12:00:00Z').toLocaleDateString('en-GB',{weekday:'long',day:'numeric',month:'long',year:'numeric',timeZone:'UTC'});
const el=document.getElementById('root');if(!el)return;
const gh='https://github.com/alextgtome/complete-english';
const timeBlock='<div class="times">'+[['15','Forgotten foundations'],['35','Natural chunks'],['30','Speaking'],['10','Writing']].map(t=>'<div class="time"><b>'+t[0]+'</b><small>'+t[1]+' · minutes</small></div>').join('')+'</div>';
function overview(){const ds=data.days.slice().reverse();el.innerHTML='<div class="eyebrow">AN OPEN STUDY EXPERIMENT · 150 DAYS</div><div class="head"><div><h1>Speak more naturally.<br>One day at a time.</h1><p class="lead">A free, browser-based learning experiment for people who understand English but need more practice producing natural sentences. Guided chunks, substitution drills and speaking exercises.</p></div><span class="pill">29 OCT 2026 — 27 MAR 2027</span></div><div class="notice"><b>New here?</b> Try the <a href="start.html">free 12-minute guided speaking demo</a> before the course archive. No account required.</div><div class="stats"><div class="stat"><b>'+ds.length+'</b><small>Historical lessons available</small></div><div class="stat"><b>150</b><small>Days in the programme</small></div><div class="stat"><b>90 min</b><small>Daily learning routine</small></div><div class="stat"><b>'+Object.keys(data.G).length+'</b><small>Distinct recorded chunks through Day 16</small></div></div><div class="notice"><b>Historical archive:</b> Days 1–16 are HTML study adaptations of the archived worksheets. Older worksheets used different minute allocations; their teaching themes are preserved while the website uses the new 15 + 35 + 30 + 10 schedule. Day 7 and Day 12 first-occurrence labels have been corrected.</div><div class="actions"><h2>Lesson archive</h2><input class="search" id="search" placeholder="Search day or topic…" aria-label="Search lessons"></div><div class="cards" id="cards">'+ds.map(d=>'<a class="day" data-hay="'+esc((d.day+' '+d.theme).toLowerCase())+'" href="lessons/'+link(d.day)+'"><small>DAY '+pad(d.day)+' / 150</small><h3>'+esc(d.theme)+'</h3><p>'+dateNice(d.date)+'</p></a>').join('')+'</div><footer>Complete English · Browser-only notes and checklists · <a href="'+gh+'">GitHub source</a></footer>';
const s=document.getElementById('search');s.addEventListener('input',()=>{const q=s.value.toLowerCase();document.querySelectorAll('.day').forEach(c=>c.hidden=!c.dataset.hay.includes(q))});}
function seqHTML(seq){return '<div class="substitution"><h3>'+esc(seq.name)+'</h3><div class="base">'+esc(seq.base)+'</div>'+seq.steps.map((s,i)=>'<div class="cue"><span><b>'+(i+1)+'.</b> '+esc(s.from)+' <b>→</b> '+esc(s.to)+'</span><button type="button" class="btn" data-answer="ans-'+seq.name.replaceAll(/[^A-Za-z0-9]/g,'')+'-'+i+'">Reveal</button></div><div id="ans-'+seq.name.replaceAll(/[^A-Za-z0-9]/g,'')+'-'+i+'" class="cue-answer">'+esc(s.result)+'</div>').join('')+'</div>'}
function lesson(){
const num=Number(document.body.dataset.day),d=data.days.find(x=>x.day===num);if(!d){el.textContent='Lesson not found.';return}
const F=data.F[d.micro],rr=data.reflexPool.slice((num*3)%5,(num*3)%5+8);
const today=d.chunks.map(id=>data.G[id]),initial=today.filter(x=>x.d===num).length;
const isInterview=num%7===1||num%7===4, old=num<=10?'Original lesson: 15 / 20 / 45 / 10 minutes.':'Original lesson: 15 / 35 / 30 / 10 minutes.';
const a=data.av[(num-1)%data.av.length],b=data.bv[(num-1)%data.bv.length],f=data.focusDrills[num];
const seqs=num===16?[makeSeq('Everyday conversation',...f),makeSeq('Scheduling and agreement',...window.CE_SPECIAL16B),makeSeq('Technical investigation',...window.CE_SPECIAL16C)]:[makeSeq('Everyday conversation',...a),makeSeq('Workplace practice',...b),makeSeq('Today’s focus chunk',...f)];
const prev=data.days.find(x=>x.day===num-1), prevChunks=prev?prev.chunks.slice(0,2).map(k=>data.G[k].ex):[];
const coachingPrompt=[
  'Act as my interactive English speaking partner for Complete English, Day '+num+'/150 ('+d.date+').',
  'This is a 30-minute speaking session. Treat this as a standalone lesson: you have all the information you need below.',
  'Today’s theme: '+d.theme+'.',
  'Target expressions (use naturally, never force them): '+today.map(c=>c.phrase).join('; ')+'.',
  '',
  'SESSION FLOW:',
  'Part 1 — Everyday conversation (10 minutes). Begin with: '+d.small+' Ask realistic follow-up questions based only on my actual answers.',
  'Part 2 — '+(isInterview?'Interview':'Scenario')+' (15 minutes). Use this opening prompt: '+d.scenario+' Continue with adaptive questions or role-play situations; do not invent my background or give me scripted answers.',
  isInterview?'Part 3 — Feedback (3 minutes): identify up to three meaningful problems you actually heard or read, focusing on clarity, grammar and natural phrasing. Then ask me to retry my answer (2 minutes).':
    'Part 3 — Progressive recap (5 minutes). Ask me to explain the main idea in 60 seconds, then 45, then 30, one attempt at a time. Focus on clarity, not speed.',
  '',
  'COACH RULES:',
  'Ask ONLY ONE question per turn and wait for my spoken answer before continuing.',
  'Sound like a friendly conversation partner, not a lecturer or a scripted quiz.',
  'Use my actual answers for follow-up questions. Do not recite a full script or provide model answers before I attempt the question.',
  'If I hesitate or cannot retrieve a word, encourage me to paraphrase and finish the thought instead of restarting the entire sentence.',
  'Give concise feedback when it helps. Correct no more than three important issues at a checkpoint and let me retry, rather than interrupting every sentence.',
  'Do not invent mistakes, pronunciation feedback, test scores, timing measurements or experiences. If you only have a transcript, be honest about what you can assess.',
  'If I say "next", move to the next part. If I say "retry", repeat the current question.',
  'Start NOW by asking the first everyday conversation question. No introduction and no more than one question.'
].join('\n');
const speakingPanelHtml=speakingPanelHtml+
'<div class="section" id="writing"><h2>05 — Writing & consolidation <small>10 minutes</small></h2><div class="panel"><p>'+esc(d.writing)+'</p><p><b>Essential:</b> Write 2–4 sentences about what you just said. Rewrite one sentence using a chunk. If time permits, extend to 4–8 sentences and rewrite a second one.</p><textarea id="notes" placeholder="Write here. Your draft stays in this browser only." aria-label="Writing notes"></textarea><p class="dim" id="saveMsg">Draft stored locally in your browser, not on GitHub.</p><details class="detail"><summary>Grammar check — reveal after writing</summary><div class="answers">Remember: <b>ended up + -ing</b>, <b>depend on</b>, <b>responsible for + -ing</b>, and <b>on Monday / at 9 a.m.</b>. Correct only relevant patterns rather than forcing every expression into your text.</div></details></div></div>'+
'<div class="section" id="progress"><h2>Completion checklist</h2><div class="panel checks">'+['Forgotten foundations and reflexes','Six chunks and guided substitutions','Spontaneous story, recall and recovery','Speaking and retry','Writing (at least essential version)'].map((x,i)=>'<label><input type="checkbox" data-complete="'+i+'">'+esc(x)+'</label>').join('')+'<p class="small" id="progressLabel">0/5 completed</p>'+(prevChunks.length?'<p class="small"><b>Two review sentences from yesterday:</b><br>'+prevChunks.map(esc).join('<br>')+'</p>':'')+'<p class="small"><b>Learning record:</b> pending actual speaking or writing. Record spontaneous vs prompted chunk use only when observed.</p><p class="small"><b>Chunk register:</b> New today — '+today.filter(c=>c.d===num).map(c=>esc(c.phrase)).join('; ')+' | Reviewed — '+today.filter(c=>c.d!==num).map(c=>esc(c.phrase)+' (Day '+c.d+')').join('; ')+' | Distinct cumulative through this day: '+Object.values(data.G).filter(c=>c.d<=num).length+'</p><p class="small">Optional: 10–15 minutes of transcript-supported shadowing outside the 90 minutes. Rest your voice when needed.</p></div></div>'+
'<div class="actions"><a href="'+(num>1?link(num-1):'../index.html')+'">← '+(num>1?'Previous day':'Archive')+'</a><a href="../index.html">All lessons</a>'+(num<16?'<a href="'+link(num+1)+'">Next day →</a>':'')+'</div><footer>HTML adaptation of a previously delivered lesson · Your written notes and checkmarks are saved only in this browser · <a href="'+gh+'">GitHub repository</a></footer>';
document.querySelectorAll('.reflex').forEach(b=>b.addEventListener('click',()=>{const opened=b.classList.toggle('open');b.setAttribute('aria-expanded',String(opened))}));
document.querySelectorAll('[data-answer]').forEach(b=>b.addEventListener('click',()=>{const target=document.getElementById(b.dataset.answer);const opened=target.classList.toggle('show');b.textContent=opened?'Hide':'Reveal'}));
const key='complete-english-day-'+pad(num)+'-';const notes=document.getElementById('notes');try{notes.value=localStorage.getItem(key+'writing')||''}catch{} notes.addEventListener('input',()=>{try{localStorage.setItem(key+'writing',notes.value)}catch{}});
function progress(){const all=[...document.querySelectorAll('[data-complete]')];document.getElementById('progressLabel').textContent=all.filter(x=>x.checked).length+'/'+all.length+' completed'}
document.querySelectorAll('[data-complete]').forEach(c=>{try{c.checked=localStorage.getItem(key+'task'+c.dataset.complete)==='true'}catch{}c.addEventListener('change',()=>{try{localStorage.setItem(key+'task'+c.dataset.complete,String(c.checked))}catch{}progress()})});progress();
document.getElementById('copyVoice').addEventListener('click',async ()=>{
  const input=document.getElementById('voice-command');
  const status=document.getElementById('copyStatus');
  try{
    if(!navigator.clipboard || !navigator.clipboard.writeText)throw new Error('Clipboard unavailable');
    await navigator.clipboard.writeText(input.value);
    status.textContent='Copied. Paste into ChatGPT before starting Voice.';
  }catch(err){
    document.querySelector('.voice-preview').open=true;
    input.focus();input.select();
    status.textContent='Text selected. Please copy it manually.';
  }
});
let seconds=60,interval=null;function update(){document.getElementById('clock').textContent=String(Math.floor(seconds/60)).padStart(2,'0')+':'+String(seconds%60).padStart(2,'0')};document.querySelectorAll('[data-secs]').forEach(b=>b.addEventListener('click',()=>{clearInterval(interval);interval=null;seconds=Number(b.dataset.secs);update()}));document.getElementById('timerStart').addEventListener('click',()=>{if(interval){clearInterval(interval);interval=null;return}if(seconds===0)seconds=60;update();interval=setInterval(()=>{seconds=Math.max(0,seconds-1);update();if(seconds===0){clearInterval(interval);interval=null}},1000)})}
function makeSeq(name,base,pairs){let current=base;return {name,base,steps:pairs.map(([from,to])=>{if(!current.includes(from))return {from,to,result:'Check the cue against the previous sentence'};current=current.replace(from,to);return {from,to,result:current}})}}
window.CE_SPECIAL16B=["Tuesday at ten works for me.",[["Tuesday","Thursday"],["ten","eleven"],["me","our team"],["Thursday","Friday"],["eleven","nine"]]];
window.CE_SPECIAL16C=["We should rule out a network issue first.",[["a network issue","a database issue"],["We","The team"],["should","needs to"],["a database issue","a caching problem"],["first","before the release"]]];
if(document.body.dataset.view==='home')overview();else lesson();
})();
