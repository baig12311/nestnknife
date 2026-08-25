import { StyleSheet } from "react-native";
import Colors from "../../constants/colors";
import { fonts } from "../../constants/typography";
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from "react-native-responsive-screen";
const styles = StyleSheet.create({
  mainContainer:{
    flex:1,
    backgroundColor: '#FAF7F2',
    //padding:20
  },
  container: {
    flex: 1,
    backgroundColor: Colors.background,
    //borderWidth:3
  },
  contentContainer:{
    paddingHorizontal:hp(2),
    //borderWidth:2
  },

  image: {
    width:  wp(100),
    height: '100%',
    // borderBottomLeftRadius: 15,
    // borderBottomRightRadius:15,
    // elevation: 10,
    //height: hp(35),
    backgroundColor: '#F5F5F5',
  },
  dotsContainer:{
    //borderWidth:1,
    marginBottom: hp(2),
    flexDirection:'row',
    justifyContent: 'center',
    gap:5
  },
  dot:{
    width: wp(3),
    height: wp(3),
    borderRadius: wp(2),
    elevation:1,
    backgroundColor: Colors.secondary2
  },
  activeDot:{
    width: wp(7),
    backgroundColor: Colors.accent
  },
  imageContainer:{
    height: hp(35),
    marginBottom: hp(1)
    //height: hp(-100),
    //width: wp(100)
    //borderWidth: 4
  },

  title: {
    fontSize: wp(6),
    fontFamily: fonts.bold,
    //fontWeight: '700',
        color:Colors.text,
        //marginBottom:hp(1)

  },

  price: {
   fontSize: wp(6),
   fontFamily: fonts.displayBold,
    //fontWeight: '700',
    color:Colors.primary,
            marginBottom:hp(0.5)

  },

  description: {
  },

  quantityContainer: {
    flexDirection: 'row',
    //borderWidth:1,
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom:hp(1)
  },

  quantityLabel: {
    fontFamily: fonts.semibold,
    fontSize: wp(5)
  },

  quantityControls: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  buyContainer:{
    borderTopWidth:0.3,
    borderColor:Colors.secondary,
    padding:hp(2),
 
  },

  quantityButton: {
    width: 42,
    height: 42,
    borderRadius: 10,
    backgroundColor: '#F2F2F2',
    alignItems: 'center',
    justifyContent: 'center',
  },

  quantityButtonText: {
    fontSize: wp(7),
    fontFamily:fonts.medium,
    color: '#222',
  },

  quantity: {
    fontFamily:fonts.semibold,
    width: 50,
    textAlign: 'center',
    fontSize: wp(5),
    //fontWeight: '600',
  },

  addToCartButton: {
    height:hp(6),
    justifyContent: 'center',
    alignItems:'center',
    backgroundColor: Colors.primary,
    borderRadius:wp(3)

  },

  addToCartText: {
    color: Colors.background,
    fontSize: wp(4.5),
    fontFamily:fonts.semibold
    //fontWeight: '600',
  },

  disabledButton: {
    opacity: 0.7,
  },

  loader: {
    flex: 1,
  },

  error: {
    flex: 1,
    padding: 20,
    fontSize: 16,
    color: '#D00',
  },
  headingView:{
    borderBottomWidth:0.3,
    borderColor:Colors.secondary,
    marginBottom: hp(2)
  }
});
export default styles