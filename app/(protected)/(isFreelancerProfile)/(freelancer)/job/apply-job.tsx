import { LinearGradient } from 'expo-linear-gradient';
import { Controller, useForm } from 'react-hook-form';
import * as DocumentPicker from 'expo-document-picker';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { useLocalSearchParams, useRouter } from 'expo-router';
import {
    KeyboardAvoidingView,
    Platform,
    ScrollView,
    StyleSheet,
    Text,
    TextInput,
    TouchableOpacity,
    View,
} from 'react-native';
import * as yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
import { useApplyJob } from '@/api/client/job';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { User, Mail, Briefcase, FileText } from 'lucide-react-native';

const ACCENT = '#0d9488';
const BORDER = 'rgba(14,165,233,0.18)';
const TEXT_PRIMARY = '#0f172a';
const TEXT_SECONDARY = '#6b7280';

const createApplyjobSchema: yup.ObjectSchema<ApplyJobForm> = yup.object({
    name: yup.string().required('Full name is required'),
    email: yup.string().email('Invalid email').required('Email is required'),
    experience: yup
        .string()
        .matches(/^\d+$/, 'Experience must be a number')
        .required('Experience is required'),
    files: yup
        .mixed<DocumentPicker.DocumentPickerAsset>()
        .nullable()
        .required('CV is required'),
});

type ApplyJobForm = {
    name: string;
    email: string;
    experience: string;
    files: DocumentPicker.DocumentPickerAsset | null;
};

