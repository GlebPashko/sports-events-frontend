import React, {useEffect, useState} from 'react';
import {findAllOrders, getOrders} from '../services/orderService';
import '../styles/ style.scss';
import {doPayment} from "../services/paymentService";
import Payment from "./Payment";
import {useNavigate} from "react-router-dom";

const Orders = () => {
    const navigate = useNavigate();
    const [orders, setOrders] = useState([]);
    const [error, setError] = useState(null);
    const [paymentVisible, setPaymentVisible] = useState(null);

    useEffect(() => {
        const loadOrders = async () => {
            try {
                const result = await findAllOrders();
                setOrders(result);
            } catch (error) {
                setError(error.message);
            }
        };

        loadOrders();
    }, []);

    const handlePaymentClick = (orderId) => {
        setPaymentVisible(orderId);
    };

    return (
        <section className="orders">
            <h1 className="orders__title">Ваші квитки</h1>
            {error && <p className="orders__error">{error}</p>}
            <div className="orders__list">
                {orders.map(order => (
                    <div key={order.id} className="order-card">
                        <h3 className="order-card__id">Квиток #{order.id}</h3>
                        <p className="order-card__date">Дата купівлі: {new Date(order.orderDate).toLocaleString()}</p>
                        <p className="order-card__status">Статус: {order.status}</p>
                        <p className="order-card__total">Загальна сума: {order.total} грн</p>
                        <div className="order-card__items">
                            {order.orderItems.map(item => (
                                <div key={item.id} className="order-card__items__order-item">
                                    <img src={item.avatarImage} alt={item.eventTitle}
                                         className="order-card__items__image"/>
                                    <div className="order-card__items__info">
                                        <h4 onClick={() => navigate(`/events/${item.id}`)}>
                                            {item.eventTitle}
                                        </h4>
                                        <p>{item.descriptionSmall}</p>
                                        <p>Ціна: {item.price} грн</p>
                                        <p>Кількість: {item.quantity}</p>
                                        <p className="order-card__date">
                                            Дата початку події: {new Date(item.dateOfStartEvent).toLocaleString()}
                                        </p>
                                    </div>
                                </div>
                            ))}
                        </div>

                        {order.status === "PENDING" && (
                            paymentVisible !== order.id ? (
                                <button
                                    className="orders__payment-first-button"
                                    onClick={() => handlePaymentClick(order.id)}
                                >
                                    💳 Оплатити карткою
                                </button>
                            ) : (
                                <Payment
                                    orderStatus={order.status}
                                    orderID={order.id}
                                    paymentMethod="CARD"
                                />
                            )
                        )}
                    </div>
                ))}
            </div>
        </section>
    );
};

export default Orders;
