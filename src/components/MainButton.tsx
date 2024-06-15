import { StyleSheet, Text, TouchableOpacity } from 'react-native'
import React, { useContext, useMemo } from 'react'
import { DotIndicator } from 'react-native-indicators'
import { OTHER_TEXT_STYLE } from '../enums';
import { useResponsiveDimensions } from '../hooks';
import { AppDataContext } from '../context';

interface MainButtonProps {
    onPress: () => void;
    buttonText: string;
    disableBtn: boolean;
    isLoading: boolean;
};

export const MainButton = (props: MainButtonProps) => {
    const { onPress, buttonText, disableBtn, isLoading } = props
    const { wp, hp } = useResponsiveDimensions();
    const { appLang, appTheme } = useContext(AppDataContext);

    const styles = useMemo(() => {
        return StyleSheet.create({
            button: {
                alignSelf: "center",
                width: "100%",
                flexShrink: 1,
                paddingVertical: hp(12),
                paddingHorizontal: wp(24),
                borderRadius: hp(8),
                backgroundColor: disableBtn || isLoading ? appTheme.secondaryBackground : appTheme.primary,
                alignItems: "center",
                justifyContent: "center",
                height: hp(50),
            },
            buttonText: {
                ...OTHER_TEXT_STYLE.caption,
                color: appTheme.secondary,
                fontSize: hp(16),
                marginHorizontal: wp(8),
                flexGrow: 0,
                flexShrink: 0,
            },
            activityIndicator: {
                flexGrow: 0,
                flexShrink: 0,
            },
        });
    }, [hp, wp, isLoading, disableBtn]);

    return (
        <TouchableOpacity style={styles.button} onPress={onPress} disabled={disableBtn}>
            {!isLoading ?
                <Text style={styles.buttonText}>{buttonText}</Text> :
                <DotIndicator color={appTheme.primary} size={hp(10)} />
            }
        </TouchableOpacity>
    )
}