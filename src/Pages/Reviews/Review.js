import { faStar } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React from 'react';
import { Card } from 'react-bootstrap';
import './Reviews.css';

const Review = ({ review: reviewCollections }) => {
    const { name, img, review, ratings } = reviewCollections;
    const ratingsArray = [];
    for (let i = 0; i < parseInt(ratings); i++) {
        ratingsArray.push(i);
    }
    return (
        <Card className='col col-12 col-lg-4 review shadow-lg border-0'>
            <img className='review-img mx-auto mt-3' src={img} alt="" />
            <Card.Body className='text-center'>
                <Card.Title className='fw-bold'> {name} </Card.Title>
                <Card.Text className='my-0'><span className='fw-bold me-2'>Ratings:</span>
                    {
                        ratingsArray.map(ratings => <FontAwesomeIcon
                            icon={faStar}
                            className="text-warning"
                            key={ratings}
                        />)
                    }
                </Card.Text>
                <Card.Text>{review}</Card.Text>
            </Card.Body>
        </Card>
    );
};

export default Review;