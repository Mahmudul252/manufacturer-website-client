import React from 'react';
import PageTitle from '../Shared/PageTitle';
import './NotFound.css';

const NotFound = () => {
    return (
        <div className='container my-5'>
            <PageTitle title="Page Not Found" />
            <h1 className='text-danger fw-bolder text-center pt-5'>OOPS!</h1>
            <img className='not-found-img d-block mx-auto' src="https://i.ibb.co/1KH8Zpj/404.jpg" alt="" />
            <h2 className='text-danger text-center fw-bolder'>The page you are finding is not found..</h2>
        </div>
    );
};

export default NotFound;