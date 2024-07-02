// hooks/useFetchPostDetails.js
import {useCallback, useEffect, useState} from 'react';

const useFetchPostDetails = (baseUrl, postId) => {
    const [post, setPost] = useState(null);
    const [loading, setLoading] = useState(true);
    const [refreshing, setRefreshing] = useState(false);


    const fetchPostDetails = useCallback(async () => {
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
        fetchPostDetails();
    }, [fetchPostDetails]);

    const onRefresh = useCallback(() => {
        setRefreshing(true);
        fetchPostDetails();
    }, [fetchPostDetails]);

    return {post, loading, refreshing, onRefresh};
};

export default useFetchPostDetails;
