import React from 'react';
import { Link } from 'react-router-dom';
import useTools from '../../hooks/useTools';
import Loading from '../Shared/Loading';
import SeeAllButton from '../Shared/SeeAllButton';
import Tool from './Tool';

const Tools = ({ showAll = true }) => {
    const [tools, loading] = useTools();
    let showTools;
    showAll ? showTools = tools : showTools = tools?.slice(0, 6);

    if (loading) {
        return <Loading></Loading>
    }

    return (
        <div className='container mx-auto my-5'>
            <h2 className="display-6 text-center">Tools</h2>
            <div className="row gap-3">
                {
                    showTools.map(showTool =>
                        < Tool
                            key={showTool._id}
                            showTool={showTool}
                        ></Tool>
                    )
                }
            </div>
            {!showAll && <SeeAllButton text={'Tools'}></SeeAllButton>}
        </div>
    );
};

export default Tools;