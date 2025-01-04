import * as React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import SCREENS from '../assets/constants/SCREENS';
import Movies from '../screens/movies/Movies';
import Splash from '../auth/Splash';
import SignUp from '../auth/SignUp';
import SplashScreen from '../auth/SplashScreen';
import SignIn from '../auth/SignIn';
import { enableScreens } from 'react-native-screens';
import MovieScreen from '../components/MovieScreen';
import Person from '../components/Person';
import Search from '../components/Search';
import SeeAll from '../components/SeeAll';
import DrawerNavigator from './DrawerNavigator';
import Profile from './Profile';


enableScreens();



const Stack = createNativeStackNavigator();



const Navigation = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName={SCREENS.SPLASH}>

      <Stack.Screen
          name= {SCREENS.SPLASH}
          component={Splash}
          options={{ headerShown: false }}
        />
         <Stack.Screen
          name={SCREENS.SIGNUP}
          component={SignUp}
          options={{ headerShown: false }}
        />
         <Stack.Screen
          name={SCREENS.SPLASHSCREEN}
          component={SplashScreen}
          options={{ headerShown: false }}
        />
       
        <Stack.Screen
          name={SCREENS.SIGNIN}
          component={SignIn}
          options={{ headerShown: false }}
        />

          <Stack.Screen
          name={SCREENS.PERSON}
          component={Person}
          options={{ headerShown: false, tabBarStyle: { display: 'flex' },  tabBarVisible: true, }}
        />

        
          <Stack.Screen
          name={SCREENS.SEARCH}
          component={Search}
          options={{ headerShown: false }}
        />

          <Stack.Screen
          name={SCREENS.MOVIESCREEN}
          component={MovieScreen}
          options={{ headerShown: false, tabBarStyle: { display: 'flex' },  tabBarVisible: true,}} 
        />

         <Stack.Screen
          name={SCREENS.MOVIES}
          component={Movies}
          options={{ headerShown: false }} 
        />
        <Stack.Screen
          name={SCREENS.SEEALL}
          component={SeeAll}
          options={{ headerShown: false }}
        />

    <Stack.Screen
     name={SCREENS.DRAWER}
     component={DrawerNavigator}
  options={{ headerShown: false }}
   />

<Stack.Screen
     name={SCREENS.PROFILE}
     component={Profile} 
  options={{ headerShown: false }}
   />
     
      </Stack.Navigator>
    
    </NavigationContainer>
  )
}

  
export default Navigation