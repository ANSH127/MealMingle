import { View, Text, TouchableWithoutFeedback, Keyboard, Alert,TextInput } from 'react-native'
import React from 'react'
import { colors } from '../theme'
import { SafeAreaView } from 'react-native-safe-area-context'
import { TouchableOpacity } from 'react-native'
import { useState } from 'react';
import Loadar from '../components/Loadar'
import { auth } from '../config/firebase'
import { sendPasswordResetEmail } from 'firebase/auth'


export default function ForgetPassScreen({ navigation }) {
    const [loading, setLoading] = React.useState(false)
    const [email, setEmail] = React.useState('')

    const handlePasswordReset = async() => {
        if (email === '' ) {
            Alert.alert('Please fill all the fields')
        } else {
            setLoading(true)
            try {
                await sendPasswordResetEmail(auth, email)
                Alert.alert('Password reset email sent')
                navigation.navigate('Login')
            } catch (error) {
                console.log(error);
                Alert.alert(error.message)
            }
            finally {
                setEmail('')
                setLoading(false)
            }

        }
    }
    return (
        <TouchableWithoutFeedback onPress={Keyboard.dismiss} >

            <View className='h-full bg-white'>
                <SafeAreaView className='flex' >

                    <View className='pt-7 px-7 justify-center '>
                        <Text className='text-4xl font-semibold '>
                            Forgot password?
                        </Text>
                        <View className='justify-center'>
                            <Text className='py-1 text-sm' style={{ color: '#878787' }} >
                                Enter your email address and we’ll send you confirmation code to reset your password
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

                        {
                            loading ? <Loadar /> :
                                <TouchableOpacity className={`p-3  rounded-2xl ${colors.button}`}
                                    onPress={handlePasswordReset} >
                                    <Text className={`text-center  text-white text-xl `}>

                                        Send Confirmation Code
                                    </Text>
                                </TouchableOpacity>}
                    </View>


                </View>
            </View>
        </TouchableWithoutFeedback>
    )
}