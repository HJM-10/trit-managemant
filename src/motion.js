(() => {
  const reduce=matchMedia('(prefers-reduced-motion: reduce)');
  const carousel=document.querySelector('.hero-showcase');
  if(carousel){
    const slides=[...carousel.querySelectorAll('[data-slide]')];
    const dots=[...carousel.querySelectorAll('[data-slide-to]')];
    const pause=carousel.querySelector('.carousel-pause');
    let current=0,paused=reduce.matches,hovering=false,timer;
    const show=(index,manual=false)=>{current=(index+slides.length)%slides.length;slides.forEach((slide,i)=>{slide.classList.toggle('active',i===current);slide.setAttribute('aria-hidden',String(i!==current));slide.inert=i!==current});dots.forEach((button,i)=>button.setAttribute('aria-pressed',String(i===current)));carousel.querySelector('.slide-count').innerHTML=`0${current+1} <span>/ 03</span>`;if(manual)restart()};
    const syncPause=()=>{carousel.classList.toggle('motion-paused',paused);pause.setAttribute('aria-pressed',String(paused));pause.setAttribute('aria-label',paused?'Play service slideshow':'Pause service slideshow');pause.querySelector('[data-play-label]').textContent=paused?'Play':'Pause';pause.querySelector('[data-play-symbol]').textContent=paused?'▶':'Ⅱ'};
    const restart=()=>{clearInterval(timer);if(!paused&&!hovering&&!reduce.matches&&!document.hidden)timer=setInterval(()=>show(current+1),5500)};
    dots.forEach((button,i)=>button.addEventListener('click',()=>show(i,true)));
    pause.addEventListener('click',()=>{paused=!paused;syncPause();restart()});
    carousel.addEventListener('mouseenter',()=>{hovering=true;restart()});carousel.addEventListener('mouseleave',()=>{hovering=false;restart()});
    carousel.addEventListener('focusin',()=>{hovering=true;restart()});carousel.addEventListener('focusout',event=>{if(!carousel.contains(event.relatedTarget)){hovering=false;restart()}});
    document.addEventListener('visibilitychange',restart);
    reduce.addEventListener('change',event=>{paused=event.matches;syncPause();restart()});syncPause();restart();
  }
  document.querySelectorAll('.flow-toggle').forEach(button=>button.addEventListener('click',()=>{const panel=button.closest('.flow-panel'),paused=button.getAttribute('aria-pressed')!=='true';button.setAttribute('aria-pressed',String(paused));button.textContent=paused?'Play flow':'Pause flow';panel.classList.toggle('motion-paused',paused)}));
  const steps=[...document.querySelectorAll('[data-home-step]')];
  steps.forEach((button,index)=>button.addEventListener('click',()=>{
    steps.forEach((other,i)=>{const panel=document.getElementById(other.getAttribute('aria-controls')),active=i===index;panel.getAnimations().forEach(a=>a.cancel());other.setAttribute('aria-expanded',String(active));other.closest('article').classList.toggle('is-open',active);if(active){panel.hidden=false;if(!reduce.matches)panel.animate([{height:'0px',opacity:0},{height:panel.scrollHeight+'px',opacity:1}],{duration:400,easing:'cubic-bezier(.22,.8,.3,1)'});}else panel.hidden=true;});
    const number=document.querySelector('.process-live-number');if(number){number.textContent='0'+(index+1);if(!reduce.matches)number.animate([{opacity:0,transform:'translateY(15px)'},{opacity:1,transform:'translateY(0)'}],{duration:400})}
  }));
})();
