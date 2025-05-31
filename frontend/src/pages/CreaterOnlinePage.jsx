import { useEffect, useState } from "react"
import { useOnlineGameStore } from "../store/useOnlineGameStore";
import DisplayOnlineBoard from "../components/DisplayOnlineBoard";
import socket from "../utils/socket";
import GetCreaterInforComponent from "../components/GetCreaterInforComponent";


export default function CreaterOnlinePage() {
    const { makePlayGround, connectionURL, getConnectionWithOpponentURL, destroyPlayGround, connectionLoading, opponentSocketId, opponentName, gameStart, userSoketId, userName, socketHandleOpponentRespons } = useOnlineGameStore();

    const [playGame, setPlayGame] = useState(false);
    // initialize creater socketid
    useEffect(() => {
        makePlayGround();
        return destroyPlayGround;
    }, [])


    // handling opponent response using socket
    useEffect(() => {
        socket.on('hand-shake', socketHandleOpponentRespons)

        return () => {
            socket.off('hand-shake', socketHandleOpponentRespons)
        }
    }, [])


    useEffect(() => {

        if(!connectionLoading && opponentSocketId && opponentName && gameStart && userSoketId && userName)  {
            setPlayGame(true);
        }

    }, [connectionLoading , opponentSocketId , opponentName , gameStart , userSoketId , userName])

    return (
        <div>
            {!playGame && <GetCreaterInforComponent/>} 

            {
                playGame && <DisplayOnlineBoard whichPlayer="X"/>
            }

        </div>
    )
}

