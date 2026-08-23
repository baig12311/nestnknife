//import liraries
import React from 'react';
import { View, StyleSheet } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import SkeletonBox from './SkeletonBox';

const ProductDetailSkeleton = () => {
  return (
    <SafeAreaView style={styles.container}>
      {/* Product Image */}
      <SkeletonBox
        width={wp(100)}
        height={hp(38)}
        borderRadius={0}
      />

      <View style={styles.content}>
        {/* Title — two lines */}
        <SkeletonBox width={wp(85)} height={hp(3.2)} style={styles.spacing} />
        <SkeletonBox width={wp(60)} height={hp(3.2)} style={styles.spacing} />

        {/* Price */}
        <SkeletonBox width={wp(30)} height={hp(3)} style={styles.priceSpacing} />

        {/* Description — multiple lines */}
        <SkeletonBox width={wp(90)} height={hp(1.8)} style={styles.lineSpacing} />
        <SkeletonBox width={wp(88)} height={hp(1.8)} style={styles.lineSpacing} />
        <SkeletonBox width={wp(80)} height={hp(1.8)} style={styles.lineSpacing} />

        <SkeletonBox width={wp(90)} height={hp(1.8)} style={styles.paragraphGap} />
        <SkeletonBox width={wp(90)} height={hp(1.8)} style={styles.lineSpacing} />
        <SkeletonBox width={wp(85)} height={hp(1.8)} style={styles.lineSpacing} />
        <SkeletonBox width={wp(75)} height={hp(1.8)} style={styles.lineSpacing} />
      </View>

      {/* Bottom bar — Quantity + Add to Cart */}
      <View style={styles.buyContainer}>
        <View style={styles.quantityRow}>
          <SkeletonBox width={wp(22)} height={hp(2.6)} borderRadius={6} />
          <SkeletonBox width={wp(28)} height={hp(4.5)} borderRadius={8} />
        </View>

        <SkeletonBox width={wp(90)} height={hp(6)} borderRadius={10} style={styles.buttonSpacing} />
      </View>
    </SafeAreaView>
  );
};

export default ProductDetailSkeleton;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  content: {
    paddingHorizontal: wp(5),
    paddingTop: hp(2.5),
  },
  spacing: {
    marginBottom: hp(1),
  },
  priceSpacing: {
    marginTop: hp(0.5),
    marginBottom: hp(2),
  },
  lineSpacing: {
    marginBottom: hp(1),
  },
  paragraphGap: {
    marginTop: hp(1),
    marginBottom: hp(1),
  },
  buyContainer: {
    paddingHorizontal: wp(5),
    paddingTop: hp(1.5),
    paddingBottom: hp(1),
  },
  quantityRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: hp(1.5),
  },
  buttonSpacing: {
    alignSelf: 'center',
  },
});
