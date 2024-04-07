import { FlatList, Text, TouchableOpacity, View, ViewStyle } from 'react-native'
import React, { useMemo } from 'react'
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Colors, headings, primaryColor, primaryLight, secondryColor } from '../utils/StyleGuide';
import useResponsiveDimensions from '../utils/useResponsiveDimensions';

export default function HistoryList({ storedUrls, setStoredUrls }: any) {
    const { wp, hp } = useResponsiveDimensions();

    const deleteUrl = async (itemUrl: string) => {
        const updatedUrls = storedUrls.filter((item: { url: string, status: boolean }) => item.url !== itemUrl);
        await AsyncStorage.setItem('urlHistory', JSON.stringify(updatedUrls));
        setStoredUrls(updatedUrls);
    };

    const renderItem = ({ item }: { item: { url: string, status: boolean } }) => (
        <View style={styles.listItem}>
            <Text numberOfLines={1} style={[headings.h2, styles.urlText]}>{item.url}</Text>
            <Text style={[headings.h3, { color: item.status ? Colors.green : Colors.red }]}>
                {item.status ? 'Safe' : 'Phishing'}
            </Text>
            <TouchableOpacity onPress={() => deleteUrl(item.url)}>
                <Icon name="delete" size={22} color={Colors.red} />
            </TouchableOpacity>
        </View>
    );

    const emptyComponent = () => (
        <View style={styles.emptyContainer}>
            <Icon style={styles.emptyIcon} name='history' size={40} color={primaryColor} />
            <Text style={[headings.h4, styles.emptyText]}>No history available</Text>
        </View>
    )

    const styles = useMemo(() => {
        return {
            historyContainer: {
                flex: 1,
                marginTop: hp(50),
                backgroundColor: primaryLight,
                borderRadius: 8,
                borderWidth: 1,
                borderColor: Colors.transparent,
                width: '100%' as ViewStyle['width']
            },
            listItem: {
                flexDirection: 'row' as ViewStyle['flexDirection'],
                justifyContent: 'space-between' as ViewStyle['justifyContent'],
                alignItems: 'center' as ViewStyle['alignItems'],
                paddingVertical: hp(12),
                paddingHorizontal: wp(16),
                borderBottomWidth: 1,
                borderColor: Colors.lightgrey,
            },
            urlText: {
                fontSize: hp(16),
                color: Colors.dark,
                width: "60%" as ViewStyle['width']
            },
            emptyContainer: {
                alignItems: 'center' as ViewStyle['alignItems'],
            },
            emptyIcon: {
                marginTop: hp(50)
            },
            emptyText: {
                fontSize: hp(16),
                color: primaryColor,
            },
            deleteButton: {
                color: Colors.red
            }
        };
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