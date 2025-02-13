
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
