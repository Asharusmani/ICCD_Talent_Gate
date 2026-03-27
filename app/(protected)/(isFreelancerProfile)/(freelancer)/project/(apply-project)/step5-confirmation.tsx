import React from 'react';
import { router } from 'expo-router';
import { useForm, Controller } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { LinearGradient } from 'expo-linear-gradient';
import { useApplyProject } from '@/api/client/project';
import { step5Schema } from '@/components/schemas/schema';
import { useAppSelector } from '@/hooks/use-apply-project';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import FormTemplate from '@/components/template/form-template';
import { Step5Data, AllFormData } from '@/components/types/proposal.types';
import { View, Text, TouchableOpacity, StyleSheet, Alert } from 'react-native';

interface Step5Props {
  initialData?: Step5Data;
  allData: AllFormData;
  onBack: () => void;
}

const Step5Confirmation: React.FC<Step5Props> = ({ initialData, allData, onBack }) => {

  const { submitProposals, isPending } = useApplyProject();
  const projectData = useAppSelector(state => state.applyProject.applyProjectData)

  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<Step5Data>({
    resolver: yupResolver(step5Schema),
    defaultValues: initialData || {
      confirmation: false,
    },
  });

  const onSubmit = (data: any) => {

    const formData = new FormData();

    formData.append('freelancerName', projectData.name);
    formData.append('coverLetter', projectData.coverLetter);
    formData.append('currency', projectData.currency);
    formData.append('email', projectData.email);
    formData.append('estimatedTime', projectData.estimatedTime);
    formData.append('paymentTerms', projectData.paymentTerms);
    formData.append('portfolioLinks', projectData.portfolioLink);
    formData.append('proposedBudget', projectData.proposedBudget);
    formData.append('proposedDeliverables', projectData.proposedDeliverables);
    formData.append('timeUnit', projectData.timeUnit);
    formData.append('freelancerId', projectData.freelancerId);
    formData.append('projectId', projectData.projectId);
    formData.append('clientId', projectData.clientId);

    if (projectData.proposalFile) {
      formData.append('files', {
        uri: projectData.uri,
        type: projectData.mimeType || 'application/pdf',
        name: projectData.name,
      } as any);
    }
    submitProposals(formData)
    // router.push('/(protected)/(isFreelancerProfile)/(freelancer)/project/index')
  };

  return (
    <FormTemplate>
      <View style={styles.card}>
        <Text style={styles.title}>Step 5 of 5: Confirmation</Text>

        <View style={styles.summaryContainer}>
          <Text style={styles.summaryTitle}>Proposal Summary</Text>

          <View style={styles.summaryRow}>
            <Text style={styles.summaryLabel}>Project:</Text>
            <Text style={styles.summaryValue}>{projectData.projectTitle || ''}</Text>
          </View>

          <View style={styles.summaryRow}>
            <Text style={styles.summaryLabel}>Name:</Text>
            <Text style={styles.summaryValue}>{projectData.name || ''}</Text>
          </View>

          <View style={styles.summaryRow}>
            <Text style={styles.summaryLabel}>Email:</Text>
            <Text style={styles.summaryValue}>{projectData.email || ''}</Text>
          </View>

          <View style={styles.divider} />

          <View style={styles.summaryRow}>
            <Text style={styles.summaryLabel}>Budget:</Text>
            <Text style={styles.summaryValue}>
              {projectData.proposedBudget} {projectData.currency || ''}
            </Text>
          </View>

          <View style={styles.summaryRow}>
            <Text style={styles.summaryLabel}>Timeline:</Text>
            <Text style={styles.summaryValue}>
              {projectData.estimatedTime} {projectData.timeUnit || ''}
            </Text>
          </View>

          <View style={styles.summaryRow}>
            <Text style={styles.summaryLabel}>Payment:</Text>
            <Text style={[styles.summaryValue, { textTransform: 'capitalize' }]}>
              {projectData.paymentTerms || ''}
            </Text>
          </View>

          <View style={styles.divider} />

          <View style={styles.summaryRow}>
            <Text style={styles.summaryLabel}>Portfolio:</Text>
            <Text style={[styles.summaryValue, styles.link]} numberOfLines={1}>
              {projectData.portfolioLink || ''}
            </Text>
          </View>

          <View style={styles.summaryRow}>
            <Text style={styles.summaryLabel}>Document:</Text>
            <Text style={styles.summaryValue} numberOfLines={1}>
              {projectData.proposalFile?.name || 'No file'}
            </Text>
          </View>
        </View>

        <View style={styles.fieldContainer}>
          <Controller
            control={control}
            name="confirmation"
            render={({ field: { onChange, value } }) => (
              <TouchableOpacity
                style={[styles.checkboxContainer, errors.confirmation && styles.checkboxError]}
                onPress={() => onChange(!value)}
              >
                <View style={styles.checkbox}>
                  {value && (
                    <MaterialCommunityIcons name="check" size={18} color="#109f93ff" />
                  )}
                </View>
                <View style={styles.checkboxContent}>
                  <Text style={styles.checkboxLabel}>
                    I confirm that this proposal represents my original work and aligns with ICCD
                    Talent Gate's guidelines.
                  </Text>
                  <Text style={styles.checkboxSubtext}>
                    Please read our terms of service before submitting.
                  </Text>
                </View>
              </TouchableOpacity>
            )}
          />
          {errors.confirmation && (
            <Text style={styles.error}>{errors.confirmation.message}</Text>
          )}
        </View>

        <View style={styles.readyContainer}>
          <MaterialCommunityIcons name="check-circle" size={20} color="#059669" />
          <Text style={styles.readyText}>
            Your proposal is ready to submit. Make sure all information is accurate before
            proceeding.
          </Text>
        </View>

        <View style={styles.buttonRow}>
          <TouchableOpacity style={styles.backButton} onPress={onBack}>
            <Text style={styles.backButtonText}>Back</Text>
          </TouchableOpacity>

          <TouchableOpacity style={styles.submitButton} onPress={handleSubmit(onSubmit)}>
            <LinearGradient
              colors={['#15A9B2', '#115B60']}
              start={{ x: 0, y: 0 }}
              end={{ x: 1, y: 0 }}
              style={styles.gradient}
            >
              <Text style={styles.buttonText}>Submit Proposal</Text>
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
  summaryContainer: {
    backgroundColor: '#EFF6FF',
    borderRadius: 10,
    padding: 16,
    marginBottom: 16,
    borderWidth: 1,
    borderColor: '#BFDBFE',
  },
  summaryTitle: {
    fontSize: 16,
    fontWeight: '700',
    color: '#1F2937',
    marginBottom: 12,
  },
  summaryRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 8,
    gap: 8,
  },
  summaryLabel: {
    fontSize: 13,
    color: '#6B7280',
    flex: 0.4,
  },
  summaryValue: {
    fontSize: 13,
    fontWeight: '600',
    color: '#1F2937',
    flex: 0.6,
    textAlign: 'right',
  },
  link: {
    color: '#109f93ff',
  },
  divider: {
    height: 1,
    backgroundColor: '#BFDBFE',
    marginVertical: 8,
  },
  fieldContainer: {
    marginBottom: 16,
  },
  checkboxContainer: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    padding: 15,
    borderWidth: 1,
    borderColor: '#E0E0E0',
    borderRadius: 10,
    backgroundColor: '#fff',
  },
  checkboxError: {
    borderColor: '#EF4444',
  },
  checkbox: {
    width: 22,
    height: 22,
    borderRadius: 4,
    borderWidth: 2,
    borderColor: '#109f93ff',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 12,
    marginTop: 2,
  },
  checkboxContent: {
    flex: 1,
  },
  checkboxLabel: {
    fontSize: 13,
    fontWeight: '600',
    color: '#1F2937',
    marginBottom: 4,
  },
  checkboxSubtext: {
    fontSize: 11,
    color: '#6B7280',
  },
  error: {
    color: '#EF4444',
    fontSize: 12,
    marginTop: 4,
  },
  readyContainer: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    backgroundColor: '#D1FAE5',
    padding: 12,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#6EE7B7',
    marginBottom: 16,
  },
  readyText: {
    flex: 1,
    fontSize: 12,
    color: '#065F46',
    marginLeft: 8,
  },
  buttonRow: {
    flexDirection: 'row',
    gap: 10,
    marginTop: 4,
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
  submitButton: {
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

export default Step5Confirmation;