import { Share, StyleSheet, View } from 'react-native'
import React, { useMemo } from 'react'
import { IconButton } from './IconButton'
import { useNavigation } from '@react-navigation/native'
import { useResponsiveDimensions } from '../hooks'

export const Header = () => {
    const navigation = useNavigation<any>()
    const { wp, hp } = useResponsiveDimensions();

    const handleShare = () => {
        Share.share({
            message: `Protect yourself from online scams with the "Phishing Detector" app! It helps detect phishing attempts in emails, messages, and websites. Download now from Play Store: https://play.google.com/store/apps/details?id=com.phishingdetector&pli=1`
        });
    };

    const styles = useMemo(() => {
        return StyleSheet.create({
            Container: {
                flexDirection: 'row',
                justifyContent: 'space-between',
                width: '100%'
            },
        });
    }, [hp, wp]);

    return (
        <View style={styles.Container}>
            <IconButton icon='menu' onPress={() => navigation.openDrawer()} />
            <IconButton icon='share-social-sharp' onPress={handleShare} />
        </View>
    )
}