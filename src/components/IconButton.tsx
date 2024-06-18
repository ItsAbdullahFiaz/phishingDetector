import { StyleSheet, TouchableOpacity } from 'react-native'
import React, { useContext, useMemo } from 'react'
import { OTHER_TEXT_STYLE } from '../enums';
import { useResponsiveDimensions } from '../hooks';
import { AppDataContext } from '../context';
import { AnyIcon, IconType } from '.';

interface IconButtonProps {
    icon: string;
    onPress: () => void
}

export const IconButton = (props: IconButtonProps) => {
    const { icon, onPress } = props
    const { wp, hp } = useResponsiveDimensions();
    const { appTheme } = useContext(AppDataContext);

    const styles = useMemo(() => {
        return StyleSheet.create({
            IconContainer: {
                alignSelf: "flex-end",
                alignItems: 'center',
                height: hp(50)
            },
            IconText: {
                ...OTHER_TEXT_STYLE.caption,
                color: appTheme.primary,
                fontSize: hp(16)
            }
        });
    }, [hp, wp]);
    return (
        <TouchableOpacity style={styles.IconContainer} onPress={onPress}>
            <AnyIcon
                type={IconType.Ionicons}
                name={icon}
                size={hp(28)}
                color={appTheme.primary}
            />
            {/* <Text style={styles.IconText}>Share App</Text> */}
        </TouchableOpacity>
    )
}