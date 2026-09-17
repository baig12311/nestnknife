import React, { Component, useEffect, useState } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import styles from './AddAddressStyle';
import { SafeAreaView } from 'react-native-safe-area-context';
import { router } from 'expo-router';
import Header from '../../../components/profile/Header';
import FloatingInput from '../../../components/profile/FloatingInput';
import { Checkbox } from 'expo-checkbox';
import { createCustomerAddress, updateCustomerAddress } from '../../../services/shopify/customer';
import { useLocalSearchParams } from 'expo-router';
import Button from '../../../components/common/Button';
import { useCustomer } from '../../../hooks/useCustomer';
import Loader from '../../../components/profile/Loader';
import CustomToast from '../../../components/common/CustomToast';
const AddAddress = () => {
    const { addressId } = useLocalSearchParams<{ addressId: string }>();
    const [toastVisible, setToastVisible] = useState(false)
    const [type, setType] = useState<'success' | 'error'>('error')
    const [toastMessage, setToastMessage] = useState('')


    console.log('Selected Addres ID', addressId)
    const { customer, loading } = useCustomer()
    const selectedAddress = customer?.addresses?.edges.find(
        (item: any) => item.node.id === addressId
    );
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


    // Setting Existing Data in Fields
    const setSelectedAddress = () => {
        if (selectedAddress) {
            const addressNode = selectedAddress.node
            const isAddressDefault = addressNode.id === customer?.defaultAddress?.id
            setAddressData({
                firstName: addressNode.firstName ?? '',
                lastName: addressNode.lastName ?? '',
                phoneNumber: addressNode.phoneNumber?.replace('+92', '') ?? '',
                address1: addressNode.address1 ?? '',
                address2: addressNode.address2 ?? '',
                city: addressNode.city ?? '',
                postalCode: addressNode.zip ?? '',
                //isDefault: addressNode.isDefault ?? false,
                isDefault: isAddressDefault
            });
        }
    }
    useEffect(() => {

        setSelectedAddress()
    }, [selectedAddress])


    // Adding New Address , Updating Address
    const handleAddressChange = async () => {
        try {
            const fullNumber = '+92' + AddressData.phoneNumber;

            if (addressId) {
                await updateCustomerAddress({
                    addressId,
                    firstName: AddressData.firstName,
                    lastName: AddressData.lastName,
                    phoneNumber: fullNumber,
                    address1: AddressData.address1,
                    address2: AddressData.address2,
                    city: AddressData.city,
                    territoryCode: 'PK',
                    zip: AddressData.postalCode,
                    defaultAddress: AddressData.isDefault,
                });

                setType('success');
                setToastMessage('Address has been updated successfully.');
                setToastVisible(true);

            } else {
                await createCustomerAddress({
                    firstName: AddressData.firstName,
                    lastName: AddressData.lastName,
                    phoneNumber: fullNumber,
                    address1: AddressData.address1,
                    address2: AddressData.address2,
                    city: AddressData.city,
                    territoryCode: 'PK',
                    zip: AddressData.postalCode,
                    defaultAddress: AddressData.isDefault,
                });

                setType('success');
                setToastMessage('New address has been added successfully.');
                setToastVisible(true);
            }

            setTimeout(() => {
                router.back();
            }, 3200);

        } catch (error: any) {
            console.log('Address Error:', error);

            setType('error');
            setToastMessage(
                error?.message || 'Something went wrong. Please try again.'
            );
            setToastVisible(true);
        }
    };
    if (loading) {
        return (
            <Loader />
        )
    }
    return (
        <SafeAreaView style={styles.container}>
            <Header title={selectedAddress ? 'Edit Address' : 'Add New Address'} onPress={() => router.back()} />
            <CustomToast
                type={type}
                visible={toastVisible}
                messageTitle={
                    type === 'success'
                        ? addressId
                            ? 'Address Updated'
                            : 'Address Added'
                        : 'Unable to Save Address'
                }
                messageDescription={toastMessage}
                onHide={() => setToastVisible(false)}
            />
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
