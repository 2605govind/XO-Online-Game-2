import { useEffect } from "react";
import { Link } from "react-router";
import { useOnlineGameStore } from "../store/useOnlineGameStore";

export default function GameModePage() {

  const { boardValueReset } = useOnlineGameStore();

  useEffect(() => {
    boardValueReset();
  }, []);

  return (
    <div className="min-h-screen flex justify-center items-center bg-gradient-to-br from-[#0f2027] via-[#203a43] to-[#2c5364] px-4">
      <div className="bg-white/10 backdrop-blur-md shadow-xl rounded-xl p-8 w-full max-w-md text-center">
        <h1 className="text-white text-3xl font-semibold mb-6">Choose Game Mode</h1>
        <div className="flex flex-col gap-4">
          <Link
            to="/createronlineground"
            className="block w-full text-white text-lg font-medium py-3 rounded-lg bg-blue-600 hover:bg-blue-700 transition duration-200"
          >
            Online
          </Link>
          <Link
            to="/computelevel"
            className="block w-full text-white text-lg font-medium py-3 rounded-lg bg-green-600 hover:bg-green-700 transition duration-200"
          >
            Offline
          </Link>
        </div>
      </div>
    </div>
  );
}
