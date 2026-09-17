//import liraries
import { useRef, useState } from 'react';
import { View, Text, TouchableOpacity, ScrollView, FlatList } from 'react-native';
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
    console.log('Full Order:', JSON.stringify(orders)); // Full details
    orders.forEach((item: any) => {
        const order = item.node;

        console.log(
            'ORDER:',
            order.name,
            '| fulfillmentStatus:',
            order.fulfillmentStatus,
            '| latestShipmentStatus:',
            order.fulfillments?.edges?.[0]?.node?.latestShipmentStatus || 'NO FULFILLMENT'
        );
    });
    // const orderId = orders[0]?.node.name
    // const processedDate = orders[0]?.node.processedAt
    // const orderPrice = orders[0]?.node.totalPrice.amount
    // const orderItemTitle = orders[0]?.node.lineItems.edges[0]?.node.title
    // const totalItems = orders[0]?.node.lineItems.edges.length
    // const orderItemQuantity = orders[0]?.node.lineItems.edges[0]?.node.quantity
    // const itemImage = orders[0]?.node.lineItems.edges[0]?.node.image.url
    const statuses = [
        "All",
        "Processing",
        "Shipped",
        "Delivered",
        "Cancelled",
    ];
    const handlePageChange = (event: any) => {
        const page = event.nativeEvent.position
        setSelectedStatus(statuses[page])
    }
    const handleStatusPress = (index: number) => {
        setSelectedStatus(statuses[index])
        pagerRef.current?.setPage(index)
    }
    const getOrderStatus = (order: any) => {
        const fulfillmentStatus = order.fulfillmentStatus;

        const shipmentStatus =
            order.fulfillments?.edges?.[0]?.node?.latestShipmentStatus;

        if (shipmentStatus === 'DELIVERED') {
            return 'Delivered';
        }

        if (
            shipmentStatus === 'CONFIRMED' ||
            shipmentStatus === 'IN_TRANSIT' ||
            shipmentStatus === 'OUT_FOR_DELIVERY'
        ) {
            return 'Shipped';
        }

        if (
            fulfillmentStatus === 'IN_PROGRESS' ||
            fulfillmentStatus === 'UNFULFILLED'
        ) {
            return 'Processing';
        }

        return 'Processing';
    };
    
    const renderOrder = ({ item }: any) => {
        const order = item.node
        const lineItems = order.lineItems.edges
        //const orderFullfillmentStatus= order.fulfillments?.edges?.[0]?.node?.latestShipmentStatus;
        return (
            <OrderCard
                orderID={order.name}
                orderAmount={order.totalPrice.amount}
                orderDate={order.processedAt}
                lineItems={lineItems}
                status={getOrderStatus(order)}

            />

        )
    }
    const EmptyOrders = ({ status }: { status: string }) => {
    const emptyMessages: Record<string, { title: string; description: string }> = {
        Processing: {
            title: 'No processing orders',
            description: 'Your orders being prepared will appear here.',
        },
        Shipped: {
            title: 'No shipped orders',
            description: 'Orders on the way will appear here.',
        },
        Delivered: {
            title: 'No delivered orders',
            description: 'Your completed orders will appear here.',
        },
        Cancelled: {
            title: 'No cancelled orders',
            description: 'Cancelled orders will appear here.',
        },
    };

    const message = emptyMessages[status];

    return (
        <View style={styles.emptyContainer}>
            <Text style={styles.emptyTitle}>
                {message?.title}
            </Text>

            <Text style={styles.emptyDescription}>
                {message?.description}
            </Text>
        </View>
    );
};
    return (
        <SafeAreaView style={styles.container}>
            <Header title='Orders' onPress={() => router.replace('/profile')} />
            <View style={styles.statusContainer}>
                {
                    statuses.map((status, index) => (
                        <Text key={index}
                            style={[styles.statusText, selectedStatus === status && styles.selectedText]}
                            onPress={() => handleStatusPress(index)}
                        //onPress={() => setSelectedStatus(status)}
                        >
                            {status}
                        </Text>
                    ))
                }
            </View>
            <PagerView
                ref={pagerRef}
                initialPage={0}
                onPageSelected={handlePageChange}
                style={{ flex: 1 }}
            >
                {statuses.map((status) => {
                    const pageOrders =
                        status === 'All'
                            ? orders
                            : orders.filter(
                                (item: any) =>
                                    getOrderStatus(item.node) === status
                            );

                    return (
                        <View key={status} style={{ flex: 1 }}>
                            <FlatList
                                data={pageOrders}
                                renderItem={renderOrder}
                                keyExtractor={(item) => item.node.id}
                                showsVerticalScrollIndicator={false}
                                contentContainerStyle={{
                                    paddingBottom: 20,
                                    flexGrow:1
                                }}
                                ListEmptyComponent={<EmptyOrders status={status} />}
                            />
                        </View>
                    );
                })}
            </PagerView>
        </SafeAreaView>
    );
};
export default Orders;
