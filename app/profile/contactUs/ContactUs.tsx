import { View, Image, Text } from 'react-native';
import { SafeAreaView, } from 'react-native-safe-area-context';
import { router } from 'expo-router';
import { Linking } from 'react-native';
import styles from './ContactStyle';
import ContactCard from '../../../components/profile/ContactCard';
import Header from '../../../components/profile/Header';
const ContactUs = () => {
    const handleWhatsApp = async () => {
        const phoneNumber = '923434979378';
        const url = `whatsapp://send?phone=${phoneNumber}`;
        const supported = await Linking.canOpenURL(url);
        if (supported) {
            await Linking.openURL(url);
        } else {
            await Linking.openURL(
                `https://wa.me/${phoneNumber}`
            );
        }
    };
    const handleEmail = async () => {
        const email = 'nestnknifeinfo@gmail.com';
        const url =
            `mailto:${email}` +
            `?subject=NestnKnife Support` +
            `&body=Hello, I need help with...`;;
        await Linking.openURL(url);
    };
    return (
        <SafeAreaView style={styles.container}>
            <Header title='Contact Us' onPress={() => router.replace('/profile')} />
            <View style={styles.topContainer}>
                <Image
                    source={require('../../../assets/logo.png')}
                    style={styles.image}
                    resizeMode='contain'
                />
                <Text style={styles.heading}>We're here to help you!</Text>
                <Text style={styles.subText}>Have a question about your orders or our products?</Text>
                <Text style={styles.subText}>Get in touch with us.</Text>
            </View>
            <View style={styles.contactContainer}>
                <Text style={styles.contactText}>Contact Options</Text>
                <ContactCard
                    iconName='logo-whatsapp'
                    iconType='Ionicons'
                    mainText='Whatsapp Support'
                    subText='Chat with us on Whatsapp'
                    onPress={handleWhatsApp}
                />
                <ContactCard
                    iconName='mail-outline'
                    iconType='Ionicons'
                    mainText='Email Support'
                    subText='Send us an Email'
                    onPress={handleEmail}
                />
            </View>
            <View style={styles.footer}>
                <Text style={styles.footerText}>We're here to help with you questions and orders</Text>
            </View>

        </SafeAreaView>
    );
};
export default ContactUs;
