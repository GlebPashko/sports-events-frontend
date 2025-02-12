import React from "react";
import '../styles/style.scss';
import {useNavigate} from "react-router-dom";

const postsData = [
    {
        id: 1,
        title: "Тренування на свіжому повітрі",
        description: "Нове тренування на свіжому повітрі в парке",
        youtubeId: "dQw4w9WgXcQ", // ID відео
    },
    {
        id: 2,
        title: "Йога для гнучкості",
        description: "Комплекс вправ для покращення гнучкості",
        youtubeId: "3JZ_D3ELwOQ",
    },
    {
        id: 3,
        title: "Біг: як почати?",
        description: "Основи бігу та правильна техніка",
        youtubeId: "L_jWHffIx5E",
    },
    {
        id: 4,
        title: "Плавання для здоров'я",
        description: "Поради для покращення техніки плавання",
        youtubeId: "ZZ5LpwO-An4",
    }
];

const VideoSection = () => {
    const navigate = useNavigate();

    return (
        <section className="news-feed">
            <div className="container">
                <h2 className="news-feed__title">Стрічка нових подій</h2>
                <div className="news-feed__post">
                    {postsData.map((post) => (
                        <div key={post.id} className="post-card">
                            <div className="post-card__iframe">
                                <iframe
                                    width="500px"
                                    height="200px"
                                    src={`https://www.youtube.com/embed/${post.youtubeId}`}
                                    title={post.title}
                                    frameBorder="0"
                                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                                    allowFullScreen
                                ></iframe>
                            </div>
                            <h3 className="post-card__title">{post.title}</h3>
                            <p className="post-card__description">{post.description}</p>

                            <button
                                className="post-card__button"
                                onClick={() => window.open(`https://www.youtube.com/watch?v=${post.youtubeId}`, "_blank")}
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

