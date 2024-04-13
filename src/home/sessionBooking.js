import {useEffect, useState} from "react";
import { MultiSelect } from 'primereact/multiselect';
import {FindMatchingTrainers, GetAllSkills} from "../api/databaseAPI";
import {Button} from "primereact/button";

const SessionBooking = () => {

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
    }, [selectedSkills, selectedAvailableDays]);

    const searchTrainers = () => {
        FindMatchingTrainers(selectedAvailableDays, selectedSkills).then((data) => {
            if (data.ok) {
                setMatchedTrainers(data.res);
            } else {
                setMatchedTrainers([]);
            }
        });
        console.log(matchedTrainers)
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
                        className="w-full mt-1 ml-1" // Add ml-1 class to create space between the label and the MultiSelect
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
                        className="w-full mt-1 ml-1" // Add ml-1 class to create space between the label and the MultiSelect
                    />
                </div>
            </div>
            <div className="w-full flex justify-content-center">
                <Button className='border-round-2xl border-primary mt-4 text-900 font-bold' label="Search" outlined
                        icon="pi pi-search" onClick={() => searchTrainers()}/>
            </div>
        </>
    )
}

export default SessionBooking;