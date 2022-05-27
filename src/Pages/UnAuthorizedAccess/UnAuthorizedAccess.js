import React from 'react';
import unAuthorizedAccessImage from '../../images/unAuthorizedAccess.jpg';
import PageTitle from '../Shared/PageTitle';

const UnAuthorizedAccess = () => {
    return (
        <div className='w-50 mx-auto'>
            <PageTitle title="UnAuthorized Access" />
            <img src={unAuthorizedAccessImage} alt="" />
        </div>
    );
};

export default UnAuthorizedAccess;