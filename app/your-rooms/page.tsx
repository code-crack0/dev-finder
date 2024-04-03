import { Button } from "@/components/ui/button";
import Link from "next/link";
import UserRoomCard from "./room-card";
import { getRooms, getUserRooms } from "../data-access/rooms";
import SearchBar from "../browse/search-bar";

export default async function YourRoomsPage() {
  const rooms = await getUserRooms();
  return (
    <main className=" min-h-screen p-16">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-4xl">Your Rooms</h1>
        <Button asChild>
          <Link href="/create-room">Create Room</Link>
        </Button>
      </div>
      <div className="grid grid-cols-3 gap-4">
        {rooms.map((room) => (
          <UserRoomCard key={room.id} room={room} />
        ))}
      </div>
    </main>
  );
}
