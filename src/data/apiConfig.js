


const API_BASE_URL = 'http://localhost:8080';

export const API_ENDPOINTS = {
    AUTH: `${API_BASE_URL}/auth`,
    USERS: `${API_BASE_URL}/users`,
    BOOKS: `${API_BASE_URL}/books`,
    CART: `${API_BASE_URL}/cart`,
    ORDERS: `${API_BASE_URL}/orders`,
    EVENTS: `${API_BASE_URL}/events`,
};

export const USER_ROLES = {
    USER: 'User',
    ORGANIZER: 'Organizer',
    ADMIN: 'Admin',
};

export default API_BASE_URL;
