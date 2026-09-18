import { View, Text, StyleSheet } from 'react-native';
import Colors from '../../../constants/colors';
import { fonts } from '../../../constants/typography';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
interface Props{
    title?:string
    data?:string
}
const PriceSectionRow:React.FC<Props> = ({title, data}) => {
    return (
        <View style={[styles.container, title==='Total'&& styles.totalContainer]}>
            <Text style={[styles.text, title==='Total'&&styles.totalText]}>{title}</Text>
            <Text style={[styles.text, title==='Total'&&styles.totalText]}>{data}</Text>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center'
    },
    text:{
        fontFamily: fonts.medium,
        color: Colors.secondary,
        fontSize: wp(3.5)
    },
    totalText:{
        fontFamily:fonts.displaySemibold,
        fontSize: wp(4.5),
        color: Colors.primary
    },
    totalContainer:{
        borderTopWidth: 0.3, 
        borderColor: Colors.secondary,
        //marginTop: wp(2),
        paddingTop:wp(1)
    }
});

//make this component available to the app
export default PriceSectionRow;
