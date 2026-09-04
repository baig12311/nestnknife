// //import liraries
// import { View, Text, StyleSheet, Image, TouchableOpacity} from 'react-native';
// import styles from './NotLoggedStyle';
// import Icon from '../../../components/Icon';
// import Colors from '../../../constants/colors';
// import { router } from 'expo-router';
// import { useLogin } from '../../../hooks/useAuth';
// import { ShadowCard } from '../../../components/common/ShadowCard';
// import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
// const NotLoggedIn = () => {
//     const login = useLogin();
//     return (
//         <View style={styles.container}>
//              <View style={styles.mainContainer}>
//         {/* // Image and Heading  */}
//         <View style={styles.contentContainer}>
//           <Image
//             source={require('../../../assets/signup.png')}
//             style={styles.image}
//             resizeMode='cover'
//           />
//           <Text style={styles.heading}>
//             Signin to continue!
//           </Text>
//           <Text style={styles.subHeading}>
//             Signin to access your orders, wishlist and exclusive offers.
//           </Text>
//         </View>


//         {/* // Button to Login */}


//         <ShadowCard style={styles.buttonContainer} containerStyle={styles.buttonContainerStyle}>
//           <TouchableOpacity style={styles.button} onPress={() => login.mutate()}
//         disabled={login.isPending}
//         >
//             <View style={styles.icon}>
//               <Icon name='mail-outline' type='Ionicons' size={wp(6.5)} color={Colors.text} />
//             </View>

//             <View style={styles.buttonTextContainer}>
//               <Text style={styles.ButtonMainText}>
//                 Sign in with Email/OTP
//               </Text>
//               <Text style={styles.ButtonSubText}>
//                 We'll send you a secure OTP
//               </Text>
//             </View>
//             <Icon name='chevron-small-right' type='Entypo' size={wp(8)} color={Colors.text} />

//           </TouchableOpacity>
//         </ShadowCard>


//         {/* // Divider */}


//         <View style={styles.dividerContainer}>
//           <View style={styles.divider} />
//           <Text style={styles.orText}>OR</Text>
//           <View style={styles.divider} />
//         </View>

//         {/* // Guest Button  */}

//         <TouchableOpacity style={styles.guestButton} onPress={()=>router.replace('/')}>
//           <Text style={styles.buttonText}>Continue as Guest</Text>
//         </TouchableOpacity>


//         {/* // Private Container */}
//         <View style={styles.privateContainer}>
//           <Icon name='lock' type='SimpleLineIcons' size={wp(5)} color={Colors.secondary}/>
//           <Text style={styles.privateText}>
//             We keep your data safe and private
//           </Text>
//         </View>

//       </View>
//       {/* <TouchableOpacity onPress={() => logoutMutation.mutate()}>
//   <Text>Logout</Text>
//  <TouchableOpacity
//   onPress={async () => {
//     const token = await refreshAccessToken();

//     console.log('FINAL REFRESH RESULT:', !!token);
//   }}
// >
//   <Text>Test Refresh Token</Text>
// </TouchableOpacity>
// </TouchableOpacity> */}

//       {/* <TouchableOpacity
//         style={styles.loginButton}
//         onPress={() => login.mutate()}
//         disabled={login.isPending}
//       >
//         <Text style={styles.loginText}>
//           {login.isPending ? 'Logging in...' : 'Login'}
//         </Text>
//       </TouchableOpacity>

//       <TouchableOpacity
//   onPress={() =>
//     updateCustomer({
//       firstName: 'Shaheer',
//       lastName: 'Baig',
//     })
//   }
//   disabled={updating}
// >
//   <Text>
//     {updating ? 'Updating...' : 'Update Name'}
//   </Text>
// </TouchableOpacity> */}
//         </View>
//     );
// };



// //make this component available to the app
// export default NotLoggedIn;





//new code claude
//import liraries
import { View, Text, StyleSheet, Image, TouchableOpacity, ActivityIndicator} from 'react-native';
import styles from './NotLoggedStyle';
import Icon from '../../../components/Icon';
import Colors from '../../../constants/colors';
import { router } from 'expo-router';
import { useLogin } from '../../../hooks/useAuth';
import { ShadowCard } from '../../../components/common/ShadowCard';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';

const NotLoggedIn = () => {
    const login = useLogin();
    const isLoading = login.isPending; // OAuth flow jab chalta hai

    return (
        <View style={styles.container}>
             <View style={[styles.mainContainer, isLoading && { opacity: 0.6 }]}>
        {/* // Image and Heading  */}
        <View style={styles.contentContainer}>
          <Image
            source={require('../../../assets/signup.png')}
            style={styles.image}
            resizeMode='cover'
          />
          <Text style={styles.heading}>
            Signin to continue!
          </Text>
          <Text style={styles.subHeading}>
            Signin to access your orders, wishlist and exclusive offers.
          </Text>
        </View>


        {/* // Button to Login */}


        <ShadowCard 
          style={[styles.buttonContainer, isLoading && { opacity: 0.7 }]} 
          containerStyle={styles.buttonContainerStyle}
        >
          <TouchableOpacity 
            style={[
              styles.button,
              isLoading && { backgroundColor: Colors.secondary } // ✅ Visual feedback
            ]} 
            onPress={() => login.mutate()}
            disabled={isLoading}  // ✅ Disable karo jab loading
          >
            <View style={styles.icon}>
              {isLoading ? (
                <ActivityIndicator size="small" color={Colors.primary} />
              ) : (
                <Icon name='mail-outline' type='Ionicons' size={wp(6.5)} color={Colors.text} />
              )}
            </View>

            <View style={styles.buttonTextContainer}>
              <Text style={[styles.ButtonMainText, isLoading && { color: Colors.secondary2 }]}>
                {isLoading ? 'Signing in...' : 'Sign in with Email/OTP'}
              </Text>
              <Text style={[styles.ButtonSubText, isLoading && { color: Colors.secondary2 }]}>
                {isLoading ? 'Redirecting to Shopify...' : "We'll send you a secure OTP"}
              </Text>
            </View>
            {!isLoading && (
              <Icon name='chevron-small-right' type='Entypo' size={wp(8)} color={Colors.text} />
            )}

          </TouchableOpacity>
        </ShadowCard>


        {/* // Divider */}


        <View style={styles.dividerContainer}>
          <View style={styles.divider} />
          <Text style={styles.orText}>OR</Text>
          <View style={styles.divider} />
        </View>

        {/* // Guest Button  */}

        <TouchableOpacity 
          style={[styles.guestButton, isLoading && { opacity: 0.5 }]} 
          onPress={() => router.replace('/')}
          disabled={isLoading}  // ✅ Disable guest button bhi jab login ho raha
        >
          <Text style={styles.buttonText}>Continue as Guest</Text>
        </TouchableOpacity>


        {/* // Private Container */}
        <View style={styles.privateContainer}>
          <Icon name='lock' type='SimpleLineIcons' size={wp(5)} color={Colors.secondary}/>
          <Text style={styles.privateText}>
            We keep your data safe and private
          </Text>
        </View>

      </View>
        </View>
    );
};



//make this component available to the app
export default NotLoggedIn;