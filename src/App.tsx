import { SafeAreaView, StatusBar, StyleSheet } from 'react-native'
import React, { useContext } from 'react'
import Toast from 'react-native-toast-message'
import { RootNavigator } from './navigation';
import { LeaderboardToast } from './components';
import { AppDataContext } from './context';

export default function App() {
  const { appTheme } = useContext(AppDataContext);

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
      <StatusBar barStyle={appTheme.primary == '#1b2c3d' ? 'dark-content' : 'light-content'} backgroundColor={appTheme.secondary} />
      <RootNavigator />
      <Toast config={toastConfig} />
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
})
