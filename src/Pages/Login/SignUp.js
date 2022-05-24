import React, { useState } from 'react';
import { Button, FloatingLabel, Form } from 'react-bootstrap';
import { useCreateUserWithEmailAndPassword, useSendEmailVerification, useUpdateProfile } from 'react-firebase-hooks/auth';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import auth from '../../firebase.init';
// import PageTitle from '../../shared/PageTitle/PageTitle';
// import SocialLogin from '../SocialLogin/SocialLogin';

const SignUp = () => {
    const location = useLocation();
    const navigate = useNavigate();
    const [password, setPassword] = useState('');
    const [errorMessage, setErrorMessage] = useState('');
    const [passwordMatched, setPasswordMatched] = useState(false);
    const [createUserWithEmailAndPassword, user, loading, error] = useCreateUserWithEmailAndPassword(auth);
    const [updateProfile] = useUpdateProfile(auth);
    const [sendEmailVerification] = useSendEmailVerification(auth);

    const handleUserPassword = event => {
        setPassword(event.target.value);
    }
    const handleUserRetypePassword = event => {
        if (password !== event.target.value) {
            setPasswordMatched(false);
            setErrorMessage("Password don't match");
        }
        else {
            setPasswordMatched(true);
        }
    }
    const from = location?.state?.from?.pathname || '/';

    const handleCreateNewUser = (event) => {
        event.preventDefault();
        const displayName = event.target.name.value;
        const email = event.target.email.value;
        createUserWithEmailAndPassword(email, password)
            .then(async () => {
                await updateProfile({ displayName });
                toast("Email Verification Sent");
                await sendEmailVerification();
            })
            .then(() => navigate('/verify-user', { replace: true }));
    }

    return (
        <div className='login-form mx-auto my-5'>
            {/* <PageTitle title="Sign Up"></PageTitle> */}
            <h2 className='mb-3'>Please Sign Up</h2>
            <Form onSubmit={handleCreateNewUser}>

                <FloatingLabel controlId="userName" label="Enter Your Name" className="mb-3">
                    <Form.Control name="name" type="text" placeholder="Enter Your Name" required />
                </FloatingLabel>

                <FloatingLabel controlId="userEmail" label="Enter Your Email" className="mb-3">
                    <Form.Control name="email" type="email" placeholder="Enter Email" required />
                </FloatingLabel>

                <FloatingLabel controlId="userPassword" label="Enter Password" className="mb-3">
                    <Form.Control onBlur={handleUserPassword} name="password" type="password" placeholder="Enter Password" required />
                </FloatingLabel>

                <FloatingLabel controlId="userPassword2" label="ReEnter Password" className="mb-3">
                    <Form.Control onChange={handleUserRetypePassword} name="password2" type="password" placeholder="ReEnter Password" required />
                </FloatingLabel>

                {!passwordMatched && <p className="text-danger">{errorMessage}</p>}
                {loading && <p className="text-danger">Loading...</p>}
                {error && <p className="text-danger">{error.message}</p>}

                <Button disabled={!passwordMatched} className='login-button d-block mx-auto' variant="secondary" type="submit">
                    Sign Up
                </Button>

                <p className='my-3'>Already have an account? <Link className='ms-2 text-decoration-none' to='/login'>Please Login here</Link></p>
            </Form>
            {/* <SocialLogin from={from}></SocialLogin> */}
        </div>
    );
};

export default SignUp;