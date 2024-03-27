import { useEffect, useState } from 'react';
import { InterstitialAd, AdEventType, TestIds } from 'react-native-google-mobile-ads';

const adUnitId = __DEV__ ? TestIds.INTERSTITIAL : 'ca-app-pub-2994186406049200/7148798409';
const interstitial = InterstitialAd.createForAdRequest(adUnitId, {
    keywords: ['sportswear', 'fitness', 'athleisure', 'basketball', 'football', 'baseball', 'soccer', 'tennis', 'running', 'yoga', 'workout'],
});

export function useInterstitialAds() {
    const [adEnded, setAdEnded] = useState(false)
    useEffect(() => {
        const onEnd = () => {
            console.log('Ad ended or closed');
            interstitial.load();
            setAdEnded(true)
        };

        const unsubscribeLoaded = interstitial.addAdEventListener(AdEventType.LOADED, () => {});
        const unsubscribeClosed = interstitial.addAdEventListener(AdEventType.CLOSED, onEnd);

        interstitial.load();

        return () => {
            unsubscribeLoaded();
            unsubscribeClosed();
        };
    }, []);

    const showInterstitialAd = () => {
        interstitial.show();
    };

    const reloadInterstitialAd = () => {
        interstitial.load();
        setAdEnded(false);
    };

    return { showInterstitialAd, adEnded, reloadInterstitialAd };
}
