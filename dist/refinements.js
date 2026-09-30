(() => {
  const reduce=matchMedia('(prefers-reduced-motion: reduce)');
  const duration=420, easing='cubic-bezier(.22,.8,.3,1)';
  const running=new Map();
  function resizePanel(panel,open,complete=()=>{}){
    const start=panel.hidden?0:panel.getBoundingClientRect().height;
    running.get(panel)?.animation.cancel();
    running.delete(panel);
    panel.hidden=false;
    panel.inert=!open;
    const finish=()=>{panel.hidden=!open;running.delete(panel);complete();};
    if(reduce.matches){finish();return;}
    const animation=panel.animate([{height:start+'px',opacity:open?.3:1},{height:(open?panel.scrollHeight:0)+'px',opacity:open?1:0}],{duration,easing});
    running.set(panel,{animation,finish});
    animation.onfinish=finish;
  }
  reduce.addEventListener('change',event=>{if(event.matches){for(const {animation,finish} of [...running.values()]){animation.cancel();finish();}}});

  document.querySelectorAll('.faqs details').forEach(details=>{
    const summary=details.querySelector('summary'),body=details.querySelector('.faq-answer');
    if(!body)return;
    let intendedOpen=details.open;
    body.hidden=!intendedOpen;
    body.inert=!intendedOpen;
    summary.addEventListener('click',event=>{
      event.preventDefault();
      intendedOpen=!intendedOpen;
      details.classList.toggle('is-closing',!intendedOpen);
      details.open=true;
      resizePanel(body,intendedOpen,()=>{details.open=intendedOpen;details.classList.remove('is-closing');});
    });
  });

  const steps=[...document.querySelectorAll('[data-home-step]')];
  steps.forEach((button,index)=>{
    const panel=document.getElementById(button.getAttribute('aria-controls'));
    panel.inert=panel.hidden;
    button.addEventListener('click',()=>{
      steps.forEach((other,i)=>{
        const active=i===index,otherPanel=document.getElementById(other.getAttribute('aria-controls'));
        if((other.getAttribute('aria-expanded')==='true')===active)return;
        other.setAttribute('aria-expanded',String(active));
        other.closest('article').classList.toggle('is-open',active);
        resizePanel(otherPanel,active);
      });
      document.querySelectorAll('[data-step-scene]').forEach((scene,i)=>{
        scene.getAnimations().forEach(a=>a.cancel());
        const wasHidden=scene.hidden;scene.hidden=i!==index;
        scene.classList.toggle('is-active',i===index);
        if(i===index&&wasHidden&&!reduce.matches)scene.animate([{opacity:0,transform:'translateX(18px) scale(.985)'},{opacity:1,transform:'none'}],{duration:520,easing});
      });
    });
    button.addEventListener('keydown',event=>{
      let next;
      if(event.key==='ArrowDown')next=(index+1)%steps.length;
      if(event.key==='ArrowUp')next=(index+steps.length-1)%steps.length;
      if(event.key==='Home')next=0;
      if(event.key==='End')next=steps.length-1;
      if(next!==undefined){event.preventDefault();steps[next].focus();steps[next].click();}
    });
  });

  document.querySelectorAll('[data-guide-choice]').forEach(button=>button.addEventListener('click',()=>{
    document.querySelectorAll('[data-guide-choice]').forEach(b=>b.setAttribute('aria-pressed',String(b===button)));
    document.querySelectorAll('[data-guide-panel]').forEach(panel=>panel.hidden=panel.dataset.guidePanel!==button.dataset.guideChoice);
  }));
  document.querySelectorAll('.brief-checklist').forEach(list=>{
    const checks=[...list.querySelectorAll('[data-brief-check]')];
    checks.forEach(check=>check.addEventListener('change',()=>{
      const count=checks.filter(x=>x.checked).length;
      list.querySelector('.check-progress').textContent=`${count} of ${checks.length} details ready${count===checks.length?' — a useful starting point.':''}`;
    }));
  });
  const priorities=[...document.querySelectorAll('[data-priority]')];
  priorities.forEach(button=>button.addEventListener('click',()=>{
    button.setAttribute('aria-pressed',String(button.getAttribute('aria-pressed')!=='true'));
    const selected=priorities.filter(b=>b.getAttribute('aria-pressed')==='true').map(b=>b.textContent.replace('+','').trim());
    document.querySelector('.priority-summary').textContent=selected.length?`Your priorities: ${selected.join(' · ')}.`:'Choose one or more priorities to shape your brief.';
  }));
})();
