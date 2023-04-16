import { View, Text, TouchableOpacity, Image, ScrollView, StyleSheet } from 'react-native'
import React, { useState, useEffect } from 'react'
import { StarIcon } from 'react-native-heroicons/solid'
import MapPinIcon from 'react-native-heroicons/solid'
import MapIcon from 'react-native-heroicons/solid'
import { useNavigation } from '@react-navigation/native'
import * as Animatable from 'react-native-animatable'



const RestrauntCard = ({
    id,
    imgUrl,
    title,
    rating,
    genre,
    address,
    short_description,
    dishes,
    long,
    lat,
}) => {

    const navigation = useNavigation()
    const handlePress = () => {
        navigation.navigate('RestrauntScreen', {
            id,
            imgUrl,
            title,
            rating,
            genre,
            address,
            short_description,
            dishes,
            long,
            lat,
        });
    };

    return (
        <Animatable.View
            iterationCount={1}
            animation="slideInUp">

            <ScrollView>

                <TouchableOpacity onPress={() => {
                    navigation.navigate('Restraunt',
                        {
                            id,
                            imgUrl,
                            title,
                            rating,
                            genre,
                            address,
                            short_description,
                            dishes,
                            long,
                            lat,
                        }
                    )
                }} className=' bg-white text-white mr-3 shadow-lg p-5 rounded-xl'>
                    <Image
                        source={{ uri: imgUrl, }}
                        className='h-40 w-60 rounded-xl p-16'
                    />
                    <View px-3 pb-4>
                        <Text style={styles.font_bold} className=' text-black text-xl pt-2 '>{title}</Text>

                        <View className='flex-row items-center space-x-1'>
                            <StarIcon color=' rgb(21 128 61)' opacity={0.7} size={22} />
                            <Text style={styles.font_regular} className='text-[13px] pt-1 text-gray-700 '>{rating} . <Text className='text-green-700'>{genre}</Text></Text>
                        </View>
                        {/* <MapIcon color='gray' opacity={0.4} size={22} /> */}
                        <View className='flex-row items-center space-x-1'>
                            <Text style={styles.font_regular} className='text-xs pt-1 text-gray-700'>Nearby . {address}</Text>
                        </View>
                    </View>
                    {/* <Text>RestrauntCard</Text> */}
                </TouchableOpacity>
            </ScrollView>
        </Animatable.View>

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

export default RestrauntCard