import { View, Text, Image, TouchableWithoutFeedback, Keyboard, Alert, KeyboardAvoidingView,Platform } from 'react-native'
import React from 'react'
import { colors } from '../theme'
import { SafeAreaView } from 'react-native-safe-area-context'
import { TouchableOpacity } from 'react-native'
// import { ArrowLeftIcon } from 'react-native-heroicons/solid';
import { TextInput } from 'react-native'
import { Ionicons } from '@expo/vector-icons';
import { useState } from 'react';
import Loadar from '../components/Loadar'
import { createUserWithEmailAndPassword, sendEmailVerification, updateProfile } from 'firebase/auth'
import { auth } from '../config/firebase'
import * as Calendar from 'expo-calendar';



import * as WebBrowser from "expo-web-browser";
import * as Google from "expo-auth-session/providers/google";
import AsyncStorage from "@react-native-async-storage/async-storage";
import * as AuthSession from 'expo-auth-session';
import Constants from 'expo-constants';


WebBrowser.maybeCompleteAuthSession();

const EXPO_REDIRECT_PARAMS = { useProxy: true, projectNameForProxy: '@ansh09/MealMingle' };
const NATIVE_REDIRECT_PARAMS = { native: "com.ansh09.MealMingle://" };
const REDIRECT_PARAMS = Constants.appOwnership === 'expo' ? EXPO_REDIRECT_PARAMS : NATIVE_REDIRECT_PARAMS;
const redirectUri = AuthSession.makeRedirectUri(REDIRECT_PARAMS);


