import { Button } from "@/components/ui/button";
import { db } from "@/db";
import Image from "next/image";
import Link from "next/link";
import RoomCard from "./room-card";
import { Room } from "@/db/schema";
import { GithubIcon } from "lucide-react";
import { getRooms } from "../data-access/rooms";
import TagsList from "@/components/tags-list";
import { splitTags } from "@/lib/utils";
import SearchBar from "./search-bar";

export default async function Home({searchParams}:{searchParams: {search?: string}}) {
  const rooms = await getRooms(searchParams.search);
  return (
    <main className=" min-h-screen p-16">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-4xl">Find Dev Rooms</h1>
        <Button asChild>
          <Link href="/create-room">Create Room</Link>
        </Button>
      </div>
      <div className="mb-12">
        <SearchBar />
      </div>
      <div className="grid grid-cols-3 gap-4">
        {rooms.map((room) => (
          <RoomCard key={room.id} room={room} />
        ))}
      </div>
      {
        rooms.length === 0 && (
          <div className="flex flex-col gap-4 justify-center items-center mt-24">
            <Image src="/nodata.svg" width={200} height={200} alt="no-data image" />
            <h2 className="text-2xl">No Rooms Yet!</h2>
          </div>
        )
      }
    </main>
  );
}
