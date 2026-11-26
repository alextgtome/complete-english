import fs from 'node:fs';
import vm from 'node:vm';
import {execFileSync} from 'node:child_process';
const read=p=>fs.readFileSync(p,'utf8');
const write=(p,s)=>fs.writeFileSync(p,s);
const ctx={window:{}};
vm.runInNewContext(read('data/lessons.js'),ctx,{timeout:1500});
const d=ctx.window.CE_DATA;
const config=JSON.parse(read('course.config.json'));
const dir='incoming';
for(const name of fs.readdirSync(dir).filter(n=>/^day-\d{3}\.json$/.test(n)).sort()){
 const p=JSON.parse(read(dir+'/'+name)), l=p.lesson, n=l.day;
 if(n<=d.days.length) continue;
 if(n!==d.days.length+1 || name!=='day-'+String(n).padStart(3,'0')+'.json') throw Error('Missing predecessor or invalid filename: '+name);
 if(n>150 || l.date!==new Date(Date.parse(config.start_date+'T00:00:00Z')+(n-1)*86400000).toISOString().slice(0,10)) throw Error('Invalid date');
 if(Object.keys(p.new_chunks).length!==3 || l.chunks.length!==6) throw Error('Invalid chunk count');
 for(const [id,c] of Object.entries(p.new_chunks)){
 if(d.G[id] || c.d!==n || !l.chunks.includes(id) || !['phrase','meaning','when','everyday','tech','pattern','ex'].every(k=>typeof c[k]==='string'&&c[k].trim())) throw Error('Invalid new chunk '+id);
 d.G[id]=c;
 }
 if(d.F[l.micro]) throw Error('Foundation key already exists');
 d.F[l.micro]=p.foundation; d.days.push(l); d.focusDrills[n]=p.focus_drill;
 const prev='lessons/day-'+String(n-1).padStart(3,'0')+'.html';
 const dest='lessons/day-'+String(n).padStart(3,'0')+'.html';
 const esc=s=>s.replaceAll('&','&amp;').replaceAll('<','&lt;').replaceAll('>','&gt;').replaceAll('"','&quot;');
 write(dest,read(prev).replace(/<title>.*?<\/title>/,'<title>Day '+String(n).padStart(3,'0')+' / 150 — '+esc(l.theme)+' | Complete English</title>').replace(/data-day="\d+"/,'data-day="'+n+'"').replace(/<meta name="description" content="[^"]*">/,'<meta name="description" content="'+esc(l.theme)+'">'));
}
write('data/lessons.js','window.CE_DATA='+JSON.stringify(d)+';\n');
for(const args of [['--check','assets/app.js'],['scripts/build-generation-index.mjs'],['scripts/build-lesson-catalog.mjs'],['scripts/build-generation-index.mjs','--check'],['scripts/build-lesson-catalog.mjs','--check'],['scripts/validate-lessons.mjs'],['scripts/validate-lesson-layout.mjs']]) execFileSync(process.execPath,args,{stdio:'inherit'});
