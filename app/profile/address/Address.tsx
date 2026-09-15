import React, { Component } from 'react';
import { View, Text, Image } from 'react-native';
import styles from './AddressStyle';
import { SafeAreaView } from 'react-native-safe-area-context';
import Button from '../../../components/common/Button';
import Header from '../../../components/profile/Header';
import { router } from 'expo-router';
import { useCustomer } from '../../../hooks/useCustomer';
import { FlatList } from 'react-native';
import AddressCard from '../../../components/profile/AddressCard';
const Address = () => {
    const { customer, loading } = useCustomer()
    const customerAddresses = customer?.addresses?.edges

    if (loading) {
        return (
            <View style={{ flex: 1, backgroundColor: 'white', justifyContent: 'center', alignItems: 'center' }}>
                <Text style={{ fontSize: 20 }}>Loading....</Text>
            </View>
        )
    }
    const renderAddress =({item}:any)=>{
        return(
            <AddressCard
        firstName={item.node.firstName}
        lastName={item.node.lastName}
        address1={item.node.address1}
        address2={item.node.address2}
        phoneNumber={item.node.phoneNumber}
        />
        )
        
    }

    //console.log(customerAddresses)
    return (
        <SafeAreaView style={styles.container}>
            <Header title='Address' />
            {
                customerAddresses ? (
                    <FlatList
                        data={customerAddresses}
                        renderItem={renderAddress}

                    />


                ) : (
                    <View style={styles.contentContainer}>
                        <Image
                            source={require('../../../assets/illustrations/address.png')}
                            style={styles.image}
                            resizeMode='contain'
                        />
                        <Text style={styles.mainText}>No Address Yet</Text>
                        <Text style={styles.subText}>Add your delivery address to make checkout faster and easier</Text>
                        {/* <Button title='Add Address' onPress={()=>router.push('/profile/addAddress/AddAddress')}/> */}
                    </View>
                )

            }

            <Button title={customerAddresses ? 'Add New Address' : 'Add Address'} onPress={() => router.push('/profile/addAddress/AddAddress')} />


        </SafeAreaView>

    );
};


export default Address;
