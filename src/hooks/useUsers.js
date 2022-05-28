import { signOut } from "firebase/auth";
import { useEffect, useState } from "react"
import { useAuthState } from "react-firebase-hooks/auth";
import auth from "../firebase.init";
import useToken from "./useToken";

const useUsers = () => {
    const [user] = useAuthState(auth);
    const [users, setUsers] = useState([]);
    const [loading, setLoading] = useState(false);
    const [token] = useToken(user?.email);

    useEffect(() => {
        if (token) {
            setLoading(true);
            fetch('https://lit-journey-03392.herokuapp.com/users', {
                method: 'GET',
                headers: {
                    'authorization': `Bearer ${localStorage.getItem('accessToken')}`
                }
            })
                .then(res => {
                    if (res.status === 401 || res.status === 403) {
                        localStorage.removeItem('accessToken');
                        signOut(auth);
                        return;
                    }
                    return res.json();
                })
                .then(data => {
                    setLoading(false);
                    setUsers(data);
                })
        }

    }, [token, user]);
    return [users, loading];
}
export default useUsers;