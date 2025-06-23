import { useEffect, useState } from "react";
import { useParams } from "react-router"
import { useOnlineGameStore } from "../store/useOnlineGameStore";
import socket from "../utils/socket";
import OnlineGetName from "../components/OnlineGetName";
import DisplayOnlineBoard from "../components/DisplayOnlineBoard";

export default function UserOnlinePage() {
    const {playGame, makePlayGround, destroyPlayGround, setRoomId} = useOnlineGameStore();

    const { roomid } = useParams();
    const [name, setName] = useState('');

    
    // initialize user info
    useEffect(() => {
        makePlayGround();
        return destroyPlayGround;
    }, [])


    useEffect(() => {
        if(name !== '') {
            socket.emit('joinRoom', {roomid: roomid, data:{name: name}});
            setRoomId(roomid);
        }
    }, [name]);


    return (
        <div>
            {
                !playGame && (name.length == 0 && <OnlineGetName setName={setName} whichPlayer="O"/>)
            }

            {
                playGame && <DisplayOnlineBoard whichPlayer="O"/>
            }

        </div>
    )
}
