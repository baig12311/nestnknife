//import liraries
import { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import CustomSectionRow from './CustomSectionrow';
import Colors from '../../constants/colors';
import { fonts } from '../../constants/typography';
import Icon from '../Icon';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import { ShadowCard } from '../common/ShadowCard';
const PersonalInfoSection = () => {
    const[isOpen, setIsOpen]=useState(false)
    return (
        <ShadowCard style={styles.container} containerStyle={styles.containerStyle}>
            <View style={styles.contentContainer}>
                <View style={[styles.personalContainer, isOpen && {borderBottomWidth: 0.3, marginBottom:hp(1.5)}]}>
                    <View style={styles.icon}>
                        <Icon name='person-outline' type='Ionicons' size={wp(6.5)} color={Colors.text} />
                    </View>

                    <View style={styles.buttonTextContainer}>
                        <Text style={styles.mainText}>
                            Personal Information
                        </Text>
                        <Text style={styles.subText}>
                            Add your name and phone number
                        </Text>
                    </View>
                    <View>
                        <Text style={styles.incompleteText}>
                        Incomplete
                    </Text>
                    <TouchableOpacity 
                    style={styles.iconView} 
                    activeOpacity={0.7}
                    onPress={()=>setIsOpen(!isOpen)}
                    >
<Icon 
                    name={isOpen?'chevron-small-down':'chevron-small-right'}
                    type='Entypo'
                    color={Colors.text}
                    size={wp(7)}
                    />
                    </TouchableOpacity>
                    
                    </View>
                    
                </View>
                {
                    isOpen && (
                        <View style={styles.sectionContainer}>
                    <CustomSectionRow
                        mainText='First Name'
                        status='Not added'
                        borderBottomWidth={0.3}

                        paddingVertical={hp(0.5)}
                    />
                    <CustomSectionRow
                        mainText='Last Name'
                        status='Not added'
                        borderBottomWidth={0.3}

                        paddingVertical={hp(0.5)}
                    />
                    <CustomSectionRow
                        mainText='Phone Number'
                        status='Not added'
                        paddingVertical={hp(0.5)}
                    />
                </View>
                    )
                }
                



            </View>

        </ShadowCard >

    );
};


const styles = StyleSheet.create({
    container: {
        //borderWidth: 1,
        borderRadius: wp(2),
        marginBottom: hp(2)
    },
    containerStyle: {
        width: '100%'
    },
    contentContainer: {
        padding: wp(3)
    },
    personalContainer: {
        //borderWidth: 1,
        flexDirection: 'row',
        //borderBottomWidth: 0.3,
        borderColor: Colors.secondary,
        paddingBottom: hp(0.5),
        //marginBottom: hp(1.5)
        //alignItems: 'center'
    },
    sectionContainer: {
        paddingLeft: wp(16)
    },
    buttonTextContainer: {
        flex: 1
    },
    icon: {
        width: wp(12),
        height: wp(12),
        borderRadius: wp(6),
        backgroundColor: Colors.background,

        justifyContent: 'center',
        alignItems: 'center',
        marginRight: wp(4)
    },
    mainText: {
        fontFamily: fonts.semibold,
        color: Colors.text,
        fontSize: wp(4)
    },
    subText: {
        fontFamily: fonts.medium,
        color: Colors.text,
        fontSize: wp(3.2)
    },
    incompleteText: {
        paddingHorizontal: wp(1.5),
        height: hp(3),
        paddingVertical: wp(0.5),
        elevation: 2,
        backgroundColor: '#FDE8E5',
        color: '#C84037',
        borderRadius: wp(2),
        fontFamily: fonts.medium,
        fontSize: wp(3.2)
    },
    iconView:{
        alignItems: 'flex-end'
    }
});

//make this component available to the app
export default PersonalInfoSection;
