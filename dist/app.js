const $ = s => document.querySelector(s);
const dialogs = [...document.querySelectorAll('dialog')];
let returnFocus = null;
function openDialog(dialog){ returnFocus=document.activeElement;dialogs.forEach(d=>{if(d.open)d.close()});dialog.showModal();document.body.classList.add('modal-open'); }
function closeDialog(dialog){dialog.close();}
dialogs.forEach(dialog=>{
  dialog.querySelector('.close-button').addEventListener('click',()=>closeDialog(dialog));
  dialog.addEventListener('click',e=>{if(e.target===dialog){const r=dialog.getBoundingClientRect();if(e.clientX<r.left||e.clientX>r.right||e.clientY<r.top||e.clientY>r.bottom)closeDialog(dialog);}});
  dialog.addEventListener('close',()=>{if(!dialogs.some(d=>d.open)){document.body.classList.remove('modal-open');if(returnFocus?.isConnected)returnFocus.focus();}});
});
let quoteStep=0;
const quoteDialog=$('#quote-dialog');
function setStep(step){quoteStep=step;$('#project-fields').hidden=step!==0;$('#project-fields').disabled=step!==0;$('#contact-fields').hidden=step!==1;$('#contact-fields').disabled=step!==1;document.querySelectorAll('.form-progress span').forEach((el,i)=>el.classList.toggle('current',i===step));}
function openQuote(service){$('#quote-form').reset();setStep(0);$('#quote-form').hidden=false;$('#quote-success').hidden=true;$('.form-progress').hidden=false;$('.form-intro').hidden=false;$('#quote-title').textContent='A few details. A good place to start.';if(service)$('#service-select').value=service;openDialog(quoteDialog);}
document.querySelectorAll('[data-quote]').forEach(b=>b.addEventListener('click',()=>{closeMenu();openQuote()}));

$('#quote-next').addEventListener('click',()=>{for(const el of $('#project-fields').querySelectorAll('input,select,textarea')){if(!el.reportValidity())return;}setStep(1);$('#name').focus();});
$('#quote-back').addEventListener('click',()=>{setStep(0);$('#service-select').focus()});
$('#quote-form').addEventListener('submit',e=>{
  e.preventDefault();if(quoteStep!==1){$('#quote-next').click();return;}
  const data=[['Service',$('#service-select').value],['Property postcode',$('#postcode').value],['Project',$('#description').value],['Name',$('#name').value],['Email',$('#email').value]];if($('#phone').value)data.push(['Phone',$('#phone').value]);
  const summary=$('#quote-summary');summary.replaceChildren();data.forEach(([k,v])=>{const dt=document.createElement('dt'),dd=document.createElement('dd');dt.textContent=k;dd.textContent=v;summary.append(dt,dd)});
  $('#quote-form').hidden=true;$('.form-progress').hidden=true;$('.form-intro').hidden=true;$('#quote-success').hidden=false;$('#quote-title').textContent='One step closer.';$('#quote-done').focus();
});
$('#quote-done').addEventListener('click',()=>closeDialog(quoteDialog));
quoteDialog.addEventListener('close',()=>{$('#quote-form').reset();$('#quote-summary').replaceChildren()});
$('#concept-info').addEventListener('click',()=>openDialog($('#info-dialog')));
const menuButton=$('.menu-button');
function closeMenu(){menuButton.setAttribute('aria-expanded','false');$('#mobile-nav').hidden=true;}
menuButton.addEventListener('click',()=>{const expanded=menuButton.getAttribute('aria-expanded')==='true';menuButton.setAttribute('aria-expanded',String(!expanded));$('#mobile-nav').hidden=expanded;});
document.querySelectorAll('#mobile-nav a').forEach(a=>a.addEventListener('click',closeMenu));
document.addEventListener('keydown',e=>{if(e.key==='Escape'&&menuButton.getAttribute('aria-expanded')==='true'){closeMenu();menuButton.focus()}});

document.querySelectorAll('[data-quote-service]').forEach(button=>button.addEventListener('click',()=>openQuote(button.dataset.quoteService)));

