import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import Icon from '../Icon';
import Animated, {useAnimatedStyle, useSharedValue, withTiming} from 'react-native-reanimated';
import {
    widthPercentageToDP as wp,
    heightPercentageToDP as hp
} from 'react-native-responsive-screen';
import { fonts } from '../../constants/typography';
import Colors from '../../constants/colors';
import { useEffect } from 'react';
interface Props {
    isExpand?: boolean
    onPress?: () => void
    question: string
    answer: string
    isLast?:boolean
}
const CollapsibleRow: React.FC<Props> = ({isLast, isExpand, onPress, question, answer }) => {
    const iconRotate = useSharedValue(0)
    const animatedIcon = useAnimatedStyle(()=>{
        return {
            transform:[
                {
                    rotate:`${iconRotate.value}deg`
                }
            ]
        }
    })
    useEffect(()=>{
        iconRotate.value = withTiming(isExpand ? 180 : 0, {
            duration: 250
        })
    }, [isExpand])
    return (
        <View style={[styles.container, 
            !isLast && {borderBottomWidth:0.3}
        ]}>
            <TouchableOpacity
                style={styles.row}
                activeOpacity={0.7}
                onPress={onPress}
            >
                <Text style={styles.text}>{question}</Text>
                <Animated.View style={animatedIcon}>
                    <Icon
                    name='chevron-small-down'
                    type='Entypo'
                    size={wp(7)}
                    color={Colors.text}
                />
                </Animated.View>
                
            </TouchableOpacity>
            {
                isExpand && (
                    <View style={styles.ansContainer}>
                        <Text style={styles.textAns}>
                            {answer}
                        </Text>
                    </View>
                )
            }
        </View>

    );
};

const styles = StyleSheet.create({
    container: {
        paddingVertical:hp(1),
        //paddingHorizontal:wp(2),
        borderColor: Colors.secondary,
        // borderStyle: 'dashed',
       
    },
    row: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
         //width: '100%'
    },
    text: {
        fontFamily: fonts.medium,
        color: Colors.text,
        fontSize: wp(3.7),
        flex:1,
       
    },
    textAns:{
        fontFamily: fonts.regular,
        color: Colors.secondary,
        fontSize: wp(3.3)
    },
    ansContainer:{
        paddingHorizontal:wp(2),
    }
});

//make this component available to the app
export default CollapsibleRow;
