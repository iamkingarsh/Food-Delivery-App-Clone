import { View, Text, Image, ScrollView } from 'react-native'
import React, { useEffect, useLayoutEffect, useState } from 'react'
import { useNavigation } from '@react-navigation/native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { TailwindProvider } from 'tailwindcss-react-native';
import Categories from '../components/categories';
import { UserIcon, ChevronDownIcon, MagnifyingGlassIcon, AdjustmentsVerticalIcon, } from 'react-native-heroicons/outline';
import { TextInput } from 'react-native';
import * as Animatable from 'react-native-animatable'
import FeaturedRow from '../components/FeaturedRow';
import qs from 'qs';
import { useFonts } from 'expo-font';
import { StyleSheet } from 'react-native';


const HomeScreen = () => {
    const Navigation = useNavigation();
    const [featuredCategories, setFeaturedCategories] = useState([]);

    useLayoutEffect(() => {
        Navigation.setOptions({
            headerShown: false,
        })
    }, [])

    const params = qs.stringify({
        query: `*[_type == "featured"] {...,
            restaurants[]->{...,
              dishes[]->
            }
          }`
    });

    useEffect(() => {

        const url = `https://fylfxub0.api.sanity.io/v2021-10-21/data/query/production?${params}`;

        fetch(url)
            .then((response) => response.json())
            .then((data) => {
                setFeaturedCategories(data.result);
            })
            .catch((err) => {
                console.error(err);
            });

    }, []);

    return (
        <>
            <TailwindProvider>
                <SafeAreaView className='bg-white pt-5'>
                    {/* Header */}
                    <Animatable.View
                        iterationCount={1}
                        animation="fadeIn" className='flex-row pb-3 shadow-2xl shadow-black items-center mx-4 space-x-2 mt-2 px-1'>
                        <Image
                            source={{ uri: 'http://bit.ly/40fEUQx' }}
                            className="w-10 h-10 bg-slate-300 p-1 rounded-full"
                        />
                        <View className='flex-1'>
                            <Text style={styles.font_regular} className=' text-gray-400 text-sm'>Deliver Now!</Text>
                            <View className="flex-row items-center">
                                <Text style={styles.font_bold} className='text-lg'>Current Location </Text>
                                <ChevronDownIcon className="" size={18} color="black" />
                            </View>
                        </View>

                        <UserIcon size={32} color="#cb202d" />
                    </Animatable.View>

                    {/* Seach  */}
                    <Animatable.View
                        iterationCount={1}
                        animation="slideInUp" className='flex-row items-center space-x-2 pb-2 mx-4'>
                        <View className="flex-row space-x-2 flex-1 items-center bg-gray-100 rounded-lg p-3">
                            <MagnifyingGlassIcon color="gray" size={22} />
                            <TextInput style={styles.font_medium} className="text-[15px] pt-[4px] w-full items-center" placeholder='Search Restraunts & Cusines' cursorColor={'#cb202d'} keyboardType='default' selectionColor={'rgb(252 165 165)'} />
                        </View>
                        <AdjustmentsVerticalIcon color="#cb202d" />
                    </Animatable.View>

                    {/* Body */}
                    <ScrollView
                        className='bg-slate-100'


                        contentContainerStyle={{
                            paddingBottom: 180,
                        }}
                        showsVerticalScrollIndicator={true}
                    >


                        <Categories />
                        {/* Featured Rows */}

                        {featuredCategories?.map((featured) => (
                            <FeaturedRow
                                key={featured._id}
                                id={featured._id}
                                title={featured.name}
                                description={featured.short_description}
                                featuredCategory='featured'
                            />
                        ))}


                    </ScrollView>
                </SafeAreaView>
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
    },
    font_medium: {
        fontFamily: 'Poppins-Medium'
    }
})
export default HomeScreen