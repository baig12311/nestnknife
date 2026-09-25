import { useState } from 'react';
import { View, Text, StyleSheet, ScrollView} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import styles from './HelpSupportStyle';
import Header from '../../../components/profile/Header';
import { ShadowCard } from '../../../components/common/ShadowCard';
import faqs from '../../../services/faq';
import { router } from 'expo-router';
import CollapsibleRow from '../../../components/profile/CollapsibleRow';
import CustomSection from '../../../components/profile/orderComponents/CustomeSection';
const HelpSupport = () => {
    const [expandedIndex, setExpandedIndex] = useState<number|null>(null)
    return (
        <SafeAreaView style={styles.container}>
            <Header title='Help & Support' onPress={()=>router.replace('/profile')}/>
            <ScrollView
            showsVerticalScrollIndicator={false}
            contentContainerStyle={{paddingBottom: 20}}>
                <CustomSection heading='Frequently Asked Questions (FAQs)'>
                    {/* <ShadowCard containerStyle={styles.containerStyle}> */}
                        <View style={styles.contentContainer}>
                            {
                                faqs.map((item, index)=>{
                                    const expanded=expandedIndex === index
                                    const isOpen=expanded ? null : index
                                    return(
                                        <CollapsibleRow
                                        key={index}
                            isExpand={expanded}
                            question={item.question}
                            answer={item.answer}
                            isLast={index === faqs.length - 1}
                            onPress={()=>setExpandedIndex(isOpen)}
                            />
                                    )
                                })
                            }
                            
                        </View>

                    {/* </ShadowCard> */}
                </CustomSection>
            </ScrollView>
            
        </SafeAreaView>
    );
};
export default HelpSupport;
