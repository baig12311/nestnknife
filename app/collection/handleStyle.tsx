import {StyleSheet} from 'react-native';
import {widthPercentageToDP as wp, heightPercentageToDP as hp} from 'react-native-responsive-screen';
import Colors from '../../constants/colors';
import { fonts } from '../../constants/typography';
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.background,
    padding: hp(2),
  },

  // title: {
  //   marginTop: 24,
  //   fontSize: wp(4),
  //   fontWeight: '700',
  //   color: '#222222',
  // },

  count: {
    //marginTop: 5,
    marginBottom: hp(1),
    fontSize:wp(4),
    fontFamily: fonts.regular,
    color: Colors.secondary,
    textAlign:'right',
  
  },

  list: {
    paddingBottom: 30,
  },

  row: {
    justifyContent: 'space-between',
  },

  card: {
    width: '48%',
    marginBottom: 18,
    borderRadius: 16,
    overflow: 'hidden',
    borderWidth: 1,
    borderColor: '#EEEEEE',
    backgroundColor: '#FFFFFF',
  },

  image: {
    width: '100%',
    height: 170,
    backgroundColor: '#F5F5F5',
  },

  info: {
    padding: 12,
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

  empty: {
    alignItems: 'center',
    paddingTop: 60,
  },

  emptyTitle: {
    fontSize: 18,
    fontWeight: '700',
    color: '#222222',
  },

  emptyText: {
    marginTop: 8,
    textAlign: 'center',
    color: '#777777',
  },
  subtitle: {
    
    fontSize: wp(4),
    color: Colors.secondary,
        marginBottom: hp(2),

  },
});

export default styles;