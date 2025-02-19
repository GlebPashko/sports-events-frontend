import React, { useEffect, useState } from 'react';
import { doPayment } from '../services/paymentService';
import LiqPayButton from "../../../components/LiqPayButton/components/LiqPayButton";

const Payment = ({ orderStatus, orderID, paymentMethod }) => {
    const [paymentData, setPaymentData] = useState(null);
    const [dataInput, setDataInput] = useState(null);
    const [signatureInput, setSignatureInput] = useState(null);

    useEffect(() => {
        const loadData = async () => {
            const result = await doPayment(orderID, paymentMethod);
            if (result && result.htmlForm) {
                const parser = new DOMParser();
                const doc = parser.parseFromString(result.htmlForm, 'text/html');
                const dataInput = doc.querySelector('input[name="data"]')?.value;
                const signatureInput = doc.querySelector('input[name="signature"]')?.value;

                setSignatureInput(signatureInput);
                setDataInput(dataInput)


                setPaymentData(result.htmlForm);
            }
        };
        loadData();
    }, [orderID, paymentMethod]);

    return (
        <LiqPayButton
            data={dataInput}
            signature={signatureInput}
        />
    );
};

export default Payment;
