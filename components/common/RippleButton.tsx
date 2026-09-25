import {
  View,
  Text,
  TouchableNativeFeedback,
  StyleSheet,
} from 'react-native';

const TestRipple = () => {
  return (
    <TouchableNativeFeedback
      onPress={() => console.log('PRESSED')}
      background={TouchableNativeFeedback.Ripple('red', true)}
    >
      <View style={styles.button}>
        <Text>Tap Me</Text>
      </View>
    </TouchableNativeFeedback>
  );
};

const styles = StyleSheet.create({
  button: {
    height: 100,
    width: 250,
    backgroundColor: 'white',
    justifyContent: 'center',
    alignItems: 'center',
    margin: 50,
  },
});

export default TestRipple;