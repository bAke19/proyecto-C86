import * as React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';

import DrawerNavigator from './navigation/DrawerNavigator';
import LoginScreen from './screens/LoginScreen';
import RegisterScreen from './screens/RegisterScreen';

const StackN = createStackNavigator();

const LoginNavigator = () => {
  return(
    <StackN.Navigator  screenOptions={{
        headerShown: false,
        gestureEnabled: false
      }}>
      <StackN.Screen name='LoginScreen' component={LoginScreen}/>
      <StackN.Screen name='RegisterScreen' component={RegisterScreen}/>
      <StackN.Screen name='Dashboard' component={DrawerNavigator}/>
    </StackN.Navigator>
  )
}

export default function App() {
  return (
    <NavigationContainer>
      <LoginNavigator/>
    </NavigationContainer>
  );
}

