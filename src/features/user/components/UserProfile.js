import React, {useEffect, useState} from "react";
import {findUsersProfile, checkIsAdmin, checkIsOrganizer, addRoleToUser} from "../services/userService";
import {useNavigate} from "react-router-dom";
import "../styles/styles.scss"
import {createEvent, deleteEventById} from "../../event/services/eventSerivce";
import CreateEventForm from "../../event/components/CreateEventForm";

const UserProfile = () => {
    const [error, setError] = useState(null);
    const [user, setUser] = useState();
    const [isOrganizerField, setIsOrganizerField] = useState(false);
    const [isAdminField, setIsAdminField] = useState(false);
    const [eventId, setEventId] = useState("");
    const [addRoleUserId, setAddRoleUserId] = useState("");
    const [addRoleField, setAddRoleField] = useState("");
    const [isOpenCreateEventForm, setIsOpenCreateEventForm] = useState(false);

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

    const handleAddRoleToUser = async (userId, role) => {
        if (!userId) {
            alert("Будь ласка, введіть ID користувача");
            return;
        }

        if (!role) {
            alert("Будь ласка, виберіть поле для ролі");
            return;
        }

        const addRoleData = {
            userId: Number(userId),
            role: role.toUpperCase()
        };

        try {
            var result = await addRoleToUser(addRoleData);
            if (result) {
                alert('Роль успішно додана')
            }
            setEventId("");
        } catch (error) {
            alert(`Помилка додавання ролі: ${error.message}`);
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
                <p className="user-profile__created-at">📅 Профіль
                    створено: {new Date(user.createdAt).toLocaleDateString()}</p>
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

                {isOrganizerField && (
                    <button className="user-profile__button" onClick={() => navigate(`/events/author/${user.id}`)}>
                        🎟 Перейти до подій організатора
                    </button>
                )}


                <div>
                    {isOrganizerField && (
                        <div>
                            <button
                                className="user-profile__button"
                                onClick={() => setIsOpenCreateEventForm(!isOpenCreateEventForm)}
                            >
                                {isOpenCreateEventForm ? "❌ Закрити форму" : "➕ Створити івент"}
                            </button>

                            {isOpenCreateEventForm && isOrganizerField && (
                                <CreateEventForm onCreate={async (eventData) => {
                                    console.log("Відправка на сервер:", eventData);
                                    try {
                                        const newEvent = await createEvent(eventData);
                                        alert("Івент створено успішно!");
                                        setIsOpenCreateEventForm(false);
                                    } catch (error) {
                                        alert("Помилка при створенні івенту!");
                                    }
                                }}/>
                            )}
                        </div>
                    )}
                </div>
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

            {isAdminField && (
                <div className="add-to-user-role-form">
                    <label htmlFor="userId" className="add-to-user-role-form__userid-field">
                        Введіть ID користувача для видачі ролі:
                    </label>
                    <input
                        type="number"
                        id="userId"
                        className="add-to-user-role-form__input"
                        value={addRoleUserId}
                        onChange={(e) => setAddRoleUserId(e.target.value)}
                        placeholder="ID користувача"
                    />
                    <select className="add-to-user-role-form__role-field"
                    onChange={(e) => setAddRoleField(e.target.value)}>
                        <option value="">Оберіть роль</option>
                        <option value="ROLE_ORGANIZER">Організатор</option>
                        <option value="ROLE_ADMIN">Адміністратор</option>
                    </select>

                    <button
                        className="add-to-user-role-form__button"
                        onClick={() => handleAddRoleToUser(addRoleUserId, addRoleField)}
                    >
                        Додати роль
                    </button>
                </div>
            )}

        </section>
    );
}

export default UserProfile;