export default function ApplyJob() {
    const router = useRouter();
    const insets = useSafeAreaInsets();
    const { freelancerId, projectId, clientId } = useLocalSearchParams();

    const {
        control,
        handleSubmit,
        formState: { errors },
    } = useForm<ApplyJobForm>({
        resolver: yupResolver(createApplyjobSchema),
        defaultValues: {
            name: '',
            email: '',
            experience: '',
            files: null,
        },
    });

    const { submitJob, isPending } = useApplyJob();

    const onSubmit = (data: any) => {
        const formData = new FormData();
        formData.append('name', data.name);
        formData.append('email', data.email);
        formData.append('experience', data.experience);
        formData.append('freelancerId', freelancerId);
        formData.append('projectId', projectId);
        formData.append('clientId', clientId);
        if (data.files) {
            formData.append('files', {
                uri: data.files.uri,
                type: data.files.mimeType || 'application/pdf',
                name: data.files.name,
            } as any);
        }
        submitJob(formData);
        router.back();
    };

    return (
        <LinearGradient
            colors={['#f0f9ff', '#e0f2fe', '#bae6fd', '#7dd3fc']}
            style={{ flex: 1 }}
            start={{ x: 0, y: 0 }}
            end={{ x: 0.6, y: 1 }}
        >
            <KeyboardAvoidingView
                style={{ flex: 1 }}
                behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
            >
                <ScrollView
                    contentContainerStyle={[styles.scrollContent, { paddingTop:  80 + insets.top }]}
                    showsVerticalScrollIndicator={false}
                >
                    {/* Hero */}
                    <LinearGradient
                        colors={[ACCENT, '#0891b2']}
                        style={styles.heroCard}
                        start={{ x: 0, y: 0 }}
                        end={{ x: 1, y: 1 }}
                    >
                        <View style={styles.heroIconBox}>
                            <Briefcase size={26} color="#fff" />
                        </View>
                        <Text style={styles.heroTitle}>Apply for Position</Text>
                        <Text style={styles.heroSub}>Fill in your details to submit your application.</Text>
                    </LinearGradient>

                    {/* Form Card */}
                    <View style={styles.card}>

                        {/* Full Name */}
                        <View style={styles.inputGroup}>
                            <Text style={styles.label}>Full Name *</Text>
                            <Controller
                                control={control}
                                name="name"
                                render={({ field: { onChange, value } }) => (
                                    <View style={[styles.inputRow, errors.name && styles.inputError]}>
                                        <User size={16} color={TEXT_SECONDARY} style={{ flexShrink: 0 }} />
                                        <TextInput
                                            style={styles.input}
                                            value={value}
                                            onChangeText={onChange}
                                            placeholder="Enter full name"
                                            placeholderTextColor="rgba(15,23,42,0.30)"
                                        />
                                    </View>
                                )}
                            />
                            {errors.name && <Text style={styles.error}>{errors.name.message}</Text>}
                        </View>

                        {/* Email */}
                        <View style={styles.inputGroup}>
                            <Text style={styles.label}>Email *</Text>
                            <Controller
                                control={control}
                                name="email"
                                render={({ field: { onChange, value } }) => (
                                    <View style={[styles.inputRow, errors.email && styles.inputError]}>
                                        <Mail size={16} color={TEXT_SECONDARY} style={{ flexShrink: 0 }} />
                                        <TextInput
                                            style={styles.input}
                                            value={value}
                                            onChangeText={onChange}
                                            placeholder="Enter email address"
                                            keyboardType="email-address"
                                            autoCapitalize="none"
                                            placeholderTextColor="rgba(15,23,42,0.30)"
                                        />
                                    </View>
                                )}
                            />
                            {errors.email && <Text style={styles.error}>{errors.email.message}</Text>}
                        </View>

                        {/* Experience */}
                        <View style={styles.inputGroup}>
                            <Text style={styles.label}>Years of Experience *</Text>
                            <Controller
                                control={control}
                                name="experience"
                                render={({ field: { onChange, value } }) => (
                                    <View style={[styles.inputRow, errors.experience && styles.inputError]}>
                                        <Briefcase size={16} color={TEXT_SECONDARY} style={{ flexShrink: 0 }} />
                                        <TextInput
                                            style={styles.input}
                                            value={String(value)}
                                            onChangeText={onChange}
                                            placeholder="e.g. 5"
                                            keyboardType="numeric"
                                            placeholderTextColor="rgba(15,23,42,0.30)"
                                        />
                                    </View>
                                )}
                            />
                            {errors.experience && <Text style={styles.error}>{errors.experience.message}</Text>}
                        </View>

                        {/* Upload CV */}
                        <View style={styles.inputGroup}>
                            <Text style={styles.label}>Upload CV *</Text>
                            <Controller
                                control={control}
                                name="files"
                                render={({ field: { onChange, value } }) => (
                                    <>
                                        <TouchableOpacity
                                            style={[styles.uploadBox, errors.files && styles.inputError]}
                                            activeOpacity={0.7}
                                            onPress={async () => {
                                                const result = await DocumentPicker.getDocumentAsync({
                                                    type: [
                                                        'application/pdf',
                                                        'application/msword',
                                                        'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
                                                    ],
                                                });
                                                if (!result.canceled) onChange(result.assets[0]);
                                            }}
                                        >
                                            <View style={styles.uploadIconBox}>
                                                <MaterialCommunityIcons
                                                    name="upload-network-outline"
                                                    size={26}
                                                    color={value ? ACCENT : TEXT_SECONDARY}
                                                />
                                            </View>
                                            <Text style={[styles.uploadText, value && { color: ACCENT, fontWeight: '600' }]}>
                                                {value ? value.name : 'Click to upload CV'}
                                            </Text>
                                            <Text style={styles.uploadSub}>PDF, DOC, DOCX</Text>
                                        </TouchableOpacity>
                                        {errors.files && <Text style={styles.error}>{errors.files.message}</Text>}
                                    </>
                                )}
                            />
                        </View>
                    </View>

                    {/* Buttons */}
                    <View style={styles.footer}>
                        <TouchableOpacity
                            style={styles.backBtn}
                            activeOpacity={0.8}
                            onPress={() => router.back()}
                        >
                            <Text style={styles.backBtnText}>Back</Text>
                        </TouchableOpacity>

                        <TouchableOpacity
                            style={styles.submitWrapper}
                            activeOpacity={0.85}
                            onPress={handleSubmit(onSubmit)}
                            disabled={isPending}
                        >
                            <LinearGradient
                                colors={[ACCENT, '#0891b2']}
                                style={styles.submitBtn}
                                start={{ x: 0, y: 0 }}
                                end={{ x: 1, y: 0 }}
                            >
                                <Text style={styles.submitText}>
                                    {isPending ? 'Submitting...' : 'Submit Application'}
                                </Text>
                            </LinearGradient>
                        </TouchableOpacity>
                    </View>

                    <View style={{ height: 40 }} />
                </ScrollView>
            </KeyboardAvoidingView>
        </LinearGradient>
    );
}

