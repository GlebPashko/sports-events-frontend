import Menu from "../components/menu/components/Menu";
import Events from "../features/event/components/Events";
import Footer from "../components/footer/components/Footer";
import EventsPage from "./EventsPage";
import CategoryEvents from "../features/event/components/CategoryEvents";

const CategoryEventsPage = () => {
    return (
        <div>
            <Menu />
            <CategoryEvents />
            <Footer />
        </div>
    );
};

export default CategoryEventsPage;