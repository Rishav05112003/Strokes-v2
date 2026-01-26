"use client";

import { motion } from "framer-motion";
import { useTransition } from "@/context/TransitionContext";

export default function PageTransitionLoader() {
  const { isTransitioning } = useTransition();

  const curtainVariants = {
    initial: { y: "100%" }, // Start below screen
    enter: { y: "0%" },     // Cover screen
    exit: { y: "-100%" },   // Slide up and away
  };

  return (
    <div className="fixed inset-0 pointer-events-none z-[100] flex flex-col">
      
      {/* --- CURTAIN 1 (Dark Grey/Black) --- */}
      {/* This is the main blocker */}
      <motion.div
        variants={curtainVariants}
        initial="initial"
        animate={isTransitioning ? "enter" : "exit"}
        transition={{ 
            duration: 0.8, 
            ease: [0.76, 0, 0.24, 1] as const // Custom Quart easing
        }}
        className="fixed inset-0 bg-[#1a1a1a] z-50"
      />

      {/* --- CURTAIN 2 (Gold Accent) --- */}
      {/* Lags slightly behind for the layered effect */}
      <motion.div
        variants={curtainVariants}
        initial="initial"
        animate={isTransitioning ? "enter" : "exit"}
        transition={{ 
            duration: 0.8, 
            ease: [0.76, 0, 0.24, 1] as const, 
            delay: 0.1 // Slight delay creates the "2 curtain" look
        }}
        className="fixed inset-0 bg-[#d4af37] z-40"
      />

      {/* Optional: Add Logo or Text in the center while loading */}
      <motion.div
         initial={{ opacity: 0 }}
         animate={isTransitioning ? { opacity: 1 } : { opacity: 0 }}
         transition={{ duration: 0.3, delay: 0.2 }}
         className="fixed inset-0 z-[60] flex items-center justify-center"
      >
          <span className="font-serif text-white text-4xl italic">Lumen</span>
      </motion.div>
    </div>
  );
}