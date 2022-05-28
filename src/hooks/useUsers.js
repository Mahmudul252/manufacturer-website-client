import { signOut } from "firebase/auth";
import { useEffect, useState } from "react"
import auth from "../firebase.init";

const useUsers = () => {
    const [users, setUsers] = useState([]);
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        setLoading(true);
        fetch('http://localhost:5000/users', {
            method: 'GET',
            headers: {
                'authorization': `Bearer ${localStorage.getItem('accessToken')}`
            }
        })
            .then(res => {
                console.log(res)
                if (res.status === 401 || res.status === 403) {
                    signOut(auth);
                    localStorage.removeItem('accessToken');
                    return;
                }
                return res.json();
            })
            .then(data => {
                setLoading(false);
                setUsers(data);
            })

    }, []);
    return [users, loading];
}
export default useUsers;