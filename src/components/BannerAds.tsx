import { StyleSheet, View } from 'react-native'
import React, { useMemo } from 'react'
import { BannerAdSize, BannerAd, TestIds } from 'react-native-google-mobile-ads';
import { useResponsiveDimensions } from '../hooks';

const adUnitId = __DEV__ ? TestIds.BANNER : 'ca-app-pub-2994186406049200/4486141897';

export const BannerAds = () => {
    const { wp, hp } = useResponsiveDimensions();

    const styles = useMemo(() => {
        return StyleSheet.create({
            adContainer: {
                marginVertical: hp(8)
            },
        });
    }, [hp, wp]);

    return (
        <View>
            <View style={styles.adContainer}>
                <BannerAd
                    size={BannerAdSize.BANNER}
                    unitId={adUnitId}
                    onAdLoaded={() => {
                        console.log('Advert loaded');
                    }}
                    onAdFailedToLoad={error => {
                        console.error('Advert failed to load: ', error);
                    }}
                />
            </View>
        </View>
    )
}