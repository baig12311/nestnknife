//import liraries
import React, { Component } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import SkeletonBox from './SkeletonBox';
import ProductCardSkeleton from './ProductCardSkeleton';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
const ProductSkelton = () => {
    return (
        <SafeAreaView style={styles.container}>
            <View style={styles.header}>
                <View style={styles.subheader}>
                    <SkeletonBox
                        width={wp(9)}
                        height={wp(9)}
                        borderRadius={wp(5)}
                        style={{ marginRight: wp(3) }}

                    />
                    <SkeletonBox
                        width={wp(25)}
                        height={hp(2)}
                        borderRadius={wp(1)}
                    />

                </View>
                <View style={styles.subheader}>
                    <SkeletonBox
                        width={wp(9)}
                        height={wp(9)}
                        borderRadius={wp(5)}
                        style={{ marginRight: wp(3) }}
                    />
                    <SkeletonBox
                        width={wp(9)}
                        height={wp(9)}
                        borderRadius={wp(5)}
                    />
                </View>

            </View>
             <SkeletonBox
                        width={wp(20)}
                        height={hp(2)}
                        borderRadius={wp(1)}
                        style={{marginBottom:hp(1), alignSelf: 'flex-end'}}
                    />
           <ProductCardSkeleton/>
        </SafeAreaView>
    );
};

// define your styles
const styles = StyleSheet.create({
    container: {
        padding: hp(2)
    },
    header: {
        justifyContent: 'space-between',
        flexDirection: 'row',
        marginBottom: hp(2)

    },
    subheader: {
        flexDirection: 'row',
        alignItems: 'center'
    }
});

//make this component available to the app
export default ProductSkelton;
