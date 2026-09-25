import { View, Text, StyleSheet, Image } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import Header from '../categories/Header';
import { fonts } from '../../constants/typography';
import Colors from '../../constants/colors';
import Button from './Button';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
interface Props {
  mainText?: string
  subText?: string
  illustration?: any
  buttonTitle?: string
  onPress?: () => void
  isCart?: boolean
}
const CustomEmptyComponent: React.FC<Props> = ({ mainText, subText, illustration, onPress, buttonTitle, isCart }) => {
  return (


    <View style={styles.emptyContainer}>
      <Image source={illustration} style={styles.illustration} />
      <Text style={styles.emptyTitle}>{mainText}</Text>
      <Text style={[styles.emptyText, !isCart && styles.emptyText1]}>{subText}</Text>
      {
        isCart && (
          <Text style={[styles.emptyText, styles.emptyText1]}>Explore our collection!</Text>

        )
      }
      <View style={{ alignSelf: 'center' }}>
        {
          buttonTitle && (<Button title={buttonTitle} onPress={onPress} />)
        }
        

      </View>
    </View>
  );
};

const styles = StyleSheet.create({

  emptyContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },

  emptyTitle: {
    fontSize: wp(5),
    fontFamily: fonts.semibold
  },

  emptyText: {
    fontSize: wp(3.5),
    fontFamily: fonts.regular,
    color: Colors.secondary,
    textAlign: 'center',
  },
  emptyText1: {
    marginBottom: hp(5),
  },
  illustration: {
    width: wp(80),
    height: hp(30),
  }
});

//make this component available to the app
export default CustomEmptyComponent;
