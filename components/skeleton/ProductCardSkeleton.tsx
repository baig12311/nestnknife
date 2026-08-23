//import liraries
import React, { Component } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import SkeletonBox from './SkeletonBox';
// create a component
const ProductCardSkeleton = () => {
       const productWidth = wp(44);
       const productHeight = wp(40);


    return (
         <View style={styles.productGrid}>

                        {Array.from({ length: 5 }).map((_, index) => (
                            <View
                                key={index}
                                style={{
                                    width: productWidth,
                                }}
                            >

                                {/* Product Image */}
                                <SkeletonBox
                                    width={productWidth}
                                    height={productWidth}
                                    borderRadius={12}
                                />

                                {/* Product Name */}
                                <SkeletonBox
                                    width={productWidth * 0.85}
                                    height={hp(2)}
                                    borderRadius={4}
                                    style={styles.productTitle}
                                />
                                 <SkeletonBox
                                    width={productWidth * 0.7}
                                    height={hp(2)}
                                    borderRadius={4}
                                    style={styles.productTitle}
                                />

                                {/* Product Price */}
                                <SkeletonBox
                                    width={productWidth * 0.45}
                                    height={hp(1.8)}
                                    borderRadius={4}
                                    style={styles.productPrice}
                                />

                            </View>
                        ))}

                    </View>
    );
};

// define your styles
const styles = StyleSheet.create({
    productGrid: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        justifyContent: 'space-between',
        rowGap: hp(2.5),
    },
    productTitle: {
        marginTop: hp(1.2),
    },

    productPrice: {
        marginTop: hp(0.8),
    },
});

//make this component available to the app
export default ProductCardSkeleton;
