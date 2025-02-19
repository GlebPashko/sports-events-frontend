import React, {useEffect, useState} from "react";
import '../styles/style.scss';
import {useNavigate} from "react-router-dom";
import {findAllEventsByCategoryId} from "../../event/services/category-eventsSerivice";
import {findLatestEvents} from "../services/mainPageService";

const VideoSection = () => {
    const [error, setError] = useState(null);
    const [events, setEvents] = useState([]);
    const navigate = useNavigate();

    useEffect( () => {
        const loadEvents = async () => {
        try {
            const result = await findLatestEvents();
            setEvents(result);
            if (!result || !result.events) {
                throw new Error("Дані про івенти відсутні");
            }

        } catch (error) {
            setError(error.message);
        }
        };

        loadEvents();
    }, []);

    return (
        <section className="news-feed">
            <div className="container">
                <h2 className="news-feed__title">Стрічка нових подій</h2>
                <div className="news-feed__post">
                    {events.map((event) => (
                        <div key={event.id} className="post-card">
                            <div className="post-card__iframe">
                                <iframe
                                    width="500px"
                                    height="200px"
                                    src={event.videoLink}
                                    title={event.title}
                                    frameBorder="0"
                                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                                    allowFullScreen
                                ></iframe>
                            </div>
                            <h3 className="post-card__title">{event.title}</h3>
                            <p className="post-card__description">{event.description}</p>

                            <button
                                className="post-card__button"
                                onClick={() => navigate(`/events/${event.id}`)}
                            >
                                ➜
                            </button>
                        </div>
                    ))}
                </div>
                <button className="news-feed__btn" onClick={() => navigate('/events')}>
                    Переглянути більше
                </button>
            </div>
        </section>

    );
};

export default VideoSection;

