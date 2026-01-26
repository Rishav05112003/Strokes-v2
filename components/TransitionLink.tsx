"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { ReactNode } from "react";
import { useTransition } from "@/context/TransitionContext";

interface TransitionLinkProps {
  href: string;
  children: ReactNode;
  className?: string;
}

export default function TransitionLink({ href, children, className }: TransitionLinkProps) {
  const router = useRouter();
  const { startTransition, endTransition } = useTransition();

  const handleClick = (e: React.MouseEvent<HTMLAnchorElement>) => {
    e.preventDefault(); // Prevent immediate navigation
    
    // 1. Start Animation (Curtains slide up)
    startTransition();

    // 2. Wait for animation to cover screen (approx 800ms)
    setTimeout(() => {
      router.push(href); // Navigate
      
      // 3. Reset state after navigation happens 
      // (Next.js keeps client state, so we need to manually trigger the exit)
      setTimeout(() => {
        endTransition();
      }, 500); 
    }, 800);
  };

  return (
    <Link href={href} onClick={handleClick} className={className}>
      {children}
    </Link>
  );
}