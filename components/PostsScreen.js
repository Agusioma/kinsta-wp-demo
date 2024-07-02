import {StatusBar} from 'expo-status-bar';
import React, {useCallback, useEffect, useState} from 'react';
import {View, Text, FlatList, StyleSheet, RefreshControl, ActivityIndicator} from 'react-native';
import styles from '../styles/postscreensyling';

const PostsScreen = () => {
    const [posts, setPosts] = useState([]);
    const [refreshing, setRefreshing] = useState(false);
    const [loading, setLoading] = useState(true);


    const fetchPosts = useCallback(async () => {
        try {
            const response = await fetch('https://8877-41-80-116-93.ngrok-free.app/wordpress/wp-json/wp/v2/posts');
            const data = await response.json();
            setPosts(data);
            setLoading(false); // Stop loading
        } catch (error) {
            console.error('Error fetching posts:', error);
            setLoading(false); // Stop loading in case of error
        }
    }, []);

    useEffect(() => {
        fetchPosts();
        const interval = setInterval(fetchPosts, 5000); // Fetch posts every 60 seconds
        return () => clearInterval(interval); // Clear interval on component unmount
    }, [fetchPosts]);

    const onRefresh = useCallback(async () => {
        setRefreshing(true);
        await fetchPosts();
        setRefreshing(false);
    }, [fetchPosts]);

    const renderItem = ({item}) => (
        <View style={styles.postContainer}>
            <Text style={styles.postTitle}>{item.title.rendered}</Text>
            <Text style={styles.postDate}>Last modified: {item.modified} UTC</Text>
        </View>
    );

    return (
        <View style={styles.container}>
            <Text style={styles.title}>Posts</Text>
            {loading ? (
                <ActivityIndicator size="large" color="#0000ff"/>
            ) : (
                <FlatList
                    data={posts}
                    keyExtractor={(item) => item.id.toString()}
                    renderItem={renderItem}
                    refreshControl={
                        <RefreshControl refreshing={refreshing} onRefresh={onRefresh}/>
                    }
                />
            )}
        </View>
    );
};

export default PostsScreen;
