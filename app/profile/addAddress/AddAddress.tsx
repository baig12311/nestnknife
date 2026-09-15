import React, { Component, useState } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import styles from './AddAddressStyle';
import { SafeAreaView } from 'react-native-safe-area-context';
import Header from '../../../components/profile/Header';
import FloatingInput from '../../../components/profile/FloatingInput';
import { Checkbox } from 'expo-checkbox';
import { createCustomerAddress } from '../../../services/shopify/customer';

import Button from '../../../components/common/Button';
const AddAddress = () => {
    const [AddressData, setAddressData] = useState({
        firstName: '',
        lastName: '',
        phoneNumber: '',
        address1: '',
        address2: '',
        city: '',
        postalCode: '',
        isDefault: false
    })
    const handleAddressChange = async () => {
        const fullNumber = '+92' + AddressData.phoneNumber
        
        const result = await createCustomerAddress({
            firstName: AddressData.firstName,
            lastName: AddressData.lastName,
            phoneNumber: fullNumber,
            address1: AddressData.address1,
            address2: AddressData.address2,
            city: AddressData.city,
            territoryCode: 'PK',
            zip: AddressData.postalCode,
            defaultAddress: AddressData.isDefault,
        })
        console.log('ADDRESS INFO: ', result)

    }
    return (
        <SafeAreaView style={styles.container}>
            <Header title='Add New Address' />
            <View style={styles.fieldsContainer}>
                <FloatingInput
                    placeholder='First Name'
                    iconName='person-outline'
                    iconType='Ionicons'
                    value={AddressData.firstName}
                    onChangeText={(text) => setAddressData({
                        ...AddressData,
                        firstName: text
                    })}
                />
                <FloatingInput
                    placeholder='Last Name'
                    iconName='person-outline'
                    iconType='Ionicons'
                    value={AddressData.lastName}
                    onChangeText={(text) => setAddressData({
                        ...AddressData,
                        lastName: text
                    })}
                />
                <View style={styles.numberInput}>
                    <Text style={styles.codeText}>+92</Text>
                    <View style={{ flex: 1 }}>
                        <FloatingInput
                            placeholder='Phone Number'
                            keyboardType='phone-pad'
                            value={AddressData.phoneNumber}
                            onChangeText={(text) => setAddressData({
                        ...AddressData,
                        phoneNumber: text
                    })}
                            max={10}
                        />

                    </View>
                </View>
                <FloatingInput
                    placeholder='Address'
                    iconName='location-outline'
                    iconType='Ionicons'
                    value={AddressData.address1}
                    onChangeText={(text) => setAddressData({
                        ...AddressData,
                        address1: text
                    })}
                />
                <FloatingInput
                    placeholder='Apartment, suite, etc (optional)'

                    iconName='location-outline'
                    iconType='Ionicons'
                    value={AddressData.address2}
                    onChangeText={(text) => setAddressData({
                        ...AddressData,
                        address2: text
                    })}
                />
                {/* <View style={{ flexDirection: 'row', gap: 10 }}>
                <View style={{ flex: 1 }}>
                    <FloatingInput
                        placeholder='City'
                        iconName='person-outline'
                        iconType='Ionicons'
                    />
                </View>
                <View style={{ flex: 1 }}>
                    <FloatingInput
                        placeholder='Postal Code'
                        iconName='mail-outline'
                        iconType='Ionicons'
                    />
                </View>
            </View> */}
                <FloatingInput
                    placeholder='City'
                    iconName='location-outline'
                    iconType='Ionicons'
                    value={AddressData.city}
                    onChangeText={(text) => setAddressData({
                        ...AddressData,
                        city: text
                    })}
                />
                <FloatingInput
                    placeholder='Postal Code'
                    iconName='mail-outline'
                    iconType='Ionicons'
                    value={AddressData.postalCode}
                    onChangeText={(text) => setAddressData({
                        ...AddressData,
                        postalCode: text
                    })}
                    keyboardType='numeric'
                />
                <View style={styles.defaultContainer}>
                    <Checkbox
                        value={AddressData.isDefault}
                        onValueChange={(value) => {
                            setAddressData({
                                ...AddressData,
                                isDefault: value
                            })
                        }}
                        color={AddressData.isDefault ? '#2B4139' : undefined}
                    />
                    <Text style={styles.defaultText}>Set as default address</Text>
                </View>
            </View>

            {/* <View style={{ flexDirection: 'row', gap: 10 }}>
                <View style={{ flex: 1 }}>
                    <FloatingInput
                        placeholder='First Name'
                        iconName='person-outline'
                        iconType='Ionicons'
                    />
                </View>
                <View style={{ flex: 1 }}>
                    <FloatingInput
                        placeholder='Last Name'
                        iconName='person-outline'
                        iconType='Ionicons'
                    />
                </View>
            </View> */}


            <Button title='Save Address' onPress={handleAddressChange} />




        </SafeAreaView>
    );
};

export default AddAddress;
