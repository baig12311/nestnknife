//import liraries
import React, { Component } from 'react';
import { View, Text, StyleSheet, TextInput, TouchableOpacity} from 'react-native';
import Colors from "../../constants/colors";
import { fonts } from "../../constants/typography";
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen'; 

interface Props{
    quantity?:number,
    onIncrease?:()=>void,
    onDecrease?:()=>void
}
const QuantityCard:React.FC<Props> = ({quantity, onDecrease, onIncrease}) => {
    return (
        <View style={styles.container}>
            <TouchableOpacity onPress={onDecrease} style={styles.button}>
                <Text style={styles.QText}>
                    -
                </Text>
            </TouchableOpacity>
            <View style={styles.quantityView}>
 <Text style={styles.quantity}>
                {quantity}
            </Text>
            </View>
           
             <TouchableOpacity onPress={onIncrease} style={styles.button}>
                <Text style={styles.QText}>
                    +
                </Text>
            </TouchableOpacity>
        </View>
    );
};

// define your styles
const styles = StyleSheet.create({
    container: {
         borderColor:Colors.secondary,
        borderWidth:0.4,
        flexDirection: 'row',
        borderRadius:wp(4),
        width:wp(30),
        height: hp(5),
        //justifyContent:'space-between',
        alignItems: 'center'
    },
    QText:{
        fontSize:wp(7),
        fontFamily: fonts.medium,
        color:Colors.primary
    },
    quantity:{
        // borderLeftWidth:1,
        // borderRightWidth:1,
        fontSize:wp(5),
        fontFamily:fonts.medium
       
    },
    button:{
        //borderWidth:1,
        //padding:wp(2)
        justifyContent: 'center',
        paddingHorizontal:wp(2.5)
    },
    quantityView:{
        height:'100%',
        borderLeftWidth:0.4,
        borderRightWidth:0.4,
        borderColor:Colors.secondary,
         justifyContent: 'center',
        alignItems: 'center',
        flex:1
    }
    
});

//make this component available to the app
export default QuantityCard;
