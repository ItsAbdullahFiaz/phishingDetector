import { Text, TouchableOpacity, ViewStyle } from 'react-native'
import React, { useMemo } from 'react'
import { headings, primaryColor, secondryDim, textColorDim } from '../utils/StyleGuide';
import useResponsiveDimensions from '../utils/useResponsiveDimensions';
import { DotIndicator } from 'react-native-indicators'

type MainButtonProps = {
    onPress: () => Promise<void>;
    buttonText: string;
    disableBtn: boolean;
    isLoading: boolean;
};

export default function MainButton({ onPress, buttonText, disableBtn, isLoading }: MainButtonProps) {
    const { wp, hp } = useResponsiveDimensions();

    const styles = useMemo(() => {
        return {
            button: {
                alignSelf: "center" as ViewStyle['alignSelf'],
                width: "100%" as ViewStyle['width'],
                flexShrink: 1,
                paddingVertical: hp(12),
                paddingHorizontal: wp(24),
                borderRadius: hp(8),
                backgroundColor: disableBtn || isLoading ? secondryDim : primaryColor,
                alignItems: "center" as ViewStyle['alignItems'],
                justifyContent: "center" as ViewStyle['justifyContent'],
                height: hp(50),
            },
            buttonText: {
                color: "white",
                fontSize: hp(16),
                marginHorizontal: wp(8),
                flexGrow: 0,
                flexShrink: 0,
            },
            activityIndicator: {
                flexGrow: 0,
                flexShrink: 0,
            },
        };
    }, [hp, wp, disableBtn, isLoading]);

    return (
        <TouchableOpacity style={styles.button} onPress={onPress} disabled={disableBtn}>
            {!isLoading ?
                <Text style={[headings.h2, styles.buttonText]}>{buttonText}</Text> :
                <DotIndicator color={primaryColor} size={hp(10)} />
            }
        </TouchableOpacity>
    )
}