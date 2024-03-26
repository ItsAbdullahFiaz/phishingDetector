import { StyleSheet, Text, View } from 'react-native'
import React, { useEffect } from 'react'
import auth from '@react-native-firebase/auth';
import { resetAndGo } from '../../utils/Helpers';
import { useNavigation } from '@react-navigation/native';
import AppIcon from '../../components/AppIcon';
import MainContainer from '../../components/MainContainer';
import MainHeading from '../../components/MainHeading';

export default function SplashScreen() {

    const navigation = useNavigation()

    function onAuthStateChanged(user: any) {
        setTimeout(() => {
            if (user) {
                resetAndGo(navigation, 'MainStack', null)
            } else {
                resetAndGo(navigation, 'LoginScreen', null)
            }
        }, 2000);
    }

    useEffect(() => {
        const subscriber = auth().onAuthStateChanged(onAuthStateChanged);
        return subscriber; // unsubscribe on unmount
    }, []);

    return (
        <MainContainer>
            <AppIcon />
            <MainHeading heading='Phishing Detector' />
        </MainContainer>
    )
}

const styles = StyleSheet.create({})