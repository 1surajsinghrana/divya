import { useScrollReveal } from "@/hooks/useScrollReveal";

export default function BrandStorySection() {
  const ref = useScrollReveal<HTMLDivElement>({ y: 40, duration: 0.8 });

  return (
    <section className="bg-[#FAF8F3] py-16 lg:py-20 relative overflow-hidden">
      {/* Subtle decorative leaf */}
      <svg
        className="absolute top-10 left-10 w-32 h-32 text-[#1B5E20] opacity-[0.04] rotate-12"
        viewBox="0 0 100 100"
        fill="currentColor"
      >
        <path d="M50 5C30 20 10 40 10 65c0 20 15 30 40 30s40-10 40-30C90 40 70 20 50 5z" />
      </svg>
      <svg
        className="absolute bottom-10 right-10 w-40 h-40 text-[#1B5E20] opacity-[0.04] -rotate-12"
        viewBox="0 0 100 100"
        fill="currentColor"
      >
        <path d="M50 5C30 20 10 40 10 65c0 20 15 30 40 30s40-10 40-30C90 40 70 20 50 5z" />
      </svg>

      <div className="max-w-[800px] mx-auto px-4 lg:px-6 text-center" ref={ref}>
        <p className="font-serif italic text-xl lg:text-3xl text-[#1B5E20] leading-[1.8] lg:leading-[1.8]">
          The dry fruits on our tables come from distant orchards and sun-drenched valleys.
          <br className="hidden lg:block" />
          <br />
          Yet why do we settle for anything less than the purest?
          <br className="hidden lg:block" />
          <br />
          To protect the ancient trees that have fed generations,
          <br />
          To nourish our families with nature&apos;s true goodness,
          <br />
          The time has come to look beyond the ordinary.
          <br className="hidden lg:block" />
          <br />
          From farm to your home. From nature with love.
          <br />
          Divya Dry Fruits — where purity meets taste,
          <br />
          Where every bite carries the warmth of the earth
          <br />
          And the promise of a healthier tomorrow.
        </p>
        <p className="mt-8 text-xs font-medium uppercase tracking-[1.5px] text-[#D4AF37]">
          — Divya Dry Fruits Family
        </p>
      </div>
    </section>
  );
}
