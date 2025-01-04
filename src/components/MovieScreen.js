
import React, { useEffect, useState } from 'react'
import { useNavigation, useRoute } from '@react-navigation/native'
import { SafeAreaView } from 'react-native-safe-area-context';
import { ChevronLeftIcon,PlayCircleIcon} from 'react-native-heroicons/outline';
import {HeartIcon} from 'react-native-heroicons/solid'
import { styles, theme } from '../assets/constants/THEME';
import LinearGradient from 'react-native-linear-gradient';
import Cast from './Cast';
import { StatusBar } from 'react-native';
import MovieList from './MovieList';
import Loading from './Loading';
import { View, Text, ScrollView, TouchableOpacity, Dimensions, Platform ,Image, ToastAndroid} from 'react-native';
import { fallbackMoviePoster, fetchMovieCreditsEndpoint, fetchMovieDetailsEndpoint, fetchMovieVideo, fetchSimilarMoviesEndpoint, imagew500 }   from '../api/moviedb';
import { WebView } from 'react-native-webview';
import Modal from 'react-native-modal';
import Orientation from 'react-native-orientation-locker';

var{height,width} =Dimensions.get('window');
// const ios = Platform.OS ='ios';
// const topMargin = ios? ' ' : 'mt-3';
 let movieName = 'Batman';

const MovieScreen = () => {

    
    const{params :item} =useRoute();
    const[isFavourite, setIsFavourite] =useState(false);
    const[cast,setCast] =useState([]);
    const[similarMovies,setSimilarMovies] =useState([]);
    const[loading , setLoading] =useState(false);
    const[movie,setMovie] = useState({});
    const[video, setVideo] = useState([]);
    const [isModalVisible, setIsModalVisible] = useState(false);
    

    const navigation =useNavigation();

   

    useEffect(()=>{
        setLoading(true);
        getMovieDetails(item.id);
        getMovieCredits(item.id);
        getSimilarMovies(item.id);

        getMovieVideos(item.id);
        setLoading(false);


    },[item]);


   
    
    const getMovieVideos = async (id)=>{
       
        const data = await fetchMovieVideo(id);
        const trailer = data.results.find((video) => video.type === 'Trailer');
  
        if (trailer) {
          setVideo([trailer.key]); 
        }
    }


    const getMovieDetails= async (id)=>{
        const data= await fetchMovieDetailsEndpoint(id);
        // console.log('Details data ',data);
        if(data){
            setMovie(data);
        }

       
    };

    const getMovieCredits= async (id)=>{
        const data= await fetchMovieCreditsEndpoint(id);
        // console.log('Details data ',data);

        if(data && data.cast){
            setCast(data.cast);
        }
       
    };

    const getSimilarMovies = async (id)=>{
        const data= await fetchSimilarMoviesEndpoint(id);
        // console.log('Details data ',data);

        if(data && data.results){
            setSimilarMovies(data.results);
        }
    }

    const toggleModal = () => {
        setIsModalVisible(!isModalVisible); 
        if (!isModalVisible) {
          
          Orientation.lockToLandscape();
        } else {
      
          Orientation.lockToPortrait();
        }
      };

  return (
<>
    <StatusBar
    translucent
    backgroundColor={theme.transparent} 
    barStyle="light-content" 
/>
    <ScrollView
     contentContainertyle={{paddingBottom :20}}
        className='flex-1 bg-neutral-900'
    >
        <View className='w-full'>
            <SafeAreaView className='absolute z-20 w-full flex-row justify-between items-center px-4 mt-3 '>
                <TouchableOpacity className='rounded-xl p-1 ' style={styles.background} onPress={()=>navigation.goBack()} >
                    <ChevronLeftIcon size='28' strokeWidth={2.5} color='white' />
                </TouchableOpacity>
                <TouchableOpacity>
                    <  HeartIcon  size ='35' color= {isFavourite?'red' : 'white'} onPress={()=>{setIsFavourite(!isFavourite);  
                        ToastAndroid.show('Favourite Movies feature will be added soon.', ToastAndroid.SHORT);
                        }
                        }
                         />
                </TouchableOpacity>

            </SafeAreaView>

            {
                loading? (
                    <Loading/>

                ) : (
                    <View>
                        <View>
                <Image 
                source={{uri : imagew500(movie?.poster_path) || fallbackMoviePoster }}
                style={{width, height:height*0.55}}/>

                <LinearGradient
                colors={['transparent' , 'rgba(23,23,23,0.8)', 'rgba(23,23,23,1)' ]}
                style={ {width , height :height*0.40}}
                start={{x:0.5, y:0}}
                end={{x:0.5,y:1}}
                className='absolute bottom-0'

                />
                </View>

                


<View style={{marginTop : -(height*0.08)}}  className='space-y-3'>

<Text className='text-white text-center text-3xl font-bold tracking-wider'>
                {movie?.title}

            </Text>
            <TouchableOpacity onPress={toggleModal} style={{flexDirection:'row', justifyContent:'center', alignItems:'center'}}>

                <LinearGradient 
                            colors ={ ['#245427', '#016608']}
                            style={{ width: 160, height: 50, borderRadius: 8, flexDirection: 'row', justifyContent: 'center', alignItems: 'center' }}

                            >
                                
                                <Text className='text-white text-center text-3xl font-bold tracking-wider'>Watch </Text>
                                <PlayCircleIcon size='35' color='white'/>
                            </LinearGradient>
              
            </TouchableOpacity>
  
            {
                movie?.id?(
                    <Text className='text-neutral-400 font-semibold text-base text-center'>
                {movie?.status} · {movie?.release_date?.split('-')[0]} · {movie?.runtime} min

            </Text>
                ) : null
            }
            
            <ScrollView 
           horizontal
           showsHorizontalScrollIndicator={false}
           contentContainerStyle={{
             flexDirection: 'row',
             justifyContent: 'center', 
             alignItems: 'center',
            flexGrow:1,
            paddingHorizontal:7 
           }}
           style={{
             width: '100%', 
           }}
          > 

                {
                    movie?.genres?.map((genre,index)=>{
                        let showDot = index+1 != movie.genres.length;
                        return(
                            <Text key={index} className='text-neutral-400 font-semibold text-base text-center'>
                            {genre?.name} {showDot? "·": null}
                         </Text>

                        )
                       
                    })
                }
               
            </ScrollView>

            <Text className ='text-neutral-400 mx-4 tracking-wide'>
               {movie?.overview}
            </Text>
        </View>

        {cast.length>0 && <Cast navigation={navigation} cast={cast}/>}

        {similarMovies.length>0 && <MovieList title="Similar Movies " hideSeeAll={true}  data={similarMovies}/>}

       
             
        <Modal
        isVisible={isModalVisible}
        onBackdropPress={toggleModal} 
        onBackButtonPress={toggleModal} 
        style={{ margin: 0 }} 
      >
        <View style={{ flex: 1, backgroundColor: 'black' }}>
          {video.length > 0 && (
           <WebView
           originWhitelist={['*']}
           source={{
             uri: `https://www.youtube.com/embed/${video[0]}?autoplay=1&controls=0&modestbranding=1&showinfo=0&rel=0&fs=1`, 
           }}
           style={{ flex: 1 }}
           javaScriptEnabled={true}
           allowsFullscreenVideo={true} 
           mediaPlaybackRequiresUserAction={false} 
         />
          )}
         
        </View>
      </Modal>


            </View>

            

                )
            }
           
        </View>

        

       

    </ScrollView>

    </>
  )
}

export default MovieScreen

