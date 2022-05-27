import React from 'react';
import useReviews from '../../hooks/useReviews';
import Loading from '../Shared/Loading';
import PageTitle from '../Shared/PageTitle';
import Review from './Review';

const Reviews = () => {
    const [reviews, loading] = useReviews();

    if (loading) {
        return <Loading></Loading>
    }

    return (
        <div className='container mx-auto my-5'>
            <PageTitle title="Reviews" />
            <h2 className='text-center pt-4 mb-3 display-6'>What our customers say</h2>
            <div className="row gap-3 review-container">
                {
                    reviews.map(review => <Review
                        key={review._id}
                        review={review}
                    ></Review>)
                }
            </div>
        </div>
    );
};

export default Reviews;
