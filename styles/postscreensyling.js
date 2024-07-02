import { StyleSheet } from 'react-native';

export default StyleSheet.create({
    container: {
        flex: 1,
        padding: 20,
        backgroundColor: '#fff',
    },
    title: {
        fontSize: 24,
        fontWeight: 'bold',
        marginBottom: 20,
        color: '#b30e0d'
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
        color: '#5c1a1b'
    },
    postDate: {
        marginTop: 10,
        fontSize: 14,
        color: '#666',
    },
});
