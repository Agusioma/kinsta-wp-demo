import React from 'react';
import {View, FlatList, RefreshControl, ActivityIndicator } from 'react-native';
import styles from "../../styles/listingstyling";

const DataListScreen = ({loading, data, refreshing, onRefresh, renderItem}) => {

    return (
        <View style={styles.container}>
            {loading ? (
                <View style={styles.loadingContainer}>
                    <ActivityIndicator size="large" color="#0000ff"/>
                </View>
            ) : (
                <FlatList
                    data={data}
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

export default DataListScreen;
