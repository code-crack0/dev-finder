'use server'

import { getSession } from "@/lib/auth"
import  deleteUser  from "./data-access/users";
import { redirect } from "next/navigation";

export async function deleteAccountAction(){
    const session = await getSession();
    if(!session){
        throw new Error("You must be looged in to delete your account");
    }
    await deleteUser(session?.user.id);

}