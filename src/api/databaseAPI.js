const rte = "http://localhost:4000/";

const errorFormat = () => {
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
        return errorFormat();
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
        return errorFormat();
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
        return errorFormat();
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
        return errorFormat();
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
        return errorFormat();
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
        return errorFormat();
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
        return errorFormat();
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
        return errorFormat();
    }
}