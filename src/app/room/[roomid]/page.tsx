"use client";

import { useEffect, useRef } from "react";
import useUser from "@/hooks/useUser";
import { ZegoUIKitPrebuilt } from "@zegocloud/zego-uikit-prebuilt";
import { v4 as uuidv4 } from "uuid";

const Room = ({ params }: { params: { roomid: string } }) => {
  const { fullName } = useUser();
  const roomID = params.roomid;
  const callContainerRef = useRef<HTMLDivElement>(null); // Reference for the container

  useEffect(() => {
    // Ensure that the async function is called after the component has mounted
    const setupMeeting = async () => {
      if (callContainerRef.current) {
        const appID = parseInt(process.env.NEXT_PUBLIC_ZEGO_APP_ID!, 10);
        const serverSecret = process.env.NEXT_PUBLIC_ZEGO_SERVER_SECRET_KEY!;
        const kitToken = ZegoUIKitPrebuilt.generateKitTokenForTest(
          appID,
          serverSecret,
          roomID,
          uuidv4(),
          fullName || "user" + Date.now(),
          720 // Token expiration time in minutes
        );

        const zp = ZegoUIKitPrebuilt.create(kitToken);
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
            mode: ZegoUIKitPrebuilt.VideoConference, // Use video conference mode
          },
        });
      }
    };

    setupMeeting();
  }, [fullName, roomID]);

  return <div className="w-full h-screen " ref={callContainerRef} />;
};

export default Room;
