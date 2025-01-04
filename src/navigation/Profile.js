import {
  View,
  Text,
  Image,
  TextInput,
  ScrollView,
  SafeAreaView,
  TouchableOpacity,
  Platform,
  ToastAndroid,
  StyleSheet,
} from "react-native";
import React, { useEffect, useState } from "react";
import ImagePicker from "react-native-image-crop-picker";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { ChevronLeftIcon } from "react-native-heroicons/outline"; 
import FontAwesome from "react-native-vector-icons/FontAwesome";
import { Dimensions } from "react-native";
import { Modal } from "react-native";
import LinearGradient from "react-native-linear-gradient";
import { fallbackMoviePersonURI } from "../api/moviedb";
import { getData,saveUserData } from "../auth/Authorization";

const Profile = ({ navigation }) => {

  
  const [loading, setLoading] = useState(false);
  const [userInfo, setUserInfo] = useState({user:'user'});
  const [modalVisible, setModalVisible] = useState(false);
    const [userImage, setUserImage] =  useState(require("../assets/images/profile2.jpg"));
  const [data, setData] = useState({
    user: "",
    checkTextInput: false,
  });

  const ToUploadFromCamera = async () => {
    ImagePicker.openCamera({
      width: 300,
      height: 400,
      cropping: true,
      cropperCircleOverlay: true,
    }).then(async (image) => {
      const imageUriCamera = image.path;
      setUserImage({ uri: imageUriCamera }); 
      setModalVisible(false);
  
      try {
        await AsyncStorage.setItem("userProfileImgCamera", imageUriCamera);
        await AsyncStorage.setItem("lastUpdatedSource", "camera"); 
        ToastAndroid.show("Image updated successfully", ToastAndroid.SHORT);
      } catch (error) {
        console.error("Failed to save image URI:", error);
      }
    });
  };
  
  const ToUploadFromGallery = async () => {
    ImagePicker.openPicker({
      width: 300,
      height: 300,
      cropping: true,
      freeStyleCropEnabled: true,
      cropperCircleOverlay: false,
    }).then(async (image) => {
      const imageUriGallery = image.path;
      setUserImage({ uri: imageUriGallery }); 
      setModalVisible(false);
  
      try {
        await AsyncStorage.setItem("userProfileImgGallery", imageUriGallery);
        await AsyncStorage.setItem("lastUpdatedSource", "gallery");
        ToastAndroid.show("Image updated successfully", ToastAndroid.SHORT);
      } catch (error) {
        console.error("Failed to save image URI:", error);
      }
    });
  };
  

  useEffect(()=>{
    console.log('The user is changed', data.user)

  },[data.user]);

  const HandleChange = (val) => {
    if(val.length > 0){
      setData({
          ...data,
          user : val,
          checkTextInput : true
          
      })}
      else{
          setData({
              ...data,
              user : val
              
          })
      }
  };

  
  const ModalVisibility =() =>{
    setModalVisible(true);
}


useEffect(
  ()=>{

    const gettingUserData = async()=>{
      const retrievedUser = await AsyncStorage.getItem('username');
      if(retrievedUser && retrievedUser !==null){
        setUserInfo(
          {
           user : retrievedUser,
          
          }
         )   

      }
      else{
        setUserInfo(
          {
            user : "user"
          }
        )
      }
      
    }
    gettingUserData();
  },[userInfo]
);



useEffect(() => {
  const loadProfileImage = async () => {
    try {
      
      const lastUpdatedSource = await AsyncStorage.getItem('lastUpdatedSource');

      if (lastUpdatedSource === 'camera') {
        const savedImageUriCamera = await AsyncStorage.getItem('userProfileImgCamera');
        if (savedImageUriCamera && savedImageUriCamera !== 'null') {
          setUserImage({ uri: savedImageUriCamera });
        } else {
          setUserImage({ uri: fallbackMoviePersonURI });
        }
      } else if (lastUpdatedSource === 'gallery') {
        const savedImageUriGallery = await AsyncStorage.getItem('userProfileImgGallery');
        if (savedImageUriGallery && savedImageUriGallery !== 'null') {
          setUserImage({ uri: savedImageUriGallery });
        } else {
          setUserImage({ uri: fallbackMoviePersonURI });
        }
      } else {
        setUserImage({ uri: fallbackMoviePersonURI });
      }
    } catch (error) {
      console.error('Failed to load image:', error);
    }
  };

  loadProfileImage();
}, [userImage]);



const HandleSubmit = async () => {
  const { user } = data;
 
 
  try {
  
    if (!user) {
      
      ToastAndroid.show('Username must be filled ', ToastAndroid.SHORT);
      return;
    }

    if (!data.checkTextInput) {
      ToastAndroid.show('Please enter a valid username', ToastAndroid.SHORT);
      return;
    }

      await saveUserData(user);
      
     const retrievedUser = await AsyncStorage.getItem('username');
     

      if(retrievedUser){
        ToastAndroid.show('You are sucessfully changed your username', ToastAndroid.SHORT);
      }

  } catch (e) {
    console.log("Error during submission:", e);
  }
};



  return (
    <ScrollView
      className="flex-1 bg-neutral-950 "
      contentContainerStyle={{ paddingBottom: 20 , paddingTop :20 }}
    >
      <SafeAreaView className="z-20 w-full flex-row justify-between items-center px-4 mt-3">
        <TouchableOpacity
          className="rounded-xl p-1"
          style={styles.background}
          onPress={() => navigation.goBack()}
        >
          <ChevronLeftIcon size={28} strokeWidth={2.5} color="white" />
        </TouchableOpacity>
      </SafeAreaView>

      {loading ? (
        <Text style={styles.loadingText}>Loading...</Text>
      ) : (
        <View>
          <View className="flex-column justify-center items-center p-8">
            <View
              className="items-center rounded-full overflow-hidden h-46 w-46 border-2 border-neutral-500"
              style={styles.shadow}
            >

                  <Image
                  source={userImage}
                  style={[styles.logo, { borderRadius: 70 }]}
                  resizeMode="stretch"
                  className='bg-white'
                />

               

                </View>

                <Text className='text-white font-bold text-3xl mt-2'> {userInfo?.user}</Text>
              <TouchableOpacity onPress={() =>ModalVisibility()}  style={{
      position: "absolute", 
      bottom: -50,         
      alignSelf: "center", width: '50%'
      ,marginBottom : 10
    }}>

              <LinearGradient
                colors={["#045c33", "#045c33"]}
                style={styles.submitButtonGradient}
              >
                <Text style={styles.submitButtonText}>Edit</Text>
              </LinearGradient>
                

                </TouchableOpacity>

              {modalVisible ? 
              <Modal
              animation= "slide"
              transparent = {true}
              visible = {modalVisible}
            onRequestClose={()=>setModalVisible(false)}>
                                     
            <TouchableOpacity  onPress={()=>setModalVisible(false) }style={styles.modalBackground}>
            <View style={styles.modalContent}>
            <Text style={[styles.titletext,{color : 'green'},{fontWeight: 'bold'}]}> Upload Image </Text>
            <TouchableOpacity onPress={()=> ToUploadFromCamera() }>
           <LinearGradient 
             colors ={ ['#045c33', '#045c33']}
            style ={[ styles.signIn ,{marginTop : 12}]}>
            <Text style ={styles.titletext}> Camera</Text>
            </LinearGradient>
           </TouchableOpacity>
           <TouchableOpacity onPress={()=>ToUploadFromGallery() }>
           <LinearGradient 
            colors ={ ['#045c33', '#045c33']}
           style ={[ styles.signIn ,{marginTop : 12}]}>
          <Text style ={styles.titletext}> Gallery</Text>
          </LinearGradient>
           </TouchableOpacity>
                                     
           </View>
                                     
          </TouchableOpacity>
                                            
          </Modal> : null
           }          


             
           
          </View>

          <View className="mt-10 p-5">
            <Text className='text-white mb-2 font-semibold'>User Name:</Text>
            <View style={styles.action}>
              <FontAwesome name="user" color="#05375a" size={20} />
              <TextInput
                placeholder="Enter your UserName"
                placeholderTextColor={"#666"}
                onChangeText={(val)=>HandleChange(val)}
                style={styles.textInputBox}
             
                autoCapitalize="none"
              />
            </View>

            <TouchableOpacity style={styles.submitButton} onPress={HandleSubmit}>
              <LinearGradient
                colors={["#045c33", "#045c33"]}
                style={styles.submitButtonGradient}
              >
                <Text style={styles.submitButtonText}>Submit</Text>
              </LinearGradient>
            </TouchableOpacity>
          </View>
        </View>
      )}
    </ScrollView>
  );
};

