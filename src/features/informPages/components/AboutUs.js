import React from "react";
import "../styles/style.scss";

const AboutUs = () => {
    return (
        <section className="about-us">
            <div className="container">
                <h1 className="about-us__title">Про нас</h1>

                <p className="about-us__subtitle">
                    Ласкаво просимо на платформу для організації та участі в спортивних подіях!
                    Наша місія – зробити спорт доступнішим та зручнішим для кожного.
                </p>

                <div className="about-us__mission">
                    <h2>Наша місія</h2>
                    <p>
                        Ми прагнемо об'єднати любителів активного способу життя та допомогти
                        організаторам легко створювати та керувати спортивними заходами.
                    </p>
                </div>

                <div className="about-us__benefits">
                    <h2>Наші переваги</h2>
                    <ul>
                        <li>📅 Зручне управління подіями</li>
                        <li>⚡ Миттєві онлайн-реєстрації</li>
                        <li>📍 Інтерактивна карта заходів</li>
                        <li>🔗 Приємений інтерфейс</li>
                        <li>💳 Зручна система оплати</li>
                    </ul>
                </div>

                <div className="about-us__contact">
                    <h2>Зв'яжіться з нами</h2>
                    <p>📍 Адреса: Одеса, Україна</p>
                    <p>📞 Телефон: +380 55 555 55 55</p>
                    <p>📧 Email: support@sportsevents.com</p>
                </div>
            </div>
        </section>
    );
};

export default AboutUs;
