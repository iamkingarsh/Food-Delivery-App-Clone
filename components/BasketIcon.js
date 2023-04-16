import { View, Text, TouchableOpacity } from 'react-native'
import React, { useState } from 'react'
import { useSelector } from 'react-redux'
import { selectBasketItems, selectBasketTotal } from '../features/basketSlice'
import { useNavigation } from '@react-navigation/native'
import { TailwindProvider } from 'tailwindcss-react-native'
import { CurrencyRupeeIcon } from 'react-native-heroicons/outline'
import BasketScreen from '../screens/BasketScreen'
import * as Animatable from 'react-native-animatable'
import { StyleSheet } from 'react-native'

const BasketIcon = () => {
    const items = useSelector(selectBasketItems);
    const navigation = useNavigation();
    const basketTotal = useSelector(selectBasketTotal);

    if (items.length === 0) return null;

    return (
        <TailwindProvider>
            <Animatable.View
                iterationCount={1}
                animation="slideInUp" className='absolute bottom-10 w-full z-50 '>
                <TouchableOpacity onPress={() => navigation.navigate({ name: 'Basket', transitionStyle: 'slideInUp' })} className='flex-row space-x-1 items-center justify-center bg-[#cb202d] p-4  mx-5 rounded-lg'>
                    <Text style={styles.font_bold} className='text-white text-lg bg-red-800 py-1 px-2 rounded-md'>{items.length}</Text>
                    <Text style={styles.font_bold} className='text-white flex-1 text-lg text-center'>View Basket</Text>
                    <View className='flex-row space-x-1 items-center'>
                        {/* <CurrencyRupeeIcon size={20} color='white' /> */}
                        <Text style={styles.font_bold} className='text-lg text-white'>₹{basketTotal}</Text>

                    </View>
                </TouchableOpacity>
            </Animatable.View>
        </TailwindProvider>
    )
}
const styles = StyleSheet.create({
    font_bold: {
        fontFamily: 'Poppins-Bold'
    },
    font_regular: {
        fontFamily: 'Poppins-Regular'
    }
})

export default BasketIcon