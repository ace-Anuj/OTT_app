
import AsyncStorage from '@react-native-async-storage/async-storage';

    export const saveData = async (email,password,) => {

        try{
            await AsyncStorage.setItem('email' , email);
            await AsyncStorage.setItem('password',password);
           

        }
        catch (e){
            console.log("Error to set the data ", e);

        }
    }

    export const saveUserData = async (user) => {

        try{
            await AsyncStorage.setItem('username' , user);
           
        }
        catch (e){
            console.log("Error to set the data ", e);

        }
    }

    export const getData = async ()=>{
        try{
            const retrievedEmail =await AsyncStorage.getItem('email');
            const retrievedPassword =await AsyncStorage.getItem('password');
           
           return {'email' : retrievedEmail , 'password' :retrievedPassword } ;
        }
        catch (e){
            console.log('error in getting data :', e)

        }
    
 
}

export const removeData = async () => {
    try {
     
      await AsyncStorage.removeItem('email');
      await AsyncStorage.removeItem('password');
      await AsyncStorage.removeItem('username');
      await AsyncStorage.removeItem('userProfileImgCamera');
      await AsyncStorage.removeItem('userProfileImgGallery');
      await AsyncStorage.removeItem('sessionActive');

      console.log('Data successfully removed');
    } catch (error) {
      console.error('Error removing data:', error);
      throw error;
    }
  };


