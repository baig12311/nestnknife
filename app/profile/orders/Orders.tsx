//import liraries
import { useRef, useState } from 'react';
import { View, Text, TouchableOpacity, ScrollView } from 'react-native';
import styles from './OrderStyle';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useCustomer } from '../../../hooks/useCustomer';
import PagerView from "react-native-pager-view";
import Header from '../../../components/profile/Header';
import OrderCard from '../../../components/profile/OrderCard';
import { router } from 'expo-router';
const Orders = () => {
    const pagerRef = useRef<PagerView>(null)
    const [selectedStatus, setSelectedStatus] = useState('All')
    const { customer, loading } = useCustomer();
    const orders = customer?.orders?.edges || [];
    console.log('Full Order:', JSON.stringify(orders[0]?.node, null, 2)); // Full details
    const orderId = orders[0]?.node.name
    const orderPrice = orders[0]?.node.totalPrice.amount
    const orderItemTitle = orders[0]?.node.lineItems.edges[0]?.node.title
    const orderItemQuantity = orders[0]?.node.lineItems.edges[0]?.node.quantity
    const statuses = [
        "All",
        "Processing",
        "Shipped",
        "Delivered",
        "Cancelled",
    ];

    const ordersList = [
        { id: "1", status: "Shipped", name: "Order 1" },
        { id: "2", status: "Processing", name: "Order 2" },
        { id: "3", status: "Shipped", name: "Order 3" },
        { id: "4", status: "Delivered", name: "Order 4" },
        { id: "5", status: "Cancelled", name: "Order 5" },
    ];
    const getFilteredOrder = (status: string) => {
        if (status === 'All') {
            return ordersList
        }
        return ordersList.filter((order: any) => order.status === status);
    }
    const handlePageChange = (event: any) => {
        const page = event.nativeEvent.position
        setSelectedStatus(statuses[page])
    }
    const handleStatusPress = (index: number) => {
        setSelectedStatus(statuses[index])
        pagerRef.current?.setPage(index)
    }
    return (
        <SafeAreaView style={styles.container}>
            <Header title='Orders' onPress={()=>router.replace('/profile')}/>
            <View style={styles.statusContainer}>
                {
                    statuses.map((status, index) => (
                        <Text key={index} style={[styles.statusText, selectedStatus === status && styles.selectedText]} onPress={() => handleStatusPress(index)}>
                            {status}
                        </Text>
                    ))
                }
            </View>
            <ScrollView contentContainerStyle={styles.scrollContainer} showsVerticalScrollIndicator={false}>
                <OrderCard />
            <OrderCard />

            <OrderCard />
            </ScrollView>
            

            {/* <Text>Orders</Text>
            <Text>Order ID: {orderId}</Text>
            <Text>Total Price: {orderPrice}</Text>
            <Text>Product: {orderItemTitle}</Text>
            <Text>Quantity: {orderItemQuantity}</Text> */}
            {/* <PagerView 
            ref={pagerRef}
            initialPage={0}
            onPageSelected={handlePageChange}
            style={{flex:1}}
            >
                {
                    statuses.map((status)=>{
                        const filteredOrders = getFilteredOrder(status)
                        return(
                            <View key={status} style={styles.contentContainer}>
                                <Text>{status}</Text>
                                {
                                    filteredOrders.map((order:any)=>(
                                        <Text key={order.id}>{order.name}</Text>
                                    ))
                                }

                            </View>
                        )
                    })
                }
            </PagerView> */}

        </SafeAreaView>
    );
};
export default Orders;
