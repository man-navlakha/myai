// components/Navbar.tsx
"use client";
import * as React from "react";
import { Button } from "../ui/button";
import { ModeToggle } from "./ModeToggle";
import Image from "next/image";
import Link from 'next/link'; // Import Link
import { GripVertical   } from "lucide-react";

interface NavbarProps {
    isOpen: boolean;
  onToggleSidebar: () => void;
}

export function Navbar({ isOpen,onToggleSidebar }: NavbarProps) {

  return (
    <div className="w-full sticky top-0 z-10 bg-white/30 dark:bg-black/30 backdrop-blur-md bg-opacity-10 border-b border-white/20 shadow-sm px-4 py-2">
    <div className="flex justify-between items-center max-w-7xl mx-auto">
      {/* Left: Logo & Sidebar Toggle */}
      <div className="flex items-center gap-3">
        {!isOpen && (
          <button
            onClick={onToggleSidebar}
            aria-label="Open sidebar"
            className="p-2 rounded hover:bg-white/30 dark:hover:bg-white/10 transition"
          >
            <GripVertical  className="w-5 h-5 text-black dark:text-white " />
          </button>
        )}
  
        <Image
          className="dark:contrast"
          src="/view.png"
          alt="Logo"
          width={40}
          height={40}
          priority
        />
      </div>
  
      {/* Right: Controls */}
      <div className="flex items-center gap-3">
        <Link href="/auth/login"> {/* Use Link for internal navigation */}
          <Button className="text-sm">
            Login
          </Button>
        </Link>
        <ModeToggle />
      </div>
    </div>
  </div>
  );
}