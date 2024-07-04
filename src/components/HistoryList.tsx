import { FlatList, Platform, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React, { useContext, useMemo } from 'react'
import AsyncStorage from '@react-native-async-storage/async-storage';
import { OTHER_TEXT_STYLE, OTHER_COLORS, GREYSCALE_COLORS } from '../enums';
import { useResponsiveDimensions } from '../hooks';
import { AppDataContext } from '../context';
import { AnyIcon, IconType } from '.';

interface HistoryListProps {
    storedUrls: any,
    setStoredUrls: any
}

export const HistoryList = (props: HistoryListProps) => {
    const { storedUrls, setStoredUrls } = props
    const storedUrlslength = storedUrls.length
    const { wp, hp } = useResponsiveDimensions();
    const { appLang, appTheme } = useContext(AppDataContext);

    const deleteUrl = async (itemUrl: string) => {
        const updatedUrls = storedUrls.filter((item: { url: string, status: boolean }) => item.url !== itemUrl);
        await AsyncStorage.setItem('urlHistory', JSON.stringify(updatedUrls));
        setStoredUrls(updatedUrls);
    };

    const renderItem = ({ item, index }: { item: { url: string, status: boolean }, index: number }) => (
        <View style={[{ borderBottomWidth: storedUrlslength - 1 == index ? 0 : hp(0.5) }, styles.listItem]}>
            <Text numberOfLines={1} style={styles.urlText}>{item.url}</Text>
            <Text style={[styles.status, { color: item.status ? OTHER_COLORS.green : appTheme.error }]}>
                {item.status ? appLang.safe : appLang.phishing}
            </Text>
            <TouchableOpacity onPress={() => deleteUrl(item.url)}>
                <AnyIcon
                    type={IconType.Octicons}
                    name='diff-removed'
                    size={hp(16)}
                    color={GREYSCALE_COLORS.grey600}
                />
            </TouchableOpacity>
        </View>
    );

    const emptyComponent = () => (
        <View style={styles.emptyContainer}>
            <AnyIcon
                type={IconType.MaterialCommunityIcons}
                name='history'
                size={hp(40)}
                color={appTheme.primary}
            />
            <Text style={styles.emptyText}>{appLang.no_history}</Text>
        </View>
    )

    const styles = useMemo(() => {
        return StyleSheet.create({
            historyContainer: {
                // flex: 1,
                height: hp(Platform.OS === 'android' ? 400 : 340),
                marginTop: hp(26),
                backgroundColor: storedUrlslength !== 0 ? appTheme.primaryLight : appTheme.secondary,
                borderRadius: 8,
                borderWidth: 1,
                borderColor: OTHER_COLORS.tansparentPrimary,
                width: '100%'
            },
            listItem: {
                flexDirection: 'row',
                justifyContent: 'space-between',
                alignItems: 'center',
                paddingVertical: hp(12),
                paddingHorizontal: wp(16),
                borderColor: GREYSCALE_COLORS.grey300,
            },
            urlText: {
                ...OTHER_TEXT_STYLE.caption,
                fontSize: hp(16),
                color: appTheme.textColor,
                width: "60%"
            },
            emptyView: {
                flex: 1,
                justifyContent: 'center',
                alignItems: 'center'
            },
            emptyContainer: {
                alignItems: 'center',
            },
            status: {
                ...OTHER_TEXT_STYLE.caption,
                fontSize: hp(14)
            },
            emptyIcon: {
                marginTop: hp(50)
            },
            emptyText: {
                ...OTHER_TEXT_STYLE.caption,
                fontSize: hp(16),
                color: appTheme.primary,
            },
            deleteButton: {
                color: OTHER_COLORS.red
            }
        });
    }, [hp, wp, storedUrls, appTheme]);

    return (
        <View style={styles.historyContainer}>
            <FlatList
                contentContainerStyle={storedUrlslength === 0 ? styles.emptyView : null}
                data={storedUrls}
                renderItem={renderItem}
                showsVerticalScrollIndicator={false}
                ListEmptyComponent={emptyComponent}
            />
        </View>
    )
}