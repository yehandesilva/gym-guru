const rte = "http://localhost:4000/";

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
        return responseFormat(response);
    } catch (e) {
        return null;
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
        return null;
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
        return responseFormat(response);
    } catch (e) {
        return null;
    }
}