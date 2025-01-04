
import React, { useState, useRef } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Dimensions } from 'react-native';
import Video from 'react-native-video';
import { XMarkIcon, SpeakerWaveIcon, SpeakerXMarkIcon , ArrowsPointingInIcon, ArrowsPointingOutIcon  } from 'react-native-heroicons/outline';
import Orientation from 'react-native-orientation-locker';

const { width, height } = Dimensions.get('window');

const Add = ({ isAdVisible, onClose }) => {
  const videoRef = useRef(null);

  const [isFullScreen, setIsFullScreen] = useState(false);
  const [muted, setMuted] = useState(true);

  const handleFullScreen = (fullscreen) => {
    setIsFullScreen(fullscreen);
    if (fullscreen) {
      Orientation.lockToLandscape();
    } else {
      Orientation.lockToPortrait();
    }
  };

  const adData = {
    videoUrl: "https://ireplay.tv/test/blender.m3u8", 
    heading: "Advertisement",
    title: "Best Product for Your Needs"
  };

  const toggleMute=()=>{
    setMuted((prev)=>  !prev);
  }

  
  const togglePlayPause = () => {
    if (videoRef.current) {
      videoRef.current.seek(0); 
    }
  };

  return (
    isAdVisible && (
      <View style={styles.adContainer}>
       
        <View style={styles.videoContainer}>
          <Video
            source={{ uri: adData.videoUrl }}
            ref={videoRef}
            style={styles.video}
            controls={true}
            resizeMode="cover"
            muted={muted}
            onEnd={togglePlayPause}
            fullscreen={isFullScreen}
          onFullscreenPlayerWillPresent={() => handleFullScreen(true)}
          onFullscreenPlayerDidDismiss={() => handleFullScreen(false)}
          />

          <Text className='text-black font-semibold text-lg'> Mini TV </Text>
          <Text className='text-neutral-600 font-medium  '> HLS Content Stream </Text>
          


        </View>

        <TouchableOpacity onPress={toggleMute} style={styles.muteButton}>
          <View style={styles.muteIconContainer} className='bg-neutral-700'>
            {muted ? (
              <SpeakerXMarkIcon size="20" color="white" />
            ) : (
              <SpeakerWaveIcon size="20" color="white" />
            )}
          </View>
        </TouchableOpacity>

       
        <TouchableOpacity onPress={onClose} style={styles.closeButton}>
          <View style={styles.closeIconContainer}>
            <XMarkIcon size="20" color="white" />
          </View>
        </TouchableOpacity>
      </View>
    )
  );
};

const styles = StyleSheet.create({
  adContainer: {
    position: 'absolute',
    bottom: 3,
    right: 20,
    width: width * 0.52,
    height: height * 0.21,
    marginBottom: 3,
    backgroundColor: 'white',
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#ddd',
    padding: 3,
    paddingBottom:5,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 6,
    elevation: 5,
    
  },
  closeButton: {
    position: 'absolute',
    top: 5,
    right: 5,
    padding: 5,
  },
  closeIconContainer: {
    padding: 5,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    borderRadius: 50,
  },
  videoContainer: {
    width: width * 0.50,
    height: height * 0.15,
    marginBottom: 1,
  },
  video: {
    width: width * 0.50,
    height: height * 0.14,
  },

  muteButton: {
    position: 'absolute',
    bottom: 130,
    left: 2,
    padding: 2,

  },
  muteIconContainer: {
    padding: 3,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
   
    borderRadius: 50,
  },
});

export default Add;
