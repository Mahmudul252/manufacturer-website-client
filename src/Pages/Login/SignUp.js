import React, { useState } from 'react';
import { Button, FloatingLabel, Form } from 'react-bootstrap';
import { useCreateUserWithEmailAndPassword, useSendEmailVerification, useUpdateProfile } from 'react-firebase-hooks/auth';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import auth from '../../firebase.init';
import { useForm } from "react-hook-form";
// import PageTitle from '../../shared/PageTitle/PageTitle';
import SocialLogin from './SocialLogin';

const SignUp = () => {
    const location = useLocation();
    const navigate = useNavigate();
    const [password, setPassword] = useState('');
    const [errorMessage, setErrorMessage] = useState('');
    const [passwordMatched, setPasswordMatched] = useState(false);
    const [createUserWithEmailAndPassword, user, loading, error] = useCreateUserWithEmailAndPassword(auth);
    const [updateProfile] = useUpdateProfile(auth);
    const [sendEmailVerification] = useSendEmailVerification(auth);
    const { register, handleSubmit, formState: { errors } } = useForm();



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

    const onSubmit = ({ userEmail, userName }) => {
        const displayName = userName;
        const email = userEmail;
        createUserWithEmailAndPassword(email, password)
            .then(async () => {
                await updateProfile({ displayName });
                toast("Email Verification Sent");
                await sendEmailVerification();
            })
        // .then(() => navigate('/verify-user', { replace: true }));
    }

    return (
        <div className='login-form mx-auto my-5'>
            {/* <PageTitle title="Sign Up"></PageTitle> */}
            <h2 className='mb-3'>Please Sign Up</h2>
            <Form onSubmit={handleSubmit(onSubmit)}>

                <FloatingLabel controlId="userName" label="Enter Your Name" className="mb-3">
                    <Form.Control type="text" placeholder="Enter Your Name" {...register("userName", { required: true, maxLength: 20 })} />
                </FloatingLabel>
                <small className="text-danger">{errors.userName?.type === 'required' && "Username is required"}</small>


                <FloatingLabel controlId="userEmail" label="Enter Your Email" className="mb-3">
                    <Form.Control type="email" placeholder="Enter Email" {...register("userEmail", { required: true, maxLength: 20 })} />
                </FloatingLabel>
                <small className="text-danger">{errors.userEmail?.type === 'required' && "Email is required"}</small>


                <FloatingLabel controlId="userPassword" label="Enter Password" className="mb-3">
                    <Form.Control onBlur={handleUserPassword} type="password" placeholder="Enter Password" {...register("userPassword", { required: true, maxLength: 20 })} />
                </FloatingLabel>
                <small className="text-danger">{errors.userPassword?.type === 'required' && "Password is required"}</small>

                <FloatingLabel controlId="userPassword2" label="ReEnter Password" className="mb-3">
                    <Form.Control onChange={handleUserRetypePassword} type="password" placeholder="ReEnter Password" {...register("userPassword2", { required: true, maxLength: 20 })} />
                </FloatingLabel>
                <small className="text-danger">{errors.userPassword2?.type === 'required' && "Please Retype Password"}</small>

                {!passwordMatched && <p className="text-danger">{errorMessage}</p>}
                {loading && <p className="text-danger">Loading...</p>}
                {error && <p className="text-danger">{error.message}</p>}

                <Button className='login-button d-block mx-auto' variant="secondary" type="submit">
                    Sign Up
                </Button>

                <p className='my-3'>Already have an account? <Link className='ms-2 text-decoration-none' to='/login'>Please Login here</Link></p>
            </Form>
            <SocialLogin from={from}></SocialLogin>
        </div >
    );
};

export default SignUp;