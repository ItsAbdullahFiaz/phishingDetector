import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { STACK } from '../enums';
import { DrawerStack } from '.';

const Stack = createNativeStackNavigator();

export const MainStack = () => {
    return (
        <Stack.Navigator screenOptions={{ headerShown: false }}>
            <Stack.Screen name={STACK.DRAWER} component={DrawerStack} />
        </Stack.Navigator>
    )
}
