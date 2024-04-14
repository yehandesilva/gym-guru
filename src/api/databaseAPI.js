const rte = "http://localhost:4000/";

const errorFormat = (e) => {
    console.log("Error: "+ e);
    return {
        ok: false,
        res: "Problem in front-end",
    }
}

const responseFormat = async (response, get=true) => {
    const returnObj = {
        ok: response.ok,
        res: null,
    }
    if (get) {
        if (response.ok) {
            returnObj.res = JSON.parse(await response.json());
        } else {
            returnObj.res = (await response.json()).error_message;
        }
    }
    return returnObj;
}

export const GetSubscriptionModels = async() => {
    try {
        const requestOptionsHead = {
            method: 'GET',
            headers: { 'Content-Type': 'application/json'},
        };
        const response = await fetch(`${rte}subscription_models`, requestOptionsHead);
        return responseFormat(response, true);
    } catch (e) {
        return errorFormat(e);
    }
}

export const RegisterMember = async(memberData) => {
    try {
        const requestOptionsHead = {
            method: 'POST',
            headers: { 'Content-Type': 'application/json'},
            body: JSON.stringify(memberData),
        };
        const response = await fetch(`${rte}register_member`, requestOptionsHead);
        return responseFormat(response, false);
    } catch (e) {
        return errorFormat(e);
    }
}

export const UpdateMember = async(memberData) => {
    try {
        const requestOptionsHead = {
            method: 'POST',
            headers: { 'Content-Type': 'application/json'},
            body: JSON.stringify(memberData),
        };
        const response = await fetch(`${rte}update_member_info`, requestOptionsHead);
        return responseFormat(response, false);
    } catch (e) {
        return errorFormat(e);
    }
}

export const AccountLogin = async(signInData) => {
    try {
        const requestOptionsHead = {
            method: 'POST',
            headers: { 'Content-Type': 'application/json'},
            body: JSON.stringify(signInData),
        };
        const response = await fetch(`${rte}login`, requestOptionsHead);
        return responseFormat(response, true);
    } catch (e) {
        return errorFormat(e);
    }
}

export const GetAllSkills = async() => {
    try {
        const requestOptionsHead = {
            method: 'GET',
            headers: { 'Content-Type': 'application/json'},
        };
        const response = await fetch(`${rte}skills`, requestOptionsHead);
        return responseFormat(response, true);
    } catch (e) {
        return errorFormat(e);
    }
}

export const GetMemberInterests = async(memberId) => {
    try {
        const requestOptionsHead = {
            method: 'POST',
            headers: { 'Content-Type': 'application/json'},
            body: JSON.stringify({member_id: memberId}),
        };
        const response = await fetch(`${rte}interest_names`, requestOptionsHead);
        return responseFormat(response, true);
    } catch (e) {
        return errorFormat(e);
    }
}

export const AddMemberInterest = async(memberId, skillId) => {
    try {
        const requestOptionsHead = {
            method: 'POST',
            headers: { 'Content-Type': 'application/json'},
            body: JSON.stringify({member_id: memberId, skill_id: skillId}),
        };
        const response = await fetch(`${rte}add_interest`, requestOptionsHead);
        return responseFormat(response, false);
    } catch (e) {
        return errorFormat(e);
    }
}

export const RemoveMemberInterest = async(memberId, skillId) => {
    try {
        const requestOptionsHead = {
            method: 'POST',
            headers: { 'Content-Type': 'application/json'},
            body: JSON.stringify({member_id: memberId, skill_id: skillId}),
        };
        const response = await fetch(`${rte}delete_interest`, requestOptionsHead);
        return responseFormat(response, false);
    } catch (e) {
        return errorFormat(e);
    }
}

export const GetUncompletedGoals = async(memberId) => {
    try {
        const requestOptionsHead = {
            method: 'POST',
            headers: { 'Content-Type': 'application/json'},
            body: JSON.stringify({member_id: memberId}),
        };
        const response = await fetch(`${rte}uncompleted_fitness_goals`, requestOptionsHead);
        return responseFormat(response, true);
    } catch (e) {
        return errorFormat(e);
    }
}

