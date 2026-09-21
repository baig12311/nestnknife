import { View, Text, StyleSheet} from 'react-native';
import Colors from '../../../constants/colors';
import { fonts } from '../../../constants/typography';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
interface Props {
    heading?: string;
    children: React.ReactNode;
}

const CustomSection: React.FC<Props> = ({ heading, children }) => {
    return (
        <View style={styles.container}>
            {
                heading && (
                    <Text style={styles.heading}>
                {heading}
            </Text>
                )
            }
            

            {children}
        </View>
    );
};

const styles = StyleSheet.create({
 
    container: {
       marginBottom: hp(2)
    },
    heading:{
        fontFamily: fonts.semibold,
        color: Colors.text,
        fontSize: wp(4.5),
    }
    
    

})
export default CustomSection;