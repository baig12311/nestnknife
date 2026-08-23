//import liraries
import React, { Component } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import ProductSkelton from '../../components/skeleton/ProductSkeleton';
import ProductDetailSkeleton from '../../components/skeleton/ProductDetailSkeleton';
// create a component
const MyComponent = () => {
    return (
        <View style={styles.container}>
          <ProductDetailSkeleton/>
        </View>
    );
};

// define your styles
const styles = StyleSheet.create({
    container: {
        flex: 1,
    }
});

//make this component available to the app
export default MyComponent;
