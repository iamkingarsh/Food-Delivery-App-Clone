import { View, Text, TouchableOpacity, Image, ScrollView, StyleSheet, } from 'react-native'
import { React, useEffect, useMemo, useState } from 'react'
import { TailwindProvider } from 'tailwindcss-react-native'
import { NavigationContainer, useNavigation } from '@react-navigation/native'
import { useDispatch, useSelector } from 'react-redux'
import { selectRestraunt } from '../features/restrauntSlice'
import { removeFromBasket, selectBasketItems, selectBasketTotal } from '../features/basketSlice'
import { SafeAreaView } from 'react-native-safe-area-context'
import { CheckBadgeIcon, PhoneIcon, TrashIcon, XCircleIcon } from 'react-native-heroicons/solid'
import { urlFor } from '../sanity'
import { CurrencyRupeeIcon, XMarkIcon } from 'react-native-heroicons/outline'
import { ChevronLeftIcon, ChevronRightIcon } from 'react-native-heroicons/outline';
import * as Animatable from 'react-native-animatable'


const OrderDetailsScreen = () => {
    const navigation = useNavigation();
    const restraunt = useSelector(selectRestraunt);
    const basketTotal = useSelector(selectBasketTotal)
    const items = useSelector(selectBasketItems)
    const [groupedItemsInBasket, setGroupedItemsInBasket] = useState([])
    const DeliveryRider = "Deepinder Goyal"

    DeliveryFee = 40
    useMemo(() => {
        const groupedItems = items.reduce((results, item) => {
            (results[item.id] = results[item.id] || []).push(item);
            return results;
        }, {})
        setGroupedItemsInBasket(groupedItems);
    }, [items]);


    return (
        <TailwindProvider>
            <SafeAreaView>
                <View className='flex-1 bg-gray-100'>
                    <View className='p-5 border-b border-[#cb202d] bg-white shadow-xs'>
                        <View className='items-center'>

                            <Text style={styles.font_bold} className="text-[20px] -mb-1 text-center">Your Order Details</Text>
                            <Text style={styles.font_semibold} className='text-center text-gray-400'>{restraunt.title}</Text>
                        </View>
                        <TouchableOpacity onPress={navigation.goBack}
                            className='rounded-full bg-gray-100 absolute top-3 right-5'>
                            <XCircleIcon color='#cb202d' size={45} />
                        </TouchableOpacity>
                    </View>
                </View>
                <View
                    className='flex-row space-x-4 justify-between p-4 border-b-2 border-gray-100 bg-white '>

                    <Text style={styles.font_semibold} className=''>Qt.</Text>
                    <Text style={styles.font_semibold} className=''>Item Name</Text>
                    <Text style={styles.font_semibold} className=''>Rate</Text>

                </View>
                <ScrollView className='divide-y divide-gray-200'>
                    {Object.entries(groupedItemsInBasket).map(([key, items]) => {
                        return (
                            <Animatable.View iterationCount={1}
                                animation="slideInUp" key={key} className="flex-row space-x-4 justify-between items-center p-4 bg-white">
                                <Text style={styles.font_semibold} className='text-[#cb202d]'>{items.length} x </Text>
                                <Image
                                    source={{ uri: urlFor(items[0]?.image).url() }}
                                    style={{ height: 50, width: 50, borderRadius: 10, marginHorizontal: 10 }}
                                />
                                <Text className="flex-1" style={styles.font_semibold}>{items[0]?.name}</Text>
                                {/* <CurrencyRupeeIcon size={20} color='black' opacity={0.75} /> */}
                                <Text style={styles.font_semibold}>₹{items.length * items[0]?.price}</Text>

                            </Animatable.View>

                        )
                    })}
                </ScrollView>

                <Animatable.View iterationCount={1}
                    animation="slideInUp" className="p-5 mt-2 space-y-2 bg-white">
                    <Animatable.View iterationCount={1}
                        animation="slideInUp" className="flex-row justify-between opacity-40">
                        <Text style={styles.font_semibold}>Subtotal</Text>
                        <View className="flex-row space-x-2 items-center">
                            {/* <CurrencyRupeeIcon size={20} color='black' opacity={0.75} /> */}
                            <Text style={styles.font_semibold}>₹{basketTotal}</Text>
                        </View>
                    </Animatable.View>
                    <Animatable.View iterationCount={1}
                        animation="slideInUp" className="flex-row justify-between opacity-40">
                        <Text style={styles.font_semibold}>Delivery Fee & Taxes</Text>
                        <View className="flex-row space-x-2 items-center">
                            {/* <CurrencyRupeeIcon size={20} color='black' opacity={0.75} /> */}
                            <Text style={styles.font_semibold}>₹{DeliveryFee}</Text>
                        </View>
                    </Animatable.View>
                    <Animatable.View iterationCount={1}
                        animation="slideInUp" className="flex-row justify-between">
                        <Text style={styles.font_bold} className="text-lg">Order Total</Text>
                        <View className="flex-row space-x-2 items-center">
                            {/* <CurrencyRupeeIcon size={20} color='black' opacity={0.75} /> */}
                            <Text style={styles.font_bold} className="text-lg">₹{basketTotal + DeliveryFee}</Text>
                        </View>
                    </Animatable.View>

                </Animatable.View>

                <Animatable.View iterationCount={1}
                    animation="slideInUp" className="bg-white m-4 p-4 rounded-lg shadow-xl shadow-[#cb202d]">
                    <Text style={styles.font_bold} className="text-xl pb-4 border-b-2 border-gray-100">Your Delivery Rider</Text>
                    <View className="flex-row space-x-4 justify-evenly items-center pt-4">

                        <Image source={{
                            // uri: "http://bit.ly/40fEUQx",
                            uri: "http://bit.ly/40fEUQx",
                        }}
                            className="h-12 w-12 bg-gray-300 px-4 rounded-full "
                        />
                        <View className="flex-1">
                            <Text style={styles.font_semibold} className="text-lg">{DeliveryRider}</Text>
                            <View className="flex-row items-center space-x-2">
                                <Text style={styles.font_regular} className="text-sm font-medium text-gray-500">Your Rider is Verified</Text>
                                <CheckBadgeIcon color={'rgb(107 114 128)'} size={18} />
                            </View>

                        </View>
                        <TouchableOpacity className="">
                            <View className="bg-slate-100 p-4 rounded-2xl">

                                <PhoneIcon color={'#cb202d'} />
                            </View>
                        </TouchableOpacity>
                    </View>
                </Animatable.View>
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
    }
})
export default OrderDetailsScreen