"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";

interface LoaderProps {
  onComplete: () => void; // Function to call when user clicks the button
}

export default function Loader({ onComplete }: LoaderProps) {
  const [progress, setProgress] = useState(0);
  const [isReady, setIsReady] = useState(false);

  // 1. Configuration: Change your background image here
  const bgImageSrc = "loading.jpg"; // Make sure this file exists in public/images/

  useEffect(() => {
    // 2. Logic: Check if user has visited before to speed up loading
    const hasVisited = localStorage.getItem("hasVisited");

    // First visit: 4 seconds, Return visit: 1.5 seconds
    const duration = hasVisited ? 1500 : 4000;
    const intervalTime = duration / 100;

    const timer = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          clearInterval(timer);
          setIsReady(true); // Show the button
          localStorage.setItem("hasVisited", "true");
          return 100;
        }
        return prev + 1;
      });
    }, intervalTime);

    return () => clearInterval(timer);
  }, []);

  return (
    <div className="fixed inset-0 z-50 flex flex-col items-center justify-center bg-black text-white font-serif">
      {/* Background Image with Overlay */}
      <div className="absolute inset-0 z-0">
        <Image
          src="/loading.jpg"
          alt="Loading Background"
          fill
          priority // Loads the image immediately since it's above the fold (critical for a loader)
          className="object-cover object-center opacity-40"
        />
      </div>
      {/* Dark gradient to ensure text readability */}
      <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-black" />

      {/* Content Container */}
      <div className="relative z-10 text-center flex flex-col items-center">
        <p className="font-sans text-sm tracking-[0.4em] text-gray-400 mb-4 animate-pulse">
          Lumen Artspace
        </p>
        <h1 className="text-5xl md:text-7xl leading-none mb-12">
          HERITAGE <br /> IN ART
        </h1>

        {/* Switch between Progress Bar and Button */}
        <div className="h-16 flex items-center justify-center w-full">
          {!isReady ? (
            <div className="flex flex-col items-center gap-2">
              <span className="font-sans text-xs font-bold tracking-widest">
                {progress}%
              </span>
              {/* Progress Bar Track */}
              <div className="w-64 h-[1px] bg-gray-800 relative overflow-hidden">
                <motion.div
                  className="absolute top-0 left-0 h-full bg-white"
                  initial={{ width: "0%" }}
                  animate={{ width: `${progress}%` }}
                  transition={{ ease: "linear", duration: 0.1 }}
                />
              </div>
            </div>
          ) : (
            <motion.button
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              onClick={onComplete} // Triggers the page switch
              className="px-8 py-3 border border-white/20 rounded-full font-sans text-xs tracking-[0.2em] uppercase hover:bg-white hover:text-black hover:scale-105 transition-all duration-500"
            >
              Visit Gallery
            </motion.button>
          )}
        </div>
      </div>
    </div>
  );
}
