// import React, { useEffect, useState } from 'react';
// import {
//   View,
//   Text,
//   TouchableOpacity,
//   StyleSheet,
//   Image,
//   ActivityIndicator
// } from 'react-native';
// import { useCustomer } from '../../hooks/useCustomer';
// import { useAppSelector } from '../../hooks/redux';
// import { router } from 'expo-router';
// import { ShadowCard } from '../../components/common/ShadowCard';
// import { widthPercentageToDP as wp } from 'react-native-responsive-screen';
// import Colors from '../../constants/colors';
// import { SafeAreaView } from 'react-native-safe-area-context';
// import styles from '../styles/ProfileStyle';
// import { refreshAccessToken } from '../../services/shopify/shopify0Auth';
// import { useLogin } from '../../hooks/useAuth';
// import FloatingInput from '../../components/profile/FloatingInput';
// import Icon from '../../components/Icon';
// import { useLogout } from '../../hooks/useAuth';
// import LoggedIn from '../profile/loggedin/LoggedIn';
// import HeaderIcon from '../../components/home/HeaderIcon';
// import NotLoggedIn from '../profile/notloggedin/NotLoggedIn';
// import HomeHeader from '../../components/home/HomeHeader';
// const ProfileScreen = () => {
//   const[loader, setLoader] =useState(true);
//   const[isLoggedIn, setIsLoggedIn]=useState(false);
//   const logoutMutation=useLogout()
//   const login = useLogin();

// //   const accessToken =useAppSelector(
// //   (state) => state.auth.accessToken
// // );

// useEffect(()=>{
//   const { accessToken } = useAppSelector((state) => state.auth);
//   setIsLoggedIn(!!accessToken)
//   //isLoggedIn = !!accessToken;
//   setLoader(false);


// }, [])

//   // const {
//   //   customer,
//   //   loading,
//   //   updateCustomer,
//   //   updating,
//   // } = useCustomer();
//   if (loader) {
//     return (
//       <SafeAreaView style={styles.container}>
//         <HomeHeader title="Account" />
//         <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
//           <ActivityIndicator size="large" color={Colors.primary || '#000'} />
//         </View>
//       </SafeAreaView>
//     );
//   }
//   return (
//     <SafeAreaView style={styles.container}>
//       <HomeHeader title='Account'/>
//       {
//         isLoggedIn ? (<LoggedIn/>) : (<NotLoggedIn/>)
//       }
//     </SafeAreaView>
//   );
// }
// export default ProfileScreen




import React from 'react';
import {
  View,
  ActivityIndicator,
} from 'react-native';
import { useAppSelector } from '../../hooks/redux';
import { SafeAreaView } from 'react-native-safe-area-context';
import styles from '../styles/ProfileStyle';
import LoggedIn from '../profile/loggedin/LoggedIn';
import NotLoggedIn from '../profile/notloggedin/NotLoggedIn';
import HomeHeader from '../../components/home/HomeHeader';
import Colors from '../../constants/colors';
import { useCustomer } from '../../hooks/useCustomer';
const ProfileScreen = () => {
 
  const { accessToken, isLoading } = useAppSelector((state) => state.auth);
  const {customer}=useCustomer()
  const email = customer?.emailAddress?.emailAddress
  console.log(email)
  if (isLoading) {
    return (
      <SafeAreaView style={styles.container}>
        <HomeHeader title="Account" />
        <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
          <ActivityIndicator size="large" color={Colors.primary || '#000'} />
        </View>
      </SafeAreaView>
    );
  }

  // Session restore complete - ab accessToken check kar
  return (
    <SafeAreaView style={styles.container}>
      <HomeHeader title='Account'/>
      {accessToken ? <LoggedIn /> : <NotLoggedIn />}
    </SafeAreaView>
  );
}

export default ProfileScreen;