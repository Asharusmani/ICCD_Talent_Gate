import { FontAwesome } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import { ArrowLeft, User, Mail } from 'lucide-react-native';
import React from 'react';
import { Image } from 'react-native';
import { Controller, useForm } from 'react-hook-form';
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

export default function SignUpScreen() {
    const router = useRouter();
    const { control, handleSubmit, formState: { errors } } = useForm();

    const onSubmit = (data: any) => {
        console.log('Form Data:', data);
        router.push('/login' as unknown as any);
    };

    return (
        <KeyboardAvoidingView
            behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
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
                        <TouchableOpacity onPress={() => router.back()} style={styles.backButton}>
                            <ArrowLeft size={20} color={TEXT_PRIMARY} />
                        </TouchableOpacity>

                        <View style={styles.logoWrap}>
                            <Image
                                source={require('../../assets/images/iccd-login-logo.png')}
                                style={styles.logo}
                                resizeMode="contain"
                            />
                        </View>
                        <Text style={styles.heading}>Create Account</Text>
                        <Text style={styles.subHeading}>Join us and start your journey today</Text>
                    </View>

                    {/* Form Card */}
                    <View style={styles.formCard}>

                        {/* Name Row */}
                        <View style={styles.nameRow}>
                            <View style={styles.nameInputWrapper}>
                                <Text style={styles.label}>First Name</Text>
                                <Controller
                                    control={control}
                                    name="firstName"
                                    rules={{ required: 'Required' }}
                                    render={({ field: { onChange, value } }) => (
                                        <View style={[styles.inputContainer, errors.firstName && styles.inputError]}>
                                            <User size={15} color={ACCENT} style={styles.inputIcon} />
                                            <TextInput
                                                style={styles.input}
                                                placeholder="First Name"
                                                placeholderTextColor="rgba(15,23,42,0.30)"  // dark: "rgba(255,255,255,0.28)"
                                                value={value}
                                                onChangeText={onChange}
                                            />
                                        </View>
                                    )}
                                />
                                {errors.firstName && (
                                    <Text style={styles.errorText}>{String(errors.firstName?.message)}</Text>
                                )}
                            </View>

                            <View style={styles.nameInputWrapper}>
                                <Text style={styles.label}>Last Name</Text>
                                <Controller
                                    control={control}
                                    name="lastName"
                                    rules={{ required: 'Required' }}
                                    render={({ field: { onChange, value } }) => (
                                        <View style={[styles.inputContainer, errors.lastName && styles.inputError]}>
                                            <User size={15} color={ACCENT} style={styles.inputIcon} />
                                            <TextInput
                                                style={styles.input}
                                                placeholder="Last Name"
                                                placeholderTextColor="rgba(15,23,42,0.30)"  // dark: "rgba(255,255,255,0.28)"
                                                value={value}
                                                onChangeText={onChange}
                                            />
                                        </View>
                                    )}
                                />
                                {errors.lastName && (
                                    <Text style={styles.errorText}>{String(errors.lastName?.message)}</Text>
                                )}
                            </View>
                        </View>

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
                                        <Mail size={15} color={ACCENT} style={styles.inputIcon} />
                                        <TextInput
                                            style={styles.input}
                                            placeholder="you@example.com"
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
                            {errors.email && (
                                <Text style={styles.errorText}>{String(errors.email?.message)}</Text>
                            )}
                        </View>

                        {/* Register Button */}
                        <PrimaryButton label="Create Account" onPress={handleSubmit(onSubmit)} />

                        {/* Divider */}
                        <View style={styles.dividerContainer}>
                            <View style={styles.divider} />
                            <Text style={styles.dividerText}>OR</Text>
                            <View style={styles.divider} />
                        </View>

                        {/* Google */}
                        <TouchableOpacity style={styles.googleButton} activeOpacity={0.8}>
                            <Image
                                source={require('../../assets/images/google.png')}
                                style={styles.googleIcon}
                                resizeMode="contain"
                            />
                            <Text style={styles.googleText}>Continue with Google</Text>
                        </TouchableOpacity>

                        {/* Sign In Link */}
                        <View style={styles.signinContainer}>
                            <Text style={styles.signinText}>Already have an account? </Text>
                            <TouchableOpacity onPress={() => router.back()}>
                                <Text style={styles.signinLink}>Sign In</Text>
                            </TouchableOpacity>
                        </View>

                        {/* Terms */}
                        <Text style={styles.termsText}>
                            By signing up, you agree to our{' '}
                            <Text style={styles.termsLink} onPress={() => router.push('/(policy)/TermsOfServices')}>
                                Terms of Service
                            </Text>
                            {' '}and{' '}
                            <Text style={styles.termsLink} onPress={() => router.push('/(policy)/PrivacyPolicy')}>
                                Privacy Policy
                            </Text>
                        </Text>

                    </View>
                </ScrollView>
            </LinearGradient>
        </KeyboardAvoidingView>
    );
}

