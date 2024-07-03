import 'react-native-gesture-handler';
import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import PostsScreen from './components/PostsScreen';
import PagesScreen from "./components/PagesScreen";
import {createNativeStackNavigator} from "@react-navigation/native-stack";
import PostDetailsScreen from "./components/PostDetailsScreen";
import PageDetailsScreen from "./components/PageDetailsScreen"; // Import your PostsScreen


const Tab = createBottomTabNavigator();
const Stack = createNativeStackNavigator()


const MainTabNavigator = () => (
    <Tab.Navigator
        screenOptions={({ route }) => ({
            tabBarIcon: ({ focused, color, size }) => {
                let iconName;

                if (route.name === 'Pages') {
                    iconName = 'list-alt';
                } else if (route.name === 'Posts') {
                    iconName = 'tasks';
                }

                return <FontAwesome name={iconName} size={size} color={color} />;
            },
            tabBarActiveTintColor: "#b30e0d",
            tabBarInactiveTintColor: "gray",
            tabBarStyle: {
                display: "flex"
            },
        })}
    >
        <Tab.Screen name="Pages" component={PagesScreen} />
        <Tab.Screen name="Posts" component={PostsScreen} />
    </Tab.Navigator>
);

const App = () => {
    return (
        <NavigationContainer>
            <Stack.Navigator>
                <Stack.Screen
                    name="Main"
                    component={MainTabNavigator}
                    options={{ headerShown: false }} // Hide header for the main tab navigator
                />
                <Stack.Screen
                    name="PostDetails"
                    component={PostDetailsScreen}
                    options={{ title: 'Post Details' }} // Example of setting a header title
                />
                <Stack.Screen
                    name="PageDetails"
                    component={PageDetailsScreen}
                    options={{ title: 'Page Details' }} // Example of setting a header title
                />
            </Stack.Navigator>
        </NavigationContainer>
    );
};

export default App;
