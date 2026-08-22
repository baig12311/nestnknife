//import liraries
import React, { Component } from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import Colors from '../../constants/colors';
import Icon from '../Icon';
import { fonts } from '../../constants/typography';

import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
interface Props {
    iconName: string,

    badgeData?: number
}
// create a component
const HeaderIcon: React.FC<Props> = ({ iconName, badgeData }) => {
    return (
        <TouchableOpacity style={styles.iconContainer}>
            <Icon name={iconName} type='Ionicons' size={wp(6.5)} color={Colors.text} />
            <View style={styles.badge}>
                <Text style={styles.badgeText}>
                    3
                </Text>
            </View>
        </TouchableOpacity>
    );
};

// define your styles
const styles = StyleSheet.create({
    iconContainer: {
        //backgroundColor: 'white',
        //padding: wp(2),
        width: wp(10),
        height: wp(10),
        borderRadius: wp(6),
        justifyContent: 'center',
        alignItems: 'center',
        //elevation: 1,
        marginLeft: wp(1),
        //borderWidth:0.1,
        //borderColor: Colors.secondary

    },
    badge: {
        width: wp(5),
        height: wp(5),
        borderRadius: wp(3),
        position: 'absolute',
        backgroundColor: Colors.primary,
        top:'-6%',
        right:'-3%',
        justifyContent: 'center',
        alignItems: 'center'
    },
    badgeText: {
        color: Colors.background,
        fontSize: wp(3),
        fontFamily: fonts.regular,
        //fontWeight: '300'
    }

});

//make this component available to the app
export default HeaderIcon;
