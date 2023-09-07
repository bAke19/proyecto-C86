import * as React from 'react';
import { createStackNavigator } from '@react-navigation/stack';

import TabNavigation from './TabNavigation';
import PostScreen from '../screens/PostScreen';

const Stack = createStackNavigator();

const StackNavigation = () => {
    return (
        <Stack.Navigator initialRouteName='Tabs' screenOptions={{headerShown: false}}>
            <Stack.Screen name='Tabs' component={TabNavigation}/>
            <Stack.Screen name='PostScreen' component={PostScreen}/>
        </Stack.Navigator>
    )
}

export default StackNavigation;