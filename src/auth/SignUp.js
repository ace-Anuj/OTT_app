import React, { useEffect, useState } from 'react'
import {View,Text,Button,StyleSheet,Image, Dimensions,TouchableOpacity, TextInput, ToastAndroid} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import * as Animatable from 'react-native-animatable';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import Feather from 'react-native-vector-icons/Feather';
import { saveData, getData } from './Authorization';
import SCREENS from '../assets/constants/SCREENS';



function SignUp({navigation}) {
   
    
    const [data, setData] = useState({
        
        email : '',
        password : '',
        confirmPassword : '',
        checkTextInputChange : false,
        secureTextEntry: true,
        checkPasswordInput : false,
        checkConfirmPasswordInput : false,
        checkConfirmPasswordEntry : true
    });
    
    const [isUserRegistered, setIsUserRegistered] = useState(false);
    
    const HandleChange = (val) => {
        const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;
        if (emailRegex.test(val)) {
            setData((prevData) => ({
              ...prevData,
              email: val,
              checkTextInputChange: true,  
            }));
          } else {
            setData((prevData) => ({
              ...prevData,
              email: val,
              checkTextInputChange: false, 
            }));
          }
      };

     
   

      const HandleSubmission = async () => {
        const { email, password,confirmPassword } = data;
        console.log("Handling submission with email:", email, "and password:", password); 
        try {
        
          if (!email || !password) {
            
            ToastAndroid.show('Email and password must be filled ', ToastAndroid.SHORT);
            return;
          }

          if (!data.checkTextInputChange) {
            ToastAndroid.show('Please enter a valid email address', ToastAndroid.SHORT);
            return;
          }

          if (confirmPassword !== password) {
            ToastAndroid.show('Password and Confirm Password do not match', ToastAndroid.SHORT);
            return;
          }

          const { email: retrievedEmails } = await getData();



          if (retrievedEmails === email) {
              ToastAndroid.show('User is already registered!', ToastAndroid.SHORT);
              setIsUserRegistered(true); 
              return;
          }

            await saveData(email,password);
            
            const{email : retrievedEmail, password : retrievedPassword} = await getData();
            console.log("email saved : ", retrievedEmail , "password saved :", retrievedPassword );



            ToastAndroid.show('You are sucessfully Registered', ToastAndroid.SHORT);

            
            setTimeout(()=>{
                ToastAndroid.show('Redirecting to login Page...', ToastAndroid.SHORT);
            },1000)
          
            
            setTimeout(()=>{
                navigation.navigate(SCREENS.SIGNIN);
            },5000

            );

          
          
        } catch (e) {
          console.log("Error during submission:", e);
        }
      };
   
    

    

    const HandlePasswordChange =(val) =>{

        if(val.length > 0){
        setData({
            ...data,
            password : val,
            checkPasswordInput : true
            

        
            
        })}
        else{
            setData({
                ...data,
                password : val
                
            })
        }
    }

    const HandleConfirmPasswordChange =(val) =>{

        if(val.length > 0){
        setData({
            ...data,
            confirmPassword : val,
            checkConfirmPasswordInput : true
            

        
            
        })}
        else{
            setData({
                ...data,
                confirmPassword : val
                
            })
        }

        

    }

    const HandlePasswordIcon =()=>{
        setData({
            ...data,
        secureTextEntry : !data.secureTextEntry

    })
    }

    const HandleConfirmPasswordIcon =()=>{
        setData({
            ...data,
        checkConfirmPasswordEntry : !data.checkConfirmPasswordEntry

    })
    }

    
   
    
  return (
  <View style={styles.container}>
    <View style={styles.header}>
    <Text style ={[styles.title, {fontWeight :'bold'}, {color : '#fff'},{marginBottom : 20}]}>
        Register Now!
    </Text>
   
    <Image  source ={require("../assets/images/profile2.jpg")}
     style ={[styles.logo,{borderRadius : 70}]}
     resizeMode="stretch"
    />

   

    </View>

    <Animatable.View animation = "fadeInUpBig" style={styles.footer}>
    <Text style ={styles.textStyle}>
       Email :
    </Text>
    <View   style ={styles.action}>
        
         <FontAwesome
         name ="user"
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

            {data.checkTextInputChange ? 
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

           secureTextEntry = {data.secureTextEntry ?true : false}
          
            placeholderTextColor={"black"}
            style ={styles.textInput}
            onChangeText={(val) => HandlePasswordChange(val)}
            autoCapitalize="none"
            />

            <TouchableOpacity onPress={()=>HandlePasswordIcon()}>
            {data.secureTextEntry ? 
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

        
        <Text style ={styles.textStyle}>
       Confirm Password :
    </Text>
    <View style ={styles.action}>
            <FontAwesome
            name ="lock"
            color = "#05375a"
            size ={20}
            />
            <TextInput
            placeholder="Confirm your Password"

           secureTextEntry = {data.checkConfirmPasswordEntry ? true : false}
          
            placeholderTextColor={"black"}
            style ={styles.textInput}
            onChangeText={(val) => HandleConfirmPasswordChange(val)}
            autoCapitalize="none"
            />

            <TouchableOpacity onPress={()=>HandleConfirmPasswordIcon()}>
            {data.checkConfirmPasswordEntry ? 
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
        <TouchableOpacity onPress={()=>HandleSubmission()}>
            
            <LinearGradient 
            colors ={ ['#045c33', '#045c33']}
            style ={[ styles.signIn ,{marginTop : 12}]}>
                <Text style ={styles.titletext}> Submit</Text>
            </LinearGradient>
            </TouchableOpacity>
    
            <TouchableOpacity onPress={()=>navigation.navigate(SCREENS.SIGNIN)}>
                
            <LinearGradient 
            colors ={ ['#045c33', '#045c33']}
            style ={ [styles.signIn,{marginTop : 12} ]} >
                <Text style ={styles.titletext}> Sign In</Text>
            </LinearGradient>
                </TouchableOpacity>

        </View>
  </Animatable.View>
  </View>
  
  )
}

export default SignUp

const {height} = Dimensions.get("screen");
const height_logo = height * 0.13;


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
      }
    }

);