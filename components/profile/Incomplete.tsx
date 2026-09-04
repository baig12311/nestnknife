import { View, Text, StyleSheet, TouchableOpacity, TextComponent } from 'react-native';
import Colors from '../../constants/colors';
import { fonts } from '../../constants/typography';
import { router } from 'expo-router';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import Icon from '../Icon';

const Incomplete = () => {
    return (
        <View style={styles.container}>
           
            <Icon
                name='info-circle'
                type='AntDesign'
                size={wp(6)}
                color={Colors.accent}
            />
            <View style={styles.textContainer}>
                <Text style={styles.heading}>Complete your profile</Text>
                {/* <Text style={styles.sub}>Add you details to enjoy faster checkout, order tracking and more.</Text> */}
                <Text style={styles.sub}>Add more details for faster checkout.</Text>

            </View>
                <TouchableOpacity 
                style={styles.button} 
                activeOpacity={0.7}
                onPress={()=>router.push('/profile/detailform/DetailForm')}
                >
                    <Text style={styles.buttonText}>Add Details</Text>
                </TouchableOpacity>

        </View>
    );
};

// define your styles
const styles = StyleSheet.create({
    container: {
        borderWidth: 0.3,
        flexDirection: 'row',
        justifyContent: 'space-between',
        backgroundColor: '#FFF5E6',
        borderColor: Colors.secondary,
        padding:wp(2),
        marginBottom: hp(2),
        borderRadius: wp(2)
    },
    textContainer: {
        flex: 1,
        //width: wp(2),
        marginHorizontal: wp(2)
    },
    buttonView: {
        //flex: 1
    },
    button:{
        padding:wp(1.5),
        backgroundColor: Colors.primary,
        borderRadius: wp(2),
        height: hp(4),
        alignSelf: 'center'
    },
    buttonText:{
        color: Colors.background,
        fontSize: wp(3.2),
        fontFamily: fonts.medium
    },
    heading:{
        fontSize: wp(3.5),
        fontFamily: fonts.semibold,
        color:Colors.text
    },
    sub:{
        fontSize: wp(3.2),
        fontFamily: fonts.regular,
        color:Colors.secondary,
    }
});

//make this component available to the app
export default Incomplete;
