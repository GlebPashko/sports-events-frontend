import React, {useRef} from "react";
import CategoriesButton from "../../categoriesButton/components/CategoriesButton";
import EventFilters from "../../eventFilters/components/eventFilters";

const EventsSection = ({events, hasNextPage, setThisPage, setTitle, setStartDate, setEndDate, setCity, setAuthor, setOnlyAvailable }) => {
    const categoriesRef = useRef(null);

    return (
        <section className="events">
            <h1 className="events__title">Всі івенти</h1>

            <EventFilters
                setTitle={setTitle}
                setStartDate={setStartDate}
                setEndDate={setEndDate}
                setCity={setCity}
                setAuthor={setAuthor}
                setOnlyAvailable={setOnlyAvailable}
            />

            <div className="categories-event-section" ref={categoriesRef}>
                <CategoriesButton/>
            </div>

            <div className="events__grid">
                {events.map((event) => (
                    <div key={event.id} className="events__grid-cart">
                        <img src={event.avatarImage} alt={event.title} className="events__grid-cart__image"/>
                        <h3 className="events__grid-cart__title">
                            <a href={`/events/${event.id}`}>{event.title}</a>
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

export default EventsSection;