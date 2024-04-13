import Header from "../header";
import PersonalInformation from "../welcome/personalInformation";
import { MultiSelect } from 'primereact/multiselect';
import {useEffect, useState} from "react";
import {AddMemberInterest, GetAllSkills, GetMemberInterests, RemoveMemberInterest} from "../api/databaseAPI";

const Profile = ({user, setUser}) => {

    const [skills, setSkills] = useState([]);
    const [userInterests, setUserInterests] = useState([]);

    useEffect(() => {
        GetAllSkills().then((data) => {
            if (data.ok) {
                setSkills(data.res);
            } else {
                setSkills([]);
            }
        });
        setUserInterestsMapped();
    }, []);

    const setUserInterestsMapped = () => {
        GetMemberInterests(user.member_id).then((data) => {
            if (data.ok) {
                setUserInterests(userInterestMap(data.res));
            } else {
                setUserInterests([]);
            }
        });
    }

    const userInterestMap = (rawUserInterests) => {
        return rawUserInterests.map((interest) => {
            return {skill_id: findNameSkillId(interest.name), name: interest.name}
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

    const addInterest = async (interest) => {
        if (userInterests.map((int) => int.name).includes(interest.name)) {
            await RemoveMemberInterest(user.member_id, interest.skill_id);
        } else {
            await AddMemberInterest(user.member_id, interest.skill_id);
        }
        setUserInterestsMapped();
    }

    return (
        <>
            <Header />
            <div className="flex flex-wrap justify-content-center mt-8">
                <div className="text-xl mb-4 text-center w-full text-2xl">Interests</div>
                <div className="block w-full flex justify-content-center">
                    <MultiSelect value={userInterests} onChange={(e) => addInterest(e.selectedOption)} options={skills} optionLabel="name"
                                 placeholder="Select Interests" maxSelectedLabels={3} className="w-full md:w-20rem" />
                </div>
                <div className="text-xl mt-6 mb-4 text-center w-full text-2xl">Personal Information</div>
                <div className="block w-full flex justify-content-center">
                    <PersonalInformation user={user} setUser={setUser} update={true}/>
                </div>
            </div>
        </>
    )
}

export default Profile;