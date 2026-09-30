const services = [
  {name:'Plumbing & repairs',icon:'drop',short:'Leaks, taps and everyday plumbing. Small problems, properly taken care of.',intro:'A dripping tap or a troublesome pipe shouldn’t take over your day. Tell us what’s happening and we’ll help you work out the next step.',items:['Tap, sink and toilet issues','Leaks and pipework repairs','Plumbing installations and replacements']},
  {name:'Heating & cooling',icon:'heat',short:'A more comfortable property, whatever the weather has in mind.',intro:'Keep comfort on the agenda. From a heating issue to a planned improvement, start with a conversation about your existing system.',items:['Heating and cooling enquiries','Radiator and system issues','Planned upgrades and maintenance']},
  {name:'Drain cleaning & repairs',icon:'drain',short:'Get things flowing again with support for blockages and drainage issues.',intro:'Slow drainage or a recurring blockage? Share the symptoms and location so the team can advise on assessment and the right approach.',items:['Slow or blocked drains','Drainage fault enquiries','Cleaning and repair assessments']},
  {name:'Commercial plumbing',icon:'building',short:'Practical plumbing support to help keep your business running.',intro:'Your premises need to work as hard as you do. Discuss the plumbing needs of your workplace and any access or scheduling requirements.',items:['Business premises and facilities','Plumbing repairs and installations','Maintenance planning enquiries']},
  {name:'Bathroom & remodelling',icon:'bath',short:'Make more of your space, from thoughtful updates to a fresh start.',intro:'A better bathroom starts with a clear plan. Talk through your layout, fittings and priorities to explore the work involved.',items:['Bathroom improvement enquiries','Fixture and fitting replacements','Plumbing for remodelling projects']},
  {name:'Gas line services',icon:'flame',short:'Talk to the team about gas pipework and your property’s requirements.',intro:'Contact the team to discuss the gas-related work you require. The scope and the appropriate qualified professional must be confirmed before any work is booked.',items:['Gas pipework enquiries','Project and installation discussions','Scope and qualification checks'],note:'Proposed service copy. Gas Safe registration and the scope of gas work must be verified with TRST before launch.'}
];
const $ = s => document.querySelector(s);
const serviceGrid = $('#service-grid');
serviceGrid.innerHTML = services.map((s,i)=>`<article class="service-card"><div class="service-top"><svg class="icon" aria-hidden="true"><use href="#i-${s.icon}"/></svg><span>0${i+1}</span></div><h3>${s.name}</h3><p>${s.short}</p><button class="text-link" data-service="${i}" aria-label="Explore ${s.name}">Explore service <span class="plus" aria-hidden="true">+</span></button></article>`).join('');
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
serviceGrid.addEventListener('click',e=>{
  const button=e.target.closest('[data-service]');if(!button)return;
  const s=services[Number(button.dataset.service)];
  $('#service-detail').innerHTML=`<div class="modal-icon"><svg class="icon" aria-hidden="true"><use href="#i-${s.icon}"/></svg></div><p class="eyebrow">HOW CAN WE HELP?</p><h2 id="service-title">${s.name}</h2><p>${s.intro}</p><ul>${s.items.map(x=>`<li>${x}</li>`).join('')}</ul>${s.note?`<p class="detail-note">${s.note}</p>`:''}<button class="button full" id="service-quote">Discuss this service</button>`;
  $('#service-dialog').setAttribute('aria-labelledby','service-title');
  $('#service-quote').addEventListener('click',()=>openQuote(s.name));openDialog($('#service-dialog'));
});
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
