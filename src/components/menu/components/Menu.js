import React from 'react';
import { Link } from 'react-router-dom';
import "../styles/style.scss";

const Menu = () => {
    return (
        <section className="menu">
                <nav>
                    <ul className="menu__list">
                        <li><Link className="menu__link" to="/">Головна</Link></li>
                        <li><Link className="menu__link" to="/registration">Зареєструватися</Link></li>
                        <li><Link className="menu__link" to="/events">Івенти</Link></li>
                        <li><Link className="menu__link" to="/login">Авторизація</Link></li>
                    </ul>
                </nav>
        </section>
    );
};

export default Menu;


