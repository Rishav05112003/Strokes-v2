"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";
import { BsArrowRight, BsArrowLeft } from "react-icons/bs";
import { MASTERPIECES } from "@/public/data/homeData";

export default function Masterpieces() {
  const [currentIndex, setCurrentIndex] = useState(0);

  const nextSlide = () => {
    setCurrentIndex((prev) => (prev + 1) % MASTERPIECES.length);
  };
  
  const prevSlide = () => {
    setCurrentIndex((prev) => (prev === 0 ? MASTERPIECES.length - 1 : prev - 1));
  };

  const currentArt = MASTERPIECES[currentIndex];

  return (
    <section className="relative py-32 bg-[#0a0a0a] overflow-hidden text-center">
       {/* Background Text Element */}
       <div className="absolute top-10 left-0 w-full text-center pointer-events-none opacity-10">
          <h2 className="font-serif text-[12vw] leading-none text-white">TIMELESS</h2>
       </div>

       <div className="relative z-10 max-w-6xl mx-auto px-6 mt-20">
          <h3 className="font-serif text-4xl md:text-6xl mb-4">{currentArt.title}</h3>
          <p className="font-sans text-xs tracking-[0.2em] text-gold-400 mb-12 uppercase">{currentArt.artist}</p>

          <div className="relative w-full aspect-square md:aspect-video max-h-[60vh]">
            <AnimatePresence mode="wait">
              <motion.div
                key={currentIndex}
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 1.05 }}
                transition={{ duration: 0.8, ease: "easeInOut" }}
                className="absolute inset-0"
              >
                 <Image 
                    src={currentArt.src} 
                    alt={currentArt.title}
                    fill
                    className="object-contain"
                 />
              </motion.div>
            </AnimatePresence>

            {/* Controls */}
            <div className="absolute bottom-4 left-4 flex gap-4">
                <button onClick={prevSlide} className="p-3 rounded-full border border-white/20 hover:bg-white hover:text-black transition-colors">
                    <BsArrowLeft />
                </button>
                <button onClick={nextSlide} className="p-3 rounded-full border border-white/20 hover:bg-white hover:text-black transition-colors">
                    <BsArrowRight />
                </button>
            </div>
          </div>
       </div>
    </section>
  );
}