//import liraries
import React, { Component, useState} from 'react';
import { View, Text, StyleSheet, TouchableOpacity , FlatList} from 'react-native';
import { router } from 'expo-router';
import styles from './SearchStyle'
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import Colors from '../../constants/colors';
import Icon from '../../components/Icon';
import SearchBar from '../../components/home/SearchBar';
import { SafeAreaView } from 'react-native-safe-area-context';
import SearchPopularRow from '../../components/search/SearchPopularRow';
import FadeInView from '../../components/animations/FadeInView';
import ProductCard from '../../components/categories/ProductCard';
import { useSearchProducts } from '../../hooks/useSearchProducts';
import SearchProductCard from '../../components/search/SearchProductCard';
// create a component
const recentSearches = [
    '4 in 1 Seasoning Box',
    'Chopper',
    'Oil Spray Botlle',
    'Vegetable Cutter',

]

const popularSearches = [
    'Vegetable Cutter',
    'Oil Spray Bottle',
    'Chopper',
    'Rice Dispenser',
    'Storage Containers',
];

const Search = () => {
    const [searchText, setSearchText]=useState('')
    const {
  data: searchResults = [],
  isLoading,
  isError,
} = useSearchProducts(searchText);
const renderProduct=({item}:any)=>{
    return(
        <SearchProductCard 
        title={item.title} 
        image={item.image}
        onPress={()=>{router.push({
            pathname:'/product/[id]',
            params:{
                id:item.id
            }
        })}}
        />
    )
}
    return (
        <SafeAreaView style={styles.container}>
            <FadeInView delay={100}>
                <View style={styles.header}>
                    <TouchableOpacity onPress={() => router.back()} style={styles.buttonBack}>
                        <Icon name="arrow-back" type='MaterialIcons' size={wp(6)} color={Colors.text} />
                    </TouchableOpacity>
                    <View style={styles.search}>
                        <SearchBar 
                        placeholderText='Search for products, categories...'
                        value={searchText}
                        onChangeText={setSearchText}
                        />

                    </View>
                    <TouchableOpacity style={styles.buttonCancel}>
                        <Text style={styles.clear}>Cancel</Text>
                    </TouchableOpacity>
                </View>
            </FadeInView>
            {
                searchResults.length>0&&(
                    <FlatList
  data={searchResults}
  keyExtractor={(item) => item.id}
  renderItem={renderProduct}
  showsVerticalScrollIndicator={false}
/>
                )
            }
            
            <FadeInView delay={200}>
                <View style={styles.sectionContainer}>
                    <Text style={styles.sectionHeading}>Popular Searches</Text>
                    <View style={styles.popularContainer}>
                        {
                            recentSearches.map((recent, index) => (
                                <FadeInView key={index} delay={200 + index * 100}>
                                    <View style={styles.sectionTextView} >
                                        <Text style={styles.sectionText}>
                                            {recent}
                                        </Text>
                                    </View>
                                </FadeInView>


                            ))
                        }
                    </View>


                </View>
            </FadeInView>
            <FadeInView delay={300}>
                <View >
                    <View style={styles.recentContainer}>
                        <Text style={styles.sectionHeading}>Recent Searches</Text>
                        <TouchableOpacity style={styles.buttonCancel}>
                            <Text style={styles.clear}>Clear All</Text>
                        </TouchableOpacity>

                    </View>
                    <View>
                        {
                            popularSearches.map((popular, index) => (
                                <FadeInView key={index} delay={300 + index * 100}>
                                    <SearchPopularRow rowTitle={popular} key={index} />
                                </FadeInView>

                            ))
                        }
                    </View>
                </View>
            </FadeInView>







        </SafeAreaView>
    );
};



export default Search;

