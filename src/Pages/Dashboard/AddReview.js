import React, { useState } from 'react';
import { Button, Form } from 'react-bootstrap';
import { useAuthState } from 'react-firebase-hooks/auth';
import { toast } from 'react-toastify';
import auth from '../../firebase.init';
import Loading from '../Shared/Loading';
import PageTitle from '../Shared/PageTitle';

const AddReview = () => {
    const [user, loading] = useAuthState(auth);
    const [reviewLoading, setReviewLoading] = useState(false);

    if (loading || reviewLoading) {
        return <Loading />;
    }

    const handleAddReview = event => {
        event.preventDefault();
        setReviewLoading(true);
        const review = event.target.review.value;
        const ratings = event.target.ratings.value;
        const userName = user.displayName;
        const userPhoto = user.photoURL;
        const userReview = { review, ratings, userName, img: userPhoto };
        fetch('https://lit-journey-03392.herokuapp.com/reviews', {
            method: 'POST',
            headers: {
                'content-type': 'application/json'
            },
            body: JSON.stringify(userReview)
        })
            .then(res => res.json())
            .then(data => {
                toast.success('Review added!');
                event.target.reset();
                setReviewLoading(false);
            })
    }
    return (
        <div className='w-50 mx-auto'>
            <PageTitle title="Add Review" />
            <h2 className="display-6">Add a Review</h2>
            <Form onSubmit={handleAddReview}>
                <Form.Group className="mb-3" controlId="formBasicReview">
                    <Form.Label>Review Description</Form.Label>
                    <Form.Control name="review" type="text" placeholder="Enter Review" required />
                </Form.Group>

                <p className='mb-1'>Ratings</p>
                <Form.Select name="ratings" aria-label="Default select example" defaultValue="5">
                    <option value="1">One</option>
                    <option value="2">Two</option>
                    <option value="3">Three</option>
                    <option value="4">Four</option>
                    <option value="5">Five</option>
                </Form.Select>

                <Button className='mt-3' variant="secondary" type="submit">
                    Submit
                </Button>
            </Form>
        </div>
    );
};

export default AddReview;