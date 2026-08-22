import { StyleSheet, Text, TouchableOpacity } from 'react-native';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import Colors from '../../constants/colors';
interface CategoryCardProps {
  name: string;
};

const CategoryCard:React.FC<CategoryCardProps>=({name})=>{
  return (
    <TouchableOpacity style={styles.container}>
      <Text style={styles.name}>{name}</Text>
    </TouchableOpacity>
  );
}
export default CategoryCard

const styles = StyleSheet.create({
  container: {
    width: wp(30),
    height: hp(8),
    marginRight: wp(20),
    padding: wp(4),
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 14,
    backgroundColor: 'white',
    elevation: 2,
    marginBottom: hp(1),
      //marginTop: hp(1)

  },
  name: {
    fontSize: wp(4),
    fontWeight: '400',
    color: Colors.text,
  },
});