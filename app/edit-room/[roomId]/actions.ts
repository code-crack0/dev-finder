'use server'

import { editRoom, getRoom } from "@/app/data-access/rooms";
import { db } from "@/db";
import { Room,room } from "@/db/schema";
import { getSession } from "@/lib/auth";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";

export async function editRoomAction(roomData:Omit<Room,"userId">){
    const session = await getSession();
    if(!session){
        throw new Error("User not authenticated");
    }
    const room = await getRoom(roomData.id);
    if(room?.userId!=session.user.id){
        throw new Error("User not authorized to edit this room");
    }
    await editRoom({...roomData,userId:room.userId});   
    revalidatePath("/your-rooms");
    revalidatePath(`/edit-room/${roomData.id}`);
    redirect("/your-rooms");
}