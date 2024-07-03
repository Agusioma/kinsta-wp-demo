import {useState, useCallback, useEffect} from 'react';
import AsyncStorage from "@react-native-async-storage/async-storage";

const fetchData = (url, cacheReadChooserString) => {
    const [data, setData] = useState([]);
    const [loading, setLoading] = useState(true);
    const [refreshing, setRefreshing] = useState(false);

    const fetchData = useCallback(async () => {
        try {
            const response = await fetch(url);
            const data = await response.json();
            setData(data);
            setLoading(false);
        } catch (error) {
            switch (cacheReadChooserString) {
                case "posts":
                    loadCache("posts_cache");
                    break;
                case "pages":
                    loadCache("pages_cache");
                    break;
                default:
                    console.error('Error fetching data:', error);
            }
            setLoading(false);
        }
    }, []);

    const loadCache = async (cacheKey) => {
        try {
            const jsonValue = await AsyncStorage.getItem(cacheKey);
            if (jsonValue !== null) {
                const parsedJson = JSON.parse(jsonValue);
                setData(parsedJson)
            } else {
                console.error('Error fetching data');
            }
        } catch (error) {
            console.error('Error retrieving cache:', error);
        }
    };

    useEffect(() => {
        const interval = setInterval(fetchData, 5000); // Fetch data every 5 seconds
        return () => clearInterval(interval);
    }, [fetchData]);

    const onRefresh = useCallback(async () => {
        setRefreshing(true);
        await fetchData();
        setRefreshing(false);
    }, [fetchData]);

    return {data, loading, refreshing, onRefresh};
};

export default fetchData;