export const GetCompletedGoals = async(memberId) => {
    try {
        const requestOptionsHead = {
            method: 'POST',
            headers: { 'Content-Type': 'application/json'},
            body: JSON.stringify({member_id: memberId}),
        };
        const response = await fetch(`${rte}completed_fitness_goals`, requestOptionsHead);
        return responseFormat(response, true);
    } catch (e) {
        return errorFormat(e);
    }
}

export const AddFitnessGoal = async(goalData) => {
    try {
        const requestOptionsHead = {
            method: 'POST',
            headers: { 'Content-Type': 'application/json'},
            body: JSON.stringify(goalData),
        };
        const response = await fetch(`${rte}add_fitness_goal`, requestOptionsHead);
        return responseFormat(response, false);
    } catch (e) {
        return errorFormat(e);
    }
}

export const UpdateFitnessGoal = async(goalData) => {
    try {
        const requestOptionsHead = {
            method: 'POST',
            headers: { 'Content-Type': 'application/json'},
            body: JSON.stringify(goalData),
        };
        const response = await fetch(`${rte}update_fitness_goal`, requestOptionsHead);
        return responseFormat(response, false);
    } catch (e) {
        return errorFormat(e);
    }
}

export const GetAllClasses = async() => {
    try {
        const requestOptionsHead = {
            method: 'GET',
            headers: { 'Content-Type': 'application/json'},
        };
        const response = await fetch(`${rte}all_fitness_classes`, requestOptionsHead);
        return responseFormat(response, true);
    } catch (e) {
        return errorFormat(e);
    }
}

export const GetUserClasses = async(memberId) => {
    try {
        const requestOptionsHead = {
            method: 'POST',
            headers: { 'Content-Type': 'application/json'},
            body: JSON.stringify({member_id: memberId}),
        };
        const response = await fetch(`${rte}fitness_class_ids`, requestOptionsHead);
        return responseFormat(response, true);
    } catch (e) {
        return errorFormat(e);
    }
}

export const JoinFitnessGlass = async(memberId, fitnessClassId) => {
    try {
        const requestOptionsHead = {
            method: 'POST',
            headers: { 'Content-Type': 'application/json'},
            body: JSON.stringify({member_id: memberId, fitness_class_id: fitnessClassId}),
        };
        const response = await fetch(`${rte}register_for_fitness_class`, requestOptionsHead);
        return responseFormat(response, false);
    } catch (e) {
        return errorFormat(e);
    }
}

export const LeaveFitnessClass = async(memberId, fitnessClassId) => {
    try {
        const requestOptionsHead = {
            method: 'POST',
            headers: { 'Content-Type': 'application/json'},
            body: JSON.stringify({member_id: memberId, fitness_class_id: fitnessClassId}),
        };
        const response = await fetch(`${rte}deregister_in_fitness_class`, requestOptionsHead);
        return responseFormat(response, false);
    } catch (e) {
        return errorFormat(e);
    }
}

export const AllMemberSessions = async(memberId) => {
    try {
        const requestOptionsHead = {
            method: 'POST',
            headers: { 'Content-Type': 'application/json'},
            body: JSON.stringify({member_id: memberId}),
        };
        const response = await fetch(`${rte}member_sessions`, requestOptionsHead);
        return responseFormat(response, true);
    } catch (e) {
        return errorFormat(e);
    }
}

export const CancelSession = async(memberId, trainerId, day) => {
    try {
        const requestOptionsHead = {
            method: 'POST',
            headers: { 'Content-Type': 'application/json'},
            body: JSON.stringify({member_id: memberId, trainer_id: trainerId, day: day}),
        };
        const response = await fetch(`${rte}cancel_session`, requestOptionsHead);
        return responseFormat(response, false);
    } catch (e) {
        return errorFormat(e);
    }
}

export const CreateSession = async(memberId, trainerId, day) => {
    try {
        const requestOptionsHead = {
            method: 'POST',
            headers: { 'Content-Type': 'application/json'},
            body: JSON.stringify({member_id: memberId, trainer_id: trainerId, day: day}),
        };
        const response = await fetch(`${rte}create_session`, requestOptionsHead);
        return responseFormat(response, false);
    } catch (e) {
        return errorFormat(e);
    }
}

