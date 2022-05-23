import React from 'react';
import useReviews from '../../hooks/useReviews';
import Review from './Review';

const Reviews = ({ showAll = true }) => {
    const [reviews] = useReviews();
    let showReviews;
    showAll ? showReviews = reviews : showReviews = reviews?.slice(0, 3);
    return (
        <div className='container mx-auto my-5'>
            <h2 className='text-center pt-4 mb-3'>What our customers say</h2>
            <div className="row gap-3 review-container">
                {
                    showReviews.map(review => <Review
                        key={review._id}
                        review={review}
                    ></Review>)
                }
            </div>
        </div>
    );
};

export default Reviews;
