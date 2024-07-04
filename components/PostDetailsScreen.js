import React  from 'react';
import {View, ActivityIndicator, useWindowDimensions } from 'react-native';
import { useRoute } from '@react-navigation/native';
import styles from "../styles/detailstylings";
import fetchDetails from "./utils/fetchDetails";
import DetailsContent from "./utils/DetailsContent";
import DetailScreenLoadingIndicator from "./utils/DetailScreenLoadingIndicator";

const PostDetailsScreen = () => {

    const route = useRoute();
    const { postId } = route.params;
    const baseUrl = "http://localhost:3000/wordpress/wp-json/wp/v2/posts"
    const { data, loading, onRefresh } = fetchDetails(baseUrl, postId);
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
            {!loading && <DetailsContent data={data} refreshing={loading} onRefresh={onRefresh} width={width} />}
        </View>
    );
};

export default PostDetailsScreen;
