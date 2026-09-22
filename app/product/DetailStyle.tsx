import { StyleSheet } from "react-native";
import Colors from "../../constants/colors";
import { fonts } from "../../constants/typography";
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from "react-native-responsive-screen";
const styles = StyleSheet.create({
  mainContainer: {
    flex: 1,
    backgroundColor: '#FAF7F2',
    //padding:20
  },
  errorContainer:{
    flex:1, 
    padding:hp(2),
    borderWidth:1
  },
  container: {
    flex: 1,
    backgroundColor: Colors.background,
    //borderWidth:3
  },
  contentContainer: {
    paddingHorizontal: hp(2),
    //borderWidth:2
  },

  image: {
    width: wp(100),
    height: '100%',
   
    backgroundColor: '#F5F5F5',
  },
  imageMapperContainer: {
    marginBottom: hp(2),
    flexDirection: 'row',
    justifyContent: 'center',
    gap:10,
    flexWrap:'wrap',
    paddingHorizontal:hp(2)
  },
  
 
  mapImage: {
    width: wp(12),
    height: wp(12),
    borderRadius: wp(2),
    opacity: 0.3
  },
  activeImage: {
    borderWidth: 1,
    borderColor: Colors.accent,
    opacity: 1

  },
  dividerLine:{
    borderBottomWidth:0.3,
    borderColor:Colors.secondary,
    //marginHorizontal:hp(2),
    marginBottom:hp(1)
  },
  imageContainer: {
    height: hp(30),
    marginBottom: hp(1)
  },

  title: {
    fontSize: wp(5.5),
    fontFamily: fonts.bold,
    color: Colors.text,

  },

  price: {
    fontSize: wp(6),
    fontFamily: fonts.displayBold,
    color: Colors.primary,
    marginBottom: hp(0.5)

  },

  description: {
  },

  quantityContainer: {
    flexDirection: 'row',
    //borderWidth:1,
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: hp(1)
  },

  quantityLabel: {
    fontFamily: fonts.semibold,
    fontSize: wp(5)
  },

  quantityControls: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  buyContainer: {
    borderTopWidth: 0.3,
    borderColor: Colors.secondary,
    padding: hp(2),

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
    fontFamily: fonts.medium,
    color: '#222',
  },

  quantity: {
    fontFamily: fonts.semibold,
    width: 50,
    textAlign: 'center',
    fontSize: wp(5),
    //fontWeight: '600',
  },

  addToCartButton: {
    height: hp(6),
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: Colors.primary,
    borderRadius: wp(3)

  },

  addToCartText: {
    color: Colors.background,
    fontSize: wp(4.5),
    fontFamily: fonts.semibold
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
  headingView: {
    borderBottomWidth: 0.3,
    borderColor: Colors.secondary,
    marginBottom: hp(2)
  },
  buttonContainer: {
    flexDirection: 'row',
    gap: 10
  },
  headerContainer:{
   
    position: 'absolute',
    zIndex: 1,
    top: hp(7),
    width: wp(95),
    alignSelf: 'center' 
  }
});
export default styles