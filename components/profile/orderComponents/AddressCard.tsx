import { View, Text, StyleSheet } from 'react-native';
import { ShadowCard } from '../../common/ShadowCard';
import Colors from '../../../constants/colors';
import { fonts } from '../../../constants/typography';
import Icon from '../../Icon';
import { Row } from '../AddressCard';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
interface Props {
    fName?: string
    lName?: string
    address1?: string
    address2?: string
    phone?: string
    city?: string
}
const AddressCard: React.FC<Props> = ({ fName, lName, address1, address2,
    phone, city }) => {
        const formattedPhone = phone?.startsWith('+92')
    ? phone.replace('+92', '+92 ')
    : phone?.startsWith('0')
        ? phone.replace('0', '+92 ')
        : phone;
    return (
        <ShadowCard style={styles.container} containerStyle={styles.contentContainer}>
            <View style={styles.mainContainer}>
                <View style={styles.icon}>
                    <Icon
                        name='home-outline'
                        type='Ionicons'
                        size={wp(6)}
                        color={Colors.primary}
                    />
                </View>
                <View style={styles.infoContainer}>
                    <Text style={styles.name}>{fName} {lName}</Text>
                    <Text style={styles.address} numberOfLines={2}>{`${address2 ? `${address2}, ` : ''}${address1}`}</Text>
                    <View style={styles.detailContainer}>
                        <Row
                        iconName='home-city-outline'
                        iconType='MaterialDesignIcons'
                        title={city}
                        />
                        <Row
                        iconName='call-outline'
                        iconType='Ionicons'
                        title={formattedPhone}
                        />
                    </View>
                </View>

            </View>
        </ShadowCard>

    );
};

// define your styles
const styles = StyleSheet.create({
    contentContainer: {
        width: '100%'
    },
    container: {
        borderRadius: wp(2),

    },
    mainContainer: {
        width: '100%',
        padding: wp(3),
        flexDirection: 'row'
    },
    infoContainer: {
        flex: 1,
        marginLeft: wp(3)
    },
    icon: {
        width: wp(10),
        height: wp(10),
        borderRadius: wp(5),
        backgroundColor: '#E8F0EA',
        justifyContent: 'center',
        alignItems: 'center'
    },
    detailContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 30
    },
    name:{
        fontFamily: fonts.semibold,
        fontSize:wp(4),
        color:Colors.primary
    },
    address:{
        fontFamily: fonts.regular,
        fontSize:wp(3.5),
        color:Colors.secondary,
        marginBottom: wp(2)
    },
});

//make this component available to the app
export default AddressCard;
