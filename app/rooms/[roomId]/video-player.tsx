"use client";
import "@stream-io/video-react-sdk/dist/css/styles.css";
import { Room } from "@/db/schema";
import {
  Call,
  CallControls,
  SpeakerLayout,
  StreamCall,
  StreamTheme,
  StreamVideo,
  StreamVideoClient,
  User,
} from "@stream-io/video-react-sdk";
import { useSession } from "next-auth/react";
import { useEffect, useState } from "react";
import { generateToken } from "./actions";

const apiKey = process.env.NEXT_PUBLIC_GET_STREAM_API_KEY!;
const userId = "user-id";

export function VideoFinder({ room }: { room: Room }) {
  const session = useSession();
  const [client, setClient] = useState<StreamVideoClient | null>(null);
  const [call, setCall] = useState<Call | null>(null);
  useEffect(() => {
    if (!session.data) {
      return;
    }
    if (!room) {
      return;
    }
    const userId = session.data.user.id;
    const client = new StreamVideoClient({
      apiKey,
      user: {
        id: userId,
      },
      tokenProvider: () => generateToken(userId),
    });
    setClient(client);
    const call = client.call("default", room.id);
    call.join({ create: true });
    setCall(call);
    return () => {
      call.leave();
      client.disconnectUser();
    };
  }, [session, room]);
  return (
    client &&
    call && (
      <StreamVideo client={client}>
        <StreamTheme>
          <StreamCall call={call}>
            <SpeakerLayout />
            <CallControls />
          </StreamCall>
        </StreamTheme>
      </StreamVideo>
    )
  );
}