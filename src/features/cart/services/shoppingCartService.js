import {API_ENDPOINTS} from "../../../data/apiConfig";

export const findShoppingCartForUser = async () => {
    try {
        const token = localStorage.getItem('token');

        const response = await fetch(`${API_ENDPOINTS.CART}`, {
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

export const deleteItemFromShoppingCart = async (cartItemId) => {
    try {
        await fetch(`http://localhost:8080/cart/${cartItemId}`, {
            method: 'DELETE',
            headers: {
                'Authorization': `Bearer ${localStorage.getItem('token')}`,
                'Content-Type': 'application/json',
            },
        });
    } catch (error) {
        console.error('Помилка видалення товару з кошика:', error);
    }
};

