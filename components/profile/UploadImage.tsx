import { useState } from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity, Alert } from 'react-native';
import Icon from '../Icon';
import Colors from '../../constants/colors';
import { fonts } from '../../constants/typography';
import * as ImagePicker from 'expo-image-picker';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';

const UploadImage = () => {
    const [image, setImage] = useState<string | null>(null)

    // Gallery se select karna
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
            setImage(result.assets[0].uri);
        }
    }

    // Camera se photo lena
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
            setImage(result.assets[0].uri);
        }
    }

    // User se pehle poochna — Camera ya Gallery
    const uploadImage = () => {
        Alert.alert(
            'Upload Photo',
            'Choose an option',
            [
                { text: 'Take Photo', onPress: takePhoto },
                { text: 'Choose from Library', onPress: pickFromLibrary },
                { text: 'Cancel', style: 'cancel' },
            ],
            { cancelable: true }
        );
    }

    return (
        <View style={styles.container}>
            <View style={styles.imageWrapper}>
                {image && (
                    <Image
                        style={styles.image}
                        source={{ uri: image }}
                    />
                )}
            </View>

            <TouchableOpacity
                style={styles.button}
                activeOpacity={0.7}
                onPress={uploadImage}
            >
                <Icon
                    name='camera-outline'
                    type='Ionicons'
                    color={Colors.background}
                    size={wp(5)}
                />
            </TouchableOpacity>
            
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        width: wp(25),
        height: wp(25),
        alignSelf: 'center',
        position: 'relative',
        marginBottom: hp(2)
    },
    imageWrapper: {
        width: '100%',
        height: '100%',
        borderRadius: wp(13),
        backgroundColor: 'white',
        borderWidth: 0.3,
        borderColor: Colors.secondary,
        overflow: 'hidden',
    },
    image: {
        width: '100%',
        height: '100%',
    },
    button: {
        width: wp(8),
        height: wp(8),
        borderRadius: wp(5),
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: Colors.primary,
        position: 'absolute',
        right: '2%',
        bottom: -5,
        zIndex: 2,
    }
});

export default UploadImage;