import React from 'react';
import {ScrollView, Text, RefreshControl} from 'react-native';
import RenderHTML from 'react-native-render-html';
import styles from '../../styles/detailstylings';

const DetailsContent = ({post, refreshing, onRefresh, width}) => {
    return (

        <ScrollView
            style={styles.container}
            refreshControl={<RefreshControl refreshing={refreshing} onRefresh={onRefresh}/>}
        >
            <Text style={styles.title}>{post.title.rendered}</Text>
            <Text style={styles.date}>Published: {post.date} UTC</Text>
            <Text style={styles.date}>Last Modified: {post.modified} UTC</Text>
            <Text style={styles.slug}>Slug: {post.slug}</Text>
            <Text style={styles.status}>Status: {post.status}</Text>
            <RenderHTML source={{html: post.content.rendered}} contentWidth={width}/>
        </ScrollView>
    );
};

export default DetailsContent;
