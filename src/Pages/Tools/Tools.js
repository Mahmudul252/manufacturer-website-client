import React from 'react';
import useTools from '../../hooks/useTools';
import Loading from '../Shared/Loading';
import Tool from './Tool';

const Tools = () => {
    const [tools, loading] = useTools();

    if (loading) {
        return <Loading></Loading>
    }

    return (
        <div className='container mx-auto my-5'>
            <h2 className="display-6 text-center">Tools</h2>
            <div className="row gap-3">
                {
                    tools.map(showTool =>
                        < Tool
                            key={showTool._id}
                            showTool={showTool}
                        ></Tool>
                    )
                }
            </div>
        </div>
    );
};

export default Tools;