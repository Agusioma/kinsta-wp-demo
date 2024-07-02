// PostDetailsScreen.js
import React, { useEffect, useState } from 'react';
import {View, Text, ActivityIndicator, StyleSheet, ScrollView, useWindowDimensions, RefreshControl} from 'react-native';
import { useRoute } from '@react-navigation/native';
import RenderHTML from "react-native-render-html";
import styles from "../styles/detailstylings";
import useFetchPostDetails from "./utils/useFetchPostDetails";
import { LogBox } from 'react-native';

const PostDetailsScreen = () => {

    //LogBox.ignoreLogs(['Warning: ...']);
    const route = useRoute();
    const { postId } = route.params;
    const baseUrl = "https://8877-41-80-116-93.ngrok-free.app/wordpress/wp-json/wp/v2/posts"
    const { post, loading, refreshing, onRefresh } = useFetchPostDetails(baseUrl, postId);
    const {width} = useWindowDimensions();

    if (loading) {
        return (
            <View style={styles.loadingContainer}>
                <ActivityIndicator size="large" color="#0000ff" />
            </View>
        );
    }

    return (
        <ScrollView
            style={styles.container}
            refreshControl={
                <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
            }
        >
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
