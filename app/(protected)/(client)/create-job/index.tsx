import React from 'react';
import {
    View,
    ScrollView,
    Text,
    TouchableOpacity,
    TextInput,
    StyleSheet,
} from 'react-native';
import { useAddJob } from '@/api/client/job';
import SelectBox from '@/components/ui/select-box';
import { useForm, Controller } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { JobFormSchema } from '@/components/schemas/schema';
import { JobFormProps, JobTypeProps } from '@/components/types/proposal.types';
import { LinearGradient } from 'expo-linear-gradient';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { Briefcase, Building2, MapPin, DollarSign, FileText, Users } from 'lucide-react-native';

const ACCENT = '#0d9488';
const BORDER = 'rgba(14,165,233,0.18)';
const TEXT_PRIMARY = '#0f172a';
const TEXT_SECONDARY = '#6b7280';

const JobForm: React.FC = () => {
    const insets = useSafeAreaInsets();
    const {
        control,
        handleSubmit,
        formState: { errors },
        setValue,
        reset,
        watch,
    } = useForm<JobFormProps>({
        resolver: yupResolver(JobFormSchema),
        defaultValues: {
            jobTitle: '',
            companyName: '',
            location: '',
            country: '',
            city: '',
            jobType: 'Full-time',
            payType: '',
            minSalaray: '',
            maxSalaray: '',
            jobDescription: '',
            totalPersontoHire: 1,
        },
    });

    const hiringCount = watch('totalPersontoHire');
    const jobDescription = watch('jobDescription');

    const { addjob, isPending } = useAddJob();

    const onSubmit = (data: JobFormProps) => {
        addjob(data);
        reset();
    };

    const incrementCount = () => setValue('totalPersontoHire', hiringCount + 1);
    const decrementCount = () => setValue('totalPersontoHire', hiringCount > 1 ? hiringCount - 1 : 1);

    return (
        <LinearGradient
            colors={['#f0f9ff', '#e0f2fe', '#bae6fd', '#7dd3fc']}
            style={{ flex: 1 }}
            start={{ x: 0, y: 0 }}
            end={{ x: 0.6, y: 1 }}
        >
            <ScrollView
                style={styles.scroll}
                showsVerticalScrollIndicator={false}
                contentContainerStyle={[styles.scrollContent, { paddingTop:  16 }]}
            >

                {/* ── Hero Header ── */}
                <LinearGradient
                    colors={[ACCENT, '#0891b2']}
                    style={styles.heroCard}
                    start={{ x: 0, y: 0 }}
                    end={{ x: 1, y: 1 }}
                >
                    <Text style={styles.heroTitle}>Let's make your next</Text>
                    <Text style={styles.heroTitle}>great hire. Fast.</Text>
                    <Text style={styles.heroSub}>
                        Fill in the details below to post your job and attract top talent.
                    </Text>
                </LinearGradient>

                {/* ── Step 1: Company Info ── */}
                <View style={styles.card}>
                    <View style={styles.cardHeader}>
                        <View style={styles.stepBadge}>
                            <Building2 size={16} color="#fff" />
                        </View>
                        <View>
                            <Text style={styles.stepLabel}>Step 1</Text>
                            <Text style={styles.cardTitle}>Company Information</Text>
                        </View>
                    </View>

                    <Controller
                        control={control}
                        name="companyName"
                        render={({ field: { onChange, onBlur, value } }) => (
                            <View style={styles.inputWrapper}>
                                <Text style={styles.label}>Company Name *</Text>
                                <TextInput
                                    style={[styles.input, errors.companyName && styles.inputError]}
                                    placeholder="Enter company name"
                                    value={value}
                                    onChangeText={onChange}
                                    onBlur={onBlur}
                                    placeholderTextColor="rgba(15,23,42,0.30)"
                                />
                            </View>
                        )}
                    />
                    {errors.companyName && <Text style={styles.error}>{errors.companyName.message}</Text>}
                </View>

                {/* ── Step 2: Job Basics ── */}
                <View style={styles.card}>
                    <View style={styles.cardHeader}>
                        <View style={styles.stepBadge}>
                            <Briefcase size={16} color="#fff" />
                        </View>
                        <View>
                            <Text style={styles.stepLabel}>Step 2</Text>
                            <Text style={styles.cardTitle}>Job Basics</Text>
                        </View>
                    </View>
                    <Text style={styles.cardSub}>Job title will be shared with employers to introduce the role.</Text>

                    <Controller
                        control={control}
                        name="jobTitle"
                        render={({ field: { onChange, onBlur, value } }) => (
                            <View style={styles.inputWrapper}>
                                <Text style={styles.label}>Job Title *</Text>
                                <TextInput
                                    style={[styles.input, errors.jobTitle && styles.inputError]}
                                    placeholder="e.g. Senior Software Engineer"
                                    value={value}
                                    onChangeText={onChange}
                                    onBlur={onBlur}
                                    placeholderTextColor="rgba(15,23,42,0.30)"
                                />
                            </View>
                        )}
                    />
                    {errors.jobTitle && <Text style={styles.error}>{errors.jobTitle.message}</Text>}

                    <Controller
                        control={control}
                        name="location"
                        render={({ field: { onChange, onBlur, value } }) => (
                            <View style={styles.inputWrapper}>
                                <Text style={styles.label}>Location *</Text>
                                <TextInput
                                    style={[styles.input, errors.location && styles.inputError]}
                                    placeholder="e.g. Remote, On-site, Hybrid"
                                    value={value}
                                    onChangeText={onChange}
                                    onBlur={onBlur}
                                    placeholderTextColor="rgba(15,23,42,0.30)"
                                />
                            </View>
                        )}
                    />
                    {errors.location && <Text style={styles.error}>{errors.location.message}</Text>}

                    <View style={styles.inputWrapper}>
                        <Controller
                            control={control}
                            name="country"
                            render={({ field: { onChange, value } }) => (
                                <SelectBox
                                    label="Country"
                                    selectedValue={value}
                                    onValueChange={onChange}
                                    required
                                    options={[
                                        { label: 'Pakistan', value: 'pakistan' },
                                        { label: 'Saudi Arabia', value: 'ksa' },
                                        { label: 'United Kingdom', value: 'uk' },
                                        { label: 'United States', value: 'usa' },
                                        { label: 'United Arab Emirates', value: 'uae' },
                                    ]}
                                />
                            )}
                        />
                        {errors.country && <Text style={styles.error}>{errors.country.message}</Text>}
                    </View>

                    <View style={styles.inputWrapper}>
                        <Controller
                            control={control}
                            name="city"
                            render={({ field: { onChange, value } }) => (
                                <SelectBox
                                    label="City"
                                    selectedValue={value}
                                    onValueChange={onChange}
                                    required
                                    options={[
                                        { label: 'Karachi', value: 'karachi' },
                                        { label: 'Lahore', value: 'lahore' },
                                        { label: 'Islamabad', value: 'islamabad' },
                                        { label: 'Rawalpindi', value: 'rawalpindi' },
                                        { label: 'Faisalabad', value: 'faisalabad' },
                                    ]}
                                />
                            )}
                        />
                        {errors.city && <Text style={styles.error}>{errors.city.message}</Text>}
                    </View>
                </View>

                {/* ── Step 3: Job Details ── */}
                <View style={styles.card}>
                    <View style={styles.cardHeader}>
                        <View style={styles.stepBadge}>
                            <MapPin size={16} color="#fff" />
                        </View>
                        <View>
                            <Text style={styles.stepLabel}>Step 3</Text>
                            <Text style={styles.cardTitle}>Job Details</Text>
                        </View>
                    </View>

                    <Text style={styles.label}>Job Type *</Text>
                    <Controller
                        control={control}
                        name="jobType"
                        render={({ field: { onChange, value } }) => (
                            <View style={styles.radioGroup}>
                                {(['Full-time', 'Part-time', 'Contract', 'Internship'] as JobTypeProps[]).map(type => (
                                    <TouchableOpacity
                                        key={type}
                                        style={[
                                            styles.radioChip,
                                            value === type && styles.radioChipActive,
                                        ]}
                                        onPress={() => onChange(type)}
                                        activeOpacity={0.8}
                                    >
                                        <Text style={[
                                            styles.radioChipText,
                                            value === type && styles.radioChipTextActive,
                                        ]}>
                                            {type}
                                        </Text>
                                    </TouchableOpacity>
                                ))}
                            </View>
                        )}
                    />
                    {errors.jobType && <Text style={styles.error}>{errors.jobType.message}</Text>}
                </View>

                {/* ── Step 4: Pay & Benefits ── */}
                <View style={styles.card}>
                    <View style={styles.cardHeader}>
                        <View style={styles.stepBadge}>
                            <DollarSign size={16} color="#fff" />
                        </View>
                        <View>
                            <Text style={styles.stepLabel}>Step 4</Text>
                            <Text style={styles.cardTitle}>Pay & Benefits</Text>
                        </View>
                    </View>

                    <Controller
                        control={control}
                        name="payType"
                        render={({ field: { onChange, onBlur, value } }) => (
                            <View style={styles.inputWrapper}>
                                <Text style={styles.label}>Pay Type *</Text>
                                <TextInput
                                    style={[styles.input, errors.payType && styles.inputError]}
                                    placeholder="e.g. Hourly, Monthly, Annual"
                                    value={value}
                                    onChangeText={onChange}
                                    onBlur={onBlur}
                                    placeholderTextColor="rgba(15,23,42,0.30)"
                                />
                            </View>
                        )}
                    />
                    {errors.payType && <Text style={styles.error}>{errors.payType.message}</Text>}

                    <View style={styles.row}>
                        <View style={styles.half}>
                            <Controller
                                control={control}
                                name="minSalaray"
                                render={({ field: { onChange, onBlur, value } }) => (
                                    <View style={styles.inputWrapper}>
                                        <Text style={styles.label}>Minimum *</Text>
                                        <TextInput
                                            style={[styles.input, errors.minSalaray && styles.inputError]}
                                            placeholder="0"
                                            value={value}
                                            onChangeText={onChange}
                                            onBlur={onBlur}
                                            keyboardType="numeric"
                                            placeholderTextColor="rgba(15,23,42,0.30)"
                                        />
                                    </View>
                                )}
                            />
                            {errors.minSalaray && <Text style={styles.error}>{errors.minSalaray.message}</Text>}
                        </View>

                        <View style={styles.half}>
                            <Controller
                                control={control}
                                name="maxSalaray"
                                render={({ field: { onChange, onBlur, value } }) => (
                                    <View style={styles.inputWrapper}>
                                        <Text style={styles.label}>Maximum *</Text>
                                        <TextInput
                                            style={[styles.input, errors.maxSalaray && styles.inputError]}
                                            placeholder="0"
                                            value={value}
                                            onChangeText={onChange}
                                            onBlur={onBlur}
                                            keyboardType="numeric"
                                            placeholderTextColor="rgba(15,23,42,0.30)"
                                        />
                                    </View>
                                )}
                            />
                            {errors.maxSalaray && <Text style={styles.error}>{errors.maxSalaray.message}</Text>}
                        </View>
                    </View>
                </View>

                {/* ── Step 5: Job Description ── */}
                <View style={styles.card}>
                    <View style={styles.cardHeader}>
                        <View style={styles.stepBadge}>
                            <FileText size={16} color="#fff" />
                        </View>
                        <View>
                            <Text style={styles.stepLabel}>Step 5</Text>
                            <Text style={styles.cardTitle}>Describe the Job</Text>
                        </View>
                    </View>

                    <Controller
                        control={control}
                        name="jobDescription"
                        render={({ field: { onChange, onBlur, value } }) => (
                            <View style={styles.inputWrapper}>
                                <Text style={styles.label}>Job Description *</Text>
                                <TextInput
                                    style={[styles.textArea, errors.jobDescription && styles.inputError]}
                                    placeholder="Write job description here... (minimum 50 characters)"
                                    value={value}
                                    onChangeText={onChange}
                                    onBlur={onBlur}
                                    multiline
                                    numberOfLines={8}
                                    textAlignVertical="top"
                                    placeholderTextColor="rgba(15,23,42,0.30)"
                                />
                                <Text style={styles.charCount}>{(value ?? '').length}/2000 characters</Text>
                            </View>
                        )}
                    />
                    {errors.jobDescription && <Text style={styles.error}>{errors.jobDescription.message}</Text>}
                </View>

                {/* ── Step 6: Hiring Plan ── */}
                <View style={styles.card}>
                    <View style={styles.cardHeader}>
                        <View style={styles.stepBadge}>
                            <Users size={16} color="#fff" />
                        </View>
                        <View>
                            <Text style={styles.stepLabel}>Step 6</Text>
                            <Text style={styles.cardTitle}>Hiring Plan</Text>
                        </View>
                    </View>

                    <Text style={styles.label}>People to hire in next 30 days *</Text>
                    <View style={styles.counterRow}>
                        <Text style={styles.counterValue}>
                            {hiringCount} {hiringCount === 1 ? 'person' : 'people'}
                        </Text>
                        <View style={styles.counterBtns}>
                            <TouchableOpacity
                                style={styles.counterBtn}
                                onPress={decrementCount}
                                disabled={hiringCount <= 1}
                            >
                                <Text style={[styles.counterBtnText, hiringCount <= 1 && styles.counterBtnDisabled]}>−</Text>
                            </TouchableOpacity>
                            <View style={styles.counterDivider} />
                            <TouchableOpacity style={styles.counterBtn} onPress={incrementCount}>
                                <Text style={styles.counterBtnText}>+</Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                    {errors.totalPersontoHire && <Text style={styles.error}>{errors.totalPersontoHire.message}</Text>}
                </View>

                {/* ── Submit Button ── */}
                <TouchableOpacity
                    onPress={handleSubmit(onSubmit)}
                    activeOpacity={0.85}
                    style={styles.submitWrapper}
                    disabled={isPending}
                >
                    <LinearGradient
                        colors={[ACCENT, '#0891b2']}
                        style={styles.submitBtn}
                        start={{ x: 0, y: 0 }}
                        end={{ x: 1, y: 0 }}
                    >
                        <Text style={styles.submitText}>
                            {isPending ? 'Submitting...' : 'Submit Job Posting'}
                        </Text>
                    </LinearGradient>
                </TouchableOpacity>

            </ScrollView>
        </LinearGradient>
    );
};

