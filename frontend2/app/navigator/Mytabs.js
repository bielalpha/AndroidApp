import * as React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import SettingsScreen from '../components/SettingsScreen'
import HomeScreen from '../components/HomeScreen'
import TabBar from '../components/TabBar'

const Tab = createBottomTabNavigator();

function MyTabs() {
    return (
        <Tab.Navigator tabBar={props => <TabBar {...props} initialParams={{ icon: 'home' }} />}>
            <Tab.Screen name="Home" component={HomeScreen} initialParams={{ icon: 'home' }}/>
            <Tab.Screen name="Settings" component={SettingsScreen} initialParams={{ icon: 'cog' }}/>
        </Tab.Navigator>
    );
}

export default MyTabs;