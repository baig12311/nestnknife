//import liraries
import React, { Component } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import styles from './LoggedInStyle';
import Header from '../../../components/home/HomeHeader';
import Greeting from '../../../components/profile/Greeting';
import Incomplete from '../../../components/profile/Incomplete';
import EmailCard from '../../../components/profile/EmailCard';
import { getFullCustomerData } from '../../../services/shopify/customer';
// create a component
const LoggedIn = () => {
    return (
        <View style={styles.container}>
            <Header title='Account'/>
            <Greeting/>
            <Incomplete/>
            
            <EmailCard/>
        </View>
    );
};

// define your styles


//make this component available to the app
export default LoggedIn;
