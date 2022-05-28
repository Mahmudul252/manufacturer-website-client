import { signOut } from "firebase/auth";
import { useEffect, useState } from "react"
import auth from "../firebase.init";

const useOrders = () => {
    const [orders, setOrders] = useState([]);
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        setLoading(true);
        fetch('https://lit-journey-03392.herokuapp.com/orders', {
            method: 'GET',
            headers: {
                'authorization': `Bearer ${localStorage.getItem('accessToken')}`
            }
        })
            .then(res => {
                if (res.status === 401 || res.status === 403) {
                    signOut(auth);
                    localStorage.removeItem('accessToken');
                }
                return res.json()
            })
            .then(data => {
                setLoading(false);
                setOrders(data);
            })
    }, []);
    return [orders, loading];
}
export default useOrders;