import React, { useEffect } from 'react';
import { Image, StyleSheet } from 'react-native';
import { widthPercentageToDP as wp, 
    heightPercentageToDP as hp } from 'react-native-responsive-screen';
import Animated, {
  runOnJS,
  useAnimatedStyle,
  useSharedValue,
  withTiming,
} from 'react-native-reanimated';

interface Props {
  image: any;
  startX: number;
  startY: number;
  endX: number;
  endY: number;
  onComplete: () => void;
}

const AddToCartAnimation: React.FC<Props> = ({
  image,
  startX,
  startY,
  endX,
  endY,
  onComplete,
}) => {
  const translateX = useSharedValue(startX);
  const translateY = useSharedValue(startY);
  const scale = useSharedValue(1);
  const opacity = useSharedValue(1);

  useEffect(() => {
    translateX.value = withTiming(endX, {
      duration: 700,
    });

    translateY.value = withTiming(
      endY,
      {
        duration: 700,
      },
      (finished) => {
        if (finished) {
          runOnJS(onComplete)();
        }
      },
    );

    scale.value = withTiming(0.2, {
      duration: 700,
    });

    opacity.value = withTiming(0, {
      duration: 700,
    });
  }, []);

  const animatedStyle = useAnimatedStyle(() => ({
    transform: [
      { translateX: translateX.value },
      { translateY: translateY.value },
      { scale: scale.value },
    ],
    opacity: opacity.value,
  }));

  return (
    <Animated.View style={[styles.container, animatedStyle]}>
      <Image
        source={{ uri: image }}
        style={styles.image}
        resizeMode="cover"
      />
    </Animated.View>
  );
};

export default AddToCartAnimation;

const styles = StyleSheet.create({
  container: {
    position: 'absolute',
    zIndex: 999,
  },

  image: {
    width: wp(20),
    height: wp(20),
    borderRadius: wp(2),
  },
});