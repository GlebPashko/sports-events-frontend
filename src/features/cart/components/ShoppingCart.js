import {useNavigate, useParams} from "react-router-dom";
import {useEffect, useState} from "react";
import {deleteItemFromShoppingCart, findShoppingCartForUser} from "../services/shoppingCartService";
import "../styles/ style.scss";
import {createOrder} from "../services/orderService";
const ShoppingCart = () => {
    const navigate = useNavigate();
    const [error, setError] = useState(null);
    const [shoppingCart, setShoppingCart] = useState();
    const [emailAddress, setEmailAddress] = useState('');
    const [message, setMessage] = useState('');

    useEffect(() => {
        const loadEvent = async () => {
            try {

                const result = await findShoppingCartForUser();
                console.log(result);
                setShoppingCart(result);

                if (!result || !result.events) {
                    throw new Error("Дані про івенти відсутні");
                }

            } catch (error) {
                setError(error.message);
            }
        };

        loadEvent();
    }, [message]);

    const handleRemove = async (cartItemId) => {
        try {
            deleteItemFromShoppingCart(cartItemId);

            setShoppingCart({
                ...shoppingCart,
                cartItems: shoppingCart.cartItems.filter(item => item.id !== cartItemId),
            });
        } catch (error) {
            console.error('Помилка видалення товару з кошика:', error);
        }
    };

    const handleOrder = async () => {
        try {
            const result = await createOrder(emailAddress);
            setMessage('Замовлення успішно створено!');
            console.log('Результат замовлення:', result);
        } catch (error) {
            setMessage('Не вдалося створити замовлення.');
        }
    };


    if (!shoppingCart) {
        return <p>Завантаження...</p>;
    }

    return (
        <section className="shopping-cart">
            <h1 className="shopping-cart__title">Ваш кошик</h1>
                {shoppingCart && shoppingCart.cartItems?.length ? (
                    shoppingCart.cartItems.map((cartItem) => (
                        <div key={cartItem.id} className="shopping-cart__wrapper">
                            <div className="shopping-cart__wrapper__image-block">
                                <img
                                    src={cartItem.avatarImage}
                                    alt={cartItem.eventTitle}
                                    className="image-block__img"
                                />
                            </div>

                            <div className="shopping-cart__wrapper__info-block">
                                <h3 className="info-block__title"
                                    onClick={() => navigate(`/events/${cartItem.eventId}`)}>
                                    {cartItem.eventTitle}
                                </h3>

                                <p className="info-block__description">
                                    {cartItem.descriptionSmall}
                                </p>

                                <p className="info-block__details">
                                    {`Місто: ${cartItem.city} | Дата: ${new Date(cartItem.dateOfStartEvent).toLocaleString()}`}
                                </p>

                                <p className="info-block__price">
                                    {`Ціна: ${cartItem.price} грн`}
                                </p>

                                <p className="info-block__quantity">
                                    {`Кількість: ${cartItem.quantity}`}
                                </p>
                            </div>

                            <div className="shopping-cart__wrapper__remove-block">
                                <button
                                    className="remove-block__button"
                                    onClick={() => handleRemove(cartItem.id)}
                                >
                                    ✖
                                </button>
                            </div>

                        </div>
                    ))
                ) : (
                    <p className="shopping-cart__empty">Кошик порожній</p>
                )}

            {shoppingCart && shoppingCart.cartItems?.length > 0 && (
                <>
                    <input
                        type="text"
                        placeholder="Введіть вашу електронну адресу"
                        value={emailAddress}
                        onChange={(e) => setEmailAddress(e.target.value)}
                        className="shopping-cart__address-input"
                    />

                    <button
                        className="shopping-cart__do-order"
                        onClick={handleOrder}
                    >
                        Оформити замовлення
                    </button>

                    {message && <p className="shopping-cart__message">{message}</p>}
                </>
            )}
        </section>
    );
};

export default ShoppingCart;