import React from 'react';
import { Link } from 'react-router-dom';
import "../styles/style.scss";

const Menu = () => {
    return (
        <section className="menuSection">
            <div className="menu">
                <nav>
                    <ul className="menu__list">
                        <li><Link className="menu__link" to="/">Головна</Link></li>
                        <li><Link className="menu__link" to="/catalog">Каталог книжок</Link></li>
                        <li><Link className="menu__link" to="/cart">Кошик</Link></li>
                        <li><Link className="menu__link" to="/order">Замовлення</Link></li>
                        <li><Link className="menu__link" to="/registration">Зареєструватися</Link></li>
                        <li><Link className="menu__link" to="/login">Авторизація</Link></li>
                    </ul>
                </nav>
            </div>
        </section>
    );
};

export default Menu;


