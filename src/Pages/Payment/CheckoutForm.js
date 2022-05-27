import { CardElement, useElements, useStripe } from '@stripe/react-stripe-js';
import React, { useState, useEffect } from 'react';

const CheckoutForm = ({ totalPrice }) => {
    const stripe = useStripe();
    const elements = useElements();
    const [cardError, setCardError] = useState('');
    const [clientSecret, setClientSecret] = useState('');
    console.log(totalPrice);


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
                    console.log(data);

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
        </form>
    );
};

export default CheckoutForm;