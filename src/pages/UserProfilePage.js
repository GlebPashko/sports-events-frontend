import Menu from "../components/menu/components/Menu";
import Footer from "../components/footer/components/Footer";
import UserProfile from "../features/user/components/UserProfile";


const UserProfilePage = () => {
    return (
        <div>
            <Menu />
            <UserProfile />
            <Footer />
        </div>
    );
};

export default UserProfilePage;