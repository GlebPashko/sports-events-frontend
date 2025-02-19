import {useEffect, useState} from "react";
import {findAllEvents, findEventById} from "../services/eventSerivce";
import {useParams} from "react-router-dom";
import AddToCartButton from "../../../components/addToCartButton/components/addToCartButton";


const Event = () => {
    const { eventId } = useParams();
    const [error, setError] = useState(null);
    const [event, setEvent] = useState();


    useEffect(() => {
        const loadEvent = async () => {
            try {

                const result = await findEventById(eventId);
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
                    <AddToCartButton eventId={event.id} />
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
        </section>
    );

}

export default Event;
