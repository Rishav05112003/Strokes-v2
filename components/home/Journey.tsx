"use client";

import { motion, useScroll, useTransform } from "framer-motion";
import Image from "next/image";
import { useRef } from "react";
import { useRouter } from "next/navigation";
import AnimatedButton from "@/components/AnimatedButton";
import { JOURNEY_CONTENT } from "@/public/data/homeData";
import { useTransition } from "@/context/TransitionContext";

export default function Journey() {
  const router = useRouter();
  const { startTransition, endTransition } = useTransition();
  const containerRef = useRef<HTMLDivElement | null>(null);

  /* ---------------- Scroll Tracking ---------------- */

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"],
  });

  /**
   * Reveal window:
   * 30% → 70% of scroll progress
   * Micro-staggered per image
   */

  const progress1 = useTransform(scrollYProgress, [0.3, 0.65], [0, 1]);
  const progress2 = useTransform(scrollYProgress, [0.35, 0.7], [0, 1]);
  const progress3 = useTransform(scrollYProgress, [0.4, 0.75], [0, 1]);

  /* ---------------- Mask X Translation ----------------
     Starts fully covering image (-100%)
     Slides to the right (100%)
  ------------------------------------------------------ */

  const maskX1 = useTransform(progress1, [0, 1], ["0%", "100%"]);
  const maskX2 = useTransform(progress2, [0, 1], ["0%", "100%"]);
  const maskX3 = useTransform(progress3, [0, 1], ["0%", "100%"]);

  const opacity1 = progress1;
  const opacity2 = progress2;
  const opacity3 = progress3;

  const masks = [
    { x: maskX1, opacity: opacity1 },
    { x: maskX2, opacity: opacity2 },
    { x: maskX3, opacity: opacity3 },
  ];

  /* ---------------- Scattered Layout ---------------- */

  const positionClasses = [
    "top-0 -left-8 w-[52%] z-10 aspect-[4/5]",
    "top-[12%] -right-10 w-[46%] z-20 aspect-[3/4]",
    "bottom-2 right-[18%] w-[48%] z-30 aspect-[1/1]",
  ];

  /* ---------------- Navigation ---------------- */

  const handleAbout = () => {
    startTransition();
    setTimeout(() => {
      router.push("/about");
      setTimeout(endTransition, 500);
    }, 800);
  };

  const displayImages = JOURNEY_CONTENT.images.slice(0, 3);

  return (
    <section className="relative z-10 py-24 px-6 md:px-12 max-w-7xl mx-auto flex flex-col md:flex-row gap-16 items-center overflow-hidden bg-black">
      
      {/* ---------------- Text Section ---------------- */}
      <motion.div
        initial={{ opacity: 0, x: -40 }}
        whileInView={{ opacity: 1, x: 0 }}
        viewport={{ once: true, margin: "-20%" }}
        transition={{ duration: 0.8, ease: "easeOut" }}
        className="flex-1 space-y-8 relative z-40"
      >
        <h2 className="font-serif text-5xl md:text-7xl leading-tight text-white">
          {JOURNEY_CONTENT.title} <br />
          <span className="italic text-gray-400">
            {JOURNEY_CONTENT.subtitle}
          </span>
        </h2>

        <p className="font-sans text-gray-400 leading-relaxed max-w-md text-sm md:text-base">
          {JOURNEY_CONTENT.description}
        </p>

        <AnimatedButton onClick={handleAbout}>
          About Us
        </AnimatedButton>
      </motion.div>

      {/* ---------------- Image Reveal Section ---------------- */}
      <div
        ref={containerRef}
        className="flex-1 relative w-full h-[600px] md:h-[700px]"
      >
        {displayImages.map((src, idx) => (
          <motion.div
            key={idx}
            style={{ opacity: masks[idx].opacity }}
            className={`absolute overflow-hidden rounded-sm shadow-2xl ${positionClasses[idx]}`}
          >
            {/* Image (static, never moves) */}
            <Image
              src={src}
              alt={`Journey Art ${idx + 1}`}
              fill
              className="object-cover"
              sizes="(max-width: 768px) 100vw, 50vw"
            />

            {/* Sliding Black Mask */}
            <motion.div
              style={{ x: masks[idx].x }}
              className="absolute inset-0 bg-black z-20"
            />
          </motion.div>
        ))}
      </div>
    </section>
  );
}
