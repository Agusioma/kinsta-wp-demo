import 'react-native-gesture-handler';
import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { View, Text } from 'react-native';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import PostsScreen from './components/PostsScreen';
import PagesScreen from "./components/PagesScreen"; // Import your PostsScreen

const Tab = createBottomTabNavigator();

const App = () => {
    return (
        <NavigationContainer>
            <Tab.Navigator
                screenOptions={({ route }) => ({
                    tabBarIcon: ({ focused, color, size }) => {
                        let iconName;

                        if (route.name === 'Pages') {
                            iconName =  'list-alt';
                        } else if (route.name === 'Posts') {
                            iconName = 'tasks' ;
                        }

                        return <FontAwesome name={iconName} size={size} color={color} />;
                    },
                    tabBarActiveTintColor: "#b30e0d",
                    tabBarInactiveTintColor: "gray",
                    tabBarStyle: [
                        {
                            "display": "flex"
                        },
                        null
                    ]
                })}
            >
                <Tab.Screen name="Pages" component={PagesScreen} />
                <Tab.Screen name="Posts" component={PostsScreen} />
            </Tab.Navigator>
        </NavigationContainer>
    );
};

export default App;
