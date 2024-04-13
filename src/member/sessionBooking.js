import {useEffect, useState} from "react";
import { MultiSelect } from 'primereact/multiselect';
import {CreateSession, FindMatchingTrainers, GetAllSkills} from "../api/databaseAPI";
import {Button} from "primereact/button";
import {Rating} from "primereact/rating";

const SessionBooking = ({user, setModified}) => {

    const allDays = [
        "Monday",
        "Tuesday",
        "Wednesday",
        "Thursday",
        "Friday",
        "Saturday",
        "Sunday"
    ];
    const [selectedAvailableDays, setSelectedAvailableDays] = useState([]);
    const [selectedSkills, setSelectedSkills] = useState([]);
    const [allSkills, setAllSkills] = useState([]);
    const [matchedTrainers, setMatchedTrainers] = useState([]);

    useEffect(() => {
        GetAllSkills().then((data) => {
            if (data.ok) {
                setAllSkills(data.res.map((skill) => skill.name));
            } else {
                setAllSkills([]);
            }
        });
    }, []);

    const searchTrainers = () => {
        FindMatchingTrainers(user.member_id, selectedAvailableDays, selectedSkills).then((data) => {
            if (data.ok) {
                setMatchedTrainers(data.res);
            } else {
                setMatchedTrainers([]);
            }
        });
    }

    const bookSession = async (trainer) => {
        await CreateSession(user.member_id, trainer.trainer_id, trainer.day);
        searchTrainers();
        setModified((prevState) => (prevState + 1) % 2);
    }

    const foundTrainerTemplate = (trainer) => {
        return (
            <div className="grid w-full pb-2 flex flex-wrap justify-content-center">
                <ul className="grid flex list-none p-0 m-0 p-1 w-12 surface-0 border-primary border-1">
                    <li className="flex-column px-2 col-3"> {/* Adjusted column width */}
                        <div className="text-500 w-full font-medium">Name</div>
                        <div className="text-900 w-full mt-2 ">
                            {`${trainer.first_name} ${trainer.last_name}`}
                        </div>
                    </li>
                    <li className="flex-column px-2 col-3"> {/* Adjusted column width */}
                        <div className="text-500 w-full font-medium">Rating</div>
                        <div className="text-900 w-full mt-2 ">
                            <Rating value={trainer.rating} readOnly cancel={false}/>
                        </div>
                    </li>
                    <li className="flex-column px-2 col-2"> {/* Adjusted column width */}
                        <div className="text-500 w-full font-medium">Availability</div>
                        <div className="text-900 w-full mt-2 ">
                            {trainer.day}
                        </div>
                    </li>
                    <li className="flex-column px-2 col-2"> {/* Adjusted column width */}
                        <div className="text-500 w-full font-medium">Specialization</div>
                        <div className="text-900 w-full mt-2 ">
                            {trainer.name}
                        </div>
                    </li>
                    <li className="flex-column px-2 col-2 align-content-center"> {/* Adjusted column width */}
                        <Button className='border-round-2xl border-red-400 text-900 font-bold' label="Book Session"
                                outlined
                                icon="pi pi-plus" onClick={() => bookSession(trainer)}/>
                    </li>
                </ul>
            </div>
        )
    }

    return (
        <>
            <div className="flex flex-wrap justify-content-between">
                <div className="w-5">
                    <div className="ml-2">
                        Availabilities
                    </div>
                    <MultiSelect
                        value={selectedAvailableDays}
                        onChange={(e) => setSelectedAvailableDays(e.value)}
                        options={allDays}
                        placeholder="Select Availabilities"
                        className="w-full mt-1 ml-1"
                    />
                </div>
                <div className="w-5">
                    <div className="ml-2">
                        Skills
                    </div>
                    <MultiSelect
                        value={selectedSkills}
                        onChange={(e) => setSelectedSkills(e.value)}
                        options={allSkills}
                        placeholder="Select Skills"
                        className="w-full mt-1 ml-1"
                    />
                </div>
            </div>
            <div className="w-full flex justify-content-center">
                <Button className='border-round-2xl border-primary mt-4 text-900 font-bold' label="Search" outlined
                        icon="pi pi-search" onClick={() => searchTrainers()}/>
            </div>
            <div className="mt-6 w-full">
                {
                    matchedTrainers.map((trainer) => {
                        return foundTrainerTemplate(trainer);
                    })
                }
            </div>
        </>
    )
}

export default SessionBooking;