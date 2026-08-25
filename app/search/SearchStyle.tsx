import {StyleSheet } from 'react-native';
import Colors from '../../constants/colors';
import { fonts } from '../../constants/typography';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen'; 
const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: Colors.background,
        padding:hp(2)
    },
    header: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom:hp(2)
        //justifyContent: 'space-between',
    },
    buttonBack:{
                //flex:1
    },
    buttonCancel:{
         

    },
    search:{
         flex:3,
         marginHorizontal:wp(3)

    },
    // cancel:{
    //     fontSize: wp(4),
    //     color: Colors.secondary,
    //     fontWeight: '500'
    // },
    sectionHeading:{
        fontSize: wp(5),
        fontFamily: fonts.displaySemibold,
        //fontWeight: '600',
        color: Colors.text,
        marginBottom: hp(1)
    },
    sectionText:{
        fontSize: wp(3.5),
        fontFamily: fonts.regular,
        color: Colors.text,
        fontWeight: '400'
    
    },
    popularContainer:{
        flexDirection: 'row',
        flexWrap: 'wrap',
    },
    sectionTextView:{
        backgroundColor: Colors.background,
        borderWidth:0.2,
        borderRadius: 6,
        marginRight: wp(3),
        marginBottom: wp(2),
        borderColor: Colors.secondary,
                //elevation: 2,
                padding: wp(2)

    },
    recentContainer:{
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center'
    },
     clear:{
        fontSize: wp(4),
        color: Colors.primary,
         fontFamily: fonts.regular,
        //fontWeight: '400',
        //textDecorationLine: 'underline'
    },
    sectionContainer:{
        
        marginBottom: hp(2)
    },
    noFoundText:{
        color: Colors.secondary,
        fontFamily: fonts.medium,
        fontSize:wp(4.5)
    }
});
export default styles;