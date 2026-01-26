"use client";

import Link from "next/link";
import Image from "next/image";
import { motion } from "framer-motion";
import { BsArrowDownRight } from "react-icons/bs"; // Run: npm install react-icons
import AnimatedButton from "./AnimatedButton";

export default function Navbar() {
  const navLinks = [
    { name: "HOME", href: "/" },
    { name: "ABOUT", href: "/about" },
    { name: "GALLERY", href: "/gallery" },
  ];

  return (
    <motion.nav 
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 1, delay: 0.5 }}
      className="absolute top-0 left-0 w-full z-40 flex items-center justify-between px-6 md:px-12 py-8 text-white mix-blend-difference"
    >
      {/* --- LEFT: Navigation Links --- */}
      <div className="hidden md:flex items-center gap-8">
        {navLinks.map((link) => (
          <Link key={link.name} href={link.href} className="group relative">
            <span className="font-sans text-xs tracking-[0.2em] uppercase hover:text-gray-300 transition-colors">
              {link.name}
            </span>
            {/* Hover Underline Animation */}
            <span className="absolute -bottom-1 left-0 w-0 h-[1px] bg-white transition-all duration-300 group-hover:w-full" />
          </Link>
        ))}
      </div>

      {/* --- CENTER: Logo Cluster --- */}
      <div className="flex items-center gap-6">
        <span className="font-serif italic text-lg text-gray-300">20</span>
        
        {/* Logo Image */}
        <div className="relative w-20 h-20 md:w-16 md:h-16">
          <Image 
            src="/strokes_logo_face.png" // Replace with your actual logo file path in public/
            alt="Strokes Logo"
            fill
            className="object-contain"
          />
        </div>

        <span className="font-serif italic text-lg text-gray-300">26</span>
      </div>

      {/* --- RIGHT: Contact Group --- */}
      <Link href="/contact" className="group flex items-center gap-4">
        {/* Pill Text */}
        <AnimatedButton>Contact</AnimatedButton>
        
        {/* Circle Arrow */}
        <div className="w-10 h-10 bg-white rounded-full flex items-center justify-center text-black transition-transform duration-300 group-hover:scale-110 group-hover:-rotate-45">
          <BsArrowDownRight className="text-lg" />
        </div>
      </Link>
    </motion.nav>
  );
}