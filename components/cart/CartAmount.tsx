import { View, Text, StyleSheet } from 'react-native';
import Colors from "../../constants/colors";
import { fonts } from "../../constants/typography";
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen'; 
interface Props{
    title?:string
    amount?:string,
    borderWidth?:number
    padding?:number
    margin?:number
}
const CartAmount:React.FC<Props>= ({title, amount, borderWidth, padding, margin}) => {
    return (
        <View style={[styles.container, {borderTopWidth:borderWidth, paddingTop:padding, marginBottom: margin}]}>
            <Text style={[styles.text, styles.title]}>{title}</Text>
             <Text style={[styles.text, styles.amount]}>{amount}</Text>
        </View>
    );
};

// define your styles
const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        borderColor: Colors.secondary
    },
    text:{
        fontSize: wp(3.9),
        lineHeight: 25
    },
    title:{
        color:Colors.text,
        fontFamily:fonts.semibold
    },
    amount:{
        color:Colors.primary,
        fontFamily: fonts.displaySemibold
    }
});

//make this component available to the app
export default CartAmount;
