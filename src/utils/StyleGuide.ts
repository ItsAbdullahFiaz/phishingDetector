import { StyleSheet } from 'react-native';
import useResponsiveDimensions from './useResponsiveDimensions';

// const { wp, hp } = useResponsiveDimensions();
// const primaryColor = '#232D3F'
const primaryColor = '#1b2c3d'
const secondryColor = '#dde6f0'
const primaryDim = '#e4fff7'
const secondryDim = '#8baccc'
const primaryLight = '#F6F9FB'
const headingColor = "#000000";
const textColorDim = "#BBBBBB"
const transparent = "#00000000"
const white = "#FFFFFF"
const BackGroundColor = "#FCFCFC"
const normalFont = "Poppins"
const mediumFont = "Poppins-Medium"
const boldFont = "Poppins-Bold"
const mediumFont2 = "Poppins-Medium"

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
    h1: { fontFamily: 'Poppins-Medium', color: headingColor },
    h1b: { fontFamily: 'Poppins-Bold', color: headingColor },
    h2: { fontFamily: 'Poppins-Medium', color: headingColor },
    h2b: { fontFamily: 'Poppins-Bold', color: headingColor, fontSize: 16 },
    h2M: { fontFamily: 'Poppins-Medium', color: headingColor, fontSize: 16 },
    h2Mb: { fontFamily: 'Poppins-Bold', color: headingColor, fontSize: 16 },
    h3: { fontFamily: 'Poppins-Medium', color: headingColor },
    h3drawer: { fontFamily: 'Poppins-Bold', fontSize: 14 },
    h3b: { fontFamily: 'Poppins-Bold', color: headingColor, fontSize: 14 },
    h4: { fontFamily: 'Poppins-Medium', color: textColorDim },
    h4b: { fontFamily: 'Poppins-Bold', color: textColorDim, fontSize: 12 },
    h5: { fontFamily: 'Poppins-Medium', color: textColorDim},
    h5b: { fontFamily: 'Poppins-Bold', color: textColorDim, fontSize: 11 },
    h6: { ...textFont, fontSize: 14, color: Colors.darkblue },
    h6b: { ...textFont, fontSize: 14, color: textColorDim, },
    h7: { fontFamily: 'Poppins-Medium', color: textColorDim },
    h7b: { fontFamily: 'Poppins-Bold', fontSize: 12, color: headingColor, },
    h8: { fontFamily: 'Poppins-Medium', fontSize: 11, color: headingColor, lineHeight: 14 },
    h9: { fontFamily: 'Poppins-Medium', fontSize: 10, color: headingColor, lineHeight: 14 },

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

