// src/services/orderService.js

const API_URL = 'http://localhost:8080/orders';

// Отримати всі замовлення користувача
export const findAllOrders = async () => {
    try {
        const token = localStorage.getItem('token');
        const response = await fetch(`${API_URL}`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`,
            },
        });

        if (!response.ok) {
            const errorData = await response.json();
            throw new Error(errorData.message || `Помилка отримання замовлень: ${response.status}`);
        }

        return await response.json();
    } catch (error) {
        console.error('Помилка отримання замовлень:', error);
        throw error;
    }
};

// Створити нове замовлення
export const createOrder = async (shippingAddress) => {
    try {
        const token = localStorage.getItem('token');
        const response = await fetch(`${API_URL}`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`,
            },
            body: JSON.stringify({ shippingAddress }),
        });

        if (!response.ok) {
            const errorData = await response.json();
            throw new Error(errorData.message || `Помилка створення замовлення: ${response.status}`);
        }

        return await response.json();
    } catch (error) {
        console.error('Помилка створення замовлення:', error);
        throw error;
    }
};

// Отримати замовлення за ID
export const findOrderById = async (orderId) => {
    try {
        const token = localStorage.getItem('token');
        const response = await fetch(`${API_URL}/${orderId}`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`,
            },
        });

        if (!response.ok) {
            const errorData = await response.json();
            throw new Error(errorData.message || `Помилка отримання замовлення: ${response.status}`);
        }

        return await response.json();
    } catch (error) {
        console.error('Помилка отримання замовлення:', error);
        throw error;
    }
};

// Видалити замовлення за ID
export const deleteOrder = async (orderId) => {
    try {
        const token = localStorage.getItem('token');
        const response = await fetch(`${API_URL}/${orderId}`, {
            method: 'DELETE',
            headers: {
                'Authorization': `Bearer ${token}`,
            },
        });

        if (!response.ok) {
            const errorData = await response.json();
            throw new Error(errorData.message || `Помилка видалення замовлення: ${response.status}`);
        }

        return { message: 'Замовлення видалено успішно' };
    } catch (error) {
        console.error('Помилка видалення замовлення:', error);
        throw error;
    }
};
