import React from "react";
import "../styles/style.scss";
import {Link} from "react-router-dom"; // Підключаємо стилі

const Footer = () => {
    return (
        <footer className="footer">
            <div className="footer__content">
                <p className="footer__text">© {new Date().getFullYear()} Event Project. Всі права захищені.</p>
                <ul className="footer__links">
                    <li><Link to="/about-us">Про нас</Link></li>
                    <li><Link to="/contacts">Контакти</Link></li>
                </ul>
            </div>
        </footer>
    );
};

export default Footer;
