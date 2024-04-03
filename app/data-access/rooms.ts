import { db } from '@/db';
import { Room, room } from '@/db/schema';
import { eq } from 'drizzle-orm';
import { unstable_noStore } from 'next/cache';
import { like } from 'drizzle-orm';
import { getSession } from '@/lib/auth';
export async function getRooms(search:string | undefined) {
    unstable_noStore();
    const where = search ? like(room.language,`%${search}%`) : undefined;
    const rooms = await db.query.room.findMany({
        where,
    });
    return rooms;
}
export async function getUserRooms() {
    unstable_noStore();
    const session = await getSession();
    console.log(session);
    if(!session){
        throw new Error("User not authenticated");
    }
    const rooms = await db.query.room.findMany({
        where:eq(room.userId,session.user.id),
    });
    return rooms;
}
export async function getRoom(roomId:string) {
    unstable_noStore();
    return await db.query.room.findFirst({
        where:eq(room.id,roomId),
    });
}
export async function deleteRoom(roomId:string){
    await db.delete(room).where(eq(room.id,roomId))
}
export async function createRoom(roomData: Omit<Room,"id" | "userId">,userId:string){
await db.insert(room).values({...roomData,userId});

}
export async function editRoom(roomData: Room){
    await db.update(room).set(roomData).where(eq(room.id,roomData.id));
}