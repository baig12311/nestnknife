import { useState } from 'react';
import { View, Text, ScrollView, TouchableOpacity } from 'react-native';
import styles from './orderDetailStyle';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useLocalSearchParams } from 'expo-router';
import { widthPercentageToDP as wp } from 'react-native-responsive-screen';
import Colors from '../../../constants/colors';
import { router } from 'expo-router';
import Header from '../../../components/profile/Header';
import { orderInfo } from '../../../services/orderDetailData';
import { ShadowCard } from '../../../components/common/ShadowCard';
import OrderInfoCard from '../../../components/profile/orderComponents/OrderInfoCard';
import CustomSection from '../../../components/profile/orderComponents/CustomeSection';
import OrderItemCard from '../../../components/profile/orderComponents/OrderItemCard';
import PriceSectionRow from '../../../components/profile/orderComponents/PriceSectionRow';
import Icon from '../../../components/Icon';
const OrderDetail = () => {
    const [showAllItems, setShowAllItems] = useState(false)
    const { id, order } = useLocalSearchParams()
    const orderData = order ? JSON.parse(order as string) : null
    const orderDetails = orderInfo(orderData)
    const lineItems = orderData.lineItems.edges
    const visibleItems = showAllItems ? lineItems : lineItems.slice(0, 3)
    const orderAmount = Number(orderData?.totalPrice.amount).toLocaleString();
    return (
        <SafeAreaView style={styles.container}>
            <Header title='Order Summary' onPress={() => router.back()} />
            <ScrollView
                showsVerticalScrollIndicator={false}
            >
                {/* Order Section */}
                <CustomSection heading='Order Information'>
                    <ShadowCard containerStyle={styles.containerStyle}>
                        <View style={styles.infoGrid} >
                            {
                                orderDetails.map((order, index) => (
                                    <View key={order.id}>
                                        <OrderInfoCard
                                            iconName={order.iconName}
                                            iconType={order.iconType}
                                            title={order.title}
                                            desc={order.desc}
                                        />

                                    </View>

                                ))
                            }
                        </View>

                    </ShadowCard>
                </CustomSection>
                {/* Item Section */}
                <CustomSection heading='Order Items'>
                    <ShadowCard style={styles.itemContainer} containerStyle={styles.containerStyle}>
                        <View style={styles.mainItemContainer}>
                            {
                                visibleItems.map((item: any, index: number) => {
                                    const orderItem = item.node
                                    return (
                                        <OrderItemCard
                                            itemName={orderItem.title}
                                            itemPrice={orderItem.price.amount}
                                            quantity={orderItem.quantity}
                                            image={orderItem.image.url}
                                            //showBorder={index !== lineItems.length - 1}
                                        />
                                    )
                                })
                            }
                            {lineItems.length > 3 && (
                                <TouchableOpacity
                                    onPress={() => setShowAllItems(!showAllItems)}
                                    style={styles.showMoreButton}
                                >
                                    <Text style={styles.showMoreText}>
                                        {showAllItems
                                            ? 'Show less'
                                            : `+${lineItems.length - 3} more items`}
                                    </Text>
                                    <Icon
                                        name={showAllItems ? 'chevron-small-up' : 'chevron-small-right'}
                                        type='Entypo'
                                        size={wp(7)}
                                        color={Colors.secondary}
                                    />
                                </TouchableOpacity>
                            )}
                        </View>

                    </ShadowCard>
                </CustomSection>
                {/* Price Section */}
                <CustomSection heading='Price Summary'>
                    <ShadowCard containerStyle={styles.containerStyle}>
                        <View style={styles.mainItemContainer}>
                            <PriceSectionRow
                                title='SubTotal'
                                data={`PKR ${orderAmount}`}
                            />
                            <PriceSectionRow
                                title='Shipping'
                                data='FREE'
                            />
                            <PriceSectionRow
                                title='Total'
                                data={`PKR ${orderAmount}`}
                            />


                        </View>
                    </ShadowCard>
                </CustomSection>
            </ScrollView>




        </SafeAreaView>
    );
};

export default OrderDetail;
