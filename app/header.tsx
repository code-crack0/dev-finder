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
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { DeleteIcon, LogInIcon, LogOutIcon } from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import Link from "next/link";
import { useState } from "react";
import { deleteAccountAction } from "./actions";
import { useRouter } from "next/navigation";

function AccountDropdown() {
  const router = useRouter();
  const session = useSession();
  const isLoggedIn = !!session.data;
  const [open, setOpen] = useState(false);
  return (
    <>
    <AlertDialog open={open} onOpenChange={setOpen}>
    <AlertDialogContent>
      <AlertDialogHeader>
        <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
        <AlertDialogDescription>
          This action cannot be undone. This will permanently remove your account and any data associated with it.
        </AlertDialogDescription>
      </AlertDialogHeader>
      <AlertDialogFooter>
        <AlertDialogCancel>Cancel</AlertDialogCancel>
        <AlertDialogAction onClick={async () => {
          await deleteAccountAction( );
          signOut({callbackUrl: "/"});
          
        }}>Yes, delete</AlertDialogAction>
      </AlertDialogFooter>
    </AlertDialogContent>
  </AlertDialog>
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
          <>
          <DropdownMenuItem onClick={() => signOut({
            callbackUrl: "/"
          })}>
            <LogOutIcon className="mr-2" /> Sign Out
          </DropdownMenuItem>
          <DropdownMenuSeparator/>
          <DropdownMenuItem onClick={() => {
            setOpen(true);
          }}>
            <DeleteIcon className="mr-2" /> Delete Account
            
          </DropdownMenuItem>
            </>
        ) : (
          <DropdownMenuItem onClick={() => signIn("google")}>
            <LogInIcon className="mr-2" /> Sign In
          </DropdownMenuItem>
        )}
      </DropdownMenuContent>
    </DropdownMenu>
        </>
  );
}
export default function Header() {
  const session = useSession();
  const isLoggedIn = !!session.data;
  return (
    <header className="py-2  z-10 relative">
      <div className="container mx-auto flex justify-between items-center">
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
