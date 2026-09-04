import React from 'react';
import { StyleProp, ViewStyle, StyleSheet } from 'react-native';
import { Shadow, ShadowProps } from 'react-native-shadow-2';

interface ShadowCardProps {
  children: React.ReactNode;
  /** Radius of the blur spread (default: 6) */
  distance?: number;
  /** Shadow displacement [x, y] (default: [0, 3]) */
  offset?: [number, number];
  /** Color at the card edge (default: 'rgba(0,0,0,0.06)') */
  startColor?: string;
  /** Border radius matching your child content (default: 16) */
  borderRadius?: number;
  /** Styles for dimensions/background applied to the inner card */
  style?: StyleProp<ViewStyle>;
  /** Styles for positioning/margins applied to the outer layout */
  containerStyle?: StyleProp<ViewStyle>;
}

export function ShadowCard({
  children,
  distance = 6,
  offset = [0, 3],
  startColor = 'rgba(0, 0, 0, 0.06)',
  borderRadius,
  style,
  containerStyle,
}: ShadowCardProps) {
  return (
    <Shadow
      distance={distance}
      offset={offset}
      startColor={startColor}
      endColor="rgba(0, 0, 0, 0.00)"
      containerStyle={[styles.defaultContainer, containerStyle]}
      style={[
        styles.defaultCard,
        { borderRadius },
        style,
      ]}
    >
      {children}
    </Shadow>
  );
}

const styles = StyleSheet.create({
  defaultContainer: {
    // Allows auto-sizing to children if no explicit width is passed
    alignSelf: 'flex-start',
  },
  defaultCard: {
    backgroundColor: '#FFFFFF', // Solid background stops shadow bleeding
    width: '100%',
  },
});