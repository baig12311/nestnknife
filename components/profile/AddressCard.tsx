import { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import Colors from '../../constants/colors';
import { fonts } from '../../constants/typography';
import Icon from '../Icon';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
interface Props {
    firstName?: string
    lastName?: string
    phoneNumber?: string
    address1?: string
    address2?: string
    onPressEdit?: () => void
    onPressDelete?: () => void
}
interface rowProps {
    title?: string
    iconName: string
    iconType: string
}
const AddressCard: React.FC<Props> = ({ firstName, lastName, phoneNumber, address1, address2, onPressDelete,
    onPressEdit
}) => {
    const [showMenu, setShowMenu] = useState(false)
    return (
        <View style={styles.container}>
            <View style={styles.iconContainer}>
                <Icon
                    name='location'
                    type='Ionicons'
                    size={wp(7)}
                    color={Colors.primary}
                />
            </View>
            <View style={styles.contentContainer}>
                <Text style={styles.textName}>{firstName} {lastName}</Text>


                {
                    phoneNumber && (<Row
                        iconName='call-outline'
                        iconType='Ionicons'
                        title={phoneNumber}
                    />
                    )
                }
                <Row
                    iconName='location-outline'
                    iconType='Ionicons'
                    title={address1}
                />
            </View>
            <View>
                <TouchableOpacity
                    style={styles.menuButton}
                    activeOpacity={0.7}
                    onPress={() => setShowMenu(!showMenu)}
                >
                    <Icon
                        name='dots-three-vertical'
                        type='Entypo'
                        color={Colors.text}
                        size={wp(5)}
                    />

                </TouchableOpacity>
               
            </View>
             {
                    showMenu && (
                        <View style={styles.menu}>
                            <Row
                            iconName='edit'
                            iconType='AntDesign'
                            title='Edit'
                            />
                            <Row
                            iconName='trash-outline'
                            iconType='Ionicons'
                            title='Remove'
                            />
                        </View>
                    )
                }

        </View>

    );
};

const Row: React.FC<rowProps> = ({ title, iconName, iconType }) => {
    return (
        <View style={styles.rowContainer}>
            <Icon
                name={iconName}
                type={iconType}
                color={Colors.text}
                size={wp(5)}
            />
            <Text style={styles.textTitle}>{title}</Text>
        </View>
    )

}
const styles = StyleSheet.create({
    container: {
        borderRadius: wp(2),
        marginBottom: hp(2),
        padding: wp(3),
        borderWidth: 0.3,
        borderColor: Colors.secondary,
        flexDirection: 'row',
        //justifyContent: 'space-between'
    },
    iconContainer: {
        width: wp(10),
        height: wp(10),
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: wp(5),
        backgroundColor: '#dce7e1',

    },
    contentContainer: {
        flex: 1,
        marginLeft: wp(3),
        marginRight: wp(2),
    },
    menu: {
        position: 'absolute',
        right:0,
        top:45,
        zIndex:10,
        borderRadius: wp(2),
        padding: wp(2),
        backgroundColor: 'white',
        elevation: 3,
    },
    rowContainer: {
        flexDirection: 'row',
        marginBottom: hp(0.5),
        //alignItems: 'center'
    },
    textName: {
        fontFamily: fonts.semibold,
        fontSize: wp(4),
        color: Colors.text,
        marginBottom: hp(0.5),

    },
    textTitle: {
        fontFamily: fonts.regular,
        fontSize: wp(3.5),
        color: Colors.text,
        marginLeft: wp(2)
    },
    menuButton: {
        padding: wp(1)
    }
});

export default AddressCard;
