import React, { useEffect, useState } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { predictUrl } from '../../services/Predict';
import HistoryList from '../../components/HistoryList';
import CustomInput from '../../components/CustomInput';
import MainButton from '../../components/MainButton';
import MainHeading from '../../components/MainHeading';
import MainContainer from '../../components/MainContainer';
import AppIcon from '../../components/AppIcon';
import BannerAds from '../../components/BannerAds';
import { useInterstitialAds } from '../../hooks/useInterstitialAd';
import validator from 'validator';
import { useToast } from '../../hooks/useToast';

const App = () => {
    const [url, setUrl] = useState('');
    const [predictionStatus, setPredictionStatus] = useState(false);
    const [loading, setLoading] = useState(false);
    const [storedUrls, setStoredUrls] = useState<{ url: string, status: boolean }[]>([]);
    const [storeSwitch, setStoreSwitch] = useState(false)
    const { showInterstitialAd, adEnded, reloadInterstitialAd } = useInterstitialAds();
    const showToast = useToast();

    useEffect(() => {
        loadStoredUrls();
    }, []);

    useEffect(() => {
        if (url != '') {
            storeUrlStatus();
        }
    }, [storeSwitch]);

    useEffect(() => {
        if (adEnded) {
            handlePredict()
            reloadInterstitialAd()
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
                console.log(updatedUrls);
            }
        } catch (error) {
            console.error('Error storing URL status:', error);
        }
    };

    const handleOnPress = () => {
        const isValid = validator.isURL(url);

        if (!isValid) {
            showToast('Invalid URL', 'errorToast', url)
        } else {
            showInterstitialAd()
        }
    }

    return (
        <MainContainer>
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