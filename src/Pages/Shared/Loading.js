import React from 'react';
import ReactLoading from 'react-loading';

const Loading = () => {
    return (
        <div>
            <div style={{ marginTop: "20%" }} className='d-flex justify-content-center'>
                <ReactLoading type={'spinningBubbles'} color={'black'} height={100} width={100} />
            </div>
        </div>
    );
};

export default Loading;