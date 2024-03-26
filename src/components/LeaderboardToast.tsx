import { View, Text, StyleSheet } from "react-native";
import React, { useMemo } from "react";
import useResponsiveDimensions from "../utils/useResponsiveDimensions";
import { Colors } from "../utils/StyleGuide";

const LeaderboardToast = ({ text1, text2, type }: { text1: string, text2: string, type: string }) => {
    const { hp, wp } = useResponsiveDimensions();

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
                color: Colors.white,
                fontFamily: "PoppinsMedium",
                paddingLeft: hp(16),
            },
            toast_textTwo: {
                fontSize: hp(12),
                color: Colors.white,
                fontFamily: "Poppins",
                paddingLeft: hp(16),
                paddingTop: hp(9),
            },
        });
    }, [wp, hp]);

    const boxColor = type == "successLeaderboard" ? Colors.green : Colors.red;
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

export default LeaderboardToast;
