import React from 'react'
import {View,Text,Button,StyleSheet,Image, Dimensions,TouchableOpacity} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import * as Animatable from 'react-native-animatable';
import SCREENS from '../assets/constants/SCREENS';

function SplashScreen({navigation}) {

    
  return (
    <View style ={styles.container} >
    <View style ={styles.header}>
        <Animatable.Image
        animation = "bounceIn"
        duraton = "1500"
         source ={require('../assets/images/splashImg.jpg')}
        style={styles.logo}
        resizeMode = "stretch"
        className='rounded-full'/>

    </View>

    <Animatable.View
    animation="fadeInUpBig" 
    style ={styles.footer}>
       <Text style ={styles.title}>Stay connected with Eveyone!</Text>
       <Text style ={styles.text}> SignIn to your Account</Text>
       <View style ={styles.button}> 
       <TouchableOpacity onPress={()=>navigation.navigate(SCREENS.SIGNUP)}>
        <LinearGradient 
        colors={['#045c33', '#045c33']}
        style={styles.signIn}>
            <Text style={styles.textSign}>
                Go to SignUp Page
            </Text>

            <MaterialIcons name='navigate-next'
            color='#fff'
            size ={20} />
        </LinearGradient>


       </TouchableOpacity>

       </View>
       
        
   
   </Animatable.View>  
   </View>
  )
}

export default SplashScreen
const {height} = Dimensions.get("screen");
const height_logo = height * 0.28;

const styles = StyleSheet.create(
    {
        container : {
            flex : 1,
           backgroundColor : "#045c33"
        },
       header : {
        flex : 2,
        justifyContent : 'center',
        alignItems : 'center'
        },
        footer :{
            flex : 1,
            backgroundColor : "#fff",
            borderTopLeftRadius : 30,
            borderTopRightRadius : 30,
            paddingVertical : 50,
            paddingHorizontal : 30
        },
        logo : {
            width : height_logo,
            height : height_logo
        },

        title :{
            color : "#05375a",
            fontSize : 30,
            fontWeight : 'bold',

        },
        text :{
            color : 'grey',
            marginTop : 5
        },
        button : {
            alignItems : 'flex-end',
            marginTop : 30,
            alignItems : 'center'

    },
    signIn :{
        width : 170,
        height :40,
        justifyContent : 'center',
        alignItems : 'center',
        borderRadius : 60,
        flexDirection : 'row',
        
    },
    textSign :{
        color : 'white',
        fontWeight : 'bold'
    }

    }
);