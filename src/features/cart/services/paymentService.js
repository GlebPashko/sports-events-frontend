import { API_ENDPOINTS } from "../../../data/apiConfig";

export const doPayment = async (orderID, paymentMethod) => {
    try {
        const token = localStorage.getItem('token');
        const response = await fetch(`${API_ENDPOINTS.PAYMENTS}/pay`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`,
            },
            body: JSON.stringify({
                orderId: orderID,
                paymentMethod: paymentMethod,
            }),
        });

        if (!response.ok) {
            if (response.status === 500) {
                throw new Error('Помилка сервера (500).');
            }
            const errorData = await response.json();
            throw new Error(errorData.message || `Помилка оплати: ${response.status}`);
        }

        const result = await response.json();
        return result;
    } catch (error) {
        throw error;
    }
};
