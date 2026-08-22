import { StyleSheet } from 'react-native';
import Colors from '../../constants/colors';
import { fonts } from '../../constants/typography';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
const styles = StyleSheet.create({
    mainContainer: {
    flex: 1,
    backgroundColor: Colors.background,
     padding: hp(2)
  },
    container: {
    flex: 1,
    backgroundColor: Colors.background,
  },

  header: {
   marginBottom: hp(0.5),
   flexDirection: 'row',
   justifyContent: 'space-between',
   alignItems: 'center',
  },

  title: {
    fontSize: wp(6),
    fontWeight: '600',
    color: Colors.text,
    marginBottom: hp(0.1),
  },

  subtitle: {
    
    fontSize: wp(4),
    color: Colors.secondary,
    fontFamily: fonts.regular,
        marginBottom: hp(2),

  },

  grid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    //paddingHorizontal: 20,
  },

  

  


  loader: {
    flex: 1,
  },

  errorContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    padding: 20,
  },

  errorText: {
    fontSize: 16,
    color: '#D00',
  },
});
export default styles;