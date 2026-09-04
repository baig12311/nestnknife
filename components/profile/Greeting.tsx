//import liraries
import React, { Component } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import Colors from '../../constants/colors';
import { fonts } from '../../constants/typography';
import Icon from '../Icon';
import SkeletonBox from '../skeleton/SkeletonBox';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
interface Props{
    fName?:string
    lName?:string
    email?:string
    loading?:boolean
}
const Greeting:React.FC<Props> = ({fName, lName, email, loading}) => {
    return (
        <View style={styles.container}>
            

            <View style={styles.icon}>
                <Icon 
                name='account' 
                type='MaterialCommunityIcons' 
                size={wp(15)} 
                color={Colors.text} 
                />
            </View>
            <View style={styles.textContainer}>

                {
                    loading?(
                        <View>
                            <SkeletonBox
                        width={wp(30)}
                        height={hp(2)}
                        borderRadius={wp(2)}
                        style={{marginBottom:hp(0.5)}}
                        />
                        <SkeletonBox
                        width={wp(35)}
                        height={hp(1.5)}
                        borderRadius={wp(2)}
                        style={{marginBottom:hp(0.5)}}
                        />
                        </View>
                        
                    ):(
                        <View>
                            <Text style={styles.textName}>{fName} {lName}</Text>
                <Text style={styles.textEmail}>{email}</Text>
                        </View>
                        
                    )
                }



                
                
                
                <View style={styles.verifyBadge}>
                    <Icon
                    name='check-circle'
                    type='Feather'
                    size={wp(4)}
                    color={Colors.secondary}
                    />
                    <Text style={styles.verifyText}>Verified</Text>
                </View>
            </View>

        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom:hp(2)
    },
    textName: {
        fontFamily: fonts.semibold,
        fontSize: wp(4.5),
        color: Colors.text,
    },
    textEmail: {
        fontFamily: fonts.regular,
        color: Colors.secondary,
        fontSize: wp(3.3),
        marginBottom: hp(0.5),
        //width: wp(60),
    },
    textContainer: {
        justifyContent: 'space-between',
        flex:1
    },
    icon: {
        width: wp(20),
        height: wp(20),
        borderRadius: wp(10),
        marginRight: wp(5),
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'white'
    },
    verifyBadge:{
        borderWidth:0.2,
        borderColor: Colors.secondary,
        width: wp(22),
        borderRadius: wp(50),
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        paddingVertical: hp(0.5),
        backgroundColor: '#E2F1E5',
        //paddingHorizontal: wp(2),
    },
    verifyText: {
        fontFamily: fonts.medium,
        color: Colors.secondary,
        fontSize: wp(3),
        marginLeft: wp(2),
    }
});

//make this component available to the app
export default Greeting;
