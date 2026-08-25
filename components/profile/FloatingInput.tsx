//import liraries
import React, { Component, useState } from 'react';
import { View, Text, StyleSheet, TextInput } from 'react-native';
import Animated, { interpolate, interpolateColor, useAnimatedStyle, useSharedValue, withTiming} from 'react-native-reanimated';
import { widthPercentageToDP as wp,  
    heightPercentageToDP as hp
} from 'react-native-responsive-screen';
import Colors from '../../constants/colors';
interface Props{
    value?:string
    onChangeText?:()=>void
    errorFlag?:string
    placeholder?:string
}
const FloatingInput:React.FC<Props> = ({value, onChangeText, errorFlag, placeholder}) => {
    const progress=useSharedValue(0)
    const[isFocused, setIsFocused]=useState(false);
    const animatedContainer=useAnimatedStyle(()=>{
        return{
                    borderColor: interpolateColor(progress.value, [0, 1], ['black', '#efa8b8']),

        }
    })
    //const newTop='30%'
    //const animatedTop='-20%'
    const handleFocus=()=>{
        setIsFocused(true),
        progress.value = withTiming(1, { duration: 120 })
       // progress.value=progress.value===0?1:0 
    }

    const handleBlur = () => {
  setIsFocused(false);

  if (!value) {
    progress.value = withTiming(0, { duration: 120 });
  }
};
    const size=wp(4)
        const animatedSize=wp(3)
    const animatedStyle=useAnimatedStyle(()=>{
        return{
            top: withTiming(interpolate(progress.value, [0, 1], [0, -22]), {duration: 40}),
            color:interpolateColor(progress.value, [0, 1], ['#555555', '#999999']),
            fontSize: interpolate(progress.value, [0, 1], [size, animatedSize])
        }
    })
    return (
        <View style={{marginBottom: hp(2)}}>
            <Animated.View style={[styles.inputField, animatedContainer]}>
            <Animated.Text style={[styles.placeholder, animatedStyle]}>
                {placeholder}
            </Animated.Text>
            <TextInput
                style={styles.input}
                //placeholder='enter'
                onFocus={()=>handleFocus()}
                onBlur={()=>handleBlur()}
                value={value}
                onChangeText={onChangeText}
                accessibilityLabel="Secret code input"
                accessibilityHint="Enter secret unlock code to continue"
            />
           
        </Animated.View>
         {
                errorFlag&&(
                    <Text style={styles.invalid}>Invalid Code!</Text>
                )
            }
        </View>
        
    );
};
const styles = StyleSheet.create({
    inputField: {
        borderWidth: 1,
        borderRadius: wp(2),
        height: hp(5.5),
        marginBottom: 4,
        //elevation: 3
        //padding: 1,
        //zIndex: -2
    },
    input: {
flex:1,
                //borderWidth: 1,
                fontSize: wp(4),
                color: '#555555',
                paddingHorizontal: wp(4)
                //padding: wp(4)

    },
    placeholder:{
    //     height:'100%',
    //     position: 'absolute',
    //     fontFamily: 'Sansation-Regular',
    //     borderWidth: 1,
    //     fontSize: wp(40),
    //     //top: '25%',
       
    //     left: '3%',
    zIndex: 2,
        backgroundColor: Colors.background,
    //    // marginHorizontal: wp(4),
    //    paddingHorizontal: wp(1),
    //    alignItems:'center'
    //borderWidth:1,
    height: '100%',
    position: 'absolute',
   
    textAlignVertical: 'center',
    left:'4%',
    //top:2,
    //right:0
    },
     invalid:{
        //fontFamily: 'Sansation-Italic',
        fontSize: wp(3)
    }
});
export default FloatingInput;
