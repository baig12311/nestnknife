import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  StyleSheet,
  TouchableOpacity,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  Alert,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { router } from 'expo-router';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import Colors from '../../../constants/colors';
import { fonts } from '../../../constants/typography';
import Button from '../../../components/common/Button';
import { useSignUp } from '../../../hooks/useAuth';

const Signup = () => {
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const signUpMutation = useSignUp();

  const handleSignup = async () => {
    if (!firstName.trim() || !email.trim() || !password.trim()) {
      Alert.alert('Missing Info', 'Please fill in all required fields.');
      return;
    }

    if (password.length < 6) {
      Alert.alert('Weak Password', 'Password must be at least 6 characters.');
      return;
    }

    try {
      await signUpMutation.mutateAsync({
        firstName: firstName.trim(),
        lastName: lastName.trim(),
        email: email.trim(),
        password,
      });

      router.replace('/profile');
    } catch (error: any) {
      Alert.alert('Signup Failed', error?.message ?? 'Please try again.');
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <KeyboardAvoidingView
        style={{ flex: 1 }}
        behavior={Platform.OS === 'ios' ? 'padding' : undefined}
      >
        <ScrollView
          contentContainerStyle={styles.scrollContent}
          keyboardShouldPersistTaps="handled"
        >
          <Text style={styles.title}>Create Account</Text>
          <Text style={styles.subtitle}>Sign up to start shopping</Text>

          <View style={styles.form}>
            <Text style={styles.label}>First Name</Text>
            <TextInput
              style={styles.input}
              placeholder="John"
              placeholderTextColor="#999"
              value={firstName}
              onChangeText={setFirstName}
            />

            <Text style={styles.label}>Last Name</Text>
            <TextInput
              style={styles.input}
              placeholder="Doe"
              placeholderTextColor="#999"
              value={lastName}
              onChangeText={setLastName}
            />

            <Text style={styles.label}>Email</Text>
            <TextInput
              style={styles.input}
              placeholder="you@example.com"
              placeholderTextColor="#999"
              value={email}
              onChangeText={setEmail}
              autoCapitalize="none"
              keyboardType="email-address"
            />

            <Text style={styles.label}>Password</Text>
            <TextInput
              style={styles.input}
              placeholder="At least 6 characters"
              placeholderTextColor="#999"
              value={password}
              onChangeText={setPassword}
              secureTextEntry
            />

            <View style={{ marginTop: hp(3) }}>
              <Button
                title="Sign Up"
                onPress={handleSignup}
                loading={signUpMutation.isPending}
              />
            </View>

            <View style={styles.loginRow}>
              <Text style={styles.loginText}>Already have an account? </Text>
              <TouchableOpacity onPress={() => router.push('/auth/Login')}>
                <Text style={styles.loginLink}>Log In</Text>
              </TouchableOpacity>
            </View>
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
};

export default Signup;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  scrollContent: {
    flexGrow: 1,
    paddingHorizontal: wp(6),
    paddingTop: hp(6),
    paddingBottom: hp(4),
  },
  title: {
    fontSize: wp(7),
    fontFamily: fonts.semibold,
    color: Colors.text,
    marginBottom: hp(0.5),
  },
  subtitle: {
    fontSize: wp(3.8),
    fontFamily: fonts.regular,
    color: Colors.secondary,
    marginBottom: hp(4),
  },
  form: {
    gap: hp(0.5),
  },
  label: {
    fontSize: wp(3.5),
    fontFamily: fonts.regular,
    color: Colors.text,
    marginBottom: hp(0.8),
    marginTop: hp(1.5),
  },
  input: {
    borderWidth: 0.5,
    borderColor: Colors.secondary,
    borderRadius: wp(2),
    paddingHorizontal: wp(4),
    height: hp(6),
    fontSize: wp(3.8),
    color: Colors.text,
    fontFamily: fonts.regular,
  },
  loginRow: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginTop: hp(2.5),
  },
  loginText: {
    fontSize: wp(3.6),
    color: Colors.secondary,
    fontFamily: fonts.regular,
  },
  loginLink: {
    fontSize: wp(3.6),
    color: Colors.primary,
    fontFamily: fonts.semibold,
  },
});