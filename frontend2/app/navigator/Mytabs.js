import * as React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import SettingsScreen from '../components/SettingsScreen'
import HomeScreen from '../components/HomeScreen'
import TabBar from '../components/TabBar'
import ProfileNavigator from './ProfileNavigator';
import login from '../login/login'

const Tab = createBottomTabNavigator();

function MyTabs() {
    return (
        <Tab.Navigator tabBar={props => <TabBar {...props} initialParams={{ icon: 'home' }} />}>
            <Tab.Screen name="Home" component={HomeScreen} initialParams={{ icon: 'home' }} />
            <Tab.Screen name="Profile" component={ProfileNavigator} initialParams={{ icon: 'user' }} />
            <Tab.Screen name="Settings" component={SettingsScreen} initialParams={{ icon: 'cog' }} />
            <Tab.Screen name="login" component={login} initialParams={{ icon: 'fantasy-flight-games' }} />
        </Tab.Navigator>
    );
}

export default MyTabs;