import { useState } from 'react';
import { View, Text, StyleSheet, ScrollView, Touchable, TouchableOpacity} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import styles from './HelpSupportStyle';
import Header from '../../../components/profile/Header';
import { ShadowCard } from '../../../components/common/ShadowCard';
import faqs from '../../../services/faq';
import { router, usePathname } from 'expo-router';
import { widthPercentageToDP as wp,
    heightPercentageToDP as hp } from 'react-native-responsive-screen';
import CustomSectionRow from '../../../components/profile/CustomSectionrow';
import CollapsibleRow from '../../../components/profile/CollapsibleRow';
import CustomSection from '../../../components/profile/orderComponents/CustomeSection';
const HelpSupport = () => {
    const [expandedIndex, setExpandedIndex] = useState<number|null>(null)
    const [showAll, setShowAll] = useState(false)
    const show = showAll ? faqs : faqs.slice(0, 5)
    return (
        <SafeAreaView style={styles.container}>
            <Header title='Help & Support' onPress={()=>router.replace('/profile')}/>
            <ScrollView
            showsVerticalScrollIndicator={false}
            contentContainerStyle={{paddingBottom: 20}}>
                {/* Halp */}
                <CustomSection heading='Help'>
                    <ShadowCard containerStyle={styles.containerStyle}>
                        <View style={[styles.contentContainer, 
                            {
                                padding: wp(2), borderRadius:wp(2)}]}
                            >
                            <CustomSectionRow
                            mainText='Orders & Delivery'
                            iconName='truck-fast-outline'
                            iconType='Ioncions'
                            isHelp={true}
                            paddingVertical={hp(1)}
                            borderBottomWidth={0.3}
                            onPress={()=>router.push({
                                pathname: '/profile/helpDetail/[type]',
                                params:{
                                    type:'ordersDelivery'
                                }
                            })}
                            />
                            <CustomSectionRow
                            mainText='Cart & Checkout'
                            iconName='cart-outline'
                            iconType='Ioncions'
                            isHelp={true}
                            paddingVertical={hp(1)}
                            borderBottomWidth={0.3}
                            onPress={()=>router.push({
                                pathname: '/profile/helpDetail/[type]',
                                params:{
                                    type:'cartCheckout'
                                }
                            })}
                            />
                            <CustomSectionRow
                            mainText='Payment'
                            isHelp={true}
                            iconName='wallet-outline'
                            iconType='Ionicons'
                            paddingVertical={hp(1)}
                            borderBottomWidth={0.3}
                            onPress={()=>router.push({
                                pathname: '/profile/helpDetail/[type]',
                                params:{
                                    type:'payments'
                                }
                            })}
                            />
                            <CustomSectionRow
                            mainText='Return & Refunds'
                            iconName='refresh-outline'
                            iconType='Ionicons'
                            isHelp={true}
                            paddingVertical={hp(1)}
                            onPress={()=>router.push({
                                pathname: '/profile/helpDetail/[type]',
                                params:{
                                    type:'returnRefund'
                                }
                            })}
                            />
                            
                        </View>

                    </ShadowCard>
                </CustomSection>

                {/* FAQs */}
                <CustomSection heading='Frequently Asked Questions (FAQs)'>
                    <ShadowCard containerStyle={styles.containerStyle}>
                        <View style={styles.contentContainer}>
                            {
                                show.map((item, index)=>{
                                    const expanded=expandedIndex === index
                                    const isOpen=expanded ? null : index
                                    return(
                                        <CollapsibleRow
                                        key={index}
                            isExpand={expanded}
                            question={item.question}
                            answer={item.answer}
                            //isLast={index === 4}
                            onPress={()=>setExpandedIndex(isOpen)}
                            />
                                    )
                                })
                            }
                            {
                                faqs.length>5 && (
                                    <TouchableOpacity
                                    activeOpacity={0.7}
                                    style={styles.viewButton}
                                    onPress={()=>setShowAll(!showAll)}
                                    >
                                        <Text style={styles.viewText}>{showAll ? 'View Less' : 'View More'}</Text>
                                    </TouchableOpacity>
                                )
                            }
                            
                            
                        </View>

                    </ShadowCard>
                </CustomSection>
            </ScrollView>
            
        </SafeAreaView>
    );
};
export default HelpSupport;
