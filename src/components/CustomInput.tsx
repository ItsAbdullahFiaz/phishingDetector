import { View, TextInput, TouchableOpacity, Text, StyleSheet } from 'react-native'
import React, { useContext, useMemo, useState } from 'react'
import Icon from 'react-native-vector-icons/Ionicons';
import { useResponsiveDimensions } from '../hooks';
import { OTHER_COLORS, OTHER_TEXT_STYLE } from '../enums';
import { AppDataContext } from '../context';

interface CustomInputProps {
    value: string,
    setValue: (text: string) => void,
    placeholder: string,
    secureTextEntry: boolean,
    textWrong: string | boolean,
    bottomError: boolean
}

export const CustomInput = (props: CustomInputProps) => {
    const { value, setValue, placeholder, secureTextEntry, textWrong, bottomError } = props
    const [isSecure, setSecure] = useState(true);
    const { appLang, appTheme } = useContext(AppDataContext);
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
    }, [hp, wp]);

    return (
        <View style={styles.container}>
            <View style={styles.inputView}>
                <TextInput
                    onChangeText={setValue}
                    style={[styles.input, secureTextEntry && { width: "90%" }, { paddingRight: secureTextEntry ? 0 : 16 }]}
                    value={value}
                    placeholderTextColor={appTheme.primary}
                    placeholder={placeholder}
                    secureTextEntry={secureTextEntry ? isSecure : false}
                />
                {secureTextEntry && (
                    <TouchableOpacity
                        onPress={() => setSecure(!isSecure)}
                        style={styles.btnRight}
                        hitSlop={{ top: 10, bottom: 10, left: 10, right: 10 }}
                    >
                        <Icon name={isSecure ? "eye-off-outline" : "eye-outline"} size={14} color={appTheme.primary} />
                    </TouchableOpacity>
                )}
            </View>
            <View style={styles.wrongTextContainer}>
                {textWrong && <Text style={styles.titleWrong}>{textWrong}</Text>}
            </View>
        </View>
    )
}