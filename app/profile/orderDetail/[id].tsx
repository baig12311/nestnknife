import { View, Text, StyleSheet } from 'react-native';
import styles from './orderDetailStyle';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useLocalSearchParams } from 'expo-router';
import { router } from 'expo-router';
import Header from '../../../components/profile/Header';
import { orderInfo } from '../../../services/orderDetailData';
import { ShadowCard } from '../../../components/common/ShadowCard';
import OrderInfoCard from '../../../components/profile/orderComponents/OrderInfoCard';
import CustomSection from '../../../components/profile/orderComponents/CustomeSection';
import OrderItemCard from '../../../components/profile/orderComponents/OrderItemCard';
const OrderDetail = () => {
    const { id, order } = useLocalSearchParams()
    const orderData = order ? JSON.parse(order as string) : null
    const orderDetails = orderInfo(orderData)
    const lineItems=orderData.lineItems.edges
    return (
        <SafeAreaView style={styles.container}>
            <Header title='Order Summary' onPress={()=>router.back()}/>
                <CustomSection heading='Order Information'>
                    <ShadowCard style={styles.infoGrid} containerStyle={styles.containerStyle}>
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
            </ShadowCard>
                </CustomSection>
                <CustomSection heading='Order Items'>
                    <ShadowCard style={styles.itemContainer} containerStyle={styles.containerStyle}>
                        <View>
                            {
                           lineItems.map((item)=>{
                            const orderItem= item.node
                            return(
                                <OrderItemCard
                                itemName={orderItem.title}
                                itemPrice={orderItem.price.amount}
                                quantity={orderItem.quantity}
                                image={orderItem.image.url}
                                />
                            )
                           })
                        }
                        </View>
                        
            </ShadowCard>
                </CustomSection>
            


        </SafeAreaView>
    );
};

export default OrderDetail;
