// PostDetailsScreen.js
import React, { useEffect, useState } from 'react';
import {View, Text, ActivityIndicator, StyleSheet, ScrollView, useWindowDimensions} from 'react-native';
import { useRoute } from '@react-navigation/native';
import RenderHTML from "react-native-render-html";
import styles from "../styles/detailstylings";

const PostDetailsScreen = () => {
    const route = useRoute();
    const { postId } = route.params;
    const [post, setPost] = useState(null);
    const [loading, setLoading] = useState(true);
    const {width} = useWindowDimensions();

    useEffect(() => {
        const fetchPostDetails = async () => {
            try {
                const response = await fetch(`https://8877-41-80-116-93.ngrok-free.app/wordpress/wp-json/wp/v2/posts/${postId}`);
                const data = await response.json();
                setPost(data);
                setLoading(false);
            } catch (error) {
                console.error('Error fetching post details:', error);
                setLoading(false);
            }
        };

        fetchPostDetails();
    }, [postId]);

    if (loading) {
        return (
            <View style={styles.loadingContainer}>
                <ActivityIndicator size="large" color="#0000ff" />
            </View>
        );
    }

    return (
        <ScrollView style={styles.container}>
            <Text style={styles.title}>{post.title.rendered}</Text>
            <Text style={styles.date}>Published: {new Date(post.date).toLocaleString()}</Text>
            <Text style={styles.date}>Last Modified: {new Date(post.modified).toLocaleString()}</Text>
            <Text style={styles.slug}>Slug: {post.slug}</Text>
            <Text style={styles.status}>Status: {post.status}</Text>
            <RenderHTML source={{ html: post.content.rendered }} contentWidth={width} />
        </ScrollView>
    );
};

export default PostDetailsScreen;
