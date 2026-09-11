import React, { Component, useState } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import styles from './AddAddressStyle';
import { SafeAreaView } from 'react-native-safe-area-context';
import Header from '../../../components/profile/Header';
import FloatingInput from '../../../components/profile/FloatingInput';
import { Checkbox } from 'expo-checkbox';
import Button
    from '../../../components/common/Button';
const AddAddress = () => {
    const [isDefault, setIsDefault] = useState(false)
    return (
        <SafeAreaView style={styles.container}>
            <Header title='Add New Address' />
            <View style={styles.fieldsContainer}>
                <FloatingInput
                    placeholder='First Name'
                    iconName='person-outline'
                    iconType='Ionicons'
                />
                <FloatingInput
                    placeholder='Last Name'
                    iconName='person-outline'
                    iconType='Ionicons'
                />
                <FloatingInput
                    placeholder='Address'
                    iconName='location-outline'
                    iconType='Ionicons'
                />
                <FloatingInput
                    placeholder='Apartment, suite, etc (optional)'

                    iconName='location-outline'
                    iconType='Ionicons'
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
                />
                <FloatingInput
                    placeholder='Postal Code'
                    iconName='mail-outline'
                    iconType='Ionicons'
                />
                <View style={styles.defaultContainer}>
                    <Checkbox
                        value={isDefault}
                        onValueChange={setIsDefault}
                        color={isDefault ? '#2B4139' : undefined}
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


            <Button title='Save Address' />




        </SafeAreaView>
    );
};

export default AddAddress;
