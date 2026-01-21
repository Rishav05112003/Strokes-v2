"use client";

import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import Gallery from "@/components/Gallery";
// import Gallery from "@/components/Gallery"; // Assuming you made this from previous steps
import Loader from "@/components/Loading";

export default function Home() {
  const [showLoader, setShowLoader] = useState(true);

  return (
    <main className="bg-black min-h-screen">
      <AnimatePresence mode="wait">
        {showLoader ? (
          // 1. Render Loader
          <motion.div
            key="loader"
            exit={{ opacity: 0, transition: { duration: 0.8, ease: "easeInOut" } }} // Fade out effect
          >
            <Loader onComplete={() => setShowLoader(false)} />
          </motion.div>
        ) : (
          // 2. Render Main Website (Hero + Gallery)
          <motion.div
            key="home"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1 }}
          >
            {/* <Hero /> */}
            <Gallery />
            
            {/* Footer / Contact */}
            <section className="h-[50vh] flex flex-col items-center justify-center border-t border-white/10">
              <h2 className="font-serif text-4xl text-gray-500">Get in Touch</h2>
            </section>
          </motion.div>
        )}
      </AnimatePresence>
    </main>
  );
}