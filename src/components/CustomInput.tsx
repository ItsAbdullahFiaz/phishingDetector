import { View, TextInput, TouchableOpacity, Text, StyleSheet } from 'react-native';
import React, { useContext, useMemo, useState } from 'react';
import Clipboard from '@react-native-clipboard/clipboard';
import { useResponsiveDimensions } from '../hooks';
import { OTHER_COLORS, OTHER_TEXT_STYLE } from '../enums';
import { AppDataContext } from '../context';
import { AnyIcon, IconType } from '.';

interface CustomInputProps {
    value: string,
    setValue: (text: string) => void,
    placeholder: string,
    secureTextEntry?: boolean,
    textWrong: string | boolean,
    bottomError: boolean,
    pasteButton?: boolean
}

export const CustomInput = (props: CustomInputProps) => {
    const { value, setValue, placeholder, secureTextEntry, textWrong, bottomError, pasteButton } = props
    const [isSecure, setSecure] = useState(true);
    const { appTheme } = useContext(AppDataContext);
    const { wp, hp } = useResponsiveDimensions();

    const styles = useMemo(() => {
        return StyleSheet.create({
            container: {
                marginBottom: bottomError ? hp(4) : hp(26)
            },
            inputView: {
                flexDirection: 'row',
                justifyContent: 'space-between',
                alignItems: 'center',
                backgroundColor: appTheme.primaryLight,
                borderRadius: hp(8),
                borderWidth: 1,
                borderColor: OTHER_COLORS.tansparentPrimary,
            },
            input: {
                ...OTHER_TEXT_STYLE.caption,
                color: appTheme.textColor,
                fontSize: hp(14),
                height: hp(46),
                width: '100%',
                paddingLeft: hp(16),
                marginTop: hp(4),
            },
            wrongTextContainer: {
                height: bottomError ? hp(24) : undefined,
            },
            titleWrong: {
                ...OTHER_TEXT_STYLE.caption,
                color: OTHER_COLORS.red,
                marginTop: hp(5),
                fontSize: hp(12)
            },
            btnRight: {
                padding: hp(10),
                width: '10%',
                alignItems: 'center',
            },
        });
    }, [hp, wp, appTheme]);

    const handlePaste = async () => {
        const clipboardText = await Clipboard.getString();
        setValue(clipboardText);
    };

    return (
        <View style={styles.container}>
            <View style={styles.inputView}>
                <TextInput
                    onChangeText={setValue}
                    style={[styles.input, (secureTextEntry || pasteButton) && { width: "90%" }, { paddingRight: pasteButton || secureTextEntry ? 0 : 16 }]}
                    value={value}
                    placeholderTextColor={appTheme.primary}
                    placeholder={placeholder}
                    secureTextEntry={secureTextEntry ? isSecure : false}
                />
                {(pasteButton || secureTextEntry) && (
                    <TouchableOpacity
                        onPress={() => { secureTextEntry ? setSecure(!isSecure) : handlePaste() }}
                        style={styles.btnRight}
                        hitSlop={{ top: 10, bottom: 10, left: 10, right: 10 }}
                    >
                        <AnyIcon
                            type={IconType.MaterialCommunityIcons}
                            name={secureTextEntry ? (isSecure ? "eye-off-outline" : "eye-outline") : 'content-paste'}
                            size={hp(18)}
                            color={appTheme.primary}
                        />
                    </TouchableOpacity>
                )}
            </View>
            <View style={styles.wrongTextContainer}>
                {textWrong && <Text style={styles.titleWrong}>{textWrong}</Text>}
            </View>
        </View>
    )
}