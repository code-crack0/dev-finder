import { db } from '@/db';
import { Room, room, users } from '@/db/schema';
import { eq } from 'drizzle-orm';
import { unstable_noStore } from 'next/cache';
import { like } from 'drizzle-orm';
import { getSession } from '@/lib/auth';

export default async function deleteUser(userId:string){
    await db.delete(users).where(eq(users.id,userId));
}