import { useState } from 'react';
import { View, Text} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import styles from './HelpDetailStyle';
import Header from '../../../components/profile/Header';
import { helpData } from '../../../services/helpData';
import { router } from 'expo-router';
import { ShadowCard } from '../../../components/common/ShadowCard';
import CollapsibleRow from '../../../components/profile/CollapsibleRow';
import { useLocalSearchParams } from 'expo-router';
type HelpType = keyof typeof helpData;
const HelpDetail = () => {
    const {type} = useLocalSearchParams<{
        type:HelpType
    }>()
    const [expandedIndex, setExpandedIndex] = useState<number|null>(null)
    const content = helpData[type]
    const questions = content.questions
    console.log('Data: ', content)
    console.log('Screen: ', type)
    return (
        <SafeAreaView style={styles.container}>
            <Header
            title={content.title}
            onPress={()=>router.back()}/>
            <Text style={styles.heading}>Find answers about your {content.title.toLowerCase()}</Text>
            <ShadowCard containerStyle={styles.containerStyle}>
                        <View style={styles.contentContainer}>
                            {
                                questions.map((item, index)=>{
                                    const expanded=expandedIndex === index
                                    const isOpen=expanded ? null : index
                                    return(
                                        <CollapsibleRow
                                        key={index}
                            isExpand={expanded}
                            question={item.question}
                            answer={item.answer}
                            isLast={index === questions.length - 1}
                            onPress={()=>setExpandedIndex(isOpen)}
                            />
                                    )
                                })
                            }
                            
                        </View>

                    </ShadowCard>
        </SafeAreaView>
    );
};


export default HelpDetail;
