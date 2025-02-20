
import { API_ENDPOINTS } from '../../../data/apiConfig';

export const findAllEvents = async (page = 0, size = 20,  filters = {}) => {
    try {
        const token = localStorage.getItem('token');

        const queryParams = new URLSearchParams({
            page: page,
            size: size,
            ...filters
        });

        const response = await fetch(`${API_ENDPOINTS.EVENTS}/search?${queryParams.toString()}`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`
            }
        });

        if (!response.ok) {
            const errorData = await response.json();
            throw new Error(errorData.message || `Помилка отримання івентів: ${response.status}`);
        }

        return await response.json();
    } catch (error) {
        console.error('Помилка запиту івентів:', error);
        throw error;
    }
};

export const findEventById = async (eventId) => {
    try {
        const token = localStorage.getItem('token');

        const response = await fetch(`${API_ENDPOINTS.EVENTS}/${eventId}`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`
            }
        });

        if (!response.ok) {
            const errorData = await response.json();
            throw new Error(errorData.message || `Помилка отримання івентів: ${response.status}`);
        }

        return await response.json();
    } catch (error) {
        console.error('Помилка запиту івентів:', error);
        throw error;
    }
};

export const deleteEventById = async (eventId) => {
    try {
        const token = localStorage.getItem('token');

        const response = await fetch(`${API_ENDPOINTS.EVENTS}/${eventId}`, {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`
            }
        });

        if (response.status !== 204 ) {
            const errorData = await response.json();
            throw new Error(errorData.message || `Помилка видалення івентів: ${response.status}`);
            return false;
        }

        return true;
    } catch (error) {
        throw error;
    }
};

export const createEvent = async (eventData) => {
    try {
        const token = localStorage.getItem("token");
        const response = await fetch(API_ENDPOINTS.EVENTS, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${token}`,
            },
            body: JSON.stringify(eventData),
        });

        if (!response.ok) {
            const errorData = await response.json();
            throw new Error(errorData.message || `Помилка створення івенту: ${response.status}`);
        }

        return await response.json();
    } catch (error) {
        console.error("Помилка створення івенту:", error);
        throw error;
    }
};
