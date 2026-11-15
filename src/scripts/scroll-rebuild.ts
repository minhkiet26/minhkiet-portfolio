import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

/** Page-specific, original Swarm choreography; content remains in normal document flow. */
export function setupScrollRebuild() {
  const media = gsap.matchMedia();

  media.add('(prefers-reduced-motion: no-preference)', () => {
    const panels = Array.from(document.querySelectorAll<HTMLElement>(
      '.section-heading, .project-card, .project-footnote, .about-grid > div, #contact > .section-index, .contact-heading, .contact-bottom'
    ));
    const timelines = new Map<HTMLElement, gsap.core.Timeline>();
    const triggers: ScrollTrigger[] = [];
    const workers: HTMLElement[] = [];
    const completed = new Set<HTMLElement>();

    const show = (panel: HTMLElement) => {
      timelines.get(panel)?.kill();
      panel.querySelectorAll('.rebuild-crew').forEach(el => el.remove());
      gsap.set(panel, { clearProps: 'opacity,clipPath' });
      gsap.set(panel.querySelectorAll('[data-build-part]'), { clearProps: 'opacity,transform' });
      completed.add(panel);
    };

    function build(panel: HTMLElement) {
      if (completed.has(panel) || timelines.has(panel)) return;
      const bounds = panel.getBoundingClientRect();
      // Fast scrolling and direct anchor navigation should never leave content hidden above us.
      if (bounds.bottom <= 0) { show(panel); return; }

      const crew = document.createElement('div');
      crew.className = 'rebuild-crew';
      crew.setAttribute('aria-hidden', 'true');
      const names = ['builder', 'designer', 'explorer'];
      const colors = ['mint', 'blue', 'yellow'];
      for (let i = 0; i < 3; i++) {
        const cursor = document.createElement('div');
        cursor.className = `rebuild-pointer ${colors[i]}`;
        cursor.innerHTML = `<svg viewBox="0 0 24 24" width="27" height="27"><path d="m4 3 6 18 3-7 7-3Z"/></svg><span>${names[i]}</span>`;
        crew.append(cursor);
      }
      panel.append(crew);
      workers.push(crew);
      const pointers = Array.from(crew.children);
      const width = bounds.width;
      const height = bounds.height;
      const parts = Array.from(panel.querySelectorAll<HTMLElement>(
        '.project-art, .project-meta, h3, .project-info > p, .tags, .project-footer, .about-text, .toolbox-title, .skill-group, .learning-note'
      ));
      parts.forEach(part => part.setAttribute('data-build-part', ''));
      gsap.set(parts, { opacity: 0, y: 10 });
      gsap.set(pointers, { opacity: 0, x: 10, y: 10 });

      const timeline = gsap.timeline({ onComplete: () => show(panel) });
      timelines.set(panel, timeline);
      timeline.set(panel, { opacity: 1 })
        .fromTo(panel, { clipPath: 'inset(0 100% 0 0)' }, {
          clipPath: 'inset(0 0% 0 0)', duration: .8, ease: 'power2.out'
        }, 0);

      pointers.forEach((pointer, i) => {
        const edge = Math.max(0, width - 85);
        const row = Math.min(height - 40, 16 + height * i * .3);
        timeline.to(pointer, { opacity: 1, duration: .12 }, i * .1)
          .fromTo(pointer, { x: 8 + i * 18, y: row }, {
            x: edge * (i === 1 ? .62 : 1), y: row + 12, duration: .85, ease: 'power2.inOut'
          }, i * .1)
          .to(pointer, { x: Math.min(edge, width * (.35 + i * .23)), y: Math.max(8, height - 50 - i * 18), duration: .45, ease: 'power2.inOut' }, .85 + i * .06)
          .to(pointer, { opacity: 0, duration: .22 }, 1.35 + i * .06);
      });
      if (parts.length) timeline.to(parts, { opacity: 1, y: 0, duration: .42, stagger: .08, ease: 'power2.out' }, .2);
    }

    // Install triggers only after the script loads. No-JS and reduced-motion remain fully readable.
    panels.forEach(panel => {
      panel.classList.add('rebuild-panel');
      const rect = panel.getBoundingClientRect();
      if (rect.top < innerHeight * .85) { completed.add(panel); return; }
      gsap.set(panel, { opacity: 0 });
      triggers.push(ScrollTrigger.create({
        trigger: panel,
        start: 'top 88%',
        once: true,
        onEnter: () => build(panel),
        onEnterBack: () => build(panel)
      }));
    });

    const onFocus = (event: FocusEvent) => {
      const panel = (event.target as HTMLElement).closest<HTMLElement>('.rebuild-panel');
      if (panel) show(panel);
    };
    const showAll = (event: KeyboardEvent) => { if (event.key === 'Escape') panels.forEach(show); };
    const onResize = () => { timelines.forEach((_, panel) => show(panel)); };
    const onPrint = () => panels.forEach(show);
    document.addEventListener('focusin', onFocus);
    window.addEventListener('keydown', showAll);
    window.addEventListener('resize', onResize);
    window.addEventListener('beforeprint', onPrint);

    return () => {
      triggers.forEach(trigger => trigger.kill());
      panels.forEach(panel => {
        show(panel);
        panel.classList.remove('rebuild-panel');
        panel.querySelectorAll('[data-build-part]').forEach(part => part.removeAttribute('data-build-part'));
      });
      workers.forEach(worker => worker.remove());
      document.removeEventListener('focusin', onFocus);
      window.removeEventListener('keydown', showAll);
      window.removeEventListener('resize', onResize);
      window.removeEventListener('beforeprint', onPrint);
    };
  });

  window.addEventListener('pagehide', () => media.revert(), { once: true });
}
