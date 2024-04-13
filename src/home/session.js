import {useEffect, useState} from "react";
import { Rating } from 'primereact/rating';
import {Button} from "primereact/button";
import {CancelSession} from "../api/databaseAPI";

const Session = ({sessionVal, setModified}) => {

    const [session, setSession] = useState({
        member_id: -1,
        trainer_id: -1,
        first_name: "",
        last_name: "",
        rating: 0,
        day: ""
    });

    useEffect(() => {
        setSession(sessionVal);
    }, []);

    const cancelSession = async() => {
        await CancelSession(session.member_id, session.trainer_id, session.day);
        setModified((prevState) => (prevState + 1) % 2);
    }

    return (
        <>
            <div className="grid w-full flex flex-wrap justify-content-center">
                <ul className="col-8 flex list-none p-0 m-0 p-1 w-8 surface-0 border-primary border-1">
                    <li className="flex-column px-2 col-3"> {/* Adjusted column width */}
                        <div className="text-500 w-full font-medium">Day</div>
                        <div className="text-900 w-full mt-2 ">
                            {session.day}
                        </div>
                    </li>
                    <li className="flex-column px-2 col-3"> {/* Adjusted column width */}
                        <div className="text-500 w-full font-medium">Trainer</div>
                        <div className="text-900 w-full mt-2 ">
                            {session.first_name + " " + session.last_name}
                        </div>
                    </li>
                    <li className="flex-column px-2 col-3"> {/* Adjusted column width */}
                        <div className="text-500 w-full font-medium">Rating</div>
                        <div className="text-900 w-full mt-2 ">
                            <Rating value={session.rating} readOnly cancel={false}/>
                        </div>
                    </li>
                    <li className="flex-column px-2 col-3 align-content-center"> {/* Adjusted column width */}
                        <Button className='border-round-2xl border-red-400 text-900 font-bold' label="Cancel Session" outlined
                                icon="pi pi-minus" onClick={() => cancelSession()}/>
                    </li>
                </ul>
            </div>
        </>
    )
}

export default Session;