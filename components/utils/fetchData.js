// utils/fetchData.js
import { useState, useCallback, useEffect } from 'react';

const fetchData = (url) => {
    const [data, setData] = useState([]);
    const [loading, setLoading] = useState(true);
    const [refreshing, setRefreshing] = useState(false);

    const fetchData = useCallback(async () => {
        try {
            //setLoading(true);
            const response = await fetch(url);
            const data = await response.json();
            setData(data);
            setLoading(false);
        } catch (error) {
            console.error('Error fetching data:', error);
            setLoading(false);
        }
    }, []);

    useEffect(() => {
        const interval = setInterval(fetchData, 5000); // Fetch data every 5 seconds
        return () => clearInterval(interval);
    }, [fetchData]);

    const onRefresh = useCallback(async () => {
        setRefreshing(true);
        await fetchData();
        setRefreshing(false);
    }, [fetchData]);

    return { data, loading, refreshing, onRefresh };
};

export default fetchData;
