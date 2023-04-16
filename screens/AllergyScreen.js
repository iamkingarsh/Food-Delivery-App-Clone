import { View, Text, TouchableOpacity, Image, ScrollView, StyleSheet, } from 'react-native'
import { React, } from 'react'
import { TailwindProvider } from 'tailwindcss-react-native'
import { NavigationContainer, useNavigation } from '@react-navigation/native'
import { useDispatch, useSelector } from 'react-redux'
import { selectRestraunt } from '../features/restrauntSlice'
import { removeFromBasket, selectBasketItems, selectBasketTotal } from '../features/basketSlice'
import { SafeAreaView } from 'react-native-safe-area-context'
import { PhoneIcon, TrashIcon, XCircleIcon } from 'react-native-heroicons/solid'

import * as Animatable from 'react-native-animatable'
import { ChatBubbleOvalLeftEllipsisIcon } from 'react-native-heroicons/outline'
import { TextInput } from 'react-native'
import { TextInputComponent } from 'react-native'
import { TextBase } from 'react-native'

const AllergyScreen = () => {
    const navigation = useNavigation();
    const restraunt = useSelector(selectRestraunt);
    return (
        <TailwindProvider>


            <SafeAreaView className='flex-1 bg-white'>
                <View className='flex-1 bg-gray-100'>
                    <View className='p-5 border-b border-[#cb202d] bg-white shadow-xs'>
                        <View className='items-center'>

                            <Text style={styles.font_bold} className="text-lg text-center">Got a Food Allery ?</Text>
                            <Text style={styles.font_medium} className='text-center text-gray-400'>Tell Your Custom Order</Text>
                        </View>
                        <TouchableOpacity onPress={navigation.goBack}
                            className='rounded-full bg-gray-100 absolute top-3 right-5'>
                            <XCircleIcon color='#cb202d' size={45} />
                        </TouchableOpacity>
                    </View>


                    <View className="p-4 m-3 rounded-lg bg-white items-center">
                        <View className="flex-row items-center">
                            <View className="space-y-2 flex mr-14">
                                <Text style={styles.font_bold} className="text-xl mr-4">Write Down Your Custom Order!</Text>
                                <Text style={styles.font_regular} className="mr-4 text-gray-500">Make a phone call to the restraunt or Mention all the allergies you have & the staff of <Text style={styles.font_semibold} className="">{restraunt.title}</Text> will make sure to avoid ingredients that collides with your allergies</Text>
                            </View>
                            <View className="-ml-10">
                                <ChatBubbleOvalLeftEllipsisIcon color={'#cb202d'} size={40} />
                            </View>
                        </View>
                        <View className="m-4 bg-gray-100 w-full h-1/3 rounded-lg p-3">
                            <TextInput style={styles.font_regular} selectionColor={'#cb202d'} placeholder=' Write Down Your Allergies!' cursorColor={'#cb202d'} keyboardType='default' />
                        </View>
                        <TouchableOpacity
                            onPress={() => navigation.navigate('WaitingRequest')}
                            className="p-4 bg-['#cb202d'] rounded-lg w-full">
                            <Text style={styles.font_semibold} className="text-white text-center">Send Request</Text>
                        </TouchableOpacity>
                        <Text className="text-gray-500 m-4">------------------ or ------------------</Text>
                        <TouchableOpacity

                            className="p-6 bg-['#cb202d'] rounded-lg w-full items-center flex-row space-x-2 justify-center">
                            <PhoneIcon color={'white'} size={18} />
                            <Text style={styles.font_semibold} className="text-white text-base text-center">Call {restraunt.title}</Text>
                        </TouchableOpacity>
                    </View>
                </View>


            </SafeAreaView>

        </TailwindProvider >
    )
}
const styles = StyleSheet.create({
    font_bold: {
        fontFamily: 'Poppins-Bold'
    },
    font_regular: {
        fontFamily: 'Poppins-Regular'
    },
    font_semibold: {
        fontFamily: 'Poppins-SemiBold'
    },
    font_medium: {
        fontFamily: 'Poppins-Medium'
    }
})
export default AllergyScreen