import { View, Text, ScrollView, TouchableOpacity } from 'react-native'
import React from 'react'
import { ArrowRightIcon } from 'react-native-heroicons/outline'
import RestrauntCard from './RestrauntCard'
import qs from 'qs';
import { urlFor } from '../sanity';
import { useEffect } from 'react';
import { useState } from 'react';
import * as Animatable from 'react-native-animatable'
import { useNavigation } from '@react-navigation/native';
import { StyleSheet } from 'react-native';




const FeaturedRow = ({ id, title, description, }) => {
    const navigation = useNavigation();
    const [restraunts, setRestraunts] = useState([])

    useEffect(() => {
        const params = qs.stringify({
            query: `*[_type == "featured" && _id == '${id}'][0]{..., restraunts[]->{..., dishes[]->,type->{...}}}`,
        });

        const url = `https://fylfxub0.api.sanity.io/v2021-10-21/data/query/production?${params}`;

        fetch(url)
            .then((response) => response.json())
            .then((data) => {
                // console.log(data)
                setRestraunts(data.result.restraunts);
            })
            .catch((err) => {
                console.error(err);
            });
    }, [id]);
    // console.log(restraunts);

    return (
        <Animatable.View
            iterationCount={1}
            animation="fadeIn">
            <TouchableOpacity

            >
                <View className="flex justify-center align-middle">

                    <View className='mt-4 flex-row items-center justify-between px-4'>
                        <View className="flex">

                            <Text style={styles.font_semibold} className='text-lg '>{title}</Text>
                            <Text style={styles.font_regular} className='text-sm w-[280px] text-gray-500  items-center'>{description}</Text>
                        </View>
                        <ArrowRightIcon color='#cb202d' />
                    </View>

                </View>
            </TouchableOpacity>
            <ScrollView
                horizontal
                contentContainerStyle={{
                    paddingHorizontal: 15,
                }}
                showsHorizontalScrollIndicator={false}
                className='pt-4'
            >
                {/* <RestrauntCard /> */}
                {restraunts?.map((restraunts) => {
                    return (
                        <RestrauntCard
                            key={restraunts._id}
                            id={restraunts._id}
                            imgUrl={urlFor(restraunts.image).url()}
                            // imgUrl={urlFor(Category.image).width(200).url()}
                            title={restraunts.name}
                            rating={restraunts.rating}
                            genre={restraunts.type?.name}
                            address={restraunts.address}
                            short_description={restraunts.short_description}
                            dishes={restraunts.dishes}
                            long={restraunts.long}
                            lat={restraunts.lat} r

                        />
                    )
                })}

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
    },
    font_medium: {
        fontFamily: 'Poppins-Medium'
    }
})
export default FeaturedRow