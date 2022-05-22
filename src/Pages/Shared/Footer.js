import React from 'react';

const Footer = () => {
    const date = new Date().getFullYear();
    return (
        <footer className='text-center'>
            <p>@{date} All Rights Reserved</p>
        </footer>
    );
};

export default Footer;