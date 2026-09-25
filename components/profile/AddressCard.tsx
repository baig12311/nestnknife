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
    city?: string
    menuOpen?: boolean
    isDefault?: boolean
    onMenuPress?: () => void
    onPressEdit?: () => void
    onPressDelete?: () => void
}
interface rowProps {
    title?: string
    iconName: string
    iconType: string
    onPress?: () => void
}
const AddressCard: React.FC<Props> = ({ firstName, lastName, phoneNumber, address1, address2, onPressDelete,
    onPressEdit, menuOpen, onMenuPress, isDefault, city
}) => {
    //const [showMenu, setShowMenu] = useState(false)
    const phoneEdit = phoneNumber?.replace('+92', '+92 ')
    return (
        <View style={styles.container}>
            <View style={styles.iconContainer}>
                <Icon
                    name='location'
                    type='Ionicons'
                    size={wp(6)}
                    color={Colors.primary}
                />
            </View>
            <View style={styles.contentContainer}>
                {
                    isDefault && (
                        <View style={styles.defaultBadge}>
                            <Text style={styles.textBadge}>Default</Text>
                        </View>
                    )
                }
                <Text style={styles.textName}>{firstName} {lastName}</Text>


                {
                    phoneNumber && (<Row
                        iconName='call-outline'
                        iconType='Ionicons'
                        title={phoneEdit}
                    />
                    )
                }
                <Row
                    iconName='location-outline'
                    iconType='Ionicons'
                    title={`${address2 ? `${address2}, ` : ''}${address1}`}
                />
                
                <Row
                    iconName='home-city-outline'
                    iconType='MaterialDesignIcons'
                    title={city}
                />
            </View>
            <View>
                <TouchableOpacity
                    style={styles.menuButton}
                    activeOpacity={0.7}
                    onPress={onMenuPress}
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
                menuOpen && (
                    <View style={styles.menu}>
                        <Row
                            iconName='edit'
                            iconType='AntDesign'
                            title='Edit'
                            onPress={onPressEdit}
                        />
                        <Row
                            iconName='trash-outline'
                            iconType='Ionicons'
                            title='Delete'
                            onPress={onPressDelete}
                        />
                    </View>
                )
            }

        </View>

    );
};

const Row: React.FC<rowProps> = ({
  title,
  iconName,
  iconType,
  onPress,
}) => {
  const content = (
    <>
      <Icon
        name={iconName}
        type={iconType}
        color={Colors.secondary}
        size={wp(5)}
      />

      <Text style={styles.textTitle}>{title}</Text>
    </>
  );

  if (onPress) {
    return (
      <TouchableOpacity
        style={styles.rowContainer}
        onPress={onPress}
        activeOpacity={0.7}
      >
        {content}
      </TouchableOpacity>
    );
  }

  return (
    <View style={styles.rowContainer}>
      {content}
    </View>
  );
};
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
        right: 0,
        top: 40,
        zIndex: 10,
        borderRadius: wp(2),
        padding: wp(3),
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
        color: Colors.primary,
        marginBottom: hp(0.5),

    },
    textTitle: {
        fontFamily: fonts.regular,
        fontSize: wp(3.2),
        color: Colors.secondary,
        marginLeft: wp(2)
    },
    menuButton: {
        padding: wp(1)
    },
    defaultBadge: {
        backgroundColor: '#dce7e1',
        borderRadius: wp(10),
        paddingHorizontal: wp(2),
        alignSelf: 'flex-start',
        justifyContent: 'center',
        alignItems: 'center',
        marginBottom: hp(0.5)
        //elevation: 2,

    },
    textBadge: {
        fontFamily: fonts.medium,
        color: Colors.primary,
        fontSize: wp(3)
    }
});

export default AddressCard;
export {Row}
