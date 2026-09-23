import { View, Text, StyleSheet, TouchableOpacity} from 'react-native';
import Colors from '../../constants/colors';
import { fonts } from "../../constants/typography";
import { widthPercentageToDP as wp, 
    heightPercentageToDP as hp } from 'react-native-responsive-screen';
import Icon from '../Icon';
    interface Props{
        iconName:string
        iconType:string
        mainText?:string
        subText?:string
        onPress?:()=>void
    }
const ContactCard:React.FC<Props> = ({iconName, iconType, mainText, subText, onPress}) => {
    return (
        <TouchableOpacity 
        style={styles.container}
        activeOpacity={0.7}
        onPress={onPress}
        >
            <View style={styles.icon}>
                <Icon
                name={iconName}
                type={iconType}
                color={Colors.primary}
                size={wp(8)}
                />
            </View>
            <View style={styles.textContainer}>
                <Text style={styles.main}>{mainText}</Text>
                <Text style={styles.sub}>{subText}</Text>
            </View>
            <Icon
                name='chevron-small-right'
                type='Entypo'
                size={wp(7)}
                color={Colors.text}
            />
        </TouchableOpacity>
    );
};

const styles = StyleSheet.create({
    container: {
        borderWidth:1,
        flexDirection: 'row',
        alignItems: 'center',
        borderRadius: wp(2),
        borderColor: Colors.secondary2,
        padding: wp(3),
        marginBottom: hp(1),
        backgroundColor: 'white'
    },
    icon:{
        width: wp(14),
        height: wp(14),
        borderRadius: wp(7),
        backgroundColor: Colors.secondaryBackground,
        justifyContent: 'center',
        alignItems: 'center'
    },
    textContainer:{
        marginLeft: wp(3),
        flex:1
    },
    main:{
        fontFamily: fonts.semibold,
        fontSize: wp(4),
        color:Colors.text
    },
    sub:{
        fontFamily: fonts.regular,
        fontSize: wp(3.2),
        color:Colors.secondary   
    },
});

export default ContactCard;
