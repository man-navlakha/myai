"use client"
import * as React from "react"
import { Button } from "../ui/button"
import { ModeToggle } from "./ModeToggle"
import Image from "next/image";
import { useRouter } from 'next/navigation';
import { MagicCard } from "@/components/magicui/magic-card";

export function Navbar() {
    const router = useRouter();

    return (
        <>
        <MagicCard   gradientColor="dark:#262626 #D9D9D955">
            <div className="w-full dark:bg-white/30 bg-black/30 p-4 sticky top-0 backdrop-blur-md">
                <div className="flex flex-cols justify-between items-center ">

                    <div>   <Image
                              className="dark:contrast"
                              src="/view.png"
                              alt="Next.js logo"
                              width={50}
                              height={0}
                              priority
                            /> </div>
                    <div className="flex gap-4"><Button onClick={() => router.push('/auth/login')}>Login</Button>
                        <ModeToggle /></div>
                </div>
            </div>
            </MagicCard>

        </>
    )
}