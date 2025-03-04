import React from 'react';
import {Link} from 'react-router-dom';
import "../styles/style.scss";
import {jwtDecode} from "jwt-decode";

const Menu = () => {
    const itValidToken = () => {
        const token = localStorage.getItem("token");

        if (!token) {
            return false;
        }

        try {
            const decoded = jwtDecode(token);

            if (decoded.exp * 1000 < Date.now()) {
                return false;
            }

            return true;
        } catch (error) {
            return false;
        }
    };

    return (
        <section className="menu">
            <nav>
                <ul className="menu__list">
                    <li><Link className="menu__link" to="/">Головна</Link></li>
                    {!itValidToken() && (
                        <li><Link className="menu__link" to="/login">Авторизація</Link></li>
                    )}
                    <li><Link className="menu__link" to="/events">Івенти</Link></li>
                    {itValidToken() && (
                        <>
                            <li><Link className="menu__link" to="/cart">Кошик</Link></li>
                            <li><Link className="menu__link" to="/orders">Квитки</Link></li>
                            <li><Link className="menu__link" to="/user/me">Кабінет</Link></li>
                        </>
                    )}
                </ul>
            </nav>
        </section>
    );
};

export default Menu;


