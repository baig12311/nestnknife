import { View, Text, StyleSheet, Image} from 'react-native';
import Colors from '../../../constants/colors';
import { fonts } from '../../../constants/typography';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
interface Props{
    itemName?:string
    quantity?:number
    itemPrice?:number
    image:any
}
const OrderItemCard:React.FC<Props> = ({itemName, itemPrice, quantity, image}) => {
    const formatPrice = Number(itemPrice?.toString())
    return (
        <View style={styles.container}>
            <Image 
            source={{uri:image}}
            style={styles.image}
            />         
            <View style={styles.textContainer}>
                <Text style={styles.txtName} numberOfLines={2}>{itemName}</Text>
                <Text style={styles.txtQuantity}>Qty: {quantity}</Text>
                </View>   
            <Text style={styles.txtPrice}>{formatPrice}</Text>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        alignItems:'center',
        padding:wp(2)
    },
    image:{
        width: wp(14),
        height: wp(14),
        borderRadius: wp(2)
    },
    textContainer:{
        flex:1,
        marginLeft: wp(3),
        marginRight: wp(3)

    },
    txtName:{
        fontSize:wp(3.2),
        fontFamily: fonts.medium,
        color:Colors.text
    },
    txtQuantity:{
        fontSize:wp(3.2),
        fontFamily: fonts.medium,
        color: Colors.secondary
    },
    txtPrice:{
        fontSize:wp(3.5),
        fontFamily: fonts.medium,
        color: Colors.primary
    }

});

export default OrderItemCard;
