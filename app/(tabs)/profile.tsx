import React from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  Image
} from 'react-native';
import { useCustomer } from '../../hooks/useCustomer';
import { useAppSelector } from '../../hooks/redux';
import { router } from 'expo-router';
import { ShadowCard } from '../../components/common/ShadowCard';
import { widthPercentageToDP as wp } from 'react-native-responsive-screen';
import Colors from '../../constants/colors';
import { SafeAreaView } from 'react-native-safe-area-context';
import styles from '../styles/ProfileStyle';
import { refreshAccessToken } from '../../services/shopify/shopify0Auth';
import { useLogin } from '../../hooks/useAuth';
import FloatingInput from '../../components/profile/FloatingInput';
import HomeHeader from '../../components/home/HomeHeader';
import Icon from '../../components/Icon';
import { useLogout } from '../../hooks/useAuth';
import LoggedIn from '../profile/loggedin/LoggedIn';
const ProfileScreen = () => {
  const logoutMutation=useLogout()
  const login = useLogin();
  const accessToken =useAppSelector(
  (state) => state.auth.accessToken
);

const isLoggedIn = !!accessToken;
  // const {
  //   customer,
  //   loading,
  //   updateCustomer,
  //   updating,
  // } = useCustomer();

  return (
    <SafeAreaView style={styles.container}>
      
      {
        isLoggedIn &&(<LoggedIn/>)
      }
    </SafeAreaView>
  );
}
export default ProfileScreen

