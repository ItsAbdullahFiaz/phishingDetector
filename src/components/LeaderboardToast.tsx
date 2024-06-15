import { View, Text, StyleSheet } from "react-native";
import React, { useContext, useMemo } from "react";
import { useResponsiveDimensions } from "../hooks";
import { OTHER_COLORS } from "../enums";
import { AppDataContext } from "../context";

interface LeaderboardToastProps {
    text1: string,
    text2: string,
    type: string
}

export const LeaderboardToast = (props: LeaderboardToastProps) => {
    const { text1, text2, type } = props
    const { hp, wp } = useResponsiveDimensions();
    const { appLang, appTheme } = useContext(AppDataContext);

    const styles = useMemo(() => {
        return StyleSheet.create({
            box_style: {
                width: "90%",
                flexDirection: "row",
                paddingVertical: hp(19),
                paddingHorizontal: hp(16),
                borderRadius: hp(16),
                zIndex: 999,
            },
            toast_text: {
                fontSize: hp(14),
                color: appTheme.secondary,
                fontFamily: "Poppins-Medium",
                paddingLeft: hp(16),
            },
            toast_textTwo: {
                fontSize: hp(13),
                color: appTheme.secondary,
                fontFamily: "Poppins",
                paddingLeft: hp(16),
                paddingTop: hp(9),
            },
        });
    }, [wp, hp]);

    const boxColor = type == "successLeaderboard" ? OTHER_COLORS.green : OTHER_COLORS.red;
    const isSuccess = type == "successLeaderboard";
    return (
        <View style={[styles.box_style, { backgroundColor: boxColor }]}>
            {/* {isSuccess ? <SVGSuccess /> : <SVGAlert />} */}
            <View>
                <Text style={styles.toast_text}>{text1}</Text>
                {text2 && <Text style={styles.toast_textTwo}>{text2}</Text>}
            </View>
        </View>
    );
};
