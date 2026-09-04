//import liraries
import React, { Component } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, TouchableNativeFeedback } from 'react-native';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import Colors from '../../constants/colors';
import Icon from '../Icon';
import { router } from 'expo-router';
import { fonts } from '../../constants/typography';
// create a component
interface headerProps {
    title?: string;
    onSearchPress?: () => void;
    onFilterPress?: () => void;
}
const Header: React.FC<headerProps> = ({ title, onSearchPress, onFilterPress }) => {
    return (
        <View style={styles.container}>
            <View style={styles.iconContainer}>
                <TouchableOpacity onPress={() => router.back()} style={{ marginRight: wp(4) }} activeOpacity={0.7}>
                    <Icon name="arrow-back" type='MaterialIcons' size={wp(6)} color={Colors.text} />
                </TouchableOpacity>



                <Text style={styles.title}>{title}</Text>

            </View>
            {
                title === 'Cart' ? (<Text style={styles.textEdit}>Edit</Text>) : (<View style={styles.iconContainer}>
                    <TouchableOpacity onPress={onSearchPress} activeOpacity={0.7}>
                        <Icon name="search" type='Feather' size={wp(5)} color={Colors.text} />
                    </TouchableOpacity>
                    {
                        title !== 'Collections' && (
                            <TouchableOpacity onPress={onFilterPress} style={{ marginLeft: wp(4) }} activeOpacity={0.7}>
                                <Icon name="filter" type='Feather' size={wp(5)} color={Colors.text} />
                            </TouchableOpacity>
                        )
                    }

                </View>)
            }

        </View>
    );
};

// define your styles
const styles = StyleSheet.create({
    container: {

        justifyContent: 'space-between',
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: hp(2),
    },
    title: {
        fontSize: wp(5),
        fontFamily: fonts.semibold,
        //fontWeight: '600',
        color: Colors.text,
    },
    iconContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        //justifyContent: 'space-between',
    },
    textEdit: {
        fontSize: wp(4),
        color: Colors.primary,
        fontFamily: fonts.semibold

    }
});

//make this component available to the app
export default Header;
