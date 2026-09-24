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
            size={wp(5)}
            color={Colors.primary}
            />
            <Text style={styles.title}>{title}</Text>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        width: '25%' ,
        alignItems: 'center',
        justifyContent: 'center',
        padding: wp(1),
        //borderWidth:1,
        borderColor: Colors.secondary,
        borderRadius: wp(2),
    },
    title:{
        fontFamily: fonts.semibold,
        fontSize:wp(2.7),
        color: Colors.primary,
        marginTop: hp(0.3),
        textAlign: 'center'
    }
});

export default TrustBadge;
