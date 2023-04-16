import { View, Text } from 'react-native'
import React, { useEffect } from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import { TailwindProvider } from 'tailwindcss-react-native'
import * as Animatable from 'react-native-animatable'
import * as Progress from 'react-native-progress'
import { useNavigation } from '@react-navigation/native'
import { useSelector } from 'react-redux'
import { selectRestraunt } from '../features/restrauntSlice'
import { StyleSheet } from 'react-native'

const PreparingOrderScreen = () => {
    const navigation = useNavigation();
    const restraunt = useSelector(selectRestraunt)

    useEffect(() => {
        setTimeout(() => {
            navigation.navigate("Delivery")
        }, 2000);
    }, []);
    return (
        <TailwindProvider>
            <SafeAreaView className="flex-1 bg-white justify-center items-center">
                <Animatable.Image source={require("../assets/OrderAccepted.gif")}
                    animation="slideInUp"
                    iterationCount={1}
                    className="h-40 w-40"
                />
                <Animatable.Text
                    iterationCount={1}
                    animation="slideInUp" style={styles.font_semibold}
                    className="text-sm">Woohooo! Your order at {restraunt.title} is Accepted!</Animatable.Text>
                {/* <Progress.Bar className="mt-6" color='#cb202d' indeterminate={true} progress={0.3} width={200} /> */}
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
export default PreparingOrderScreen