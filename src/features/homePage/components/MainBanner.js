import React from 'react';
import {useNavigate} from 'react-router-dom';
import '../styles/style.scss';

const MainBanner = ({eventCount}) => {
    const navigate = useNavigate();

    return (
        <section className="main-banner">
            <div className="container">
                <div className="main-banner__content">
                    <h1 className="main-banner__title">Переглядай найпопулярніші івенти прямо зараз!</h1>
                    <div className="main-banner__text">На наступний тиждень доступно <strong>N</strong> подій.</div>
                    <div className="main-banner__buttons">
                        <button className="main-banner__btn" onClick={() => navigate('/events')}>
                            Почати перегляд
                        </button>
                        <button className="main-banner__btn outline"
                                onClick={() => document.getElementById('categories').scrollIntoView({behavior: 'smooth'})}>
                            До категорій
                        </button>

                    </div>
                </div>
            </div>
        </section>
    );
};

export default MainBanner;
