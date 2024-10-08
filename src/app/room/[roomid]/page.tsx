"use client";

import { useEffect, useRef } from "react";
import useUser from "@/hooks/useUser";
import { ZegoUIKitPrebuilt } from "@zegocloud/zego-uikit-prebuilt";
import { v4 as uuidv4 } from "uuid";

const Room = ({ params }: { params: { roomid: string } }) => {
  const { fullName } = useUser();
  const roomID = params.roomid;

  // Create a ref for the video call container
  const callContainerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (typeof window !== "undefined" && callContainerRef.current) {
      const appID = parseInt(process.env.NEXT_PUBLIC_ZEGO_APP_ID!);
      const serverSecret = process.env.NEXT_PUBLIC_ZEGO_SERVER_SECRET_KEY!;

      // generate Kit Token
      const kitToken = ZegoUIKitPrebuilt.generateKitTokenForTest(
        appID,
        serverSecret,
        roomID,
        uuidv4(),
        fullName || "user" + Date.now()
      );

      // Create instance object from Kit Token.
      const zp = ZegoUIKitPrebuilt.create(kitToken);
      // start the call
      zp.joinRoom({
        container: callContainerRef.current,
        sharedLinks: [
          {
            name: "Shareable link",
            url:
              window.location.protocol +
              "//" +
              window.location.host +
              window.location.pathname +
              "?roomID=" +
              roomID,
          },
        ],
        scenario: {
          mode: ZegoUIKitPrebuilt.VideoConference,
        },
      });
    }
  }, [roomID, fullName]); // Re-run effect if roomID or fullName changes

  return (
    <div
      ref={callContainerRef}
      style={{ width: "100vw", height: "100vh" }}
    ></div>
  );
};

export default Room;
