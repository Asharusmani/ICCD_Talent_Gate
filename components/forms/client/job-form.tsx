// screens/JobForm.tsx
import React from 'react';
import {
  View,
  ScrollView,
  Text,
  TouchableOpacity,
  TextInput,
  StyleSheet,
} from 'react-native';
import { useForm, Controller } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import SelectBox from '@/components/ui/select-box';
import { JobPostingFormData, JobType } from '@/components/types/proposal.types';
import { jobPostingSchema } from '@/components/schemas/schema';

const JobForm: React.FC = () => {
  const {
    control,
    handleSubmit,
    formState: { errors },
    setValue,
    watch,
  } = useForm<JobPostingFormData>({
    resolver: yupResolver(jobPostingSchema),
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
      description: '',
      totalPersontoHire: 1,
    },
  });

  const hiringCount = watch('totalPersontoHire');

  const onSubmit = (data: JobPostingFormData) => {
  };

  const incrementCount = () => setValue('totalPersontoHire', hiringCount + 1);
  const decrementCount = () => setValue('totalPersontoHire', hiringCount > 1 ? hiringCount - 1 : 1);

  return (
    <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
      {/* Back Button */}
      <TouchableOpacity style={styles.backButton}>
        <Text style={styles.backIcon}>←</Text>
      </TouchableOpacity>

      {/* Header Card */}
      <View style={styles.headerCard}>
        <View style={styles.headerContent}>
          <Text style={styles.headerTitle}>Lets make your next</Text>
          <Text style={styles.headerTitle}>great hire. Fast.</Text>
          <Text style={styles.headerSubtitle}>
            Designing seamless mobile app experience with intuitive and
            user-friendly interface
          </Text>
        </View>
      </View>

      {/* Step 1: Company Info */}
      <View style={styles.card}>
        <View style={styles.cardHeader}>
          <View style={styles.stepBadge}>
            <Text style={styles.stepNumber}>1</Text>
          </View>
          <Text style={styles.cardTitle}>Company Information</Text>
        </View>

        <Controller
          control={control}
          name="companyName"
          render={({ field: { onChange, onBlur, value } }) => (
            <View style={styles.inputContainer}>
              <Text style={styles.label}>Company Name *</Text>
              <TextInput
                style={[styles.input, errors.companyName && styles.inputError]}
                placeholder="Enter company name"
                value={value}
                onChangeText={onChange}
                onBlur={onBlur}
                placeholderTextColor="#9ca3af"
              />
            </View>
          )}
        />
        {errors.companyName && (
          <Text style={styles.error}>{errors.companyName.message}</Text>
        )}
      </View>

      {/* Step 2: Add job basics */}
      <View style={styles.card}>
        <View style={styles.cardHeader}>
          <View style={styles.stepBadge}>
            <Text style={styles.stepNumber}>2</Text>
          </View>
          <Text style={styles.cardTitle}>Add job basics</Text>
        </View>
        <Text style={styles.cardSubtitle}>
          We share the job title with employers to introduce you as a candidate.
        </Text>

        <Controller
          control={control}
          name="jobTitle"
          render={({ field: { onChange, onBlur, value } }) => (
            <View style={styles.inputContainer}>
              <Text style={styles.label}>Job Title *</Text>
              <TextInput
                style={[styles.input, errors.jobTitle && styles.inputError]}
                placeholder="e.g. Senior Software Engineer"
                value={value}
                onChangeText={onChange}
                onBlur={onBlur}
                placeholderTextColor="#9ca3af"
              />
            </View>
          )}
        />
        {errors.jobTitle && (
          <Text style={styles.error}>{errors.jobTitle.message}</Text>
        )}

        <Controller
          control={control}
          name="location"
          render={({ field: { onChange, onBlur, value } }) => (
            <View style={styles.inputContainer}>
              <Text style={styles.label}>Location *</Text>
              <TextInput
                style={[styles.input, errors.location && styles.inputError]}
                placeholder="e.g. Remote, On-site, Hybrid"
                value={value}
                onChangeText={onChange}
                onBlur={onBlur}
                placeholderTextColor="#9ca3af"
              />
            </View>
          )}
        />
        {errors.location && (
          <Text style={styles.error}>{errors.location.message}</Text>
        )}

        <View style={styles.inputContainer}>
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
          {errors.country && (
            <Text style={styles.error}>{errors.country.message}</Text>
          )}
        </View>

        <View style={styles.inputContainer}>
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
          {errors.city && (
            <Text style={styles.error}>{errors.city.message}</Text>
          )}
        </View>
      </View>

      {/* Step 3: Add job details */}
      <View style={styles.card}>
        <View style={styles.cardHeader}>
          <View style={styles.stepBadge}>
            <Text style={styles.stepNumber}>3</Text>
          </View>
          <Text style={styles.cardTitle}>Add job details</Text>
        </View>

        <Text style={styles.label}>Job type *</Text>
        <Controller
          control={control}
          name="jobType"
          render={({ field: { onChange, value } }) => (
            <View style={styles.radioGroup}>
              {(['Full-time', 'Part-time', 'Contract', 'Internship'] as JobType[]).map(type => (
                <TouchableOpacity
                  key={type}
                  style={styles.radioOption}
                  onPress={() => onChange(type)}
                >
                  <View style={styles.radioCircle}>
                    {value === type && <View style={styles.radioSelected} />}
                  </View>
                  <Text style={styles.radioLabel}>{type}</Text>
                </TouchableOpacity>
              ))}
            </View>
          )}
        />
        {errors.jobType && (
          <Text style={styles.error}>{errors.jobType.message}</Text>
        )}
      </View>

      {/* Step 4: Add pay and benefits */}
      <View style={styles.card}>
        <View style={styles.cardHeader}>
          <View style={styles.stepBadge}>
            <Text style={styles.stepNumber}>4</Text>
          </View>
          <Text style={styles.cardTitle}>Add pay and benefits</Text>
        </View>

        <Controller
          control={control}
          name="payType"
          render={({ field: { onChange, onBlur, value } }) => (
            <View style={styles.inputContainer}>
              <Text style={styles.label}>Pay type *</Text>
              <TextInput
                style={[styles.input, errors.payType && styles.inputError]}
                placeholder="e.g. Hourly, Monthly, Annual"
                value={value}
                onChangeText={onChange}
                onBlur={onBlur}
                placeholderTextColor="#9ca3af"
              />
            </View>
          )}
        />
        {errors.payType && (
          <Text style={styles.error}>{errors.payType.message}</Text>
        )}

        <View style={styles.row}>
          <View style={styles.halfWidth}>
            <Controller
              control={control}
              name="minimum"
              render={({ field: { onChange, onBlur, value } }) => (
                <View style={styles.inputContainer}>
                  <Text style={styles.label}>Minimum *</Text>
                  <TextInput
                    style={[styles.input, errors.minimum && styles.inputError]}
                    placeholder="0"
                    value={value}
                    onChangeText={onChange}
                    onBlur={onBlur}
                    keyboardType="numeric"
                    placeholderTextColor="#9ca3af"
                  />
                </View>
              )}
            />
            {errors.minimum && (
              <Text style={styles.error}>{errors.minimum.message}</Text>
            )}
          </View>

          <View style={styles.halfWidth}>
            <Controller
              control={control}
              name="maximum"
              render={({ field: { onChange, onBlur, value } }) => (
                <View style={styles.inputContainer}>
                  <Text style={styles.label}>Maximum *</Text>
                  <TextInput
                    style={[styles.input, errors.maximum && styles.inputError]}
                    placeholder="0"
                    value={value}
                    onChangeText={onChange}
                    onBlur={onBlur}
                    keyboardType="numeric"
                    placeholderTextColor="#9ca3af"
                  />
                </View>
              )}
            />
            {errors.maximum && (
              <Text style={styles.error}>{errors.maximum.message}</Text>
            )}
          </View>
        </View>
      </View>

      {/* Step 5: Describe the job */}
      <View style={styles.card}>
        <View style={styles.cardHeader}>
          <View style={styles.stepBadge}>
            <Text style={styles.stepNumber}>5</Text>
          </View>
          <Text style={styles.cardTitle}>Describe the job</Text>
        </View>

        <Controller
          control={control}
          name="description"
          render={({ field: { onChange, onBlur, value } }) => (
            <View style={styles.inputContainer}>
              <Text style={styles.label}>Job Description *</Text>
              <TextInput
                style={[styles.textArea, errors.description && styles.inputError]}
                placeholder="Write job description here... (minimum 50 characters)"
                value={value}
                onChangeText={onChange}
                onBlur={onBlur}
                multiline
                numberOfLines={8}
                textAlignVertical="top"
                placeholderTextColor="#9ca3af"
              />
              <Text style={styles.charCount}>
                {value.length}/2000 characters
              </Text>
            </View>
          )}
        />
        {errors.description && (
          <Text style={styles.error}>{errors.description.message}</Text>
        )}
      </View>

      {/* Step 6: Hiring plan */}
      <View style={styles.card}>
        <View style={styles.cardHeader}>
          <View style={styles.stepBadge}>
            <Text style={styles.stepNumber}>6</Text>
          </View>
          <Text style={styles.cardTitle}>Hiring plan</Text>
        </View>

        <Text style={styles.label}>
          Number of people to hire in the next 30 days *
        </Text>
        <View style={styles.counterContainer}>
          <Text style={styles.counterValue}>
            {hiringCount} {hiringCount === 1 ? 'person' : 'people'}
          </Text>
          <View style={styles.counterButtons}>
            <TouchableOpacity
              style={styles.counterButton}
              onPress={incrementCount}
            >
              <Text style={styles.counterButtonText}>+</Text>
            </TouchableOpacity>
            <View style={styles.counterDivider} />
            <TouchableOpacity
              style={styles.counterButton}
              onPress={decrementCount}
              disabled={hiringCount <= 1}
            >
              <Text style={[
                styles.counterButtonText,
                hiringCount <= 1 && styles.counterButtonDisabled
              ]}>
                −
              </Text>
            </TouchableOpacity>
          </View>
        </View>
        {errors.hiringCount && (
          <Text style={styles.error}>{errors.hiringCount.message}</Text>
        )}
      </View>

      {/* Submit Button */}
      <TouchableOpacity
        style={styles.submitButton}
        onPress={handleSubmit(onSubmit)}
      >
        <Text style={styles.submitButtonText}>Submit Job Posting</Text>
      </TouchableOpacity>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f9fafb',
    padding: 16,
  },
  backButton: {
    width: 40,
    height: 40,
    borderRadius: 8,
    backgroundColor: '#5f8a8b',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 16,
  },
  backIcon: {
    fontSize: 20,
    color: '#fff',
  },
  headerCard: {
    backgroundColor: '#fff',
    borderRadius: 16,
    padding: 20,
    marginBottom: 16,
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
  headerContent: {
    flex: 1,
  },
  headerTitle: {
    fontSize: 20,
    fontWeight: '700',
    color: '#1f2937',
  },
  headerSubtitle: {
    fontSize: 13,
    color: '#6b7280',
    marginTop: 8,
    lineHeight: 18,
  },
  card: {
    backgroundColor: '#fff',
    borderRadius: 16,
    padding: 20,
    marginBottom: 16,
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
  cardHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 12,
  },
  stepBadge: {
    width: 32,
    height: 32,
    borderRadius: 16,
    backgroundColor: '#5f8a8b',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 12,
  },
  stepNumber: {
    color: '#fff',
    fontWeight: '700',
    fontSize: 16,
  },
  cardTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#1f2937',
  },
  cardSubtitle: {
    fontSize: 12,
    color: '#6b7280',
    marginBottom: 16,
    lineHeight: 18,
  },
  inputContainer: {
    marginBottom: 16,
  },
  label: {
    fontSize: 14,
    color: '#374151',
    marginBottom: 8,
    fontWeight: '500',
  },
  input: {
    borderWidth: 1,
    borderColor: '#e5e7eb',
    borderRadius: 8,
    padding: 12,
    fontSize: 14,
    color: '#1f2937',
    backgroundColor: '#fff',
  },
  inputError: {
    borderColor: '#dc2626',
  },
  row: {
    flexDirection: 'row',
    gap: 12,
  },
  halfWidth: {
    flex: 1,
  },
  radioGroup: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 16,
    marginTop: 8,
    marginBottom: 8,
  },
  radioOption: {
    flexDirection: 'row',
    alignItems: 'center',
    marginRight: 8,
  },
  radioCircle: {
    width: 20,
    height: 20,
    borderRadius: 10,
    borderWidth: 2,
    borderColor: '#5f8a8b',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 8,
  },
  radioSelected: {
    width: 10,
    height: 10,
    borderRadius: 5,
    backgroundColor: '#5f8a8b',
  },
  radioLabel: {
    fontSize: 14,
    color: '#374151',
  },
  textArea: {
    borderWidth: 1,
    borderColor: '#e5e7eb',
    borderRadius: 8,
    padding: 12,
    fontSize: 14,
    color: '#1f2937',
    backgroundColor: '#fff',
    minHeight: 120,
  },
  charCount: {
    fontSize: 12,
    color: '#9ca3af',
    textAlign: 'right',
    marginTop: 4,
  },
  counterContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#e5e7eb',
    borderRadius: 8,
    padding: 12,
    marginTop: 8,
  },
  counterValue: {
    fontSize: 14,
    color: '#374151',
    fontWeight: '500',
  },
  counterButtons: {
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#e5e7eb',
    borderRadius: 6,
  },
  counterButton: {
    width: 32,
    height: 32,
    justifyContent: 'center',
    alignItems: 'center',
  },
  counterButtonText: {
    fontSize: 18,
    color: '#374151',
    fontWeight: '600',
  },
  counterButtonDisabled: {
    color: '#d1d5db',
  },
  counterDivider: {
    width: 1,
    height: 24,
    backgroundColor: '#e5e7eb',
  },
  error: {
    color: '#dc2626',
    fontSize: 12,
    marginTop: -12,
    marginBottom: 8,
  },
  submitButton: {
    backgroundColor: '#5f8a8b',
    padding: 16,
    borderRadius: 12,
    marginBottom: 40,
    elevation: 3,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
  },
  submitButtonText: {
    color: '#fff',
    textAlign: 'center',
    fontSize: 16,
    fontWeight: '600',
  },
});

export default JobForm;