import React from 'react';
import fetchData from "./utils/fetchData";
import DataListScreen from "./utils/DataListScreen";
import {Text, TouchableOpacity} from "react-native";
import styles from "../styles/listingstyling";
import {useNavigation} from "@react-navigation/native";

const PostsScreen = () => {
    const { data, loading, refreshing, onRefresh } = fetchData('https://8877-41-80-116-93.ngrok-free.app/wordpress/wp-json/wp/v2/posts');
    const navigation = useNavigation();
    const renderItem = ({ item }) => {
        return (
            <TouchableOpacity
                style={styles.postContainer}
                onPress={() => navigation.navigate('PageDetails', { postId: item.id })}
            >
                <Text style={styles.postTitle}>{item.title.rendered}</Text>
                <Text style={styles.postDate}>Last modified: {item.modified} UTC</Text>
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
