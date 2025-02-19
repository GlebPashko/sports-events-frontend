import Menu from "../components/menu/components/Menu";
import Footer from "../components/footer/components/Footer";
import ShoppingCart from "../features/cart/components/ShoppingCart";

const ShoppingCartPage = () => {
    return (
        <div>
            <Menu />
            <ShoppingCart />
            <Footer />
        </div>
    );
};

export default ShoppingCartPage;