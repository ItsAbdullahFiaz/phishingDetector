import { SafeAreaView, StatusBar, StyleSheet } from 'react-native'
import React from 'react'
import { MainStack } from './src/navigation/Navigation'
import Toast from 'react-native-toast-message'
import LeaderboardToast from './src/components/LeaderboardToast';
import { secondryColor } from './src/utils/StyleGuide';

export default function App() {
  const toastConfig = {
    successToast: ({ text1, text2 }: { text1: string, text2: string }) => (
      <LeaderboardToast text1={text1} text2={text2} type="successLeaderboard" />
    ),
    errorToast: ({ text1, text2 }: { text1: string, text2: string }) => (
      <LeaderboardToast
        text1={text1}
        text2={text2}
        type="errorLeaderboard"
      />
    ),
  };

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle='dark-content' backgroundColor={secondryColor} />
      <MainStack />
      <Toast config={toastConfig} />
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
})
