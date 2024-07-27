import React, { useContext, useEffect, useState } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import validator from 'validator';
import { useNetworkStatus, useToast } from '../../../hooks';
import { predictUrl } from '../../../services';
import { AppIcon, CustomInput, Header, HistoryList, MainButton, MainContainer, MainHeading } from '../../../components';
import { AppDataContext } from '../../../context';

export const HomeScreen = () => {
    const { appLang } = useContext(AppDataContext);
    const [url, setUrl] = useState('');
    const [predictionStatus, setPredictionStatus] = useState(false);
    const [loading, setLoading] = useState(false);
    const [storedUrls, setStoredUrls] = useState<{ url: string, status: boolean }[]>([]);
    const [storeSwitch, setStoreSwitch] = useState(false);
    // const [adCounter, setAdCounter] = useState(0);
    // const { showInterstitialAd, adEnded, setAdEnded } = useInterstitialAds();
    const showToast = useToast();
    const networkStatus = useNetworkStatus();
    const responseErrorList = { phishing_url: appLang.phishing_url, safe_url: appLang.safe_url, error_request: appLang.error_request }

    useEffect(() => {
        loadStoredUrls();
    }, []);

    useEffect(() => {
        if (url !== '') {
            storeUrlStatus();
        }
    }, [storeSwitch]);

    // useEffect(() => {
    //     if (adEnded && url) {
    //         setAdCounter(prevCounter => prevCounter + 1);
    //         handlePredict();
    //         setAdEnded(false);
    //     }
    // }, [adEnded]);

    const loadStoredUrls = async () => {
        try {
            const storedData = await AsyncStorage.getItem('urlHistory');
            if (storedData) {
                setStoredUrls(JSON.parse(storedData));
            }
        } catch (error) {
            console.error('Error loading stored URLs:', error);
        }
    };

    const handlePredict = async () => {
        await predictUrl(url, setLoading, setPredictionStatus, storeSwitch, setStoreSwitch, responseErrorList);
    };

    const storeUrlStatus = async () => {
        try {
            const updatedUrls = [...storedUrls];
            const urlExists = updatedUrls.some((item) => item.url === url);

            if (!urlExists) {
                updatedUrls.unshift({ url, status: predictionStatus });
                await AsyncStorage.setItem('urlHistory', JSON.stringify(updatedUrls));
                setStoredUrls(updatedUrls);
            }
            setUrl('')
        } catch (error) {
            console.error('Error storing URL status:', error);
        }
    };

    const handleOnPress = () => {
        const isValid = validator.isURL(url);

        if (!isValid) {
            showToast(appLang.invalid_url, 'errorToast', url.length > 40 ? url.substring(0, 40) + '...' : url);
        } else if (!networkStatus) {
            showToast(appLang.no_internet, 'errorToast', appLang.check_connection);
        }
        // else if (adCounter === 0 || adCounter % 3 === 0) {
        //     showInterstitialAd();
        // }
        else {
            handlePredict();
            // setAdCounter(prevCounter => prevCounter + 1);
        }
    };

    return (
        <MainContainer disableJustifyContent={true} >
            <Header />
            <AppIcon />
            <MainHeading heading='Phishing Detector' />
            <CustomInput
                value={url}
                setValue={setUrl}
                placeholder={appLang.enter_url}
                textWrong=''
                bottomError={false}
                pasteButton={true}
            />
            <MainButton
                onPress={handleOnPress}
                buttonText={appLang.predict}
                disableBtn={url.length < 4}
                isLoading={loading}
            />
            <HistoryList storedUrls={storedUrls} setStoredUrls={setStoredUrls} />
            {/* <BannerAds /> */}
        </MainContainer>
    );
};