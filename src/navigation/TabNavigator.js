
import * as React from 'react';
import { Image } from 'react-native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import SCREENS from '../assets/constants/SCREENS';
import COLORS from '../assets/constants/COLORS';
import Home from '../home/Home';
import Movies from '../screens/movies/Movies';
import Music from '../screens/music/Music';
import MovieScreen from '../components/MovieScreen';
import Person from '../components/Person';
import Search from '../components/Search';
import SeeAll from '../components/SeeAll';


const TabNavigator = ({route={}}) => {

  const initialTab = route.params?.screen || 'TabHome';


    const Tab = createBottomTabNavigator();
    return (
      <Tab.Navigator initialRouteName={initialTab}>
      
        <Tab.Screen
          name='TabHome'
          component={Home}
          options={{
            headerShown: false,
            title: 'Home',
            tabBarIcon: ({focused}) => (
              
              <Image source={require('../assets/images/homepage.png')} style={{ height: 30, width: 30,
                tintColor : focused? COLORS.GREEN: COLORS.GREY_LIGHT,
               }} />
            
            ),
            tabBarActiveTintColor : COLORS.BLACK,
            tabBarInactiveTinTColor : COLORS.GREEN,
            
          }}
        />
        
       
        <Tab.Screen
          name='MovieStackScreen'
          component={MovieStackScreen}
          options={{
            headerShown: false,
            title: 'Movies',
            tabBarIcon: ({focused}) => (
              <Image source={require('../assets/images/Tv_logo.png')} style={{ height: 30, width: 30,
                tintColor : focused? COLORS.GREEN: COLORS.GREY_LIGHT,
               }} 
              
              />
            ),
            tabBarActiveTintColor : COLORS.BLACK,
            tabBarInactiveTinTColor : COLORS.GREY_LIGHT,
  
          }}
        />
  
  
        <Tab.Screen
          name={SCREENS.MUSIC}
          component={Music}
          options={{
            headerShown: false,
            title: 'Music',
            tabBarIcon: ({focused}) => (
                focused?
              <Image source={require('../assets/images/spotify.png')} style={{ height: 30, width: 30 }} />
              :  <Image source={require('../assets/images/spotify2.png')} style={{ height: 30, width: 30 }} />
            ),
            tabBarActiveTintColor : COLORS.BLACK,
            tabBarInactiveTinTColor : COLORS.GREEN,
          }}
        />
      </Tab.Navigator>
    );

  };

const MovieStack = createNativeStackNavigator();
const MovieStackScreen = () => (
 

  <MovieStack.Navigator>

    <MovieStack.Screen
          name={SCREENS.MOVIES}
          component={Movies}
          options={{ headerShown: false }} 
        />
    <MovieStack.Screen
      name={SCREENS.MOVIESCREEN}
      component={MovieScreen}
      options={{ headerShown: false}} 
    />

    <MovieStack.Screen
       name={SCREENS.PERSON}
       component={Person}
       options={{ headerShown: false, tabBarStyle: { display: 'flex' },  tabBarVisible: true, }}
        />

    <MovieStack.Screen
          name={SCREENS.SEEALL}
          component={SeeAll}
          options={{ headerShown: false }}
        />

<MovieStack.Screen
          name={SCREENS.SEARCH}
          component={Search}
          options={{ headerShown: false }}
        />


    
  </MovieStack.Navigator>
)
export default TabNavigator;