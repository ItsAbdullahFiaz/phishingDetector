import { Text, TouchableOpacity, View, ViewStyle } from 'react-native'
import React, { useMemo } from 'react'
import useResponsiveDimensions from '../utils/useResponsiveDimensions';
import { headings, primaryColor } from '../utils/StyleGuide';

export default function TextWithLink({ onPress, text, buttonText }: { onPress: () => void, text: string, buttonText: string }) {

    const { wp, hp } = useResponsiveDimensions()

    const styles = useMemo(() => {
        return {
            container: {
                flexDirection: 'row' as ViewStyle['flexDirection'],
                marginTop: 50,
            },
            button: {
                color: primaryColor,
                fontSize: hp(14)
            }
        };
    }, [hp, wp]);

    return (
        <View style={styles.container}>
            <Text style={headings.h3}>{text}</Text>
            <TouchableOpacity onPress={onPress}>
                <Text style={[headings.h3, styles.button]}> {buttonText}</Text>
            </TouchableOpacity>
        </View>
    )
}