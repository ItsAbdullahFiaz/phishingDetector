import React, { useEffect, useState } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { predictUrl } from '../../services/Predict';
import auth from '@react-native-firebase/auth';
import { resetAndGo } from '../../utils/Helpers';
import { useNavigation } from '@react-navigation/native';
import HistoryList from '../../components/HistoryList';
import CustomInput from '../../components/CustomInput';
import MainButton from '../../components/MainButton';
import MainHeading from '../../components/MainHeading';
import MainContainer from '../../components/MainContainer';
import IconButton from '../../components/IconButton';
import AppIcon from '../../components/AppIcon';

const App = () => {
    const [url, setUrl] = useState('');
    const [predictionStatus, setPredictionStatus] = useState(false);
    const [loading, setLoading] = useState(false);
    const [storedUrls, setStoredUrls] = useState<{ url: string, status: boolean }[]>([]);
    const [storeSwitch, setStoreSwitch] = useState(false)

    const navigation = useNavigation()

    useEffect(() => {
        loadStoredUrls();
    }, []);

    useEffect(() => {
        if (url != '') {
            storeUrlStatus();
        }
    }, [storeSwitch]);

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

    const handleLogout = async () => {
        try {
            await auth().signOut();
            await AsyncStorage.removeItem('urlHistory');
            resetAndGo(navigation, 'LoginScreen', null)
        } catch (error) {
            console.log(error);
        }
    };

    return (
        <MainContainer>
            <IconButton onPress={handleLogout} icon='sign-out' />
            <AppIcon />
            <MainHeading heading='Phishing Detector' />
            {/* <Text style={[headings.h8, { color: 'red', textAlign: 'center', marginBottom: 8 }]}>
                This application was developed by abdCodes for a client who has not yet paid for the service.
                Any unauthorized use or replication of this application is strictly prohibited.
            </Text> */}
            <CustomInput
                value={url}
                setValue={setUrl}
                placeholder='Enter URL'
                secureTextEntry={false}
                textWrong=''
                bottomError={false}
            />
            <MainButton
                onPress={handlePredict}
                buttonText='Predict'
                disableBtn={url.length < 4}
                isLoading={loading}
            />
            <HistoryList storedUrls={storedUrls} setStoredUrls={setStoredUrls} />
        </MainContainer>
    );
};

export default App;