import { FlatList, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React, { useContext, useMemo } from 'react'
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { OTHER_TEXT_STYLE, OTHER_COLORS, GREYSCALE_COLORS } from '../enums';
import { useResponsiveDimensions } from '../hooks';
import { AppDataContext } from '../context';

interface HistoryListProps {
    storedUrls: any,
    setStoredUrls: any
}

export const HistoryList = (props: HistoryListProps) => {
    const { storedUrls, setStoredUrls } = props
    const { wp, hp } = useResponsiveDimensions();
    const { appLang, appTheme } = useContext(AppDataContext);

    const deleteUrl = async (itemUrl: string) => {
        const updatedUrls = storedUrls.filter((item: { url: string, status: boolean }) => item.url !== itemUrl);
        await AsyncStorage.setItem('urlHistory', JSON.stringify(updatedUrls));
        setStoredUrls(updatedUrls);
    };

    const renderItem = ({ item }: { item: { url: string, status: boolean } }) => (
        <View style={styles.listItem}>
            <Text numberOfLines={1} style={styles.urlText}>{item.url}</Text>
            <Text style={[styles.status, { color: item.status ? OTHER_COLORS.green : OTHER_COLORS.red }]}>
                {item.status ? 'Safe' : 'Phishing'}
            </Text>
            <TouchableOpacity onPress={() => deleteUrl(item.url)}>
                <Icon name="delete" size={22} color={OTHER_COLORS.red} />
            </TouchableOpacity>
        </View>
    );

    const emptyComponent = () => (
        <View style={styles.emptyContainer}>
            <Icon style={styles.emptyIcon} name='history' size={40} color={appTheme.primary} />
            <Text style={styles.emptyText}>No history available</Text>
        </View>
    )

    const styles = useMemo(() => {
        return StyleSheet.create({
            historyContainer: {
                flex: 1,
                marginTop: hp(26),
                backgroundColor: appTheme.primaryLight,
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
                borderBottomWidth: 1,
                borderColor: GREYSCALE_COLORS.grey300,
            },
            urlText: {
                ...OTHER_TEXT_STYLE.caption,
                fontSize: hp(16),
                color: appTheme.textColor,
                width: "60%"
            },
            emptyContainer: {
                alignItems: 'center',
            },
            status: {
                ...OTHER_TEXT_STYLE.caption,
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
    }, [hp, wp, setStoredUrls]);

    return (
        <View style={styles.historyContainer}>
            <FlatList
                data={storedUrls}
                renderItem={renderItem}
                showsVerticalScrollIndicator={false}
                ListEmptyComponent={emptyComponent}
            />
        </View>
    )
}