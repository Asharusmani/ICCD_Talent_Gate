import { FontAwesome } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import { Eye, EyeOff } from 'lucide-react-native';
import React, { useState } from 'react';
import { Controller, useForm } from 'react-hook-form';
import { Image } from 'react-native';
import { useLogin } from "@/api/client/user"
import PrimaryButton from '@/components/ui/PrimaryButton';

import {
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { useAppSelector } from '@/hooks/use-apply-project';

// ─── DARK MODE COLORS ───────────────────────────────────────────────
// const PRIMARY = '#225b6b';
// const MID = '#1a4455';
// const DARK = '#0f2a35';
// const DARKEST = '#091e27';
// const ACCENT = '#4ecdc4';
// const BORDER = 'rgba(255,255,255,0.10)';
// const TEXT_PRIMARY = '#ffffff';
// const TEXT_SECONDARY = 'rgba(255,255,255,0.50)';
// ────────────────────────────────────────────────────────────────────

// ─── LIGHT MODE COLORS ──────────────────────────────────────────────
const PRIMARY = '#7dd3fc';
const MID = '#bae6fd';
const DARK = '#e0f2fe';
const DARKEST = '#f0f9ff';
const ACCENT = '#0d9488';
const BORDER = 'rgba(14,165,233,0.20)';
const TEXT_PRIMARY = '#0f172a';
const TEXT_SECONDARY = 'rgba(15,23,42,0.50)';
// ────────────────────────────────────────────────────────────────────

export default function LoginScreen() {
  const router = useRouter();
  const projectData = useAppSelector(state => state.applyProject.applyProjectData);
  const [showPassword, setShowPassword] = useState(false);
  const { control, handleSubmit, formState: { errors } } = useForm();
  const { userLogin, error, isPending, isError } = useLogin();

  const onSubmit = (data: any) => { userLogin(data); };

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === 'ios' ? 'padding' : undefined}
      style={styles.container}
    >
      <LinearGradient
        colors={[DARKEST, DARK, MID, PRIMARY]}
        style={styles.fullBackground}
        start={{ x: 0, y: 0 }}
        end={{ x: 0.6, y: 1 }}
      >
        <ScrollView
          contentContainerStyle={styles.scrollContent}
          showsVerticalScrollIndicator={false}
        >
          {/* Top Section */}
          <View style={styles.topSection}>
            <View style={styles.logoWrap}>
              <Image
                source={require('@/assets/images/iccd-login-logo.png')}
                style={styles.logo}
                resizeMode="contain"
              />
            </View>
            <Text style={styles.heading}>Welcome Back</Text>
            <Text style={styles.subHeading}>Sign in to continue your journey</Text>
          </View>

          {/* Form Card */}
          <View style={styles.formCard}>

            {/* Email */}
            <View style={styles.inputWrapper}>
              <Text style={styles.label}>Email Address</Text>
              <Controller
                control={control}
                name="email"
                rules={{
                  required: 'Email is required',
                  pattern: { value: /\S+@\S+\.\S+/, message: 'Invalid email format' },
                }}
                render={({ field: { onChange, value } }) => (
                  <View style={[styles.inputContainer, errors.email && styles.inputError]}>
                    <FontAwesome name="envelope-o" size={15} color={ACCENT} style={styles.inputIcon} />
                    <TextInput
                      style={styles.input}
                      placeholder="Enter your email"
                      placeholderTextColor="rgba(15,23,42,0.30)"  // dark: "rgba(255,255,255,0.28)"
                      keyboardType="email-address"
                      autoCapitalize="none"
                      textContentType="emailAddress"
                      value={value}
                      onChangeText={onChange}
                    />
                  </View>
                )}
              />
              {errors.email && <Text style={styles.errorText}>{String(errors.email?.message)}</Text>}
            </View>

            {/* Password */}
            <View style={styles.inputWrapper}>
              <Text style={styles.label}>Password</Text>
              <Controller
                control={control}
                name="password"
                rules={{
                  required: 'Password is required',
                  minLength: { value: 6, message: 'Password must be at least 6 characters' },
                }}
                render={({ field: { onChange, value } }) => (
                  <View style={[styles.inputContainer, errors.password && styles.inputError]}>
                    <FontAwesome name="lock" size={17} color={ACCENT} style={styles.inputIcon} />
                    <TextInput
                      style={styles.input}
                      placeholder="Enter your password"
                      placeholderTextColor="rgba(15,23,42,0.30)"  // dark: "rgba(255,255,255,0.28)"
                      secureTextEntry={!showPassword}
                      textContentType="password"
                      value={value}
                      onChangeText={onChange}
                    />
                    <TouchableOpacity onPress={() => setShowPassword(!showPassword)} style={styles.eyeButton}>
                      {showPassword
                        ? <Eye size={18} color={ACCENT} />
                        : <EyeOff size={18} color="rgba(15,23,42,0.35)" />  // dark: "rgba(255,255,255,0.35)"
                      }
                    </TouchableOpacity>
                  </View>
                )}
              />
              {errors.password && <Text style={styles.errorText}>{String(errors.password?.message)}</Text>}
            </View>

            {isError && (
              <View style={styles.errorBox}>
                <FontAwesome name="exclamation-circle" size={13} color="#ff6b6b" style={{ marginRight: 8 }} />
                <Text style={styles.errorBoxText}>{error}</Text>
              </View>
            )}

            {/* Forgot */}
            <TouchableOpacity style={styles.forgotPassword}>
              <Text style={styles.forgotText}>Forgot Password?</Text>
            </TouchableOpacity>

            {/* Sign In Button */}
            <PrimaryButton label="Sign In" onPress={handleSubmit(onSubmit)} />

            {/* Divider */}
            <View style={styles.dividerContainer}>
              <View style={styles.divider} />
              <Text style={styles.dividerText}>OR</Text>
              <View style={styles.divider} />
            </View>

            {/* Google */}
            <TouchableOpacity style={styles.googleButton} activeOpacity={0.8}>
              <Image
                source={require('@/assets/images/google.png')}
                style={styles.googleIcon}
                resizeMode="contain"
              />
              <Text style={styles.googleText}>Continue with Google</Text>
            </TouchableOpacity>

            {/* Sign Up */}
            <View style={styles.signupContainer}>
              <Text style={styles.signupText}>Don't have an account? </Text>
              <TouchableOpacity onPress={() => router.push('/sign-up' as unknown as any)}>
                <Text style={styles.signupLink}>Sign Up</Text>
              </TouchableOpacity>
            </View>

          </View>
        </ScrollView>
      </LinearGradient>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1 },
  fullBackground: { flex: 1 },
  scrollContent: { flexGrow: 1, paddingBottom: 20 },

  topSection: {
    alignItems: 'center',
    paddingTop: 85,
    paddingBottom: 44,
    paddingHorizontal: 24,
  },
  logoWrap: {
    width: 90,
    height: 90,
    borderRadius: 45,
    backgroundColor: 'rgba(255,255,255,0.60)',   // dark: 'rgba(78,205,196,0.13)'
    borderWidth: 2,
    borderColor: 'rgba(13,148,136,0.35)',        // dark: 'rgba(78,205,196,0.3)'
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 26,
  },
  logo: {
    width: 66,
    height: 66,
    borderRadius: 33,
    tintColor: '#0d9488',
    
  },
  heading: {
    fontSize: 35,
    fontWeight: '800',
    color: TEXT_PRIMARY,
    marginBottom: 8,
    letterSpacing: 0.2,
  },
  subHeading: {
    fontSize: 15,
    color: TEXT_SECONDARY,
    textAlign: 'center',
    lineHeight: 22,
  },

  formCard: {
    marginHorizontal: 16,
    backgroundColor: 'rgba(255,255,255,0.70)',   // dark: 'rgba(255,255,255,0.05)'
    borderRadius: 28,
    borderWidth: 1,
    borderColor: BORDER,
    paddingHorizontal: 24,
    paddingTop: 34,
    paddingBottom: 28,
  },

  inputWrapper: { marginBottom: 20 },
  label: {
    fontSize: 11,
    fontWeight: '700',
    color: 'rgba(15,23,42,0.55)',                // dark: 'rgba(255,255,255,0.55)'
    marginBottom: 8,
    letterSpacing: 1,
    textTransform: 'uppercase',
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'rgba(255,255,255,0.85)',   // dark: 'rgba(255,255,255,0.07)'
    borderRadius: 14,
    borderWidth: 1,
    borderColor: BORDER,
    paddingHorizontal: 16,
    height: 54,
  },
  inputError: { borderColor: '#ff6b6b' },
  inputIcon: { marginRight: 12 },
  input: { flex: 1, fontSize: 15, color: TEXT_PRIMARY },
  eyeButton: { padding: 6 },
  errorText: { color: '#ff6b6b', fontSize: 12, marginTop: 6, marginLeft: 4 },

  errorBox: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'rgba(255,107,107,0.12)',
    padding: 12,
    borderRadius: 12,
    marginBottom: 12,
    borderWidth: 1,
    borderColor: 'rgba(255,107,107,0.22)',
  },
  errorBoxText: { color: '#ff6b6b', fontSize: 13, flex: 1 },

  forgotPassword: { alignSelf: 'flex-end', marginBottom: 15 },
  forgotText: { color: ACCENT, fontSize: 13, fontWeight: '600' },

  loginButton: {
    borderRadius: 14,
    overflow: 'hidden',
    shadowColor: ACCENT,
    shadowOffset: { width: 0, height: 6 },
    shadowOpacity: 0.4,
    shadowRadius: 14,
    elevation: 10,
  },
  loginGradient: {
    paddingVertical: 17,
    alignItems: 'center',
    justifyContent: 'center',
  },
  loginButtonText: {
    color: DARKEST,
    fontSize: 17,
    fontWeight: '800',
    letterSpacing: 0.5,
  },

  dividerContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: 26,
  },
  divider: { flex: 1, height: 1, backgroundColor: BORDER },
  dividerText: {
    marginHorizontal: 14,
    color: TEXT_SECONDARY,
    fontSize: 13,
    fontWeight: '600',
  },

  googleButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'rgba(255,255,255,0.85)',   // dark: 'rgba(255,255,255,0.07)'
    borderRadius: 14,
    borderWidth: 1,
    borderColor: BORDER,
    paddingVertical: 15,
  },
  googleIcon: { width: 22, height: 22, marginRight: 10 },
  googleText: { color: TEXT_PRIMARY, fontSize: 15, fontWeight: '600' },

  signupContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginTop: 26,
  },
  signupText: { color: TEXT_SECONDARY, fontSize: 14 },
  signupLink: { color: ACCENT, fontSize: 14, fontWeight: '800' },
});