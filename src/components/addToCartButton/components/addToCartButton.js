import React, { useState } from 'react';
import "../styles/style.scss"

const AddToCartButton = ({ eventId }) => {
    const [quantity, setQuantity] = useState(1);
    const [message, setMessage] = useState('');

    const handleAddToCart = async () => {
        const token = localStorage.getItem('token');

        const requestBody = {
            eventId: parseInt(eventId, 10),
            quantity: parseInt(quantity, 10),
        };

        try {
            const response = await fetch('http://localhost:8080/cart', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`
                },
                body: JSON.stringify(requestBody),
            });

            console.log(response);

            if (response.status === 401) {
                throw new Error('Вам потрібно авторизуватися');
            }

            if (!response.ok) {
                throw new Error('Виникла помилка при додавані до кошика');
            }

            setMessage('Квиток успішно додано до кошика');
        } catch (error) {
            setMessage(`Помилка: ${error.message}`);
        }
    };

    return (
        <div className="event__add-to-cart">
            <button
                className="event__add-to-cart__button"
                onClick={handleAddToCart}
            >
                Додати квиток в кошик
            </button>

            <div className="event__add-to-cart__quantity-controls">
                <button
                    className="event__add-to-cart__quantity-controls__quantity-btn"
                    onClick={() => setQuantity(prev => Math.max(prev - 1, 1))}
                >
                    -
                </button>

                <span className="event__add-to-cart__quantity-controls__quantity-number">{quantity}</span>

                <button
                    className="event__add-to-cart__quantity-controls__quantity-btn"
                    onClick={() => setQuantity(prev => prev + 1)}
                >
                    +
                </button>
            </div>

            {message && <p className="event__add-to-cart__message">{message}</p>}
        </div>
    );
};

export default AddToCartButton;
