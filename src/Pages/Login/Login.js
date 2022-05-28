import React, { useEffect, useState } from 'react';
import { useAuthState, useSendPasswordResetEmail, useSignInWithEmailAndPassword } from 'react-firebase-hooks/auth';
import { Button, FloatingLabel, Form } from 'react-bootstrap';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import './Login.css';
import { toast } from 'react-toastify';
import auth from '../../firebase.init';
import SocialSignIn from './SocialLogin';
import Loading from '../Shared/Loading';
import PageTitle from '../Shared/PageTitle';
import useToken from '../../hooks/useToken';
import { signOut } from 'firebase/auth';

const Login = () => {
    const location = useLocation();
    const navigate = useNavigate();
    const [email, setEmail] = useState('');
    const [resetClicked, setResetClicked] = useState(false);
    const [
        signInWithEmailAndPassword,
        ,
        loading,
        error,
    ] = useSignInWithEmailAndPassword(auth);
    const [sendPasswordResetEmail] = useSendPasswordResetEmail(auth);
    const [user, userLoading] = useAuthState(auth);
    const [token] = useToken(user);
    const from = location?.state?.from?.pathname || '/';

    useEffect(() => {
        token && navigate(from, { replace: true });
    }, [from, navigate, token]);

    if (loading || userLoading) {
        return <Loading></Loading>;
    }

    const handleUserLogin = async event => {
        event.preventDefault();
        const email = event.target.email.value;
        const password = event.target.password.value;
        setEmail(email);
        await signInWithEmailAndPassword(email, password);
        setResetClicked(false);
    }
    const handleResetPassword = async () => {
        await sendPasswordResetEmail(email);
        toast('Password reset email sent');
        setResetClicked(true);
    }



    return (
        <div className='mx-auto mt-5 login-form'>
            <PageTitle title="Login" />
            <h2 className='mb-3 display-6 pt-3'>Please Login</h2>
            <Form onSubmit={handleUserLogin}>

                <FloatingLabel controlId="email" label="Email" className="mb-3">
                    <Form.Control name="email" type="text" placeholder="Enter Email" required />
                </FloatingLabel>

                <FloatingLabel controlId="password" label="Password" className="mb-3">
                    <Form.Control name="password" type="password" placeholder="Enter Password" required />
                </FloatingLabel>
                {error && <div>
                    <p className="text-danger">{error.message}</p>
                    <p style={{ display: resetClicked ? 'none' : 'block' }} className=''>Forget Password? <span className='text-primary cursor-pointer' onClick={handleResetPassword}>Reset Now</span></p>
                </div>}
                {resetClicked && <p>Password resetting email sent to your email.</p>}

                <Button className='login-button d-block mx-auto' variant="secondary" type="submit">
                    Login
                </Button>

                <p className='my-3'>Don't have an account? <Link className='ms-2 text-decoration-none' to='/signup'>Sign Up now</Link></p>
            </Form>
            <SocialSignIn from={from}></SocialSignIn>
        </div>
    );
};

export default Login;