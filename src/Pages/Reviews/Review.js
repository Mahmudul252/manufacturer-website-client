import React from 'react';
import { Card } from 'react-bootstrap';
import './Reviews.css';

const Review = ({ review: reviewCollections }) => {
    const { name, img, review } = reviewCollections;
    return (
        <Card className='col col-12 col-lg-4 review shadow-lg border-0'>
            <img className='review-img mx-auto mt-3' src={img} alt="" />
            <Card.Body className='text-center'>
                <Card.Title className='fw-bold'> {name} </Card.Title>
                <Card.Text>{review}</Card.Text>
            </Card.Body>
        </Card>
    );
};

export default Review;