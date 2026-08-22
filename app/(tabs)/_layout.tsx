// import { Tabs } from 'expo-router';
// import { Ionicons } from '@expo/vector-icons';

// export default function TabsLayout() {
//   return (
//     <Tabs
//       screenOptions={{
//         headerShown: false,
//         tabBarActiveTintColor: '#1F5B3A',
//         tabBarInactiveTintColor: '#8A8A8A',
//       }}
      
//     >
//       <Tabs.Screen
//         name="index"
//         options={{
//           title: 'Home',
//           tabBarIcon: ({ color, size }) => (
//             <Ionicons name="home-outline" size={size} color={color} />
//           ),
//         }}
//       />

//       <Tabs.Screen
//         name="categories"
//         options={{
//           title: 'Categories',
//           tabBarIcon: ({ color, size }) => (
//             <Ionicons name="grid-outline" size={size} color={color} />
//           ),
//         }}
//       />

//       <Tabs.Screen
//         name="cart"
//         options={{
//           title: 'Cart',
//           tabBarIcon: ({ color, size }) => (
//             <Ionicons name="bag-outline" size={size} color={color} />
//           ),
//         }}
//       />

//       <Tabs.Screen
//         name="account"
//         options={{
//           title: 'Account',
//           tabBarIcon: ({ color, size }) => (
//             <Ionicons name="person-outline" size={size} color={color} />
//           ),
//         }}
//       />
//     </Tabs>
//   );
// }









import { Tabs } from "expo-router";
import Colors from "../../constants/colors";
import Icon from "../../components/Icon";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from "react-native-responsive-screen";

const TabLayout = () => {
    const insets = useSafeAreaInsets();

    return (
        <Tabs
            screenOptions={({ route }) => ({
                headerShown: false,
                tabBarActiveTintColor: Colors.primary,
                tabBarInactiveTintColor: Colors.secondary,
                
                // Style the native tab bar container
                tabBarStyle: {
                    height: hp(7) + insets.bottom,
                    // paddingBottom: insets.bottom > 0 ? insets.bottom : hp(1),
                    // paddingTop: hp(1),
                    //borderColor: Colors.secondaryColor,
                    //paddingBottom: hp(1),
                },

                // Style the native label directly
                tabBarLabelStyle: {
                    fontSize: wp(3.5),
                    fontWeight: '400',
                    fontFamily: 'Poppins_500Medium'
                    //paddingBottom: hp(1)
                },

                // Render custom icon per route
                tabBarIcon: ({ focused, color, size }) => {
                    let iconName = '', type = '';

                    if (route.name === 'index') {
                        iconName = focused ? 'home-sharp' : 'home-outline';
                        type = 'Ionicons';
                    } else if (route.name === 'cart') {
                        iconName = focused ? 'cart' : 'cart-outline';
                        type = 'Ionicons';
                    } else if (route.name === 'categories') {
                        iconName = focused ? 'grid' : 'grid-outline';
                        type = 'Ionicons';
                    }else if (route.name === 'profile') {
                        iconName = focused ? 'account' : 'account-outline';  
                        type = 'MaterialCommunityIcons';
                    }

                    return (
                        <Icon 
                            name={iconName} 
                            color={color} 
                            size={size} 
                            type={type} 
                        />
                    );
                },
            })}
        >
            <Tabs.Screen 
                name="index" 
                options={{ tabBarLabel: 'Home' }} 
            />
            <Tabs.Screen 
                name="cart" 
                options={{ tabBarLabel: 'Cart' }} 
            />
            <Tabs.Screen 
                name="categories" 
                options={{ tabBarLabel: 'Categories' }} 
            />
            <Tabs.Screen 
                name="profile" 
                options={{ tabBarLabel: 'Profile' }} 
            />
        </Tabs>
    );
};

export default TabLayout;