import { StatusBar } from 'expo-status-bar';
import React, {useEffect, useState} from 'react';
import {FlatList, StyleSheet, Text, View} from 'react-native';

const App = () => {
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const response = await fetch('https://8877-41-80-116-93.ngrok-free.app/wordpress/wp-json/wp/v2/posts');
        const data = await response.json();
        setPosts(data);
      } catch (error) {
        console.error('Error fetching posts:', error);
      }
    };

    fetchPosts();
  }, []);

  const renderItem = ({ item }) => (
      <View style={styles.postContainer}>
        <Text style={styles.postTitle}>{item.title.rendered}</Text>
        <Text style={styles.postDate}>Modified: {item.modified}</Text>
      </View>
  );

  return (
      <View style={styles.container}>
        <FlatList
            data={posts}
            keyExtractor={(item) => item.id.toString()}
            renderItem={renderItem}
        />
      </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#fff',
  },
  postContainer: {
    marginBottom: 20,
    padding: 20,
    backgroundColor: '#f9f9f9',
    borderRadius: 5,
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowRadius: 5,
    shadowOffset: { width: 0, height: 2 },
  },
  postTitle: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  postDate: {
    marginTop: 10,
    fontSize: 14,
    color: '#666',
  },
});

export default App;
