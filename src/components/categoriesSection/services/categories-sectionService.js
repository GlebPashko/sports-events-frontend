import {API_ENDPOINTS} from "../../../data/apiConfig";

export const findAllCategories = async () => {
    try {
        const token = localStorage.getItem('token');

        const response = await fetch(`${API_ENDPOINTS.CATEGORIES}`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
            }
        });

        if (!response.ok) {
            const errorData = await response.json();
            throw new Error(errorData.message || `Помилка отримання івентів: ${response.status}`);
        }

        return await response.json();
    } catch (error) {
        console.error('Помилка запиту категорій:', error);
        throw error;
    }
};

export const findAllCategoriesByAuthor = async (authorId) => {
    try {
        const token = localStorage.getItem('token');

        const response = await fetch(`${API_ENDPOINTS.CATEGORIES}`, {
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
        console.error('Помилка запиту категорій:', error);
        throw error;
    }
};