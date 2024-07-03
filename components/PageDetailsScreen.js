import React from 'react';
import {View, ActivityIndicator, useWindowDimensions } from 'react-native';
import { useRoute } from '@react-navigation/native';
import styles from "../styles/detailstylings";
import useFetchPostDetails from "./utils/useFetchPostDetails";
import { LogBox } from 'react-native';
import PostDetailsContent from "./utils/PostDetailsContent";
import DetailScreenLoadingIndicator from "./utils/DetailScreenLoadingIndicator";

const PageDetailsScreen = () => {

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
        <View style={styles.container}>
            <DetailScreenLoadingIndicator loading={loading} />
            {!loading && <PostDetailsContent post={post} refreshing={loading} onRefresh={onRefresh} width={width} />}
        </View>
    );
};

export default PageDetailsScreen;
