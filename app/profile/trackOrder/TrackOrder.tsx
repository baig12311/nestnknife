import { View, Text, StyleSheet } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import Animated, { SlideInLeft, SlideInRight } from 'react-native-reanimated';
import { router } from 'expo-router';
import styles from './TrackOrderStyle';
import { useLocalSearchParams } from 'expo-router';
import { ShadowCard } from '../../../components/common/ShadowCard';
import Header from '../../../components/profile/Header';
import CustomSection from '../../../components/profile/orderComponents/CustomeSection';
const TrackOrder = () => {
    const { trackingData, currentOrderStatus } = useLocalSearchParams()
    const trackingInfo = trackingData && JSON.parse(trackingData as string)[0]
    console.log("Tracking Info:", trackingData)
    console.log("Order Status:", currentOrderStatus)
    return (
        <Animated.View
            style={{ flex: 1 }}
            entering={SlideInRight.duration(100)}
        >
            <SafeAreaView style={styles.container}>
                <Header
                    title='Order Tracking'
                    onPress={() => router.back()}
                />
                <CustomSection heading='Order Status'>
                    <ShadowCard
                        containerStyle={styles.containerStyle}
                    >
                        <View style={styles.statusContainer}>
                            <View style={styles.iconWrapper}>
                      s          <View style={styles.iconContainer}>

                                </View>
                            </View>
                            <View style={styles.textContainer}>
                                <Text style={styles.statusBadge}>{currentOrderStatus}</Text>
                                {/* <Text>{currentOrderStatus}</Text>
                                <Text>{currentOrderStatus}</Text> */}

                            </View>
                           
                        </View>
                    </ShadowCard>
                </CustomSection>

            </SafeAreaView>
        </Animated.View>

    );
};



export default TrackOrder;
