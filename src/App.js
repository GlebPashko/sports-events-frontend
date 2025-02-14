import {BrowserRouter as Router, Routes, Route} from 'react-router-dom';
import HomePage from './pages/HomePage';
import LoginPage from './pages/LoginPage';
import RegistrationPage from './pages/RegistrationPage';
import EventsPage from "./pages/EventsPage";
import CategoryEventPage from "./pages/CategoryEventPage";
import EventPage from "./pages/EventPage";

function App() {
    return (
        <Router>
            <Routes>
                <Route path="/" element={<HomePage/>}/>
                <Route path="/events" element={<EventsPage/>}/>
                <Route path="/events/:eventId" element={<EventPage/>}/>
                <Route path="/categories/:categoryId/events/search" element={<CategoryEventPage/>}/>
                <Route path="/login" element={<LoginPage/>}/>
                <Route path="/registration" element={<RegistrationPage/>}/>
            </Routes>
        </Router>
    );
}

export default App;
