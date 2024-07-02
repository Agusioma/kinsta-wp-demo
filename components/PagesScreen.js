// screens/PagesScreen.js
import React from 'react';
import {View, Text, FlatList, RefreshControl, ActivityIndicator, TouchableOpacity} from 'react-native';
import styles from '../styles/listingstyling'; // Adjust styling if necessary
import fetchData from './utils/fetchData';
import DataListScreen from "./utils/DataListScreen";
import {useNavigation} from "@react-navigation/native";
import AsyncStorage from "@react-native-async-storage/async-storage";

const PagesScreen = () => {
    const cacheReadChooserString = "pages"
    const { data, loading, refreshing, onRefresh } = fetchData('https://887-41-80-116-93.ngrok-free.app/wordpress/wp-json/wp/v2/pages', cacheReadChooserString); // Replace with your endpoint URL
    const navigation = useNavigation();

    const cachePages = async () => {
        try {
            await AsyncStorage.setItem(`pages_cache`, JSON.stringify(data));
        } catch (error) {
            console.error('Error storing in the cache:', error);
        }
    };

    cachePages()

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
