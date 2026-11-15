import { gsap } from 'gsap';

const BUILD_DURATION = 4.5;

/** One timeline owns the seven cursors and the currently visible Dock screen. */
export function setupScrollRebuild() {
  const screens = Array.from(document.querySelectorAll<HTMLElement>('.page-screen'));
  const cursors = Array.from(document.querySelectorAll<HTMLElement>('.swarm-cursor'));
  const skip = document.querySelector<HTMLButtonElement>('#skip-animation')!;
  const replay = document.querySelector<HTMLButtonElement>('#replay')!;
  const status = document.querySelector<HTMLElement>('#swarm-status')!;
  const progress = document.querySelector<HTMLElement>('#swarm-progress')!;
  const dockItems = Array.from(document.querySelectorAll<HTMLElement>('[data-nav]'));
  const reduced = matchMedia('(prefers-reduced-motion: reduce)');
  const visited = new Set<HTMLElement>();
  const originalInert = screens.map(screen => screen.inert);
  const parts = new Map(screens.map(screen => [screen, Array.from(screen.querySelectorAll<HTMLElement>(
    '.build-item, .hero-bottom, .section-heading, .project-art, .project-meta, .project-info h3, .project-info > p, .tags, .project-footer, .project-footnote, .section-index, h2, .about-text, .about-copy > .text-link, .toolbox-title, .skill-group, .learning-note, .contact-heading, .contact-bottom, .footer'
  )).filter(part => !part.parentElement?.closest('.build-item, .section-heading, .contact-heading'))]));
  // Restore only animation-owned properties; preserve existing design transforms.
  const styles = new Map(Array.from(parts.values()).flat().map(part => [part, {
    opacity: part.style.opacity, clipPath: part.style.clipPath
  }]));
  let timeline: gsap.core.Timeline | null = null;
  let active: HTMLElement | null = null;
  let scrollLocked = false;
  let scrollTimer = 0;
  let navigating = false;
  let navigationFrame = 0;

  function select(screen: HTMLElement) {
    screens.forEach(candidate => candidate.classList.toggle('swarm-active', candidate === screen));
    dockItems.forEach(item => {
      const selected = item.dataset.nav === screen.id;
      item.classList.toggle('active', selected);
      if (selected) item.setAttribute('aria-current', 'location');
      else item.removeAttribute('aria-current');
    });
  }

  function restore() {
    timeline?.kill();
    timeline = null;
    styles.forEach((style, part) => {
      part.style.opacity = style.opacity;
      part.style.clipPath = style.clipPath;
    });
    gsap.set(cursors, { autoAlpha: 0 });
    skip.hidden = !scrollLocked;
  }

  function unlockScroll() {
    scrollLocked = false;
    document.documentElement.classList.remove('swarm-locked');
    screens.forEach((screen, index) => { screen.inert = originalInert[index]; });
    status.hidden = true;
    const skipFocused = document.activeElement === skip;
    restore();
    if (skipFocused) active?.focus({ preventScroll: true });
  }

  function nearestScreen() {
    return screens.reduce((nearest, screen) => {
      const distance = (el: HTMLElement) => Math.abs(el.getBoundingClientRect().top);
      return distance(screen) < distance(nearest) ? screen : nearest;
    }, screens[0]);
  }

  function build(screen: HTMLElement) {
    restore();
    active = screen;
    select(screen);
    if (reduced.matches) return;
    const targets = parts.get(screen)!;
    // Keyboard focus always takes priority over decorative motion.
    const focused = document.activeElement;
    const animated = targets.filter(target => !focused || !target.contains(focused));
    gsap.set(animated, { opacity: 0, clipPath: 'inset(0 100% 0 0)' });
    skip.hidden = false;
    const edgeX = Math.max(0, innerWidth - 76);
    const edgeY = Math.max(0, innerHeight - 100);
    const clampX = gsap.utils.clamp(6, Math.max(6, edgeX));
    const clampY = gsap.utils.clamp(72, Math.max(72, edgeY));
    timeline = gsap.timeline({ onComplete: () => {
      restore();
      if (!scrollLocked) return;
      visited.add(screen);
      progress.textContent = `${visited.size} / ${screens.length}`;
      if (visited.size === screens.length) unlockScroll();
    } });
    const current = timeline;

    const ticker = targets.find(target => target.classList.contains('ticker'));
    cursors.forEach((cursor, index) => {
      const target = (index === cursors.length - 1 ? ticker : undefined) ?? targets[index % targets.length] ?? screen;
      const rect = target.getBoundingClientRect();
      const row = (index + 1) / (cursors.length + 1);
      gsap.set(cursor, { x: index % 2 ? edgeX : 8, y: clampY(innerHeight * row), autoAlpha: 0 });
      current.to(cursor, { autoAlpha: 1, duration: .3 }, index * .06)
        .to(cursor, { x: clampX(rect.left + rect.width * .15), y: clampY(rect.top + index * 5), duration: 1.25, ease: 'power2.inOut' }, .1 + index * .08)
        .to(cursor, { x: clampX(rect.right - 32), y: clampY(rect.bottom - 16), duration: 1.6, ease: 'power1.inOut' }, 1.4 + index * .08)
        .to(cursor, { x: clampX(innerWidth * row), y: edgeY, autoAlpha: 0, duration: .65, ease: 'power2.in' }, 3.85);
    });
    animated.forEach((target, index) => {
      const start = .55 + index / Math.max(1, animated.length - 1) * 1.65;
      current.to(target, { opacity: 1, clipPath: 'inset(0 0% 0 0)', duration: 1.5, ease: 'power2.out' }, start);
    });
    current.to({}, { duration: BUILD_DURATION }, 0);
  }

  function navigate(screen: HTMLElement) {
    clearTimeout(scrollTimer);
    navigating = true;
    if (scrollLocked) {
      screens.forEach(candidate => { candidate.inert = candidate !== screen; });
      progress.textContent = `${visited.size} / ${screens.length}`;
    }
    // Native smooth scrolling would leave the cursors aiming at moving rectangles.
    window.scrollTo({ top: screen.offsetTop, behavior: 'instant' });
    screen.scrollTop = 0;
    build(screen);
    cancelAnimationFrame(navigationFrame);
    navigationFrame = requestAnimationFrame(() => { navigating = false; });
  }

  function beginExploration(first: HTMLElement) {
    unlockScroll();
    if (reduced.matches) return;
    visited.clear();
    scrollLocked = true;
    document.documentElement.classList.add('swarm-locked');
    status.hidden = false;
    navigate(first);
  }

  function replayScreen() { navigate(active ?? nearestScreen()); }

  function onClick(event: MouseEvent) {
    if (event.defaultPrevented || event.button !== 0 || event.metaKey || event.ctrlKey || event.shiftKey || event.altKey) return;
    if ((event.target as Element).closest('[data-project]')) unlockScroll();
    const link = (event.target as Element).closest<HTMLAnchorElement>('a[href^="#"]');
    if (!link) return;
    const screen = screens.find(candidate => `#${candidate.id}` === link.getAttribute('href'));
    if (!screen) {
      if (link.hash === '#main') unlockScroll();
      return;
    }
    event.preventDefault();
    history.pushState(null, '', `#${screen.id}`);
    navigate(screen);
  }

  function onScroll(event: Event) {
    if (navigating || scrollLocked) return;
    // Scrolling within a tall screen changes cursor geometry too.
    if (event.target instanceof HTMLElement && event.target.matches('.page-screen, .home-main')) {
      restore();
      return;
    }
    restore();
    clearTimeout(scrollTimer);
    scrollTimer = window.setTimeout(() => {
      const next = nearestScreen();
      // Wait for the screen's snap position before exposing its content.
      if (Math.abs(next.getBoundingClientRect().top) <= 2 && next !== active) build(next);
    }, 140);
  }

  function onFocus(event: FocusEvent) {
    const screen = (event.target as HTMLElement).closest<HTMLElement>('.page-screen');
    if (!screen) return;
    if (screen !== active) {
      unlockScroll();
      navigate(screen);
    } else if (timeline) {
      unlockScroll();
      select(screen);
    }
  }

  function onKey(event: KeyboardEvent) {
    if (event.key === 'Escape') unlockScroll();
    if (scrollLocked && ['ArrowDown', 'ArrowUp', 'PageDown', 'PageUp', 'Home', 'End', ' '].includes(event.key)
      && !(event.target as HTMLElement).closest('button, a, input, textarea, select')) event.preventDefault();
  }

  function onResize() { unlockScroll(); }
  function onMotionChange() { unlockScroll(); replay.hidden = reduced.matches; }
  function onHistory() {
    const screen = screens.find(candidate => `#${candidate.id}` === location.hash) ?? (!location.hash ? screens[0] : null);
    if (screen) navigate(screen);
  }
  function onVisibility() { if (document.hidden) unlockScroll(); }
  function skipAnimation() { unlockScroll(); }

  replay.hidden = reduced.matches;
  skip.addEventListener('click', skipAnimation);
  replay.addEventListener('click', replayScreen);
  document.addEventListener('click', onClick);
  document.addEventListener('focusin', onFocus);
  document.addEventListener('scroll', onScroll, { capture: true, passive: true });
  document.addEventListener('visibilitychange', onVisibility);
  window.addEventListener('keydown', onKey);
  window.addEventListener('resize', onResize);
  window.addEventListener('beforeprint', unlockScroll);
  window.addEventListener('pagehide', unlockScroll);
  window.addEventListener('popstate', onHistory);
  window.addEventListener('hashchange', onHistory);
  reduced.addEventListener('change', onMotionChange);

  // Only the active screen is exposed; without JavaScript every section stays readable.
  document.documentElement.classList.add('swarm-ready');
  // Only explicit navigation changes screens; completion records progress and unlocks scrolling.
  const initial = screens.find(screen => `#${screen.id}` === location.hash);
  if (reduced.matches || location.hash === '#main') {
    active = initial ?? nearestScreen();
    select(active);
    if (initial) navigate(initial);
  } else beginExploration(initial ?? screens[0]);

  return () => {
    unlockScroll();
    document.documentElement.classList.remove('swarm-ready');
    screens.forEach(screen => screen.classList.remove('swarm-active'));
    clearTimeout(scrollTimer);
    cancelAnimationFrame(navigationFrame);
    skip.removeEventListener('click', skipAnimation);
    replay.removeEventListener('click', replayScreen);
    document.removeEventListener('click', onClick);
    document.removeEventListener('focusin', onFocus);
    document.removeEventListener('scroll', onScroll, true);
    document.removeEventListener('visibilitychange', onVisibility);
    window.removeEventListener('keydown', onKey);
    window.removeEventListener('resize', onResize);
    window.removeEventListener('beforeprint', unlockScroll);
    window.removeEventListener('pagehide', unlockScroll);
    window.removeEventListener('popstate', onHistory);
    window.removeEventListener('hashchange', onHistory);
    reduced.removeEventListener('change', onMotionChange);
  };
}
