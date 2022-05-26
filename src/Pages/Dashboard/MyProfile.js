import React, { useEffect, useState } from 'react';
import { Button, Form } from 'react-bootstrap';
import { useAuthState } from 'react-firebase-hooks/auth';
import { toast } from 'react-toastify';
import auth from '../../firebase.init';
import useUsers from '../../hooks/useUsers';
import Loading from '../Shared/Loading';

const MyProfile = () => {
    const [user] = useAuthState(auth);
    const [update, setUpdate] = useState(false);
    const [users, loading] = useUsers();
    const [loggedInUser, setLoggedInUser] = useState({});
    const [updateLoading, setUpdateLoading] = useState(false);

    useEffect(() => {
        setLoggedInUser(users.find(u => u.userEmail === user.email));
    }, [users, user.email]);

    if (loading || updateLoading) {
        return <Loading />;
    }

    const handleProfileUpdate = event => {
        event.preventDefault();
        setUpdateLoading(true);
        const location = event.target.district.value;
        const linkedIn = event.target.linkedIn.value;
        const education = event.target.education.value;
        const userProfileInfo = { location, linkedIn, education };

        const url = `http://localhost:5000/users/${loggedInUser._id}`;
        fetch(url, {
            method: 'PUT',
            headers: {
                'content-type': 'application/json'
            },
            body: JSON.stringify(userProfileInfo)
        })
            .then(res => res.json())
            .then(data => {
                setUpdate(false);
                setUpdateLoading(false);
                toast.success('Profile Updated Successfully!');
            });
    }

    return (
        <div>
            <h2 className="fs-3">My Profile</h2>
            <div className="d-flex gap-5">

                <div>
                    <img className='rounded-3' src={user.photoURL} alt="" />
                    <p className='fs-5 mt-2 mb-0'>Username: {user.displayName}</p>
                    <p className='mb-0'>Email: {user.email}</p>

                    <div className={loggedInUser?.education ? '' : 'd-none'}>
                        <p className='mb-0'>District: {user.email}</p>
                        <p className='mb-0'>Education: {user.email}</p>
                        <p className='mb-0'>LinkedIn Profile: <a
                            href={loggedInUser?.linkedIn}
                            className="text-decoration-none"
                            target="_blank"
                            rel="noreferrer"
                        >{loggedInUser?.linkedIn?.split('/')[4].toUpperCase()}</a></p>
                    </div>

                    <p className={update ? 'd-none' : 'm-0 fs-5'}>Update Profile? <button className='btn btn-secondary' onClick={() => setUpdate(!update)}>Click Here</button></p>
                </div>

                <div className={update ? 'ms-5' : 'd-none'}>
                    <h3 className="fs-4 mb-3">Please update your profile</h3>
                    <Form onSubmit={handleProfileUpdate}>
                        <Form.Group className="mb-3" controlId="formBasicDistrict">
                            <Form.Label>District</Form.Label>
                            <Form.Control name="district" type="text" placeholder="Enter your district name" required />
                        </Form.Group>

                        <Form.Group className="mb-3" controlId="formBasicLinkedIn">
                            <Form.Label>LinkedIn Profile Link</Form.Label>
                            <Form.Control name="linkedIn" type="text" placeholder="Enter your LinkedIn Profile Link" required />
                        </Form.Group>

                        <p className='mb-1'>Education</p>
                        <Form.Select name="education" aria-label="Default select example" defaultValue="Graduate">
                            <option value="Graduate">Graduate</option>
                            <option value="Undergraduate">Undergraduate</option>
                            <option value="HSC">HSC</option>
                            <option value="SSC">SSC</option>
                            <option value="Under SSC">Under SSC</option>
                        </Form.Select>

                        <Button className='mt-3' variant="secondary" type="submit">
                            Update Profile
                        </Button>
                    </Form>
                </div>
            </div>
        </div >
    );
};

export default MyProfile;