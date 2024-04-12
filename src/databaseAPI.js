const rte = "http://localhost:5000/";

export const GetSubscriptionModels = async() => {
    try {
        const requestOptionsHead = {
            method: 'GET',
            headers: { 'Content-Type': 'application/json'},
        };
        const response = await fetch(`${rte}subscription_models`, requestOptionsHead);
        if (response.ok) {
            return await response.json();
        }
        return null;
    } catch (e) {
        return null;
    }
}