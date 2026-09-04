import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, TextInput } from 'react-native';
import Animated, { interpolate, interpolateColor, useAnimatedStyle, useSharedValue, withClamp, withTiming } from 'react-native-reanimated';
import {
    widthPercentageToDP as wp,
    heightPercentageToDP as hp
} from 'react-native-responsive-screen';
import { fonts } from '../../constants/typography';
import Colors from '../../constants/colors';

interface Props {
    value?: string
    onChangeText?: (text: string) => void
    errorFlag?: string
    placeholder?: string
    keyboardType?:any
    max?:number
}

const FloatingInput: React.FC<Props> = ({ value, onChangeText, errorFlag, placeholder, keyboardType, max}) => {
    const progress = useSharedValue(0);
    //const focusProgress = useSharedValue(0);
    const [isFocused, setIsFocused] = useState(false);

    useEffect(() => {
        progress.value = withTiming(value && value.length > 0 ? 1 : 0, { duration: 120 });
    }, [value]);

    const animatedContainer = useAnimatedStyle(() => {
        return {
            borderWidth: interpolate(progress.value, [0, 1], [0.3, 1]),
            //borderColor: interpolateColor(progress.value, [0, 1], [Colors.secondary, Colors.text]),
        }
    })

    const handleFocus = () => {
        setIsFocused(true);
        progress.value = withTiming(1, { duration: 120 });
        //focusProgress.value = withTiming(1, { duration: 120 });
    }

    const handleBlur = () => {
        setIsFocused(false);
        progress.value=withTiming(0, {duration:120})
        //focusProgress.value = withTiming(0, { duration: 120 });
        
        // Placeholder neeche aaye agar field khali hai
        // if (!value || value.length === 0) {
        //     progress.value = withTiming(0, { duration: 120 });
        // }
        if(value)
        {
            //console.log('value: ', value)
            progress.value=withTiming(1, {duration:120})
        }
        
    };

    const size = wp(4)
    const animatedSize = wp(3)

    const animatedStyle = useAnimatedStyle(() => {
        return {
            top: interpolate(progress.value, [0, 1], [0, -11.5]),
            color: interpolateColor(progress.value, [0, 1], ['#555555', '#999999']),
            fontSize: interpolate(progress.value, [0, 1], [size, animatedSize]),
            height: interpolate(progress.value, [0, 1], [42, 20]),
            paddingHorizontal: interpolate(progress.value, [0, 1], [0, 3]),
        }
    })

    return (
        <View style={placeholder!=='Phone Number' &&{ marginBottom: hp(2)}}>
            <Animated.View style={[styles.inputField, animatedContainer, placeholder==='Phone Number'&&{borderColor:Colors.background}]}>
                <Animated.Text style={[styles.placeholder, animatedStyle]}>
                    {placeholder}
                </Animated.Text>
                <TextInput
                    style={styles.input}
                    onFocus={handleFocus}
                    onBlur={handleBlur}
                    value={value}
                    onChangeText={onChangeText}
                    keyboardType={keyboardType}
                    maxLength={max}
                />
            </Animated.View>
        </View>
    );
};

const styles = StyleSheet.create({
    inputField: {
        borderRadius: wp(2),
        height: hp(6),
        borderColor: Colors.secondary
        //marginBottom: hp(0),
    },
    input: {
        flex: 1,
        height: '100%',
        fontFamily: fonts.regular,
        fontSize: wp(4),
        color: Colors.text,
        paddingHorizontal: wp(4),
       
    },
    placeholder: {
        fontFamily: fonts.regular,
        marginTop:hp(0.2),
        zIndex: 2,
        backgroundColor: Colors.background,
        position: 'absolute',
        textAlignVertical: 'center',
        left: '4%',
        
    },
});

export default FloatingInput;