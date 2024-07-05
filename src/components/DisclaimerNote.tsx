import { Linking, StyleSheet, Text, View } from 'react-native'
import React, { useContext, useMemo } from 'react'
import { useResponsiveDimensions } from '../hooks';
import { AppDataContext } from '../context';
import { OTHER_COLORS, OTHER_TEXT_STYLE } from '../enums';

export const DisclaimerNote = () => {
    const { appTheme, appLang } = useContext(AppDataContext);
    const { wp, hp } = useResponsiveDimensions()

    const styles = useMemo(() => {
        return StyleSheet.create({
            container: {
                marginTop: hp(18)
            },
            note: {
                ...OTHER_TEXT_STYLE.caption,
                color: appTheme.textColor,
                fontSize: hp(13),
                textAlign: 'center'
            },
            linkText: {
                color: OTHER_COLORS.blue
            }
        });
    }, [hp, wp, appTheme]);

    return (
        <View style={styles.container}>
            <Text style={styles.note}>{appLang.disclaimer_note}<Text style={styles.linkText} onPress={() => Linking.openURL('https://www.kaggle.com/datasets/taruntiwarihp/phishing-site-urls')}>{appLang.this_dataset}.</Text> {appLang.not_accurate}</Text>
        </View>
    )
}