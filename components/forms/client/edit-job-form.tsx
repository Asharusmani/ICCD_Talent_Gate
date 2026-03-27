import React, { useState } from 'react';
import {
  View,
  ScrollView,
  Text,
  TouchableOpacity,
  TextInput,
  StyleSheet,
  Image,
} from 'react-native';
import { useForm, Controller } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import SelectBox from '@/components/ui/select-box';
import { jobPostingSchema } from '@/components/schemas/schema';



const EditJobForm = () => {
  const [hiringCount, setHiringCount] = useState(1);

  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(jobPostingSchema),
    defaultValues: {
      jobTitle: '',
      location: '',
      jobType: 'Full-time',
      payType: '',
      minimum: '',
      maximum: '',
      description: '',
      hiringCount: 1,
    },
  });

  const onSubmit = (data: any) => {
    console.log('JOB POSTING DATA 👉', { ...data, hiringCount });
  };

  const incrementCount = () => setHiringCount(prev => prev + 1);
  const decrementCount = () => setHiringCount(prev => (prev > 1 ? prev - 1 : 1));

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
            user-friendly
          </Text>
        </View>
        <Image
          source={require('../../assets/images/hirefast.png')}
          style={styles.illustration}
          resizeMode="contain"
        />
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
          We share one job title with the employer to introduce you as a candidate.
        </Text>

        <Controller
          control={control}
          name="jobTitle"
          render={({ field: { onChange, value } }) => (
            <View style={styles.inputContainer}>
              <Text style={styles.label}>Job Title</Text>
              <TextInput
                style={styles.input}
                placeholder="Jobs title"
                value={value}
                onChangeText={onChange}
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
          render={({ field: { onChange, value } }) => (
            <View style={styles.inputContainer}>
              <Text style={styles.label}>Location</Text>
              <TextInput
                style={styles.input}
                placeholder="Select location"
                value={value}
                onChangeText={onChange}
                placeholderTextColor="#9ca3af"
              />
            </View>
          )}
        />
        {errors.location && (
          <Text style={styles.error}>{errors.location.message}</Text>
        )}
      </View>

      {/* Step 3: Add job details */}
      <View style={styles.card}>
        <View style={styles.cardHeader}>
          <View style={styles.stepBadge}>
            <Text style={styles.stepNumber}>3</Text>
          </View>
          <Text style={styles.cardTitle}>Add job details</Text>
        </View>

        <Text style={styles.label}>Job type</Text>
        <Controller
          control={control}
          name="jobType"
          render={({ field: { onChange, value } }) => (
            <View style={styles.radioGroup}>
              {['Full-time', 'Part-time', 'Contract', 'Internship'].map(type => (
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
          render={({ field: { onChange, value } }) => (
            <View style={styles.inputContainer}>
              <Text style={styles.label}>Pay type</Text>
              <TextInput
                style={styles.input}
                placeholder="Select Pay type"
                value={value}
                onChangeText={onChange}
                placeholderTextColor="#9ca3af"
              />
            </View>
          )}
        />

        <Controller
          control={control}
          name="minimum"
          render={({ field: { onChange, value } }) => (
            <View style={styles.inputContainer}>
              <Text style={styles.label}>Minimum</Text>
              <TextInput
                style={styles.input}
                placeholder=""
                value={value}
                onChangeText={onChange}
                keyboardType="numeric"
              />
            </View>
          )}
        />

        <Controller
          control={control}
          name="maximum"
          render={({ field: { onChange, value } }) => (
            <View style={styles.inputContainer}>
              <Text style={styles.label}>Maximum</Text>
              <TextInput
                style={styles.input}
                placeholder=""
                value={value}
                onChangeText={onChange}
                keyboardType="numeric"
              />
            </View>
          )}
        />
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
          render={({ field: { onChange, value } }) => (
            <TextInput
              style={styles.textArea}
              placeholder="Write job description here..."
              value={value}
              onChangeText={onChange}
              multiline
              numberOfLines={8}
              textAlignVertical="top"
              placeholderTextColor="#9ca3af"
            />
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
          <Text style={styles.counterValue}>{hiringCount} person</Text>
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
            >
              <Text style={styles.counterButtonText}>−</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>

      {/* Submit Button */}
      <TouchableOpacity
        style={styles.submitButton}
        onPress={handleSubmit(onSubmit)}
      >
        <Text style={styles.submitButtonText}>Submit</Text>
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
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  headerContent: {
    flex: 1,
  },
  headerTitle: {
    fontSize: 18,
    fontWeight: '700',
    color: '#1f2937',
  },
  headerSubtitle: {
    fontSize: 12,
    color: '#6b7280',
    marginTop: 8,
    lineHeight: 18,
  },
  illustration: {
    width: 80,
    height: 80,
  },
  card: {
    backgroundColor: '#fff',
    borderRadius: 16,
    padding: 20,
    marginBottom: 16,
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
  radioGroup: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 16,
    marginTop: 8,
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
  counterDivider: {
    width: 1,
    height: 24,
    backgroundColor: '#e5e7eb',
  },
  error: {
    color: '#dc2626',
    fontSize: 12,
    marginTop: -8,
    marginBottom: 8,
  },
  submitButton: {
    backgroundColor: '#5f8a8b',
    padding: 16,
    borderRadius: 12,
    marginBottom: 40,
  },
  submitButtonText: {
    color: '#fff',
    textAlign: 'center',
    fontSize: 16,
    fontWeight: '600',
  },
});

export default EditJobForm;