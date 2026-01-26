"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { BsArrowDownRight } from "react-icons/bs";
import { CgClose, CgMenuLeft } from "react-icons/cg"; // Install: npm i react-icons

export default function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const navLinks = [
    { name: "HOME", href: "/" },
    { name: "ABOUT", href: "/about" },
    { name: "GALLERY", href: "/gallery" },
    // Add Contact here for mobile menu list
    { name: "CONTACT", href: "/contact", mobileOnly: true }, 
  ];

  const toggleMenu = () => setIsMenuOpen(!isMenuOpen);

  // Lock body scroll when menu is open
  useEffect(() => {
    if (isMenuOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "auto";
    }
  }, [isMenuOpen]);

  // Animation variants for mobile menu links
  const containerVariants = {
    hidden: { transition: { staggerChildren: 0.05, staggerDirection: -1 } },
    visible: { transition: { staggerChildren: 0.07, delayChildren: 0.3 } },
  };

  const linkVariants = {
    hidden: { y: 50, opacity: 0, transition: { duration: 0.4, ease: [0.76, 0, 0.24, 1] as const } },
    visible: { y: 0, opacity: 1, transition: { duration: 0.4, ease: [0.76, 0, 0.24, 1] as const } },
  };

  return (
    <>
      {/* --- MAIN NAVBAR (Floating) --- */}
      <motion.nav 
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1, delay: 0.5 }}
        className="absolute top-0 left-0 w-full z-50 flex items-center justify-between px-6 md:px-12 py-6 md:py-8 text-white mix-blend-difference"
      >
        {/* --- LEFT SECTION --- */}
        <div className="flex items-center gap-8">
             {/* 1. Mobile Menu Toggle Button (Visible on Mobile Only) */}
             <button 
                onClick={toggleMenu} 
                className="md:hidden relative z-50 text-white mix-blend-difference p-2 -ml-2"
                aria-label="Open Menu"
            >
                <CgMenuLeft size={24} />
            </button>

            {/* 2. Desktop Navigation Links (Hidden on Mobile) */}
            <div className="hidden md:flex items-center gap-8">
            {navLinks.filter(link => !link.mobileOnly).map((link) => (
                <Link key={link.name} href={link.href} className="group relative">
                <span className="font-sans text-xs tracking-[0.2em] uppercase hover:text-gray-300 transition-colors">
                    {link.name}
                </span>
                <span className="absolute -bottom-1 left-0 w-0 h-[1px] bg-white transition-all duration-300 group-hover:w-full" />
                </Link>
            ))}
            </div>
        </div>

        {/* --- CENTER: Logo Cluster --- */}
        {/* Absolute center on mobile, static on desktop */}
        <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 md:static md:translate-x-0 md:translate-y-0 flex items-center gap-4 md:gap-6">
          <span className="font-serif italic text-base md:text-lg text-gray-300">20</span>
          
          <div className="relative w-10 h-10 md:w-16 md:h-16">
            <Image 
              src="/strokes_logo_face.png" 
              alt="Strokes Logo"
              fill
              className="object-contain"
            />
          </div>

          <span className="font-serif italic text-base md:text-lg text-gray-300">25</span>
        </div>

        {/* --- RIGHT SECTION --- */}
        <div>
            {/* 1. Desktop Contact Group (Hidden on Mobile) */}
            <Link href="/contact" className="hidden md:flex group items-center gap-4">
                <div className="border border-white/30 px-6 py-2 rounded-full backdrop-blur-sm transition-all duration-300 group-hover:border-white group-hover:bg-white/10">
                <span className="font-sans text-xs tracking-[0.2em] uppercase">Contact</span>
                </div>
                <div className="w-10 h-10 bg-white rounded-full flex items-center justify-center text-black transition-transform duration-300 group-hover:scale-110 group-hover:-rotate-45">
                <BsArrowDownRight className="text-lg" />
                </div>
            </Link>

            {/* 2. Mobile Contact Arrow (Visible on Mobile Only) */}
            <Link href="/contact" className="md:hidden flex items-center justify-center w-10 h-10 bg-white rounded-full text-black">
                 <BsArrowDownRight className="text-lg" />
            </Link>
        </div>
      </motion.nav>

      {/* --- MOBILE FULLSCREEN MENU OVERLAY --- */}
      <AnimatePresence>
        {isMenuOpen && (
          <motion.div
            initial={{ y: "-100%" }}
            animate={{ y: 0 }}
            exit={{ y: "-100%" }}
            transition={{ duration: 0.8, ease: [0.76, 0, 0.24, 1] as const }}
            className="fixed inset-0 bg-[#0a0a0a] z-[60] flex flex-col items-center justify-center"
          >
             {/* Close Button */}
             <button 
                onClick={toggleMenu}
                className="absolute top-6 right-6 text-white p-2 hover:opacity-70 transition-opacity"
            >
                <CgClose size={32} />
             </button>

             {/* Background Decoration */}
             <div className="absolute inset-0 bg-[url('/noise.png')] opacity-5 pointer-events-none"></div>

            <motion.div 
                variants={containerVariants}
                initial="hidden"
                animate="visible"
                exit="hidden"
                className="flex flex-col items-center gap-8 text-center"
            >
              {navLinks.map((link) => (
                <div key={link.name} className="overflow-hidden">
                    <motion.div variants={linkVariants}>
                        <Link 
                        href={link.href} 
                        onClick={toggleMenu}
                        className="font-serif text-4xl md:text-6xl text-white hover:text-gold-400 transition-colors block"
                        >
                        {link.name.charAt(0) + link.name.slice(1).toLowerCase()}
                        </Link>
                    </motion.div>
                </div>
              ))}
            </motion.div>

             {/* Mobile Footer Info */}
             <motion.div 
                 initial={{ opacity: 0 }} animate={{ opacity: 1, transition: { delay: 0.8 } }}
                 className="absolute bottom-10 font-sans text-xs tracking-[0.2em] text-gray-500 uppercase"
             >
                 Lumen Artspace 2025
             </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}