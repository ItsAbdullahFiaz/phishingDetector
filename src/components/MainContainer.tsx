import { StyleSheet, View, ViewStyle } from 'react-native'
import React, { useMemo } from 'react'
import useResponsiveDimensions from '../utils/useResponsiveDimensions';
import { secondryColor } from '../utils/StyleGuide';

export default function MainContainer({ children }: { children: React.ReactNode }) {
    const { wp, hp } = useResponsiveDimensions();

    const styles = useMemo(() => {
        return {
            container: {
                flex: 1,
                backgroundColor: secondryColor,
                justifyContent: 'center' as ViewStyle['justifyContent'],
                alignItems: 'center' as ViewStyle['alignItems'],
                padding: hp(16),
            },
        };
    }, [hp, wp]);

    return (
        <View style={styles.container}>
            {children}
        </View>
    )
}

const styles = StyleSheet.create({})