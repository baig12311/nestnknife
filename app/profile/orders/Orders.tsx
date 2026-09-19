import { useRef, useState } from 'react';
import { View, Text, TouchableOpacity, ScrollView, FlatList } from 'react-native';
import styles from './OrderStyle';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useCustomer } from '../../../hooks/useCustomer';
import PagerView from "react-native-pager-view";
import Header from '../../../components/profile/Header';
import OrderCard from '../../../components/profile/OrderCard';
import { router } from 'expo-router';
import Loader from '../../../components/profile/Loader';
import { getOrderStatus } from '../../../services/getOrderStatus';
import CustomEmptyComponent from '../../../components/common/CustomEmptyComponent';
const Orders = () => {
    const pagerRef = useRef<PagerView>(null)
    const [selectedStatus, setSelectedStatus] = useState('All')
    const { customer, loading, error, refetch} = useCustomer();
    const orders = customer?.orders?.edges || [];
    const order1 = orders[3]?.node
    console.log('Order: ', order1)
    console.log(
        "Order: ",
        JSON.stringify(order1, null, 2)
    );


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
    

    const renderOrder = ({ item }: any) => {
        const order = item.node
        const lineItems = order.lineItems.edges
        const createdAt = order.fulfillments?.edges?.[0]?.node?.createdAt;
        //const orderFullfillmentStatus= order.fulfillments?.edges?.[0]?.node?.latestShipmentStatus;
        return (
            <OrderCard
            order={order}
                orderId={order.id}
                orderCode={order.name}
                orderAmount={order.totalPrice.amount}
                orderDate={order.processedAt}
                lineItems={lineItems}
                status={getOrderStatus(order)}
                createdAt={createdAt}

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
    if (loading) {
        return (
            <Loader />
        )
    }
    if(error)
    {
        return(
            <SafeAreaView style={styles.container}>
                <Header title='Orders' onPress={() => router.replace('/profile')} />
                <CustomEmptyComponent
                    illustration={require('../../../assets/illustrations/NetworkError.png')}
                    mainText="Connection Problem"
                    subText="We couldn’t connect to the server. Please check your internet connection and try again."
                    buttonTitle="Try Again"
                    onPress={()=>refetch()}
                />

            </SafeAreaView>
        )        
    }
    if (orders.length === 0) {
        return (
            <SafeAreaView style={styles.container}>
                <Header title='Orders' onPress={() => router.replace('/profile')} />
                <CustomEmptyComponent
                    illustration={require('../../../assets/illustrations/NoOrder.png')}
                    mainText="No Orders Yet"
                    subText="Your orders will appear here once you place an order."
                    buttonTitle="Start Shopping"
                    onPress={() => router.replace('/categories')}
                />

            </SafeAreaView>
        )
    }

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
                                    flexGrow: 1
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
