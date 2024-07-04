import React from 'react';
import {ScrollView, Text, RefreshControl} from 'react-native';
import RenderHTML from 'react-native-render-html';
import styles from '../../styles/detailstylings';

const DetailsContent = ({data, refreshing, onRefresh, width}) => {
    console.log(data)
    return (
        <ScrollView
            style={styles.container}
            refreshControl={<RefreshControl refreshing={refreshing} onRefresh={onRefresh}/>}
        >
            <Text style={styles.title}>{data.title.rendered}</Text>
            <Text style={styles.date}>Published: {data.date} UTC</Text>
            <Text style={styles.date}>Last Modified: {data.modified} UTC</Text>
            <Text style={styles.slug}>Slug: {data.slug}</Text>
            <Text style={styles.status}>Status: {data.status}</Text>
            <RenderHTML source={{html: data.content.rendered}} contentWidth={width}/>
        </ScrollView>
    );
};

export default DetailsContent;
