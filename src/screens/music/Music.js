import {
  View,
  Text,
  Image,
  StatusBar,
  TouchableOpacity,
  FlatList,ToastAndroid, 

} from 'react-native';
import React, {useEffect, useState} from 'react';
import LinearGradient from 'react-native-linear-gradient';
import { styles, theme } from '../../assets/constants/THEME';
import {HeartIcon} from 'react-native-heroicons/solid'
import {Bars3CenterLeftIcon, MagnifyingGlassIcon} from 'react-native-heroicons/outline'; 
import { useFocusEffect } from '@react-navigation/native';
import { DrawerActions } from '@react-navigation/native';

import TrackPlayer, {
  Capability,
  State,
  useProgress,
  usePlaybackState,
  Event 
} from 'react-native-track-player';
import MusicPlayer from './MusicPlayer';
import { ScrollView } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
const Music = ({navigation}) => {

  const [favorites, setFavorites] = useState({}); 
  const [songsList, setSongList] = useState([
    {
      title: 'Death Bed',
      artist: 'Powfu',
      artwork: 'https://samplesongs.netlify.app/album-arts/death-bed.jpg',
      url: 'https://samplesongs.netlify.app/Death%20Bed.mp3',
      id: '1',
    },
    {
      title: 'Bad Liar',
      artist: 'Imagine Dragons',
      artwork: 'https://samplesongs.netlify.app/album-arts/bad-liar.jpg',
      url: 'https://samplesongs.netlify.app/Bad%20Liar.mp3',
      id: '2',
    },
    {
      title: 'Faded',
      artist: 'Alan Walker',
      artwork: 'https://samplesongs.netlify.app/album-arts/faded.jpg',
      url: 'https://samplesongs.netlify.app/Faded.mp3',
      id: '3',
    },
    {
      title: 'Hate Me',
      artist: 'Ellie Goulding',
      artwork: 'https://samplesongs.netlify.app/album-arts/hate-me.jpg',
      url: 'https://samplesongs.netlify.app/Hate%20Me.mp3',
      id: '4',
    },
    {
      title: 'Solo',
      artist: 'Clean Bandit',
      artwork: 'https://samplesongs.netlify.app/album-arts/solo.jpg',
      url: 'https://samplesongs.netlify.app/Solo.mp3',
      id: '5',
    },
    {
      title: 'Without Me',
      artist: 'Halsey',
      artwork: 'https://samplesongs.netlify.app/album-arts/without-me.jpg',
      url: 'https://samplesongs.netlify.app/Without%20Me.mp3',
      id: '6',
    },
    {
      title: 'Death Bed',
      artist: 'Powfu',
      artwork: 'https://samplesongs.netlify.app/album-arts/death-bed.jpg',
      url: 'https://samplesongs.netlify.app/Death%20Bed.mp3',
      id: '7',
    },
    {
      title: 'Bad Liar',
      artist: 'Imagine Dragons',
      artwork: 'https://samplesongs.netlify.app/album-arts/bad-liar.jpg',
      url: 'https://samplesongs.netlify.app/Bad%20Liar.mp3',
      id: '8',
    },
    {
      title: 'Faded',
      artist: 'Alan Walker',
      artwork: 'https://samplesongs.netlify.app/album-arts/faded.jpg',
      url: 'https://samplesongs.netlify.app/Faded.mp3',
      id: '9',
    },
    {
      title: 'Hate Me',
      artist: 'Ellie Goulding',
      artwork: 'https://samplesongs.netlify.app/album-arts/hate-me.jpg',
      url: 'https://samplesongs.netlify.app/Hate%20Me.mp3',
      id: '10',
    },
    {
      title: 'Solo',
      artist: 'Clean Bandit',
      artwork: 'https://samplesongs.netlify.app/album-arts/solo.jpg',
      url: 'https://samplesongs.netlify.app/Solo.mp3',
      id: '11',
    },
    {
      title: 'Without Me',
      artist: 'Halsey',
      artwork: 'https://samplesongs.netlify.app/album-arts/without-me.jpg',
      url: 'https://samplesongs.netlify.app/Without%20Me.mp3',
      id: '12',
    },
  ]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const playbackState = usePlaybackState();
  const progress = useProgress();
  const [isVisible, setIsVisible] = useState(false);
  const [localPlaybackState, setLocalPlaybackState] = useState(State.Paused);
  console.log("music ", State.Playing , State.Paused, playbackState);

  useEffect(() => {
    const trackChangedListener = TrackPlayer.addEventListener(
      Event.PlaybackTrackChanged,
      async (data) => {
        if (data.nextTrack !== null) {
          const track = await TrackPlayer.getTrack(data.nextTrack);
          const newIndex = songsList.findIndex((song) => song.id === track.id);
  
          if (newIndex !== -1) {
            setCurrentIndex(newIndex); 
          }
        }
      }
    );
  
    return () => {
      trackChangedListener.remove();
    };
  }, [songsList]);


  useEffect(() => {
    const setupRemoteHandlers = () => {
      TrackPlayer.addEventListener(Event.RemotePlay, async () => {
        await TrackPlayer.play();
      });
  
      TrackPlayer.addEventListener(Event.RemotePause, async () => {
        await TrackPlayer.pause();
      });
  
      TrackPlayer.addEventListener(Event.RemoteNext, async () => {
        await TrackPlayer.skipToNext();
      });
  
      TrackPlayer.addEventListener(Event.RemotePrevious, async () => {
        await TrackPlayer.skipToPrevious();
      });
  
      TrackPlayer.addEventListener(Event.RemoteStop, async () => {
        await TrackPlayer.stop();
      });
  
      return () => {
       
        TrackPlayer.destroy();
      };
    };
  
    setupRemoteHandlers();
  }, []);
  

  useEffect(() => {
    setupPlayer();
  }, []);
  const setupPlayer = async () => {
    try {
      await TrackPlayer.setupPlayer();
      await TrackPlayer.updateOptions({
        stopWithApp: true,
        capabilities: [
          Capability.Play,
          Capability.Pause,
          Capability.SkipToNext,
          Capability.SkipToPrevious,
          Capability.Stop,
        ],
        compactCapabilities: [Capability.Play, Capability.Pause],
        notificationCapabilities: [
          Capability.Play,
          Capability.Pause,
          Capability.SkipToNext,
          Capability.SkipToPrevious,
        ],
      });
      await TrackPlayer.add(songsList);
    } catch (e) {
      console.log(e);
    }
  };
  

  useEffect(() => {
    if (playbackState === State.Playing) {
      TrackPlayer.updateMetadataForTrack(songsList[currentIndex].id);
    }
  }, [currentIndex, playbackState]);

  useEffect(() => {
    const playbackStateListener = TrackPlayer.addEventListener('playback-state', (state) => {
     
      setLocalPlaybackState(state.state);
    });
  
    return () => {
    
      playbackStateListener.remove();
    };
  }, []);

  const toggleFavorite = (songId) => {
    setFavorites(prevFavorites => ({
      ...prevFavorites,
      [songId]: !prevFavorites[songId],
    }));

    ToastAndroid.show('Liked Songs feature will be added soon', ToastAndroid.SHORT);
  };

  const onclose=()=>{
    setIsVisible(false);
  }

  useFocusEffect(
    React.useCallback(() => {
      StatusBar.setBarStyle('light-content'); 
      StatusBar.setBackgroundColor('#171717'); 
    }, [])
  );

   const openDrawer = () => {
        if (navigation.dispatch) {
          navigation.dispatch(DrawerActions.openDrawer());
        }
      };



  


  return (
    <>

    <StatusBar
           
            backgroundColor= '#171717'
            barStyle="light-content" 
        />



    <View className='flex-1 bg-neutral-800 '>

    <ScrollView
    contentContainertyle={{paddingBottom :120, }}
       className='flex-1 bg-neutral-900'
   >
       <View className='w-full'>

       <LinearGradient
      colors={['#171717', '#013604', '#013604', '#013604']}
      style={{flex: 1}}>


<SafeAreaView className='mt-7'>
      
        <View className='flex-row justify-between items-center  mx-4 mb-4'>

           <TouchableOpacity onPress= {openDrawer}>
                    <Bars3CenterLeftIcon size='30' strokeWidth={2} color ="white"/>
          
                    </TouchableOpacity>
       
          <Text className='text-white  text-4xl font-bold '>  <Text style={styles.text}>M</Text>usic </Text>

           <Image
                    style={{ width: 40, height: 40 }}
                    resizeMode="contain" 
                    className='rounded-full mt-3'
                    source={require('../../assets/images/click_music.jpg')}
                    
                    />

        </View>
      </SafeAreaView>

           <Text
        style={{
          fontSize: 30,
          color: 'white',
          fontWeight: '600',
          marginLeft: 20,
          marginTop: 10,
        }}>
        {songsList[currentIndex].title}
      </Text>
      <View style={{flexDirection: 'row', paddingLeft: 20, marginTop: 20}}>
        <Image
          source={require('../../assets/images/spotify.png')}
          style={{width: 18, height: 18}}
        />
        <Text style={{color: 'white', fontSize: 14, marginLeft: 10}}>
          English Songs
        </Text>
      </View>
      <View style={{flexDirection: 'row', paddingLeft: 20, marginTop: 10}}>
        <Text style={{color: '#bababa', fontSize: 12}}>20,169 saves</Text>
        <Text style={{color: '#bababa', fontSize: 12, marginLeft: 10}}>
          4h 26m
        </Text>
      </View>
      <View
        style={{
          flexDirection: 'row',
          width: '90%',
          marginTop: 10,
          justifyContent: 'space-between',
          alignSelf: 'center',
        }}>
        <View style={{flexDirection: 'row', alignItems: 'center'}}>
          <Image
            source={require('../../assets/images/plus.png')}
            style={{width: 18, height: 18, tintColor: '#bababa'}}
          />
          <Image
            source={require('../../assets/images/arrow-down.png')}
            style={{
              width: 18,
              height: 18,
              tintColor: '#bababa',
              marginLeft: 15,
            }}
          />
          <Image
            source={require('../../assets/images/option.png')}
            style={{
              width: 18,
              height: 18,
              tintColor: '#bababa',
              marginLeft: 15,
            }}
          />
        </View>
        <View style={{flexDirection: 'row', alignItems: 'center'}}>
          <Image
            source={require('../../assets/images/suffle.png')}
            style={{width: 30, height: 30, tintColor: '#bababa'}}
          />
          <TouchableOpacity
            onPress={async () => {
              if (State.Playing == playbackState) {
                await TrackPlayer.pause();
              } else {
                await TrackPlayer.skip(currentIndex);
                await TrackPlayer.play();
              }
            }}>
            {State.Playing == playbackState ? (
              <Image
                source={require('../../assets/images/pause.png')}
                style={{
                  width: 40,
                  height: 40,
                  marginLeft: 20,
                  marginRight: 10,
                  tintColor: '#3ad934',
                }}
              />
            ) : (
              <Image
                source={require('../../assets/images/play-button.png')}
                style={{
                  width: 50,
                  height: 50,
                  marginLeft: 20,
                  marginRight: 10,
                }}
              />
            )}
          </TouchableOpacity>
        </View>
      </View>

      <FlatList
        data={songsList}
        contentContainerStyle={{ paddingBottom: 80 }}
        renderItem={({item, index}) => {

          const isFavorite = favorites[item.id];
          return (
            <View style={{flexDirection : 'row' ,justifyContent : 'center ', alignItems : 'center' , marginBottom : 10}}> 
            <TouchableOpacity
              style={{
                width: '100%',
                height: 50,
                flexDirection: 'row',
                justifyContent: 'space-between',
                paddingLeft: 20,
                paddingRight: 20,
                marginTop: 10,
                
              }}
              onPress={async () => {

                if (index === currentIndex && playbackState === State.Playing) {
                 
                  await TrackPlayer.pause();
                  setLocalPlaybackState(State.Paused);


                } else {
                 
                  await TrackPlayer.skip(index);
                  await TrackPlayer.play();
                  setCurrentIndex(index);
                  setLocalPlaybackState(State.Playing);
                }
                
              }}>
              <View style={{flexDirection: 'row', alignItems: 'center'}}>
                <Image
                  source={{uri: item.artwork}}
                  style={{width: 50, height: 50, borderRadius: 5}}
                />
                <View style={{marginLeft: 10}}>
                  <Text style={{color: 'white'}}>{item.title}</Text>
                  <Text style={{color: 'white', fontSize: 10}}>
                    {item.artist}
                  </Text>
                </View>
                {index == currentIndex && State.Playing == playbackState && (
                  <Image
                    source={require('../../assets/images/playing.png')}
                    style={{
                      width: 18,
                      height: 18,
                      tintColor: 'white',
                      marginLeft: 20,
                    }}
                  />
                )}
              </View>
              
            </TouchableOpacity >
            <View className='flex-row justify-end align-middle mr-20 right-3'>
            <  HeartIcon  size ='35' color= {isFavorite? 'red' : 'white'}  style={{position:'absolute', }}onPress={()=>toggleFavorite(item.id)} />
            </View>

       
                </View>

          );
        }}
      />

      
      
    </LinearGradient>
   




           </View>

           </ScrollView>

           <TouchableOpacity
        activeOpacity={1}
        style={{
          width: '100%',
          height: 70,
          position: 'absolute',
          bottom: 0,
          backgroundColor: 'rgba(0,0,0,0.9)',
          flexDirection: 'row',
          alignItems: 'center',
          paddingLeft: 20,
          paddingRight: 20,
          marginTop:20,
          justifyContent: 'space-between',
        }}
        onPress={() => {
          setIsVisible(true);
        }}>
        <View style={{flexDirection: 'row', alignItems: 'center'}}>
          <Image
            source={{uri: songsList[currentIndex].artwork}}
            style={{width: 50, height: 50, borderRadius: 5}}
          />
          <View style={{marginLeft: 10}}>
            <Text style={{color: 'white'}}>
              {songsList[currentIndex].title}
            </Text>
            <Text style={{color: 'white', fontSize: 10}}>
              {songsList[currentIndex].artist}
            </Text>
          </View>
        </View>

        <TouchableOpacity
         onPress={async () => {
          try {
            const currentPlaybackState =  await TrackPlayer.getState();

        

            if (currentPlaybackState === State.Playing) {
              
              await TrackPlayer.pause();
              setLocalPlaybackState(State.Paused); 

              await TrackPlayer.updateOptions({
                capabilities: [
                  Capability.Play,
                  Capability.Pause,
                  Capability.SkipToNext,
                  Capability.SkipToPrevious,
                  Capability.Stop,
                ],
              });
            } else if (currentPlaybackState === State.Paused) {
              
              await TrackPlayer.play();
              setLocalPlaybackState(State.Playing);

              await TrackPlayer.updateOptions({
                capabilities: [
                  Capability.Pause,
                  Capability.SkipToNext,
                  Capability.SkipToPrevious,
                  Capability.Stop,
                ],
              });
            }
          } catch (error) {
            console.error("Error toggling play/pause:", error);
          }
        }}>
          <Image
            source={
               localPlaybackState == State.Playing 
                ? require('../../assets/images/pause2.png')
                : require('../../assets/images/play.png')
            }
            style={{width: 30, height: 30, tintColor: 'white'}}
          />
        </TouchableOpacity>
      </TouchableOpacity>

<MusicPlayer
isVisible={isVisible}
songsList={songsList}
currentIndex={currentIndex}
playbackState={localPlaybackState}
progress={progress}
onChange={x => {
  setCurrentIndex(x);
}}
onclose={onclose
}

/>
</View>
     
</>
  );
};

export default Music;