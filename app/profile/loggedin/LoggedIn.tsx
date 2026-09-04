//import liraries
import React, { Component } from 'react';
import { View, Text, StyleSheet, ScrollView } from 'react-native';
import styles from './LoggedInStyle';
import { SafeAreaView } from 'react-native-safe-area-context';
import Header from '../../../components/home/HomeHeader';
import Greeting from '../../../components/profile/Greeting';
import Incomplete from '../../../components/profile/Incomplete';
import EmailCard from '../../../components/profile/EmailCard';
import PersonalInfoSection from '../../../components/profile/PersonalInfoSection';
import MoreInfoSection from '../../../components/profile/MoreInfoSection';
import { getFullCustomerData } from '../../../services/shopify/customer';
import SignOut from '../../../components/profile/SignOutButton';
import { useLogout } from '../../../hooks/useAuth';
import { useCustomer } from '../../../hooks/useCustomer';
const LoggedIn = () => {
    const logoutMutation = useLogout()
    const {customer, loading}=useCustomer();
    const email =customer?.emailAddress?.emailAddress
    const fName=customer?.firstName
    const lName=customer?.lastName
    console.log(customer)
    return (
        <View style={styles.container}>

            <ScrollView contentContainerStyle={styles.content}
                showsVerticalScrollIndicator={false}>

                <Greeting 
                email={email}
                fName={fName}
                lName={lName}
                loading={loading}
                />
                <Incomplete />
                {/* <EmailCard email={email}/>
                <PersonalInfoSection /> */}
                <Text style={styles.heading}>Account</Text>
                <MoreInfoSection />
                <SignOut onPress={() => logoutMutation.mutate()} />
            </ScrollView>


        </View>
    );
};

// define your styles


//make this component available to the app
export default LoggedIn;
