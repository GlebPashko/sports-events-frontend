import {useEffect, useState} from "react";
import {createEvent, deleteEventById, findAllEvents, findEventById, updateEvent} from "../services/eventSerivce";
import {useNavigate, useParams} from "react-router-dom";
import AddToCartButton from "../../../components/addToCartButton/components/addToCartButton";
import {checkIsAdmin, checkIsOrganizer} from "../../user/services/userService";
import CreateEventForm from "./CreateEventForm";
import UpdateEventForm from "./UpdateEventForm";
import {findAllParticipantForEvent} from "../services/participantService";


const Event = () => {
    const navigate = useNavigate();
    const {eventId} = useParams();
    const [error, setError] = useState(null);
    const [event, setEvent] = useState();
    const [participants, setParticipants] = useState([]);
    const [showParticipants, setShowParticipants] = useState(false);
    const [isOrganizerField, setIsOrganizerField] = useState(false);
    const [isAdminField, setIsAdminField] = useState(false);
    const [isOpenCreateEventForm, setIsOpenCreateEventForm] = useState(false);

    useEffect(() => {
        const loadEvent = async () => {
            try {

                const result = await findEventById(eventId);
                setIsOrganizerField(checkIsOrganizer());
                setIsAdminField(checkIsAdmin());
                setEvent(result);

                if (!result || !result.events) {
                    throw new Error("Дані про івенти відсутні");
                }

            } catch (error) {
                setError(error.message);
            }
        };

        loadEvent();
    }, [eventId]);

    const handleDeleteEvent = async (id) => {
        if (!id) {
            alert("Будь ласка, введіть ID події");
            return;
        }

        const confirmDelete = window.confirm(`Ви впевнені, що хочете видалити подію з ID ${id}?`);
        if (!confirmDelete) return;

        try {
            var result = await deleteEventById(id);
            if (result) {
                alert('Подія успішно видалена')
                navigate("/events");
            }
        } catch (error) {
            alert(`Помилка видалення події: ${error.message}`);
        }
    };

    const handleFindParticipantForEvent = async (id) => {
        try {
            const result = await findAllParticipantForEvent(id);

            setParticipants(result);
            setShowParticipants(true);
        } catch (error) {
            alert(`Помилка отримання списку учасників: ${error.message}`);
        }
    };

    if (!event) {
        return <p>Завантаження...</p>;
    }

    const embedLink = event.videoLink.replace("watch?v=", "embed/");


    return (
        <section className="event">
            <div className="event__wrapper">
                <div className="event__image-block">
                    <img src={event.mainImage} alt={event.title} className="event__main-image"/>
                </div>

                <div className="event__description-block">
                    <h1 className="event__title">{event.title}</h1>
                    <p className="event__small-description">{event.descriptionSmall}</p>
                    <p className="event__date-start">Дата початку: {event.dateOfStartEvent}</p>
                    <p className="event__price">Ціна: {event.price} грн</p>
                    <p className="event__max-participants">Максимальна кількість
                        учасників: {event.maximumParticipants}</p>
                    <p className="event__city">Місто: {event.city}</p>
                    <p className="event__registration-avaliable-until">Реєстрація доступна
                        до: {event.registrationAvailableUntil}</p>
                    <AddToCartButton eventId={event.id}/>
                </div>
            </div>

            <div className="event__descr-title">Детальний опис</div>
            <p className="event__full-description">{event.descriptionFull}</p>
            <p className="event__author">ID автора: {event.authorId}</p>
            <p className="event__registration">Реєстрація доступна до: {event.registrationAvailableUntil}</p>
            <p className="event__created">Створено: {event.createdAt}</p>

            <div className="event__video-title">Відео огляд про івент</div>
            <div className="event__video">
                <iframe
                    width="560"
                    height="315"
                    src={event.videoLink}
                    title="YouTube video player"
                    frameBorder="0"
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                    referrerPolicy="strict-origin-when-cross-origin" allowFullScreen>
                </iframe>
            </div>

            {(isOrganizerField || isAdminField) && (
                <button
                    className="delete-event-form__button"
                    onClick={() => handleDeleteEvent(eventId)}
                >
                    Видалити подію
                </button>
            )}

            {isOrganizerField && (
                <div>
                    <button
                        className="event__update-event-form__button"
                        onClick={() => setIsOpenCreateEventForm(!isOpenCreateEventForm)}
                    >
                        {isOpenCreateEventForm ? "❌ Закрити форму" : "➕ Відредагувати івент"}
                    </button>

                    {isOpenCreateEventForm && isOrganizerField && (
                        <UpdateEventForm onCreate={async (eventData) => {
                            console.log("Відправка на сервер:", eventData);
                            try {
                                const newEvent = await updateEvent(eventData, eventId);
                                alert("Івент відредаговано успішно!");
                                navigate(0);
                                setIsOpenCreateEventForm(false);
                            } catch (error) {
                                alert("Помилка при редагувані івенту!");
                            }
                        }}/>
                    )}
                </div>
            )}

            {(isOrganizerField || isAdminField) && (
                <>
                    <button
                        className="event__update-event-form__button"
                        onClick={() => handleFindParticipantForEvent(eventId)}
                    >
                        Переглянути список відвідувачів
                    </button>

                    {showParticipants && (
                        <div className="participants-list">
                            <h3>Список учасників</h3>

                            {participants.length === 0 ? (
                                <p>Немає зареєстрованих учасників</p>
                            ) : (
                                <ul>
                                    {participants.map((participant) => (
                                        <li key={participant.id}>
                                            <div>Ім'я: {participant.userFirstName}</div>
                                            <div>Фамілія: {participant.userLastName}</div>
                                            <div>Пошта: {participant.userEmail}</div>
                                            <div>Кількість куплених місць: {participant.quantity}</div>
                                            <div>------------------</div>
                                        </li>
                                    ))}
                                </ul>
                            )}

                            <button className="delete-event-form__button" onClick={() => setShowParticipants(false)}>Закрити</button>
                        </div>
                    )}
                </>
            )}


        </section>
    );

}

export default Event;
