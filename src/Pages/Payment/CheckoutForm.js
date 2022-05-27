import { CardElement, useElements, useStripe } from '@stripe/react-stripe-js';
import React, { useState, useEffect } from 'react';

const CheckoutForm = ({ selectedOrder }) => {
    const stripe = useStripe();
    const elements = useElements();
    const [cardError, setCardError] = useState('');
    const [clientSecret, setClientSecret] = useState('');
    const [success, setSuccess] = useState('');
    const [transactionId, setTransactionId] = useState('');
    const { _id, totalPrice: price, userEmail, userName } = selectedOrder || {};
    const totalPrice = parseInt(price);


    useEffect(() => {
        totalPrice && fetch('http://localhost:5000/create-payment-intents', {
            method: 'POST',
            headers: {
                'content-type': 'application/json'
            },
            body: JSON.stringify({ totalPrice })
        })
            .then(res => res.json())
            .then(data => {
                if (data?.clientSecret) {
                    setClientSecret(data.clientSecret);
                }
            });
    }, [totalPrice]);


    const handleSubmit = async (event) => {
        event.preventDefault();
        if (!stripe || !elements) {
            return;
        }

        const card = elements.getElement(CardElement);
        if (card == null) {
            return;
        }
        const { error, paymentMethod } = await stripe.createPaymentMethod({
            type: 'card',
            card
        });

        setCardError(error?.message || '');
        setSuccess('');
        const { paymentIntent, error: intentError } = await stripe.confirmCardPayment(
            clientSecret,
            {
                payment_method: {
                    card: card,
                    billing_details: {
                        name: userName,
                        email: userEmail
                    },
                },
            },
        );
        if (intentError) {
            setCardError(intentError.message);
            setSuccess('');
        }
        else {
            setCardError('');
            fetch(`http://localhost:5000/orders/${_id}`, {
                method: "PUT",
                headers: {
                    'content-type': 'application/json'
                },
                body: JSON.stringify({ paid: true })
            })
                .then(res => res.json())
                .then(data => {
                    console.log(data);
                    setSuccess('Payment successful!');
                    setTransactionId(paymentIntent.id);
                });
        }
    }

    return (
        <form onSubmit={handleSubmit}>
            <CardElement
                options={{
                    style: {
                        base: {
                            fontSize: '16px',
                            color: '#424770',
                            '::placeholder': {
                                color: '#aab7c4',
                            },
                        },
                        invalid: {
                            color: '#9e2146',
                        },
                    },
                }}
            />
            <button type="submit" className='btn btn-secondary mt-4 mx-auto d-block w-50' disabled={!stripe || !clientSecret}>
                Pay
            </button>
            {cardError && <p className="text-danger mt-2 mb-0">{cardError}</p>}
            {success &&
                <p className="text-success mt-2 mb-0">{success} <br />
                    Your transaction Id is {transactionId}
                </p>}
        </form>
    );
};
export default CheckoutForm;