export const FindMatchingTrainers = async(memberId, days, specializations) => {
    try {
        const requestOptionsHead = {
            method: 'POST',
            headers: { 'Content-Type': 'application/json'},
            body: JSON.stringify({member_id: memberId, days: days, specializations:specializations}),
        };
        const response = await fetch(`${rte}find_matching_trainers`, requestOptionsHead);
        return responseFormat(response, true);
    } catch (e) {
        return errorFormat(e);
    }
}

export const AllTrainerSessions = async(trainerId) => {
    try {
        const requestOptionsHead = {
            method: 'POST',
            headers: { 'Content-Type': 'application/json'},
            body: JSON.stringify({trainer_id: trainerId}),
        };
        const response = await fetch(`${rte}trainer_sessions`, requestOptionsHead);
        return responseFormat(response, true);
    } catch (e) {
        return errorFormat(e);
    }
}

export const TrainerAvailabilities = async(trainerId) => {
    try {
        const requestOptionsHead = {
            method: 'POST',
            headers: { 'Content-Type': 'application/json'},
            body: JSON.stringify({trainer_id: trainerId}),
        };
        const response = await fetch(`${rte}trainer_availability`, requestOptionsHead);
        return responseFormat(response, true);
    } catch (e) {
        return errorFormat(e);
    }
}

export const AddTrainerAvailability = async(trainerId, day) => {
    try {
        const requestOptionsHead = {
            method: 'POST',
            headers: { 'Content-Type': 'application/json'},
            body: JSON.stringify({trainer_id: trainerId, day: day}),
        };
        const response = await fetch(`${rte}add_availability`, requestOptionsHead);
        return responseFormat(response, false);
    } catch (e) {
        return errorFormat(e);
    }
}

export const RemoveTrainerAvailability = async(trainerId, day) => {
    try {
        const requestOptionsHead = {
            method: 'POST',
            headers: { 'Content-Type': 'application/json'},
            body: JSON.stringify({trainer_id: trainerId, day: day}),
        };
        const response = await fetch(`${rte}remove_availability`, requestOptionsHead);
        return responseFormat(response, false);
    } catch (e) {
        return errorFormat(e);
    }
}

export const SearchSpecifiedMembers = async(firstName, lastName) => {
    if (!firstName) {
        firstName = "";
        lastName = "";
    }
    if (!lastName) {
        firstName = "";
        lastName = "";
    }
    try {
        const requestOptionsHead = {
            method: 'POST',
            headers: { 'Content-Type': 'application/json'},
            body: JSON.stringify({first_name: firstName, last_name: lastName}),
        };
        const response = await fetch(`${rte}get_members`, requestOptionsHead);
        return responseFormat(response, true);
    } catch (e) {
        return errorFormat(e);
    }
}

export const GetTrainerSpecializations = async(trainerId) => {
    try {
        const requestOptionsHead = {
            method: 'POST',
            headers: { 'Content-Type': 'application/json'},
            body: JSON.stringify({trainer_id: trainerId}),
        };
        const response = await fetch(`${rte}trainer_specializations`, requestOptionsHead);
        return responseFormat(response, true);
    } catch (e) {
        return errorFormat(e);
    }
}

export const AddTrainerSpecialization = async(trainerId, skillId) => {
    try {
        const requestOptionsHead = {
            method: 'POST',
            headers: { 'Content-Type': 'application/json'},
            body: JSON.stringify({trainer_id: trainerId, skill_id: skillId}),
        };
        const response = await fetch(`${rte}add_specialization`, requestOptionsHead);
        return responseFormat(response, false);
    } catch (e) {
        return errorFormat(e);
    }
}

export const RemoveTrainerSpecialization = async(trainerId, skillId) => {
    try {
        const requestOptionsHead = {
            method: 'POST',
            headers: { 'Content-Type': 'application/json'},
            body: JSON.stringify({trainer_id: trainerId, skill_id: skillId}),
        };
        const response = await fetch(`${rte}remove_specialization`, requestOptionsHead);
        return responseFormat(response, false);
    } catch (e) {
        return errorFormat(e);
    }
}