const styles = StyleSheet.create({
    container: { flex: 1 },
    fullBackground: { flex: 1 },
    scrollContent: { flexGrow: 1, paddingBottom: 48 },

    topSection: {
        alignItems: 'center',
        paddingTop: 65,
        paddingBottom: 40,
        paddingHorizontal: 24,
    },
    backButton: {
        alignSelf: 'flex-start',
        width: 40,
        height: 40,
        borderRadius: 20,
        backgroundColor: 'rgba(255,255,255,0.60)',   // dark: 'rgba(255,255,255,0.1)'
        borderWidth: 1,
        borderColor: BORDER,
        alignItems: 'center',
        justifyContent: 'center',
        marginBottom: 20,
    },
    logoWrap: {
        width: 90,
        height: 90,
        borderRadius: 45,
        backgroundColor: 'rgba(255,255,255,0.60)',    // dark: 'rgba(78,205,196,0.13)'
        borderWidth: 2,
        borderColor: 'rgba(13,148,136,0.35)',         // dark: 'rgba(78,205,196,0.3)'
        alignItems: 'center',
        justifyContent: 'center',
        marginBottom: 24,
    },
    logo: {
        width: 66,
        height: 66,
        borderRadius: 33,
        tintColor: '#0d9488',
    },
    heading: {
        fontSize: 34,
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

    nameRow: {
        flexDirection: 'row',
        marginBottom: 20,
        gap: 12,
    },
    nameInputWrapper: { flex: 1 },
    inputWrapper: { marginBottom: 20 },
    label: {
        fontSize: 11,
        fontWeight: '700',
        color: 'rgba(15,23,42,0.55)',                // dark: 'rgba(255,255,255,0.55)'
        marginBottom: 10,
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
        paddingHorizontal: 14,
        height: 54,
    },
    inputError: { borderColor: '#ff6b6b' },
    inputIcon: { marginRight: 10 },
    input: { flex: 1, fontSize: 14, color: TEXT_PRIMARY },
    errorText: { color: '#ff6b6b', fontSize: 11, marginTop: 5, marginLeft: 4 },

    registerButton: {
        borderRadius: 14,
        overflow: 'hidden',
        shadowColor: ACCENT,
        shadowOffset: { width: 0, height: 6 },
        shadowOpacity: 0.4,
        shadowRadius: 14,
        elevation: 10,
        marginTop: 8,
    },
    registerGradient: {
        paddingVertical: 17,
        alignItems: 'center',
        justifyContent: 'center',
    },
    registerButtonText: {
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
        gap: 10,
    },
    googleIcon: { width: 22, height: 22 },
    googleText: { color: TEXT_PRIMARY, fontSize: 15, fontWeight: '600' },

    signinContainer: {
        flexDirection: 'row',
        justifyContent: 'center',
        marginTop: 26,
    },
    signinText: { color: TEXT_SECONDARY, fontSize: 14 },
    signinLink: { color: ACCENT, fontSize: 14, fontWeight: '800' },

    termsText: {
        textAlign: 'center',
        color: 'rgba(15,23,42,0.40)',                // dark: 'rgba(255,255,255,0.35)'
        fontSize: 12,
        lineHeight: 20,
        marginTop: 18,
        paddingHorizontal: 10,
    },
    termsLink: {
        color: ACCENT,
        fontWeight: '700',
    },
});