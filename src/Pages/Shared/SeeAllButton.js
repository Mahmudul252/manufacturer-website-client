import React from 'react';
import { Link } from 'react-router-dom';
import './Shared.css';

const SeeAllButton = ({ text }) => {
    return (
        <div>
            <Link to={`/${text.toLowerCase()}`} className='btn btn-secondary mt-3 mx-auto d-block see-all-button'>See All {text}</Link>
        </div>
    );
};

export default SeeAllButton;