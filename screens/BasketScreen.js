import { View, Text, TouchableOpacity, Image, ScrollView, StyleSheet, } from 'react-native'
import { React, useEffect, useMemo, useState } from 'react'
import { TailwindProvider } from 'tailwindcss-react-native'
import { NavigationContainer, useNavigation } from '@react-navigation/native'
import { useDispatch, useSelector } from 'react-redux'
import { selectRestraunt } from '../features/restrauntSlice'
import { removeFromBasket, selectBasketItems, selectBasketTotal } from '../features/basketSlice'
import { SafeAreaView } from 'react-native-safe-area-context'
import { TrashIcon, XCircleIcon } from 'react-native-heroicons/solid'
import { urlFor } from '../sanity'
import { CurrencyRupeeIcon, XMarkIcon } from 'react-native-heroicons/outline'
import { ChevronLeftIcon, ChevronRightIcon } from 'react-native-heroicons/outline';
import * as Animatable from 'react-native-animatable'



// import { SafeAreaView } from 'react-native'

const BasketScreen = () => {
    const navigation = useNavigation();
    const restraunt = useSelector(selectRestraunt);
    const basketTotal = useSelector(selectBasketTotal)
    const items = useSelector(selectBasketItems)
    const [groupedItemsInBasket, setGroupedItemsInBasket] = useState([])
    const dispatch = useDispatch();
    const DeliveryFee = 40;

    useMemo(() => {
        const groupedItems = items.reduce((results, item) => {
            (results[item.id] = results[item.id] || []).push(item);
            return results;
        }, {})
        setGroupedItemsInBasket(groupedItems);
    }, [items]);

    // console.log(groupedItemsInBasket);
    if (items.length === 0) return (
        <TailwindProvider>


            <SafeAreaView className='flex-1 bg-white'>
                <View className='flex-1 bg-gray-100'>
                    <View className='p-5 border-b border-[#cb202d] bg-white shadow-xs'>
                        <View className='items-center'>

                            <Text style={styles.font_bold} className="text-[20px] -mb-1 text-center">Basket</Text>
                            <Text style={styles.font_semibold} className='text-center text-gray-400'>{restraunt.title}</Text>
                        </View>
                        <TouchableOpacity onPress={navigation.goBack}
                            className='rounded-full bg-gray-100 absolute top-3 right-5'>
                            <XCircleIcon color='#cb202d' size={45} />
                        </TouchableOpacity>
                    </View>

                    <View className="justify-center items-center flex-1 space-y-5">

                        <Animatable.Text iterationCount={1}
                            animation="slideInUp" style={styles.font_regular} className="text-lg">No items in the Basket</Animatable.Text>
                        <Animatable.View iterationCount={1}
                            animation="slideInUp">
                            <TouchableOpacity
                                onPress={navigation.goBack}
                                className="flex-row space-x-2 bg-[#cb202d] py-2 px-5 rounded-md items-center">
                                <View className="rounded-full p-2 bg-red-800 w-6 h-6 items-center align-middle justify-center">

                                    <ChevronLeftIcon size={18} color={'white'} />
                                </View>
                                <Text style={styles.font_bold} className="text-white text-lg">Go Back</Text>
                            </TouchableOpacity>
                        </Animatable.View>
                    </View>
                </View>

            </SafeAreaView>

        </TailwindProvider >
    );

    return (

        <TailwindProvider>

            <SafeAreaView style={{ flex: 1 }} className='flex-1 bg-white'>
                <View className='flex-1 bg-gray-100'>
                    <View className='p-5 border-b border-[#cb202d] bg-white shadow-xs'>
                        <View className='items-center'>

                            <Text style={styles.font_bold} className="text-[20px] -mb-1 text-center">Basket</Text>
                            <Text style={styles.font_semibold} className='text-center text-gray-400'>{restraunt.title}</Text>
                        </View>
                        <TouchableOpacity onPress={navigation.goBack}
                            className='rounded-full bg-gray-100 absolute top-3 right-5'>
                            <XCircleIcon color='#cb202d' size={45} />
                        </TouchableOpacity>
                    </View>
                    <View
                        className='flex-row items-center space-x-4 px-4 py-4 border-b-2 border-gray-100 bg-white '>
                        <Image source={{ uri: 'https://links.papareact.com/wru' }}
                            className='h-7 w-7 bg-gray-300 p-4 rounded-full'
                        />
                        <Text style={styles.font_semibold} className='flex-1'>Delivering in 35-40 mins</Text>
                        <TouchableOpacity>
                            <Text style={styles.font_regular} className='text-[#cb202d]'>Change</Text>
                        </TouchableOpacity>
                    </View>
                    <ScrollView className='divide-y divide-gray-200'>
                        {Object.entries(groupedItemsInBasket).map(([key, items]) => {
                            return (
                                <Animatable.View iterationCount={1}
                                    animation="slideInUp" key={key} className="flex-row space-x-2 items-center py-4 px-4 bg-white">
                                    <Text style={styles.font_semibold} className='text-[#cb202d]'>{items.length} x </Text>
                                    <Image
                                        source={{ uri: urlFor(items[0]?.image).url() }}
                                        style={{ height: 50, width: 50, borderRadius: 10, marginHorizontal: 10 }}
                                    />
                                    <Text className="flex-1" style={styles.font_semibold}>{items[0]?.name}</Text>
                                    {/* <CurrencyRupeeIcon size={20} color='black' opacity={0.75} /> */}
                                    <Text style={styles.font_semibold}>₹{items.length * items[0]?.price}</Text>

                                    <TouchableOpacity
                                        onPress={() => dispatch(removeFromBasket({ id: key }))}
                                    >
                                        <XMarkIcon size={25} color={'#cb202d'} />
                                    </TouchableOpacity>
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
                        <Animatable.View iterationCount={1}
                            animation="slideInUp">

                            <TouchableOpacity
                                onPress={() => navigation.navigate('PreparingOrder')}
                                className="rounded-lg items-center bg-[#cb202d] p-4">
                                <Text style={styles.font_semibold}
                                    className="text-white text-center text-lg">Place Order</Text>
                            </TouchableOpacity>
                        </Animatable.View>
                    </Animatable.View>
                </View>
            </SafeAreaView>

        </TailwindProvider>


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

export default BasketScreen