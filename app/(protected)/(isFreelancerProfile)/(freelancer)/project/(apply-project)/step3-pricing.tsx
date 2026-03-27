import React from 'react';
import { router } from 'expo-router';
import { useForm, Controller } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { LinearGradient } from 'expo-linear-gradient';
import { step3Schema } from '@/components/schemas/schema';
import { useAppDispatch } from '@/hooks/use-apply-project';
import { Step3Data } from '@/components/types/proposal.types';
import FormTemplate from '@/components/template/form-template';
import { setProjectData } from '@/store/slices/apply-project-slice';
import { View, Text, TextInput, TouchableOpacity, StyleSheet } from 'react-native';

interface Step3Props {
  initialData?: Step3Data;
  onComplete: (data: Step3Data) => void;
  onBack: () => void;
}

const PAYMENT_TERMS = [
  { value: 'fixed', label: 'Fixed Price', desc: 'One-time payment for the entire project' },
  { value: 'milestone', label: 'Milestone Based', desc: 'Payment divided into project milestones' },
  { value: 'hourly', label: 'Hourly', desc: 'Payment based on hours worked' },
] as const;

const Step3Pricing: React.FC<Step3Props> = ({ initialData, onComplete, onBack }) => {

  const dispatch = useAppDispatch()

  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<Step3Data>({
    resolver: yupResolver(step3Schema),
    defaultValues: initialData || {
      proposedBudget: '',
      currency: 'USD',
      paymentTerms: 'fixed',
    },
  });

  const onSubmit = (data: Step3Data) => {
    // onComplete(data);
    dispatch(setProjectData(data))
    router.push('/project/step4-experience')
  };

  return (
    <FormTemplate>
      <View style={styles.card}>
        <Text style={styles.title}>Step 3 of 5: Pricing</Text>

        <View style={styles.row}>
          <View style={styles.halfWidth}>
            <Text style={styles.label}>
              Proposed Budget <Text style={styles.required}>*</Text>
            </Text>
            <Controller
              control={control}
              name="proposedBudget"
              render={({ field: { onChange, onBlur, value } }) => (
                <TextInput
                  style={[styles.input, errors.proposedBudget && styles.inputError]}
                  value={value}
                  onChangeText={onChange}
                  onBlur={onBlur}
                  placeholder="0.00"
                  keyboardType="decimal-pad"
                  placeholderTextColor="#A0A0A0"
                />
              )}
            />
            {errors.proposedBudget && (
              <Text style={styles.error}>{errors.proposedBudget.message}</Text>
            )}
          </View>

          <View style={styles.halfWidth}>
            <Text style={styles.label}>Currency</Text>
            <Controller
              control={control}
              name="currency"
              render={({ field: { onChange, value } }) => (
                <View style={styles.pickerContainer}>
                  {(['USD', 'EUR', 'GBP', 'PKR'] as const).map((curr) => (
                    <TouchableOpacity
                      key={curr}
                      style={[
                        styles.pickerOption,
                        value === curr && styles.pickerOptionActive,
                      ]}
                      onPress={() => onChange(curr)}
                    >
                      <Text
                        style={[
                          styles.pickerText,
                          value === curr && styles.pickerTextActive,
                        ]}
                      >
                        {curr}
                      </Text>
                    </TouchableOpacity>
                  ))}
                </View>
              )}
            />
          </View>
        </View>

        <View style={styles.fieldContainer}>
          <Text style={styles.label}>
            Payment Terms <Text style={styles.required}>*</Text>
          </Text>
          <Controller
            control={control}
            name="paymentTerms"
            render={({ field: { onChange, value } }) => (
              <View>
                {PAYMENT_TERMS.map((term) => (
                  <TouchableOpacity
                    key={term.value}
                    style={styles.radioContainer}
                    onPress={() => onChange(term.value)}
                  >
                    <View style={styles.radioButton}>
                      {value === term.value && <View style={styles.radioButtonInner} />}
                    </View>
                    <View style={styles.radioContent}>
                      <Text style={styles.radioLabel}>{term.label}</Text>
                      <Text style={styles.radioDesc}>{term.desc}</Text>
                    </View>
                  </TouchableOpacity>
                ))}
              </View>
            )}
          />
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
  radioContainer: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    padding: 15,
    borderWidth: 1,
    borderColor: '#E0E0E0',
    borderRadius: 10,
    marginBottom: 12,
    backgroundColor: '#fff',
  },
  radioButton: {
    width: 20,
    height: 20,
    borderRadius: 10,
    borderWidth: 2,
    borderColor: '#109f93ff',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 12,
    marginTop: 2,
  },
  radioButtonInner: {
    width: 10,
    height: 10,
    borderRadius: 5,
    backgroundColor: '#109f93ff',
  },
  radioContent: {
    flex: 1,
  },
  radioLabel: {
    fontSize: 14,
    fontWeight: '600',
    color: '#1F2937',
    marginBottom: 4,
  },
  radioDesc: {
    fontSize: 12,
    color: '#6B7280',
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

export default Step3Pricing;