import React from 'react';
import { Text, TouchableOpacity} from 'react-native';
import styles from '../styles/listingstyling';
import fetchData from './utils/fetchData';
import DataListScreen from "./utils/DataListScreen";
import {useNavigation} from "@react-navigation/native";
import AsyncStorage from "@react-native-async-storage/async-storage";

const PagesScreen = () => {
    const cacheReadChooserString = "pages"
    const { data, loading, refreshing, onRefresh } = fetchData('http://localhost:3000/wordpress/wp-json/wp/v2/pages', cacheReadChooserString);
    const navigation = useNavigation();

    //caching the pages
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
                style={styles.listItemContainer}
                onPress={() => navigation.navigate('PageDetails', { pageId: item.id })}
            >
                <Text style={styles.listItemTitle}>{item.title.rendered}</Text>
                <Text style={styles.listItemDate}>Last modified: {item.modified} UTC</Text>
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
