import React from 'react';
import { createDrawerNavigator } from '@react-navigation/drawer';
import { SCREENS } from '../enums';
import { HomeScreen } from '../views/screens';
import { CustomDrawer } from '../components';

const Drawer = createDrawerNavigator();

export const DrawerStack = () => {
    return (
        <Drawer.Navigator
            screenOptions={{ headerShown: false }}
            drawerContent={props => <CustomDrawer {...props} />}
        >
            <Drawer.Screen name={SCREENS.HOME} component={HomeScreen} />
        </Drawer.Navigator>
    )
}
