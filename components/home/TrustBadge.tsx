import { View, Text, StyleSheet } from 'react-native';
import Colors from '../../constants/colors';
import { fonts } from '../../constants/typography';
import { widthPercentageToDP as wp, 
    heightPercentageToDP as hp } from 'react-native-responsive-screen';
import Icon from '../Icon';
interface Props{
    name:string,
    type:string,
    title?:string
}
const TrustBadge:React.FC<Props> = ({name, type, title}) => {
    return (
        <View style={styles.container}>
            
            <Icon
            name={name}
            type={type}
            size={wp(7)}
            color={Colors.primary}
            />
            <Text style={styles.title}>{title}</Text>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        width: '49.5%' ,
        alignItems: 'center',
        paddingVertical: hp(1),
        borderWidth:0.5,
        borderColor: Colors.secondary,
        borderRadius: wp(2),
        marginVertical: wp(0.5)
    },
    title:{
        fontFamily: fonts.semibold,
        fontSize:wp(3),
        color: Colors.text,
        marginTop: hp(1)
    }
});

export default TrustBadge;
