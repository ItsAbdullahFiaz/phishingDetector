import React from 'react';
import { createDrawerNavigator } from '@react-navigation/drawer';
import { SCREENS } from '../enums';
import { HomeScreen } from '../views/screens';

const Drawer = createDrawerNavigator();

export const DrawerStack = () => {
    return (
        <Drawer.Navigator screenOptions={{ headerShown: false }}>
            <Drawer.Screen name={SCREENS.HOME} component={HomeScreen} />
        </Drawer.Navigator>
    )
}
