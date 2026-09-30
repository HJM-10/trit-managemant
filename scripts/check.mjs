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
 for(const [,url] of html.matchAll(/(?:href|src)="([^"]+)"/g)){
  if(/^(?:https?:|mailto:|tel:|data:)/.test(url))continue;
  const [path,hash]=url.split('#');const target=path?resolve(dirname(resolve(root,file)),path):resolve(root,file);
  await access(target);references++;
  if(hash&&target.endsWith('.html')){const targetHtml=target===resolve(root,file)?html:await readFile(target,'utf8');assert.ok(targetHtml.includes(`id="${hash}"`),`${file}: missing anchor ${url}`)}
 }
}
const js=await readFile(resolve(root,'app.js'),'utf8');
assert.ok(!/\bfetch\(|XMLHttpRequest|localStorage|sessionStorage/.test(js),'Demo must not submit or persist personal data');
console.log(`PASS: ${files.length} pages; ${references} local references; original logo, agency credit, active navigation and demo-only data handling.`);
