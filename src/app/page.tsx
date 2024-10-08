"use client";

import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { v4 as uuidv4 } from "uuid";
import useUser from "@/hooks/useUser";

export default function Home() {
  const { fullName, setFullName } = useUser();
  const [roomID, setRoomID] = useState("");
  const router = useRouter();

  useEffect(() => {
    setFullName("");
  }, [setFullName]);

  const handleCreateNewMeeting = () => {
    const newRoomID = uuidv4();
    router.push(`/room/${newRoomID}`);
  };

  return (
    <div className="w-full h-screen flex items-center justify-center bg-gray-950 text-white">
      <section className="w-full max-w-lg p-8 bg-gray-800 rounded-lg shadow-lg">
        <div className="flex flex-col gap-8">
          <h1 className="text-4xl font-bold text-center">Welcome!</h1>

          <div className="flex flex-col gap-2">
            <label htmlFor="name" className="text-lg font-medium">
              Enter your name
            </label>
            <input
              type="text"
              id="name"
              value={fullName}
              onChange={(e) => setFullName(e.target.value)}
              className="w-full px-4 py-2 text-black rounded-md border border-gray-300 focus:outline-none focus:border-blue-500"
              placeholder="Your name"
            />
          </div>

          {fullName && fullName.length >= 3 && (
            <>
              <div className="flex flex-col gap-2">
                <label htmlFor="roomID" className="text-lg font-medium">
                  Enter room ID to join
                </label>
                <input
                  type="text"
                  id="roomID"
                  value={roomID}
                  onChange={(e) => setRoomID(e.target.value)}
                  className="w-full px-4 py-2 text-black rounded-md border border-gray-300 focus:outline-none focus:border-blue-500"
                  placeholder="Room ID"
                />
              </div>

              <button
                className={`w-full py-3 mt-4 rounded-md text-lg font-bold transition ${
                  roomID
                    ? "bg-blue-500 hover:bg-blue-600 text-white"
                    : "bg-gray-500 cursor-not-allowed text-gray-200"
                }`}
                onClick={() => router.push(`/room/${roomID}`)}
                disabled={!roomID}
              >
                Join Room
              </button>

              <div>
                <button
                  className="w-full py-3 mt-4 rounded-md text-lg font-bold transition bg-blue-500 hover:bg-blue-600 text-white"
                  onClick={handleCreateNewMeeting}
                >
                  Create a New Meeting
                </button>
              </div>
            </>
          )}
        </div>
      </section>
    </div>
  );
}
