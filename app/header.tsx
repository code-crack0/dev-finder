"use client";

import { ModeToggle } from "@/components/mode-toggle";
import { Button } from "@/components/ui/button";
import { signIn, signOut, useSession } from "next-auth/react";
import Image from "next/image";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { LogInIcon, LogOutIcon } from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import Link from "next/link";

function AccountDropdown() {
  const session = useSession();
  const isLoggedIn = !!session.data;
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost">
          {session?.data ? (
            <Avatar className="mr-2">
              <AvatarImage src={session?.data?.user?.image ?? ""} height={40} width={40}/>
              <AvatarFallback>{session?.data?.user?.name![0]}</AvatarFallback>
            </Avatar>
          ) : (
            <></>
          )}

          {session?.data?.user?.name || "Account"}
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent>
        {isLoggedIn ? (
          <DropdownMenuItem onClick={() => signOut({
            callbackUrl: "/"
          })}>
            <LogOutIcon className="mr-2" /> Sign Out
          </DropdownMenuItem>
        ) : (
          <DropdownMenuItem onClick={() => signIn("google")}>
            <LogInIcon className="mr-2" /> Sign In
          </DropdownMenuItem>
        )}
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
export default function Header() {
  const session = useSession();
  const isLoggedIn = !!session.data;
  return (
    <header className="py-2 container mx-auto z-10 relative">
      <div className="flex justify-between items-center">
        <Link
          href="/"
          className="font-sans text-3xl font-medium hover:underline "
        >
          devfinder
        </Link>
        <nav className="flex gap-4">
          {
            isLoggedIn && (
              <>
                <Link href="/browse" className="hover:underline"> Browse</Link>
                <Link href="/your-rooms" className="hover:underline">Your Rooms</Link>
              </>
            )
          }
        </nav>
        <div className="flex items-center gap-4">
          <AccountDropdown />

          <ModeToggle />
        </div>
      </div>
    </header>
  );
}
