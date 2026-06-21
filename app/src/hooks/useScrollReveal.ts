import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

export function useScrollReveal<T extends HTMLElement>(
  options: {
    y?: number;
    duration?: number;
    delay?: number;
    stagger?: number;
    start?: string;
  } = {}
) {
  const ref = useRef<T>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const { y = 30, duration = 0.6, delay = 0, stagger = 0, start = "top 85%" } = options;

    const children = el.children.length > 0 && stagger > 0 ? Array.from(el.children) : [el];

    gsap.set(children, { opacity: 0, y });

    const tween = gsap.to(children, {
      opacity: 1,
      y: 0,
      duration,
      delay,
      stagger: stagger > 0 ? stagger : undefined,
      ease: "power2.out",
      scrollTrigger: {
        trigger: el,
        start,
        toggleActions: "play none none none",
      },
    });

    return () => {
      tween.kill();
      ScrollTrigger.getAll().forEach((t) => {
        if (t.trigger === el) t.kill();
      });
    };
  }, [options.y, options.duration, options.delay, options.stagger, options.start]);

  return ref;
}
