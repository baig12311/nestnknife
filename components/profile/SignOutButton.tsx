
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import Colors from '../../constants/colors';
import { fonts } from '../../constants/typography';
import Icon from '../Icon';
import { ShadowCard } from '../common/ShadowCard';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
interface Props{
    onPress?:()=>void
}
const SignOut:React.FC<Props> = ({onPress}) => {
    return (
        <ShadowCard style={styles.container} 
        containerStyle={styles.containerStyle}
        >
            <TouchableOpacity style={styles.button} activeOpacity={0.7} onPress={onPress}>
                <View style={styles.icon}>
                    <Icon
                    name='log-out-outline'
                    type='Ionicons'
                    size={wp(8)}
                    color='#C84037'
                />
                </View>
                
                <Text style={styles.text}>Sign Out</Text>
            </TouchableOpacity>
        </ShadowCard>

    );
};

const styles = StyleSheet.create({
    container: {
       
        height: hp(6),
        //overflow: 'hidden'
    },
    containerStyle: {
        width: '100%'
    },
    button: {
        justifyContent: 'center',
         borderRadius: wp(2),
        alignItems: 'center',
        flexDirection: 'row',
        borderColor:Colors.secondary,
        height:'100%',
        paddingLeft:wp(2),
        borderWidth:0.3
    },
    text: {
        fontFamily: fonts.semibold,
        fontSize: wp(5),
        color: '#C84037',
        textAlign: 'center'
    },
    icon:{
        position:'absolute',
        left:wp(2)
    }
});

//make this component available to the app
export default SignOut;
