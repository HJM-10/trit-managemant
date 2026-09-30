import {readdir,readFile,access} from 'node:fs/promises';
import {resolve,dirname} from 'node:path';
import assert from 'node:assert/strict';
const root=resolve(import.meta.dirname,'../dist');
const files=(await readdir(root)).filter(f=>f.endsWith('.html'));
assert.equal(files.length,13,'Expected 13 pages');
let references=0;
for(const file of files){
 const html=await readFile(resolve(root,file),'utf8');
 assert.equal((html.match(/<h1[\s>]/g)||[]).length,1,`${file}: expected one H1`);
 assert.match(html,/https:\/\/atarionsolutions\.com\//,`${file}: missing agency credit`);
 assert.match(html,/src="assets\/trst-logo.jpg"/,`${file}: missing original logo`);
 assert.match(html,/aria-current="page"/,`${file}: missing active navigation`);
 assert.match(html,/<script src="motion.js"><\/script>/,`${file}: missing motion enhancement`);
 assert.match(html,/<script src="refinements.js"><\/script>/,`${file}: missing interactions`);
 const ids=[...html.matchAll(/\bid="([^"]+)"/g)].map(m=>m[1]);
 assert.equal(ids.length,new Set(ids).size,`${file}: duplicate element IDs`);
 for(const [,id] of html.matchAll(/aria-controls="([^"]+)"/g))assert.ok(ids.includes(id),`${file}: missing controlled element ${id}`);
 for(const [,url] of html.matchAll(/(?:href|src)="([^"]+)"/g)){
  if(/^(?:https?:|mailto:|tel:|data:)/.test(url))continue;
  const [path,hash]=url.split('#');const target=path?resolve(dirname(resolve(root,file)),path):resolve(root,file);
  await access(target);references++;
  if(hash&&target.endsWith('.html')){const targetHtml=target===resolve(root,file)?html:await readFile(target,'utf8');assert.ok(targetHtml.includes(`id="${hash}"`),`${file}: missing anchor ${url}`)}
 }
}
const js=await readFile(resolve(root,'app.js'),'utf8');
assert.ok(!/\bfetch\(|XMLHttpRequest|localStorage|sessionStorage/.test(js),'Demo must not submit or persist personal data');
const enhanced=await readFile(resolve(root,'refinements.js'),'utf8');
assert.ok(!/\bfetch\(|XMLHttpRequest|localStorage|sessionStorage/.test(enhanced),'Page tools must not submit or persist personal data');
const home=await readFile(resolve(root,'index.html'),'utf8');
for(const image of ['step-enquiry.svg','step-plan.svg','step-agree.svg'])assert.ok(home.includes(`assets/${image}`),`Missing process scene: ${image}`);
for(const [page,image] of [['commercial-plumbing','commercial-plumbing.svg'],['gas-line-services','gas-services.svg']]){
 const html=await readFile(resolve(root,`service-${page}.html`),'utf8');
 assert.match(html,new RegExp(`service-detail-photo[^]*?src="assets/${image.replace('.','\\.')}"`),`${page}: inappropriate service hero`);
}
const hosting=JSON.parse(await readFile(resolve(root,'../vercel.json'),'utf8'));
assert.equal(hosting.framework,null,'Use static hosting, not a server framework');
assert.equal(hosting.outputDirectory,'dist','Publish generated static pages');
assert.ok(!hosting.functions&&!hosting.rewrites&&!hosting.routes,'Static pages must not route to a function');
console.log(`PASS: ${files.length} pages; ${references} local references; original logo, agency credit, active navigation and demo-only data handling.`);
