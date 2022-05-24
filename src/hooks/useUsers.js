import { useEffect, useState } from "react"

const useUsers = () => {
    const [users, setUsers] = useState([]);
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        setLoading(true);
        fetch('http://localhost:5000/users')
            .then(res => res.json())
            .then(data => {
                setLoading(false);
                setUsers(data);
            })
    }, []);
    return [users, loading];
}
export default useUsers;