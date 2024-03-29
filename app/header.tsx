"use client"

import { ModeToggle } from "@/components/mode-toggle";
import { Button } from "@/components/ui/button";
import { signIn, signOut, useSession } from "next-auth/react";
import Image from "next/image";

export default function Header(){
    const session = useSession();
    console.log(session);
    const image:string = session.data?.user?.image!;
    return (
        <header className="flex justify-between p-3">
            <div className="font-sans text-3xl font-medium">
                devfinder
            </div>
            <div className="flex">
                <div className="mr-3">
                {session.data ? (
                
                   
                <Button onClick={() => signOut()}>
                    Sign Out
                </Button>
            ): (
                <Button  onClick={() => signIn("google")}>
                    Sign In
                </Button>
            
            )}
            </div>
                <ModeToggle/>
            </div>
        </header>
    )
}