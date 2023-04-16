import { View, Text, TouchableOpacity, Image } from 'react-native'
import React from 'react'
import { StyleSheet } from 'react-native'

const CategoryCard = ({ imgUrl, title }) => {
    return (
        <TouchableOpacity className='mr-2 relative bg-black rounded-lg'>
            <Image source={{ uri: imgUrl }}
                className='h-20 w-20 rounded-lg opacity-75'
            />
            <Text style={styles.font_semibold} className='absolute bottom-1 left-1 text-white'>{title}</Text>
        </TouchableOpacity>
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
export default CategoryCard