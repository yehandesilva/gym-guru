const rte = "http://localhost:4000/";

export const GetSubscriptionModels = async() => {
    try {
        const requestOptionsHead = {
            method: 'GET',
            headers: { 'Content-Type': 'application/json'},
        };
        const response = await fetch(`${rte}subscription_models`, requestOptionsHead);
        if (response.ok) {
            return JSON.parse(await response.json());
        }
        return null;
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
        if (response.ok) {
            return JSON.parse(await response.json());
        }
        return null;
    } catch (e) {
        return null;
    }
}