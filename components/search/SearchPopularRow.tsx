//import liraries
import React, { Component } from 'react';
import { View, Text, StyleSheet, TouchableOpacity} from 'react-native';
import Colors from '../../constants/colors';
import { fonts } from '../../constants/typography';
import Icon from '../Icon';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';

interface rowProps {
    rowTitle?: string
}
const SearchPopularRow: React.FC<rowProps> = ({ rowTitle }) => {
    return (
        <View style={styles.container}>
            <View style={styles.firstContainer}>
                <Icon name='clock-circle' type='AntDesign' size={wp(5)} color={Colors.secondary} />
                <Text style={styles.searchText}>{rowTitle}</Text>
            </View>

            <TouchableOpacity>
                <Icon name='close-outline' type='Ionicons' size={wp(6)} color={Colors.secondary} />

            </TouchableOpacity>

        </View>
    );
};

// define your styles
const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        alignItems: 'center',
        borderBottomWidth:0.2,
        borderColor: Colors.secondary,
        justifyContent: 'space-between',
        marginBottom: hp(1),
        padding: wp(2),


    },
    firstContainer:{
        flexDirection:'row',
        alignItems: 'center'
    },
    searchText:{
        fontSize: wp(4),
        color: Colors.text,
        marginLeft: wp(3),
        fontFamily: fonts.regular,
       
    }
});

//make this component available to the app
export default SearchPopularRow;
