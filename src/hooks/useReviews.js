import { useEffect, useState } from "react"

const useTools = () => {
    const [reviews, setReviews] = useState([]);
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        setLoading(true);
        fetch('reviews.json')
            .then(res => res.json())
            .then(data => {
                setLoading(false);
                setReviews(data);
            })
    }, []);
    return [reviews, loading];
}
export default useTools;