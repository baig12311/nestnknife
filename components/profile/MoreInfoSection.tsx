import { View, Text, StyleSheet } from 'react-native';
import { router } from 'expo-router';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import CustomSectionRow from './CustomSectionrow';
import { ShadowCard } from '../common/ShadowCard';
const MoreInfoSection = () => {
    return (
        <ShadowCard style={styles.container} containerStyle={styles.containerStyle}>
            <View style={styles.contentContainer}>
                <CustomSectionRow
                    iconName='cube-outline'
                    iconType='Ionicons'
                    mainText='My Orders'
                    subText='View your order history'
                    paddingVertical={hp(1)}
                    borderBottomWidth={0.3}
                    onPress={()=>router.push('/profile/orders/Orders')}
                />
                <CustomSectionRow
                    iconName='truck'
                    iconType='Feather'
                    mainText='Track Order'
                    subText='Track your current orders'
                    paddingVertical={hp(1)}
                    borderBottomWidth={0.3}
                />
                <CustomSectionRow
                    iconName='location-outline'
                    iconType='Ionicons'
                    mainText='Saved Addresses'
                    subText='Add you delivery addresses'
                    paddingVertical={hp(1)}
                    borderBottomWidth={0.3}
                    onPress={()=>router.push('/profile/address/Address')}
                />
                

                <CustomSectionRow
                    iconName='heart-outline'
                    iconType='Ionicons'
                    mainText='Wishlist'
                    subText='Your saved items'
                    paddingVertical={hp(1)}
                    borderBottomWidth={0.3}
                />
                <CustomSectionRow
                    iconName='headset-mic'
                    iconType='MaterialIcons'
                    mainText='Help & Support'
                    subText='Get help and contact support'
                    paddingVertical={hp(1)}
                />
            </View>
        </ShadowCard>

    );
};

// define your styles
const styles = StyleSheet.create({
    container: {
        //borderWidth: 1,
        borderRadius: wp(2),
        marginBottom: hp(4)
    },
    containerStyle: {
        width: '100%'
    },
    contentContainer: {
        padding: wp(3)
    },
});

//make this component available to the app
export default MoreInfoSection;
