import React, { Component, useState} from 'react';
import { View, Text, StyleSheet, ScrollView } from 'react-native';
import styles from './LoggedInStyle';
import { SafeAreaView } from 'react-native-safe-area-context';
import Header from '../../../components/home/HomeHeader';
import Greeting from '../../../components/profile/Greeting';
import Incomplete from '../../../components/profile/Incomplete';
import MoreInfoSection from '../../../components/profile/MoreInfoSection';
import HelpSection from '../../../components/profile/HelpSection';
import SignOut from '../../../components/profile/SignOutButton';
import { router } from 'expo-router';
import { useLogout } from '../../../hooks/useAuth';
import { useCustomer } from '../../../hooks/useCustomer';
import ConfirmatinDialog from '../../../components/profile/ConfirmationDialog';
const LoggedIn = () => {
    const logoutMutation = useLogout()
    const { customer, loading, error} = useCustomer();
    const [ModalShow, setModalShow] = useState(false)
    const email = customer?.emailAddress?.emailAddress
    const fName = customer?.firstName
    const lName = customer?.lastName
    const pNumber = customer?.phoneNumber
    
   

    const handleNavigate=()=>{
        router.push({
            pathname:'/profile/detailform/DetailForm',
            params:{
                fName: fName,
                lName: lName,
                pNumber: pNumber
            }
        })
    }
    return (
        <View style={styles.container}>
            {
                ModalShow && (
                    <ConfirmatinDialog
                    modalVisible={ModalShow}
                    msg='Are you sure you want to Sign Out ?'
                    txtButton='Sign Out'
                    onPressCancel={()=>setModalShow(!ModalShow)}
                    onPressDelete={()=>logoutMutation.mutate()}
                    />
                )
            }
            <ScrollView contentContainerStyle={styles.content}
                showsVerticalScrollIndicator={false}>
                <Greeting
                    email={email}
                    fName={fName}
                    lName={lName}
                    loading={loading}
                    onPress={handleNavigate}
                />
                {
                    (!loading&&!fName && !lName && !error) && (<Incomplete />)
                }
                <Incomplete/>
                <Text style={styles.heading}>Account</Text>
                <MoreInfoSection />
                <Text style={styles.heading}>Help</Text>
                <HelpSection />
                <SignOut onPress={() => setModalShow(true)} />

                {/* <SignOut onPress={() => logoutMutation.mutate()} /> */}
            </ScrollView>


        </View>
    );
};
export default LoggedIn;
