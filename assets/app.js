
(()=>{
const data=window.CE_DATA;
const esc=s=>String(s??'').replaceAll('&','&amp;').replaceAll('<','&lt;').replaceAll('>','&gt;').replaceAll('"','&quot;').replaceAll("'",'&#39;');
const pad=n=>String(n).padStart(3,'0'), link=n=>'day-'+pad(n)+'.html';
const dateNice=iso=>new Date(iso+'T12:00:00Z').toLocaleDateString('en-GB',{weekday:'long',day:'numeric',month:'long',year:'numeric',timeZone:'UTC'});
const el=document.getElementById('root');if(!el)return;
const gh='https://github.com/alextgtome/complete-english';
const timeBlock='<div class="times">'+[['15','Forgotten foundations'],['35','Natural chunks'],['30','Speaking'],['10','Writing']].map(t=>'<div class="time"><b>'+t[0]+'</b><small>'+t[1]+' · minutes</small></div>').join('')+'</div>';
function overview(){const ds=data.days.slice().reverse();const latest=data.days.at(-1),latestLink=document.getElementById('latestLessonLink');if(latestLink&&latest){latestLink.href='lessons/'+link(latest.day);latestLink.textContent='Latest lesson · Day '+latest.day;}el.innerHTML='<div class="eyebrow">AN OPEN STUDY EXPERIMENT · 150 DAYS</div><div class="head"><div><h1>Speak more naturally.<br>One day at a time.</h1><p class="lead">A free, browser-based learning experiment for people who understand English but need more practice producing natural sentences. Guided chunks, substitution drills and speaking exercises.</p></div><span class="pill">29 OCT 2026 — 27 MAR 2027</span></div><div class="notice"><b>New here?</b> Try the <a href="start.html">free 12-minute guided speaking demo</a> before the course archive. No account required.</div><div class="stats"><div class="stat"><b>'+ds.length+'</b><small>Published lessons available</small></div><div class="stat"><b>150</b><small>Days in the programme</small></div><div class="stat"><b>90 min</b><small>Daily learning routine</small></div><div class="stat"><b>'+Object.keys(data.G).length+'</b><small>Distinct recorded chunks through latest lesson</small></div></div><div class="notice"><b>Historical archive:</b> Days 1–16 are HTML study adaptations of the archived worksheets. Older worksheets used different minute allocations; their teaching themes are preserved while the website uses the new 15 + 35 + 30 + 10 schedule. Day 7 and Day 12 first-occurrence labels have been corrected.</div><div class="actions archive-controls"><h2>Lesson archive</h2><div class="archive-filters"><label for="typeFilter" class="small">Focus</label><select id="typeFilter" aria-label="Filter lessons by type"><option value="all">All lessons</option><option value="everyday">Everyday</option><option value="workplace">Workplace / Engineering</option><option value="interview">Interview</option></select><input class="search" id="search" placeholder="Search day or topic…" aria-label="Search lessons"></div></div><div class="cards" id="cards">'+ds.map(d=>'<a class="day" data-type="'+esc(d.scenario_type||'workplace')+'" data-hay="'+esc((d.day+' '+d.theme).toLowerCase())+'" href="lessons/'+link(d.day)+'"><small>DAY '+pad(d.day)+' / 150</small><h3>'+esc(d.theme)+'</h3><p>'+dateNice(d.date)+'</p><p class="focus-label">'+esc((d.scenario_type||'workplace')==='workplace'?'Workplace / Engineering':(d.scenario_type||'workplace')==='interview'?'Interview':'Everyday')+'</p></a>').join('')+'</div><footer>Complete English · Browser-only notes and checklists · <a href="'+gh+'">GitHub source</a></footer>';
const s=document.getElementById('search'),type=document.getElementById('typeFilter');function filterArchive(){const q=s.value.toLowerCase().trim(),t=type.value;document.querySelectorAll('.day').forEach(c=>c.hidden=!(c.dataset.hay.includes(q)&&(t==='all'||c.dataset.type===t)))}s.addEventListener('input',filterArchive);type.addEventListener('change',filterArchive);}
function seqHTML(seq){return '<div class="substitution"><h3>'+esc(seq.name)+'</h3><div class="base">'+esc(seq.base)+'</div>'+seq.steps.map((s,i)=>'<div class="cue"><span><b>'+(i+1)+'.</b> '+esc(s.from)+' <b>→</b> '+esc(s.to)+(s.note?'<small class="cue-note">'+esc(s.note)+'</small>':'')+'</span><button type="button" class="btn" data-answer="ans-'+seq.name.replaceAll(/[^A-Za-z0-9]/g,'')+'-'+i+'">Reveal</button></div><div id="ans-'+seq.name.replaceAll(/[^A-Za-z0-9]/g,'')+'-'+i+'" class="cue-answer">'+esc(s.result)+'</div>').join('')+'</div>'}
function lesson(){
const num=Number(document.body.dataset.day),d=data.days.find(x=>x.day===num);if(!d){el.textContent='Lesson not found.';return}
const F=data.F[d.micro],rr=Array.from({length:10},(_,i)=>data.reflexPool[((num*3)+i)%data.reflexPool.length]);
const today=d.chunks.map(id=>data.G[id]),initial=today.filter(x=>x.d===num).length;
const isInterview=num%7===1||num%7===4, old=num<=10?'Original lesson: 15 / 20 / 45 / 10 minutes.':'Original lesson: 15 / 35 / 30 / 10 minutes.';
const scenarioKind=d.scenario_type||(isInterview?'interview':'scenario');
const scenarioLabel=scenarioKind==='workplace'?'Workplace / Engineering':scenarioKind==='everyday'?'Everyday situation':scenarioKind==='interview'?'Interview':'Scenario';
const a=data.av[(num-1)%data.av.length],b=data.bv[(num-1)%data.bv.length],f=data.focusDrills[num];
const seqs=num===16?[makeSeq('Everyday conversation',...f),makeSeq('Scheduling and agreement',...data.specialDrills16.scheduling),makeSeq('Technical investigation',...data.specialDrills16.technical)]:[makeSeq('Everyday conversation',...a),makeSeq('Workplace practice',...b),makeSeq('Today’s focus chunk',...f)];
const prev=data.days.find(x=>x.day===num-1), prevChunks=prev?prev.chunks.slice(0,2).map(k=>data.G[k].ex):[];
const coachingPrompt=[
  'Act as my interactive English speaking partner for Complete English, Day '+num+'/150 ('+d.date+').',
  'This is a 30-minute speaking session. Treat this as a standalone lesson: you have all the information you need below.',
  'Today’s theme: '+d.theme+'.',
  'Main scenario type: '+scenarioKind+'.',
  'Target expressions (use naturally, never force them): '+today.map(c=>c.phrase).join('; ')+'.',
  '',
  'SESSION FLOW:',
  'Part 1 — Everyday conversation (10 minutes). Begin with: '+d.small+' Ask realistic follow-up questions based only on my actual answers.',
  'Part 2 — '+scenarioLabel+' (15 minutes). Use this opening prompt: '+d.scenario+' Continue with adaptive questions or role-play situations; do not invent my background or give me scripted answers.',
  scenarioKind==='workplace'?'In the workplace exercise, make me explain the engineering decisions, trade-offs, release or cloud service steps and ask realistic clarifying questions. Do not invent our deployment environment or require exact services without requirements.': 'Keep Part 2 focused on the scenario type rather than forcing an unrelated software engineering discussion.',
  isInterview?'Part 3 — Feedback (3 minutes): identify up to three meaningful problems you actually heard or read, focusing on clarity, grammar and natural phrasing. Then ask me to retry my answer (2 minutes).':
    'Part 3 — Progressive recap (5 minutes). Ask me to explain the main idea in 60 seconds, then 45, then 30, one attempt at a time. Focus on clarity, not speed.',
  '',
  'COACH RULES:',
  'Ask ONLY ONE question per turn and wait for my spoken answer before continuing.',
  'Start with non-technical small talk, including unexpected simple questions. Honest uncertainty (I have not made plans yet) is a complete valid answer. Never require invented activities or experiences.',
  'If I cannot think of an answer, pause and offer a scaffold: one short truthful answer, one detail, optional return question. Offer two or three idea categories instead of scripting the entire response.',
  'Sound like a friendly conversation partner, not a lecturer or a scripted quiz.',
  'Use my actual answers for follow-up questions. Do not recite a full script or provide model answers before I attempt the question.',
  'If I hesitate or cannot retrieve a word, encourage me to paraphrase and finish the thought instead of restarting the entire sentence.',
  'If one unfamiliar word or metaphor distracts me, help me infer the approximate meaning from the surrounding sentence and continue the thought; if the unknown word is essential to a technical decision, ask for clarification instead of guessing.',
  'Give concise feedback when it helps. Correct no more than three important issues at a checkpoint and let me retry, rather than interrupting every sentence.',
  'Do not invent mistakes, pronunciation feedback, test scores, timing measurements or experiences. If you only have a transcript, be honest about what you can assess.',
  'If I say "next", move to the next part. If I say "retry", repeat the current question.',
  'Start NOW by asking the first everyday conversation question. No introduction and no more than one question.'
].join('\n');
const speakingPanelHtml=
 '<div class="section" id="speaking">'+
 '<h2>03 — Spontaneous speaking <small>30 minutes</small></h2>'+
 '<div class="grid2"><div class="panel"><h3>Everyday conversation · 10 min</h3><p><b>Opening question:</b> '+esc(d.small)+'</p><p class="small">A short, truthful answer is enough. Try: answer → one detail → optional question back. No plans yet? Say so.</p></div>'+
 '<div class="panel"><h3>'+esc(scenarioLabel)+' · 15 min</h3><p><b>Opening prompt:</b> '+esc(d.scenario)+'</p><p class="small">Explain your actual thinking, then retry if needed.</p></div></div>'+
 '<div class="grid2 practice-routes">'+
 '<div class="panel voice-route">'+
 '<div class="route-heading"><span class="route-symbol" aria-hidden="true">🎙</span><div><h3>Option A · AI Voice partner</h3><p class="small">A conversation partner that knows today’s topic and target chunks.</p></div></div>'+
 '<ol class="voice-steps"><li>Copy today’s complete coaching prompt.</li><li>Paste it into any AI assistant that supports voice (such as ChatGPT, Gemini or Claude, where available). Then start its voice mode in the same conversation.</li><li>Answer one question at a time. Say “retry” whenever you want to try again.</li></ol>'+
 '<div class="voice-actions"><button class="btn primary" id="copyVoice" type="button">Copy coaching prompt</button><span id="copyStatus" role="status" aria-live="polite" class="small"></span></div>'+
 '<details class="detail voice-preview"><summary>Preview or manually copy the prompt</summary><div class="voice-preview-body"><label for="voice-command" class="small">Complete Day '+num+' coaching instructions</label><textarea id="voice-command" readonly rows="12" spellcheck="false">'+esc(coachingPrompt)+'</textarea></div></details>'+
 '<p class="small voice-note">This website does not start AI voice mode or listen to your answers. Voice support varies by assistant and device.</p>'+
 '</div>'+
 '<div class="panel solo-route">'+
 '<div class="route-heading"><span class="route-symbol" aria-hidden="true">🎧</span><div><h3>Option B · Solo recorder</h3><p class="small">No AI needed. Use your phone’s voice recorder.</p></div></div>'+
 '<ol class="solo-questions">'+(d.soloQuestions||[d.small,d.scenario,'What would you do differently, and why?']).map(q=>'<li>'+esc(q)+'</li>').join('')+'</ol>'+
 '<p class="small">Read, hide, record for 60–120 seconds, listen for one unclear idea, and retry without a script.</p>'+
 '<div class="mini-recap"><b>'+(isInterview?'Final 5 min · feedback & retry':'Final 5 min · progressive 3–2–1')+'</b><p class="small">'+
 (isInterview?'Notice up to three improvements, then retry your answer.':'Explain your answer in 60, 45 and 30 seconds. Condense rather than rushing.')+
 '</p></div>'+
 '<div class="timer" aria-label="Speaking practice timer"><output id="clock">01:00</output><button type="button" class="btn" id="timerStart">Start / Pause</button><button class="btn" type="button" data-secs="60">60s</button><button class="btn" type="button" data-secs="45">45s</button><button class="btn" type="button" data-secs="30">30s</button></div>'+
 '</div></div></div>';
el.innerHTML='<div class="eyebrow">'+dateNice(d.date)+(num<=16?' · HISTORICAL HTML EDITION':' · ORIGINAL INTERACTIVE LESSON')+'</div><div class="head"><div><h1>Day '+pad(num)+' / 150<br>'+esc(d.theme)+'</h1><p class="lead">Practise chunks in complete sentences. Speak freely, recover when a word disappears, and then try again. You do not need to rush.</p></div><span class="pill">90 MIN</span></div>'+timeBlock+
'<div class="notice">'+(num<=16?'Adapted from the original Day '+num+' PDF. '+esc(old)+' This web version follows the updated 90-minute schedule. ':'New interactive lesson · 15 + 35 + 30 + 10 minutes. ')+(d.note?'<br><b>'+(num<=16?'Archive correction':'Review plan')+':</b> '+esc(d.note):'')+(num===1?'<br>Day 1 originally introduced seven expressions rather than the later six-chunk structure.':'')+'</div>'+
'<div class="section" id="foundations"><h2>01 — Forgotten foundations <small>15 minutes</small></h2><div class="panel"><h3>'+esc(F.title)+'</h3><p>'+esc(F.rule)+'</p>'+(d.foundationExtra?'<p class="small">'+esc(d.foundationExtra)+'</p>':'')+'<div class="grid2">'+F.qs.map((q,i)=>'<div class="exercise"><b>'+(i+1)+'.</b> '+esc(q)+'</div>').join('')+'</div><details class="detail"><summary>Answer key — reveal only after attempting</summary><div class="answers">'+F.ans.map((x,i)=>(i+1)+'. '+esc(x)).join('<br>')+'</div></details><h3 style="margin-top:25px">Everyday reflexes</h3><p class="small">Read, cover and answer immediately. Tap a card only after trying. Alternate between receiving and giving help.</p><div class="grid2">'+rr.map(([cue,answer],i)=>'<button class="reflex" type="button" aria-expanded="false">'+esc(cue)+'<b>'+esc(answer)+'</b></button>').join('')+'</div></div></div>'+
'<div class="section" id="chunks"><h2>02 — Natural chunks <small>35 minutes · '+initial+' first-use + '+(today.length-initial)+' review</small></h2><p class="chunk-intro"><b>These '+today.length+' chunks are the learning material for the five steps below.</b> This is one 35-minute exercise, not several separate lessons.</p><div class="chunk-grid">'+today.map((ch,i)=>'<article class="chunk"><div class="row"><span class="counter">'+(i+1)+'</span><h3>'+esc(ch.phrase)+'</h3><span class="status '+(ch.d===num?'':'review')+'">'+(ch.d===num?'NEW':'REVIEW · DAY '+ch.d)+'</span></div><p class="small"><b>Meaning:</b> '+esc(ch.meaning||("An expression used in a situation like: "+(ch.everyday||ch.ex||ch.tech||ch.phrase)))+'</p><p class="small"><b>When to use:</b> '+esc(ch.everyday?("Use it in a situation like this: "+ch.everyday):(ch.ex?("Use it in a situation like this: "+ch.ex):("Use it to express the idea shown in the examples below.")))+'</p>'+(ch.meaning?'<p class="small"><b>Pattern:</b> '+esc(ch.pattern)+'</p><p class="example"><b>Everyday:</b> '+esc(ch.everyday)+'</p><p class="example"><b>Tech:</b> '+esc(ch.tech)+'</p><p class="small"><b>Watch out:</b> '+esc(ch.trap)+'</p>':'<p class="example">“'+esc(ch.ex)+'”</p>')+'</article>').join('')+'</div>'+
'<div class="panel chunk-workflow" id="chunk-workflow"><p class="eyebrow">NEXT · PRACTISE THE SAME SIX CHUNKS</p><h3>Five connected steps · 35 minutes total</h3>'+
'<p>Everything below uses the same '+today.length+' expressions you just read. Reading the cards is part of Step 1. The substitution drills are Step 2, not a separate lesson.</p>'+
'<ol class="chunk-roadmap"><li><b>1 · 5 min</b><span>Noticing + cards</span></li><li><b>2 · 10 min</b><span>Substitutions</span></li><li><b>3 · 10 min</b><span>Real practice</span></li><li><b>4 · 5 min</b><span>Recall</span></li><li><b>5 · 5 min</b><span>Recovery</span></li></ol></div>'+
'<div class="chunk-practice-step" id="chunk-noticing"><p class="step-kicker">STEP 1 OF 5 · 5 MINUTES</p><h3>Noticing · See the chunks in context</h3>'+
'<p class="small">Read the '+today.length+' cards above, then read the example below. Notice which expressions are used and why.</p>'+
(d.noticing?'<p>'+esc(d.noticing)+'</p>':'<p>Choose two chunks from the '+today.length+' cards and explain when you might use them.</p>')+
(d.ambiguity?'<div class="ambiguity-inline"><h4>Context clue · infer and keep reading <small>within these same five minutes</small></h4>'+
'<p class="small">Read the whole sentence before analysing one unfamiliar expression. Guess the general meaning first.</p>'+
'<p><b>Sentence:</b> '+esc(d.ambiguity.sentence)+'</p>'+
'<p><b>Question:</b> '+esc(d.ambiguity.gist_question)+'</p>'+
'<details class="detail"><summary>Reveal the meaning and context clue — after your attempt</summary>'+
'<p><b>Expression:</b> '+esc(d.ambiguity.expression)+'</p>'+
'<p><b>In plain English:</b> '+esc(d.ambiguity.plain_english)+'</p>'+
'<p><b>Why it fits:</b> '+esc(d.ambiguity.context_clue)+'</p>'+
'<p><b>Overall meaning:</b> '+esc(d.ambiguity.gist_answer)+'</p></details></div>':'')+
'</div>'+
'<div class="chunk-practice-step" id="substitutions"><p class="step-kicker">STEP 2 OF 5 · 10 MINUTES</p><h3>Guided substitutions · Change one part at a time</h3>'+
'<p>Use each cumulative drill to practise a complete sentence. Read the base, change the indicated word or grammatical unit, say the full new sentence, then reveal the answer. Keep each intermediate sentence grammatical.</p>'+
seqs.map(seqHTML).join('')+'</div>'+
'<div class="chunk-practice-step" id="chunk-story"><p class="step-kicker">STEP 3 OF 5 · 10 MINUTES</p><h3>Real practice · Make it your own</h3>'+
'<p class="small">Use at least two of the '+today.length+' chunks shown at the beginning of this block.</p><p>'+esc(d.story||"Tell a short 3–5-sentence story about a realistic situation using two expressions from today.")+'</p></div>'+
'<div class="chunk-practice-step" id="chunk-recall"><p class="step-kicker">STEP 4 OF 5 · 5 MINUTES</p><h3>Recall · Without looking at the cards</h3>'+
'<p>Cover the '+today.length+' chunks above. Recall their meanings from the situations, then say three original sentences using three different chunks. Check the cards only after trying.</p></div>'+
'<div class="chunk-practice-step" id="chunk-recovery"><p class="step-kicker">STEP 5 OF 5 · 5 MINUTES</p><h3>Recovery · Keep speaking when a word is missing</h3>'+
'<p>'+esc(d.recovery||"Explain an idea using simpler words if one expression does not come to mind. Continue rather than restarting.")+'</p>'+
'<p class="small"><b>End of Natural Chunks.</b> The next block is Speaking, where you will use these expressions in conversation.</p></div></div>'+
speakingPanelHtml+
'<div class="section" id="writing"><h2>04 — Writing & consolidation <small>10 minutes</small></h2><div class="panel"><p>'+esc(d.writing)+'</p><p><b>Essential:</b> Write 2–4 sentences about what you just said. Rewrite one sentence using a chunk. If time permits, extend to 4–8 sentences and rewrite a second one.</p><textarea id="notes" placeholder="Write here. Your draft stays in this browser only." aria-label="Writing notes"></textarea><p class="dim" id="saveMsg">Draft stored locally in your browser, not on GitHub.</p><details class="detail"><summary>Grammar check — reveal after writing</summary><div class="answers">'+esc(d.writingCheck||'Remember: ended up + -ing, depend on, responsible for + -ing, and on Monday / at 9 a.m. Correct only relevant patterns rather than forcing every expression into your text.')+'</div></details></div></div>'+
'<div class="section" id="progress"><h2>Completion checklist</h2><div class="panel checks">'+['Forgotten foundations and reflexes','Six chunks and guided substitutions','Spontaneous story, recall and recovery','Speaking and retry','Writing (at least essential version)'].map((x,i)=>'<label><input type="checkbox" data-complete="'+i+'">'+esc(x)+'</label>').join('')+'<p class="small" id="progressLabel">0/5 completed</p>'+(prevChunks.length?'<p class="small"><b>Two review sentences from yesterday:</b><br>'+prevChunks.map(esc).join('<br>')+'</p>':'')+'<p class="small"><b>Learning record:</b> pending actual speaking or writing. Record spontaneous vs prompted chunk use only when observed.</p><p class="small"><b>Chunk register:</b> New today — '+today.filter(c=>c.d===num).map(c=>esc(c.phrase)).join('; ')+' | Reviewed — '+today.filter(c=>c.d!==num).map(c=>esc(c.phrase)+' (Day '+c.d+')').join('; ')+' | Distinct cumulative through this day: '+Object.values(data.G).filter(c=>c.d<=num).length+'</p><p class="small">Optional: 10–15 minutes of transcript-supported shadowing outside the 90 minutes. Rest your voice when needed.</p></div></div>'+
'<div class="actions"><a href="'+(num>1?link(num-1):'../index.html')+'">← '+(num>1?'Previous day':'Archive')+'</a><a href="../index.html">All lessons</a>'+(num<data.days.length?'<a href="'+link(num+1)+'">Next day →</a>':'')+'</div><footer>HTML adaptation of a previously delivered lesson · Your written notes and checkmarks are saved only in this browser · <a href="'+gh+'">GitHub repository</a></footer>';
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
    status.textContent='Copied. Paste into your chosen AI assistant, then start its voice mode.';
  }catch(err){
    document.querySelector('.voice-preview').open=true;
    input.focus();input.select();
    status.textContent='Text selected. Please copy it manually.';
  }
});
let seconds=60,interval=null;function update(){document.getElementById('clock').textContent=String(Math.floor(seconds/60)).padStart(2,'0')+':'+String(seconds%60).padStart(2,'0')};document.querySelectorAll('[data-secs]').forEach(b=>b.addEventListener('click',()=>{clearInterval(interval);interval=null;seconds=Number(b.dataset.secs);update()}));document.getElementById('timerStart').addEventListener('click',()=>{if(interval){clearInterval(interval);interval=null;return}if(seconds===0)seconds=60;update();interval=setInterval(()=>{seconds=Math.max(0,seconds-1);update();if(seconds===0){clearInterval(interval);interval=null}},1000)})}
function makeSeq(name,base,pairs){let current=base;return {name,base,steps:pairs.map(([from,to,note])=>{if(!current.includes(from))return {from,to,note,result:'Check the cue against the previous sentence'};current=current.replace(from,to);return {from,to,note,result:current}})}}
if(document.body.dataset.view==='home')overview();else lesson();
})();
