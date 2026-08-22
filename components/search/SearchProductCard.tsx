//import liraries
import React, { Component } from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity} from 'react-native';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import Colors from '../../constants/colors';
import { fonts } from '../../constants/typography';

interface Props{
    title?:string,
    image?:string,
    onPress?:()=>void
}
const SearchProductCard:React.FC<Props>= ({title, image, onPress}) => {
    return (
        <TouchableOpacity style={styles.container} activeOpacity={0.6} onPress={onPress}>
            <Image source={{uri:image}} style={styles.image}/>
            <Text style={styles.title}>{title}</Text>
        </TouchableOpacity>
    );
};

// define your styles
const styles = StyleSheet.create({
    container: {
        borderBottomWidth:0.3,
        borderColor: Colors.secondary,
        //justifyContent: 'center',
        flexDirection:'row',
        alignItems: 'center',
        marginBottom:hp(1),
        paddingBottom:hp(1)

    },
    image:{
        width: wp(12),
        height:wp(12),
        borderRadius: 10,
        marginRight: wp(3)
    },
    title:{
        fontSize:wp(3.5),
       
        flexShrink:1,
        fontFamily:fonts.regular
    }
});

//make this component available to the app
export default SearchProductCard;
