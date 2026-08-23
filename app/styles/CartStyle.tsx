import { StyleSheet } from "react-native";
import Colors from "../../constants/colors";
import { fonts } from "../../constants/typography";
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen'; 
const styles=StyleSheet.create({
    container:{
        flex:1,
        padding:hp(2),
        backgroundColor:Colors.background,
        justifyContent: 'space-between'

    },
    contentContainer:{
      
      padding:hp(1),
      marginBottom: hp(1),
      borderWidth:0.2,
      borderRadius:10,
     
    },
    amountContainer:{
      //borderWidth:1,
      
    },
    // amountContainer:{
      
    //   position: 'absolute',
    //   bottom:7,
    //   width: '100%',
    //   alignSelf: 'center',
    //   backgroundColor: Colors.background
    // },
    emptyContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    //padding: 20,
    //backgroundColor: '#FFFFFF',
  },

  emptyTitle: {
    fontSize: wp(6),
    fontFamily:fonts.semibold
  },

  emptyText: {
    marginTop: hp(1),
    fontSize: wp(4),
    fontFamily: fonts.regular,
    color:Colors.secondary
  },

})
export default styles;