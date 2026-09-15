//import liraries
import React, { Component } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ActivityIndicator } from 'react-native';
import Colors from "../../constants/colors";
import { fonts } from "../../constants/typography";
import { ShadowCard } from './ShadowCard';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
interface Props {
    onPress?: () => void
    title?: string
    loading?: boolean
    disabled?: boolean
}
const ButtonOutline: React.FC<Props> = ({ onPress, title, loading, disabled }) => {
    return (
   
            <TouchableOpacity
                onPress={onPress}
                style={[styles.button, (disabled || loading) && { opacity: 0.7 }]}
                disabled={disabled || loading}
                activeOpacity={0.7}
            >
                {loading ? (
                    <ActivityIndicator color={Colors.primary} />
                ) : (
                    <Text style={styles.text}>
                        {title}
                    </Text>
                )}
            </TouchableOpacity>
       
    );
};

// define your styles
const styles = StyleSheet.create({
   
    button: {
        height:hp(6),
        borderWidth:0.3,
        borderColor:Colors.primary,
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: wp(2),

    },
    text: {
        fontSize: wp(5),
        color: Colors.primary,
        fontFamily: fonts.semibold
    }
});

//make this component available to the app
export default ButtonOutline;
