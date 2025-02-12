import React from "react";
import "../styles/style.scss"; // Підключаємо стилі

const Footer = () => {
    return (
        <footer className="footer">
            <div className="footer__content">
                <p className="footer__text">© {new Date().getFullYear()} Event Project. Всі права захищені.</p>
                <ul className="footer__links">
                    <li><a href="/">Про нас</a></li>
                    <li><a href="/">Контакти</a></li>
                    <li><a href="/">Політика конфіденційності</a></li>
                    <li><a href="/">Мапа сайту</a></li>
                </ul>
            </div>
        </footer>
    );
};

export default Footer;
