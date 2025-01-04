import { View, Text, TouchableOpacity, TouchableWithoutFeedback ,Image,ScrollView,Dimensions} from 'react-native'
import React from 'react'
import { useNavigation } from '@react-navigation/native'
import SCREENS from '../assets/constants/SCREENS';
import { fallbackMoviePoster, imagew185 } from '../api/moviedb';
import { ChevronRightIcon } from 'react-native-heroicons/solid'

var {width, height} =Dimensions.get('window');
const MovieList = ({title,data,hideSeeAll,type}) => {
   
    const navigation=useNavigation();
  return (
    <View className='mb-8 space-y-4'>
    <View className='mb-4 flex-row justify-between items-center mx-4'>
      <Text className='text-white text-xl font-semibold' >{title}</Text>
      {
        !hideSeeAll && (
          <TouchableOpacity onPress={()=>navigation.navigate(SCREENS.SEEALL, {type})}>

       <View className='flex-row justify-center items-center'>
       <Text className='text-lg text-white font-semibold '>See All</Text>
        <ChevronRightIcon size='20' color='white'/>


       </View>

  
        </TouchableOpacity>

        )
      }
    
    </View>
    <ScrollView
    horizontal
    showsHorizontalScrollIndicator={false}
    contentContainerStyle={{paddingHorizontal:15}}>
        {
            data.map((item,index)=>{
                return(
                    <TouchableWithoutFeedback
                    key={index}
                    onPress={()=>navigation.push(SCREENS.MOVIESCREEN,item)}
                    >
                        <View className='space-y-1 mr-4'>
                        <Image
                        // source={require('../assets/images/movieposter.jpg')}
                        source={{uri:imagew185(item.poster_path) || fallbackMoviePoster}}
                        className= 'rounded-3xl'
                        style={{width:width*0.33,
                                height:height*0.22
                        }}
                        />

                        <Text className='text-neutral-300 ml-1'> {item.title.length>14?item.title.slice(0,14)+'...':item.title}</Text>
                        </View>


                    </TouchableWithoutFeedback>
                )
            }


            

            )
        }

    </ScrollView>


    </View>
    
  )
}

export default MovieList