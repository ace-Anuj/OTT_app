import { View, Text, Dimensions, TextInput, TouchableOpacity, ScrollView, TouchableWithoutFeedback, Image} from 'react-native'
import React, { useCallback, useState } from 'react'
import { SafeAreaView } from 'react-native-safe-area-context';
import { XMarkIcon } from 'react-native-heroicons/outline';
import { useNavigation } from '@react-navigation/native';
import SCREENS from '../assets/constants/SCREENS';
import Loading from './Loading';
import { debounce } from "lodash";
import { fallbackMoviePoster, imagew185, imagew342, searchMovies } from '../api/moviedb';

const{height,width} = Dimensions.get('window');

const Search = () => {
    const navigation=useNavigation();
    const [results,setResults] =useState([]);
    const[loading , setLoading] =useState(false);
    const movieName ='Batman';
    const handleSearch=(value)=>{
    console.log('value :', value );

    if(value && value.length>2){
        setLoading(true);
        searchMovies({
            query:value,
            include_adult : 'false',
            language : 'en-US',
            page : '1'
        }).then(data=>{
            setLoading(false);
            console.log('got movies' ,data);
            if(data && data.results) setResults(data.results);
        })
    }else{
        setLoading(false);
        setResults([]);
    }

    }

    const handleTextDebounce = useCallback(debounce(handleSearch, 400), []);
  return (
   <SafeAreaView className='bg-neutral-800 flex-1'>
    <View className='mx-4 mb-3 flex-row justify-between items-center border border-neutral-500 rounded-full mt-4'>
        <TextInput
        onChangeText={handleTextDebounce}
        placeholder='Search Movie '
        placeholderTextColor={'lightgray'}
        className='pb-1 pl-6 flex-1 font-semibold text-white tracking-wider' 
        ></TextInput>
        <TouchableOpacity   className=' p-3 m-1 bg-neutral-500 rounded-full' onPress={()=>(navigation.navigate(SCREENS.MOVIES))}>
            <XMarkIcon size='25' color="white" /> 

        </TouchableOpacity>


    </View>

    {
        loading? (
            <Loading/>
        ) :(

            results.length>0?(
                <ScrollView
                showsVerticalScrollIndicator={false}
                contentContainerStyle={{paddingHorizontal :15}}
                className='space-y-3'
                >
                    <Text className='text-white font-semibold  ml-1'>Results ({results.length})</Text>
            
                    <View className='flex-row justify-between flex-wrap items-center   '> 
                        {
                            results.map((item,index)=>{
                                return(
                                    <TouchableWithoutFeedback
                                    key={index}
                                    onPress={()=>navigation.push(SCREENS.MOVIESCREEN, item)}>
            
                                        <View className='space-y-2  mb-4'>
                                        <Image
                                        source={{uri : imagew185(item?.poster_path) ||  fallbackMoviePoster}}
                                         className='rounded-3xl '
                                        style={{width:width*0.44 , height: height*0.3}}
                                        />
                                        <Text className='text-neutral-300 ml-1'> 
                                        {
                                       item?.title.length>14?item?.title.slice(0,22) +'...' : item?.title
                                        } 
                                        </Text>
            
            
                                        </View>
            
                                       
                                    </TouchableWithoutFeedback>
                                )
                            })
                        }
                    </View>
            
                </ScrollView>
    
            ) :(
                <View className='flex-row justify-center '>
                    <Image source={require('../assets/images/404-removebg.png')}
                    className='h-96 w-96'
                    />
                     </View>
    
    
            )

        )
    }

    

   </SafeAreaView>
  )
}

export default Search