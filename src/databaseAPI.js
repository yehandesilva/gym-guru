const rte = "http://localhost:4000/";

export const GetSubscriptionModels = async() => {
    try {
        const requestOptionsHead = {
            method: 'GET',
            headers: { 'Content-Type': 'application/json'},
        };
        const response = await fetch(`${rte}subscription_models`, requestOptionsHead);
        if (response.ok) {
            console.log(await response.json())
            return await response.json();
        }
        return null;
    } catch (e) {
        return null;
    }
}