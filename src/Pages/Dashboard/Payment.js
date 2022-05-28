import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import useOrders from '../../hooks/useOrders';
import PageTitle from '../Shared/PageTitle';
import Loading from '../Shared/Loading';
import { loadStripe } from '@stripe/stripe-js';
import { Elements } from '@stripe/react-stripe-js';
import CheckoutForm from './CheckoutForm';
import { Card } from 'react-bootstrap';
const stripePromise = loadStripe('pk_test_51L3z12JzKn1BnjhVzNJvduL4W9lRoylg9iAloXlxIipVZreTd5tWWoRixusez42kPDPq86wfuc7z3dJlgOoS9pYc000Ubxf0PP');

const Payment = () => {
    const { id } = useParams();
    const [orders, loading] = useOrders();
    const [selectedOrder, setSelectedOrder] = useState({});

    useEffect(() => {
        setSelectedOrder(orders.find(order => order._id === id));
    }, [id, orders]);

    if (loading) {
        return <Loading />
    }
    const { toolName, totalPrice } = selectedOrder || {};

    return (
        <div className='w-50 mx-auto'>
            <PageTitle title="Payment" />
            <Card>
                <Card.Body>
                    <Card.Title className='mt-3'>Please Pay for <i>{toolName}</i></Card.Title>
                    <p className="mb-3">Payable amount: ${totalPrice}</p>
                    <Elements stripe={stripePromise}>
                        <CheckoutForm selectedOrder={selectedOrder} />
                    </Elements>
                </Card.Body>
            </Card>
        </div>
    );
};

export default Payment;