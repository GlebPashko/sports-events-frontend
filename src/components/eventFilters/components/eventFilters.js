import React from 'react';

const EventFilters = ({ setTitle, setStartDate, setEndDate, setCity, setAuthor, setOnlyAvailable }) => {
    return (
        <div className="events__filters">
            <input
                type="text"
                placeholder="Пошук за назвою..."
                className="events__search"
                onChange={(e) => setTitle(e.target.value)}
            />
            <input
                type="date"
                className="events__filter"
                onChange={(e) => setStartDate(e.target.value)}
            />
            <input
                type="date"
                className="events__filter"
                onChange={(e) => setEndDate(e.target.value)}
            />
            <select className="events__filter" onChange={(e) => setCity(e.target.value)}>
                <option value="">Оберіть місто</option>
                <option value="Kyiv">Київ</option>
                <option value="Odesa">Одеса</option>
            </select>
            <select className="events__filter" onChange={(e) => setOnlyAvailable(e.target.value)}>
                <option value="true">Тільки доступні</option>
                <option value="false">Всі</option>
            </select>
        </div>
    );
};

export default EventFilters;
