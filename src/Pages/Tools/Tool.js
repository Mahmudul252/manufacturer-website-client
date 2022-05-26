import React from 'react';
import { Card } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import './Tool.css';

const Tool = ({ showTool }) => {
    const { _id, img, name, description, minimumOrderQuantity, availableQuantity, unitPrice } = showTool;
    return (
        <Card className='col col-lg-4 col-12 shadow-lg border-0 card-width'>
            <Card.Img className='rounded-3 shadow-lg mt-2 tool-image' variant="top" src={img} />
            <Card.Body>
                <Card.Title className='fw-bold'>{name}</Card.Title>
                <Card.Text>{description}</Card.Text>
                <div className="fw-bold">
                    <p className='m-0'>Minimum Order Quantity: {minimumOrderQuantity}</p>
                    <p className='m-0'>Available Quantity: {availableQuantity}</p>
                    <p className='m-0'>Unit Price: {unitPrice}</p>
                </div>
            </Card.Body>
            <Card.Footer className='border-0 bg-white'>
                <Link to='/placeOrder' state={{ _id }} className="btn btn-secondary w-100 mb-2">Buy Now</Link>
            </Card.Footer>
        </Card>
    );
};

export default Tool;