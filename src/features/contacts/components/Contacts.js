import "../styles/style.scss"

const Contacts = () => {
    return (
        <div className="contacts-container">
            <h1 className="contacts-title">Контакти</h1>

            <div className="contacts-list">
                <div className="contact-item">
                    <p className="contact-heading">Адреса:</p>
                    <p>м. Одеса, вул. Єврейська, 18</p>
                </div>
                <div className="contact-item">
                    <p className="contact-heading">Телефон:</p>
                    <p><a href="tel:+380981234567" className="contact-link">+38 (098) 123-45-67</a></p>
                </div>
                <div className="contact-item">
                    <p className="contact-heading">Email:</p>
                    <p><a href="mailto:contact@example.com" className="contact-link">event@gmail.com</a></p>
                </div>
            </div>
        </div>
    );
}

export default Contacts;
