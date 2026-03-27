import React, { useState } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  ScrollView,
  StyleSheet,
  Image,
  StatusBar,
  Alert,
  Platform
} from 'react-native';
import { router } from 'expo-router';
import * as ImagePicker from 'expo-image-picker';
import SelectBox from '@/components/ui/select-box';
import InputField from '@/components/ui/input-field';
import { useForm, Controller } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { useAppDispatch } from '@/hooks/use-apply-project';
import { SafeAreaView } from 'react-native-safe-area-context';
import { setProfile } from '@/store/slices/freelancer-profile';
import FormTemplate from '@/components/template/form-template';
import { personalInfoSchema } from '@/components/schemas/schema';
import StepsNavigation from '@/components/forms/freelancer/profile-step-navigation';

type FormData = {
  firstName: string;
  lastName: string;
  email: string;
  country: string;
  city: string;
  files: any;
};

const countryOptions = [
  { label: 'Pakistan', value: 'PK' },
  { label: 'United States', value: 'US' },
  { label: 'United Kingdom', value: 'UK' },
];

const cityOptions = [
  { label: 'Karachi', value: 'karachi' },
  { label: 'Lahore', value: 'lahore' },
  { label: 'Islamabad', value: 'islamabad' },
];

const PersonalInfoScreen = () => {

  const dispatch = useAppDispatch()

  const {
    control,
    watch,
    setValue,
    handleSubmit,
    formState: { errors },
  } = useForm<FormData>({
    resolver: yupResolver(personalInfoSchema),
    defaultValues: {
      firstName: '',
      lastName: '',
      email: '',
      country: '',
      city: '',
      files: null
    },
  });

  const files = watch('files');

  const pickImage = async () => {
    const requestPermission = async () => {
      if (Platform.OS !== 'web') {
        const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();

        if (status !== 'granted') {
          Alert.alert(
            'Permission Required',
            'Sorry, we need camera roll permissions to upload images.',
            [{ text: 'OK' }]
          );
          return false;
        }
      }
      return true;
    };

    const hasPermission = await requestPermission();
    if (!hasPermission) return;

    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ['images'],
      allowsMultipleSelection: true,
      selectionLimit: 5,
      quality: 1,
    });

    if (!result.canceled) {
      setValue('files', result.assets[0], {
        shouldValidate: true,
        shouldDirty: true,
      });
    }
  };

  const onSubmit = (data: FormData) => {
    console.log('FORM DATA:', data);
    dispatch(setProfile(data))
    router.push('/portfolio-form')
  };

  return (
    <SafeAreaView style={styles.container}>

      {/* Header */}
      {/* <View style={styles.header}>
        <View style={styles.completionBadge}>
          <Text style={styles.completionText}>33%</Text>
        </View>
      </View> */}

      {/* Steps Navigation */}
      {/* <StepsNavigation currentStep={currentStep} onStepPress={setCurrentStep} /> */}

      <FormTemplate>
        {/* Active Step Card */}
        <View style={styles.activeStepCard}>
          <View style={styles.activeStepHeader}>
            <View style={styles.activeStepIcon}>
              <Text style={styles.activeStepIconText}>1</Text>
            </View>
            <Text style={styles.activeStepTitle}>Personal Information</Text>
          </View>
        </View>

        {/* Form Section */}
        <View style={styles.formSection}>
          <Text style={styles.sectionTitle}>Personal Information</Text>
          <Text style={styles.sectionDescription}>
            Tell us a bit about yourself. This information will appear on your public profile, so
            that potential buyers can get to know you better.
          </Text>
          <Text style={styles.mandatoryText}>* Mandatory fields</Text>

          {/* First Name */}
          <View style={styles.inputGroup}>
            <Controller
              control={control}
              name="firstName"
              render={({ field: { onChange, value } }) => (
                <InputField
                  label="First Name"
                  placeholder="John"
                  value={value}
                  onChangeText={onChange}
                  required
                />
              )}
            />
            {errors.firstName && (
              <Text style={styles.errorText}>{errors.firstName.message}</Text>
            )}
          </View>

          {/* Last Name */}
          <View style={styles.inputGroup}>
            <Controller
              control={control}
              name="lastName"
              render={({ field: { onChange, value } }) => (
                <InputField
                  label="Last Name"
                  placeholder="Smith"
                  value={value}
                  onChangeText={onChange}
                  required
                />
              )}
            />
            {errors.lastName && (
              <Text style={styles.errorText}>{errors.lastName.message}</Text>
            )}
          </View>

          {/* Profile Picture */}
          <View style={styles.inputGroup}>
            <Text style={styles.label}>
              Profile Picture <Text style={styles.required}>*</Text>
            </Text>
            <Text style={styles.inputDescription}>
              Add a photo to build trust (max 5MB)
            </Text>

            <TouchableOpacity
              style={styles.imageUpload}
              onPress={pickImage}
              activeOpacity={0.8}
            >
              {files ? (
                <Image source={{ uri: files.uri }} style={styles.profileImage} />
              ) : (
                <Text style={styles.uploadText}>👤</Text>
              )}
            </TouchableOpacity>
          </View>

          {/* Email */}
          <View style={styles.inputGroup}>
            <Controller
              control={control}
              name="email"
              render={({ field: { onChange, value } }) => (
                <InputField
                  label="Email"
                  placeholder="john@example.com"
                  value={value}
                  onChangeText={onChange}
                  keyboardType="email-address"
                  required
                />
              )}
            />
            {errors.email && (
              <Text style={styles.errorText}>{errors.email.message}</Text>
            )}
          </View>

          {/* Country */}
          <View style={styles.inputGroup}>
            <Controller
              control={control}
              name="country"
              render={({ field: { onChange, value } }) => (
                <SelectBox
                  label="Country"
                  selectedValue={value}
                  onValueChange={onChange}
                  options={countryOptions}
                  required
                />
              )}
            />
            {errors.country && (
              <Text style={styles.errorText}>{errors.country.message}</Text>
            )}
          </View>

          {/* City */}
          <View style={styles.inputGroup}>
            <Controller
              control={control}
              name="city"
              render={({ field: { onChange, value } }) => (
                <SelectBox
                  label="City"
                  selectedValue={value}
                  onValueChange={onChange}
                  options={cityOptions}
                  required
                />
              )}
            />
            {errors.city && (
              <Text style={styles.errorText}>{errors.city.message}</Text>
            )}
          </View>
        </View>

      </FormTemplate>

      {/* Footer */}
      <View style={styles.footer}>
        <TouchableOpacity
          style={styles.submitButton}
          onPress={handleSubmit(onSubmit)}
        >
          <Text style={styles.submitButtonText}>Continue →</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F4F4F4'
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 16,
    backgroundColor: '#fff',
    justifyContent: 'space-between',
  },
  backButton: {
    width: 40,
    height: 40,
    borderRadius: 8,
    backgroundColor: '#1a5f5f',
    justifyContent: 'center',
    alignItems: 'center',
  },
  backButtonText: {
    color: '#fff',
    fontSize: 20,
  },
  completionBadge: {
    backgroundColor: '#5a9090',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 12,
  },
  completionText: {
    color: '#fff',
    fontSize: 12,
    fontWeight: '600',
  },
  content: {
    flex: 1,
  },
  activeStepCard: {
    backgroundColor: '#1a5f5f',
    marginHorizontal: 16,
    marginTop: 16,
    marginBottom: 8,
    padding: 16,
    borderRadius: 12,
  },
  activeStepHeader: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  activeStepIcon: {
    width: 32,
    height: 32,
    borderRadius: 16,
    backgroundColor: 'rgba(255,255,255,0.2)',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 12,
  },
  activeStepIconText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '600',
  },
  activeStepTitle: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '600',
  },
  formSection: {
    backgroundColor: '#fff',
    marginHorizontal: 16,
    marginBottom: 16,
    padding: 20,
    borderRadius: 12,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: '700',
    color: '#000',
    marginBottom: 8,
  },
  sectionDescription: {
    fontSize: 13,
    color: '#666',
    lineHeight: 18,
    marginBottom: 8,
  },
  mandatoryText: {
    fontSize: 13,
    color: '#5a9090',
    marginBottom: 20,
    fontStyle: 'italic',
  },
  inputGroup: {
    marginBottom: 20,
  },
  label: {
    fontSize: 14,
    fontWeight: '600',
    color: '#000',
    marginBottom: 4,
  },
  required: {
    color: '#e74c3c',
  },
  inputDescription: {
    fontSize: 12,
    color: '#666',
    marginBottom: 8,
  },
  errorText: {
    color: '#e74c3c',
    fontSize: 12,
    marginTop: 4,
  },
  imageUpload: {
    width: 100,
    height: 100,
    borderRadius: 50,
    borderWidth: 1,
    borderColor: '#e0e0e0',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#f8f8f8',
    alignSelf: 'flex-start',
  },
  uploadText: {
    fontSize: 40,
    color: '#999',
    textAlign: 'center',
  },
  profileImage: {
    width: 100,
    height: 100,
    borderRadius: 50,
  },
  footer: {
    backgroundColor: '#fff',
    padding: 16,
    borderTopWidth: 1,
    borderTopColor: '#e0e0e0',
  },
  submitButton: {
    backgroundColor: '#5a9090',
    paddingVertical: 16,
    borderRadius: 8,
    alignItems: 'center',
  },
  submitButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '600',
  },
});

export default PersonalInfoScreen;