const styles = StyleSheet.create({
    scrollContent: {
        paddingHorizontal: 16,
        paddingBottom: 20,
    },
    heroCard: {
        borderRadius: 20,
        padding: 22,
        marginBottom: 16,
        alignItems: 'center',
    },
    heroIconBox: {
        width: 54,
        height: 54,
        borderRadius: 27,
        backgroundColor: 'rgba(255,255,255,0.20)',
        alignItems: 'center',
        justifyContent: 'center',
        marginBottom: 12,
    },
    heroTitle: {
        fontSize: 22,
        fontWeight: '800',
        color: '#fff',
        letterSpacing: -0.3,
        marginBottom: 6,
    },
    heroSub: {
        fontSize: 13,
        color: 'rgba(255,255,255,0.80)',
        textAlign: 'center',
    },
    card: {
        backgroundColor: 'rgba(255,255,255,0.88)',
        borderRadius: 18,
        borderWidth: 1,
        borderColor: BORDER,
        padding: 16,
        marginBottom: 14,
        gap: 14,
    },
    inputGroup: {
        gap: 6,
    },
    label: {
        fontSize: 13,
        fontWeight: '700',
        color: TEXT_PRIMARY,
    },
    inputRow: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: 'rgba(255,255,255,0.85)',
        borderWidth: 1,
        borderColor: BORDER,
        borderRadius: 12,
        paddingHorizontal: 12,
        paddingVertical: 4,
        gap: 8,
    },
    input: {
        flex: 1,
        fontSize: 14,
        color: TEXT_PRIMARY,
        paddingVertical: 10,
    },
    inputError: {
        borderColor: '#ef4444',
    },
    error: {
        fontSize: 12,
        color: '#ef4444',
        fontWeight: '600',
    },
    uploadBox: {
        borderWidth: 1.5,
        borderColor: BORDER,
        borderStyle: 'dashed',
        borderRadius: 14,
        padding: 20,
        alignItems: 'center',
        gap: 6,
        backgroundColor: 'rgba(255,255,255,0.70)',
    },
    uploadIconBox: {
        width: 48,
        height: 48,
        borderRadius: 14,
        backgroundColor: 'rgba(13,148,136,0.10)',
        alignItems: 'center',
        justifyContent: 'center',
    },
    uploadText: {
        fontSize: 14,
        color: TEXT_SECONDARY,
        textAlign: 'center',
        fontWeight: '500',
    },
    uploadSub: {
        fontSize: 11,
        color: 'rgba(15,23,42,0.35)',
    },
    footer: {
        flexDirection: 'row',
        gap: 12,
    },
    backBtn: {
        flex: 1,
        borderWidth: 1.5,
        borderColor: BORDER,
        borderRadius: 12,
        paddingVertical: 14,
        alignItems: 'center',
        backgroundColor: 'rgba(255,255,255,0.75)',
    },
    backBtnText: {
        color: TEXT_PRIMARY,
        fontWeight: '700',
        fontSize: 15,
    },
    submitWrapper: {
        flex: 2,
        borderRadius: 12,
        overflow: 'hidden',
        shadowColor: ACCENT,
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.3,
        shadowRadius: 8,
        elevation: 6,
    },
    submitBtn: {
        paddingVertical: 14,
        alignItems: 'center',
        justifyContent: 'center',
    },
    submitText: {
        color: '#fff',
        fontWeight: '800',
        fontSize: 15,
    },
});