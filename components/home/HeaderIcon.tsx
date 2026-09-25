import React, { forwardRef } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
} from 'react-native';

import Colors from '../../constants/colors';
import Icon from '../Icon';
import { fonts } from '../../constants/typography';

import {
  widthPercentageToDP as wp,
} from 'react-native-responsive-screen';

interface Props {
  iconName: string;
  badgeData?: number;
  count?: number;
  onPress?: () => void;
  color: string;
  backgroundColor?: string;
}

const HeaderIcon = forwardRef<View, Props>(
  (
    {
      iconName,
      badgeData,
      count = 0,
      onPress,
      color,
      backgroundColor,
    },
    ref,
  ) => {
    return (
      <TouchableOpacity
        ref={ref}
        style={[
          styles.iconContainer,
          {
            backgroundColor: backgroundColor,
          },
        ]}
        onPress={onPress}
        activeOpacity={0.7}
      >
        <Icon
          name={iconName}
          type="Ionicons"
          size={wp(6.5)}
          color={color}
        />

        {count > 0 && (
          <View style={styles.badge}>
            <Text style={styles.badgeText}>
              {count > 9 ? '9+' : count}
            </Text>
          </View>
        )}
      </TouchableOpacity>
    );
  },
);

HeaderIcon.displayName = 'HeaderIcon';

const styles = StyleSheet.create({
  iconContainer: {
    width: wp(10),
    height: wp(10),
    borderRadius: wp(6),
    justifyContent: 'center',
    alignItems: 'center',
    marginLeft: wp(1),
  },

  badge: {
    width: wp(5),
    height: wp(5),
    borderRadius: wp(3),
    position: 'absolute',
    backgroundColor: Colors.accent,
    top: '-6%',
    right: '-3%',
    justifyContent: 'center',
    alignItems: 'center',
  },

  badgeText: {
    color: Colors.background,
    fontSize: wp(3),
    fontFamily: fonts.regular,
  },
});

export default HeaderIcon;