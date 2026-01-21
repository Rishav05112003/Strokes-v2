"use client";

import { useState, useEffect } from "react";
import { AnimatePresence, motion } from "framer-motion";
import Hero from "@/components/Hero"; // Renamed from Gallery for clarity
import Loader from "@/components/Loading";

export default function Home() {
  const [isLoading, setIsLoading] = useState(true);

  // Optional: Lock scroll while loading to prevent user from scrolling the hidden homepage
  useEffect(() => {
    if (isLoading) {
      document.body.style.overflow = "hidden";
      window.scrollTo(0, 0);
    } else {
      document.body.style.overflow = "auto";
    }
  }, [isLoading]);

  return (
    <main className="bg-black min-h-screen relative">
      <AnimatePresence mode="sync">
        {isLoading && (
          <motion.div
            key="loader"
            // The "Curtain Lift" Animation
            initial={{ y: 0 }}
            exit={{ y: "-100%" }}
            transition={{ duration: 1.2, ease: [0.76, 0, 0.24, 1] }} // "Quart" easing for that heavy, premium feel
            className="fixed inset-0 z-50" // z-50 ensures it sits ON TOP of the Hero
          >
            <Loader onComplete={() => setIsLoading(false)} />
          </motion.div>
        )}
      </AnimatePresence>

      {/* The Website Content.
        We render this IMMEDIATELY (z-0), but it is hidden behind the Loader (z-50).
        When the loader slides up, this is revealed.
      */}
      <div className="relative z-0">
        <Hero />
        
        {/* Footer / Contact */}
        <section className="h-[50vh] flex flex-col items-center justify-center border-t border-white/10 mt-20">
          <h2 className="font-serif text-4xl text-gray-500 hover:text-white transition-colors cursor-pointer">
            Get in Touch
          </h2>
        </section>
      </div>
    </main>
  );
}