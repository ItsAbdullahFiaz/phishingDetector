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
            setAdEnded(true)
            interstitial.load();
        };

        const onError = (error: any) => {
            console.error('Error loading interstitial ad:', error);
            setAdEnded(true);
        };

        const unsubscribeLoaded = interstitial.addAdEventListener(AdEventType.LOADED, () => {});
        const unsubscribeClosed = interstitial.addAdEventListener(AdEventType.CLOSED, onEnd);
        const unsubscribeError = interstitial.addAdEventListener(AdEventType.ERROR, onError);

        interstitial.load();

        return () => {
            unsubscribeLoaded();
            unsubscribeClosed();
            unsubscribeError();
        };
    }, []);

    const showInterstitialAd = () => {
        try {
            interstitial.show();
        } catch (error: any) {
            console.error('Error showing interstitial ad:', error);
            setAdEnded(true)
        }
    };

    return { showInterstitialAd, adEnded, setAdEnded };
}
