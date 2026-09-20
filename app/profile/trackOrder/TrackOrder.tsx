import { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import {
    widthPercentageToDP as wp,
    heightPercentageToDP as hp
} from 'react-native-responsive-screen';
import Animated, { SlideInLeft, SlideInRight } from 'react-native-reanimated';
import { router } from 'expo-router';
import styles from './TrackOrderStyle';
import { useLocalSearchParams } from 'expo-router';
import * as Clipboard from 'expo-clipboard';
import { ShadowCard } from '../../../components/common/ShadowCard';
import Header from '../../../components/profile/Header';
import getStatusIcon from '../../../services/getStatusIcon';
import CustomSection from '../../../components/profile/orderComponents/CustomeSection';
import Icon from '../../../components/Icon';
import Colors from '../../../constants/colors';
import CustomToast from '../../../components/common/CustomToast';
const TrackOrder = () => {

    const { trackingData, currentOrderStatus } = useLocalSearchParams()
    const [toastVisible, setToastVisible] = useState(false)
    const trackingInfo = trackingData && JSON.parse(trackingData as string)[0]
    const statusInfo = getStatusIcon(currentOrderStatus as string)
    const copyTrackingNumber = async()=>{
        await Clipboard.setStringAsync(trackingInfo.number)
        setToastVisible(true)
    }
    return (
        <Animated.View
            style={{ flex: 1 }}
            entering={SlideInRight.duration(100)}
        >
            <SafeAreaView style={styles.container}>
                <CustomToast
                type='success'
                visible={toastVisible}
                messageTitle='Copied!'
                messageDescription='Tracking number copied to your clipboard.'
                onHide={()=>setToastVisible(false)}
                />
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
                        <View style={[styles.customContainer]}>
                            <View style={styles.shippingCompany}>
                                <Text style={styles.textHeading}>
                                    Company
                                </Text>
                                <Text style={styles.textCompany}>
                                    {trackingInfo.company}
                                </Text>
                            </View>
                            <View style={styles.tracking}>
                                <View>
                                    <Text style={styles.textHeading}>
                                    Tracking Number
                                </Text>
                                
                                    <Text 
                                    style={styles.textCompany}>
                                        {trackingInfo.number}
                                    </Text>
                                </View>
                                <TouchableOpacity 
                                style={styles.copyIcon} 
                                activeOpacity={0.7}
                                onPress={copyTrackingNumber}
                                >
                                    <Icon
                                    name='copy-outline'
                                    type='Ionicons'
                                    size={wp(5)}
                                    color={Colors.primary}
                                    />
                                </TouchableOpacity>
                                
                                
                            </View>

                        </View>
                    </ShadowCard>
                </CustomSection>

            </SafeAreaView>
        </Animated.View>

    );
};



export default TrackOrder;
