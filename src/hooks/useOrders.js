import { useEffect, useState } from "react"

const useOrders = () => {
    const [orders, setOrders] = useState([]);
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        setLoading(true);
        fetch('http://localhost:5000/orders')
            .then(res => res.json())
            .then(data => {
                setLoading(false);
                setOrders(data);
            })
    }, []);
    return [orders, loading];
}
export default useOrders;