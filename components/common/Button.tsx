//import liraries
import React, { Component } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ActivityIndicator} from 'react-native';
import Colors from "../../constants/colors";
import { fonts } from "../../constants/typography";
import { ShadowCard } from './ShadowCard';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
interface Props {
    onPress?: () => void
    title?: string
    loading?:boolean
    disabled?:boolean
}
const Button: React.FC<Props> = ({ onPress, title, loading, disabled}) => {
    return (
        <ShadowCard style={styles.container} containerStyle={styles.containerStyle}>
            <TouchableOpacity onPress={onPress} style={[styles.button, (disabled || loading)&&{opacity:0.7}]}  disabled={disabled || loading}>
                {loading ? (
                    <ActivityIndicator color={Colors.background} />
                ) : (
                    <Text style={styles.text}>
                        {title}
                    </Text>
                )}
            </TouchableOpacity>
        </ShadowCard>
    );
};

// define your styles
const styles = StyleSheet.create({
    container: {
        height: hp(6),
        marginBottom: hp(0.5),
        overflow: 'hidden',
        borderRadius: wp(2),
        //marginTop: hp(1.5)
        //borderWidthiddenh:1
    },
    containerStyle: {
        width: '100%',
    },
    button: {
        backgroundColor: Colors.primary,
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center'
    },
    text: {
        fontSize: wp(5),
        color: Colors.background,
        fontFamily: fonts.semibold
    }
});

//make this component available to the app
export default Button;
