import React, { useEffect, useState } from 'react';
import { Button, Form } from 'react-bootstrap';
import { useAuthState } from 'react-firebase-hooks/auth';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import auth from '../../firebase.init';
import useUsers from '../../hooks/useUsers';
import Loading from '../Shared/Loading';
import PageTitle from '../Shared/PageTitle';

const AddProduct = () => {
    const [user, loading] = useAuthState(auth);
    const [users, userLoading] = useUsers();
    const [addProductLoading, setAddProductLoading] = useState(false);
    const navigate = useNavigate();
    const [loggedInUser, setLoggedInUser] = useState({});
    const [renderCount, setRenderCount] = useState(0);
    const imageStorageKey = '6bb82bf574ef700af209c385111f9392';

    useEffect(() => {
        setLoggedInUser(users.find(u => u.userEmail === user.email));
        setRenderCount(renderCount + 1);
    }, [users, user.email]);

    if (renderCount === 2) {
        if (loggedInUser.role !== 'Admin') {
            navigate('/unAuthorizedAccess', { replace: true });
        }
    }

    if (loading || userLoading || addProductLoading) {
        return <Loading />;
    }
    const handleAddProduct = async event => {
        event.preventDefault();
        setAddProductLoading(true);
        const image = event.target.img.files[0];
        const name = event.target.name.value;
        const minimumOrderQuantity = event.target.minimumOrderQuantity.value;
        const availableQuantity = event.target.availableQuantity.value;
        const unitPrice = event.target.unitPrice.value;
        const description = event.target.description.value;
        let img;

        const formData = new FormData();
        formData.append('image', image);
        const url = `https://api.imgbb.com/1/upload?key=${imageStorageKey}`;
        await fetch(url, {
            method: "POST",
            body: formData
        })
            .then(res => res.json())
            .then(result => {
                if (result.success) {
                    img = result.data.url;
                }
            });
        const addedProduct = { img, name, minimumOrderQuantity, availableQuantity, description, unitPrice };

        fetch('https://lit-journey-03392.herokuapp.com/tools', {
            method: "POST",
            headers: {
                'content-type': 'application/json'
            },
            body: JSON.stringify(addedProduct)
        })
            .then(res => res.json())
            .then(data => {
                setAddProductLoading(false);
                toast.success('Product Added Successfully!');
            });
    }
    return (
        <div>
            <PageTitle title="Add Product" />
            <h2>Add a Product</h2>
            <Form onSubmit={handleAddProduct}>

                <div className="d-flex gap-4">
                    <Form.Group className="mb-3" controlId="toolName">
                        <Form.Label>Tool Name</Form.Label>
                        <Form.Control name="name" type="text" placeholder="Enter Tool Name" required />
                    </Form.Group>

                    <Form.Group className="mb-3" controlId="unitPrice">
                        <Form.Label>Unit Price</Form.Label>
                        <Form.Control name="unitPrice" type="number" placeholder="Enter Unit Price" required onWheel={event => event.target.blur()} />
                    </Form.Group>
                </div>

                <div className="d-flex gap-4">
                    <Form.Group className="mb-3" controlId="availableQuantity">
                        <Form.Label>Available Quantity</Form.Label>
                        <Form.Control name="availableQuantity" type="number" placeholder="Enter Available Quantity" required onWheel={event => event.target.blur()} />
                    </Form.Group>

                    <Form.Group className="mb-3" controlId="description">
                        <Form.Label>Description</Form.Label>
                        <Form.Control name="description" type="text" placeholder="Enter Description" required />
                    </Form.Group>
                </div>

                <div className="d-flex gap-4">
                    <Form.Group className="mb-3" controlId="minimumOrderQuantity">
                        <Form.Label>Minimum Order Quantity</Form.Label>
                        <Form.Control name="minimumOrderQuantity" type="number" placeholder="Enter Minimum Order Quantity" required onWheel={event => event.target.blur()} />
                    </Form.Group>

                    <Form.Group className="mb-3" controlId="img">
                        <Form.Label>Tool Photo</Form.Label>
                        <Form.Control name="img" type="file" required />
                    </Form.Group>
                </div>

                <Button className='w-25' variant="secondary" type="submit">
                    Submit
                </Button>
            </Form>
        </div>
    );
};

export default AddProduct;