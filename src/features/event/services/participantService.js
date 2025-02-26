import {API_ENDPOINTS} from "../../../data/apiConfig";

export const findAllParticipantForEvent = async (eventId) => {
    try {
        const token = localStorage.getItem("token");
        const response = await fetch(`${API_ENDPOINTS.PARTICIPANT}/event/${eventId}`, {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${token}`,
            },
        });

        if (!response.ok) {
            const errorData = await response.json();
            throw new Error(errorData.message || `Помилка отримання гостей: ${response.status}`);
        }

        return response.json();
    } catch (error) {
        console.error("Помилка запиту гостей:", error);
        throw error;
    }
};