import React, { useEffect, useState } from 'react';
import { Button, Form } from 'react-bootstrap';
import { useAuthState } from 'react-firebase-hooks/auth';
import { useNavigate } from 'react-router-dom';
import auth from '../../firebase.init';
import useUsers from '../../hooks/useUsers';
import Loading from '../Shared/Loading';

const AddProduct = () => {
    const [user, loading] = useAuthState(auth);
    const [users, userLoading] = useUsers();
    const navigate = useNavigate();
    const [loggedInUser, setLoggedInUser] = useState({});
    const [renderCount, setRenderCount] = useState(0);

    useEffect(() => {
        setLoggedInUser(users.find(u => u.userEmail === user.email));
        setRenderCount(renderCount + 1);
    }, [users, user.email]);

    if (renderCount === 2) {
        if (loggedInUser.role !== 'Admin') {
            navigate('/unAuthorizedAccess', { replace: true });
        }
    }

    if (loading || userLoading) {
        return <Loading />;
    }
    const handleAddProduct = event => {

    }
    return (
        <div>
            <h2>Add a Product</h2>
            <Form onSubmit={handleAddProduct}>
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

export default AddProduct;