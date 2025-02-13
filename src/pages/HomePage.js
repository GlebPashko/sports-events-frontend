import Menu from '../components/menu/components/Menu';
import MainBanner from "../../src/features/homePage/components/MainBanner";
import NewsFeedSection from "../../src/features/homePage/components/NewsFeedSection";
import Footer from "../components/footer/components/Footer";
import CategoriesSection from "../features/homePage/components/CategoriesSection";

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
