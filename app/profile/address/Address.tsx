import React, { Component, useState } from 'react';
import { View, Text, Image } from 'react-native';
import styles from './AddressStyle';
import { SafeAreaView } from 'react-native-safe-area-context';
import Button from '../../../components/common/Button';
import Header from '../../../components/profile/Header';
import { router } from 'expo-router';
import { useCustomer } from '../../../hooks/useCustomer';
import { FlatList } from 'react-native';
import { deleteCustomerAddress } from '../../../services/shopify/customer';
import ConfirmatinDialog from '../../../components/profile/ConfirmationDialog';
import AddressCard from '../../../components/profile/AddressCard';
import Loader from '../../../components/profile/Loader';
import Toast from 'react-native-toast-message';
import CustomEmptyComponent from '../../../components/common/CustomEmptyComponent';
import CustomToast from '../../../components/common/CustomToast';
const Address = () => {
    const { customer, loading, error,refetch } = useCustomer()
    const [DeleteDialogShow, setDeleteDialogShow] = useState(false)
    const [toastVisible, setToastVisible] = useState(false)
    const [type, setType] = useState<'success' | 'error'>('error')
    const [selectedAddress, setSelectedAddress] = useState<any>(null)
    //const [error, setError] = useState('')
    const [openMenuIndex, setOpenMenuIndex] = useState<number | null>(null);
    const customerAddresses = customer?.addresses?.edges
    const defaultAddressId = customer?.defaultAddress?.id
    console.log(customerAddresses)
    const handleEditAddress = (address: any) => {
        router.push({
            pathname: '/profile/addAddress/AddAddress',
            params: {
                addressId: address.id
            }
        })
    }

    const handleDeleteAddress = async () => {
        try {
            if (!selectedAddress?.id) {
                return;
            }

            const result = await deleteCustomerAddress(
                selectedAddress.id
            );

            await refetch()
            setDeleteDialogShow(false);
            setSelectedAddress(null);
            setType('success')
            setToastVisible(true)

        } catch (error: any) {
            //setError(error?.message)
            setType('error')
            setToastVisible(true)
            setDeleteDialogShow(false)
            //console.error('DELETE ADDRESS ERROR:', error);
        }
    };

    if (loading) {
        return (
            <Loader />
        )
    }
    if(error)
    {
        return(
            <SafeAreaView style={styles.container}>
                <Header title='Address' onPress={() => router.replace('/profile')} />
                <CustomEmptyComponent
                    illustration={require('../../../assets/illustrations/mainError.png')}
                    mainText="Something Went Wrong"
                    subText="We couldn't retrieve your saved addresses right now. Please try again."
                    buttonTitle="Try Again"
                    onPress={()=>refetch()}
                />

            </SafeAreaView>
        )        
    }
    const renderAddress = ({ item, index }: any) => {
        const isAddressDefault = item.node.id === defaultAddressId
        return (
            <AddressCard
                firstName={item.node.firstName}
                lastName={item.node.lastName}
                address1={item.node.address1}
                address2={item.node.address2}
                city={item.node.city}
                phoneNumber={item.node.phoneNumber}
                isDefault={isAddressDefault}
                onPressDelete={() => {
                    setDeleteDialogShow(!DeleteDialogShow)
                    setSelectedAddress(item.node)
                }}
                menuOpen={openMenuIndex === index}
                onMenuPress={() => {
                    setOpenMenuIndex(
                        openMenuIndex === index ? null : index
                    );
                }}
                onPressEdit={() => handleEditAddress(item.node)}

            />
        )

    }

    //console.log(customerAddresses)
    return (
        <SafeAreaView style={styles.container}>
            <CustomToast
                type={type}
                visible={toastVisible}
                messageTitle={type === 'success' ? 'Address Deleted' : 'Cannot delete address'}
                messageDescription={type === 'success' ? 'Address has been deleted successfully.' :
                    'Please set another address as default before deleting this one.'
                }
                onHide={() => setToastVisible(false)}
            />
            <Header title='Address' onPress={() => router.replace('/profile')} />
            {
                DeleteDialogShow && (
                    <ConfirmatinDialog
                        modalVisible={DeleteDialogShow}
                        title='Delete Address?'
                        msg='Are you sure you want to delete this address? This action cannot be undone.'
                        txtButton='Delete'
                        onPressCancel={() => setDeleteDialogShow(!DeleteDialogShow)}
                        onPressDelete={handleDeleteAddress}
                    />
                )
            }
            <FlatList
                data={customerAddresses}
                renderItem={renderAddress}
                showsVerticalScrollIndicator={false}
                contentContainerStyle={styles.flatlist}
                ListEmptyComponent={<CustomEmptyComponent
                    illustration={require('../../../assets/illustrations/address.png')}
                    mainText='No Address Yet'
                    subText='Add your delivery address to make checkout faster and easier.'
                    buttonTitle='Add Address'
                    onPress={() => router.push('/profile/addAddress/AddAddress')}

                />}
            />


            {customerAddresses && (<Button
                title={customerAddresses ? 'Add New Address' : 'Add Address'}
                onPress={() => router.push('/profile/addAddress/AddAddress')}
            />)}


        </SafeAreaView>

    );
};


export default Address;
