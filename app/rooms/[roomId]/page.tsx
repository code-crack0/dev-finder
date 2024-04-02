import { getRoom } from "@/app/data-access/rooms";
import { GithubIcon } from "lucide-react";
import Link from "next/link";
import { Badge } from "@/components/ui/badge";
import TagsList, { splitTags } from "@/components/tags-list";
import { VideoFinder } from "./video-player";

export default async function RoomPage(props: { params: { roomId: string } }) {
  const roomId = props.params.roomId;
  const room = await getRoom(roomId);
  if (!room) {
    return <div>Room not found</div>;
  }
  const tags = splitTags(room.language);
  return (
    <div className="grid grid-cols-4 h-full min-h-screen">
      <div className="col-span-3  p-4">
        <div className="rounded-lg border bg-card text-card-foreground shadow-sm p-4">
          <VideoFinder room={room}/>
        </div>
      </div>
      <div className="col-span-1  p-4">
        <div className="rounded-lg border bg-card text-card-foreground shadow-sm p-4 flex flex-col gap-4">
          <h1 className="text-base">{room?.name}</h1>
          {room?.githubRepo && (
            <Link
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 text-center text-sm"
              href={room?.githubRepo}
            >
              {" "}
              <GithubIcon />
              Github Project
            </Link>
          )}
          <p className="text-base text-gray-600">{room?.description}</p>
          <h3>Tags: </h3>
          <TagsList tags={tags} />
          
        </div>
      </div>
    </div>
  );
}
