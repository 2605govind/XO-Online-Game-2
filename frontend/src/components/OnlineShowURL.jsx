import { toast, Toaster } from "react-hot-toast";

export default function OnlineShowURL({ url }) {
  const handleCopyText = () => {
    navigator.clipboard.writeText(url);
    toast.success("Copied to clipboard");
  };

  return (
    <div className="h-screen flex justify-center items-center bg-gradient-to-br from-[#0f2027] via-[#203a43] to-[#2c5364] px-4">
      <Toaster />
      <div className="bg-white/10 backdrop-blur-md shadow-xl rounded-xl p-8 w-full max-w-md flex flex-col items-center gap-6 text-white text-center">
        <div className="text-xl font-medium">
          Share the link below with your friend to join the game:
        </div>
        <div className="w-full break-all bg-white/20 text-lg rounded-md px-4 py-3 border border-white/30">
          {url}
        </div>
        <button
          onClick={handleCopyText}
          className="bg-[#2ECC40] text-white py-2 px-6 rounded-lg font-semibold hover:bg-[#27ae60] transition duration-200"
        >
          Copy
        </button>
      </div>
    </div>
  );
}
