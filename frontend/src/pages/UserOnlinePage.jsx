import { useEffect, useState } from "react";
import { useParams } from "react-router"
import { useOnlineGameStore } from "../store/useOnlineGameStore";
import DisplayOnlineBoard from "../components/DisplayOnlineBoard";
import GetUserInforComponent from "../components/GetUserInforComponent";

export default function UserOnlinePage() {
    const { makePlayGround, userConnectToCreater, destroyPlayGround, connectionLoading, opponentSocketId, opponentName, gameStart, userSoketId, userName } = useOnlineGameStore();
    const { id, name } = useParams();
    const [playGame, setPlayGame] = useState(false);

    // initialize user info
    useEffect(() => {
        makePlayGround();
        return destroyPlayGround;
    }, [])

    // creating connection with creater 
    useEffect(() => {
        userConnectToCreater(id, name);
    }, [connectionLoading])

    useEffect(() => {

        if (!connectionLoading && opponentSocketId && opponentName && gameStart && userSoketId && userName) {
            setPlayGame(true);
        }

    }, [connectionLoading, opponentSocketId, opponentName, gameStart, userSoketId, userName])


    return (
        <div>
            {!playGame && <GetUserInforComponent />}

            {
                playGame && <DisplayOnlineBoard whichPlayer="O" />
            }

        </div>
    )
}
