import React, { useState } from 'react';
import { useAuthState } from 'react-firebase-hooks/auth';
import { Link, useLocation } from 'react-router-dom';
import { toast } from 'react-toastify';
import auth from '../../firebase.init';
import useTools from '../../hooks/useTools';
import './PlaceOrder.css';

const PlaceOrder = () => {
    const location = useLocation();
    const id = location?.state?._id;
    const [tools, loading] = useTools();
    const [errorMessage, setErrorMessage] = useState('');
    const [user] = useAuthState(auth);
    const [orderPlaced, setOrderPlaced] = useState(false);

    if (loading) {
        return;
    }
    const selectedTool = tools?.find(tool => tool._id === id);
    const { _id, name, minimumOrderQuantity, availableQuantity, unitPrice } = selectedTool || {};

    const handlePurchaseOrder = event => {
        event.preventDefault();
        const quantity = event.target.quantity.value;
        const phone = event.target.phone.value;
        const address = event.target.address.value;

        if (parseInt(quantity) < parseInt(minimumOrderQuantity)) {
            setErrorMessage(`Minimum order quantity is ${minimumOrderQuantity}`);
        }
        else if (parseInt(quantity) > parseInt(availableQuantity)) {
            setErrorMessage(`Sorry! Available tools are ${availableQuantity}`);
        }
        else if (phone.length !== 11) {
            setErrorMessage('Phone number must be 11 digits.')
        }
        else {
            setErrorMessage('');
            const order = { toolName: name, userName: user.displayName, userEmail: user.email, phone, orderId: _id, orderQuantity: quantity, address, totalPrice: JSON.stringify(quantity * unitPrice) };

            fetch('http://localhost:5000/orders', {
                method: "POST",
                headers: {
                    'content-type': 'application/json'
                },
                body: JSON.stringify(order)
            })
                .then(res => res.json())
                .then(() => {
                    setOrderPlaced(true);
                    toast.success('Order Placed Successfully!');
                    event.target.reset();
                })
        }
    }
    return (
        <div className='w-50 mx-auto my-5 py-2'>
            <h2 className='text-center display-6'>Place order for {name}</h2>
            <p className="text-center mb-2">
                <small className="me-3 text-center">Minimum Order Quantity: {minimumOrderQuantity}</small>
                <small className="me-3 text-center">Available Quantity: {availableQuantity}</small>
                <small className="m-0 text-center">Unit Price: ${unitPrice}</small>
            </p>

            <form onSubmit={handlePurchaseOrder}>
                <div className="mb-3">
                    <label htmlFor="name" className="form-label">Name</label>
                    <input type="text" className="form-control" id="name" aria-describedby="nameHelp" defaultValue={`${user.displayName}`} readOnly disabled />
                </div>
                <div className="mb-3">
                    <label htmlFor="email" className="form-label">Email address</label>
                    <input type="email" className="form-control" id="email" aria-describedby="emailHelp" defaultValue={`${user.email}`} readOnly disabled />
                </div>
                <div className="mb-3">
                    <label htmlFor="quantity" className="form-label">Order Quantity</label>
                    <input type="number" name="quantity" className="form-control" id="quantity" aria-describedby="quantityHelp" placeholder='Please Enter Quantity' onFocus={() => setErrorMessage('')} onWheel={event => event.target.blur()} defaultValue={minimumOrderQuantity} required />

                </div>
                <div className="mb-3">
                    <label htmlFor="phone" className="form-label">Phone Number</label>
                    <input type="number" name="phone" className="form-control" id="phone" aria-describedby="phoneHelp" placeholder='Please Enter Phone Number' onFocus={() => setErrorMessage('')} onWheel={event => event.target.blur()} required />
                </div>
                <div className="mb-3">
                    <label htmlFor="address" className="form-label">Address</label>
                    <input type="text" name="address" className="form-control" id="address" aria-describedby="addressHelp" placeholder='Please Enter Address' required />
                </div>
                {errorMessage && <p className="text-danger">{errorMessage}</p>}
                {orderPlaced && <p>Your order is placed successfully. <Link to='/dashboard/myOrders' className='text-decoration-none'>See your orders</Link></p>}
                <input className='btn btn-secondary d-block w-50 mx-auto mt-2' type="submit" value='PlaceOrder' disabled={errorMessage} />
            </form>
        </div>
    );
};

export default PlaceOrder;