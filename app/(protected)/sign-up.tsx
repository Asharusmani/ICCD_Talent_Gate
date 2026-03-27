import { FontAwesome } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import { ArrowLeft, User, Mail } from 'lucide-react-native';
import React from 'react';
import { Image } from 'react-native';
import { Controller, useForm } from 'react-hook-form';
import {
    StyleSheet,
    Text,
    TextInput,
    TouchableOpacity,
    View,
    StatusBar,
    KeyboardAvoidingView,
    Platform,
    ScrollView,
} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';

const PRIMARY_COLOR = '#225b6b';
const SECONDARY_COLOR = '#378793';

export default function SignUpScreen() {
    const router = useRouter();
    const {
        control,
        handleSubmit,
        formState: { errors },
    } = useForm();

    const onSubmit = (data: any) => {
        console.log('Form Data:', data);
        router.push('/login' as unknown as any);
    };

    return (
        <>
            <KeyboardAvoidingView
                behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
                style={styles.container}
            >
                <ScrollView
                    contentContainerStyle={styles.scrollContent}
                    showsVerticalScrollIndicator={false}
                >

                    <LinearGradient
                        colors={[PRIMARY_COLOR, SECONDARY_COLOR]}
                        style={styles.headerGradient}
                        start={{ x: 0, y: 0 }}
                        end={{ x: 1, y: 1 }}
                    >
                        <TouchableOpacity
                            onPress={() => router.back()}
                            style={styles.backButton}
                        >
                            <ArrowLeft size={24} color="#fff" />
                        </TouchableOpacity>

                        <View style={styles.headerContent}>
                            <View style={styles.logoCircle}>
                                <Image
                                    source={require('../../assets/images/iccd-login-logo.png')}
                                    style={styles.iccd}
                                    resizeMode="contain"
                                />
                            </View>
                            <Text style={styles.heading}>Create Account </Text>
                            <Text style={styles.subHeading}>
                                Join Us And Start Your Journey Today
                            </Text>
                        </View>
                    </LinearGradient>

                    {/* Form Section */}
                    <View style={styles.formContainer}>
                        {/* Name Row */}
                        <View style={styles.nameRow}>
                            {/* First Name */}
                            <View style={styles.nameInputWrapper}>
                                <Text style={styles.label}>First Name</Text>
                                <Controller
                                    control={control}
                                    name="firstName"
                                    rules={{ required: 'Required' }}
                                    render={({ field: { onChange, value } }) => (
                                        <View style={[styles.inputContainer, errors.firstName && styles.inputError]}>
                                            <User size={18} color="#999" style={styles.inputIcon} />
                                            <TextInput
                                                style={styles.input}
                                                placeholder="Syed"
                                                placeholderTextColor="#999"
                                                value={value}
                                                onChangeText={onChange}
                                            />
                                        </View>
                                    )}
                                />
                                {errors.firstName && (
                                    <Text style={styles.errorText}>
                                        {String(errors.firstName?.message)}
                                    </Text>
                                )}
                            </View>

                            {/* Last Name */}
                            <View style={styles.nameInputWrapper}>
                                <Text style={styles.label}>Last Name</Text>
                                <Controller
                                    control={control}
                                    name="lastName"
                                    rules={{ required: 'Required' }}
                                    render={({ field: { onChange, value } }) => (
                                        <View style={[styles.inputContainer, errors.lastName && styles.inputError]}>
                                            <User size={18} color="#999" style={styles.inputIcon} />
                                            <TextInput
                                                style={styles.input}
                                                placeholder="Mohid"
                                                placeholderTextColor="#999"
                                                value={value}
                                                onChangeText={onChange}
                                            />
                                        </View>
                                    )}
                                />
                                {errors.lastName && (
                                    <Text style={styles.errorText}>
                                        {String(errors.lastName?.message)}
                                    </Text>
                                )}
                            </View>
                        </View>

                        {/* Email Field */}
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
                                        <Mail size={18} color="#999" style={styles.inputIcon} />
                                        <TextInput
                                            style={styles.input}
                                            placeholder="matz.solutions@example.com"
                                            placeholderTextColor="#999"
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
                                <Text style={styles.errorText}>
                                    {String(errors.email?.message)}
                                </Text>
                            )}
                        </View>

                        {/* Register Button */}
                        <TouchableOpacity
                            style={styles.registerButton}
                            activeOpacity={0.8}
                            onPress={handleSubmit(onSubmit)}
                        >
                            <LinearGradient
                                colors={[PRIMARY_COLOR, SECONDARY_COLOR]}
                                style={styles.registerGradient}
                                start={{ x: 0, y: 0 }}
                                end={{ x: 1, y: 0 }}
                            >
                                <Text style={styles.registerButtonText}>Create Account</Text>
                            </LinearGradient>
                        </TouchableOpacity>

                        {/* Divider */}
                        <View style={styles.dividerContainer}>
                            <View style={styles.divider} />
                            <Text style={styles.dividerText}>OR</Text>
                            <View style={styles.divider} />
                        </View>

                        {/* Google Sign In Button */}
                        <TouchableOpacity
                            style={styles.googleButton}
                            activeOpacity={0.85}
                        >
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

                        {/* Terms Text */}
                        <Text style={styles.termsText}>
                            By signing up, you agree to our{' '}
                            <Text
                                style={styles.termsLink}
                                onPress={() => router.push('/(policy)/TermsOfServices')}
                            >
                                Terms of Service
                            </Text>
                            {' '}and{' '}
                            <Text
                                style={styles.termsLink}
                                onPress={() => router.push('/(policy)/PrivacyPolicy')}
                            >
                                Privacy Policy
                            </Text>
                        </Text>

                    </View>
                </ScrollView>
            </KeyboardAvoidingView>
        </>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#F4F4F4'
    },
    scrollContent: {
        flexGrow: 1,
    },
    headerGradient: {
        paddingTop: 30,
        paddingBottom: 20,
        paddingHorizontal: 24,
        borderBottomLeftRadius: 30,
        borderBottomRightRadius: 30,
    },
    iccd: {
        width: 80,
        height: 80,
        borderRadius: 40,

    },
    backButton: {
        width: 40,
        height: 40,
        borderRadius: 20,
        backgroundColor: 'rgba(255,255,255,0.2)',
        alignItems: 'center',
        justifyContent: 'center',
        marginTop: 16,
    },
    headerContent: {
        alignItems: 'center',
    },
    logoCircle: {
        width: 80,
        height: 80,
        borderRadius: 40,
        alignItems: 'center',
        justifyContent: 'center',
        marginBottom: 16,
    },
    logoText: {
        fontSize: 40,
    },
    heading: {
        fontSize: 32,
        fontWeight: '700',
        color: '#fff',
        marginBottom: 8,
    },
    subHeading: {
        fontSize: 16,
        color: 'rgba(255,255,255,0.9)',
        textAlign: 'center',
    },
    formContainer: {
        flex: 1,
        paddingHorizontal: 24,
        paddingTop: 32,
    },
    nameRow: {
        flexDirection: 'row',
        marginBottom: 20,
        gap: 12,
    },
    nameInputWrapper: {
        flex: 1,
    },
    inputWrapper: {
        marginBottom: 20,
    },
    label: {
        fontSize: 14,
        fontWeight: '600',
        color: '#333',
        marginBottom: 8,
    },
    inputContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: '#fff',
        borderRadius: 12,
        borderWidth: 1.5,
        borderColor: '#e8e8e8',
        paddingHorizontal: 16,
        height: 56,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.05,
        shadowRadius: 4,
        elevation: 2,
    },
    inputError: {
        borderColor: '#ff4444',
    },
    inputIcon: {
        marginRight: 12,
    },
    googleButton: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: '#fff',
        borderRadius: 12,
        borderWidth: 1.5,
        borderColor: '#e8e8e8',
        paddingVertical: 16,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.05,
        shadowRadius: 4,
        elevation: 2,
    },
    googleIcon: {
        width: 24,
        height: 24,
        marginRight: 12,
    },
    googleText: {
        color: '#333',
        fontSize: 16,
        fontWeight: '600',
    },
    input: {
        flex: 1,
        fontSize: 16,
        color: '#333',
    },
    errorText: {
        color: '#ff4444',
        fontSize: 12,
        marginTop: 6,
        marginLeft: 4,
    },
    registerButton: {
        borderRadius: 12,
        overflow: 'hidden',
        shadowColor: PRIMARY_COLOR,
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.3,
        shadowRadius: 8,
        elevation: 6,
        marginTop: 8,
    },
    registerGradient: {
        paddingVertical: 16,
        alignItems: 'center',
        justifyContent: 'center',
    },
    registerButtonText: {
        color: '#fff',
        fontSize: 18,
        fontWeight: '700',
    },
    dividerContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        marginVertical: 28,
    },
    divider: {
        flex: 1,
        height: 1,
        backgroundColor: '#e8e8e8',
    },
    dividerText: {
        marginHorizontal: 16,
        color: '#999',
        fontSize: 14,
        fontWeight: '500',
    },
    googleButton: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: '#fff',
        borderRadius: 12,
        borderWidth: 1.5,
        borderColor: '#e8e8e8',
        paddingVertical: 16,
        gap: 12,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.05,
        shadowRadius: 4,
        elevation: 2,
    },
    googleText: {
        color: '#333',
        fontSize: 16,
        fontWeight: '600',
    },
    signinContainer: {
        flexDirection: 'row',
        justifyContent: 'center',
        marginTop: 28,
    },
    signinText: {
        color: '#666',
        fontSize: 15,
    },
    signinLink: {
        color: PRIMARY_COLOR,
        fontSize: 15,
        fontWeight: '700',
    },
    termsText: {
        textAlign: 'center',
        color: '#999',
        fontSize: 13,
        lineHeight: 20,
        marginTop: 20,
        marginBottom: 24,
        paddingHorizontal: 16,
    },
    termsLink: {
        color: PRIMARY_COLOR,
        fontWeight: '600',
    },
});