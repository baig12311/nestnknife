import { useEffect, useState, useRef } from 'react';
import { View, Text, TouchableOpacity, Alert } from 'react-native';
import styles from './DetailFormStyle';
import Icon from '../../../components/Icon';
import Colors from '../../../constants/colors';
import Button from '../../../components/common/Button';
import { useLocalSearchParams } from 'expo-router';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { widthPercentageToDP as wp } from 'react-native-responsive-screen';
import CustomToast from '../../../components/common/CustomToast';
import { SafeAreaView } from 'react-native-safe-area-context';
import UploadImage from '../../../components/profile/UploadImage';
import FloatingInput from '../../../components/profile/FloatingInput';
import { heightPercentageToDP as hp } from 'react-native-responsive-screen';
import Benefits from '../../../components/profile/Benefits';
import * as ImagePicker from 'expo-image-picker';
import { useCustomer } from '../../../hooks/useCustomer';
import TestRipple from '../../../components/common/RippleButton';
import BottomSheet from '@gorhom/bottom-sheet';
import { router } from 'expo-router';
import ImageSheet from '../../../components/profile/uploadImage/ImageSheet';
const DetailForm = () => {
    const { fName, lName, pNumber } = useLocalSearchParams()
    console.log(fName, lName, pNumber)
    const sheetRef = useRef<BottomSheet>(null)
    const [showSheet, setShowSheet] = useState(false)
    const [firstName, setFirstName] = useState('')
    const [lastName, setLastName] = useState('')
    const [showToast, setShowToast] = useState(false)
    const [errorType, setErrorType] = useState<'success' | 'error'>('error')
    const [toastMessage, setToastMessage] = useState('')
    const [phoneNumber, setPhoneNumber] = useState('')
    const { updateCustomer, error } = useCustomer()
    const [image, setImage] = useState<string | null>(null)
    const [exists, setExists] = useState(false)
    const [edit, setEdit] = useState(false)

    // loading image from async storage
    useEffect(() => {
        const loadImage = async () => {
            const savedImage = await AsyncStorage.getItem('profileImage');

            if (savedImage) {
                setImage(savedImage);
                setEdit(true)
            }
        };
        loadImage();
    }, []);

    // checking if info already exists
    useEffect(() => {
        if (fName || lName || pNumber) {
            if (fName) {
                setFirstName(fName as string);
            }

            if (lName) {
                setLastName(lName as string);
            }
            if (pNumber) {
                setPhoneNumber(pNumber as string)
            }
            setExists(true)
        }
    }, [])

    //taking photo from camera
    const takePhoto = async () => {
        const permissionResult = await ImagePicker.requestCameraPermissionsAsync()

        if (!permissionResult.granted) {
            Alert.alert('Permission Required', 'Permission to access camera is required')
            return;
        }

        let result = await ImagePicker.launchCameraAsync({
            allowsEditing: true,
            aspect: [1, 1],
            quality: 1,
        });

        if (!result.canceled) {
            const imageUri = result.assets[0].uri;



            setImage(imageUri);
            setEdit(true)
            await AsyncStorage.setItem(
                'profileImage',
                imageUri
            );
        }
    }

    // choosing photo from gallery
    const pickFromLibrary = async () => {
        const permissionResult = await ImagePicker.requestMediaLibraryPermissionsAsync()

        if (!permissionResult.granted) {
            Alert.alert('Permission Required', 'Permission to access media library is required')
            return;
        }

        let result = await ImagePicker.launchImageLibraryAsync({
            mediaTypes: ['images'],
            allowsEditing: true,
            aspect: [1, 1],
            quality: 1,
        });

        if (!result.canceled) {
            const imageUri = result.assets[0].uri;

            console.log('SELECTED IMAGE:', imageUri);

            setImage(imageUri);
            setEdit(true)
            await AsyncStorage.setItem(
                'profileImage',
                imageUri
            );
        }

    }

    //removing photo
    const removeImage = async () => {
        try {
            await AsyncStorage.removeItem('profileImage');
            setImage(null);
            setEdit(false);
        } catch (error) {
            console.log('REMOVE IMAGE ERROR:', error);
        }
    };

    // image action
    const handleImageAction = async (action: 'camera' | 'gallery' | 'remove') => {
        sheetRef.current?.close()
        if (action === 'camera') {
            await takePhoto()
        }
        else if (action === 'gallery') {
            await pickFromLibrary()
        }
        else if (action === 'remove') {
            await removeImage()
        }
    }
    // upading and adding customer info 
    const handleUpdate = async () => {
        if (!firstName || !lastName ) {
            setErrorType('error');
            setToastMessage('Please fill in all details.');
            setShowToast(true);
            return;
        }

        try {
            await updateCustomer({
                firstName,
                lastName,
                phoneNumber
            });
            console.log(phoneNumber)

            setErrorType('success');
            setToastMessage(
                'Your profile details have been updated successfully.'
            );
            setShowToast(true);
            setTimeout(() => {
                router.replace('/profile')
            }, 3100)

        } catch (error: any) {
            console.error('PROFILE UPDATE ERROR:', error);

            setErrorType('error');
            setToastMessage(
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
                onHide={() => setShowToast(false)}
            />
            <View style={styles.iconContainer}>
                <TouchableOpacity onPress={() => router.replace('/profile')} style={{ marginRight: wp(4) }} activeOpacity={0.7}>
                    <Icon name="arrow-back" type='MaterialIcons' size={wp(6)} color={Colors.text} />
                </TouchableOpacity>



                <Text style={styles.title}>{exists ? 'Edit Profile' : 'Complete Profile'}</Text>

            </View>
            <UploadImage
                image={image}
                isEdit={edit}
                onPress={() => {
                    setShowSheet(true)
                    sheetRef.current?.snapToIndex(0)
                }} />
            <Text style={[
                styles.title,
                exists && {marginBottom:hp(2)}
                ]}>
                    {exists ? 'Edit Your Profile' : 'Complete Your Profile'}
                </Text>
            {
                !exists && (
                                <Text 
                                style={styles.subTitle}>Add few details to personalize your experience</Text>

                )
            }
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

            {/* <View style={styles.numberInput}>
                    <Text style={styles.codeText}>+92</Text>
                    <View style={{ flex: 1 }}>
                        <FloatingInput
                            placeholder='Phone Number'
                            keyboardType='phone-pad'
                            value={phoneNumber}
                            onChangeText={setPhoneNumber}
                            max={10}
                        />

                    </View>
                </View> */}

            {
                error && (<Text>Please fill in all details</Text>)
            }

            <Benefits />
            <Button title='Save' onPress={handleUpdate} />
            {
                showSheet && (
                    <ImageSheet
                        bottomSheetRef={sheetRef}
                        isEdit={edit}
                        onAction={handleImageAction}
                    />
                )
            }


        </SafeAreaView>
    );
};


export default DetailForm;
