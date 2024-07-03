import {useState, useCallback, useEffect} from 'react';
import AsyncStorage from "@react-native-async-storage/async-storage";
import NetInfo from "@react-native-community/netinfo";

const fetchData = (url, cacheReadChooserString) => {
    const [data, setData] = useState([]);
    const [loading, setLoading] = useState(true);
    const [refreshing, setRefreshing] = useState(false);
    const [connectionStatus, setConnectionStatus] = useState(true)

    const fetchDataCallback = useCallback(async () => {

        if (connectionStatus === true) {
            try {
                const response = await fetch(url);
                const data = await response.json();
                setData(data);
                setLoading(false);
            } catch (error) {
                console.error('Error fetching data:', error)
                setLoading(false);
            }
        } else {
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
        NetInfo.addEventListener(state => {
            setConnectionStatus(state.isConnected)
        });

        const interval = setInterval(fetchDataCallback, 5000); // Fetch data every 5 seconds
        return () => clearInterval(interval);
    }, [fetchDataCallback]);

    const onRefresh = useCallback(async () => {
        setRefreshing(true);
        await fetchDataCallback();
        setRefreshing(false);
    }, [fetchDataCallback]);

    return {data, loading, refreshing, onRefresh};
};

export default fetchData;
