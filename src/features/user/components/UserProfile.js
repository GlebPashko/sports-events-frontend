import {useEffect, useState} from "react";
import {findUsersProfile, checkIsAdmin, checkIsOrganizer} from "../services/userService";
import {useNavigate} from "react-router-dom";
import "../styles/styles.scss"
import {deleteEventById} from "../../event/services/eventSerivce";

const UserProfile = () => {
    const [error, setError] = useState(null);
    const [user, setUser] = useState();
    const [isOrganizerField, setIsOrganizerField] = useState(false);
    const [isAdminField, setIsAdminField] = useState(false);
    const [eventId, setEventId] = useState("");
    const navigate = useNavigate();

    useEffect(() => {
        const loadEvent = async () => {
            try {

                const result = await findUsersProfile();
                setUser(result);
                setIsOrganizerField(checkIsOrganizer());
                setIsAdminField(checkIsAdmin());

                if (!result || !result.events) {
                    throw new Error("Дані про користувача відсутні");
                }

            } catch (error) {
                setError(error.message);
            }
        };

        loadEvent();
    }, []);

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
            }
            setEventId("");
        } catch (error) {
            alert(`Помилка видалення події: ${error.message}`);
        }
    };

    if (!user) {
        return <p>Завантаження...</p>;
    }

    return (
        <section className="user-profile">
            <h2 className="user-profile__title">Профіль користувача</h2>
            <div className="user-profile__info">
                <p className="user-profile__id">🔹 Унікальний ID: {user.id}</p>
                <p className="user-profile__created-at">📅 Профіль створено: {new Date(user.createdAt).toLocaleDateString()}</p>
                <p className="user-profile__first-name">👤 Ім'я: {user.firstName}</p>
                <p className="user-profile__last-name">📛 Прізвище: {user.lastName}</p>
                <p className="user-profile__city">🌆 Місто: {user.city}</p>
                <p className="user-profile__email">📧 Пошта: {user.email}</p>
            </div>

            <div className="user-profile__actions">
                <button className="user-profile__button" onClick={() => navigate("/events")}>
                    📅 Дивитися події
                </button>
                <button className="user-profile__button" onClick={() => navigate("/cart")}>
                    🛒 Перейти в кошик
                </button>
                <button className="user-profile__button" onClick={() => navigate("/orders")}>
                    🎟 Перейти до квитків
                </button>
            </div>

            {isAdminField && (
                <div className="delete-event-form">
                    <label htmlFor="eventId" className="delete-event-form__label">
                        Введіть ID події для видалення:
                    </label>
                    <input
                        type="number"
                        id="eventId"
                        className="delete-event-form__input"
                        value={eventId}
                        onChange={(e) => setEventId(e.target.value)}
                        placeholder="ID події"
                    />
                    <button
                        className="delete-event-form__button"
                        onClick={() => handleDeleteEvent(eventId)}
                    >
                        Видалити
                    </button>
                </div>
            )}

        </section>
    );
}

export default UserProfile;