const { height } = Dimensions.get("screen");
const height_logo = height * 0.25;

const styles = StyleSheet.create({
  logo: {
    width: height_logo,
    height: height_logo,
  },
  textStyle: {
    color: "green",
    fontWeight: "bold",
    marginBottom: 10,
  },
  action: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 20,
    backgroundColor: "#fff",
    borderRadius: 10,
    padding: 10,
    elevation: 5,
    shadowColor: "#000",
  },
  textInputBox: {
    flex: 1,
    marginLeft: 10,
    color: "#097d33",
    fontSize: 16,
  },
  submitButton: {
    marginTop: 10,
    alignItems: "center",
  },
  submitButtonGradient: {
    width: "100%",
    paddingVertical: 10,
    borderRadius: 10,
    justifyContent: "center",
    alignItems: "center",
  },
  submitButtonText: {
    color: "white",
    fontWeight: "bold",
    fontSize: 16,
  },
  shadow: {
    ...Platform.select({
      ios: {
        shadowColor: "gray",
        shadowOffset: { width: 0, height: 5 },
        shadowOpacity: 1,
        shadowRadius: 40,
      },
      android: {
        shadowColor: "#6cd4aa",
        shadowOffset: { width: 4, height: 5 },
        shadowOpacity: 2,
        shadowRadius: 40,
        elevation: 40,
      },
    }),
  },

  modalBackground: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)'

},

modalContent: {
    backgroundColor: '#fff',  
    padding: 20,
    borderRadius: 10, 
    width: '80%',  
    alignItems: 'center',  
  },
  modalText: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 10,
    color : 'green'
  },
  modalOptionText: {
    fontSize: 16,
    color: '#009387',  
    marginVertical: 5
  },
  titletext :{
    color : "#fff",
    fontSize :20,
   
},

signIn :{
  width : 150,
  height :40,
  justifyContent : 'center',
  alignItems : 'center',
  borderRadius : 50,
  flexDirection : 'row',
},
});

export default Profile;
