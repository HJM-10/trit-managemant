(() => {
  const frame = document.querySelector('.architectural-frame');
  if (!frame) return;
  const desktop = matchMedia('(min-width: 1440px)');
  const reduce = matchMedia('(prefers-reduced-motion: reduce)');
  let pending = 0;
  function paint() {
    pending = 0;
    const active = desktop.matches && !reduce.matches;
    // Scroll-linked only: no idle animation, timers or movement while reading.
    const distance = active ? Math.min(Math.max(scrollY, 0) * 0.055, 70) : 0;
    frame.style.setProperty('--architecture-left-y', `${distance}px`);
    frame.style.setProperty('--architecture-right-y', `${distance * 0.65}px`);
  }
  function schedule() {
    if (!pending) pending = requestAnimationFrame(paint);
  }
  function sync() {
    removeEventListener('scroll', schedule);
    if (desktop.matches && !reduce.matches) addEventListener('scroll', schedule, {passive:true});
    schedule();
  }
  desktop.addEventListener('change', sync);
  reduce.addEventListener('change', sync);
  sync();
})();
