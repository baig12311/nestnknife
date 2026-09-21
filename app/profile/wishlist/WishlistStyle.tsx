import { useState, useEffect } from 'react';
import { Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import Colors from '../../../constants/colors';
import { fonts } from '../../../constants/typography';
import { widthPercentageToDP as wp, 
    heightPercentageToDP as hp } from 'react-native-responsive-screen';
const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: Colors.background,
        padding: hp(2)
    },
    row: {
    justifyContent: 'space-between',
  },
  list: {
    flexGrow:1,
    paddingBottom: hp(5),
  },
});
export default styles
