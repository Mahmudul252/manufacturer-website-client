import React from 'react';
import { Nav } from 'react-bootstrap';
import { Link, Outlet } from 'react-router-dom';
import './Dashboard.css';

const Dashboard = () => {
    return (
        <div>
            <div className="d-flex">
                <div className="text-white position-fixed side-navbar ps-3 pt-3">
                    <h2 className='ms-'>Dashboard</h2>
                    <Nav.Link className='text-white' as={Link} to='/dashboard/myOrders'>My Orders</Nav.Link>
                    <Nav.Link className='text-white' as={Link} to='/dashboard/addReview'>Add a Review</Nav.Link>
                    <Nav.Link className='text-white' as={Link} to='/dashboard/myProfile'>My Profile</Nav.Link>
                </div>
                <div className=" dashboard-window">
                    <h2 className="display-5">Welcome to Dashboard</h2>
                    <Outlet />
                </div>
            </div>
        </div>
    );
};

export default Dashboard;