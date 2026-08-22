//import liraries
import { View, Text, StyleSheet, Image, TouchableOpacity} from 'react-native';
import Colors from "../../constants/colors";
import QuantityCard from './QuantityCard';
import Icon from '../Icon';
import { fonts } from "../../constants/typography";
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen'; 
// create a component
interface props{
    productName?:string
    price:number,
    image?:string,
    onDecrease?:()=>void
    onIncrease?:()=>void
    quantity:number

}
const CartCard:React.FC<props> = ({productName, price, image, onDecrease, onIncrease, quantity}) => {
    return (
        <View style={styles.container}>
            <Image style={styles.image} source={{uri:image}}/>
            <View style={styles.contentContainer}>
                <View style={styles.header} >
                    <Text style={styles.product} numberOfLines={2}>{productName}</Text>
                    <TouchableOpacity>
                        <Icon 
                        name='trash-outline' 
                        type='Ionicons'
                        size={wp(6)}
                        color={Colors.primary}
                        />
                    </TouchableOpacity>
                </View>
                <Text style={styles.price}>
                    Rs. {price.toLocaleString()}
                </Text>
                <View style={[styles.header, {marginTop:hp(1.5)}]}>
                    <QuantityCard onDecrease={onDecrease} onIncrease={onIncrease} quantity={quantity}/>
                    <Text style={styles.price}>
                       {(price*quantity).toLocaleString()}
                    </Text>
                </View>
            </View>
        </View>
    );
};

// define your styles
const styles = StyleSheet.create({
    container: {
        borderBottomWidth:0.4,
        borderColor:Colors.secondary,
        //borderRadius:15,
        padding: wp(3),
        flexDirection: 'row',
        alignItems: 'center'

    },
    image:{
        width: wp(25),
        height: wp(25),
        //borderWidth:,
        borderRadius:7,
        marginRight:wp(2)
    },
    contentContainer:{
        //borderWidth:1,
        flex:1,
        justifyContent:'space-between'
    },
    header:{
        //borderWidth:1,
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        //marginBottom:hp(1)
    },
    product:{
        fontSize:wp(3.5),
        fontFamily: fonts.medium,
        color:Colors.text,
        paddingRight:wp(1.5),
        flex:1
    },
    price:{
         fontSize:wp(3.5),
        fontFamily: fonts.displaySemibold,
        color:Colors.primary,
    }
   

});

//make this component available to the app
export default CartCard;
