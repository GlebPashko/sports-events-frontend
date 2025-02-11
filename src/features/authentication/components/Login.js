import React, { useState } from 'react';
import "../styles/style.scss";
import { loginUser } from '../services/authenticationService'; // Імпортуємо сервіс

const Login = () => {
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
                <h1 className="login__title">Авторизація користувача</h1>
                <form id="login-form" className="login__form" onSubmit={handleSubmit}>
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
                </form>
                {error && <p className="error-message">{error}</p>}

                <a className="reg__link" href="/register">Не маю акаунту</a>
            </div>
        </section>
    );
};

export default Login;
