import Header from "../header";
import {useEffect, useState} from "react";
import Session from "./session";
import {Dialog} from "primereact/dialog";
import {Button} from "primereact/button";
import SessionBooking from "./sessionBooking";
import {AllMemberSessions} from "../api/databaseAPI";

const Sessions = ({user, setUser}) => {

    const [sessions, setSessions] = useState([]);
    const [modified, setModified] = useState(0);
    const [sessionBookingVisible, setSessionBookingVisible] = useState(false);

    useEffect(() => {
        AllMemberSessions(user.member_id).then((data) => {
            if (data.ok) {
                setSessions(data.res);
            } else {
                setSessions([]);
            }
        });
    }, [modified]);

    return (
        <>
            <Header setUser={setUser}/>
            <Dialog header="Session Booking" visible={sessionBookingVisible} style={{ width: '90vw' }}  onHide={() => setSessionBookingVisible(false)} closable={true}>
                <SessionBooking user={user} setModified={setModified}/>
            </Dialog>
            <div className="flex flex-wrap grid justify-content-center mt-8">
                <div className="text-xl mb-4 text-center w-full text-2xl">Ongoing Sessions</div>
                {
                    (sessions.map((session) => {
                        return (
                            <Session sessionVal={session} setModified={setModified} />
                        )
                    }))
                }
                <Button className='border-round-2xl border-primary mt-4 text-900 font-bold' label="Book Session" outlined
                        icon="pi pi-plus" onClick={() => setSessionBookingVisible(true)}/>
            </div>

        </>
    )
}

export default Sessions;