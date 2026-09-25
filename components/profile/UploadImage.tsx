import { useState, useEffect, useRef } from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity, Alert } from 'react-native';
import Icon from '../Icon';
import Colors from '../../constants/colors';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
interface Props {
    onPress?: () => void
    isEdit?: boolean,
    image: any
}
const UploadImage: React.FC<Props> = ({ onPress, isEdit, image }) => {
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