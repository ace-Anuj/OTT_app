import React, { useEffect, useState } from "react";
import { View, StyleSheet, ToastAndroid} from "react-native";
import {
  
  Avatar,
  Title,
  Drawer,
  Text,
  TouchableRipple,
  
} from "react-native-paper";
import { DrawerContentScrollView, DrawerItem } from "@react-navigation/drawer";
import Icon from "react-native-vector-icons/MaterialCommunityIcons"
import { HomeModernIcon } from "react-native-heroicons/solid";
import { UserCircleIcon } from "react-native-heroicons/outline";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { fallbackMoviePerson, fallbackMoviePersonURI } from "../api/moviedb";
import { LogOut } from "../auth/LogOut";
import { RemoveAcc } from "../auth/RemoveAcc";
import { useNavigation } from "@react-navigation/native";
import SCREENS from "../assets/constants/SCREENS";

const Sidebar = (props) => {
  const [userInfo, setUserInfo] = useState({user:'user'});

  const [userImage, setUserImage] = useState({ uri: fallbackMoviePersonURI });
 
  const navigation = useNavigation();

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



  const handleLogOut = () => {
    console.log('it was clicked')
    LogOut(navigation); 
  };

  const handleRemoveAcc = () => {
    console.log('it was clicked')
    RemoveAcc(navigation); 
  };

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




  
  return (
    <View style={{ flex: 1 }} className="bg-neutral-200">
      
   
      <DrawerContentScrollView {...props}>
        <View style={styles.drawerContent}>
          <View style={styles.userInfoSection}>
            <View style={{ flexDirection: "row", marginTop: 35 }}>
            <Avatar.Image
             source={{
              uri: userImage.uri ? userImage.uri : fallbackMoviePerson, 
              }}
               size={50}
               
                />
              <View style={{ marginLeft: 15, flexDirection: "column" }}>
                <Title style={styles.title}>Hello, {userInfo?.user}!</Title>
               
              </View>
            </View>
          </View>

          <Drawer.Section style={styles.drawerSection}>
            <DrawerItem
              icon={({ color, size }) => (
                <HomeModernIcon name="home-outline" color={color} size={size} />
              )}
              label="Home"
              onPress={() => {
                props.navigation.navigate('Main', { screen: 'TabHome' });
              }}
            />
            <DrawerItem
              icon={({ color, size }) => (
                <UserCircleIcon name="account-outline" color={color} size={size} />
              )}
              label="Profile"
              onPress={() => {
                props.navigation.navigate(SCREENS.PROFILE);
              }}
            />
            
          
            <DrawerItem
              icon={({ color, size }) => (
                <Icon name="crown-outline" color={color} size={size} />
              )}
              label="Go Premium"
              onPress={() => {
                ToastAndroid.show('Will be Updated Soon.', ToastAndroid.SHORT);
            
              }}
            />
          </Drawer.Section>
          <Drawer.Section title="Preferences">
            
            <DrawerItem
              icon={({ color, size }) => (
                <Icon name="delete" color={color} size={size} />
              )}
              label="Remove Account"
              onPress={handleRemoveAcc}
            />

              <DrawerItem
              icon={({ color, size }) => (
                <Icon name="exit-to-app" color={color} size={size} />
              )}
              label="Log Out"
              onPress={handleLogOut}
            />
          </Drawer.Section>
        </View>
      </DrawerContentScrollView>
      <Drawer.Section style={styles.bottomDrawerSection}>
        <TouchableRipple onPress= {()=>console.log('go to about page')}>
          <View style={styles.contactUs}>
            <Text>About us</Text>
            <Text>|</Text>
            <Text>Contact us</Text>
          </View>
        </TouchableRipple>
      </Drawer.Section>
    </View>
  );
};

const styles = StyleSheet.create({
  drawerContent: {
    flex: 1,
  },
  userInfoSection: {
    paddingLeft: 20,
  },
  title: {
    fontSize: 16,
    marginTop: 3,
    fontWeight: "bold",
  },
  caption: {
    fontSize: 14,
    lineHeight: 14,
  },
  row: {
    marginTop: 20,
    flexDirection: "row",
    alignItems: "center",
  },
  section: {
    flexDirection: "row",
    alignItems: "center",
    marginRight: 15,
  },
  paragraph: {
    fontWeight: "bold",
    marginRight: 3,
  },
  drawerSection: {
    marginTop: 15,
  },
  bottomDrawerSection: {
    marginBottom: 15,
   
   
  },

  preference: {
    flexDirection: "row",
    justifyContent: "space-between",
    paddingVertical: 8,
    paddingHorizontal: 16,
  },
  toggleText: {
    flex: 1,
    justifyContent: "center",
    marginLeft: 5,
  },
  contactUs: {
    flexDirection: "row",
    justifyContent: "space-evenly",
    paddingVertical: 5,
    paddingHorizontal: 40,
  },
});

export default Sidebar;
