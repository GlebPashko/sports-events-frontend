import React, {useState} from 'react';
import "../styles/style.scss";
import {loginUser} from '../services/authenticationService';
import {useNavigate} from 'react-router-dom';

const Login = () => {
    const navigate = useNavigate();
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [result, setResult] = useState(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        setError(null);

        try {
            const result = await loginUser(email, password);

            if (!result || !result.token) {
                throw new Error(result?.message || "Невірний логін або пароль");
            }

            setResult(result);
            window.location.href = '/';
        } catch (error) {
            setError(error.message);
        } finally {
            setLoading(false);
        }
    };

    return (
        <section className="login__section">
            <div className="container">
                <div className="login__wrapper">
                    <div className="login__wrapper__sign_up-element">
                        <h2 className="sign_up-element__title">Привіт, Друже!</h2>
                        <div className="sign_up-element__text">Якщо ти не маєш акаунту, пропунуємо тобі пройти
                            реєстрацію
                        </div>
                        <button className="sign_up-element__reg-button" onClick={() => navigate('/registration')}>
                            Зареєструватися
                        </button>
                    </div>

                    <div className="login__wrapper__sign_in-element">
                        <h2 className="sign_in-element__title">Увійти до платформи</h2>
                        <div className="sign_in-element__text">Використай свою пошту та пароль для авторизації</div>
                        <form id="sign_in-element__form" className="sign_in-element__login-form"
                              onSubmit={handleSubmit}>
                            <label htmlFor="email">Пошта</label>
                            <input
                                type="email"
                                id="email"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                required
                            />
                            <label htmlFor="password">Пароль</label>
                            <input
                                type="password"
                                id="password"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                required
                            />
                            <button type="submit" disabled={loading}>
                                {loading ? 'Завантаження...' : 'Увійти'}
                            </button>
                            <a href="/" className="sign_in-element__backToMain">Повернутися на головну</a>
                        </form>
                        {error && <p className="error-message">{error}</p>}
                    </div>
                </div>
            </div>
        </section>
    );
};

export default Login;
