import React, { useEffect } from 'react';
import Animated, {
  useAnimatedStyle,
  useSharedValue,
  withDelay,
  withTiming,
} from 'react-native-reanimated';

interface Props {
  children: React.ReactNode;
  delay?: number;
}

const FadeInView: React.FC<Props> = ({
  children,
  delay = 0,
}) => {
  const opacity = useSharedValue(0);
  const translateY = useSharedValue(20);

  useEffect(() => {
    opacity.value = withDelay(
      delay,
      withTiming(1, {
        duration: 500,
      })
    );

    translateY.value = withDelay(
      delay,
      withTiming(0, {
        duration: 500,
      })
    );
  }, []);

  const animatedStyle = useAnimatedStyle(() => ({
    opacity: opacity.value,
    transform: [
      {
        translateY: translateY.value,
      },
    ],
  }));

  return (
    <Animated.View style={animatedStyle}>
      {children}
    </Animated.View>
  );
};

export default FadeInView;