import React from 'react';
import ReactLoading from 'react-loading';

const Loading = () => {
    return (
        <div>
            <ReactLoading type={'spinningBubbles'} className="d-block mx-auto" color={'black'} height={100} width={100} />
        </div>
    );
};

export default Loading;