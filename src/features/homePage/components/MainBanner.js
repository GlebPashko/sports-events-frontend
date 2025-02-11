import React from 'react';
import { useNavigate } from 'react-router-dom';
import './MainBanner.scss';

const MainBanner = ({ eventCount }) => {
    const navigate = useNavigate();

    return (
        <section className="main-banner">
            <div className="main-banner__content">
                <h1>Переглядай найпопулярніші івенти прямо зараз!</h1>
                <p>На наступний тиждень доступно <strong>{eventCount}</strong> подій.</p>
                <div className="main-banner__buttons">
                    <button className="main-banner__btn" onClick={() => navigate('/events')}>
                        Почати перегляд
                    </button>
                    <button className="main-banner__btn outline" onClick={() => navigate('/categories')}>
                        До категорій
                    </button>
                </div>
            </div>
        </section>
    );
};

export default MainBanner;
