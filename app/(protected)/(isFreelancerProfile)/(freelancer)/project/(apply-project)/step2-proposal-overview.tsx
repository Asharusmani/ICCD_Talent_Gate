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
import { useForm, Controller } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { LinearGradient } from 'expo-linear-gradient';
import { step2Schema } from '@/components/schemas/schema';
import { useAppSelector } from '@/hooks/use-apply-project';
import { useAppDispatch } from '@/hooks/use-apply-project';
import { Step2Data } from '@/components/types/proposal.types';
import FormTemplate from '@/components/template/form-template';
import { setProjectData } from '@/store/slices/apply-project-slice';

interface Step2Props {
  initialData?: Step2Data;
  onComplete: (data: Step2Data) => void;
  onBack: () => void;
}

const Step2ProposalOverview: React.FC<Step2Props> = ({ initialData, onComplete, onBack }) => {

  const dispatch = useAppDispatch()
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<Step2Data>({
    resolver: yupResolver(step2Schema),
    defaultValues: initialData || {
      coverLetter: '',
      proposedDeliverables: '',
      estimatedTime: '',
      timeUnit: 'days',
    },
  });

  const onSubmit = (data: Step2Data) => {
    // onComplete(data);
    // console.log("data: ", data)
    dispatch(setProjectData(data))
    router.push('/project/step3-pricing')
  };

  return (
    <FormTemplate>
      <View style={styles.card}>
        <Text style={styles.title}>Step 2 of 5: Proposal Overview</Text>
        <View style={styles.fieldContainer}>
          <Text style={styles.label}>
            Cover Letter <Text style={styles.required}>*</Text>
          </Text>
          <Controller
            control={control}
            name="coverLetter"
            render={({ field: { onChange, onBlur, value } }) => (
              <TextInput
                style={[styles.textArea, errors.coverLetter && styles.inputError]}
                value={value}
                onChangeText={onChange}
                onBlur={onBlur}
                placeholder="Explain your understanding of the project..."
                placeholderTextColor="#A0A0A0"
                multiline
                numberOfLines={6}
                textAlignVertical="top"
              />
            )}
          />
          {errors.coverLetter && (
            <Text style={styles.error}>{errors.coverLetter.message}</Text>
          )}
        </View>
        <View style={styles.fieldContainer}>
          <Text style={styles.label}>
            Proposed Deliverables <Text style={styles.required}>*</Text>
          </Text>
          <Controller
            control={control}
            name="proposedDeliverables"
            render={({ field: { onChange, onBlur, value } }) => (
              <TextInput
                style={[styles.textArea, errors.proposedDeliverables && styles.inputError]}
                value={value}
                onChangeText={onChange}
                onBlur={onBlur}
                placeholder="List the items you commit to delivering..."
                placeholderTextColor="#A0A0A0"
                multiline
                numberOfLines={5}
                textAlignVertical="top"
              />
            )}
          />
          {errors.proposedDeliverables && (
            <Text style={styles.error}>{errors.proposedDeliverables.message}</Text>
          )}
        </View>
        <View style={styles.row}>
          <View style={styles.halfWidth}>
            <Text style={styles.label}>
              Estimated Time <Text style={styles.required}>*</Text>
            </Text>
            <Controller
              control={control}
              name="estimatedTime"
              render={({ field: { onChange, onBlur, value } }) => (
                <TextInput
                  style={[styles.input, errors.estimatedTime && styles.inputError]}
                  value={value}
                  onChangeText={onChange}
                  onBlur={onBlur}
                  placeholder="0"
                  keyboardType="numeric"
                  placeholderTextColor="#A0A0A0"
                />
              )}
            />
            {errors.estimatedTime && (
              <Text style={styles.error}>{errors.estimatedTime.message}</Text>
            )}
          </View>
          <View style={styles.halfWidth}>
            <Text style={styles.label}>Time Unit</Text>
            <Controller
              control={control}
              name="timeUnit"
              render={({ field: { onChange, value } }) => (
                <View style={styles.pickerContainer}>
                  {(['hours', 'days', 'weeks', 'months'] as const).map((unit) => (
                    <TouchableOpacity
                      key={unit}
                      style={[
                        styles.pickerOption,
                        value === unit && styles.pickerOptionActive,
                      ]}
                      onPress={() => onChange(unit)}
                    >
                      <Text
                        style={[
                          styles.pickerText,
                          value === unit && styles.pickerTextActive,
                        ]}
                      >
                        {unit.charAt(0).toUpperCase() + unit.slice(1)}
                      </Text>
                    </TouchableOpacity>
                  ))}
                </View>
              )}
            />
          </View>
        </View>
        <View style={styles.buttonRow}>
          <TouchableOpacity style={styles.backButton} onPress={onBack}>
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
    // backgroundColor: '#F9F9F9',
  },
  scrollContent: {
    flexGrow: 1,
    padding: 12,
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
  textArea: {
    backgroundColor: '#fff',
    borderRadius: 8,
    paddingHorizontal: 15,
    paddingVertical: 12,
    borderWidth: 1,
    borderColor: '#E0E0E0',
    fontSize: 14,
    color: '#000',
    height: 100,
    textAlignVertical: 'top',
  },
  inputError: {
    borderColor: '#EF4444',
  },
  error: {
    color: '#EF4444',
    fontSize: 12,
    marginTop: 4,
  },
  row: {
    flexDirection: 'row',
    gap: 10,
    marginBottom: 16,
  },
  halfWidth: {
    flex: 1,
  },
  pickerContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 8,
  },
  pickerOption: {
    paddingHorizontal: 12,
    paddingVertical: 8,
    borderRadius: 6,
    borderWidth: 1,
    borderColor: '#E0E0E0',
    backgroundColor: '#fff',
  },
  pickerOptionActive: {
    backgroundColor: '#109f93ff',
    borderColor: '#109f93ff',
  },
  pickerText: {
    fontSize: 12,
    color: '#6B7280',
    fontWeight: '500',
  },
  pickerTextActive: {
    color: '#fff',
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

export default Step2ProposalOverview;