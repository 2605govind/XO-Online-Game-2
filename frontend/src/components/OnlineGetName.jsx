import { useEffect, useRef, useState } from "react";

export default function OnlineGetName({ setName, whichPlayer }) {
  const [useName, setUserName] = useState(`player${whichPlayer}`);
  const inputBox = useRef(null);

  useEffect(() => {
    if (inputBox.current) {
      inputBox.current.focus();
    }
  }, [inputBox]);

  function handleEnterKey(e) {
    if (e.key === "Enter") {
      handleClick(e);
    }
  }

  function handleClick(e) {
    e.preventDefault();

    let name = useName.trim();

    if (name === "") return;

    if (name.length > 16) {
      alert("Please Enter Small Name");
      return;
    }

    // Capitalize first letter
    name = name.charAt(0).toUpperCase() + name.slice(1);

    setName(name);
  }

  return (
    <div className="h-screen flex justify-center items-center bg-gradient-to-br from-[#0f2027] via-[#203a43] to-[#2c5364] px-4">
      <div className="bg-white/10 backdrop-blur-md shadow-xl rounded-xl p-8 w-full max-w-md flex flex-col gap-6 items-center">
        <input
          type="text"
          value={useName}
          onChange={(e) => setUserName(e.target.value)}
          onKeyDown={handleEnterKey}
          ref={inputBox}
          placeholder="Enter Your Name"
          className="w-full px-4 py-3 rounded-lg text-2xl bg-white/90 border border-gray-300 text-gray-800 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-[#2ECC40]"
        />
        <button
          type="submit"
          onClick={handleClick}
          className="w-full bg-[#2ECC40] text-white py-3 rounded-lg font-semibold hover:bg-[#27ae60] transition duration-200"
        >
          Play
        </button>
      </div>
    </div>
  );
}
