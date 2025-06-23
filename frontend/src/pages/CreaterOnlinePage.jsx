import { useEffect, useState } from "react"
import { useOnlineGameStore } from "../store/useOnlineGameStore";
import DisplayOnlineBoard from "../components/DisplayOnlineBoard";
import socket from "../utils/socket";
import OnlineShowURL from "../components/OnlineShowURL";
import OnlineGetName from "../components/OnlineGetName";



export default function CreaterOnlinePage() {
    const {makePlayGround, destroyPlayGround, playGame, setRoomId} = useOnlineGameStore();

    const [name, setName] = useState('');
    const [jointURL, setJointURL] = useState('');

    useEffect(() => {
        makePlayGround();

        return destroyPlayGround;
    }, [])


    useEffect(() => {
        if(name !== '' && jointURL === '') {
            const roomid = String(Date.now());
            socket.emit('joinRoom', {roomid: roomid, data:{name: name}});
            setRoomId(roomid);

            const url = createURLwithRoomId(roomid)
            setJointURL(url);
        }
    }, [name])


    // creating connection url
    function createURLwithRoomId(id){
        const currentModuleURL = new URL(import.meta.url); //console.log(currentModuleURL.origin); // e.g., "http://localhost:5173"
        return `${currentModuleURL.origin}/useronlineground/${id}`;
    }

    
    return (
        <div>
            {
                !playGame && (name.length == 0 && <OnlineGetName setName={setName} whichPlayer="X"/> || name.length >= 1 && <OnlineShowURL url={jointURL}/>)
            }

            {
                playGame && <DisplayOnlineBoard whichPlayer="X"/>
            }
        </div>
    )
}

