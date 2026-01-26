"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import { IMPRESSIONS_IMAGES } from "@/public/data/homeData";

export default function Impressions() {
  return (
    <section className="relative z-10 py-32 px-4 bg-[#050505]">
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        className="text-center mb-20"
      >
        <h2 className="font-serif text-6xl md:text-8xl">
          Impressions <br />
          <span className="italic font-thin text-gray-500">Of Heritage</span>
        </h2>
      </motion.div>

      {/* Masonry Grid */}
      <div className="max-w-7xl mx-auto columns-1 md:columns-2 lg:columns-3 gap-8 space-y-8">
        {IMPRESSIONS_IMAGES.map((img, idx) => (
          <motion.div
            key={idx}
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-50px" }}
            transition={{ duration: 0.6, delay: idx * 0.1 }}
            className="break-inside-avoid group cursor-pointer"
          >
            <div className="relative overflow-hidden bg-gray-900 rounded-sm mb-2">
              <Image
                src={img.src}
                alt={img.title}
                width={600}
                height={800}
                className="w-full h-auto transition-transform duration-700 group-hover:scale-105 opacity-80 group-hover:opacity-100"
              />
              {/* Hover Overlay */}
              <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300 bg-black/20">
                <div className="w-10 h-10 rounded-full bg-white/20 backdrop-blur-md flex items-center justify-center">
                   <span className="text-white text-xl">+</span>
                </div>
              </div>
            </div>
            <div className="flex justify-between items-baseline border-b border-white/10 pb-2">
                <span className="font-serif text-lg text-gray-300">{img.title}</span>
                <span className="font-sans text-[10px] tracking-widest text-gold-400 uppercase">Lacquer</span>
            </div>
          </motion.div>
        ))}
      </div>
    </section>
  );
}