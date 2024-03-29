import { View, Text, Image, TouchableWithoutFeedback, Keyboard, Alert, KeyboardAvoidingView } from 'react-native'
import React from 'react'
import { colors } from '../theme'
import { SafeAreaView } from 'react-native-safe-area-context'
import { TouchableOpacity } from 'react-native'
// import { ArrowLeftIcon } from 'react-native-heroicons/solid';
import { TextInput } from 'react-native'
import { Ionicons } from '@expo/vector-icons';
import { useState } from 'react';
import Loadar from '../components/Loadar'

export default function LoginScreen({ navigation}) {
  const [loading, setLoading] = React.useState(false)
  const [email, setEmail] = React.useState('')
  const [password, setPassword] = React.useState('')
  const [isPasswordHidden, setIsPasswordHidden] = useState(true);

  const handleSignIn = () => {
    if (email === '' || password === '') {
      Alert.alert('Please fill all the fields')
      navigation.navigate('PostLogin')

    } else {
      setLoading(true)
      setTimeout(() => {
        setLoading(false)
        navigation.navigate('PostLogin')
      }, 1000)

    }
  }
  return(
      <TouchableWithoutFeedback onPress={Keyboard.dismiss} >

        <View className='h-full bg-white'>
          <SafeAreaView className='flex' >

            <View className='pt-7 px-7 justify-center '>
              <Text className='text-4xl font-semibold '>
                Login to your
              </Text>
              <View className='justify-center'>
                <Text className={`text-4xl font-bold text-orange-400 ${colors.heading}`} >
                  account.
                </Text>
              </View>
              <View className='justify-center'>
                <Text className='py-1 text-sm' style={{ color: '#878787' }} >
                  Please Sign in to your account to continue
                </Text>
              </View>

            </View>

          </SafeAreaView>
          <View className=' px-8 p-8' style={{ borderTopLeftRadius: 50, borderTopRightRadius: 50 }}>
            <View className='form space-y-2'>
              <Text className=' ml-4 text-black font-semibold'>Email Address</Text>
              <TextInput className='p-4 mb-3 border-2 border-black text-black rounded-xl ' placeholder='Enter Email '

                onChangeText={
                  (text) => setEmail(text)
                } />
              <Text className='text-black font-semibold ml-4'>Password</Text>
              <View
                className={`p-4 mb-3 border-2 border-black flex-row justify-between rounded-xl`}
              >
                <TextInput
                  secureTextEntry={isPasswordHidden}
                  style={{ flex: 1 }}
                  placeholder='Enter Password'
                  onChangeText={(text) => setPassword(text)}
                />
                <TouchableOpacity onPress={() => setIsPasswordHidden(!isPasswordHidden)}>
                  <Ionicons name={isPasswordHidden ? 'eye-off' : 'eye'} size={24} color='black' />
                </TouchableOpacity>
              </View>
              <TouchableOpacity className='flex items-end my-2' onPress={() => navigation.navigate('ForgetPass')} >
                <Text className={`text-right mr-4 ${colors.heading} font-bold`}>Forgot Password?</Text>
              </TouchableOpacity>

              {
                loading ? <Loadar /> :
                  <TouchableOpacity className={`p-3  rounded-2xl bg-orange-400  ${colors.button}`}
                    onPress={handleSignIn} >
                    <Text className={`text-center  text-white text-xl `}>Sign In</Text>
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
            <View className='flex-row justify-center items-center py-5'>
              <Image source={require('../assets/images/googleIcon.png')} style={{ width: 50, height: 50 }} />
              
            </View>


            <View className='flex-row justify-center mt-2'>
              <Text className=' text-gray-500 font-bold '
              onPress={() => navigation.navigate('SignUp')}
              >Don't have an account?</Text>
              <TouchableOpacity onPress={() => navigation.navigate('SignUp')}>
                <Text className={` font-bold ${colors.heading}`} >Register</Text>
              </TouchableOpacity>
            </View>

          </View>
        </View>
      </TouchableWithoutFeedback>
  )
}