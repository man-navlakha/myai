// components/Navbar.tsx
"use client";
import * as React from "react";
import { Button } from "../ui/button";
import { ModeToggle } from "./ModeToggle";
import Image from "next/image";
import { useRouter } from 'next/navigation';
import { MagicCard } from "@/components/magicui/magic-card";
import { ArrowRightFromLine  } from "lucide-react";

interface NavbarProps {
    isOpen: boolean;
  onToggleSidebar: () => void;
}

export function Navbar({ isOpen,onToggleSidebar }: NavbarProps) {
  const router = useRouter();

  return (
    <MagicCard gradientColor="dark:#262626 #D9D9D955">
      <div className="w-full dark:bg-white/30 bg-black/30 p-4 sticky top-0 backdrop-blur-md">
        <div className="flex justify-between items-center">
          {/* Sidebar toggle button */}
          <div className="flex">
            {!isOpen ? (

                <button onClick={onToggleSidebar}>
            <ArrowRightFromLine />
          </button>
        ):''}
          <Image
            className="dark:contrast mx-3"
            src="/view.png"
            alt="Logo"
            width={40}
            height={40}
            priority
            />
            </div>

          <div className="flex items-center gap-4">
            <Button onClick={() => router.push('/auth/login')}>Login</Button>
            <ModeToggle />
          </div>
        </div>
      </div>
    </MagicCard>
  );
}
