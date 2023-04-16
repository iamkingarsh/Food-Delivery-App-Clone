import { View, Image, Text, ScrollView, TouchableOpacity, SafeAreaView } from 'react-native'
import React, { useEffect, useLayoutEffect, useState } from 'react'
import { useNavigation, useRoute } from '@react-navigation/native';
import { TailwindProvider } from 'tailwindcss-react-native';
import { ChevronLeftIcon, ChevronRightIcon } from 'react-native-heroicons/outline';
import { StarIcon } from 'react-native-heroicons/solid'
import { QuestionMarkCircleIcon } from 'react-native-heroicons/outline'
import MapIcon from 'react-native-heroicons/solid'
import DishRow from '../components/DishRow';
import BasketIcon from '../components/BasketIcon';
import { useDispatch } from 'react-redux';
import { setRestraunt } from '../features/restrauntSlice';
import { urlFor } from '../sanity';
import { clearBasket } from '../features/basketSlice';
import * as Animatable from 'react-native-animatable'
import { useFonts } from 'expo-font';
import { StyleSheet } from 'react-native';


const RestrauntScreen = () => {
    const navigation = useNavigation();
    const route = useRoute();
    const dispatch = useDispatch();
    const { params:
        { key, id,
            imgUrl,
            title,
            rating,
            genre,
            address,
            short_description,
            dishes,
            long,
            lat, },
    } = useRoute();

    const handleNavigateAway = () => {
        dispatch(clearBasket());
        navigation.goBack()
    }

    useEffect(() => {

        dispatch(setRestraunt({
            key, id,
            imgUrl,
            title,
            rating,
            genre,
            address,
            short_description,
            dishes,
            long,
            lat,
        }));

    }, [dispatch]);

    useLayoutEffect(() => {
        navigation.setOptions({
            headerShown: false,
        })
    }, []);

    useEffect(() => {
        // Set restaurant data in Redux store
        const { params: { key, id, ...rest } } = route;
        dispatch(setRestraunt({ key, id, ...rest }));

        // Cleanup function to clear shopping cart
        return () => {
            dispatch(clearBasket());
        }
    }, [dispatch, route]);

    const [fontsLoaded] = useFonts({
        'Poppins-Bold': require('../assets/fonts/Poppins-Bold.ttf'),
        'Poppins-Regular': require('../assets/fonts/Poppins-Regular.ttf'),
    });

    if (!fontsLoaded) {
        return null;
    }

    return (
        <>
            <BasketIcon />
            <TailwindProvider>
                <ScrollView>
                    <View className='relative bg-gray-900'>
                        <Image source={{ uri: imgUrl }}
                            className='w-full h-56 bg-gray-900 p-4 opacity-75'
                        />
                        <TouchableOpacity onPress={() => { navigation.goBack, handleNavigateAway() }} className='absolute top-14 left-5 p-2 bg-gray-100 rounded-full'>
                            <ChevronLeftIcon size={20} color='#cb202d' />
                        </TouchableOpacity>
                    </View>

                    <Animatable.View
                        iterationCount={1}
                        animation="slideInUp" className='bg-white '>
                        <View className='px-4 pt-4 '>
                            <Text style={styles.font_bold} className='text-3xl'>{title}</Text>
                            <View className="flex-row my-1 space-x-2">
                                <View className='flex-row items-center space-x-1'>
                                    <StarIcon color='green' opacity={0.5} size={22} />
                                    <Text style={styles.font_regular} className='text-xs text-gray-500 '>{rating} . <Text className='text-green-500'>{genre}</Text></Text>
                                </View>
                                {/* <MapIcon color='gray' opacity={0.4} size={22} /> */}
                                <View className='flex-row items-center space-x-1'>
                                    <Text style={styles.font_regular} className='text-xs text-gray-500'>Nearby . {address}</Text>
                                </View>
                            </View>
                            <Text style={styles.font_regular} className='text-gray-500 mt-2 pb-4'>{short_description}</Text>
                        </View>
                        <TouchableOpacity
                            onPress={() => navigation.navigate('Allergy')}
                            className='flex-row items-center space-x-2 p-4 border-y border-gray-300'>
                            <QuestionMarkCircleIcon className='' color='gray' opacity={0.6} size={20} />
                            <Text style={styles.font_semibold} className='pl-2 flex-1 text-md '>Have a Food Allergy?</Text>
                            <ChevronRightIcon className='pr-2' color='#cb202d' />
                        </TouchableOpacity>
                    </Animatable.View>

                    <Animatable.View
                        iterationCount={1}
                        animation="slideInUp" className='pb-32'>
                        <Text style={styles.font_bold} className='px-4 pt-6 mb-3 text-2xl'>
                            Menu
                        </Text>

                        {/* Dishrows */}
                        {dishes.map(dishe => (
                            <DishRow
                                key={dishe._id}
                                id={dishe._id}
                                name={dishe.name}
                                description={dishe.short_description}
                                price={dishe.price}
                                image={urlFor(dishe.image).url()}
                            />
                        ))}
                    </Animatable.View>

                </ScrollView>
            </TailwindProvider>
        </>


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
export default RestrauntScreen