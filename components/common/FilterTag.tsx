
import { TouchableOpacity, Text, StyleSheet } from 'react-native';
import Icon from '../Icon';
import Colors from '../../constants/colors';
import { fonts } from '../../constants/typography';
import { widthPercentageToDP as wp,
    heightPercentageToDP as hp
 } from 'react-native-responsive-screen';
 interface Props{
    tagTitle?:string
    onRemove?:()=>void
 }
const FilterTag:React.FC<Props> = ({tagTitle, onRemove}) => {
    return (
        <TouchableOpacity 
        style={styles.container}
        activeOpacity={0.7}
        onPress={onRemove}
        >
            <Text style={styles.text}>{tagTitle}</Text>
            <Icon
            name='cross'
            type='Entypo'
            color={Colors.primary}
            size={wp(4)}
            />
        </TouchableOpacity>
    );
};

const styles = StyleSheet.create({
    container: {
        borderWidth:0.3,
        borderColor:Colors.secondary,
        flexDirection: 'row',
        paddingHorizontal: wp(2),
        paddingVertical:wp(0.5),
        backgroundColor: Colors.secondaryBackground,
        borderRadius: 50,
        alignItems: 'center'
    },
    text:{
        fontFamily:fonts.regular,
        fontSize:wp(3),
        color: Colors.primary,
        marginRight: wp(1)
    }
});

export default FilterTag;
