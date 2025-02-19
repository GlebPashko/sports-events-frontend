import React, {useEffect} from 'react';
import '../styles/liq-pay-button.scss'

const LiqPayButton = ({data, signature}) => {
    useEffect(() => {
        const script = document.createElement('script');
        script.src = "https://static.liqpay.ua/libjs/sdk_button.js";
        script.async = true;
        document.body.appendChild(script);

        return () => {
            document.body.removeChild(script);
        };
    }, []);

    const handleSubmit = (e) => {
        e.preventDefault();
        e.target.submit(); // Програмно відправляє форму
    };

    return (
        <form
            method="post"
            action="https://www.liqpay.ua/api/3/checkout"
            acceptCharset="utf-8"
            target="_blank"
            onSubmit={handleSubmit}
        >
            <input type="hidden" name="data" value={data}/>
            <input type="hidden" name="signature" value={signature}/>
            <button
                type="submit"
                className="liqpay-button"

            >
                Перейти на сторінку оплати
            </button>
        </form>
    )
    ;
};

export default LiqPayButton;
