import React, {useState} from 'react';
import {registerUser} from '../services/authenticationService';
import {useNavigate} from 'react-router-dom';
import "../styles/registration/style.scss";

const Registration = () => {
    const navigate = useNavigate();
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [repeatPassword, setRepeatPassword] = useState('');
    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [city, setCity] = useState('');
    const [sex, setSex] = useState('');
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const [successMessage, setSuccessMessage] = useState(null);

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        setError(null);
        setSuccessMessage(null);

        if (password !== repeatPassword) {
            setError("Паролі не співпадають");
            setLoading(false);
            return;
        }

        try {
            const result = await registerUser(email, password, repeatPassword, firstName, lastName, city, sex);

            if (!result) {
                throw new Error("Не вдалося зареєструватися. Перевірте дані та спробуйте знову.");
            }

            setSuccessMessage("Реєстрація пройшла успішно! Тепер ви можете увійти.");
            setTimeout(() => (window.location.href = '/login'), 2000); // Переадресація після успіху
        } catch (error) {
            setError(error.message);
        } finally {
            setLoading(false);
        }
    };

    return (
        <section className="register__section">
            <div className="container">
                <div className="register__wrapper">
                    <div className="register__wrapper__sign-up-element">
                        <h2 className="sign_up-element__title">Зареєструватися на платформі</h2>
                        <div className="sign_up-element__text">Використай свою пошту та пароль для авторизації</div>
                        <form className="sign_up-element__register-form" onSubmit={handleSubmit}>
                            <div className="input-group">
                                <label htmlFor="email">Пошта</label>
                                <input
                                    type="email"
                                    id="email"
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                    required
                                    placeholder="Введіть вашу пошту"
                                    className="full-width"
                                />
                            </div>

                            <div className="input-group">
                                <label htmlFor="password">Пароль</label>
                                <input
                                    type="password"
                                    id="password"
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                    required
                                    placeholder="Введіть пароль"
                                />
                            </div>

                            <div className="input-group">
                                <label htmlFor="repeatPassword">Повторіть пароль</label>
                                <input
                                    type="password"
                                    id="repeatPassword"
                                    value={repeatPassword}
                                    onChange={(e) => setRepeatPassword(e.target.value)}
                                    required
                                    placeholder="Повторіть пароль"
                                />
                            </div>

                            <div className="input-group">
                                <label htmlFor="firstName">Ім'я</label>
                                <input
                                    type="text"
                                    id="firstName"
                                    value={firstName}
                                    onChange={(e) => setFirstName(e.target.value)}
                                    required
                                    placeholder="Введіть ім'я"
                                />
                            </div>

                            <div className="input-group">
                                <label htmlFor="lastName">Прізвище</label>
                                <input
                                    type="text"
                                    id="lastName"
                                    value={lastName}
                                    onChange={(e) => setLastName(e.target.value)}
                                    required
                                    placeholder="Введіть прізвище"
                                />
                            </div>

                            <div className="input-group">
                                <label htmlFor="city">Місто</label>
                                <select id="city" value={city} onChange={(e) => setCity(e.target.value)} required>
                                    <option value="" disabled>Оберіть місто</option>
                                    <option value="Kyiv">Київ</option>
                                    <option value="Odesa">Одеса</option>
                                </select>
                            </div>

                            <div className="input-group">
                                <label htmlFor="sex">Стать</label>
                                <select id="sex" value={sex} onChange={(e) => setSex(e.target.value)} required>
                                    <option value="" disabled>Оберіть стать</option>
                                    <option value="MALE">Чоловік</option>
                                    <option value="FEMALE">Жінка</option>
                                </select>
                            </div>

                            <button type="submit" disabled={loading}>
                                {loading ? 'Завантаження...' : 'Зареєструватися'}
                            </button>
                        </form>
                        <a href="/" className="sign_in-element__backToMain">Повернутися на головну</a>
                        {error && <p className="error-message">{error}</p>}
                        {successMessage && <p className="success-message">{successMessage}</p>}
                    </div>

                    {/* Блок авторизації */}
                    <div className="register__wrapper__sign-in-element">
                        <h2 className="sign-in-element__title">Ласкаво просимо!</h2>
                        <div className="sign-in-element__text">Якщо ти вже маєш акаунт, пропонуємо авторизуватися</div>
                        <button className="sign-in-element__login-button" onClick={() => navigate('/login')}>
                            Авторизуватися
                        </button>
                    </div>
                </div>
            </div>
        </section>
    )
        ;
};

export default Registration;
