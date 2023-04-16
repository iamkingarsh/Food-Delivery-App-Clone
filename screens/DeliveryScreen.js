import { View, Text, Image, StyleSheet } from 'react-native'
import React from 'react'
import { useNavigation } from '@react-navigation/native'
import * as Animatable from 'react-native-animatable'
import { useEffect } from 'react'
import { useSelector } from 'react-redux'
import { selectRestraunt } from '../features/restrauntSlice'
import { TailwindProvider } from 'tailwindcss-react-native'
import { SafeAreaView } from 'react-native-safe-area-context'
import { CheckBadgeIcon, ChevronDoubleRightIcon, IdentificationIcon, PhoneIcon, PhoneXMarkIcon, ReceiptPercentIcon, XMarkIcon } from 'react-native-heroicons/solid'
import { ChevronRightIcon, ClipboardDocumentListIcon, ListBulletIcon } from 'react-native-heroicons/outline'
import { TouchableOpacity } from 'react-native'
import * as Progress from 'react-native-progress'
import MapView, { Marker } from 'react-native-maps'
import { urlFor } from '../sanity'


const DeliveryScreen = () => {
    const navigation = useNavigation();
    const restraunt = useSelector(selectRestraunt)
    const DeliveryRider = "Deepinder Goyal"

    return (
        <TailwindProvider>

            <View className="bg-[#cb202d] flex-1 ">
                <SafeAreaView className="z-50">
                    <View className="flex-row items-center justify-between p-5">
                        <TouchableOpacity onPress={() => navigation.navigate("Home")}>
                            <XMarkIcon color="white" size={30} />
                        </TouchableOpacity>
                        <Text style={styles.font_regular} className="text-white font-medium"> Order Help</Text>
                    </View>

                    <View className="bg-white mx-5 my-2 rounded-md p-6 z-10 shadow-md">
                        <View className="flex-row justify-between">

                            <View>
                                <Text style={styles.font_medium} className="text-lg text-gray-500">Estimated Arrival</Text>
                                <Text style={styles.font_bold} className="text-[32px]">30-35 Minutes</Text>
                            </View>
                            <Image source={
                                require('../assets/rider.gif')

                            }
                                className="h-20 w-20"
                            />
                        </View>
                        <Progress.Bar className="mt-2" color='#cb202d' indeterminate={true} progress={0.3} width={200} />
                        <Text style={styles.font_regular} className="mt-3 text-gray-500">
                            Your order at {restraunt.title} is being prepared!
                        </Text>
                    </View>

                </SafeAreaView>
                <MapView
                    initialRegion={{
                        latitude: restraunt.lat,
                        longitude: restraunt.long,
                        latitudeDelta: 0.005,
                        longitudeDelta: 0.005,

                    }}
                    style={styles.font_bold}
                    className="flex-1 -mt-10 z-0"
                    mapType='mutedStandard'
                >
                    <Marker
                        coordinate={{
                            latitude: restraunt.lat,
                            longitude: restraunt.long,
                        }}
                        // image={urlFor(restraunt.imgUrl).width().url()}
                        title={restraunt.title}

                        description={restraunt.short_description}
                        identifier='origin'
                        pinColor='#cb202d'
                    />


                </MapView>

                <SafeAreaView className="bg-white  h-25">
                    <View className="flex-row space-x-4 items-center pb-6">

                        <Image source={{
                            // uri: "http://bit.ly/40fEUQx",
                            uri: "http://bit.ly/40fEUQx",
                        }}
                            className="h-12 w-12 bg-gray-300 px-4 rounded-full ml-5"
                        />
                        <View className="flex-1">
                            <Text style={styles.font_semibold} className="text-lg">{DeliveryRider}</Text>
                            <View className="flex-row items-center space-x-2">
                                <Text style={styles.font_regular} className="text-sm font-medium text-gray-500">Your Rider is Verified</Text>
                                <CheckBadgeIcon color={'rgb(107 114 128)'} size={18} />
                            </View>
                            <TouchableOpacity
                                onPress={() => navigation.navigate('OrderDetails')}
                                className=" py-1">
                                <View className="flex-row items-center space-x-2">
                                    <Text style={styles.font_medium} className="text-base text-[#cb202d]">Order Details</Text>
                                    <ChevronRightIcon color={'#cb202d'} size={18} />
                                </View>
                            </TouchableOpacity>
                        </View>
                        <TouchableOpacity className="mr-5">
                            <PhoneIcon color={'#cb202d'} />
                        </TouchableOpacity>
                    </View>
                </SafeAreaView>
            </View >
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

export default DeliveryScreen