// Motion is progressive enhancement: content remains readable without JavaScript.
const reducedMotion=window.matchMedia('(prefers-reduced-motion: reduce)');
if('IntersectionObserver' in window && !reducedMotion.matches){
  document.documentElement.classList.add('motion-ready');
  const observer=new IntersectionObserver(entries=>entries.forEach(entry=>{if(entry.isIntersecting){entry.target.classList.add('in-view');observer.unobserve(entry.target);}}),{threshold:0.08,rootMargin:'0px 0px 30px 0px'});
  document.querySelectorAll('.reveal').forEach((element,i)=>{element.style.transitionDelay=`${Math.min(i%3,2)*60}ms`;observer.observe(element)});
  reducedMotion.addEventListener('change',event=>{if(event.matches){document.documentElement.classList.remove('motion-ready');observer.disconnect()}});
}
let scrollPending=false;
function updateScroll(){const max=document.documentElement.scrollHeight-innerHeight;$('.reading-progress').style.transform=`scaleX(${max>0?Math.min(1,Math.max(0,scrollY/max)):0})`;$('.header').classList.toggle('is-scrolled',scrollY>20);scrollPending=false;}
addEventListener('scroll',()=>{if(!scrollPending){scrollPending=true;requestAnimationFrame(updateScroll)}},{passive:true});
updateScroll();

document.querySelectorAll('[data-audience]').forEach(button=>button.addEventListener('click',()=>{
  document.querySelectorAll('[data-audience]').forEach(b=>b.setAttribute('aria-pressed',String(b===button)));
  $('#audience-description').textContent=button.dataset.audience==='business'?'Keep your premises working as hard as you do. Practical plumbing and maintenance support for your business.':'From the small fixes to the bigger plans. Plumbing, heating and maintenance that keeps your property moving.';
}));
document.querySelectorAll('[data-filter]').forEach(button=>button.addEventListener('click',()=>{
  document.querySelectorAll('[data-filter]').forEach(b=>b.setAttribute('aria-pressed',String(b===button)));
  let count=0;document.querySelectorAll('[data-category]').forEach(card=>{card.hidden=button.dataset.filter!=='all'&&card.dataset.category!==button.dataset.filter;if(!card.hidden){count++;card.classList.add('in-view')}});
  $('#filter-status').textContent=`${count} ${count===1?'service':'services'} to explore`;
}));
const search=$('#faq-search');
if(search){let topic='All';const topics=[...document.querySelectorAll('[data-faq-topic]')];const filterFAQs=()=>{const query=search.value.trim().toLocaleLowerCase();let count=0;document.querySelectorAll('[data-faq]').forEach(item=>{const category=item.querySelector('.faq-question small')?.textContent;item.hidden=!item.textContent.toLocaleLowerCase().includes(query)||(topic!=='All'&&category!==topic);if(!item.hidden){count++;item.classList.add('in-view')}});$('#faq-status').textContent=`${count} ${count===1?'answer':'answers'}${query||topic!=='All'?' found':' to explore'}`;$('#faq-empty').hidden=count!==0;};topics.forEach(button=>button.addEventListener('click',()=>{topic=button.dataset.faqTopic;topics.forEach(b=>b.setAttribute('aria-pressed',String(b===button)));filterFAQs()}));search.addEventListener('input',filterFAQs);$('#clear-search').addEventListener('click',()=>{search.value='';topic='All';topics.forEach(b=>b.setAttribute('aria-pressed',String(b.dataset.faqTopic==='All')));filterFAQs();search.focus()})}

const stages=[...document.querySelectorAll('[data-stage]')];
function selectStage(index,focus=false){stages.forEach((button,i)=>{button.setAttribute('aria-selected',String(i===index));button.tabIndex=i===index?0:-1;$('#stage-panel-'+i).hidden=i!==index});if(focus)stages[index].focus()}
stages.forEach((button,index)=>{button.addEventListener('click',()=>selectStage(index));button.addEventListener('keydown',event=>{let next=index;if(event.key==='ArrowRight'||event.key==='ArrowDown')next=(index+1)%stages.length;else if(event.key==='ArrowLeft'||event.key==='ArrowUp')next=(index+stages.length-1)%stages.length;else if(event.key==='Home')next=0;else if(event.key==='End')next=stages.length-1;else return;event.preventDefault();selectStage(next,true)})});

