import { View, TextInput, ViewStyle, TouchableOpacity, Text } from 'react-native'
import React, { useMemo, useState } from 'react'
import useResponsiveDimensions from '../utils/useResponsiveDimensions';
import { Colors, headings, primaryColor, primaryLight } from '../utils/StyleGuide';
import Icon from 'react-native-vector-icons/Ionicons';

const CustomInput = ({ value, setValue, placeholder, secureTextEntry, textWrong, bottomError }: { value: string, setValue: (text: string) => void, placeholder: string, secureTextEntry: boolean, textWrong: string | boolean, bottomError: boolean }) => {
    const [isSecure, setSecure] = useState(true);

    const { wp, hp } = useResponsiveDimensions();

    const styles = useMemo(() => {
        return {
            container: {
                marginBottom: bottomError ? hp(4) : hp(26)
            },
            inputView: {
                flexDirection: 'row' as ViewStyle['flexDirection'],
                justifyContent: 'space-between' as ViewStyle['justifyContent'],
                alignItems: 'center' as ViewStyle['alignItems'],
                backgroundColor: primaryLight,
                borderRadius: hp(8),
                borderWidth: 1,
                borderColor: Colors.transparent,
            },
            input: {
                color: Colors.black,
                fontSize: hp(14),
                height: hp(46),
                width: '100%' as ViewStyle['width'],
                paddingLeft: hp(16),
                marginTop: hp(4),
            },
            wrongTextContainer: {
                height: bottomError ? hp(24) : undefined,
            },
            titleWrong: {
                color: Colors.red,
                marginTop: hp(5),
                fontSize: hp(12)
            },
            btnRight: {
                padding: hp(10),
                width: '10%' as ViewStyle['width'],
                alignItems: 'center' as ViewStyle['alignItems'],
            },
        };
    }, [hp, wp]);

    return (
        <View style={styles.container}>
            <View style={styles.inputView}>
                <TextInput
                    onChangeText={setValue}
                    style={[headings.h4, styles.input, secureTextEntry && { width: "90%" }, { paddingRight: secureTextEntry ? 0 : 16 }]}
                    value={value}
                    placeholderTextColor={primaryColor}
                    placeholder={placeholder}
                    secureTextEntry={secureTextEntry ? isSecure : false}
                />
                {secureTextEntry && (
                    <TouchableOpacity
                        onPress={() => setSecure(!isSecure)}
                        style={styles.btnRight}
                        hitSlop={{ top: 10, bottom: 10, left: 10, right: 10 }}
                    >
                        <Icon name={isSecure ? "eye-off-outline" : "eye-outline"} size={14} color={primaryColor} />
                    </TouchableOpacity>
                )}
            </View>
            <View style={styles.wrongTextContainer}>
                {textWrong && <Text style={[headings.h7, styles.titleWrong]}>{textWrong}</Text>}
            </View>
        </View>
    )
}

export default CustomInput;