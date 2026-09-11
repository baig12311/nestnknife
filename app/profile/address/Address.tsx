import React, { Component } from 'react';
import { View, Text, Image } from 'react-native';
import styles from './AddressStyle';
import { SafeAreaView } from 'react-native-safe-area-context';
import Button from '../../../components/common/Button';
import Header from '../../../components/profile/Header';
import { router } from 'expo-router';
const Address = () => {
    return (
        <SafeAreaView style={styles.container}>
            <Header title='Address'/>
            <View style={styles.contentContainer}>
                <Image
                source={require('../../../assets/illustrations/address.png')}
                style={styles.image}
                resizeMode='contain'
            />
            <Text style={styles.mainText}>No Address Yet</Text>
            <Text style={styles.subText}>Add your delivery address to make checkout faster and easier</Text>
            <Button title='Add Address' onPress={()=>router.push('/profile/addAddress/AddAddress')}/>
            </View>
            
        </SafeAreaView>

    );
};


export default Address;
