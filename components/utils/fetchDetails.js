// hooks/fetchDetails.js
import {useCallback, useEffect, useState} from 'react';

const fetchDetails = (baseUrl, postId) => {
    const [post, setPost] = useState(null);
    const [loading, setLoading] = useState(true);
    const [refreshing, setRefreshing] = useState(false);


    const fetchDetailsCallback = useCallback(async () => {
        try {
            const response = await fetch(`${baseUrl}/${postId}`);
            const data = await response.json();
            setPost(data);
            setLoading(false);
            setRefreshing(false);
        } catch (error) {
            console.error('Error fetching post details:', error);
            setLoading(false);
            setRefreshing(false);
        }
    }, [postId]);

    useEffect(() => {

        const interval = setInterval(fetchDetailsCallback, 5000); // Fetch data every 5 seconds
        return () => clearInterval(interval);
    }, [fetchDetailsCallback]);

    const onRefresh = useCallback(() => {
        setRefreshing(true);
        fetchDetailsCallback();
    }, [fetchDetailsCallback]);

    return {post, loading, refreshing, onRefresh};
};

export default fetchDetails;
