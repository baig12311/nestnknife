import { useEffect } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { fonts } from '../../constants/typography';
import Colors from '../../constants/colors';
import Animated, { FadeInDown, FadeOutUp } from 'react-native-reanimated';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
type toastType = 'success' | 'error'
interface Props {
    messageTitle?: string
    messageDescription?: string
    visible?: boolean
    type?: toastType
    onHide: () => void
}
const CustomToast: React.FC<Props> = ({ messageDescription, messageTitle, visible, onHide, type }) => {
    const toastColor = type === 'success' ? '#2E7D5B' : '#C84037'
    useEffect(() => {
        if (!visible) {
            return
        }
        const timer = setTimeout(() => {
            onHide()
        }, 3000)
        return () => {
            clearTimeout(timer)
        }
    }, [visible, onHide])
    if (!visible) {
        return null
    }
    return (
        <Animated.View
            style={[styles.container, { borderColor: toastColor }]}
            entering={FadeInDown.springify()
                .damping(18)
                .stiffness(180)}
            exiting={FadeOutUp.duration(250)}
        >
            <Text style={[styles.txtHeading, { color: toastColor }]}>{messageTitle}</Text>
            <Text style={styles.txtDescription}>{messageDescription}</Text>

        </Animated.View>
    );
};

const styles = StyleSheet.create({
    container: {
        position: 'absolute',
        width: '100%',
        alignSelf: 'center',
        borderRadius: wp(2),
        padding: wp(3),
        backgroundColor: 'white',
        zIndex: 10,
        top: hp(6),
        borderLeftWidth: 4,
        elevation: 5
    },
    txtHeading: {
        fontFamily: fonts.semibold,
        fontSize: wp(4),
        //color: Colors.text
    },
    txtDescription: {
        fontFamily: fonts.regular,
        fontSize: wp(3.5),
        color: Colors.secondary

    }
});

//make this component available to the app
export default CustomToast;
