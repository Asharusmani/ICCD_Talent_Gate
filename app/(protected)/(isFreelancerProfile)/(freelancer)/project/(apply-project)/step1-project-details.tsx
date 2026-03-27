import React from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  KeyboardAvoidingView,
  ScrollView,
  Platform
} from 'react-native';
import { router } from 'expo-router';
import { useLocalSearchParams } from 'expo-router';
import { useForm, Controller } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { LinearGradient } from 'expo-linear-gradient';
import { step1Schema } from '@/components/schemas/schema';
import { useAppDispatch } from '@/hooks/use-apply-project';
import { Step1Data } from '@/components/types/proposal.types';
import { setProjectData } from '@/store/slices/apply-project-slice';

interface Step1Props {
  initialData?: Step1Data;
  onComplete: (data: Step1Data) => void;
}

const Step1ProjectDetails: React.FC<Step1Props> = ({ initialData, onComplete }) => {

  const dispatch = useAppDispatch()
  const { freelancerId, projectId, clientId } = useLocalSearchParams()
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<Step1Data>({
    resolver: yupResolver(step1Schema),
    defaultValues: initialData || {
      projectTitle: '',
      freelancerName: '',
      contactEmail: '',
    },
  });

  const onSubmit = (data: Step1Data) => {
    dispatch(setProjectData({
      email: data.contactEmail,
      projectTitle: data.projectTitle,
      name: data.freelancerName,
      freelancerId,
      projectId,
      clientId
    }))
    router.push('/project/step2-proposal-overview')
  };

  return (
    <KeyboardAvoidingView
      style={styles.keyboardView}
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      keyboardVerticalOffset={Platform.OS === 'ios' ? 100 : 0}
    >
      <ScrollView
        contentContainerStyle={styles.scrollContent}
        keyboardShouldPersistTaps="handled"
        showsVerticalScrollIndicator={false}
      >
        <View style={styles.container}>
          <View style={styles.card}>
            <Text style={styles.title}>Step 1 of 5: Project Details</Text>
            <View style={styles.fieldContainer}>
              <Text style={styles.label}>
                Project Title <Text style={styles.required}>*</Text>
              </Text>
              <Controller
                control={control}
                name="projectTitle"
                render={({ field: { onChange, onBlur, value } }) => (
                  <TextInput
                    style={[styles.input, errors.projectTitle && styles.inputError]}
                    value={value}
                    onChangeText={onChange}
                    onBlur={onBlur}
                    placeholder="Enter project title"
                    placeholderTextColor="#A0A0A0"
                  />
                )}
              />
              {errors.projectTitle && (
                <Text style={styles.error}>{errors.projectTitle.message}</Text>
              )}
            </View>

            <View style={styles.fieldContainer}>
              <Text style={styles.label}>
                Freelancer / Company Name <Text style={styles.required}>*</Text>
              </Text>
              <Controller
                control={control}
                name="freelancerName"
                render={({ field: { onChange, onBlur, value } }) => (
                  <TextInput
                    style={[styles.input, errors.freelancerName && styles.inputError]}
                    value={value}
                    onChangeText={onChange}
                    onBlur={onBlur}
                    placeholder="Enter your name or company name"
                    placeholderTextColor="#A0A0A0"
                  />
                )}
              />
              {errors.freelancerName && (
                <Text style={styles.error}>{errors.freelancerName.message}</Text>
              )}
            </View>

            <View style={styles.fieldContainer}>
              <Text style={styles.label}>
                Contact Email <Text style={styles.required}>*</Text>
              </Text>
              <Controller
                control={control}
                name="contactEmail"
                render={({ field: { onChange, onBlur, value } }) => (
                  <TextInput
                    style={[styles.input, errors.contactEmail && styles.inputError]}
                    value={value}
                    onChangeText={onChange}
                    onBlur={onBlur}
                    placeholder="your.email@example.com"
                    keyboardType="email-address"
                    autoCapitalize="none"
                    placeholderTextColor="#A0A0A0"
                  />
                )}
              />
              {errors.contactEmail && (
                <Text style={styles.error}>{errors.contactEmail.message}</Text>
              )}
            </View>

            <TouchableOpacity style={styles.button} onPress={handleSubmit(onSubmit)}>
              <LinearGradient
                colors={['#15A9B2', '#115B60']}
                start={{ x: 0, y: 0 }}
                end={{ x: 1, y: 0 }}
                style={styles.gradient}
              >
                <Text style={styles.buttonText}>Continue</Text>
              </LinearGradient>
            </TouchableOpacity>
          </View>
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
};

const styles = StyleSheet.create({
  keyboardView: {
    flex: 1,
    backgroundColor: '#F4F4F4'
  },
  scrollContent: {
    flexGrow: 1,
  },
  container: {
    flex: 1,
    padding: 20,
  },
  card: {
    backgroundColor: '#fff',
    borderRadius: 12,
    padding: 20,
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
  title: {
    fontSize: 18,
    fontWeight: '600',
    color: '#1F2937',
    marginBottom: 20,
  },
  fieldContainer: {
    marginBottom: 16,
  },
  label: {
    fontSize: 14,
    fontWeight: '600',
    color: '#333',
    marginBottom: 8,
  },
  required: {
    color: '#EF4444',
  },
  input: {
    backgroundColor: '#fff',
    borderRadius: 8,
    paddingHorizontal: 15,
    paddingVertical: 12,
    borderWidth: 1,
    borderColor: '#E0E0E0',
    fontSize: 14,
    color: '#000',
  },
  inputError: {
    borderColor: '#EF4444',
  },
  error: {
    color: '#EF4444',
    fontSize: 12,
    marginTop: 4,
  },
  button: {
    marginTop: 20,
  },
  gradient: {
    paddingVertical: 14,
    borderRadius: 10,
    alignItems: 'center',
  },
  buttonText: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 16,
  },
});

export default Step1ProjectDetails;