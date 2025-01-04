import { View, Text, Dimensions, Platform, ScrollView ,TouchableOpacity,Image,ToastAndroid} from 'react-native'
import { ChevronLeftIcon} from 'react-native-heroicons/outline';
import {HeartIcon} from 'react-native-heroicons/solid'
import { SafeAreaView } from 'react-native-safe-area-context';
import { styles } from '../assets/constants/THEME';
import React, {useEffect, useState} from 'react'
import { useNavigation, useRoute } from '@react-navigation/native';
import MovieList from './MovieList';
import Loading from './Loading';
import { fallbackMoviePerson, fetchPersonDetailsEndpoint, fetchPersonMoviesEndpoint, imagew342 } from '../api/moviedb';

var{width, height} = Dimensions.get('window');
const ios = Platform.OS =='ios';

const Person= () => {
    const{params : item } = useRoute();


    const navigation = useNavigation();
    const[isFavourite,setIsFavourite] =useState(false);
    const[modalVisible,setModalVisible] = useState(false);
    const [personMovies, setPersonMovies] = useState([]);
    const [person, setPerson] = useState({});
    const[loading , setLoading] =useState(false);

    useEffect(()=>{
        setLoading(true);
        getPersonDetails(item.id);
        getPersonMovies(item.id);

    },[item]);

    const getPersonDetails= async(id)=>{
        const data = await fetchPersonDetailsEndpoint(id);
        if(data){
            setPerson(data);
            setLoading(false);

        }


    }


    const getPersonMovies= async(id)=>{
        const data = await fetchPersonMoviesEndpoint(id);
        console.log('this is person movie',data);
        if(data && data.cast){
            setPersonMovies(data.cast);
          

        }


    }
  return (
   <ScrollView
   className='flex-1 bg-neutral-950 '
   contentContainerStyle ={{paddingBottom : 20}}
   
   >

<SafeAreaView className=' z-20 w-full flex-row justify-between items-center px-4 mt-3 '>
                <TouchableOpacity className='rounded-xl p-1 ' style={styles.background} onPress={()=>navigation.goBack()} >
                    <ChevronLeftIcon size='28' strokeWidth={2.5} color='white' />
                </TouchableOpacity>
                <TouchableOpacity>
                    <HeartIcon size='35' color= {isFavourite? 'red' : 'white'} onPress={()=>{
                        setIsFavourite(!isFavourite)
                     ToastAndroid.show('Favourite Cast feature will be added soon.', ToastAndroid.SHORT);
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
                    <View className=' flex-row justify-center'>
                        <View className='item-center rounded-full overflow-hidden h-72 w-72 border-2 border-neutral-500 '
                        style={{
                            ...Platform.select({
                              ios: {
                                shadowColor: 'gray',
                                shadowOffset: { width: 0, height: 5 },
                                shadowOpacity: 1,
                                shadowRadius :40
                                
                                
                              },
                              android: {
                                shadowColor: '#6cd4aa',
                                shadowOffset: { width: 4, height: 5 },
                                shadowOpacity: 2,
                                shadowRadius : 40,
                                elevation: 40,  //for android only
                                
                              },
                            }),
                          }}
                       >
                        
                          <Image
                        source={{uri : imagew342(person?.profile_path) || fallbackMoviePerson }}
                        style={{height : height*0.45 , width : width*0.73}}
                        className='bg-white'
                        
                        />
                        </View>
                    </View>
    
    
                    <View className='mt-6 '>
                        <Text className='text-3xl text-white font-bold text-center'>{person?.name}</Text>
                        <Text className='text-base text-neutral-500 text-center  '>
                            {person?.place_of_birth}
                        </Text>
    
                    </View>
    
                    <View className='mx-3 p-4 mt-6 flex-row justify-between items-center  bg-neutral-700 rounded-full'>
                    <View className='border-r-2 border-r-neutral-500  px-2 item-center'> 
                        
                        <Text className='text-white font-semibold'>Gender</Text>
                        <Text className='text-neutral-300 text-sm'>  {
                            person?.gender==1?'Female' : 'Male'
                            } </Text>
    
                    
                    </View>
    
                    <View className='border-r-2 border-r-neutral-500  px-2 item-center'> 
                        
                        <Text className='text-white font-semibold'>    Birthday</Text>
                        <Text className='text-neutral-300 text-sm'>{person?.birthday}</Text>
    
                    
                    </View>
    
                    <View className='border-r-2 border-r-neutral-500  px-2 item-center'> 
                        
                        <Text className='text-white font-semibold'> Known For </Text>
                        <Text className='text-neutral-300 text-sm'>   {person?.known_for_department}</Text>
    
                    
                    </View>
    
                    <View className='   px-2 item-center'> 
                        
                        <Text className='text-white font-semibold'>Popularity</Text>
                        <Text className='text-neutral-300 text-sm'>  {person?.popularity?.toFixed(2)} %</Text>
                    </View>
                    </View>
    
                    <View className='my-6 mx-4 space-y-2'>
    
                        <Text className='text-white text-lg'> Biography </Text>
                        <Text className='text-neutral-400 tracking-wide'>
                           {person?.biography || "Person's biograhpy not available."}
                        </Text>
                    </View>
    
                    <MovieList title={'Movies'} hideSeeAll={true} data={personMovies}/>
    
    
                </View>

                )
            }

           
   </ScrollView>
  )
}

export default Person