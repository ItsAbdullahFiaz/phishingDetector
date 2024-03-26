import { StyleSheet } from 'react-native';
import useResponsiveDimensions from './useResponsiveDimensions';

// const { wp, hp } = useResponsiveDimensions();
// const primaryColor = '#232D3F'
const primaryColor = '#005B41'
const secondryColor = '#d9dfea'
const primaryDim = '#e4fff7'
const secondryDim = '#b3bfd5'
const primaryLight = '#F6F9FB'
const headingColor = "#000000";
const textColorDim = "#BBBBBB"
const transparent = "#00000000"
const white = "#FFFFFF"
const BackGroundColor = "#FCFCFC"
const normalFont = "Mullish-Regular"
const mediumFont = "Mullish-Medium"
const boldFont = "Mullish-Bold"
const mediumFont2 = "GothicA1-Medium"

const textFont = { fontFamily: normalFont }
const mediumTextFont = { fontFamily: mediumFont }
const boldTextFont = { fontFamily: boldFont }
const mediuTextFont2 = { fontFamily: mediumFont2 }

const Colors = {
    Camel: "#EB6F4D",
    Pink: "#EC6480",
    orange: "#F5AC50",
    Purple: "#6777ED",
    Sky: "#5AB9FC",
    gray: "#7F9191",
    dark: "#1D1F33",
    lightgrey: "#EDEDED",
    black: "#000000",
    green: "#339966",
    white: "#FFFFFF",
    darkblue: '#2a19ee',
    red: "#C64A47",
    transparent: "transparent"
}

const headings = StyleSheet.create({
    h1: { fontFamily: 'GothicA1-Medium', color: headingColor },
    h1b: { fontFamily: 'GothicA1-Bold', color: headingColor },
    h2: { fontFamily: 'GothicA1-Medium', color: headingColor },
    h2b: { fontFamily: 'GothicA1-Bold', color: headingColor, fontSize: 16 },
    h2M: { fontFamily: 'Mulish-Medium', color: headingColor, fontSize: 16 },
    h2Mb: { fontFamily: 'Mulish-Bold', color: headingColor, fontSize: 16 },
    h3: { fontFamily: 'Mulish-Medium', color: headingColor },
    h3drawer: { fontFamily: 'Mulish-Bold', fontSize: 14 },
    h3b: { fontFamily: 'Mulish-Bold', color: headingColor, fontSize: 14 },
    h4: { fontFamily: 'GothicA1-Medium', color: textColorDim },
    h4b: { fontFamily: 'GothicA1-Bold', color: textColorDim, fontSize: 12 },
    h5: { fontFamily: 'Mulish-Medium', color: textColorDim},
    h5b: { fontFamily: 'Mulish-Bold', color: textColorDim, fontSize: 11 },
    h6: { ...textFont, fontSize: 14, color: Colors.darkblue },
    h6b: { ...textFont, fontSize: 14, color: textColorDim, },
    h7: { fontFamily: 'GothicA1-Medium', color: textColorDim },
    h7b: { fontFamily: 'GothicA1-Bold', fontSize: 12, color: headingColor, },
    h8: { fontFamily: 'Mulish-Medium', fontSize: 11, color: headingColor, lineHeight: 14 },
    h9: { fontFamily: 'Mulish-Medium', fontSize: 10, color: headingColor, lineHeight: 14 },

})
const ActiveOpacity = 0.8

const shadow = StyleSheet.create({
    whiteShadow: {
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 3,
        },
        shadowOpacity: 0.27,
        shadowRadius: 4.65,

        elevation: 6,
    }
})

export { textFont, ActiveOpacity, boldTextFont, mediumFont, textColorDim, secondryColor, white, mediumTextFont, primaryColor, primaryLight, primaryDim, secondryDim, headings, shadow, transparent, Colors, BackGroundColor };

