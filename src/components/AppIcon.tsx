import { Image, StyleSheet, View } from 'react-native'
import React, { useMemo } from 'react'
import useResponsiveDimensions from '../utils/useResponsiveDimensions';
import { primaryColor } from '../utils/StyleGuide';

export default function AppIcon() {

    const { wp, hp } = useResponsiveDimensions()

    const styles = useMemo(() => {
        return {
            imageContainer: {
                marginBottom: hp(16),
            },
        };
    }, [hp, wp]);

    return (
        <View style={styles.imageContainer}>
            <Image style={{ width: 130, height: 130 }} source={require('../assets/images/app_icon.png')} />
        </View>
    )
}

const styles = StyleSheet.create({})