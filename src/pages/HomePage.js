import Menu from '../components/menu/components/Menu';
import MainBanner from "../../src/features/homePage/components/MainBanner";
import CategoriesSection from "../../src/features/homePage/components/CategoriesSection";
import NewsFeedSection from "../../src/features/homePage/components/NewsFeedSection";
import Footer from "../components/footer/components/Footer";

const HomePage = () => {
    return (
        <div>
            <Menu />
            <MainBanner />
            <CategoriesSection />
            <NewsFeedSection />
            <Footer />
        </div>
    );
};

export default HomePage;
