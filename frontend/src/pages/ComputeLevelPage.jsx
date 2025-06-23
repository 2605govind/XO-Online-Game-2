import { Link } from "react-router";

export default function ComputeLevelPage() {
  return (
    <div className="h-screen flex justify-center items-center bg-gradient-to-br from-[#0f2027] via-[#203a43] to-[#2c5364] px-4">
      <div className="bg-white/10 backdrop-blur-md shadow-xl rounded-xl p-8 w-full max-w-md text-center space-y-6">
        <h1 className="text-white text-3xl font-semibold">Choose Difficulty</h1>
        <div className="flex flex-col gap-4">
          <Link
            to="/computelevel/easy"
            className="block w-full text-white text-lg font-medium py-3 rounded-lg bg-green-600 hover:bg-green-700 transition duration-200"
          >
            Easy
          </Link>
          <Link
            to="/computelevel/medium"
            className="block w-full text-white text-lg font-medium py-3 rounded-lg bg-yellow-600 hover:bg-yellow-700 transition duration-200"
          >
            Medium
          </Link>
          <Link
            to="/computelevel/hard"
            className="block w-full text-white text-lg font-medium py-3 rounded-lg bg-red-700 hover:bg-red-800 transition duration-200"
          >
            Hard
          </Link>
        </div>
      </div>
    </div>
  );
}
