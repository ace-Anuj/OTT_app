// Home.js

import React, { useState, useRef, useEffect } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Dimensions, ScrollView, Image } from 'react-native';
import { useFocusEffect, useNavigation } from '@react-navigation/native';
import Add from './Ad';
import { styles } from '../assets/constants/THEME';
import { SafeAreaView } from 'react-native-safe-area-context';
import { trendingAll } from '../api/moviedb';
import DiscoverMovies from '../components/DiscoverMovies';
import SCREENS from '../assets/constants/SCREENS';
import {Bars3CenterLeftIcon, } from 'react-native-heroicons/outline'; 
import { DrawerActions } from '@react-navigation/native';
import { StatusBar } from 'react-native';
import { theme } from '../assets/constants/THEME';


const { width, height } = Dimensions.get('window');

const Home = ({navigation}) => {
  const [isAdVisible, setIsAdVisible] = useState(true);
 
  const[loading, setLoading] =useState(true);
  const [alltrending , setAllTrending] = useState([]);

  let timeoutRef = null;

  const openDrawer = () => {
      if (navigation.dispatch) {
        navigation.dispatch(DrawerActions.openDrawer());
      }
    };

       


  useEffect(()=>{

   
    getAllTrending();
    console.log('trendingAll array', alltrending);


  },[]);


  const getAllTrending = async ()=>{

    const data = await trendingAll();

   
    if (data && data.results) {
      setAllTrending(data.results);
    } else {
      console.log('No results found in the API response');
    }
    setLoading(false);
  }

  
  useFocusEffect(
    React.useCallback(() => {
      timeoutRef = setTimeout(() => {
        setIsAdVisible(true);
      }, 4000);

      return () => {
        clearTimeout(timeoutRef);
        setIsAdVisible(false);
      };
    }, [])
  );

  const closeAd = () => {
    setIsAdVisible(false); 
  };

  useFocusEffect(
    React.useCallback(() => {
      StatusBar.setBarStyle('light-content');
      StatusBar.setBackgroundColor(theme.transparent); 
    }, [])
  );
  

  return (
    <>
    <StatusBar
            translucent
            backgroundColor={theme.transparent} 
            barStyle="light-content" 
        />
    
   
    <View className="flex-1 bg-neutral-800">
      <SafeAreaView className="mt-4 flex-1">
      <ScrollView
          showsVerticalScrollIndicator={false}
          contentContainerStyle={{ paddingBottom: 10 }}
        >

          <View className='flex-row items-center mx-4 justify-between mb-4'>


         <TouchableOpacity onPress= {openDrawer} >
                   <Bars3CenterLeftIcon size='30' strokeWidth={2} color ="white"/>
         
                   </TouchableOpacity>

                   <Text className='text-white  text-4xl font-bold align-middle'>  <Text style={styles.text}>H</Text>ome</Text>

                   <Image
          style={{ width: 40, height: 40 }}
          resizeMode="contain" 
          className='rounded-full mt-3'
          source={require('../assets/images/ottlogo.jpg')}
          
          />


          </View>
        <View className="flex-col justify-between items-center mx-12 mb-4 mt-1">
         
       
        
          </View>
          
          <DiscoverMovies data={alltrending} trending_title="Discover Movies "  />

          <Text className="text-white text-2xl font-medium mx-4 ">

            Discover Music
            </Text>

            <TouchableOpacity onPress={()=>navigation.navigate(SCREENS.MUSIC)} className='flex-row mx-4  mb-8'>
            <Image
          style={{ width: 150, height: 150 }}
          resizeMode="contain" 
          className='rounded-full mt-3'
          source={require('../assets/images/click_music.jpg')}
          
          />
            </TouchableOpacity>

  

        
        <View className="flex-col"> 
          <Text className='text-white text-xl font-medium mx-5'>Made By : </Text>
          <Text className='text-neutral-400 tracking-wide mx-4'> Anuj Tiwari </Text>
         
        </View>


        </ScrollView>
        <Add isAdVisible={isAdVisible} onClose={closeAd} />
      </SafeAreaView>
    </View>
    </>
  );
};



export default Home;
