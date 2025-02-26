import React, { useState } from "react";
import {findAllCategories} from "../../../components/categoriesSection/services/categories-sectionService";
import {value} from "lodash/seq";

const UpdateEventForm = ({ onCreate }) => {
    const [eventData, setEventData] = useState({
        title: "",
        descriptionSmall: "",
        descriptionFull: "",
        avatarImage: "",
        mainImage: "",
        videoLink: "",
        maximumParticipants: "",
        dateOfStartEvent: "",
        price: "",
        city: "",
        registrationAvailableUntil: "",
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setEventData((prev) => ({
            ...prev,
            [name]: value,
        }));
    };

    const handleSubmit = (e) => {
        e.preventDefault();

        const formattedEvent = {
            ...eventData,
            maximumParticipants: parseInt(eventData.maximumParticipants, 10),
            price: parseFloat(eventData.price),
            dateOfStartEvent: `${eventData.dateOfStartEvent}:00`,
            registrationAvailableUntil: `${eventData.registrationAvailableUntil}:00`,
        };

        onCreate(formattedEvent);
    };


    return (
        <form className="create-event-form" onSubmit={handleSubmit}>
            <h3 className="create-event-form__title">Редагування івенту</h3>

            <input type="text" name="title" placeholder="Назва івенту" onChange={handleChange} required/>
            <textarea name="descriptionSmall" placeholder="Короткий опис" onChange={handleChange} required/>
            <textarea name="descriptionFull" placeholder="Повний опис" onChange={handleChange} required/>
            <input type="text" name="avatarImage" placeholder="URL аватарки" onChange={handleChange} required/>
            <input type="text" name="mainImage" placeholder="URL головного зображення" onChange={handleChange}
                   required/>
            <input type="text" name="videoLink" placeholder="Посилання на відео" onChange={handleChange}/>
            <input type="number" name="maximumParticipants" placeholder="Максимальна кількість учасників"
                   onChange={handleChange} required/>
            <input type="datetime-local" name="dateOfStartEvent" placeholder="Дата початку" onChange={handleChange}
                   required title="Дата та час початку події" aria-label="Дата та час початку події"/>
            <input type="number" name="price" placeholder="Ціна (грн)" onChange={handleChange} required/>
            <select name="city" className="events__filter" value={eventData.city} onChange={handleChange}>
                <option value="">Оберіть місто</option>
                <option value="Kyiv">Київ</option>
                <option value="Odesa">Одеса</option>
            </select>
            <input type="datetime-local" name="registrationAvailableUntil" placeholder="Дата закриття реєстрації"
                   onChange={handleChange} required title="Дата закриття реєстрації"
                   aria-label="Дата закриття реєстрації"/>

            <button
                type="submit"
                className="create-event-form__button"
            >Відредагувати івент
            </button>
        </form>
    );
};

export default UpdateEventForm;
