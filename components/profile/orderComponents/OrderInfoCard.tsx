import { View, Text, StyleSheet } from 'react-native';
import Icon from '../../Icon';
import Colors from '../../../constants/colors';
import { fonts } from '../../../constants/typography';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
interface Props{
    iconName:string
    iconType:string
    title?:string
    desc?:string
}
const OrderInfoCard:React.FC<Props> = ({iconName, iconType, title, desc}) => {
    return (
        <View style={styles.container}
        >
            <View style={styles.iconContainer}>
                <Icon
                name={iconName}
                type={iconType}
                color={Colors.primary}
                size={wp(6)}
                />
            </View>
            <View style={styles.textContainer}>
                <Text style={styles.txtTitle}>{title}</Text>
            <Text style={styles.txtDesc}>{desc}</Text>
            </View>
            
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        width: '100%',
        flexDirection: 'row',
        marginVertical:hp(0.5),
        
    },
    iconContainer:{
        width: wp(10),
        height: wp(10),
        borderRadius: wp(5),
        backgroundColor: '#E8F0EA',
        justifyContent: 'center',
        alignItems: 'center'
    },
    textContainer:{
        marginLeft: wp(2)
    },
    txtTitle:{
        fontFamily: fonts.medium,
        fontSize: wp(3),
        color: Colors.secondary
    },
    txtDesc:{
        fontFamily: fonts.medium,
        fontSize: wp(3.3),
        color: Colors.primary
    }
});

export default OrderInfoCard;
