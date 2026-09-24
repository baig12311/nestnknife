import { useState, useEffect, useRef} from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity, Alert } from 'react-native';
import Icon from '../Icon';
import Colors from '../../constants/colors';
import AsyncStorage from '@react-native-async-storage/async-storage';

import { fonts } from '../../constants/typography';
import * as ImagePicker from 'expo-image-picker';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import ImageSheet from './uploadImage/ImageSheet';
import BottomSheet from '@gorhom/bottom-sheet';
interface Props{
  onPress?:()=>void
  isEdit?:boolean,
  image: any
}
const UploadImage:React.FC<Props> = ({onPress, isEdit, image}) => {
//     const [image, setImage] = useState<string | null>(null)
//     const [edit, setEdit] = useState(false)
//     useEffect(() => {
//     const loadImage = async () => {
//         const savedImage = await AsyncStorage.getItem('profileImage');

//         if (savedImage) {
//             setImage(savedImage);
//             setEdit(true)
//         }
//     };

//     loadImage();
// }, []);
    // Gallery se select karna
//     const pickFromLibrary = async () => {
//         const permissionResult = await ImagePicker.requestMediaLibraryPermissionsAsync()

//         if (!permissionResult.granted) {
//             Alert.alert('Permission Required', 'Permission to access media library is required')
//             return;
//         }

//         let result = await ImagePicker.launchImageLibraryAsync({
//             mediaTypes: ['images'],
//             allowsEditing: true,
//             aspect: [1, 1],
//             quality: 1,
//         });

//        if (!result.canceled) {
//     const imageUri = result.assets[0].uri;

//     console.log('SELECTED IMAGE:', imageUri);

//     setImage(imageUri);

//     await AsyncStorage.setItem(
//         'profileImage',
//         imageUri
//     );
// }
         
//     }

//     const removeImage = async () => {
//   try {
//     await AsyncStorage.removeItem('profileImage');
//     setImage(null);
//     setEdit(false);
//   } catch (error) {
//     console.log('REMOVE IMAGE ERROR:', error);
//   }
// };

//     // Camera se photo lena
//     const takePhoto = async () => {
//         const permissionResult = await ImagePicker.requestCameraPermissionsAsync()

//         if (!permissionResult.granted) {
//             Alert.alert('Permission Required', 'Permission to access camera is required')
//             return;
//         }

//         let result = await ImagePicker.launchCameraAsync({
//             allowsEditing: true,
//             aspect: [1, 1],
//             quality: 1,
//         });

//         if (!result.canceled) {
//     const imageUri = result.assets[0].uri;



//     setImage(imageUri);

//     await AsyncStorage.setItem(
//         'profileImage',
//         imageUri
//     );
// }
//     }

    // User se pehle poochna — Camera ya Gallery
//     const uploadImage = () => {
//   if (edit) {
//     Alert.alert(
//       'Profile Photo',
//       'Choose an option',
//       [
//         {
//           text: 'Change Photo',
//           onPress: () => {
//             Alert.alert(
//               'Change Photo',
//               'Choose an option',
//               [
//                 {
//                   text: 'Take Photo',
//                   onPress: takePhoto,
//                 },
//                 {
//                   text: 'Choose from Library',
//                   onPress: pickFromLibrary,
//                 },
//                 {
//                   text: 'Cancel',
//                   style: 'cancel',
//                 },
//               ],
//               { cancelable: true }
//             );
//           },
//         },
//         {
//           text: 'Remove Photo',
//           onPress: removeImage,
//           style: 'destructive',
//         },
//         {
//           text: 'Cancel',
//           style: 'cancel',
//         },
//       ],
//       { cancelable: true }
//     );
//   } else {
//     Alert.alert(
//       'Upload Photo',
//       'Choose an option',
//       [
//         {
//           text: 'Take Photo',
//           onPress: takePhoto,
//         },
//         {
//           text: 'Choose from Library',
//           onPress: pickFromLibrary,
//         },
//         {
//           text: 'Cancel',
//           style: 'cancel',
//         },
//       ],
//       { cancelable: true }
//     );
//   }
// };

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
                onPress={onPress}
            >
                <Icon
                    name={isEdit ? 'image-edit-outline' : 'camera-outline'}
                    type={isEdit ? 'MaterialDesignIcons' : 'Ionicons'}
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