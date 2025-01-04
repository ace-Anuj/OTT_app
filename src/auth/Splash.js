import React, { useEffect } from 'react'
import { Image,View,Text } from 'react-native';
import * as Animatable from 'react-native-animatable';
import SCREENS from '../assets/constants/SCREENS';
import { getData } from './Authorization';
import { useNavigation } from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useFocusEffect } from '@react-navigation/native';
import { StatusBar } from 'react-native';
import { theme } from '../assets/constants/THEME';

const Splash = () => {


   useFocusEffect(
     React.useCallback(() => {
       StatusBar.setBarStyle('light-content'); 
       StatusBar.setBackgroundColor(theme.transparent);
     }, [])
   );
   
const navigation=useNavigation();
   useEffect(() => {

      const checkSession = async () => {
         try {
            const sessionActive = await AsyncStorage.getItem('sessionActive');

            setTimeout(()=>{
               if (sessionActive) {
       
                  navigation.navigate(SCREENS.DRAWER); 
                } else {
                  navigation.navigate(SCREENS.SPLASHSCREEN); 
                }
                
            },3000);
       
            
         } catch (error) {
            console.log('error in sigining to splashsceen or drawer' , error)
            
         }
        
      };
    
      checkSession();
    }, []);
  return (
   <>

    <StatusBar
           translucent
           backgroundColor={theme.transparent} 
           barStyle="light-content" 
       />
   
    <View style={[{backgroundColor: "black"}, {flex: 1}, {alignItems: 'center'}, {justifyContent: 'center'}]}>
    <View style={[{border: 3}, {padding: 34}, {height: 150, width: 150}, {alignItems: 'center'}, {backgroundColor: "black"},]}>
       <Animatable.Image
          style={{ width: 150, height: 150 }}
          animation='zoomIn'
          duration = {2000}
          resizeMode="contain" 
          source={require('../assets/images/ottlogo.jpg')}
       />
    </View>
 </View>
 </>
  )
}
export default Splash