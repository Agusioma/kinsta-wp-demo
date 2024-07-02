import React from 'react';
import {View, Text, FlatList, RefreshControl, ActivityIndicator, TouchableOpacity} from 'react-native';
import styles from "../../styles/listingstyling";

const DataListScreen = ({loading, data, refreshing, onRefresh, renderItem}) => {

    return (
        <View style={styles.container}>
            {loading ? (
                <ActivityIndicator size="large" color="#0000ff"/>
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
