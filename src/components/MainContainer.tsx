import { StyleSheet, View } from 'react-native'
import React, { useContext, useMemo } from 'react'
import { useResponsiveDimensions } from '../hooks';
import { AppDataContext } from '../context';

interface MainContainerProps {
    children: React.ReactNode
}

export const MainContainer = (props: MainContainerProps) => {
    const { children } = props
    const { wp, hp } = useResponsiveDimensions();
    const { appLang, appTheme } = useContext(AppDataContext);

    const styles = useMemo(() => {
        return StyleSheet.create({
            container: {
                flex: 1,
                backgroundColor: appTheme.secondary,
                justifyContent: 'center',
                alignItems: 'center',
                padding: hp(16),
            },
        });
    }, [hp, wp, appTheme]);

    return (
        <View style={styles.container}>
            {children}
        </View>
    )
}