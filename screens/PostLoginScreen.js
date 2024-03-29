import { View, Text, Image, TouchableWithoutFeedback, Keyboard, Alert, KeyboardAvoidingView } from 'react-native'
import React from 'react'
import { themeColors } from '../theme'
import { SafeAreaView } from 'react-native-safe-area-context'
import { TouchableOpacity } from 'react-native'
import { TextInput } from 'react-native'
import Loadar from '../components/Loadar'
import { colors } from '../theme'

export default function PostLoginScreen({ navigation }) {
  const [loading, setLoading] = React.useState(false)

  const [email, setEmail] = React.useState('')
  const [password, setPassword] = React.useState('')

  const handleSignIn = () => {
  }


  return (

    <View className='h-full bg-white' >
      <SafeAreaView className='flex' >
        <View className='flex-row justify-center'>

          <Image source={require('../assets/images/sucess2.png')} style={{ width: 300, height: 250 }} />
        </View>

      </SafeAreaView>
      <View className=' bg-white px-8 p-8' style={{ borderTopLeftRadius: 50, borderTopRightRadius: 50 }}>

        <View className=' justify-center mb-5'>
          <Text className='text-4xl text-center font-semibold '>
            Login Successful
          </Text>
          <Text className='py-1 text-sm text-center' style={{ color: '#878787' }}>
            An event has been created and the invite has been sent to you on mail.
          </Text>
        </View>
        <View>
          {
            loading ? <Loadar /> :
              <TouchableOpacity className={`p-3  rounded-2xl bg-orange-400  ${colors.button}`}
                onPress={handleSignIn} >
                <Text className={`text-center  text-white text-xl `}>Logout</Text>
              </TouchableOpacity>}
        </View>

      </View>
    </View>
  )
}