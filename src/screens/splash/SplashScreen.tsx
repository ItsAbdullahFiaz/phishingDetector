import React, { useEffect } from 'react'
import { resetAndGo } from '../../utils/Helpers';
import { useNavigation } from '@react-navigation/native';
import AppIcon from '../../components/AppIcon';
import MainContainer from '../../components/MainContainer';
import MainHeading from '../../components/MainHeading';

export default function SplashScreen() {

    const navigation = useNavigation()

    useEffect(() => {
        setTimeout(() => {
            resetAndGo(navigation, 'HomeScreen', null)
        }, 2000);
    }, []);

    return (
        <MainContainer>
            <AppIcon />
            <MainHeading heading='Phishing Detector' />
        </MainContainer>
    )
}