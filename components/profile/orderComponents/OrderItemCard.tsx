import { View, Text, StyleSheet, Image} from 'react-native';
import Colors from '../../../constants/colors';
import { fonts } from '../../../constants/typography';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
interface Props{
    itemName?:string
    quantity:number
    itemPrice:number
    image:any
    showBorder?:boolean
}
const OrderItemCard:React.FC<Props> = ({itemName, itemPrice, quantity, image, showBorder}) => {
    const total = quantity * itemPrice
    const formatTotal = total?.toLocaleString()
    return (
        <View style={[styles.container,styles.borderApply]}>
            <Image 
            source={{uri:image}}
            style={styles.image}
            />
            <View style={styles.contentContainer}>
                <Text numberOfLines={2} style={styles.txtName}>{itemName}</Text>
                <View style={styles.priceContainer}>
                    <Text style={styles.txtQuantity}>Qty: {quantity}</Text>
                    <Text style={styles.txtPrice}>PKR {formatTotal}</Text>
                </View>
            </View>         
            {/* <View style={styles.textContainer}>
                <Text style={styles.txtName} numberOfLines={2}>{itemName}</Text>
                
                </View>   
             */}
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        alignItems:'center',
        paddingVertical:wp(2)
    },
    image:{
        width: wp(14),
        height: wp(14),
        borderRadius: wp(2)
    },
    txtName:{
        fontSize:wp(3.2),
        fontFamily: fonts.medium,
        color:Colors.text,
        marginBottom: wp(1)
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
    },
    priceContainer:{
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center'
    },
    contentContainer:{
        flex:1,
        marginLeft: wp(3)
    },
    borderApply:{
        borderBottomWidth:0.3,
        borderColor: Colors.secondary
    }

});

export default OrderItemCard;
