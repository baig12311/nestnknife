import React, { Component, useState} from 'react';
import { View, Text, Image } from 'react-native';
import styles from './AddressStyle';
import { SafeAreaView } from 'react-native-safe-area-context';
import Button from '../../../components/common/Button';
import Header from '../../../components/profile/Header';
import { router } from 'expo-router';
import { useCustomer } from '../../../hooks/useCustomer';
import { FlatList } from 'react-native';
import ConfirmatinDialog from '../../../components/profile/ConfirmationDialog';
import AddressCard from '../../../components/profile/AddressCard';
import Loader from '../../../components/profile/Loader';
const Address = () => {
    const { customer, loading } = useCustomer()
    const [DeleteDialogShow, setDeleteDialogShow] = useState(false)
    const [openMenuIndex, setOpenMenuIndex] = useState<number | null>(null);
    const customerAddresses = customer?.addresses?.edges
    const handleEditAddress=(address:any)=>{
        router.push({
            pathname: '/profile/addAddress/AddAddress',
            params:{
                addressId: address.id
            }
        })
    }

    if (loading) {
        return (
            <Loader/>
        )
    }
    const renderAddress =({item, index}:any)=>{
        return(
            <AddressCard
        firstName={item.node.firstName}
        lastName={item.node.lastName}
        address1={item.node.address1}
        address2={item.node.address2}
        phoneNumber={item.node.phoneNumber}
        onPressDelete={()=>setDeleteDialogShow(!DeleteDialogShow)}
        menuOpen={openMenuIndex === index}

            onMenuPress={() => {
                setOpenMenuIndex(
                    openMenuIndex === index ? null : index
                );
            }}
        onPressEdit={()=>handleEditAddress(item.node)}

        />
        )
        
    }

    //console.log(customerAddresses)
    return (
        <SafeAreaView style={styles.container}>
            <Header title='Address' />
            {
                DeleteDialogShow && (
                    <ConfirmatinDialog
                    modalVisible={DeleteDialogShow}
                    msg='Are you sure you want to permanently delete this address?'
                    txtButton='Delete'
                    onPressCancel={()=>setDeleteDialogShow(!DeleteDialogShow)}
                    //onPressDelete={}
                    />
                )
            }
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
