import React from 'react';
import { Button, FloatingLabel, Form } from 'react-bootstrap';
import { useCreateUserWithEmailAndPassword, useSendEmailVerification, useUpdateProfile } from 'react-firebase-hooks/auth';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import auth from '../../firebase.init';
import { useForm } from "react-hook-form";
// import PageTitle from '../../shared/PageTitle/PageTitle';
import SocialLogin from './SocialLogin';
import useUsers from '../../hooks/useUsers';
import Loading from '../Shared/Loading';

const SignUp = () => {
    const location = useLocation();
    const navigate = useNavigate();
    const [createUserWithEmailAndPassword, , , error] = useCreateUserWithEmailAndPassword(auth); //ignoring user and loading as they are unused
    const [updateProfile] = useUpdateProfile(auth);
    const [sendEmailVerification] = useSendEmailVerification(auth);
    const { register, handleSubmit, formState: { errors } } = useForm();
    const [users, loading] = useUsers();

    if (loading) {
        return <Loading />
    }


    const from = location?.state?.from?.pathname || '/';

    const onSubmit = ({ userEmail, userName: displayName, userPassword }) => {
        createUserWithEmailAndPassword(userEmail, userPassword)
            .then(async () => {
                await updateProfile({ displayName });
                toast("Email Verification Sent");
                await sendEmailVerification();

                const registeredUser = users?.find(u => u.email === userEmail);
                if (!registeredUser) {
                    const newUser = { userName: displayName, userEmail };
                    fetch('http://localhost:5000/users', {
                        method: "POST",
                        headers: {
                            'content-type': 'application/json'
                        },
                        body: JSON.stringify(newUser)
                    })
                        .then(res => res.json())
                        .then(data => {
                            console.log(data);
                            navigate(from, { replace: true });
                        });
                }
            });

    }

    return (
        <div className='login-form mx-auto my-5'>
            {/* <PageTitle title="Sign Up"></PageTitle> */}
            <h2 className='mb-3 pt-3 display-6'>Please Sign Up</h2>
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
                    <Form.Control type="password" placeholder="Enter Password" {...register("userPassword", { required: true, maxLength: 20 })} />
                </FloatingLabel>
                <small className="text-danger">{errors.userPassword?.type === 'required' && "Password is required"}</small>
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