import { useParams } from "react-router"
import DisplayGameBoard from "../components/DisplayGameBoard";

export default function OnlineBoardlPage()  {
    const {levelid} = useParams();

    return (
        <div>
            <DisplayGameBoard level={levelid}/>
        </div>
    )
}