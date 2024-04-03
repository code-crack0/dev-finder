'use client';
import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
  } from "@/components/ui/card";
import TagsList from "@/components/tags-list";
import { splitTags } from "@/lib/utils";
import { Room } from "@/db/schema";
import Link from "next/link";
import { GithubIcon } from "lucide-react";
import { Button } from "@/components/ui/button";

export default function RoomCard({ room }: { room: Room }) {
    return (
      <Card>
        <CardHeader>
          <CardTitle>{room.name}</CardTitle>
          <CardDescription>{room.description}</CardDescription>
        </CardHeader>
        <CardContent className="flex flex-col gap-4">
          <TagsList tags={splitTags(room.language)} />
          {room.githubRepo && (
            <Link
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2"
              href={room.githubRepo}
            >
              {" "}
              <GithubIcon />
              Github Project
            </Link>
          )}
        </CardContent>
        <CardFooter>
          <Button asChild>
            <Link href={`/rooms/${room.id}`}>Join Room</Link>
          </Button>
        </CardFooter>
      </Card>
    );
  }