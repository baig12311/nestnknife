
import { View, Text, StyleSheet, TouchableOpacity, } from 'react-native';
import Colors from '../../constants/colors';
import { fonts } from '../../constants/typography';
import { ShadowCard } from '../common/ShadowCard';
import Icon from '../Icon';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import { useState } from 'react';
import MoreProductContainer from './MoreProductContainer';
interface Props {
    orderID?: string
    orderAmount?: string
    orderItems?: number
    orderDate?: Date
}
const OrderCard: React.FC<Props> = ({ orderID, orderAmount, orderDate, orderItems }) => {
    const [showMore, setShowMore] = useState(false)
    return (
        <ShadowCard style={styles.container} containerStyle={styles.containerStyle}>
            <View style={styles.orderCard}
            >
                <View style={styles.orderIdContainer}>
                    <Text style={styles.idText}>Order #NK12</Text>
                    <Text style={styles.badgeText}>Badge</Text>
                </View>
                <Text style={styles.date}>11 September 2026</Text>
                <View style={styles.productContainer}>
                    <View style={styles.imageContainer}>
                        <View style={{ width: wp(20), height: wp(20), borderRadius: wp(2), borderWidth: 1, borderColor: Colors.tertiary }} />
                        <View style={{ width: wp(20), height: wp(20), borderRadius: wp(2), borderWidth: 1, borderColor: Colors.tertiary }} />
                        <View style={{ width: wp(20), height: wp(20), borderRadius: wp(2), borderWidth: 1, borderColor: Colors.tertiary }} />
                    </View>
                    <TouchableOpacity activeOpacity={0.7} onPress={() => setShowMore(!showMore)}>
                        <Icon
                            name={showMore ? 'chevron-small-down': 'chevron-small-right'}
                            type='Entypo'
                            size={wp(7)}
                            color={Colors.text}
                        />
                    </TouchableOpacity>

                </View>
                {
                    showMore && (<MoreProductContainer/>)
                }
                <View style={styles.orderIdContainer}>
                    <Text style={styles.date}>2 Items</Text>
                    <Text style={styles.idText}>Total: PKR 9,999</Text>
                </View>
            </View>
        </ShadowCard>
    );
};


const styles = StyleSheet.create({
    container: {
        borderRadius: wp(2),
        marginBottom: hp(1)
    },
    containerStyle: {
        width: '100%'
    },
    orderCard: {
        padding: wp(3),
    },
    orderIdContainer: {
        //borderWidth:1,
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center'
    },
    idText: {
        fontFamily: fonts.semibold,
        fontSize: wp(4),
        color: Colors.text,
    },
    badgeText: {
        height: hp(2.5),
        fontFamily: fonts.medium,
        fontSize: wp(3),
        color: Colors.text,
        backgroundColor: Colors.tertiary,
        paddingHorizontal: wp(2),
        justifyContent: 'center',
        borderRadius: wp(1)
    },
    date: {
        fontFamily: fonts.regular,
        fontSize: wp(3.5),
        color: Colors.secondary,
    },
    productContainer: {
        flexDirection: 'row',
        marginVertical: hp(1),
        alignItems: 'center'
    },
    imageContainer: {
        flexDirection: 'row',
        gap: 10,
        flex: 1
    },


});

//make this component available to the app
export default OrderCard;



