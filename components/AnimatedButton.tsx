"use client";

import { motion , HTMLMotionProps} from "framer-motion";
import { cn } from "@/lib/utils"; 

interface AnimatedButtonProps extends HTMLMotionProps<"button"> {
  children: React.ReactNode;
  className?: string;
}

export default function AnimatedButton({ children, className, onClick, ...props }: AnimatedButtonProps) {
  return (
    <motion.button
      className={cn(
        // Base Styles
        "relative overflow-hidden rounded-full border border-white/30 backdrop-blur-sm transition-colors",
        // Default Size (can be overridden via className)
        "px-8 py-3", 
        // Font Styles
        "font-sans text-xs tracking-[0.2em] uppercase text-white",
        className
      )}
      onClick={onClick}
      initial="initial"
      whileHover="hover"
      {...props}
    >
      {/* 1. The Fill Animation Layer */}
      <motion.div
        className="absolute inset-0 bg-[#d4af37] z-0" // The Gold Color
        variants={{
          initial: { scaleY: 0 },
          hover: { scaleY: 1 },
        }}
        transition={{ duration: 0.3, ease: "easeInOut" }}
        style={{ originY: 1 }} // Ensures it grows from the bottom up
      />

      {/* 2. The Text Layer */}
      {/* z-10 ensures text sits on top of the gold fill. 
          mix-blend-difference or explicit color change handles the contrast. 
          Here we use explicit color change for cleaner control. */}
      <motion.span
        className="relative z-10 block"
        variants={{
          initial: { color: "#ffffff" },
          hover: { color: "#000000" },
        }}
        transition={{ duration: 0.2 }}
      >
        {children}
      </motion.span>
    </motion.button>
  );
}