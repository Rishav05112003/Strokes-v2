"use client";

import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";

export default function Gallery() {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end start"],
  });

  const y = useTransform(scrollYProgress, [0, 1], ["0%", "50%"]);
  const opacity = useTransform(scrollYProgress, [0, 0.8], [1, 0]);

  return (
    <section
      ref={ref}
      className="relative h-screen w-full flex flex-col items-center justify-center overflow-hidden"
    >
      <motion.div style={{ y, opacity }} className="z-10 text-center px-4">
        {/* 'font-sans' now maps to Inter via globals.css */}
        <span className="block text-sm md:text-base tracking-[0.4em] text-gray-400 mb-6 font-sans uppercase">
          Lumen Artspace
        </span>
        
        {/* 'font-serif' now maps to Playfair via globals.css */}
        <h1 className="font-serif text-6xl md:text-9xl leading-[0.85] text-[#f0f0f0]">
          HERITAGE <br />
          <span className="italic font-light text-gray-300">IN ART</span>
        </h1>
      </motion.div>

      {/* Gradient Overlay */}
      <div className="absolute bottom-0 w-full h-1/3 bg-gradient-to-t from-black to-transparent z-20 pointer-events-none" />
    </section>
  );
}