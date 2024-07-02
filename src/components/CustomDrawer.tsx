import { StyleSheet, Switch, View, FlatList, Text } from 'react-native'
import React, { useContext, useMemo, useState } from 'react'
import { DrawerContentComponentProps } from '@react-navigation/drawer'
import { useNavigation } from '@react-navigation/native'
import { AnyIcon, AppIcon, ButtonRow, CustomModal, IconType } from '.'
import { AppDataContext, DARK_THEME_MODE, LIGHT_THEME_MODE } from '../context'
import { useResponsiveDimensions } from '../hooks'
import { OTHER_TEXT_STYLE, SCREENS, SIZES } from '../enums'

export const CustomDrawer: React.FC<DrawerContentComponentProps> = (props) => {
    const { appLang, appTheme, setActiveThemeMode, activeThemeMode, setActiveLang, activeLang, langTranslations } = useContext(AppDataContext);
    const { wp, hp } = useResponsiveDimensions();
    const [modalVisible, setModalVisible] = useState(false);
    const navigation = useNavigation()

    const switchTheme = () => {
        if (activeThemeMode === DARK_THEME_MODE) {
            setActiveThemeMode(LIGHT_THEME_MODE);
        } else {
            setActiveThemeMode(DARK_THEME_MODE);
        }
    }

    const switchLanguage = (lang: string) => {
        setActiveLang(lang)
    }

    const renderItem = ({ item, index }: { item: any, index: number }) => {
        return (
            <ButtonRow
                onPress={() => switchLanguage(item.value)}
                title={item.key}
                index={index}
                bgStyle={{ backgroundColor: item.value == activeLang ? appTheme.primary : appTheme.primaryLight }}
                titleStyle={{ color: item.value == activeLang ? appTheme.secondary : appTheme.textColor }}
            />
        )
    }

    const styles = useMemo(() => {
        return StyleSheet.create({
            container: {
                flex: 1,
                alignItems: 'center',
                backgroundColor: appTheme.secondary,
            },
            greeting: {
                ...OTHER_TEXT_STYLE.caption,
                fontSize: hp(16),
                color: appTheme.primary,
                marginBottom: hp(12)
            },
            innerContainer: {
                width: '100%'
            },
            languageRow: {
                paddingHorizontal: hp(6)
            },
            customModalContainer: {
                height: SIZES.height - hp(330)
            }
        });
    }, [wp, hp, appTheme]);

    return (
        <View style={styles.container}>
            <AppIcon />
            <Text style={styles.greeting}>{appLang.greeting}</Text>
            <View style={styles.innerContainer}>

                <ButtonRow
                    onPress={() => navigation.navigate(SCREENS.HOME as never)}
                    contentRight={
                        <AnyIcon
                            type={IconType.AntDesign}
                            name='home'
                            size={hp(24)}
                            color={appTheme.primary}
                        />
                    }
                    contentRightStyle={styles.languageRow}
                    title={'Home'}
                />

                <ButtonRow
                    onPress={switchTheme}
                    contentRight={
                        <Switch
                            trackColor={{
                                false: appTheme.secondary,
                                true: appTheme.secondary,
                            }}
                            thumbColor={appTheme.primary}
                            onValueChange={switchTheme}
                            value={activeThemeMode === DARK_THEME_MODE}
                        />
                    }
                    title={appLang.dark_mode}
                />

                <ButtonRow
                    onPress={() => setModalVisible(true)}
                    contentRight={
                        <AnyIcon
                            type={IconType.Ionicons}
                            name='language-outline'
                            size={hp(24)}
                            color={appTheme.primary}
                        />
                    }
                    contentRightStyle={styles.languageRow}
                    title={appLang.change_lang}
                />

                <ButtonRow
                    onPress={() => navigation.navigate(SCREENS.PRIVACY_POLICY as never)}
                    contentRight={
                        <AnyIcon
                            type={IconType.Ionicons}
                            name='shield-half'
                            size={hp(24)}
                            color={appTheme.primary}
                        />
                    }
                    contentRightStyle={styles.languageRow}
                    title={'Privacy Policy'}
                />

                <ButtonRow
                    onPress={() => navigation.navigate(SCREENS.TERMS as never)}
                    contentRight={
                        <AnyIcon
                            type={IconType.Ionicons}
                            name='document-text-outline'
                            size={hp(24)}
                            color={appTheme.primary}
                        />
                    }
                    contentRightStyle={styles.languageRow}
                    title={'Terms and Conditions'}
                    hideBorder={true}
                />

                <CustomModal
                    visible={modalVisible}
                    onClose={() => setModalVisible(false)}
                    title={appLang.change_lang}
                >
                    <View style={styles.customModalContainer}>
                        <FlatList
                            data={langTranslations}
                            renderItem={renderItem}
                            showsVerticalScrollIndicator={false}
                        />
                    </View>
                </CustomModal>
                {/* <DrawerItemList {...props} /> */}
            </View>
        </View>
    )
}