// screens/PagesScreen.js
import React from 'react';
import { View, Text, FlatList, RefreshControl, ActivityIndicator } from 'react-native';
import styles from '../styles/listingstyling'; // Adjust styling if necessary
import fetchData from './utils/fetchData';
import DataListScreen from "./utils/DataListScreen";

const PagesScreen = () => {
    const { data, loading, refreshing, onRefresh } = fetchData('https://8877-41-80-116-93.ngrok-free.app/wordpress/wp-json/wp/v2/pages'); // Replace with your endpoint URL

    return (
        <DataListScreen
            loading={loading}
            data={data}
            refreshing={refreshing}
            onRefresh={onRefresh}
        />
    );
};

export default PagesScreen;
