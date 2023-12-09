import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';

import MainNavigatoion from './navigations/MainNavigation';
import HomeScreen from './screens/MainScreen/HomeScreen';

export default function App() {
  return (
    <MainNavigatoion/>
    // <HomeScreen/>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
