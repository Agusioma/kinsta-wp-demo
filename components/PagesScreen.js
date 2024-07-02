// screens/PagesScreen.js
import React from 'react';
import {View, Text, FlatList, RefreshControl, ActivityIndicator, TouchableOpacity} from 'react-native';
import styles from '../styles/listingstyling'; // Adjust styling if necessary
import fetchData from './utils/fetchData';
import DataListScreen from "./utils/DataListScreen";
import {useNavigation} from "@react-navigation/native";

const PagesScreen = () => {
    const { data, loading, refreshing, onRefresh } = fetchData('https://8877-41-80-116-93.ngrok-free.app/wordpress/wp-json/wp/v2/pages'); // Replace with your endpoint URL
    const navigation = useNavigation();

    const renderItem = ({ item }) => {
        return (
            <TouchableOpacity
                style={styles.postContainer}
                onPress={() => navigation.navigate('PostDetails', { postId: item.id })}
            >
                <Text style={styles.postTitle}>{item.title.rendered}</Text>
                <Text style={styles.postDate}>Last modified: {item.modified} UTC</Text>
            </TouchableOpacity>
        );
    };

    return (
        <DataListScreen
            loading={loading}
            data={data}
            refreshing={refreshing}
            renderItem = {renderItem}
            onRefresh={onRefresh}
        />
    );
};

export default PagesScreen;
