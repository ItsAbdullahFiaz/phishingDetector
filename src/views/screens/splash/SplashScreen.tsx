import React, { useEffect } from 'react'
import { useNavigation } from '@react-navigation/native';
import { AppIcon, MainContainer, MainHeading } from '../../../components';
import { resetAndGo } from '../../../utils';
import { STACK } from '../../../enums';

export const SplashScreen = () => {

    const navigation = useNavigation()

    useEffect(() => {
        setTimeout(() => {
            resetAndGo(navigation, STACK.MAIN, null);
        }, 2000);
    }, [navigation]);

    return (
        <MainContainer>
            <AppIcon />
            <MainHeading heading='Phishing Detector' />
        </MainContainer>
    )
}