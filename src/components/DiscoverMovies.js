import { View, Text, TouchableOpacity, TouchableWithoutFeedback, Dimensions,Image } from 'react-native'
import React from 'react'
import Carousel from 'react-native-snap-carousel';
import { useNavigation } from '@react-navigation/native';
import SCREENS from '../assets/constants/SCREENS';
import { fallbackMoviePoster, imagew800 } from '../api/moviedb';


var {width, height} =Dimensions.get('window');
const DiscoverMovies = ({data,trending_title}) => {

    const navigation=useNavigation();
    const handleClick=(item)=>{
        navigation.navigate('MovieStackScreen',{
            screen : SCREENS.MOVIES
        });
    }
  return (
    <View className='mb-8'>
      <Text className='text-white text-2xl mx-4 mb-5 font-medium'>{trending_title} </Text>
      <Carousel
      data={data}
      renderItem={({item})=><MovieCard item={item} handleClick={()=>handleClick(item)} />}
      firstItem={1}
      inactiveSlideOpacity ={0.60}
      sliderWidth={width}
      itemWidth ={width*0.62}
      slideStyle ={{display : 'flex' ,alignItems : 'center'}}
      autoplay={true}             
      autoplayInterval={3000}       
      loop={true} 
      />
    </View>
  )
}

const MovieCard =({item,handleClick})=>{

    // console.log('item.poster_path ' , item.poster_path);
    return(
        <TouchableWithoutFeedback onPress={handleClick}>
            <Image 
            // source={require('../assets/images/movieposter.jpg')}
            
            source ={{uri : imagew800(item.poster_path)  || fallbackMoviePoster}}


            style={
                {
                    width : width*0.6,
                    height : height*0.4,
                }
            }
            className='rounded-3xl'
            />
        </TouchableWithoutFeedback>

    )

}

export default DiscoverMovies