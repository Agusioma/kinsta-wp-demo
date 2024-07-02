import React from 'react';
import fetchData from "./utils/fetchData";
import DataListScreen from "./utils/DataListScreen";

const PostsScreen = () => {
    const { data, loading, refreshing, onRefresh } = fetchData('https://8877-41-80-116-93.ngrok-free.app/wordpress/wp-json/wp/v2/posts'); // Replace with your endpoint URL

    return (
        <DataListScreen
            loading={loading}
            data={data}
            refreshing={refreshing}
            onRefresh={onRefresh}
        />
    );
};

export default PostsScreen;
