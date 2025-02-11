import { useState } from 'react';
import { registerUser } from '../../../services/authService'; // Імпортуй метод реєстрації

const Register = () => {
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
                <h1 className="register__title">Реєстрація</h1>
                <form className="register__form" onSubmit={handleSubmit}>
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

                    <label htmlFor="repeatPassword">Повторіть пароль</label>
                    <input
                        type="password"
                        id="repeatPassword"
                        value={repeatPassword}
                        onChange={(e) => setRepeatPassword(e.target.value)}
                        required
                    />

                    <label htmlFor="firstName">Ім'я</label>
                    <input
                        type="text"
                        id="firstName"
                        value={firstName}
                        onChange={(e) => setFirstName(e.target.value)}
                        required
                    />

                    <label htmlFor="lastName">Прізвище</label>
                    <input
                        type="text"
                        id="lastName"
                        value={lastName}
                        onChange={(e) => setLastName(e.target.value)}
                        required
                    />

                    <label htmlFor="city">Місто</label>
                    <input
                        type="text"
                        id="city"
                        value={city}
                        onChange={(e) => setCity(e.target.value)}
                        required
                    />

                    <label htmlFor="sex">Стать</label>
                    <select id="sex" value={sex} onChange={(e) => setSex(e.target.value)} required>
                        <option value="" disabled>Оберіть стать</option>
                        <option value="male">Чоловік</option>
                        <option value="female">Жінка</option>
                    </select>

                    <button type="submit" disabled={loading}>
                        {loading ? 'Завантаження...' : 'Зареєструватися'}
                    </button>
                </form>

                {error && <p className="error-message">{error}</p>}
                {successMessage && <p className="success-message">{successMessage}</p>}

                <a href="/login" className="register__backToLogin">Вже маєте акаунт? Увійдіть</a>
            </div>
        </section>
    );
};

export default Register;
