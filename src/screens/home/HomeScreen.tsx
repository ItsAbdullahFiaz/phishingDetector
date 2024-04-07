import React, { useEffect, useState } from 'react';
import { Share } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { predictUrl } from '../../services/Predict';
import HistoryList from '../../components/HistoryList';
import CustomInput from '../../components/CustomInput';
import MainButton from '../../components/MainButton';
import MainHeading from '../../components/MainHeading';
import MainContainer from '../../components/MainContainer';
import AppIcon from '../../components/AppIcon';
import BannerAds from '../../components/BannerAds';
import validator from 'validator';
import useNetworkStatus from '../../hooks/useNetworkStatus';
import IconButton from '../../components/IconButton';
import { useInterstitialAds } from '../../hooks/useInterstitialAd';
import { useToast } from '../../hooks/useToast';

const App = () => {
    const [url, setUrl] = useState('');
    const [predictionStatus, setPredictionStatus] = useState(false);
    const [loading, setLoading] = useState(false);
    const [storedUrls, setStoredUrls] = useState<{ url: string, status: boolean }[]>([]);
    const [storeSwitch, setStoreSwitch] = useState(false);
    const [adCounter, setAdCounter] = useState(0);
    const { showInterstitialAd, adEnded, setAdEnded } = useInterstitialAds();
    const showToast = useToast();
    const networkStatus = useNetworkStatus();

    useEffect(() => {
        loadStoredUrls();
    }, []);

    useEffect(() => {
        if (url !== '') {
            storeUrlStatus();
        }
    }, [storeSwitch]);

    useEffect(() => {
        if (adEnded) {
            setAdCounter(prevCounter => prevCounter + 1);
            handlePredict();
            setAdEnded(false);
        }
    }, [adEnded]);

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
        await predictUrl(url, setLoading, setPredictionStatus, storeSwitch, setStoreSwitch);
    };

    const storeUrlStatus = async () => {
        try {
            const updatedUrls = [...storedUrls];
            const urlExists = updatedUrls.some((item) => item.url === url);

            if (!urlExists) {
                updatedUrls.unshift({ url, status: predictionStatus });
                await AsyncStorage.setItem('urlHistory', JSON.stringify(updatedUrls));
                setStoredUrls(updatedUrls);
                setUrl('')
                console.log(updatedUrls);
            }
        } catch (error) {
            console.error('Error storing URL status:', error);
        }
    };

    const handleOnPress = () => {
        const isValid = validator.isURL(url);

        if (!isValid) {
            showToast('Invalid URL', 'errorToast', url);
        } else if (!networkStatus) {
            showToast('No internet connection!', 'errorToast', 'Check your connection and try again');
        } else if (adCounter === 0 || adCounter % 3 === 0) {
            showInterstitialAd();
        } else {
            handlePredict();
            setAdCounter(prevCounter => prevCounter + 1);
        }
    };

    const handleShare = () => {
        Share.share({
            message: `Protect yourself from online scams with the "Phishing Detector" app! It helps detect phishing attempts in emails, messages, and websites. Download now from Play Store: https://play.google.com/store/apps/details?id=com.phishingdetector&pli=1`
        });
    };

    return (
        <MainContainer>
            <IconButton icon='share-social-sharp' onPress={handleShare} />
            <AppIcon />
            <MainHeading heading='Phishing Detector' />
            <CustomInput
                value={url}
                setValue={setUrl}
                placeholder='Enter URL'
                secureTextEntry={false}
                textWrong=''
                bottomError={false}
            />
            <MainButton
                onPress={handleOnPress}
                buttonText='Predict'
                disableBtn={url.length < 4}
                isLoading={loading}
            />
            <HistoryList storedUrls={storedUrls} setStoredUrls={setStoredUrls} />
            <BannerAds />
        </MainContainer>
    );
};

export default App;