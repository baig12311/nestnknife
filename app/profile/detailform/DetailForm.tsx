import { useEffect, useState } from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import styles from './DetailFormStyle';
import Icon from '../../../components/Icon';
import Colors from '../../../constants/colors';
import Button from '../../../components/common/Button';
import { useLocalSearchParams } from 'expo-router';
import { widthPercentageToDP as wp } from 'react-native-responsive-screen';
import CustomToast from '../../../components/common/CustomToast';
import { SafeAreaView } from 'react-native-safe-area-context';
import UploadImage from '../../../components/profile/UploadImage';
import FloatingInput from '../../../components/profile/FloatingInput';
import Benefits from '../../../components/profile/Benefits';
import { useCustomer } from '../../../hooks/useCustomer';
import { router } from 'expo-router';
const DetailForm = () => {
    const { fName, lName } = useLocalSearchParams()
    const [firstName, setFirstName] = useState('')
    const [lastName, setLastName] = useState('')
    const [showToast, setShowToast] = useState(false)
    const [errorType, setErrorType] = useState<'success' | 'error'>('error')
    const [toastMessage, setToastMessage] = useState('')
    const [phoneNumber, setPhoneNumber] = useState('')
    //const [error, setError] = useState(false)
    const { updateCustomer, error} = useCustomer()
    useEffect(() => {
        if (fName || lName) {
            if (fName) {
                setFirstName(fName as string);
            }

            if (lName) {
                setLastName(lName as string);
            }
        }
    }, [])

    const handleUpdate = async () => {
    if (!firstName || !lastName) {
        setErrorType('error');
        setToastMessage('Please fill in all details.');
        setShowToast(true);
        return;
    }

    try {
        await updateCustomer({
            firstName,
            lastName,
        });

        setErrorType('success');
        setToastMessage(
            'Your profile details have been updated successfully.'
        );
        setShowToast(true);
        setTimeout(()=>{
            router.replace('/profile')
        }, 3100)

    } catch (error: any) {
        console.error('PROFILE UPDATE ERROR:', error);

        setErrorType('error');
        setToastMessage(
            error?.message ??
            'Unable to update your profile. Please try again.'
        );
        setShowToast(true);
    }
};
    return (
        <SafeAreaView style={styles.container}>
            <CustomToast
            type={errorType}
            visible={showToast}
            messageTitle={errorType === 'success' ? 'Profile Updated' : 'Something went wrong'}
            messageDescription={toastMessage}
            onHide={()=>setShowToast(false)}
            />
            <View style={styles.iconContainer}>
                <TouchableOpacity onPress={() => router.replace('/profile')} style={{ marginRight: wp(4) }} activeOpacity={0.7}>
                    <Icon name="arrow-back" type='MaterialIcons' size={wp(6)} color={Colors.text} />
                </TouchableOpacity>



                <Text style={styles.title}>Complete Profile</Text>

            </View>

            <UploadImage />
            <Text style={styles.title}>Complete Your Profile</Text>
            <Text style={styles.subTitle}>Add few details to personalize your experience</Text>
            <FloatingInput
                placeholder='First Name'
                value={firstName}
                onChangeText={setFirstName}
                iconName='person-outline'
                iconType='Ionicons'
            />
            <FloatingInput
                placeholder='Last Name'
                value={lastName}
                onChangeText={setLastName}
                iconName='person-outline'
                iconType='Ionicons'
            />


            {
                error && (<Text>Please fill in all details</Text>)
            }

            <Benefits />
            <Button title='Save' onPress={handleUpdate} />


        </SafeAreaView>
    );
};


export default DetailForm;
