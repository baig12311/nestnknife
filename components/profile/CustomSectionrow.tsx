
import { View, Text, StyleSheet } from 'react-native';
import Icon from '../Icon';
import Colors from '../../constants/colors';
import { fonts } from '../../constants/typography';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
interface Props{
    paddingHorizontal?:number
    paddingVertical?:number
    iconName?:string
    iconType?:string
    mainText?:string
    subText?:string
    borderBottomWidth?:number
    status?:string
}
const CustomSectionRow:React.FC<Props> = ({paddingHorizontal,
    paddingVertical,
    iconName,
    iconType,
    mainText,
    subText,
    borderBottomWidth,
    status
}) => {
    return (
        <View style={[styles.container, {paddingHorizontal:paddingHorizontal, 
        paddingVertical: paddingVertical,
        borderBottomWidth: borderBottomWidth}]}>
           {iconName && iconType ? (
            <View style={styles.icon}>
                 <Icon
          name={iconName}
          type={iconType}
          size={wp(7)}
          color={Colors.text}
        />
            </View>
       
      ) : null}
            <View style={styles.textContainer}>
                <Text style={styles.mainText}>{mainText}</Text>
                {
                    subText && (<Text style={styles.subtext}>{subText}</Text>)
                }
                 
            </View>
            <Text style={styles.textStatus}>{status}</Text>
             <Icon
            name='chevron-small-right'
            type='Entypo'
            size={wp(7)}
            color={Colors.text}
            />
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        borderColor: Colors.secondary
    },
    textContainer:{
        flex:1
    },
    mainText:{
         fontFamily: fonts.semibold,
        color: Colors.text,
        fontSize: wp(4)
    },
    subtext:{
        fontFamily: fonts.regular,
        color: Colors.secondary,
        fontSize: wp(3.2)
    },
    textStatus:{
          color: '#C84037',
          fontFamily: fonts.medium,
          fontSize: wp(3.2),
          marginRight: wp(2),
    },
     icon: {
        width: wp(12),
        height: wp(12),
        borderRadius: wp(6),
        backgroundColor: Colors.background,

        justifyContent: 'center',
        alignItems: 'center',
        marginRight: wp(4)
    },
});

//make this component available to the app
export default CustomSectionRow;
