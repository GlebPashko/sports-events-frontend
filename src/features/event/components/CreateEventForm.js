import React, { useState } from "react";
import {findAllCategories} from "../../../components/categoriesSection/services/categories-sectionService";
import {value} from "lodash/seq";

const CreateEventForm = ({ onCreate }) => {
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
        categoryIds: "",
    });

    const [selectedCategories, setSelectedCategories] = useState([]);
    const [isOpen, setIsOpen] = useState(false);
    const [categories, setCategories] = useState([]);
    const [formData, setFormData] = useState({
        city: "",
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setEventData((prev) => ({
            ...prev,
            [name]: value,
        }));
    };

    const handleCheckboxChange = (event) => {
        const { value, checked } = event.target;

        setSelectedCategories(prevCategories =>
            checked
                ? [...prevCategories, parseInt(value, 10)]
                : prevCategories.filter(id => id !== parseInt(value, 10))
        );
    };

    const handleSubmit = (e) => {
        e.preventDefault();

        const formattedEvent = {
            ...eventData,
            maximumParticipants: parseInt(eventData.maximumParticipants, 10),
            price: parseFloat(eventData.price),
            categoryIds: selectedCategories,
            dateOfStartEvent: `${eventData.dateOfStartEvent}:00`,
            registrationAvailableUntil: `${eventData.registrationAvailableUntil}:00`,
        };

        onCreate(formattedEvent);
    };

    const getCategories = async () => {
        try {
            const result = await findAllCategories();
            setCategories(result);
        } catch (error) {
            console.error("Помилка отримання категорій:", error);
        }
    };

    const handleDropdownClick = async () => {
        try {
            const result = await findAllCategories();
            setCategories(result);
            setIsOpen(!isOpen);
        } catch (error) {
            console.error("Помилка отримання категорій:", error);
        }
    };

    return (
        <form className="create-event-form" onSubmit={handleSubmit}>
            <h3 className="create-event-form__title">Створення нового івенту</h3>

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
            <select name="city" className="events__filter" value={formData.city} onChange={handleChange}>
                <option value="">Оберіть місто</option>
                <option value="Kyiv">Київ</option>
                <option value="Odesa">Одеса</option>
            </select>
            <input type="datetime-local" name="registrationAvailableUntil" placeholder="Дата закриття реєстрації"
                   onChange={handleChange} required title="Дата закриття реєстрації"
                   aria-label="Дата закриття реєстрації"/>


            <div className="category-dropdown">
                <button type="button" className="dropdown-button" onClick={handleDropdownClick}>
                    Оберіть категорії ▾
                </button>

                {isOpen && (
                    <div className="dropdown-menu">
                        {categories.map((category) => (
                            <label key={category.id} className="dropdown-item">
                                <input required
                                       type="checkbox"
                                       value={category.id}
                                       checked={selectedCategories.includes(category.id)}
                                       onChange={handleCheckboxChange}
                                />
                                {category.name}
                            </label>
                        ))}
                    </div>
                )}
            </div>


            <button
                type="submit"
                className="create-event-form__button"
                disabled={selectedCategories.length === 0}
            >Створити івент
            </button>
        </form>
    );
};

export default CreateEventForm;
