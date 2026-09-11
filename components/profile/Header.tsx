import { View, Text, StyleSheet, TouchableOpacity} from 'react-native';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import Icon from '../Icon';
import Colors from '../../constants/colors';
import { fonts } from '../../constants/typography';
import { router } from 'expo-router';
interface Props{
    title?:string
}
const Header:React.FC<Props> = ({title}) => {
    return (
       <View style={styles.iconContainer}>
                <TouchableOpacity onPress={() => router.replace('/(tabs)/profile')} style={{ marginRight: wp(4) }} activeOpacity={0.7}>
                    <Icon name="arrow-back" type='MaterialIcons' size={wp(6)} color={Colors.text} />
                </TouchableOpacity>



                <Text style={styles.title}>{title}</Text>

            </View>
    );
};

const styles = StyleSheet.create({
   
     iconContainer: {
            flexDirection: 'row',
            alignItems: 'center',
            marginBottom: hp(2)
        },
        title: {
        fontSize: wp(5),
        fontFamily: fonts.semibold,
        color: Colors.text,
        textAlign: 'center',
    },
});

//make this component available to the app
export default Header;
