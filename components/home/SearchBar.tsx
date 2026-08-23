import { StyleSheet, TextInput, View } from 'react-native';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import Icon from '../Icon';
import Colors from '../../constants/colors';
import { fonts } from '../../constants/typography';
import { ShadowCard } from '../common/ShadowCard';
interface Props{
  placeholderText?:string,
  value?:string,
  onChangeText?:any
  editable?:boolean,
  onFocus?:any
}
const SearchBar:React.FC<Props> = ({placeholderText, value, onChangeText, editable, onFocus}) => {
  return (
<ShadowCard style={[styles.container, placeholderText==='Seacrh for products...' ? styles.input1
  :styles.input2
]} containerStyle={styles.containerStyle}>
<View style={styles.contentContainer}>
      <Icon name="search-outline" type='Ionicons' size={wp(5)} color="#777" />

      <TextInput
        placeholder={placeholderText}
        value={value}
        onChangeText={onChangeText}
        placeholderTextColor="#888"
        style={styles.input}
        onFocus={onFocus}
        editable={editable}
      />
    </View>
</ShadowCard>
    
  );
}
export default SearchBar;

const styles = StyleSheet.create({
  container: {
    height: hp(5.5),
    
    paddingHorizontal: wp(4),
   
    //backgroundColor: 'white',
    borderRadius: wp(3),
    
  },
  input1:{
    backgroundColor: 'white',
  },
  input2:{
    backgroundColor:Colors.background,
    borderWidth:0.3
    ,
    borderColor:Colors.secondary
  },
  containerStyle:{
width: '100%',
  },
  contentContainer:{
    height:'100%',
    flexDirection: 'row',
    alignItems: 'center',

  },
  input: {
  flex: 1,
  marginLeft: wp(1),
  fontSize: wp(3.5),
  color: '#222',
  fontFamily: fonts.regular,
  includeFontPadding: false,
  textAlignVertical: 'center',
  paddingVertical: 0,
  paddingBottom: hp(0.1)

},
});