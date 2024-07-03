import React from 'react';
import { View, ActivityIndicator } from 'react-native';
import styles from '../../styles/detailstylings';

const DetailScreenLoadingIndicator = ({ loading }) => {
    if (!loading) return null;

    return (
        <View style={styles.loadingContainer}>
            <ActivityIndicator size="large" color="#0000ff" />
        </View>
    );
};

export default DetailScreenLoadingIndicator;