export default JobForm;

const styles = StyleSheet.create({
    scroll: { flex: 1 },
    scrollContent: {
        paddingHorizontal: 16,
        paddingBottom: 40,
    },

    // Hero
    heroCard: {
        borderRadius: 20,
        padding: 22,
        marginBottom: 16,
    },
    heroTitle: {
        fontSize: 22,
        fontWeight: '800',
        color: '#fff',
        letterSpacing: -0.3,
        lineHeight: 30,
    },
    heroSub: {
        fontSize: 13,
        color: 'rgba(255,255,255,0.75)',
        marginTop: 10,
        lineHeight: 20,
    },

    // Card
    card: {
        backgroundColor: 'rgba(255,255,255,0.88)',
        borderRadius: 18,
        borderWidth: 1,
        borderColor: BORDER,
        padding: 18,
        marginBottom: 14,
    },
    cardHeader: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 12,
        marginBottom: 14,
    },
    stepBadge: {
        width: 38,
        height: 38,
        borderRadius: 12,
        backgroundColor: ACCENT,
        justifyContent: 'center',
        alignItems: 'center',
        flexShrink: 0,
    },
    stepLabel: {
        fontSize: 11,
        fontWeight: '600',
        color: TEXT_SECONDARY,
        textTransform: 'uppercase',
        letterSpacing: 0.5,
    },
    cardTitle: {
        fontSize: 15,
        fontWeight: '700',
        color: TEXT_PRIMARY,
    },
    cardSub: {
        fontSize: 12,
        color: TEXT_SECONDARY,
        marginBottom: 14,
        lineHeight: 18,
        marginTop: -6,
    },

    // Input
    inputWrapper: { marginBottom: 14 },
    label: {
        fontSize: 13,
        color: TEXT_PRIMARY,
        marginBottom: 8,
        fontWeight: '600',
    },
    input: {
        borderWidth: 1,
        borderColor: BORDER,
        borderRadius: 12,
        paddingHorizontal: 14,
        paddingVertical: 12,
        fontSize: 14,
        color: TEXT_PRIMARY,
        backgroundColor: 'rgba(255,255,255,0.85)',
    },
    inputError: { borderColor: '#ef4444' },
    textArea: {
        borderWidth: 1,
        borderColor: BORDER,
        borderRadius: 12,
        padding: 14,
        fontSize: 14,
        color: TEXT_PRIMARY,
        backgroundColor: 'rgba(255,255,255,0.85)',
        minHeight: 130,
    },
    charCount: {
        fontSize: 11,
        color: TEXT_SECONDARY,
        textAlign: 'right',
        marginTop: 5,
    },
    row: { flexDirection: 'row', gap: 12 },
    half: { flex: 1 },

    // Radio chips
    radioGroup: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        gap: 8,
        marginTop: 8,
        marginBottom: 8,
    },
    radioChip: {
        paddingHorizontal: 14,
        paddingVertical: 8,
        borderRadius: 20,
        borderWidth: 1,
        borderColor: BORDER,
        backgroundColor: 'rgba(255,255,255,0.85)',
    },
    radioChipActive: {
        backgroundColor: ACCENT,
        borderColor: ACCENT,
    },
    radioChipText: {
        fontSize: 13,
        fontWeight: '600',
        color: TEXT_SECONDARY,
    },
    radioChipTextActive: {
        color: '#fff',
    },

    // Counter
    counterRow: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        backgroundColor: 'rgba(14,165,233,0.06)',
        borderWidth: 1,
        borderColor: BORDER,
        borderRadius: 12,
        paddingHorizontal: 16,
        paddingVertical: 12,
        marginTop: 8,
    },
    counterValue: {
        fontSize: 15,
        fontWeight: '700',
        color: TEXT_PRIMARY,
    },
    counterBtns: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: 'rgba(255,255,255,0.85)',
        borderWidth: 1,
        borderColor: BORDER,
        borderRadius: 10,
        overflow: 'hidden',
    },
    counterBtn: {
        width: 36,
        height: 36,
        justifyContent: 'center',
        alignItems: 'center',
    },
    counterBtnText: {
        fontSize: 20,
        color: ACCENT,
        fontWeight: '700',
    },
    counterBtnDisabled: {
        color: '#d1d5db',
    },
    counterDivider: {
        width: 1,
        height: 24,
        backgroundColor: BORDER,
    },

    // Error
    error: {
        color: '#ef4444',
        fontSize: 12,
        marginTop: -10,
        marginBottom: 8,
    },

    // Submit
    submitWrapper: {
        borderRadius: 14,
        overflow: 'hidden',
        shadowColor: ACCENT,
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.3,
        shadowRadius: 8,
        elevation: 6,
        marginBottom: 40,
    },
    submitBtn: {
        paddingVertical: 17,
        alignItems: 'center',
        justifyContent: 'center',
    },
    submitText: {
        color: '#fff',
        fontSize: 16,
        fontWeight: '800',
        letterSpacing: 0.3,
    },
});