"use client";

import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";
import AnimatedButton from "@/components/AnimatedButton"; // Using the component we made earlier
import { HERO_CONTENT } from "@/public/data/homeData";
import { useTransition } from "@/context/TransitionContext";
import { useRouter } from "next/navigation";

export default function Hero() {
  const ref = useRef(null);
  const router = useRouter();
  const { startTransition, endTransition } = useTransition();

  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end start"],
  });

  // Parallax Effects
 const yText = useTransform(scrollYProgress, [0, 1], ["0%", "50%"]);
  const opacity = useTransform(scrollYProgress, [0, 0.5], [1, 0]);
  const scale = useTransform(scrollYProgress, [0, 1], [1, 1.1]);


  const handleVisit = () => {
    startTransition();
    setTimeout(() => {
      router.push("/gallery");
      setTimeout(endTransition, 500); // Clean up transition state
    }, 800);
  };

  return (
    <section ref={ref} className="relative h-screen flex flex-col items-center justify-center overflow-hidden">
      
      {/* Background Layer */}
      <motion.div 
        style={{ scale }}
        className="absolute inset-0 z-0 opacity-40"
      >
        <div 
            className="w-full h-full bg-cover bg-center"
            style={{ backgroundImage: `url(${HERO_CONTENT.bgImage})` }} 
        />
        {/* Gradient Fade at bottom to blend with next section */}
        <div className="absolute bottom-0 left-0 w-full h-32 bg-gradient-to-t from-black to-transparent" />
      </motion.div>

      {/* Content Layer */}
      <motion.div 
        style={{ y: yText, opacity }} 
        className="relative z-10 text-center flex flex-col items-center"
      >
        <p className="font-serif italic text-gray-400 mb-4 text-lg">The official art, photography and film club</p>
        <h1 className="font-serif text-6xl md:text-9xl leading-[0.85] text-white mb-10 mix-blend-overlay">
          {HERO_CONTENT.title} <br />
          <span className="font-light italic text-gray-300">{HERO_CONTENT.subtitle}</span>
        </h1>

        <AnimatedButton onClick={handleVisit} className="mt-8">
          Visit Gallery
        </AnimatedButton>
      </motion.div>
    </section>
  );
}