import React, { useEffect, useState } from 'react';
import { Nav } from 'react-bootstrap';
import { useAuthState } from 'react-firebase-hooks/auth';
import { Link, Outlet } from 'react-router-dom';
import auth from '../../firebase.init';
import useUsers from '../../hooks/useUsers';
import Loading from '../Shared/Loading';
import './Dashboard.css';

const Dashboard = () => {
    const [user] = useAuthState(auth);
    const [users, loading] = useUsers();
    const [loggedInUser, setLoggedInUser] = useState({});

    useEffect(() => {
        setLoggedInUser(users.find(u => u.userEmail === user.email));
    }, [users, user.email]);

    if (loading) {
        return <Loading />;
    }

    return (
        <div>
            <div className="d-flex">
                <div className="text-white position-fixed side-navbar ps-3 pt-3">
                    <h2>Dashboard</h2>
                    {loggedInUser?.role === 'Admin' ?
                        <>
                            <Nav.Link className='text-white' as={Link} to='/dashboard/manageOrders'>Manage All Orders</Nav.Link>
                            <Nav.Link className='text-white' as={Link} to='/dashboard/addProduct'>Add A Product</Nav.Link>
                            <Nav.Link className='text-white' as={Link} to='/dashboard/makeAdmin'>Make Admin</Nav.Link>
                            <Nav.Link className='text-white' as={Link} to='/dashboard/manageProducts'>Manage Products</Nav.Link>
                        </>
                        :
                        <>
                            <Nav.Link className='text-white' as={Link} to='/dashboard/myOrders'>My Orders</Nav.Link>
                            <Nav.Link className='text-white' as={Link} to='/dashboard/addReview'>Add a Review</Nav.Link>
                        </>
                    }
                    <Nav.Link className='text-white' as={Link} to='/dashboard/myProfile'>My Profile</Nav.Link>
                </div>
                <div className="dashboard-window">
                    <h2 className="display-6 text-center">Welcome to Dashboard</h2>
                    <Outlet />
                </div>
            </div>
        </div>
    );
};

export default Dashboard;