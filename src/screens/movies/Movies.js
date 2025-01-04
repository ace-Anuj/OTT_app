import { Text, StatusBar ,View, TouchableOpacity , ScrollView} from 'react-native'
import React, { useEffect, useState } from 'react'
import {Bars3CenterLeftIcon, MagnifyingGlassIcon} from 'react-native-heroicons/outline'; 
import { styles } from '../../assets/constants/THEME';
import { SafeAreaView } from 'react-native-safe-area-context';
import TrendingMovies from '../../components/TrendingMovies';
import MovieList from '../../components/MovieList';
import SCREENS from '../../assets/constants/SCREENS';
import { useNavigation, DrawerActions  } from '@react-navigation/native';
import Loading from '../../components/Loading';
import { theme } from '../../assets/constants/THEME';
import { fetchtopratedMoviesEndpoint, fetchtrendingMoviesEndpoint, fetchupcomingMoviesEndpoint } from '../../api/moviedb';
import { useFocusEffect } from '@react-navigation/native';



const Movies = ({navigation}) => {

  const typeofmovie='upcoming';

  const openDrawer = () => {
    if (navigation.dispatch) {
      navigation.dispatch(DrawerActions.openDrawer());
    }
  };


 
  const[trending , setTrending] =useState([]);
  const[upcoming , setUpcoming] =useState([]);
  const[topRated , setTopRated] =useState([]);
  const[loading , setLoading] =useState(true);

  useEffect(()=>{

    getTrendingMovies();
    getTopRatedMovies();
    getUpcomingMovies();
   


  },[]);

  const getTrendingMovies= async ()=>{
    const data = await fetchtrendingMoviesEndpoint();
    // console.log('getting movie data' , data);
    if(data && data.results) setTrending(data.results);
    setLoading(false);
  }

    const getTopRatedMovies= async ()=>{
      const data = await fetchtopratedMoviesEndpoint();
      
      if(data && data.results) 
        setTopRated(data.results);
      

  }
  const getUpcomingMovies= async ()=>{
    
    const data = await fetchupcomingMoviesEndpoint();
   
   
    if(data && data.results) 
      setUpcoming(data.results);
   

}

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


    
    
    <View className='flex-1 bg-neutral-800 ' >

      <SafeAreaView className='mt-7'>
       
        <View className='flex-row justify-between items-center  mx-4 mb-4'>
          <TouchableOpacity onPress= {openDrawer}>
          <Bars3CenterLeftIcon size='30' strokeWidth={2} color ="white"/>

          </TouchableOpacity>
       
          <Text className='text-white  text-3xl font-bold '>  <Text style={styles.text}>M</Text>ovies </Text>
          <TouchableOpacity onPress={()=>(navigation.navigate(SCREENS.SEARCH))}>
            <MagnifyingGlassIcon size='30' strokeWidth={2} color='white'/>
          </TouchableOpacity>

        </View>
      </SafeAreaView>

      {
        loading? (
          <Loading/>
        ) : (
          <ScrollView
          showsVerticalScrollIndicator={false}
          contentContainerStyle={{paddingBottom : 10}}
          >
            {trending.length>0 &&<TrendingMovies data ={trending} />}
            <MovieList title ="Upcoming" data={upcoming} type={typeofmovie}/>
            <MovieList title ="Top Rated" data={topRated}/>
    
    
          </ScrollView>

        )
      }
     

     
    </View>
    </>
  )
}

export default Movies