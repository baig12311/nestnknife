import { View, Text, StyleSheet, ScrollView } from 'react-native';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import MoreProductCard from './MoreProductCard';
import Colors from '../../constants/colors';
import Animated, {
  FadeIn,
  ZoomIn,
} from 'react-native-reanimated';

const MoreProductContainer = () => {
  return (
    <Animated.View
      entering={FadeIn.duration(300)}
      style={styles.container}
    >
      <ScrollView nestedScrollEnabled={true}>
        <MoreProductCard />
        <MoreProductCard />
        <MoreProductCard />
        <MoreProductCard />
        <MoreProductCard />
        <MoreProductCard />
        <MoreProductCard />
        <MoreProductCard />
        <MoreProductCard />
        <MoreProductCard />
        <MoreProductCard />

      </ScrollView>


    </Animated.View>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: wp(2),
    borderLeftWidth:0.3,
    borderRightWidth:0.3,
    borderColor:Colors.secondary,

    height: hp(20)
  },
});

export default MoreProductContainer;