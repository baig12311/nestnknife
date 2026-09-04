import { useState } from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import styles from './DetailFormStyle';
import Icon from '../../../components/Icon';
import Colors from '../../../constants/colors';
import Button from '../../../components/common/Button';
import { widthPercentageToDP as wp } from 'react-native-responsive-screen';
import { SafeAreaView } from 'react-native-safe-area-context';
import UploadImage from '../../../components/profile/UploadImage';
import FloatingInput from '../../../components/profile/FloatingInput';
import Benefits from '../../../components/profile/Benefits';
import { useCustomer } from '../../../hooks/useCustomer';
import { router } from 'expo-router';
const DetailForm = () => {
    const [firstName, setFirstName] = useState('')
    const [lastName, setLastName] = useState('')
    const [phoneNumber, setPhoneNumber]=useState('')
    const [error, setError] = useState(false)
    const{updateCustomer}=useCustomer()
    const handleUpdate = () => {

        // const fullNumber='+92' + phoneNumber
        // console.log('Phone Number', fullNumber)
        if (firstName && lastName) {
            if(phoneNumber.length===10)
            {
                updateCustomer({
                firstName: firstName,
                lastName: lastName,
                phoneNumber: phoneNumber

            })
            }
            else{
                console.log('Phone number should be 10 digits.')
            }
            
            console.log('dataupdated')
        }
        else {
            setError(true)
        }

    }
    return (
        <SafeAreaView style={styles.container}>
            <View style={styles.iconContainer}>
                <TouchableOpacity onPress={() => router.back()} style={{ marginRight: wp(4) }} activeOpacity={0.7}>
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
            />
            <FloatingInput
                placeholder='Last Name'
                value={lastName}
                onChangeText={setLastName}
            />
            
            <View style={styles.numberInput}>
                <Text style={styles.codeText}>+92</Text>
                <View style={{flex:1}}>
                                    <FloatingInput 
                                    placeholder='Phone Number'
                                    keyboardType='phone-pad'
                                    value={phoneNumber}
                                    onChangeText={setPhoneNumber}
                                    max={10}
                                    />

                </View>
            </View>
            {
                error && (<Text>Plaese fill in all details</Text>)
            }
            
            <Benefits />
            <Button title='Save & Continue' onPress={handleUpdate} />


        </SafeAreaView>
    );
};


export default DetailForm;
