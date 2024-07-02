import {StatusBar} from 'expo-status-bar';
import React, {useCallback, useEffect, useState} from 'react';
import {View, Text, FlatList, StyleSheet, RefreshControl, ActivityIndicator} from 'react-native';
import styles from '../styles/listingstyling';
import fetchData from "./utils/fetchData";

const PostsScreen = () => {
    const { data, loading, refreshing, onRefresh } = fetchData('https://8877-41-80-116-93.ngrok-free.app/wordpress/wp-json/wp/v2/posts'); // Replace with your endpoint URL

    const renderItem = ({ item }) => (
        <View style={styles.postContainer}>
            <Text style={styles.postTitle}>{item.title.rendered}</Text>
            <Text style={styles.postDate}>Last modified: {item.modified} UTC</Text>
        </View>
    );

    return (
        <View style={styles.container}>
            {loading ? (
                <ActivityIndicator size="large" color="#0000ff" />
            ) : (
                <FlatList
                    data={data}
                    keyExtractor={(item) => item.id.toString()}
                    renderItem={renderItem}
                    refreshControl={
                        <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
                    }
                />
            )}
        </View>
    );
};

export default PostsScreen;
