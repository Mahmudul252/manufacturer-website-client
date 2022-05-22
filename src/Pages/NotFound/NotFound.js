import React from 'react';
import './NotFound.css';

const NotFound = () => {
    return (
        <div className='container mt-5'>
            <h1 className='text-danger fw-bolder text-center'>OOPS!</h1>
            <img className='not-found-img d-block mx-auto' src="https://i.ibb.co/1KH8Zpj/404.jpg" alt="" />
            <h2 className='text-danger text-center fw-bolder'>The page you are finding is not found..</h2>
        </div>
    );
};

export default NotFound;