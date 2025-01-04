import { View, Text, ScrollView, TouchableOpacity,Image } from 'react-native'
import React from 'react'
import SCREENS from '../assets/constants/SCREENS';
import { fallbackMoviePerson, fallbackMoviePoster, imagew185 } from '../api/moviedb';

const Cast = ({cast, navigation}) => {

    
  return (
    <View className='my-6'>
      <Text className='text-white text-lg mx-4 mb-5 font-semibold'> Top Cast</Text>
      <ScrollView
      horizontal
      showsHorizontalScrollIndicator={false}
      contentContainerStyle={{paddingBottom :15}}
      >
        {
             cast && cast.map((person,index)=>{
                return(
                    <TouchableOpacity 
                    key={index}
                    className='mr-4 items-center'
                    onPress={()=>navigation.navigate(SCREENS.PERSON, person)}

                    >
                        <View className='overflow-hidden rounded-full h-20 w-20 items-center border-neutral-500 ml-2 mr-2 '>
                        <Image className='rounded-xl h-24 w-20 bg-slate-500' 
                        source={{uri : imagew185(person?.profile_path) || fallbackMoviePerson}}
                       
                        />

                        </View>
                        

                        <Text className='text-white text-xs mt-1'>
                            {person?.character.length>10? person?.character.slice(0,10) + '...' : person?.character}

                        </Text>
                        <Text className='text-neutral-400 text-xs mt-1'>
                            {person?.original_name.length>10? person?.original_name.slice(0,10) + '...' : person?.original_name}

                        </Text>
                    </TouchableOpacity>
                )
            })

        }
        </ScrollView>

    </View>
  )
}

export default Cast