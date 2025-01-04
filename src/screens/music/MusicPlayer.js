import {View, Text, StatusBar, Image, TouchableOpacity,BackHandler} from 'react-native';
import React, {useState,useEffect} from 'react';
import Modal from 'react-native-modal';
import LinearGradient from 'react-native-linear-gradient';
import Slider from '@react-native-community/slider';
import TrackPlayer, {State} from 'react-native-track-player';
const MusicPlayer = ({
  songsList,
  currentIndex,
  progress,
  playbackState,
  isVisible,
  onclose,
  onChange
}) => {
  const [currentSongIndex, setCurrentSongIndex] = useState(currentIndex);
  const [localPlaybackState, setLocalPlaybackState] = useState(State.Paused); 


  useEffect(() => {
    setLocalPlaybackState(playbackState);
  }, [playbackState]); 

  
  console.log("THIS IS THEPLAYING STATE",State.Playing == playbackState )
  const format = seconds => {
    let mins = parseInt(seconds / 60)
      .toString()
      .padStart(2, '0');
    let secs = (Math.trunc(seconds) % 60).toString().padStart(2, '0');
    return `${mins}:${secs}`;
  };

  useEffect(() => {
   
    setCurrentSongIndex(currentIndex);
  }, [currentIndex]);

  

  
  return (
 <>
 

  
    <Modal isVisible={isVisible} 
           style={{ flex: 1, margin: 0 , justifyContent: 'flex-start' }} // 
           onBackdropPress={onclose} 
           onBackButtonPress={onclose} 
           
           >
           

      <LinearGradient
        colors={['#171717', '#013604', '#013604', '#000000']}
        style={{flex: 1}}>
        <TouchableOpacity
          style={{marginTop: 20, marginLeft: 20}}
          onPress={() => {
            onclose();

          }}>
          <Image
            source={require('../../assets/images/down-arrow.png')}
            style={{
              width: 30,
              height: 30,
              tintColor: 'white',
            }}
          />
        </TouchableOpacity>

        <Image
          source={{uri: songsList[currentSongIndex].artwork}}
          style={{
            width: '80%',
            height: '35%',
            alignSelf: 'center',
            marginTop: 20,
            borderRadius: 5,
          }}
        />
        <Text
          style={{
            fontSize: 30,
            color: 'white',
            fontWeight: '600',
            marginLeft: 20,
            marginTop: 20,
          }}>
          {songsList[currentSongIndex].title}
        </Text>
        <Text
          style={{
            fontSize: 16,
            color: 'white',
            fontWeight: '600',
            marginLeft: 20,
          }}>
          {songsList[currentSongIndex].artist}
        </Text>
        <Slider
         
          style={{ width: '90%', height: 40, alignSelf: 'center' }}
          minimumValue={0}  
          maximumValue={progress.duration} 
          value={progress.position}
          minimumTrackTintColor="#FFFFFF"
          maximumTrackTintColor="#fff"
          onSlidingComplete={async (value) => {
          
            await TrackPlayer.seekTo(value);
          }}


        />
        <View
          style={{
            width: '90%',
            flexDirection: 'row',
            justifyContent: 'space-between',
            alignSelf: 'center',
          }}>
          <Text style={{color: 'white'}}>{format(progress.position)}</Text>
          <Text style={{color: 'white'}}>{format(progress.duration)}</Text>
        </View>
        <View
          style={{
            width: '100%',
            justifyContent: 'space-evenly',
            alignItems: 'center',
            flexDirection: 'row',
            alignSelf: 'center',
            marginTop: 30,
          }}>
          <TouchableOpacity onPress={async()=>{
            if(currentSongIndex>0){
              await TrackPlayer.skip(currentSongIndex - 1);
              await TrackPlayer.play();
              setCurrentSongIndex(currentSongIndex - 1);
              onChange(currentSongIndex-1)
            }
         
          }}>
            <Image
              source={require('../../assets/images/previous.png')}
              style={{width: 35, height: 35, tintColor: 'white'}}
            />
          </TouchableOpacity>
          <TouchableOpacity
            style={{
              width: 60,
              height: 60,
              borderRadius: 30,
              backgroundColor: 'white',
              justifyContent: 'center',
              alignItems: 'center',
            }}
            onPress={async () => {
              try {
                
                const currentPlaybackState = await TrackPlayer.getState();
          
                if (currentPlaybackState === State.Playing) {
                  
                  await TrackPlayer.pause();
                  setLocalPlaybackState(State.Paused); 
                } else if (currentPlaybackState === State.Paused) {
                  
                  await TrackPlayer.play();
                  setLocalPlaybackState(State.Playing);
                }
              } catch (error) {
                console.error("Error toggling play/pause:", error);
              }
            }}
            
             
            >
            <Image
              source={
                localPlaybackState ==  State.Playing 
                  ? require('../../assets/images/pause2.png')
                  : require('../../assets/images/play.png')
              }
              style={{width: 30, height: 30}}
            />
          </TouchableOpacity>
          <TouchableOpacity
            onPress={async () => {
              await TrackPlayer.skip(currentSongIndex + 1);
              await TrackPlayer.play();
              setCurrentSongIndex(currentSongIndex + 1);
              onChange(currentSongIndex+1)
            }}>
            <Image
              source={require('../../assets/images/next.png')}
              style={{width: 35, height: 35, tintColor: 'white'}}
            />
          </TouchableOpacity>
        </View>
      </LinearGradient>
    </Modal>

    </>
  );
};

export default MusicPlayer;