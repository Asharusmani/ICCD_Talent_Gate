// PortfolioForm.tsx
import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  StatusBar,
  ScrollView,
  Alert,
} from 'react-native';
import { router } from 'expo-router';
import { useLocalSearchParams } from 'expo-router';
import { useForm, Controller } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as DocumentPicker from 'expo-document-picker';
import { useAppDispatch } from '@/hooks/use-apply-project';
import { SafeAreaView } from 'react-native-safe-area-context';
import { portfolioSchema } from '@/components/schemas/schema';
import FormTemplate from '@/components/template/form-template';
import { setProfile } from '@/store/slices/freelancer-profile';
import { PortfolioFormData } from '@/components/types/proposal.types';
import StepsNavigation from '@/components/forms/freelancer/profile-step-navigation';
import { useAuth } from '@/utils/auth-context';

export default function PortfolioForm() {

  const { freelancer } = useAuth()
  const dispatch = useAppDispatch()
  const { id } = useLocalSearchParams()

  console.log("id: ", id)

  const {
    control,
    handleSubmit,
    setValue,
    watch,
    formState: { errors },
  } = useForm<PortfolioFormData>({
    resolver: yupResolver(portfolioSchema),
    defaultValues: {
      portfolioUrl: '',
      portfolio_files: [],
    },
  });

  const portfolio_files = watch('portfolio_files');

  const handleFileUpload = async () => {
    if (portfolio_files.length >= 3) {
      Alert.alert('Limit reached', 'You can upload a maximum of 3 files.');
      return;
    }
    try {
      const result = await DocumentPicker.getDocumentAsync({
        type: [
          'image/*',
          'application/pdf',
          'application/msword',
          'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
        ],
        copyToCacheDirectory: true,
        multiple: false,
      });

      if (!result.canceled && result.assets && result.assets.length > 0) {
        const file = result.assets[0];
        const newFiles = [...portfolio_files, file];
        setValue('portfolio_files', newFiles, { shouldValidate: true });
      }
    } catch (error) {
      console.error('Error picking document:', error);
      Alert.alert('Error', 'Failed to pick document. Please try again.');
    }
  };

  const removeFile = (index: number) => {
    const newFiles = portfolio_files.filter((_, i) => i !== index);
    setValue('portfolio_files', newFiles, { shouldValidate: true });
  };

  const onSubmit = (data: PortfolioFormData) => {
    dispatch(setProfile(data))
    router.push(`/edit-profile/${freelancer.id}/edit-professional-info-form`)
  };

  return (
    <SafeAreaView style={styles.container}>
      {/* <View style={styles.header}>
        <TouchableOpacity style={styles.backButton}>
          <Text style={styles.backButtonText}>←</Text>
        </TouchableOpacity>
        <Text style={styles.time}>9:41</Text>
      </View> */}

      {/* <StepsNavigation currentStep={currentStep} onStepPress={setCurrentStep} /> */}

      <FormTemplate>
        {/* Active Step Card */}
        <View style={styles.activeStepCard}>
          <View style={styles.activeStepHeader}>
            <View style={styles.activeStepIcon}>
              <Text style={styles.activeStepIconText}>2</Text>
            </View>
            <Text style={styles.activeStepTitle}>Portfolio & Work Samples</Text>
          </View>
        </View>

        {/* Form Section */}
        <View style={styles.formSection}>
          <Text style={styles.sectionTitle}>Portfolio</Text>
          <Text style={styles.sectionDescription}>
            Tell us a bit about yourself. This information will appear on your public profile.
          </Text>

          {/* Portfolio URL */}
          <View style={styles.inputGroup}>
            <Text style={styles.label}>
              Portfolio URL <Text style={styles.required}>*</Text>
            </Text>
            <Controller
              control={control}
              name="portfolioUrl"
              render={({ field: { onChange, onBlur, value } }) => (
                <TextInput
                  style={[styles.input, errors.portfolioUrl && styles.inputError]}
                  placeholder="https://yourportfolio.com"
                  placeholderTextColor="#999"
                  value={value}
                  onChangeText={onChange}
                  onBlur={onBlur}
                  autoCapitalize="none"
                  keyboardType="url"
                />
              )}
            />
            {errors.portfolioUrl && (
              <Text style={styles.errorText}>{errors.portfolioUrl.message}</Text>
            )}
          </View>

          {/* Upload Work Samples */}
          <View style={styles.inputGroup}>
            <Text style={styles.label}>
              Upload Work Samples <Text style={styles.required}>*</Text>
            </Text>
            <Text style={styles.inputDescription}>
              Add up to 3 images or documents to showcase your work.
            </Text>

            {/* Uploaded Files List */}
            {portfolio_files.map((file, index) => (
              <View key={index} style={styles.fileItem}>
                <View style={styles.fileInfo}>
                  <Text style={styles.fileName} numberOfLines={1}>
                    {file.name}
                  </Text>
                  <Text style={styles.fileSize}>
                    {file.size ? `${(file.size / 1024).toFixed(2)} KB` : 'Unknown size'}
                  </Text>
                </View>
                <TouchableOpacity
                  onPress={() => removeFile(index)}
                  style={styles.removeButton}
                >
                  <Text style={styles.removeButtonText}>×</Text>
                </TouchableOpacity>
              </View>
            ))}

            <TouchableOpacity
              style={[
                styles.uploadButton,
                errors.portfolio_files && styles.uploadButtonError,
                portfolio_files.length >= 3 && styles.uploadButtonDisabled,
              ]}
              onPress={handleFileUpload}
              disabled={portfolio_files.length >= 3}
            >
              <Text style={[
                styles.uploadButtonText,
                portfolio_files.length >= 3 && styles.uploadButtonTextDisabled,
              ]}>
                {portfolio_files.length >= 3 ? 'Maximum files reached' : '+ Choose file'}
              </Text>
            </TouchableOpacity>

            {errors.portfolio_files && (
              <Text style={styles.errorText}>{errors.portfolio_files.message}</Text>
            )}
          </View>
        </View>
      </FormTemplate>

      <View style={styles.footer}>
        <TouchableOpacity
          style={styles.continueButton}
          onPress={handleSubmit(onSubmit)}
        >
          <Text style={styles.continueButtonText}>Continue</Text>
          <Text style={styles.continueButtonArrow}>→</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#F4F4F4' },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 16,
    backgroundColor: '#fff'
  },
  backButton: {
    width: 40,
    height: 40,
    borderRadius: 8,
    backgroundColor: '#1a5f5f',
    justifyContent: 'center',
    alignItems: 'center'
  },
  backButtonText: { color: '#fff', fontSize: 20 },
  time: { flex: 1, textAlign: 'center', fontSize: 15, fontWeight: '600' },
  content: { flex: 1 },
  activeStepCard: {
    backgroundColor: '#1a5f5f',
    marginHorizontal: 16,
    marginTop: 16,
    marginBottom: 8,
    padding: 16,
    borderRadius: 12
  },
  activeStepHeader: { flexDirection: 'row', alignItems: 'center' },
  activeStepIcon: {
    width: 32,
    height: 32,
    borderRadius: 16,
    backgroundColor: 'rgba(255,255,255,0.2)',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 12
  },
  activeStepIconText: { color: '#fff', fontSize: 16, fontWeight: '600' },
  activeStepTitle: { color: '#fff', fontSize: 16, fontWeight: '600' },
  formSection: {
    backgroundColor: '#fff',
    marginHorizontal: 16,
    marginBottom: 16,
    padding: 20,
    borderRadius: 12
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: '700',
    color: '#000',
    marginBottom: 8
  },
  sectionDescription: {
    fontSize: 13,
    color: '#666',
    lineHeight: 18,
    marginBottom: 20
  },
  inputGroup: { marginBottom: 20 },
  label: { fontSize: 14, fontWeight: '600', color: '#000', marginBottom: 8 },
  required: { color: '#e74c3c' },
  input: {
    backgroundColor: '#f8f8f8',
    borderRadius: 8,
    paddingHorizontal: 16,
    paddingVertical: 14,
    fontSize: 14,
    borderWidth: 1,
    borderColor: '#e0e0e0'
  },
  inputError: { borderColor: '#e74c3c' },
  inputDescription: { fontSize: 12, color: '#666', marginBottom: 12 },
  errorText: { color: '#e74c3c', fontSize: 12, marginTop: 4 },
  fileItem: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#f8f8f8',
    borderRadius: 8,
    paddingHorizontal: 12,
    paddingVertical: 10,
    marginBottom: 8,
    borderWidth: 1,
    borderColor: '#e0e0e0'
  },
  fileInfo: { flex: 1 },
  fileName: { fontSize: 13, color: '#333', fontWeight: '500' },
  fileSize: { fontSize: 11, color: '#666', marginTop: 2 },
  removeButton: {
    width: 24,
    height: 24,
    borderRadius: 12,
    backgroundColor: '#e74c3c',
    justifyContent: 'center',
    alignItems: 'center',
    marginLeft: 8
  },
  removeButtonText: { color: '#fff', fontSize: 18, fontWeight: '600' },
  uploadButton: {
    backgroundColor: '#f8f8f8',
    borderRadius: 8,
    paddingHorizontal: 16,
    paddingVertical: 14,
    borderWidth: 1,
    borderColor: '#e0e0e0',
    alignItems: 'center'
  },
  uploadButtonError: { borderColor: '#e74c3c' },
  uploadButtonDisabled: {
    backgroundColor: '#f0f0f0',
    borderColor: '#d0d0d0'
  },
  uploadButtonText: { fontSize: 14, color: '#666', fontWeight: '500' },
  uploadButtonTextDisabled: { color: '#999' },
  footer: {
    backgroundColor: '#fff',
    padding: 16,
    borderTopWidth: 1,
    borderTopColor: '#e0e0e0'
  },
  continueButton: {
    backgroundColor: '#5a9090',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 16,
    borderRadius: 8
  },
  continueButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '600',
    marginRight: 8
  },
  continueButtonArrow: { color: '#fff', fontSize: 18 },
});