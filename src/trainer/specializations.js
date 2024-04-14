import Header from "../header";
import {useEffect, useState} from "react";
import {MultiSelect} from "primereact/multiselect";
import {
    AddTrainerSpecialization,
    GetAllSkills,
    GetTrainerSpecializations,
    RemoveTrainerSpecialization
} from "../api/databaseAPI";

const Specializations = ({user, setUser}) => {

    const [skills, setSkills] = useState([]);
    const [specializations, setSpecializations] = useState([]);

    useEffect(() => {
        GetAllSkills().then((data) => {
            if (data.ok) {
                setSkills(data.res);
            } else {
                setSkills([]);
            }
        });
        setSpecializationsMapped();
    }, []);

    const setSpecializationsMapped = () => {
        GetTrainerSpecializations(user.trainer_id).then((data) => {
            if (data.ok) {
                setSpecializations(specializationsMapped(data.res));
            } else {
                setSpecializations([]);
            }
        });
    }

    const specializationsMapped = (specializationsRaw) => {
        return specializationsRaw.map((specialization) => {
            return {skill_id: findNameSkillId(specialization.name), name: specialization.name}
        });
    }

    const findNameSkillId = (name) => {
        let returnVal = "";
        skills.forEach((skill) => {
            if (skill.name === name) {
                returnVal = skill.skill_id;
            }
        });
        return returnVal;
    }

    const addSpecialization = async (interest) => {
        if (specializations.map((int) => int.name).includes(interest.name)) {
            await RemoveTrainerSpecialization(user.trainer_id, interest.skill_id);
        } else {
            await AddTrainerSpecialization(user.trainer_id, interest.skill_id);
        }
        setSpecializationsMapped();
    }

    return (
        <>
            <Header user={user} setUser={setUser}/>
            <div className="block w-full flex justify-content-center mt-6">
                <MultiSelect value={specializations} onChange={(e) => addSpecialization(e.selectedOption)} options={skills}
                             optionLabel="name"
                             placeholder="Select Specializations" maxSelectedLabels={3} className="w-full md:w-20rem"/>
            </div>
        </>
    )
}

export default Specializations;