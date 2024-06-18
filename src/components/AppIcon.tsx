import { Image, StyleSheet, View } from 'react-native'
import React, { useMemo } from 'react'
import { useResponsiveDimensions } from '../hooks';

export const AppIcon = () => {

    const { wp, hp } = useResponsiveDimensions()

    const styles = useMemo(() => {
        return StyleSheet.create({
            imageContainer: {
                marginBottom: hp(2),
            },
        });
    }, [hp, wp]);

    return (
        <View style={styles.imageContainer}>
            <Image style={{ width: hp(130), height: hp(130) }} source={require('../assets/images/app_icon.png')} />
        </View>
    )
}