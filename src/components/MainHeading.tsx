import { Text, View } from 'react-native'
import React, { useMemo } from 'react'
import useResponsiveDimensions from '../utils/useResponsiveDimensions';
import { headings, primaryColor } from '../utils/StyleGuide';

export default function MainHeading({ heading }: { heading: string }) {

    const { wp, hp } = useResponsiveDimensions()

    const styles = useMemo(() => {
        return {
            headingContainer: {
                marginBottom: hp(16),
            },
            heading: {
                color: primaryColor,
                fontSize: hp(22)
            }
        };
    }, [hp, wp]);
    return (
        <View style={styles.headingContainer}>
            <Text style={[headings.h1, styles.heading]}>{heading}</Text>
        </View>
    )
}