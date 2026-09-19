
import { View, Text, StyleSheet, TouchableOpacity, Image, ScrollView } from 'react-native';
import Colors from '../../constants/colors';
import { fonts } from '../../constants/typography';
import { ShadowCard } from '../common/ShadowCard';
import Icon from '../Icon';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import { useState } from 'react';
import MoreProductContainer from './MoreProductContainer';
import { router } from 'expo-router';
import { formatStatus } from '../../services/formatStatus';
interface Props {
    order?:any
    orderId?: string
    orderCode?: string
    orderAmount?: string
    orderItems?: number
    orderDate?: any
    totalItems?: number
    lineItems?: []
    status: string
    createdAt?:any
    //fullFillmentStatus:string
    //imageURL?:string
}
const OrderCard: React.FC<Props> = ({createdAt, order, orderId, orderCode, orderAmount, orderDate, orderItems, totalItems, lineItems, status }) => {
    const statusStyles: Record<
        string,
        { backgroundColor: string; color: string }
    > = {
        Processing: {
            backgroundColor: '#F3E8C8',
            color: '#8A6A2F',
        },
        Shipped: {
            backgroundColor: '#E4ECF4',
            color: '#49657D',
        },
        Delivered: {
            backgroundColor: '#E3EEE7',
            color: '#3F6B50',
        },
        Cancelled: {
            backgroundColor: '#F1E3E3',
            color: '#8A5050',
        },
    };
    const [showMore, setShowMore] = useState(false)
    const date = new Date(orderDate).toLocaleDateString('en-GB', {
        day: '2-digit',
        month: 'short',
        year: 'numeric',
    })
    const orderPrice=Number(orderAmount)
    return (
        <ShadowCard style={styles.container} containerStyle={styles.containerStyle}>
            <TouchableOpacity
                style={styles.orderCard}
                activeOpacity={0.7}
                onPress={() =>
                    router.push({
                        pathname: '/profile/orderDetail/[id]',
                        params: { id: orderId,
                            order: JSON.stringify(order)
                        },
                    })}
            >
            <View style={styles.orderIdContainer}>
                <Text style={styles.idText}>Order {orderCode}</Text>
                <Text style={[styles.badgeText, {
                    backgroundColor: statusStyles[status]?.backgroundColor,
                    color: statusStyles[status]?.color,
                }]}>{status}</Text>
            </View>
            <Text style={styles.date}>{date}</Text>

            <View style={styles.productContainer}>
                <View
                    style={styles.imageContainer}
                >
                    {lineItems?.slice(0, 4).map((item: any, index: number) => {
                        const product = item.node;

                        return (
                            <View key={product.id} style={styles.imageWrapper}>
                                <Image
                                    source={{ uri: product.image.url }}
                                    style={styles.image}
                                />

                                {index === 3 && lineItems.length > 3 && (
                                    <View style={styles.moreOverlay}>
                                        <Text style={styles.moreItemsText}>
                                            +{lineItems.length - 3}
                                        </Text>
                                    </View>
                                )}
                            </View>
                        );
                    })}
                </View>
                <TouchableOpacity>
                    <Icon
                        name='chevron-small-right'
                        type='Entypo'
                        size={wp(7)}
                        color={Colors.text}
                    />
                </TouchableOpacity>

            </View>
            <View style={styles.orderIdContainer}>
                <Text style={styles.date}>{lineItems?.length ?? 0} {(lineItems?.length ?? 0) > 1 ? 'Items' : 'Item'}</Text>
                {
                    orderPrice > 0 &&(
                         <Text style={styles.idText}>Total: PKR {orderPrice.toLocaleString()}</Text>
                    )
                }
               
            </View>
        </TouchableOpacity>
        </ShadowCard >
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
        //color: Colors.text,
        // backgroundColor: Colors.tertiary,
        paddingHorizontal: wp(2),
        justifyContent: 'center',
        borderRadius: wp(10)
    },
    date: {
        fontFamily: fonts.regular,
        fontSize: wp(3.5),
        color: Colors.secondary,
    },
    productContainer: {
        flexDirection: 'row',
        marginVertical: hp(1),
        alignItems: 'center',
        justifyContent: 'space-between'
    },
    imageContainer: {
        flexDirection: 'row',
        gap: 10,
    },
    image: {
        width: wp(16),
        height: wp(16),
        borderRadius: wp(2),
        borderWidth: 0.3,
        borderColor: Colors.secondary
    },
    moreOverlay: {
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        borderRadius: wp(2),
        backgroundColor: 'rgba(0, 0, 0, 0.6)',
        alignItems: 'center',
        justifyContent: 'center',
    },
    imageWrapper: {
        position: 'relative',
    },
    moreItemsText: {
        fontFamily: fonts.semibold,
        color: 'white',
        fontSize: wp(5)
    }


});

//make this component available to the app
export default OrderCard;



