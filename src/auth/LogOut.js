import { ToastAndroid } from 'react-native';
import SCREENS from '../assets/constants/SCREENS';
import AsyncStorage from '@react-native-async-storage/async-storage';

export const LogOut = async (navigation) => {
  try {
   
    await AsyncStorage.removeItem('sessionActive');

    
    navigation.navigate(SCREENS.SPLASHSCREEN);

    
    ToastAndroid.show('You have logged out successfully!', ToastAndroid.SHORT);
  } catch (error) {
    console.error('Logout error:', error);
    ToastAndroid.show('Something went wrong. Please try again.', ToastAndroid.SHORT);
  }
};