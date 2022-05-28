import React, { useEffect, useState } from 'react';
import { Table } from 'react-bootstrap';
import { useAuthState } from 'react-firebase-hooks/auth';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import auth from '../../firebase.init';
import useTools from '../../hooks/useTools';
import useUsers from '../../hooks/useUsers';
import Loading from '../Shared/Loading';
import PageTitle from '../Shared/PageTitle';
import ManageProduct from './ManageProduct';

const ManageProducts = () => {
    const [user, loading] = useAuthState(auth);
    const [users, userLoading] = useUsers();
    const navigate = useNavigate();
    const [loggedInUser, setLoggedInUser] = useState({});
    const [renderCount, setRenderCount] = useState(0);
    const [tools, toolsLoading] = useTools();
    const [adminLoading, setAdminLoading] = useState(false);
    const [allTools, setAllTools] = useState([]);

    useEffect(() => {
        setAllTools(tools);
        setLoggedInUser(users.find(u => u.userEmail === user.email));
        setRenderCount(renderCount + 1);
    }, [users, user.email]);

    if (loading || userLoading || toolsLoading || adminLoading) {
        return <Loading />;
    }

    if (renderCount === 2) {
        if (loggedInUser.role !== 'Admin') {
            navigate('/unAuthorizedAccess', { replace: true });
        }
    }
    const handleDeleteTool = _id => {
        const proceed = window.confirm('Are you sure to delete?');
        if (proceed) {
            setAdminLoading(true);
            fetch(`https://lit-journey-03392.herokuapp.com/tools/${_id}`, {
                method: 'DELETE'
            })
                .then(res => res.json())
                .then(data => {
                    if (data.deletedCount > 0) {
                        const remainingTools = allTools.filter(tool => tool._id !== _id);
                        setAllTools(remainingTools);
                        setAdminLoading(false);
                        toast.success('Tool Deleted Successfully!');
                    }
                })
        }
    }
    return (
        <div>
            <PageTitle title="Manage Products" />
            <h2>Manage Products</h2>
            <Table striped bordered hover variant="dark" className={loggedInUser?.role === 'Admin' ? 'text-center w-75' : 'd-none'}>
                <thead>
                    <tr>
                        <th></th>
                        <th>Tool Name</th>
                        <th>Available Quantity</th>
                        <th>Action</th>
                    </tr>
                </thead>
                <tbody>
                    {
                        allTools.map((tool, index) => <ManageProduct
                            key={tool._id}
                            tool={tool}
                            index={index}
                            handleDeleteTool={handleDeleteTool}
                        ></ManageProduct>)
                    }
                </tbody>
            </Table>
        </div>
    );
};

export default ManageProducts;