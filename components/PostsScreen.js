import React from 'react';
import fetchData from "./utils/fetchData";
import DataListScreen from "./utils/DataListScreen";
import {Text, TouchableOpacity} from "react-native";
import styles from "../styles/listingstyling";
import {useNavigation} from "@react-navigation/native";
import AsyncStorage from "@react-native-async-storage/async-storage";

const PostsScreen = () => {
    const cacheReadChooserString = "posts"
    const { data, loading, refreshing, onRefresh } = fetchData('http://localhost:3000/wordpress/wp-json/wp/v2/posts', cacheReadChooserString);
    const navigation = useNavigation();

    //caching the posts

    const cachePosts = async () => {
        try {
            await AsyncStorage.setItem(`posts_cache`, JSON.stringify(data));
        } catch (error) {
            console.error('Error storing in the cache:', error);
        }
    };

    cachePosts()

    const renderItem = ({ item }) => {
        return (
            <TouchableOpacity
                style={styles.listItemContainer}
                onPress={() => navigation.navigate('PageDetails', { postId: item.id })}
            >
                <Text style={styles.listItemTitle}>{item.title.rendered}</Text>
                <Text style={styles.listItemDate}>Last modified: {item.modified} UTC</Text>
            </TouchableOpacity>
        );
    };

    return (
        <DataListScreen
            loading={loading}
            renderItem = {renderItem}
            data={data}
            refreshing={refreshing}
            onRefresh={onRefresh}
        />
    );
};

export default PostsScreen;
