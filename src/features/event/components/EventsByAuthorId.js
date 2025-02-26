import React, {useEffect, useRef, useState} from "react";
import {debounce} from 'lodash';
import {useNavigate, useParams} from "react-router-dom";
import {findAllEvents, findAllEventsByAuthorId} from "../services/eventSerivce";
import "../styles/style.scss";
import CategoriesButton from "../../../components/categoriesButton/components/CategoriesButton";
import EventFilters from "../../../components/eventFilters/components/eventFilters";
import EventsSection from "../../../components/events/components/EventsSection";

const EventsByAuthorId = () => {
    const { authorId } = useParams();
    const navigate = useNavigate();
    const [events, setEvents] = useState([]);
    const [thisPage, setThisPage] = useState(0);
    const [hasNextPage, setHasNextPage] = useState(false);
    const [error, setError] = useState(null);
    const [title, setTitle] = useState("");
    const [startDate, setStartDate] = useState("");
    const [endDate, setEndDate] = useState("");
    const [city, setCity] = useState("");
    const [author, setAuthor] = useState("");
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
                if (authorId) filters.author = authorId;
                if (onlyAvailable) filters.onlyAvailable = onlyAvailable;

                const result = await findAllEventsByAuthorId(authorId, thisPage, 20, filters);

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
    }, [title, thisPage, startDate, endDate, city, authorId, onlyAvailable]);

    return (
        <EventsSection
            events={events}
            hasNextPage={hasNextPage}
            setThisPage={setThisPage}
            setTitle={setTitle}
            setStartDate={setStartDate}
            setEndDate={setEndDate}
            setCity={setCity}
            setAuthor={setAuthor}
            setOnlyAvailable={setOnlyAvailable}
            setShowCategories={setShowCategories}
            setError={setError}/>
    );
};

export default EventsByAuthorId;