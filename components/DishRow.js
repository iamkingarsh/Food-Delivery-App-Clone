import { View, Text, Image, TouchableOpacity } from 'react-native'
import React, { useCallback, useState } from 'react'
import { CurrencyRupeeIcon, } from 'react-native-heroicons/outline'
import { MinusCircleIcon, PlusCircleIcon } from 'react-native-heroicons/solid'
import { useDispatch, useSelector } from 'react-redux';
import { addToBasket, removeFromBasket, selectBasketItems, selectBasketItemsById } from '../features/basketSlice';
import { urlFor } from '../sanity';
import { useFonts } from 'expo-font';
import * as Animatable from 'react-native-animatable'
import { StyleSheet } from 'react-native';

const DishRow = ({ id, name, description, price, image }) => {

    const [isPressed, setIsPressed] = useState(false);
    const items = useSelector(state => selectBasketItemsById(state, id))
    const dispatch = useDispatch();

    const addItemToBasket = useCallback(() => {
        dispatch(addToBasket({ id, name, description, price, image }))
    }, [dispatch]);

    const removeItemFromBasket = useCallback(() => {
        if (items.length > 0) {
            dispatch(removeFromBasket({ id }));
        }
    }, [dispatch, items])
    const [fontsLoaded] = useFonts({
        'Poppins-Bold': require('../assets/fonts/Poppins-Bold.ttf'),
        'Poppins-Regular': require('../assets/fonts/Poppins-Regular.ttf'),
    });

    if (!fontsLoaded) {
        return null;
    }
    return (
        <>
            <TouchableOpacity onPress={() => setIsPressed(!isPressed)}
                className={`flex-row bg-white border border-gray-400 pt-6 items-center pb-3 space-x-2 px-4 ${isPressed && "border-b-0"}`}>
                <Animatable.View
                    iterationCount={1}
                    animation="slideInUp" className='flex-1'>
                    <Text style={styles.font_semibold} className=' text-xl B mb-1'>{name}</Text>
                    <Text style={styles.font_regular} className='text-gray-400'>{description}</Text>
                    <View className='flex-row space-x-1 items-center mb-1 pt-2'>
                        {/* <CurrencyRupeeIcon size={20} color='black' /> */}
                        <Text style={styles.font_bold} className='text-lg text-gray-700'>₹{price}</Text>
                    </View>
                </Animatable.View>
                <Animatable.Image
                    iterationCount={1}
                    animation="slideInUp" style={
                        {
                            borderWidth: 1,
                            borderColor: '#F3F3F4'
                        }
                    } source={{ uri: urlFor(image).url() }}
                    className='h-20 w-20 bg-gray-300 p-4 rounded-lg'
                />

            </TouchableOpacity>
            {isPressed && (
                <Animatable.View
                    iterationCount={1}
                    animation="fadeIn" className=' bg-white px-4 pb-6'>
                    <View className='flex-row items-center space-x-2'>
                        <TouchableOpacity disabled={!items.length} onPress={removeItemFromBasket}>
                            {/* <MinusCircleIcon color="#00CCBB" size={40} /> */}
                            <MinusCircleIcon color={items.length > 0 ? "#cb202d" : "gray"} size={40} />

                        </TouchableOpacity>
                        <Text style={styles.font_bold}>{items.length}</Text>
                        <TouchableOpacity onPress={addItemToBasket}>
                            {/* <PlusCircleIcon color="#00CCBB" size={40} /> */}
                            <PlusCircleIcon color="#cb202d" size={40} />

                        </TouchableOpacity>
                    </View>
                </Animatable.View>
            )}
        </>
    );
};
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
export default DishRow