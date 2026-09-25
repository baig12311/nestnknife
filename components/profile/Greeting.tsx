//import liraries
import React, { Component, useEffect, useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Image } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Colors from '../../constants/colors';
import { fonts } from '../../constants/typography';
import Icon from '../Icon';
import SkeletonBox from '../skeleton/SkeletonBox';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
interface Props {
    fName?: string
    lName?: string
    email?: string
    loading?: boolean
    onPress?: () => void
}
const Greeting: React.FC<Props> = ({ fName, lName, email, loading, onPress }) => {
    const [profileImage, setProfileImage] = useState<string | null>(null)
    const loadImage = async () => {
        const savedImage = await AsyncStorage.getItem('profileImage')
        setProfileImage(savedImage)
    }
    useEffect(() => {
        loadImage()
    }, [])
    return (
        <View style={styles.container}>


            <View style={styles.icon}>
                {
                    profileImage ? (
                        <Image
                            source={{ uri: profileImage }}
                            style={styles.image}
                        />
                    ) : (
                        <Icon
                            name='account'
                            type='MaterialCommunityIcons'
                            size={wp(15)}
                            color={Colors.secondary}
                        />
                    )
                }

            </View>
            <View style={styles.textContainer}>

                {
                    loading ? (
                        <View>
                            <SkeletonBox
                                width={wp(30)}
                                height={hp(2)}
                                borderRadius={wp(2)}
                                style={{ marginBottom: hp(0.5) }}
                            />
                            <SkeletonBox
                                width={wp(35)}
                                height={hp(1.5)}
                                borderRadius={wp(2)}
                                style={{ marginBottom: hp(0.5) }}
                            />
                        </View>

                    ) : (
                        <View>
                            <Text style={styles.textName}>{fName} {lName}</Text>
                            <Text style={styles.textEmail}>{email}</Text>
                        </View>

                    )
                }
                <View style={styles.bottomView}>
                    <View style={styles.verifyBadge}>
                        <Icon
                            name='check-circle'
                            type='Feather'
                            size={wp(4)}
                            color={Colors.secondary}
                        />

                        <Text style={styles.verifyText}>Verified</Text>
                    </View>
                    {
                        (fName || lName) && (
                            <TouchableOpacity
                                style={styles.buttonEdit}
                                activeOpacity={0.7}
                                onPress={onPress}
                            >
                                <Text style={styles.buttonText}>Edit</Text>
                            </TouchableOpacity>

                        )
                    }

                </View>

            </View>

        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: hp(2),
    },
    textName: {
        fontFamily: fonts.semibold,
        fontSize: wp(4),
        color: Colors.text,
    },
    textEmail: {
        fontFamily: fonts.regular,
        color: Colors.secondary,
        fontSize: wp(3.2),
        marginBottom: hp(0.5),
        //width: wp(60),
    },
    textContainer: {
        justifyContent: 'space-between',
        flex: 1
    },
    icon: {
        width: wp(20),
        height: wp(20),
        borderRadius: wp(10),
        marginRight: wp(5),
        justifyContent: 'center',
        alignItems: 'center',
        borderWidth: 0.3,
        borderColor: Colors.secondary,
        overflow: 'hidden'
    },
    verifyBadge: {
        borderWidth: 0.3,
        borderColor: Colors.secondary,

        width: wp(22),
        borderRadius: wp(50),
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        paddingVertical: hp(0.5),
        backgroundColor: Colors.secondaryBackground
        //paddingHorizontal: wp(2),
    },
    verifyText: {
        fontFamily: fonts.medium,
        color: Colors.secondary,
        fontSize: wp(3),
        marginLeft: wp(2),
    },
    bottomView: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center'
    },
    buttonEdit: {
        borderWidth: 0.3,
        paddingHorizontal: wp(4),
        paddingVertical: wp(1),
        borderColor: Colors.secondary,
        borderRadius: wp(2)
    },
    buttonText: {
        fontFamily: fonts.medium,
        fontSize: wp(3.2),
        color: Colors.primary
    },
    image: {
        width: wp(20),
        height: wp(20),
        borderRadius: wp(10),
    }
});

//make this component available to the app
export default Greeting;
