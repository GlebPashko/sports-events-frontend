import {API_ENDPOINTS} from "../../../data/apiConfig";

import { jwtDecode } from "jwt-decode";

export const findUsersProfile = async () => {
    try {
        const token = localStorage.getItem('token');

        const response = await fetch(`${API_ENDPOINTS.USER}/me`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`
            }
        });

        if (!response.ok) {
            const errorData = await response.json();
            throw new Error(errorData.message || `Помилка входу в кабінет: ${response.status}`);
        }

        return await response.json();
    } catch (error) {
        throw error;
    }
};

export const checkIsAdmin = () => {
    const token = localStorage.getItem("token");
    if (!token) return false;

    try {
        const decoded = jwtDecode(token);
        return decoded.roles && decoded.roles.includes("ROLE_ADMIN");
    } catch (error) {
        console.error("Помилка декодування токена:", error);
        return false;
    }
};

export const checkIsOrganizer = () => {
    const token = localStorage.getItem("token");
    if (!token) return false;

    try {
        const decoded = jwtDecode(token);
        return decoded.roles && decoded.roles.includes("ROLE_ORGANIZER");
    } catch (error) {
        console.error("Помилка декодування токена:", error);
        return false;
    }
};

