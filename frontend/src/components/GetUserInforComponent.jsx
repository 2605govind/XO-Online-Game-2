import { useEffect, useRef, useState } from "react"
import { useOnlineGameStore } from "../store/useOnlineGameStore";

export default function GetUserInforComponent() {
    const [name, setName] = useState('');
    const { hundleName, connectionLoading } = useOnlineGameStore();
    const inputBox = useRef(null);

    useEffect(() => {
        if(connectionLoading && inputBox?.current) {
            inputBox?.current?.focus();
        }
    }, [connectionLoading])

    return (
    <div className="h-screen flex justify-center items-center bg-gradient-to-br from-[#001f3f] to-[#003f7f] text-2xl px-4">
        {connectionLoading && (
            <div className="bg-white/10 backdrop-blur-md shadow-xl rounded-xl p-8 w-full max-w-md text-center space-y-6">
                <input
                    ref={inputBox}
                    type="text"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder="Enter Your Name"
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg text-2xl focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white/80"
                />
                <button
                    type="submit"
                    onClick={(e) => hundleName(e, name)}
                    className="w-full bg-green-600 text-white py-3 rounded-lg text-lg font-semibold hover:bg-green-700 transition duration-200"
                >
                    Play Game With Friend
                </button>
            </div>
        )}
    </div>
)

} 