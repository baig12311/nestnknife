import { Tabs } from "expo-router";
import { StyleSheet, View, Text } from "react-native";
import Colors from "../../constants/colors";
import Icon from "../../components/Icon";
import { fonts } from "../../constants/typography";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from "react-native-responsive-screen";
import { useCartBadge } from "../../hooks/useCartBadge";
const TabLayout = () => {
    const insets = useSafeAreaInsets();
    const cartCount = useCartBadge()
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
                    //fontFamily:  'Poppins_600SemiBold'
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
                    } else if (route.name === 'profile') {
                        iconName = focused ? 'account' : 'account-outline';
                        type = 'MaterialCommunityIcons';
                    }


                    // return (
                    //     <Icon 
                    //         name={iconName} 
                    //         color={color} 
                    //         size={size} 
                    //         type={type} 
                    //     />
                    // );
                    if (route.name === 'cart') {
                        return (
                            <View style={{ position: 'relative' }}>
                                <Icon
                                    name={iconName}
                                    color={color}
                                    size={size}
                                    type={type}
                                />

                                {cartCount > 0 && (
                                    <View style={styles.badge}>
                                        <Text style={styles.badgeText}>
                                            {cartCount > 9 ? '9+' : cartCount}
                                            
                                        </Text>
                                    </View>
                                )}
                            </View>
                        );
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
            {/* <Tabs.Screen 
                name="wishlist" 
                options={{ tabBarLabel: 'Wishlist' }} 
            /> */}
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

const styles = StyleSheet.create({
    badge: {
        width: wp(5),
        height: wp(5),

        borderRadius: 200,
        position: 'absolute',
        backgroundColor: Colors.accent,
        top: '-17%',
        right: '-25%',
        justifyContent: 'center',
        alignItems: 'center',
    },
    badgeText: {
        color: Colors.background,
        fontSize: wp(3),
        fontFamily: fonts.regular,
        //fontWeight: '300'
    }
});