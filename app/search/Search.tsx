//import liraries
import React, { Component, useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, FlatList } from 'react-native';
import { router, useLocalSearchParams } from 'expo-router';
import styles from './SearchStyle'
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import Colors from '../../constants/colors';
import Icon from '../../components/Icon';
import SearchBar from '../../components/home/SearchBar';
import { SafeAreaView } from 'react-native-safe-area-context';
import SearchRecentRow from '../../components/search/SearchRecentRow';
import FadeInView from '../../components/animations/FadeInView';
import ProductCard from '../../components/categories/ProductCard';
import { useSearchProducts } from '../../hooks/useSearchProducts';
import { useRecentSearches } from '../../hooks/useRecentSearches';
import SearchProductCard from '../../components/search/SearchProductCard';
// create a component
const popularSearches = [
    '4 in 1 Seasoning Box',
    'Chopper',
    'Oil Spray Botlle',
    'Vegetable Cutter',

]

const Search = () => {
    const { collectionHandle, title } = useLocalSearchParams<{
        collectionHandle?: string;
        title?: string;
    }>();
    const [searchText, setSearchText] = useState('')
    const isScoped = !!collectionHandle;

    const {
        recentSearches,
        addRecentSearch,
        removeRecentSearch,
        clearRecentSearches,
    } = useRecentSearches();

    const {
        data: searchResults = [],
        isLoading,
        isError,
    } = useSearchProducts(searchText, collectionHandle);

    const isSearching = searchText.trim() !== '';

    const renderProduct = ({ item }: any) => {
        return (
            <SearchProductCard
                title={item.title}
                image={item.image}
                onPress={() => {
                    addRecentSearch(searchText);
                    router.push({
                        pathname: '/product/[id]',
                        params: {
                            id: item.id
                        }
                    })
                }}
            />
        )
    }

    const handleRecentPress = (term: string) => {
        setSearchText(term);
        addRecentSearch(term);
    }

    const handleRemoveRecent = (term: string) => {
        removeRecentSearch(term);
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
                            placeholderText={isScoped
                                ? `Products in ${title ?? 'this category'}...`
                                : 'Search for products'}
                            value={searchText}
                            onChangeText={setSearchText}
                        />

                    </View>
                    {/* <TouchableOpacity style={styles.buttonCancel}>
                        <Text style={styles.clear}>Cancel</Text>
                    </TouchableOpacity> */}
                </View>
            </FadeInView>

            {/* RESULTS — sirf jab search active ho */}
            {
                isSearching && searchResults.length > 0 && (
                    <FlatList
                        data={searchResults}
                        keyExtractor={(item) => item.id}
                        renderItem={renderProduct}
                        showsVerticalScrollIndicator={false}
                    />
                )
            }

            {/* NO RESULTS — jab search active ho lekin kuch na mile */}
            {
                isSearching && !isLoading && searchResults.length === 0 && (
                    <View style={{ paddingTop: hp(4), alignItems: 'center' }}>
                        <Text style={styles.noFoundText}>No products found.</Text>
                    </View>
                )
            }

            {/* POPULAR + RECENT — sirf jab search active NA ho */}
            {!isSearching && (
                <>
                    <FadeInView delay={200}>
                        <View style={styles.sectionContainer}>
                            <Text style={styles.sectionHeading}>Popular Searches</Text>
                            <View style={styles.popularContainer}>
                                {
                                    popularSearches.map((recent, index) => (
                                        <FadeInView key={index} delay={200 + index * 100}>
                                            <TouchableOpacity
                                                style={styles.sectionTextView}
                                                onPress={() => handleRecentPress(recent)}
                                            >
                                                <Text style={styles.sectionText}>
                                                    {recent}
                                                </Text>
                                            </TouchableOpacity>
                                        </FadeInView>


                                    ))
                                }
                            </View>


                        </View>
                    </FadeInView>
                    <FadeInView delay={300}>
                        {
                            recentSearches.length > 0 && (
                                <View >

                                    <View style={styles.recentContainer}>
                                        <Text style={styles.sectionHeading}>Recent Searches</Text>
                                        <TouchableOpacity style={styles.buttonCancel} onPress={clearRecentSearches}>
                                            <Text style={styles.clear}>Clear All</Text>
                                        </TouchableOpacity>

                                    </View>
                                    <View>
                                        {
                                            recentSearches.map((popular, index) => (
                                                <FadeInView key={index} delay={300 + index * 100}>
                                                    <SearchRecentRow
                                                        rowTitle={popular}
                                                        key={index}
                                                        onPress={() => handleRecentPress(popular)}
                                                        onRemove={() => handleRemoveRecent(popular)}
                                                    />
                                                </FadeInView>

                                            ))
                                        }
                                    </View>
                                </View>
                            )
                        }

                    </FadeInView>
                </>
            )}

        </SafeAreaView>
    );
};



export default Search;