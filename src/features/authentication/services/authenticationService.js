// src/services/authService.js

const API_URL = 'http://localhost:8080/auth';

export const loginUser = async (email, password) => {
    const loginData = { email, password };

    try {
        const response = await fetch(`${API_URL}/login`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(loginData),
        });

        if (!response.ok) {
            throw new Error(`Login failed: ${response.status}`);
        }

        const result = await response.json();
        localStorage.setItem('token', result.token);
        return result;
    } catch (error) {
        throw error;
    }
};
