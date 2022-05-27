import React, { useEffect } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faGithub, faGoogle } from '@fortawesome/free-brands-svg-icons';
import { useSignInWithGithub, useSignInWithGoogle } from 'react-firebase-hooks/auth';
import { useNavigate } from 'react-router-dom';
import auth from '../../firebase.init';
import useUsers from '../../hooks/useUsers';
import Loading from '../Shared/Loading';

const SocialSignIn = ({ from }) => {
    const navigate = useNavigate();
    const [signInWithGoogle, googleUser, googleLoading, googleError] = useSignInWithGoogle(auth);
    const [signInWithGithub, githubUser, githubLoading, githubError] = useSignInWithGithub(auth);
    const [users, loading] = useUsers();



    const handleSocialSignIn = method => {
        if (method === 'google') {
            signInWithGoogle();
        }
        if (method === 'github') {

            signInWithGithub();
        }
    }
    useEffect(() => {
        const loggedInUser = googleUser || githubUser;
        if (loggedInUser) {
            let userName, userEmail, userPhoto;
            if (googleUser) {
                userName = googleUser.user.displayName;
                userEmail = googleUser.user.email;
                userPhoto = googleUser.user.photoURL;
            }
            else if (githubUser) {
                userName = githubUser.user.displayName;
                userEmail = githubUser.user.email;
                userPhoto = githubUser.user.photoURL;
            }

            const registeredUser = users?.find(u => u.userEmail === userEmail);
            if (!registeredUser) {
                const newUser = { userName, userEmail, userPhoto };
                fetch('http://localhost:5000/users', {
                    method: "POST",
                    headers: {
                        'content-type': 'application/json'
                    },
                    body: JSON.stringify(newUser)
                });
            }
        }
    }, [from, navigate, googleUser, githubUser, users])

    if (loading || googleLoading || githubLoading) {
        return <Loading></Loading>;
    }

    return (
        <div>
            <div className="d-flex align-items-center mb-4">
                <div style={{ height: '1px' }} className='bg-secondary w-50'></div>
                <div className='mx-2'>or</div>
                <div style={{ height: '1px' }} className='bg-secondary w-50'></div>
            </div>
            {googleError && <p className='text-danger'>{googleError.message}</p>}
            <div className="d-flex justify-content-center my-3">
                <button onClick={() => handleSocialSignIn('google')} className="btn btn-secondary social-login-button fs-5">Sign In with Google   <FontAwesomeIcon className='ms-1' icon={faGoogle} /></button>
            </div>
            {githubError && <p className='text-danger'>{githubError.message}</p>}
            <div className="d-flex justify-content-center">
                <button onClick={() => handleSocialSignIn('github')} className="btn btn-secondary social-login-button fs-5 mb-5">Sign In with Github   <FontAwesomeIcon className='ms-1' icon={faGithub} /></button>
            </div>
        </div>
    );
};

export default SocialSignIn;