import { StyleSheet, Text, TouchableOpacity, View, ViewStyle } from 'react-native'
import React, { useMemo } from 'react'
import Icon from 'react-native-vector-icons/Ionicons';
import { headings, primaryColor } from '../utils/StyleGuide';
import useResponsiveDimensions from '../utils/useResponsiveDimensions';

export default function IconButton({ icon, onPress }: { icon: string; onPress: () => void }) {
    const { wp, hp } = useResponsiveDimensions();

    const styles = useMemo(() => {
        return {
            IconContainer: {
                alignSelf: "flex-end" as ViewStyle['alignSelf'],
                alignItems: 'center' as ViewStyle['alignItems'],
                height: hp(50)
            },
            IconText: {
                color: primaryColor,
                fontSize: hp(16)
            }
        };
    }, [hp, wp]);
    return (
        <TouchableOpacity style={styles.IconContainer} onPress={onPress}>
            <Icon name={icon} size={hp(28)} color={primaryColor} />
            <Text style={[headings.h4, styles.IconText]}>Share App</Text>
        </TouchableOpacity>
    )
}

const styles = StyleSheet.create({})