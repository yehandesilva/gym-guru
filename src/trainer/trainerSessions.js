import Header from "../header";
import {useEffect, useState} from "react";
import { MultiSelect } from 'primereact/multiselect';
import {
    AddTrainerAvailability,
    AllTrainerSessions,
    RemoveTrainerAvailability,
    TrainerAvailabilities
} from "../api/databaseAPI";
import Session from "../member/session";

const TrainerSessions = ({user, setUser}) => {

    const allDays = [
        "Monday",
        "Tuesday",
        "Wednesday",
        "Thursday",
        "Friday",
        "Saturday",
        "Sunday"
    ];
    const [sessions, setSessions] = useState([]);
    const [modified, setModified] = useState(0);
    const [trainerAvailability, setTrainerAvailability] = useState([]);

    useEffect(() => {
        AllTrainerSessions(user.trainer_id).then((data) => {
            if (data.ok) {
                setSessions(data.res);
            } else {
                setSessions([]);
            }
        });
        TrainerAvailabilities(user.trainer_id).then((data) => {
            if (data.ok) {
                setTrainerAvailability(data.res.map((item) => item.day));
            } else {
                setTrainerAvailability([]);
            }
        });
    }, [modified]);

    const availabilitySelected = async (selectedOption) => {
        if (trainerAvailability.includes(selectedOption)) {
            await RemoveTrainerAvailability(user.trainer_id, selectedOption);
        } else {
            await AddTrainerAvailability(user.trainer_id, selectedOption);
        }
        setModified((prevState) => (prevState + 1) % 2);
    }

    return (
        <>
            <Header user={user} setUser={setUser}/>
            <div className="text-xl mb-2 mt-6 text-center w-full text-2xl">Availability</div>
            <div className="block w-full flex justify-content-center">
                <MultiSelect value={trainerAvailability} onChange={(e) => availabilitySelected(e.selectedOption)}
                             options={allDays}
                             placeholder="Select Availability" maxSelectedLabels={3} className="w-full md:w-20rem"/>
            </div>
            <div className="text-xl mb-4 text-center w-full text-2xl mt-6">Ongoing Sessions</div>
            {
                (sessions.map((session) => {
                    return (
                        <Session sessionVal={session} type={"trainer"} setModified={setModified}/>
                    )
                }))
            }
        </>
    )
}

export default TrainerSessions;