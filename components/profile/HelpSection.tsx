import { View, Text, StyleSheet } from 'react-native';
import { router } from 'expo-router';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import CustomSectionRow from './CustomSectionrow';
import { ShadowCard } from '../common/ShadowCard';
const HelpSection = () => {
    return (
        <ShadowCard style={styles.container} containerStyle={styles.containerStyle}>
            <View style={styles.contentContainer}>
                <CustomSectionRow
                    iconName='headset-outline'
                    iconType='Ionicons'
                    mainText='Help & Support'
                    subText='Get help and find answers'
                    paddingVertical={hp(1)}
                    borderBottomWidth={0.3}
                />
                
                <CustomSectionRow
                    iconName='mail-outline'
                    iconType='Ionicons'
                    mainText='Contact Us'
                    subText='Contact our support team'
                    paddingVertical={hp(1)}
                    onPress={() => router.push('/profile/contactUs/ContactUs')}
                />
            </View>
        </ShadowCard>

    );
};
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
export default HelpSection;
