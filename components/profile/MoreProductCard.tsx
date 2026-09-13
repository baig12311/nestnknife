import { View, Text, StyleSheet } from 'react-native';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import Colors from '../../constants/colors';
import { fonts } from '../../constants/typography';
interface Props {
    name?: string
    quantity?: number
}
const MoreProductCard: React.FC<Props> = ({ name, quantity }) => {
    return (
        <View style={styles.container}>
            <Text style={styles.name} numberOfLines={1}>16 in 1 Vegetable Cutter & Slicer</Text>

            <Text style={styles.quantity}>× 1</Text>

        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        borderBottomWidth: 0.3,
        borderColor:Colors.secondary,
        paddingVertical: wp(2),
        flexDirection: 'row',
        alignItems: 'center'

    },
    name: {
        fontFamily: fonts.medium,
        fontSize: wp(3.5),
        color: Colors.text,
        flex:1
    },
    quantity:{
        fontFamily: fonts.medium,
        fontSize: wp(3.5),
        color: Colors.text,
    }

});

//make this component available to the app
export default MoreProductCard;
