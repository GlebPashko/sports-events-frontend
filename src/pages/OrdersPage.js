import Menu from "../components/menu/components/Menu";
import Footer from "../components/footer/components/Footer";
import Events from "../features/event/components/Events";
import Orders from "../features/cart/components/Order";

const OrdersPage = () => {
    return (
        <div>
            <Menu />
            <Orders />
            <Footer />
        </div>
    );
};

export default OrdersPage;