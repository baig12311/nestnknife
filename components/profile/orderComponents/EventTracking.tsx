import { useEffect } from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import Colors from '../../../constants/colors';
import { fonts } from '../../../constants/typography';
import { ShadowCard } from '../../common/ShadowCard';
import Animated, {
    useSharedValue,
    useAnimatedStyle,
    withTiming,
    withDelay,
} from 'react-native-reanimated';
import Icon from '../../Icon';
import getStatusIcon from '../../../services/getStatusIcon';
import {
    widthPercentageToDP as wp,
    heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import { current } from '@reduxjs/toolkit';

interface Props {
    orderStatus: string
    placedAt?: any
    shippedAt?: any
    deliveredAt?: any
    onPress?: () => void
    hasTrackingInfo?: boolean
}

const EventType = [
    'Order Placed',
    'Processing',
    'Shipped',
    'Delivered'
]

const formatDate = (date?: string) => {
    if (!date) return '';

    return new Date(date).toLocaleDateString('en-GB', {
        day: '2-digit',
        month: 'short',
    });
};

const EventTracking: React.FC<Props> = ({
    onPress,
    orderStatus,
    placedAt,
    shippedAt,
    deliveredAt,
    hasTrackingInfo
}) => {

    const EventDate = [
        formatDate(placedAt),
        formatDate(placedAt),
        formatDate(shippedAt),
        formatDate(deliveredAt)
    ]

    const statusIcon = getStatusIcon(orderStatus)

    const subtext =
        orderStatus === 'Shipped'
            ? 'Your order is on the way.'
            : orderStatus === 'Processing'
                ? "We're preparing these items for shipping."
                : orderStatus === 'Delivered'
                    ? 'Your order has been delivered.'
                    : 'Your order has been cancelled.'

    const statusIndex = EventType.indexOf(orderStatus || '')

    // Animation
    const progress = useSharedValue(0)

    useEffect(() => {
        progress.value = withTiming(statusIndex, {
            duration: 900
        })
    }, [statusIndex])

    const animatedProgress = useAnimatedStyle(() => {
        return {
            width: `${(progress.value / 3) * 75}%`,
        };
    });

    // circle animation

    const circleScale=useSharedValue(1)
    const checkScale=useSharedValue(0)
    useEffect(()=>{
        circleScale.value= 0
        checkScale.value=0
        circleScale.value = withDelay(700, withTiming(1,{
            duration: 300
        }))
        checkScale.value = withDelay(1300, withTiming(1,{
            duration: 300
        }))
    }, [statusIndex])

    const animatedCircle = useAnimatedStyle(()=>{
        return{
            transform:[
                {
                    scale:circleScale.value
                }
            ]
        }
    })

    // check animation
    
    const animatedCheck = useAnimatedStyle(()=>{
        return{
            transform:[
                {
                    scale:checkScale.value
                }
            ]
        }
    })
    return (
        <ShadowCard
            style={styles.container}
            containerStyle={styles.contentContainer}
        >
            <View style={styles.mainContainer}>

                <View style={styles.header}>

                    <View
                        style={[
                            styles.icon,
                            orderStatus === 'Cancelled' && {
                                backgroundColor: '#F1E3E3'
                            }
                        ]}
                    >
                        <Icon
                            name={statusIcon.name}
                            type={statusIcon.type}
                            color={statusIcon.color}
                            size={wp(9)}
                        />
                    </View>

                    <View style={styles.textContainer}>
                        <Text style={styles.status}>
                            {orderStatus}
                        </Text>

                        <Text style={styles.subText}>
                            {subtext}
                        </Text>
                    </View>

                </View>

                {
                    orderStatus === 'Cancelled'
                        ? null
                        : (
                            <View>

                                <View style={styles.tracker}>

                                    {/* Base Line */}
                                    <View style={styles.baseLine} />

                                    {/* Animated Active Line */}
                                    <Animated.View
                                        style={[
                                            styles.activeLine,
                                            animatedProgress
                                        ]}
                                    />

                                    {
                                        EventType.map((type, index) => {

                                            const isCompleted =
                                                index < statusIndex

                                            const current =
                                                index === statusIndex

                                            return (
                                                <View
                                                    style={styles.trackerContainer}
                                                    key={index}
                                                >

                                                    <View
                                                        style={[
                                                            styles.traclerCircleWrapper,
                                                            (current &&
                                                                orderStatus !== 'Delivered') && {
                                                                borderWidth: 1.5
                                                            }
                                                        ]}
                                                    >

                                                        <Animated.View
                                                            style={[
                                                                styles.trackerCircle,
                                                                current && animatedCircle,
                                                                isCompleted && {
                                                                    backgroundColor:
                                                                        Colors.primary,
                                                                    borderWidth: 0
                                                                },

                                                                current && {
                                                                    backgroundColor:
                                                                        Colors.primary,
                                                                    borderWidth: 0
                                                                }
                                                            ]}
                                                        >

                                                            {
                                                                (isCompleted || current) && (
                                                                    <Animated.View
                                                                    style={current ? animatedCheck:undefined}
                                                                    >
                                                                        <Icon
                                                                        name="checkmark"
                                                                        type="Ionicons"
                                                                        color={Colors.background}
                                                                        size={wp(5)}
                                                                    />
                                                                    </Animated.View>
                                                                    
                                                                )
                                                            }

                                                        </Animated.View>

                                                    </View>

                                                    <Text
                                                        style={[
                                                            styles.type,
                                                            (isCompleted || current) && {
                                                                color: Colors.primary
                                                            }
                                                        ]}
                                                    >
                                                        {type}
                                                    </Text>

                                                    <Text
                                                        style={[
                                                            styles.type,
                                                            (isCompleted || current) && {
                                                                color: Colors.primary
                                                            }
                                                        ]}
                                                    >
                                                        {EventDate[index]}
                                                    </Text>

                                                </View>
                                            )

                                        })
                                    }

                                </View>

                                {
                                    hasTrackingInfo && (
                                        <TouchableOpacity
                                            style={styles.trackButton}
                                            activeOpacity={0.7}
                                            onPress={onPress}
                                        >

                                            <Text style={styles.txtButton}>
                                                Track Order
                                            </Text>

                                            <Icon
                                                name="arrow-forward"
                                                type="Ionicons"
                                                size={wp(5)}
                                                color={Colors.background}
                                            />

                                        </TouchableOpacity>
                                    )
                                }

                            </View>
                        )
                }

            </View>
        </ShadowCard>
    );
};

// define your styles
const styles = StyleSheet.create({

    contentContainer: {
        width: '100%'
    },

    container: {
        borderRadius: wp(2),
    },

    mainContainer: {
        width: '100%',
        padding: wp(3),
    },

    header: {
        flexDirection: 'row',
        marginBottom: wp(2),
        alignItems: 'center'
    },

    icon: {
        width: wp(14),
        height: wp(14),
        borderRadius: wp(8),
        backgroundColor: Colors.secondaryBackground,
        justifyContent: 'center',
        alignItems: 'center'
    },

    status: {
        fontFamily: fonts.semibold,
        fontSize: wp(5.5),
        color: Colors.primary
    },

    subText: {
        fontFamily: fonts.regular,
        color: Colors.secondary,
        fontSize: wp(3.5)
    },

    textContainer: {
        flex: 1,
        marginLeft: wp(3)
    },

    tracker: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginBottom: wp(2),
        position: 'relative',
    },

    // NEW
    baseLine: {
        position: 'absolute',
        height: wp(0.5),
        backgroundColor: Colors.tertiary,
        left: '12.5%',
        right: '12.5%',
        top: wp(5),
        zIndex: 0,
    },

    // NEW
    activeLine: {
        position: 'absolute',
        height: wp(0.5),
        backgroundColor: Colors.primary,
        left: '12.5%',
        top: wp(5),
        zIndex: 1,
    },

    traclerCircleWrapper: {
        width: wp(10),
        height: wp(10),
        borderRadius: wp(6),
        justifyContent: 'center',
        alignItems: 'center',
        marginBottom: wp(1),
        borderColor: Colors.primary,
    },

    trackerCircle: {
        width: wp(8),
        height: wp(8),
        borderRadius: wp(4),
        borderColor: Colors.secondary,
        backgroundColor: Colors.tertiary,
        zIndex: 2,
        justifyContent: 'center',
        alignItems: 'center'
    },

    trackerContainer: {
        alignItems: 'center',
        flex: 1,
        position: 'relative',
        zIndex: 2,
    },

    type: {
        fontFamily: fonts.medium,
        fontSize: wp(3),
        color: Colors.secondary
    },

    typeSelected: {
        color: Colors.primary
    },

    trackButton: {
        backgroundColor: Colors.primary,
        height: hp(4.5),
        width: wp(40),
        borderRadius: wp(2),
        justifyContent: 'center',
        alignItems: 'center',
        alignSelf: 'flex-end',
        flexDirection: 'row'
    },

    txtButton: {
        fontFamily: fonts.medium,
        fontSize: wp(4),
        color: Colors.background,
        marginRight: wp(2)
    }

});

export default EventTracking;

