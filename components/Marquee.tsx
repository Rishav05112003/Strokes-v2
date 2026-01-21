"use client";
import { useRef } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import Image from "next/image";

const artworks = [
  "/images/art1.jpg", "/images/art2.jpg", "/images/art3.jpg", "/images/art4.jpg"
];

export default function Marquee() {
  const firstRow = useRef<HTMLDivElement>(null);
  const secondRow = useRef<HTMLDivElement>(null);

  useGSAP(() => {
    // Infinite loop animation
    const animateRow = (ref: React.RefObject<HTMLDivElement>, direction: 1 | -1) => {
      if (!ref.current) return;
      const width = ref.current.scrollWidth / 2; // Assuming duplicated content
      
      gsap.to(ref.current, {
        x: direction * -width,
        duration: 20,
        ease: "none",
        repeat: -1,
        modifiers: {
          x: gsap.utils.unitize((x) => parseFloat(x) % width)
        }
      });
    };

    // Note: A simpler approach for Next.js is using CSS animations, 
    // but GSAP gives you scroll speed control if needed.
    animateRow(firstRow, 1);
  }, []);

  return (
    <section className="py-20 bg-brand-light overflow-hidden">
      <div className="mb-12 text-center">
        <h2 className="font-serif text-6xl md:text-8xl text-brand-dark">Reflection</h2>
        <span className="font-sans text-brand-gold italic text-xl">of Art</span>
      </div>

      {/* Marquee Wrapper */}
      <div className="flex gap-4 whitespace-nowrap" ref={firstRow}>
        {/* Render items twice for infinite loop seamlessness */}
        {[...artworks, ...artworks, ...artworks].map((src, i) => (
          <div key={i} className="relative w-[300px] h-[400px] flex-shrink-0">
            <Image src={src} alt="Art" fill className="object-cover grayscale hover:grayscale-0 transition-all duration-500" />
          </div>
        ))}
      </div>
    </section>
  );
}