import React, { useEffect, useState } from "react";
import { debounce } from 'lodash';
import { useNavigate } from "react-router-dom";
import { findAllEvents } from "../services/eventSerivce";
import "../styles/style.scss";
import PaginationComponent from "./PaginationComponent";

const Events = () => {
    const navigate = useNavigate();
    const [events, setEvents] = useState([]);
    const [thisPage, setThisPage] = useState(0);
    const [hasNextPage, setHasNextPage] = useState(false);
    const [error, setError] = useState(null);
    const [title, setTitle] = useState("");
    const [startDate, setStartDate] = useState("");
    const [endDate, setEndDate] = useState("");
    const [city, setCity] = useState("");
    const [onlyAvailable, setOnlyAvailable] = useState(false);

    useEffect(() => {
        const loadEvents = async () => {
            try {
                const filters = {};

                if (title) filters.title = title;
                if (startDate) filters.startDate = startDate;
                if (endDate) filters.endDate = endDate;
                if (city) filters.city = city;
                if (onlyAvailable) filters.onlyAvailable = onlyAvailable;

                const result = await findAllEvents(thisPage, 20, filters);

                if (!result || !result.events) {
                    throw new Error("Дані про івенти відсутні");
                }

                setEvents(result.events);
                setHasNextPage(result.hasNextPage);
            } catch (error) {
                setError(error.message);
            }
        };

        loadEvents();
    }, [title, thisPage, startDate, endDate, city, onlyAvailable]);

    const debouncedSearch = debounce((value) => {
        setTitle(value);
    }, 500);

    const debouncedCity = debounce((value) => {
        setCity(value);
    }, 500);

    const debouncedOnlyAvailable = debounce((value) => {
        setOnlyAvailable(value);
    }, 500);

    const handleStartDateChange = (e) => {
        setStartDate(e.target.value);
    };

    const handleEndDateChange = (e) => {
        setEndDate(e.target.value);
    };

    return (
        <section className="events">
            <h1 className="events__title">Всі івенти</h1>

            <div className="events__filters">
                <input
                    type="text"
                    placeholder="Пошук за назвою..."
                    className="events__search"
                    onChange={(e) => debouncedSearch(e.target.value)}
                />

                <input
                    type="date"
                    className="events__filter"
                    value={startDate}
                    onChange={handleStartDateChange}
                />
                <input
                    type="date"
                    className="events__filter"
                    value={endDate}
                    onChange={handleEndDateChange}
                />

                <select className="events__filter" value={city} onChange={(e) => debouncedCity(e.target.value)}>
                    <option value="">Оберіть місто</option>
                    <option value="Kyiv">Київ</option>
                    <option value="Odesa">Одеса</option>
                </select>

                <select className="events__filter" value={onlyAvailable}
                        onChange={(e) => debouncedOnlyAvailable(e.target.value)}>
                    <option value="true">Тільки доступні</option>
                    <option value="false">Всі</option>
                </select>
            </div>

            <div className="events__grid">
                {events.map((event) => (
                    <div key={event.id} className="events__grid-cart">
                        <img src={event.avatarImage} alt={event.title} className="events__grid-cart__image"/>
                        <h3 className="events__grid-cart__title">
                            <a href={`/event/${event.id}`}>{event.title}</a>
                        </h3>
                        <p className="events__grid-cart__date">Дата початку: {event.dateOfStartEvent}</p>
                        <p className="events__grid-cart__price">Ціна: {event.price}</p>
                    </div>
                ))}
            </div>

            <section className="pagination">
                {hasNextPage && (
                    <button
                        onClick={() => setThisPage(prevPage => prevPage + 1)}
                        className="pagination__button">
                        Показати ще
                    </button>
                )}
            </section>
        </section>
    );
};

export default Events;
