import { useEffect, useState } from "react"

const useTools = () => {
    const [reviews, setReviews] = useState([]);

    useEffect(() => {
        fetch('reviews.json')
            .then(res => res.json())
            .then(data => setReviews(data))
    }, []);
    return [reviews];
}
export default useTools;