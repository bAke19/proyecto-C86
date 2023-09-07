import * as React from 'react';
import { createDrawerNavigator } from '@react-navigation/drawer';

import StackNavigation from './StackNavigation';
import Profile from '../screens/Profile';
import SingOut from '../screens/SignOut';

const Draw = createDrawerNavigator();

const DrawerNavigator = () => {
    return(
        <Draw.Navigator screenOptions={{headerShown: false}}>
            <Draw.Screen name='Inicio' component={StackNavigation}/>
            <Draw.Screen name='Perfil' component={Profile}/>
            <Draw.Screen name='Cerrar Sesión' component={SingOut}/>
        </Draw.Navigator>
    )
}

export default DrawerNavigator;