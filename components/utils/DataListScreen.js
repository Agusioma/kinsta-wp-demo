import React from 'react';
import { View, Text, FlatList, RefreshControl, ActivityIndicator } from 'react-native';
import styles from "../../styles/listingstyling";

const renderItem = ({ item }) => (
    <View style={styles.postContainer}>
        <Text style={styles.postTitle}>{item.title.rendered}</Text>
        <Text style={styles.postDate}>Last modified: {item.modified} UTC</Text>
    </View>
);
const DataListScreen = ({ loading, data, refreshing, onRefresh }) => {
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

export default DataListScreen;
