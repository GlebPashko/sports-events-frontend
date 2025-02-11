

import { API_ENDPOINTS } from '../../../data/apiConfig';

export const loginUser = async (email, password) => {
    try {
        const response = await fetch(`${API_ENDPOINTS.AUTH}/login`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ email, password }),
        });

        if (!response.ok) {
            const errorData = await response.json();
            throw new Error(errorData.message || `Login failed: ${response.status}`);
        }

        const result = await response.json();
        localStorage.setItem('token', result.token);
        return result;
    } catch (error) {
        throw error;
    }
};

export const registerUser = async (email, password, repeatPassword, firstName, lastName, city, sex) => {
    try {
        const response = await fetch(`${API_ENDPOINTS.AUTH}/registration`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                email,
                password,
                repeatPassword,
                firstName,
                lastName,
                city,
                sex
            }),
        });

        if (!response.ok) {
            const errorData = await response.json();
            throw new Error(errorData.message || `Registration failed: ${response.status}`);
        }

        const result = await response.json();
        localStorage.setItem('token', result.token);
        return result;
    } catch (error) {
        throw error;
    }
};

