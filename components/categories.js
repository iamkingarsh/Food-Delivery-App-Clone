import { View, Text, ScrollView, Image } from 'react-native'
import React from 'react'
import CategoryCard from './CategoryCard';

import SanityClient, { urlFor } from '../sanity';
import { useEffect } from 'react';
import { useState } from 'react';
import qs from 'qs';
import { StyleSheet } from 'react-native';




const Categories = () => {
    const [categories, setCategories] = useState([])




    useEffect(() => {
        const params = qs.stringify({
            query: `*[_type == "category"]`
        });
        const url = `https://fylfxub0.api.sanity.io/v2021-10-21/data/query/production?${params}`;

        fetch(url)
            .then((response) => response.json())
            .then((data) => {
                setCategories(data.result);
            })
            .catch((err) => {
                console.error(err);
            });
        // console.log(categories);
    }, []);


    // console.log(categories)
    return (
        <ScrollView
            contentContainerStyle={{
                paddingHorizontal: 15,
                paddingTop: 10,
            }}
            horizontal
            showsHorizontalScrollIndicator={false}>
            {/* Category Cards */}
            {categories?.map((Category) => (
                <CategoryCard className='size-[200px] text-white'
                    key={Category._id}
                    id={Category._id}
                    imgUrl={urlFor(Category.image).width(200).url()}
                    title={Category.name}

                />
            ))}

            {/* <CategoryCard imgUrl='https://links.papareact.com/gn7' title='Testing' />
            <CategoryCard imgUrl='https://links.papareact.com/gn7' title='Testing' />
            <CategoryCard imgUrl='https://links.papareact.com/gn7' title='Testing' />
            <CategoryCard imgUrl='https://links.papareact.com/gn7' title='Testing' />
            <CategoryCard imgUrl='https://links.papareact.com/gn7' title='Testing' />
            <CategoryCard imgUrl='https://links.papareact.com/gn7' title='Testing' />
            <CategoryCard imgUrl='https://links.papareact.com/gn7' title='Testing' />
            <CategoryCard imgUrl='https://links.papareact.com/gn7' title='Testing' /> */}
        </ScrollView>

    )
}

export default Categories;