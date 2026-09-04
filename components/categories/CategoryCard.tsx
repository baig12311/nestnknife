//import liraries
import React, { Component } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Image} from 'react-native';
import { ShadowCard } from '../common/ShadowCard';
import Colors from '../../constants/colors';
import { fonts } from '../../constants/typography';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
// create a component
interface Props{
    cardTitle?:string,
    image?:string,
    onPress:()=>void
}
const CategoryCard:React.FC<Props> = ({cardTitle, image, onPress}) => {
    return (
         <ShadowCard style={styles.container} containerStyle={styles.containerStyle}>
<TouchableOpacity onPress={onPress} activeOpacity={0.7}>
    {
        image&&(<Image style={styles.image} resizeMode='cover' source={{uri:image}}/>)
    }
    
             <View style={styles.overlay}>
            <Text style={styles.title}>
                {cardTitle}
            </Text>
        </View>
        </TouchableOpacity>

       
         </ShadowCard>
        
    );
};

// define your styles
const styles = StyleSheet.create({
    container: {
        //width:wp(40),
        height: hp(23),
        overflow: 'hidden',
        borderRadius:wp(3)
        
    },
    containerStyle:{
        width: wp(43.5),
        marginBottom:hp(2)
    },
    image:{
        width: '100%',
        height: '100%'
    },
    overlay: {
    position: 'absolute',
    left: 0,
    right: 0,
    bottom: 0,
    height: '28%',
    paddingHorizontal:wp(2),
   
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  title:{
    fontFamily: fonts.semibold,
    color: Colors.background,
    fontSize: wp(4.5),
    textAlign:'center'
  }
});

//make this component available to the app
export default CategoryCard;
