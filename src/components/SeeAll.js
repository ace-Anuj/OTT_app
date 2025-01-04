import React, { useState, useEffect } from 'react';
import axios from "axios";
import { View, Text, Dimensions, ScrollView, TouchableWithoutFeedback, Image } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useNavigation } from '@react-navigation/native';
import SCREENS from '../assets/constants/SCREENS';
import { imagew185, fallbackMoviePoster } from '../api/moviedb';
import Loading from './Loading';

const SeeAll = ({ route }) => {
  const { type } = route.params; 
  const navigation = useNavigation();
  
  const apikey = '35562410e881922b673d32d47cec886d';
  const baseURL = 'https://api.themoviedb.org/3';

  const topratedMoviesEndpoint = `${baseURL}/movie/top_rated?api_key=${apikey}`;
  const upcomingMoviesEndpoint = `${baseURL}/movie/upcoming?api_key=${apikey}`;

  const [movies, setMovies] = useState([]);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [loading, setLoading] = useState(false);

 
  const fetchMovies = async (page) => {
    try {
      setLoading(true); 
      const endpoint = type === 'upcoming' ? upcomingMoviesEndpoint : topratedMoviesEndpoint;
      const response = await axios.get(endpoint, { params: { page } });

      if (page === 1) {
        setMovies(response.data.results); 
      } else {
        setMovies((prev) => [...prev, ...response.data.results]); 
      }

      setTotalPages(response.data.total_pages);
      setLoading(false);
    } catch (error) {
      setLoading(false);
      console.error(`Error fetching ${type} movies:`, error);
    }
  };

  
  useEffect(() => {
    fetchMovies(page);
  }, [page]);


  const handleLoadMore = (event) => {
    const { contentOffset, contentSize, layoutMeasurement } = event.nativeEvent;

    const isNearBottom = contentOffset.y + layoutMeasurement.height >= contentSize.height - 50;

    if (isNearBottom && !loading && page < totalPages) {
      setPage((prevPage) => prevPage + 1);
    }
  };

  return (
    <SafeAreaView className="bg-neutral-800 flex-1">
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ paddingHorizontal: 15, paddingBottom: 20 }}
        onScroll={handleLoadMore}
        scrollEventThrottle={16}
      >

              <View>
            <Text className='text-white ml-1 font-bold text-3xl mt-5 mb-4'> All Movies</Text>
            </View>



        <View className="flex-row justify-between flex-wrap items-center space-y-3">

           
            
          {movies.map((item, index) => (
            <TouchableWithoutFeedback
              key={index}
              onPress={() => navigation.push(SCREENS.MOVIESCREEN, item)}
            >
              <View className="space-y-2 mb-4">
                <Image
                  source={{ uri: imagew185(item?.poster_path) || fallbackMoviePoster }}
                  className="rounded-3xl"
                  style={{
                    width: Dimensions.get('window').width * 0.44,
                    height: Dimensions.get('window').height * 0.3,
                  }}
                />
                <Text className="text-neutral-300 ml-1">
                  {item?.title.length > 14 ? item?.title.slice(0, 22) + '...' : item?.title}
                </Text>
              </View>
            </TouchableWithoutFeedback>
          ))}
        </View>

        {loading && (
          <Loading/>
        )}

        {!loading && movies.length === 0 && (
          <View className="flex-row justify-center">
            <Image
              source={require('../assets/images/404-removebg.png')}
              className="h-96 w-96"
            />
          </View>
        )}
      </ScrollView>
    </SafeAreaView>
  );
};

export default SeeAll;
