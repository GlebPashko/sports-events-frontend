import React, {useEffect, useRef, useState} from "react";
import {debounce} from 'lodash';
import {useNavigate} from "react-router-dom";
import {findAllEvents} from "../services/eventSerivce";
import "../styles/style.scss";
import CategoriesButton from "../../../components/categoriesButton/components/CategoriesButton";
import EventFilters from "../../../components/eventFilters/components/eventFilters";
import EventsSection from "../../../components/events/components/EventsSection";

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
    const [showCategories, setShowCategories] = useState(false);
    const categoriesRef = useRef(null);

    useEffect(() => {
        const loadEvents = async () => {
            try {
                const filters = { };

                if (title) filters.title = title;
                if (startDate) filters.startDate = startDate + "T00:00:00";
                if (endDate) filters.endDate = endDate + "T23:59:00";
                if (city) filters.city = city;
                if (onlyAvailable) filters.onlyAvailable = onlyAvailable;

                const result = await findAllEvents(thisPage, 20, filters);

                if (!result || !result.events) {
                    throw new Error("Дані про івенти відсутні");
                }

                if (thisPage === 0) {
                    setEvents(result.events);
                } else {
                    setEvents(prevEvents => [...prevEvents, ...result.events]);
                }

                setHasNextPage(result.hasNextPage);
            } catch (error) {
                setError(error.message);
            }
        };

        loadEvents();
    }, [title, thisPage, startDate, endDate, city, onlyAvailable]);

    return (
        <EventsSection
        events={events}
        hasNextPage={hasNextPage}
        setThisPage={setThisPage}
        setTitle={setTitle}
        setStartDate={setStartDate}
        setEndDate={setEndDate}
        setCity={setCity}
        setOnlyAvailable={setOnlyAvailable}
        setShowCategories={setShowCategories}
        setError={setError}/>
        // <section className="events">
        //     <h1 className="events__title">Всі івенти</h1>
        //
        //     <EventFilters
        //         setTitle={setTitle}
        //         setStartDate={setStartDate}
        //         setEndDate={setEndDate}
        //         setCity={setCity}
        //         setOnlyAvailable={setOnlyAvailable}
        //     />
        //
        //     <div className="categories-event-section" ref={categoriesRef}>
        //         <CategoriesButton/>
        //     </div>
        //
        //     <div className="events__grid">
        //         {events.map((event) => (
        //             <div key={event.id} className="events__grid-cart">
        //                 <img src={event.avatarImage} alt={event.title} className="events__grid-cart__image"/>
        //                 <h3 className="events__grid-cart__title">
        //                     <a href={`/event/${event.id}`}>{event.title}</a>
        //                 </h3>
        //                 <p className="events__grid-cart__date">Дата початку: {event.dateOfStartEvent}</p>
        //                 <p className="events__grid-cart__price">Ціна: {event.price}</p>
        //             </div>
        //         ))}
        //     </div>
        //
        //     <section className="pagination">
        //         {hasNextPage && (
        //             <button
        //                 onClick={() => setThisPage(prevPage => prevPage + 1)}
        //                 className="pagination__button">
        //                 Показати ще
        //             </button>
        //         )}
        //     </section>
        // </section>
    );
};

export default Events;
