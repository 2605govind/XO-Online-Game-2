import { useEffect, useRef, useState } from "react"
import { useOnlineGameStore } from "../store/useOnlineGameStore";
import { toast, Toaster  } from "react-hot-toast";

export default function GetCreaterInforComponent() {
    const [name, setName] = useState('');
    const { hundleName, getConnectionWithOpponentURL, connectionURL, connectionLoading } = useOnlineGameStore();
    const inputBox = useRef(null);
    
    useEffect(() => {
        if(connectionLoading && inputBox.current) {
            inputBox?.current?.focus();
        }
        // console.log(inputBox)
    }, [connectionLoading])

    const handleCopyText = () => {
        navigator.clipboard.writeText(connectionURL);
        toast.success("copy text");
    }

    useEffect(() => {
        // creating url
        getConnectionWithOpponentURL();

    }, [connectionLoading]);

  return (
    <div className="h-screen flex justify-center items-center bg-gradient-to-br from-[#001f3f] to-[#003f7f] text-2xl px-4">
        {connectionLoading && (
            <div className="bg-white/10 backdrop-blur-md shadow-xl rounded-xl p-8 w-full max-w-md flex flex-col gap-6 items-center">
                <input
                    type="text"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    ref={inputBox}
                    placeholder="Enter Your Name"
                    className="w-full px-4 py-3 rounded-lg text-2xl bg-white/80 border border-gray-300 focus:outline-none focus:ring-2 focus:ring-[#0074D9]"
                />
                <button
                    type="submit"
                    onClick={(e) => hundleName(e, name)}
                    className="w-full bg-[#2ECC40] text-white py-3 rounded-lg font-semibold hover:bg-[#27ae60] transition duration-200"
                >
                    Start Game With Friend
                </button>
            </div>
        )}

        <Toaster />

        {!connectionLoading && (
            <div className="bg-white/10 backdrop-blur-md shadow-xl rounded-xl p-8 w-full max-w-md flex flex-col items-center gap-6 text-white text-center">
                <div className="text-xl font-medium">Copy this URL and send it to your friend to connect:</div>
                <div className="w-full break-all bg-white/20 text-lg rounded-md px-4 py-3">{connectionURL}</div>
                <button
                    onClick={handleCopyText}
                    className="bg-[#0074D9] text-white py-2 px-6 rounded-lg hover:bg-[#005fa3] transition duration-200"
                >
                    Copy
                </button>
            </div>
        )}
    </div>
);


} 