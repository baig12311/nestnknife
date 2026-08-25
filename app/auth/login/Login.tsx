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
import { useLogin } from '../../../hooks/useAuth';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const loginMutation = useLogin();

  const handleLogin = async () => {
    if (!email.trim() || !password.trim()) {
      Alert.alert('Missing Info', 'Please enter both email and password.');
      return;
    }

    try {
      await loginMutation.mutateAsync({
        email: email.trim(),
        password,
      });

      router.replace('/profile');
    } catch (error: any) {
      Alert.alert('Login Failed', error?.message ?? 'Please try again.');
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
          <Text style={styles.title}>Welcome Back</Text>
          <Text style={styles.subtitle}>Log in to continue shopping</Text>

          <View style={styles.form}>
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
              placeholder="••••••••"
              placeholderTextColor="#999"
              value={password}
              onChangeText={setPassword}
              secureTextEntry
            />

            <TouchableOpacity
              style={styles.forgotBtn}
              onPress={() => router.push('/auth/ForgotPassword')}
            >
              <Text style={styles.forgotText}>Forgot Password?</Text>
            </TouchableOpacity>

            <Button
              title="Log In"
              onPress={handleLogin}
              loading={loginMutation.isPending}
            />

            <View style={styles.signupRow}>
              <Text style={styles.signupText}>Don't have an account? </Text>
              <TouchableOpacity onPress={() => router.push('/auth/Signup')}>
                <Text style={styles.signupLink}>Sign Up</Text>
              </TouchableOpacity>
            </View>

            <TouchableOpacity
              style={styles.guestBtn}
              onPress={() => router.replace('/')}
            >
              <Text style={styles.guestText}>Continue as Guest</Text>
            </TouchableOpacity>
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
};

export default Login;

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
  forgotBtn: {
    alignSelf: 'flex-end',
    marginTop: hp(1),
    marginBottom: hp(3),
  },
  forgotText: {
    fontSize: wp(3.4),
    color: Colors.primary,
    fontFamily: fonts.regular,
  },
  signupRow: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginTop: hp(2.5),
  },
  signupText: {
    fontSize: wp(3.6),
    color: Colors.secondary,
    fontFamily: fonts.regular,
  },
  signupLink: {
    fontSize: wp(3.6),
    color: Colors.primary,
    fontFamily: fonts.semibold,
  },
  guestBtn: {
    alignItems: 'center',
    marginTop: hp(2),
  },
  guestText: {
    fontSize: wp(3.6),
    color: Colors.secondary,
    fontFamily: fonts.regular,
    textDecorationLine: 'underline',
  },
});