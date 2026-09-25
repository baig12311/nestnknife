import { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ScrollView } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import {
    widthPercentageToDP as wp,
    heightPercentageToDP as hp
} from 'react-native-responsive-screen';
import { Linking } from 'react-native';
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
import Button from '../../../components/common/Button';
const TrackOrder = () => {

    const { trackingData, currentOrderStatus } = useLocalSearchParams()
    const [toastVisible, setToastVisible] = useState(false)
    const trackingInfo = trackingData && JSON.parse(trackingData as string)[0]
    const statusInfo = getStatusIcon(currentOrderStatus as string)
    const shipmentSteps = [
        {
            title: 'Shipment Created',
            bg: Colors.secondaryBackground,
            name: 'checkmark',
            type: 'Ionicons',
            color: Colors.primary,
        },
        {
            title: 'Shipped',
            bg: Colors.primary,
            name: 'truck-fast-outline',
            type: 'MaterialDesignIcons',
            color: Colors.background,
        },
        {
            title: 'Delivered',
            bg: Colors.primary,
            name: 'package-variant-closed-check',
            type: 'MaterialDesignIcons',
            color: Colors.background,
        }

    ]


    const currentStep = currentOrderStatus === 'Delivered' ?
        2 : currentOrderStatus === 'Shipped' ? 1 : 0
    const copyTrackingNumber = async () => {
        await Clipboard.setStringAsync(trackingInfo.number)
        setToastVisible(true)
    }
    const handleTrackPress = async () => {
        if (!trackingInfo?.url) return
        await Linking.openURL(trackingInfo?.url)
    }
    return (
        <Animated.View
            style={{ flex: 1 }}
            entering={SlideInRight.duration(300)}
        >
            <SafeAreaView style={styles.container}>
                {/* <CustomToast
                    type='success'
                    visible={toastVisible}
                    messageTitle='Copied!'
                    messageDescription='Tracking number copied to your clipboard.'
                    onHide={() => setToastVisible(false)}
                /> */}
                <Header
                    title='Order Tracking'
                    onPress={() => router.back()}
                />
                <ScrollView contentContainerStyle={{ flexGrow: 1, paddingBottom: 30}}
                showsVerticalScrollIndicator={false}>


                    <CustomSection>
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
                    <CustomSection heading='Shipment Details'>
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
                    <CustomSection heading='Shipment Status'>
                        <ShadowCard
                            containerStyle={styles.containerStyle}
                        >
                            <View style={[styles.customContainer]}>
                                <View style={styles.trackerStep}>
                                    {
                                        shipmentSteps.map((step, index) => {
                                            const isCurrent = index <= currentStep
                                            if (!isCurrent) return
                                            return (
                                                <View key = {index}>
                                                    <View style={styles.trackerInfo}>
                                                        <View style={[styles.trackerCircle,
                                                            {backgroundColor: step.bg}
                                                        ]}>
                                                            <Icon
                                                                name={step.name}
                                                                type={step.type}
                                                                color={step.color}
                                                                size={wp(6)}
                                                            />
                                                        </View>
                                                        <Text style={styles.statusText}>{step.title}</Text>
                                                    </View>

                                                    {
                                                        index < currentStep && (
                                                            <View style={styles.line} />
                                                        )
                                                    }
                                                </View>

                                            )
                                        })
                                    }


                                </View>
                            </View>
                        </ShadowCard>
                    </CustomSection>
                </ScrollView>

                <Button title='Track Shipment' onPress={handleTrackPress} />
                {/* <Text>
                    {`You will be redirected to ${trackingInfo.company && trackingInfo.company !== 'Other' ? trackingInfo.company : "the carrier's site"} to view lates shipment updates`}
                </Text> */}
                <Text style={[styles.hintText, styles.regularText]}>
                    You'll be redirected to{' '}
                    <Text style={[styles.hintText, styles.boldText]}>
                        {trackingInfo.company && trackingInfo.company !== 'Other'
                            ? trackingInfo.company
                            : "the courier's site"}
                    </Text>{' '}
                    to view latest shipment updates.
                </Text>
            </SafeAreaView>
        </Animated.View>

    );
};



export default TrackOrder;
