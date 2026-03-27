import React from 'react';
import { router } from 'expo-router';
import { useForm, Controller } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { LinearGradient } from 'expo-linear-gradient';
import * as DocumentPicker from 'expo-document-picker';
import { step4Schema } from '@/components/schemas/schema';
import { useAppDispatch } from '@/hooks/use-apply-project';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { Step4Data } from '@/components/types/proposal.types';
import FormTemplate from '@/components/template/form-template';
import { setProjectData } from '@/store/slices/apply-project-slice';
import { View, Text, TextInput, TouchableOpacity, StyleSheet } from 'react-native';

interface Step4Props {
  portfolioLink: string;
  proposalFile: null | any
}

const Step4Experience: React.FC<Step4Props> = () => {
  const dispatch = useAppDispatch()

  const {
    control,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm<Step4Props>({
    resolver: yupResolver(step4Schema),
    defaultValues: {
      portfolioLink: '',
      proposalFile: null,
    },
  });

  const pickDocument = async () => {
    const result = await DocumentPicker.getDocumentAsync({
      type: [
        'application/pdf',
        'application/msword',
        'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
      ],
    });

    if (!result.canceled && result.assets[0]) {
      setValue('proposalFile', result.assets[0], { shouldValidate: true });
    }
  };

  const onSubmit = (data: Step4Props) => {
    dispatch(setProjectData(data))
    router.push('/project/step5-confirmation')
  };

  return (
    <FormTemplate>
      <View style={styles.card}>
        <Text style={styles.title}>Step 4 of 5: Experience</Text>
        <View style={styles.fieldContainer}>
          <Text style={styles.label}>
            Portfolio / Website Link <Text style={styles.required}>*</Text>
          </Text>
          <Controller
            control={control}
            name="portfolioLink"
            render={({ field: { onChange, onBlur, value } }) => (
              <TextInput
                style={[styles.input, errors.portfolioLink && styles.inputError]}
                value={value}
                onChangeText={onChange}
                onBlur={onBlur}
                placeholder="https://yourportfolio.com"
                keyboardType="url"
                autoCapitalize="none"
                placeholderTextColor="#A0A0A0"
              />
            )}
          />
          {errors.portfolioLink && (
            <Text style={styles.error}>{errors.portfolioLink.message}</Text>
          )}
        </View>

        <View style={styles.fieldContainer}>
          <Text style={styles.label}>
            Upload Proposal <Text style={styles.required}>*</Text>
          </Text>
          <Controller
            control={control}
            name="proposalFile"
            render={({ field: { value } }) => (
              <TouchableOpacity
                style={[styles.uploadContainer, errors.proposalFile && styles.uploadError]}
                activeOpacity={0.7}
                onPress={pickDocument}
              >
                <MaterialCommunityIcons
                  name="upload-network-outline"
                  size={40}
                  color="#4A7A7C"
                />
                <Text style={styles.uploadText}>
                  {value?.name || 'Click to upload proposal'}
                </Text>
                <Text style={styles.uploadSubtext}>PDF or DOCX (max 5MB)</Text>
              </TouchableOpacity>
            )}
          />
          {errors.proposalFile && (
            <Text style={styles.error}>{errors.proposalFile.message}</Text>
          )}
        </View>

        <View style={styles.buttonRow}>
          <TouchableOpacity style={styles.backButton} >
            <Text style={styles.backButtonText}>Back</Text>
          </TouchableOpacity>

          <TouchableOpacity style={styles.continueButton} onPress={handleSubmit(onSubmit)}>
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
    </FormTemplate>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F9F9F9',
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
  uploadContainer: {
    borderWidth: 1,
    borderColor: '#B0B0B0',
    borderStyle: 'dashed',
    borderRadius: 10,
    height: 140,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(255,255,255,0.5)',
  },
  uploadError: {
    borderColor: '#EF4444',
  },
  uploadText: {
    fontSize: 14,
    color: '#4A7A7C',
    marginTop: 10,
    textAlign: 'center',
    fontWeight: '500',
  },
  uploadSubtext: {
    fontSize: 11,
    color: '#9CA3AF',
    marginTop: 4,
  },
  buttonRow: {
    flexDirection: 'row',
    gap: 10,
    marginTop: 20,
  },
  backButton: {
    flex: 1,
    borderWidth: 1,
    borderColor: '#21818B',
    borderRadius: 10,
    paddingVertical: 14,
    alignItems: 'center',
  },
  backButtonText: {
    color: '#21818B',
    fontWeight: 'bold',
    fontSize: 16,
  },
  continueButton: {
    flex: 1,
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

export default Step4Experience;