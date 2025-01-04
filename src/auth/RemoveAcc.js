import { ToastAndroid } from 'react-native';
import { removeData, getData } from './Authorization';
import SCREENS from '../assets/constants/SCREENS';

export const RemoveAcc = async (navigation) => {
  try {
    
    await removeData();

    
    const retrievedData = await getData();

    if (!retrievedData.email && !retrievedData.password) {
      
      navigation.navigate(SCREENS.SPLASHSCREEN);

     
      ToastAndroid.show('Account was Deleted!', ToastAndroid.SHORT);
    } else {
     
      ToastAndroid.show('Error during logout. Please try again.', ToastAndroid.SHORT);
    }
  } catch (error) {
   
    console.error('Logout error:', error);
    ToastAndroid.show('Something went wrong. Please try again.', ToastAndroid.SHORT);
  }
};