export default function SignUpScreen({ navigation }) {
  const [loading, setLoading] = React.useState(false)
  const [email, setEmail] = React.useState('')
  const [password, setPassword] = React.useState('')
  const [isPasswordHidden, setIsPasswordHidden] = useState(true);
  const [username, setUsername] = React.useState('')
  const [isTermsChecked, setIsTermsChecked] = React.useState(false);


  const [accessToken, setAccessToken] = React.useState(null);
  const [user, setUser] = React.useState(null);
  const [request, response, promptAsync] = Google.useAuthRequest({
    clientId: "602772851359-ji87c6mjlec76e5bn4tmseoo0j5nnbio.apps.googleusercontent.com",
    iosClientId: "602772851359-n15st6gtbjqt1v59r215cg26aekctk7e.apps.googleusercontent.com",
    androidClientId: "602772851359-t0c32s210s4liuak7aa1j3ivnu4lsmr2.apps.googleusercontent.com",
    redirectUri
    
    
  });


  const handleSignUp = async () => {
    

    if (username === '' || email === '' || password === '' ) {
      Alert.alert('Please fill all the fields')

    }
    else if (!isTermsChecked) {
      Alert.alert('Please agree to the terms and conditions')
    }
     else {
      setLoading(true)
      try {
        const userCredential = await createUserWithEmailAndPassword(auth, email, password)
        const user = userCredential.user
        await sendEmailVerification(user)
        await updateProfile(user, { displayName: username })
        await createEvent(username);
        Alert.alert('Account created successfully')
        navigation.navigate('Login')
      } catch (error) {
        console.log(error);
        Alert.alert(error.message)
      }
      finally {
        setEmail('')
        setPassword('')
        setUsername('')
        setLoading(false)
      }

    }
  }

  const createEvent = async (userName) => {

    const { status } = await Calendar.requestCalendarPermissionsAsync();
    if (status === 'granted') {
      const calendars = await Calendar.getCalendarsAsync(Calendar.EntityTypes.EVENT);

      // find expo calendar id if found then create event else create calendar and then create event
      const expoCalendar = calendars.find(cal => cal.title === 'Expo Calendar');
      const event = {
        title: `${userName} SignUp Event`,
        startDate: new Date(),
        endDate: new Date(Date.now() + 10 * 60 * 1000), // 10 minutes from now
        timeZone: 'Asia/Kolkata',
        location: 'Location',
        alarms: [{ relativeOffset: -60, method: Calendar.AlarmMethod.ALERT }],


      };
      if (expoCalendar) {


        const eventID =await Calendar.createEventAsync(expoCalendar.id, event);
        console.log(`Created a new event with id ${eventID}`);
      }

      else {
        const defaultCalendarSource =
          Platform.OS === 'ios'
            ? await getDefaultCalendarSource()
            : { isLocalAccount: true, name: 'Expo Calendar' };
        const newCalendarID = await Calendar.createCalendarAsync({
          title: 'Expo Calendar',
          color: 'blue',
          entityType: Calendar.EntityTypes.EVENT,
          sourceId: defaultCalendarSource.id,
          source: defaultCalendarSource,
          name: 'internalCalendarName',
          ownerAccount: 'personal',
          accessLevel: Calendar.CalendarAccessLevel.OWNER,
        });



        const eventID =await Calendar.createEventAsync(newCalendarID, event);
        console.log(`Created a new event with id ${eventID}`);


      }

    }
  }


  const getDefaultCalendarSource = async () => {
    const defaultCalendar = await Calendar.getDefaultCalendarAsync();
    return defaultCalendar.source;
  }

  React.useEffect(() => {
    if (response?.type === 'success') {
      setAccessToken(response.authentication.accessToken);
      accessToken && fetchUserInfo();

    }
  }, [response, accessToken]);

  const fetchUserInfo = async () => {
    const userInfoResponse = await fetch(
      `https://www.googleapis.com/userinfo/v2/me`, {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    }
    );
    const userInfo = await userInfoResponse.json();
    // console.log(userInfo);
    setUser(userInfo);
    await createEvent(userInfo?.raw_user_meta_data?.name);
    navigation.navigate('PostLogin')
    Alert.alert('Signed in successfully'+userInfo?.raw_user_meta_data?.name)
  };

  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss} >

      <View className='h-full bg-white'>
        <SafeAreaView className='flex' >

          <View className='pt-7 px-7 justify-center'>
            <Text className='text-4xl font-semibold '>
              Create your new
            </Text>
            <View className='justify-center'>
              <Text className={`text-5xl font-bold ${colors.heading}`} >
                account.
              </Text>
            </View>
            <View className='justify-center'>
              <Text className='py-1 text-sm' style={{ color: '#878787' }} >
                Create an account to start looking for the food you like.
              </Text>
            </View>

          </View>

        </SafeAreaView>
        <View className=' px-8 ' style={{ borderTopLeftRadius: 50, borderTopRightRadius: 50 }}>
          <View className='form space-y-2'>
            <Text className=' ml-4 text-black font-semibold'>Email Address</Text>
            <TextInput className='p-4 mb-3 border-2 border-black text-black rounded-xl ' placeholder='Enter Email '
              defaultValue={email}
              onChangeText={
                (text) => setEmail(text)
              } />

            <Text className=' ml-4 text-black font-semibold'>User Name</Text>
            <TextInput className='p-4 mb-3 border-2 border-black text-black rounded-xl ' placeholder='Enter Username '

              defaultValue={username}
              onChangeText={
                (text) => setUsername(text)
              } />
            <Text className='text-black font-semibold ml-4'>Password</Text>
            <View
              className={`p-4 mb-3 border-2 border-black flex-row justify-between rounded-xl`}
            >
              <TextInput
                secureTextEntry={isPasswordHidden}
                style={{ flex: 1 }}
                placeholder='Enter Password'
                defaultValue={password}
                onChangeText={(text) => setPassword(text)}
              />
              <TouchableOpacity onPress={() => setIsPasswordHidden(!isPasswordHidden)}>
                <Ionicons name={isPasswordHidden ? 'eye-off' : 'eye'} size={24} color='black' />
              </TouchableOpacity>
            </View>

            {/* // term and condition checkbox */}
            <View className='flex-row items-center'>
              <TouchableOpacity onPress={() => setIsTermsChecked(!isTermsChecked)}>
                <Ionicons name={isTermsChecked ? 'checkbox' : 'checkbox-outline'} size={24} color='orange' />
              </TouchableOpacity>
              <Text className='text-black ml-2'>I agree to the terms and conditions</Text>
            </View>




            {
              loading ? <Loadar /> :
                <TouchableOpacity className={`p-3  rounded-2xl ${colors.button}`}
                  onPress={handleSignUp} >
                  <Text className={`text-center  text-white text-xl `}>Register</Text>
                </TouchableOpacity>}
          </View>

          <View className='flex-row justify-center items-center mt-5'>
            <View className='border-t border-gray-500 flex-grow mr-3'></View>
            <Text className='font-bold' style={{
              color: '#878787'

            }}>
              Or Sign in with
            </Text>
            <View className='border-t border-gray-500 flex-grow ml-3'></View>
          </View>

          {/* // Google and Facebook buttons */}
          <TouchableOpacity className='flex-row justify-center items-center py-5' onPress={() => promptAsync()} >
            <Image source={require('../assets/images/googleIcon.png')} style={{ width: 50, height: 50 }} />

          </TouchableOpacity>


          <View className='flex-row justify-center mt-2'>
            <Text className=' text-gray-500 font-bold '>Have an account?</Text>
            <TouchableOpacity onPress={() => navigation.navigate('SignUp')}>
              <Text className={` font-bold ${colors.heading}`}
                onPress={() => navigation.navigate('Login')}
              > Sign In</Text>
            </TouchableOpacity>
          </View>

        </View>
      </View>
    </TouchableWithoutFeedback>
  )
}