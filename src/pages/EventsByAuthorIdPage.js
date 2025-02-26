import Menu from "../components/menu/components/Menu";
import Footer from "../components/footer/components/Footer";
import EventsByAuthorId from "../features/event/components/EventsByAuthorId";

const EventsByAuthorIdPage = () => {
    return (
        <div>
            <Menu />
            <EventsByAuthorId />
            <Footer />
        </div>
    );
};

export default EventsByAuthorIdPage;