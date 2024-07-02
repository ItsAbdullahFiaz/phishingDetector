// screens/PrivacyPolicyScreen.js
import React, { useContext, useMemo } from 'react';
import { ScrollView, Text, StyleSheet } from 'react-native';
import { useResponsiveDimensions } from '../../../hooks';
import { AppDataContext } from '../../../context';
import { OTHER_TEXT_STYLE } from '../../../enums';
import { Header, MainContainer } from '../../../components';

export const PrivacyPolicy = () => {
    const { wp, hp } = useResponsiveDimensions();
    const { appTheme } = useContext(AppDataContext);

    const styles = useMemo(() => {
        return StyleSheet.create({
            heading: {
                ...OTHER_TEXT_STYLE.large_title,
                color: appTheme.textColor,
                fontSize: hp(24),
                marginBottom: hp(20),
            },
            subheading: {
                ...OTHER_TEXT_STYLE.large_title,
                color: appTheme.textColor,
                fontSize: hp(18),
                marginTop: hp(20),
            },
            text: {
                ...OTHER_TEXT_STYLE.caption,
                color: appTheme.textColor,
                fontSize: hp(16),
                lineHeight: hp(24),
            },
        });
    }, [hp, wp]);

    return (
        <MainContainer>
            <Header />
            <ScrollView>
                <Text style={styles.heading}>Privacy Policy</Text>
                <Text style={styles.text}>
                    We value your privacy and are committed to protecting your personal data. This Privacy Policy explains what information we collect, how we use it, and your rights regarding your data.
                </Text>
                <Text style={styles.subheading}>1. Information We Collect</Text>
                <Text style={styles.text}>
                    We may collect URLs you submit for analysis, usage data, and device information.
                </Text>
                <Text style={styles.subheading}>2. How We Use Your Data</Text>
                <Text style={styles.text}>
                    We use the data to provide predictions, improve our machine learning model, and enhance user experience.
                </Text>
                <Text style={styles.subheading}>3. Data Sharing</Text>
                <Text style={styles.text}>
                    We do not share your data with third parties except for service providers who assist us in operating the app.
                </Text>
                <Text style={styles.subheading}>4. Your Rights</Text>
                <Text style={styles.text}>
                    You have the right to access, correct, or delete your data. Contact us at [contact information] to exercise these rights.
                </Text>
                <Text style={styles.subheading}>5. Data Security</Text>
                <Text style={styles.text}>
                    We implement appropriate security measures to protect your data from unauthorized access.
                </Text>
            </ScrollView>
        </MainContainer>
    );
};
