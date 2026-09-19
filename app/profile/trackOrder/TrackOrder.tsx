import { View, Text, StyleSheet } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { widthPercentageToDP as wp, 
    heightPercentageToDP as hp } from 'react-native-responsive-screen';
import Animated, { SlideInLeft, SlideInRight } from 'react-native-reanimated';
import { router } from 'expo-router';
import styles from './TrackOrderStyle';
import { useLocalSearchParams } from 'expo-router';
import { ShadowCard } from '../../../components/common/ShadowCard';
import Header from '../../../components/profile/Header';
import getStatusIcon from '../../../services/getStatusIcon';
import CustomSection from '../../../components/profile/orderComponents/CustomeSection';
import Icon from '../../../components/Icon';
const TrackOrder = () => {

    const { trackingData, currentOrderStatus } = useLocalSearchParams()
    const trackingInfo = trackingData && JSON.parse(trackingData as string)[0]
    const statusInfo = getStatusIcon(currentOrderStatus as string)

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
                        <View style={[styles.customContainer, styles.statusContainer]}>
                            <View style={styles.iconWrapper}>
                                <View style={styles.iconContainer}>
                                    <Icon
                                    name={statusInfo.name}
                                    type={statusInfo.type}
                                    color={statusInfo.color}
                                    size={wp(9)}
                                    />
                                </View>
                            </View>
                            <View style={styles.textContainer}>
                                <Text style={styles.statusBadge}>{currentOrderStatus}</Text>
                                <Text style={styles.textMain}>{statusInfo.main}</Text>
                                <Text style={styles.textSub}>{statusInfo.sub}</Text>
                                {/* <Text>{currentOrderStatus}</Text>
                                <Text>{currentOrderStatus}</Text> */}

                            </View>

                        </View>
                    </ShadowCard>
                </CustomSection>
                <CustomSection heading='Tracking Information'>
                    <ShadowCard
                        containerStyle={styles.containerStyle}
                    >
                        <View style={[styles.customContainer, styles.statusContainer]}>
                            <View style={styles.trackingView}>
                                <Text>
                                    {trackingInfo.company}
                                </Text>
                            </View>
                            <View style={styles.trackingView}>
                                <Text>
                                     <Text>
                                    {trackingInfo.number}
                                </Text>
                                </Text>
                            </View>

                        </View>
                    </ShadowCard>
                </CustomSection>

            </SafeAreaView>
        </Animated.View>

    );
};



export default TrackOrder;
