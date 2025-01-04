import React, { useEffect, useState } from 'react'
import {View,Text,Button,StyleSheet,Image, Dimensions,TouchableOpacity, TextInput,Modal, ToastAndroid} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import AsyncStorage from '@react-native-async-storage/async-storage';
import * as Animatable from 'react-native-animatable';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import Feather from 'react-native-vector-icons/Feather';
import SCREENS from '../assets/constants/SCREENS';
import {  getData } from './Authorization';




function SignIn({navigation}) {
    const [loginData ,setLoginData] =useState({
        
        email : '',
        password : '',
        checkTextInputChange : false,
        secureTextEntry: true,
        checkPasswordInput : false,
        checkConfirmPasswordInput : false,
        checkConfirmPasswordEntry : true
    }

    );

  
    const HandleChange =(val) =>{
        if(val.length >0){
        setLoginData({
            ...loginData,
            email : val,
            checkTextInputChange : true

        })   
    }
    else{
        setLoginData({
            ...loginData,
            email: val,
            checkTextInputChange : false,

        })
    }
    
    }

    const HandlePasswordChange =(val) =>{

        if(val.length > 0){
        setLoginData({
            ...loginData,
            password : val,
            checkPasswordInput : true  
            
        })}
        else{
            setLoginData({
                ...loginData,
                password : val
                
            })
        }

    }

    const HandlePasswordIcon =()=>{
        setLoginData({
            ...loginData,
        secureTextEntry : !loginData.secureTextEntry

    })
    }

    const HandleLogin = async() =>{
       const {email,password} = loginData;
        try{
            const {email : retrievedEmail , password : retrievedPassword} = await getData();
            if(email ==retrievedEmail && password ==retrievedPassword){

                await AsyncStorage.setItem('sessionActive', 'true');

                navigation.navigate(SCREENS.DRAWER);
            }
            else{
                ToastAndroid.show('Email ID and password not found', ToastAndroid.SHORT);
                 }
        
    }
    catch(e){
        console.log("error reported",e);
    }
    }



    
    
  return (
  <View style={styles.container}>
    <View style={styles.header}>
    <Text style ={[styles.title, {fontWeight :'bold'}, {color : '#fff'}]}>
        Log into your Account
    </Text>
    </View>

    <Animatable.View animation= "fadeInUpBig" style={styles.footer}>
    <Text style ={styles.textStyle}>
       Email :
    </Text>
    <View style = {styles.action}>
        
         <FontAwesome
         name ="user-o"
         color = "#05375a"
         size ={20}
         /> 
        
           
            <TextInput
            placeholder="Enter your Email"
            placeholderTextColor={"black"}
            onChangeText={(val)=>HandleChange(val)}
            style ={styles.textInput}
            autoCapitalize="none"
            />

            {loginData.checkTextInputChange ? 
            <Animatable.View animation= "bounceIn">
            <Feather
            name ='check-circle'
            color='green'
            size ={20} 
            />
            </Animatable.View> 
            : null
            
        }
            
        </View>


 
        <Text style ={styles.textStyle}>
       Password :
    </Text>
    <View style ={styles.action}>
            <FontAwesome
            name ="lock"
            color = "#05375a"
            size ={20}
            />
            <TextInput
            placeholder="Enter your Password"

           secureTextEntry = {loginData.secureTextEntry ?true : false}
          
            placeholderTextColor={"black"}
            style ={styles.textInput}
            onChangeText={(val) => HandlePasswordChange(val)}
            autoCapitalize="none"
            />

            <TouchableOpacity onPress={()=>HandlePasswordIcon()}>
            {loginData.secureTextEntry ? 
            <Feather
            name ='eye-off'
            color='grey'
            size ={20} 
            /> : 
            <Feather
            name ='eye'
            color='grey'
            size ={20} 
            />
            
        }

            </TouchableOpacity>
            
            
        </View>

        <View style={styles.button}>
        <TouchableOpacity onPress={()=>navigation.navigate(SCREENS.SIGNUP)}>
            
            <LinearGradient 
            colors ={ ['#045c33', '#045c33']}
            style ={[ styles.signIn ,{marginTop : 4}]}>
                <Text style ={styles.titletext}>Go to Sign Up</Text>
            </LinearGradient>
            </TouchableOpacity>
    
            <TouchableOpacity onPress={()=>{HandleLogin()}}>
                
            <LinearGradient 
            colors ={ ['#045c33', '#045c33']}
            style ={ [styles.signIn,{marginTop : 12} ]} >
                <Text style ={styles.titletext}> LogIn </Text>
            </LinearGradient>
                </TouchableOpacity>

        </View>
  </Animatable.View>
  </View>
  
  )
}

export default SignIn

const {height} = Dimensions.get("screen");
const height_logo = height * 0.28;


const styles = StyleSheet.create(
    {
        container : {
            flex : 1,
           backgroundColor : "#045c33"
        },
       header : {
        flex : 1,
        justifyContent : 'center',
        alignItems : 'center'
        },
        footer :{
            flex : 2,
            backgroundColor : "#fff",
            borderTopLeftRadius : 30,
            borderTopRightRadius : 30,
            paddingVertical : 30,
            paddingHorizontal : 20
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
        width : 150,
        height :40,
        justifyContent : 'center',
        alignItems : 'center',
        borderRadius : 50,
        flexDirection : 'row',
    },
    textSign :{
        color : 'white',
        fontWeight : 'bold'
    },
    textStyle :{
        color : '#045c33',
        fontWeight : 'bold'
    },
    action :{
        flexDirection :'row',
        marginTop :10,
        marginBottom : 20,
        borderBottomWidth :1,
        borderBottomColor : '#f2f2f2',
        paddingBottom : 5,
        alignItems : 'center'
    },
    textInput : {
        flex : 1,
        paddingLeft :10,
        color : '#097d33',
        alignItems : 'center'
    },
    
    titletext :{
        color : "#fff",
        fontSize :20,
       
    }
}
);