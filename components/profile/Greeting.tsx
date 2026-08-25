//import liraries
import React, { Component } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import Colors from '../../constants/colors';
import { fonts } from '../../constants/typography';
import Icon from '../Icon';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
const Greeting = () => {
    return (
        <View style={styles.container}>
            <View style={styles.textContainer}>
                <Text style={styles.textHi}>Hi</Text>
                <Text style={styles.text}>Complete your profile to get the best experience.</Text>
            </View>

            <View style={styles.icon}>
                <Icon 
                name='account-outline' 
                type='MaterialDesignIcons' 
                size={wp(12)} 
                color={Colors.text} 
                />
            </View>

        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom:hp(2)
    },
    textHi: {
        fontFamily: fonts.displayBold,
        fontSize: wp(9),
        color: Colors.text,
    },
    text: {
        fontFamily: fonts.regular,
        color: Colors.secondary,
        fontSize: wp(3.5),
        width: wp(60),
    },
    textContainer: {
        //flex:1,
        //borderWidth:1
    },
    icon: {
        width: wp(20),
        height: wp(20),
        borderRadius: wp(10),
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'white'
    }
});

//make this component available to the app
export default Greeting;
