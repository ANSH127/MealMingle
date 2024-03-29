import { View, Text, ImageBackground, Button } from 'react-native'
import React from 'react'
import { ArrowLongRightIcon,ArrowRightCircleIcon } from "react-native-heroicons/solid";


export default function WelcomeScreen({ navigation }) {
  const [progress, setProgress] = React.useState(1);
  return (
    <ImageBackground source={require('../assets/images/welcome2.png')} style={{ flex: 1, width: '100%', height: '100%' }}>
      <View
        className='flex-1 justify-end mb-10'
      >


        {
          progress === 1 &&
          <View className='bg-orange-500 p-4 mx-4  shadow-lg rounded-3xl '>
            <Text className='text-white text-3xl font-bold text-center'>
              We serve incomparable delicacies
            </Text>
            <Text className='text-white font-light  text-lg'>
              All the best restaurants with their top menu waiting for you, they cant’t wait for your order!!
            </Text>
            {/* // indicator line */}
            <View className='flex-row justify-center my-5'>
              <View className='w-7 h-2 bg-white  rounded-xl  mx-2'></View>
              <View className='w-7 h-2 bg-gray-400  rounded-xl  mx-2'></View>
              <View className='w-7 h-2 bg-gray-400  rounded-xl  mx-2'></View>
            </View>

            {/* // skip and next buttons */}
            <View className='flex-row justify-between mt-5'>
              <Button title='Skip' color={'white'}
                onPress={() => navigation.navigate('Login')}
              />
              <View className='flex-row items-center'>
                <Button title='Next' color={'white'}
                  onPress={() => setProgress(progress + 1)}
                />
                <ArrowLongRightIcon color={'white'} />
              </View>



            </View>

          </View>}

        {
          progress === 2 &&
          <View className='bg-orange-500 p-4 mx-4  shadow-lg rounded-3xl '>
            <Text className='text-white text-3xl font-bold text-center'>
              We serve incomparable delicacies
            </Text>
            <Text className='text-white font-light  text-lg'>
              All the best restaurants with their top menu waiting for you, they cant’t wait for your order!!
            </Text>
            {/* // indicator line */}
            <View className='flex-row justify-center my-5'>
              <View className='w-7 h-2 bg-gray-400  rounded-xl  mx-2'></View>
              <View className='w-7 h-2  bg-white  rounded-xl  mx-2'></View>
              <View className='w-7 h-2 bg-gray-400  rounded-xl  mx-2'></View>
            </View>

            {/* // skip and next buttons */}
            <View className='flex-row justify-between mt-5'>
              <Button title='Skip' color={'white'}
                onPress={() => navigation.navigate('Login')}
              />
              
              <View className='flex-row items-center'>
                <Button title='Next' color={'white'}
                  onPress={() => setProgress(progress + 1)}
                />
                <ArrowLongRightIcon color={'white'} />
              </View>
            </View>

          </View>
        }

        {
          progress === 3 &&
          <View className='bg-orange-500 p-4 mx-4  shadow-lg rounded-3xl '>
            <Text className='text-white text-3xl font-bold text-center'>
              We serve incomparable delicacies
            </Text>
            <Text className='text-white font-light  text-lg'>
              All the best restaurants with their top menu waiting for you, they cant’t wait for your order!!
            </Text>
            {/* // indicator line */}
            <View className='flex-row justify-center my-5'>
              <View className='w-7 h-2 bg-gray-400  rounded-xl  mx-2'></View>
              <View className='w-7 h-2  bg-gray-400  rounded-xl  mx-2'></View>
              <View className='w-7 h-2 bg-white   rounded-xl  mx-2'></View>
            </View>

            <View className='flex-row justify-center mt-5'>

              <ArrowRightCircleIcon size={80}  color={'white'}
                onPress={() => navigation.navigate('Login')}
               />

            </View>

          </View>
        }

      </View>
    </ImageBackground>
  )
}