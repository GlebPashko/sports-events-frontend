


const API_BASE_URL = 'http://localhost:8080';

export const API_ENDPOINTS = {
    AUTH: `${API_BASE_URL}/auth`,
    USER: `${API_BASE_URL}/user`,
    CART: `${API_BASE_URL}/cart`,
    ORDERS: `${API_BASE_URL}/orders`,
    EVENTS: `${API_BASE_URL}/events`,
    CATEGORIES: `${API_BASE_URL}/categories`,
    PAYMENTS: `${API_BASE_URL}/payment`
};

export const USER_ROLES = {
    USER: 'User',
    ORGANIZER: 'Organizer',
    ADMIN: 'Admin',
};

export default API_BASE_URL;
