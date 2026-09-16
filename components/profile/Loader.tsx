import { View, Text, StyleSheet } from 'react-native';
import LottieView from 'lottie-react-native';
import Colors from '../../constants/colors';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
const Loader = () => {
    return (
        <View style={styles.loaderContainer}>
                <LottieView
                source={require('../../assets/animation/loading.json')}
                autoPlay
                loop
                style={styles.loader}
                colorFilters={[
                    {
                        keypath:'*',
                        color: Colors.primary
                    }
                ]}
                    />
            </View>
    );
};

const styles = StyleSheet.create({
    loaderContainer:{
        flex: 1, 
        backgroundColor: Colors.background, 
        justifyContent: 'center', 
        alignItems: 'center' 
    },
    loader:{
        width: wp(15),
        height: wp(15)
    }
});

export default Loader;
