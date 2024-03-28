import { StatusBar } from 'expo-status-bar';
import { Text, View } from 'react-native';
import AppNavigation from './navigation/AppNavigation';


export default function App() {
  return (
    <View className='flex-1'>
      <StatusBar style="auto" />
      <AppNavigation />
    </View>

  );
}

