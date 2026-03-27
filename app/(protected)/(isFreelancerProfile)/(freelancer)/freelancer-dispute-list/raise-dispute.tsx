import React from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
  KeyboardAvoidingView,
  Platform,
  StatusBar,
} from 'react-native';
import * as yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
import { useForm, Controller } from 'react-hook-form';
import { SafeAreaView } from 'react-native-safe-area-context';
import { MessageSquare, ChevronLeft, Upload, Info, CheckCircle2 } from 'lucide-react-native';

// Validation Schema
const schema = yup.object().shape({
  responseMessage: yup
    .string()
    .min(10, 'Message must be at least 10 characters')
    .required('Please provide a response message'),
  settlementProposal: yup.string().optional(),
});

interface FormData {
  responseMessage: string;
  settlementProposal?: string;
}

interface RespondToDisputePageProps {
  onBack?: () => void;
  onSubmit: (data: FormData) => void;
}

const RespondToDisputePage: React.FC<RespondToDisputePageProps> = ({
  onBack,
  onSubmit,
}) => {
  const {
    control,
    handleSubmit,
    formState: { errors, isSubmitting },
    reset,
  } = useForm<FormData>({
    resolver: yupResolver(schema),
    defaultValues: {
      responseMessage: '',
      settlementProposal: '',
    },
  });

  const handleFormSubmit = (data: FormData) => {
    onSubmit(data);
    // In a real app, you might navigate away here
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        style={styles.container}
      >
        <ScrollView 
          showsVerticalScrollIndicator={false}
          contentContainerStyle={styles.scrollContent}
        >
          {/* Hero Section */}
          <View style={styles.heroSection}>
            <View style={styles.iconBadge}>
              <MessageSquare size={28} color="#059669" strokeWidth={2} />
            </View>
            <Text style={styles.pageTitle}>Respond to Dispute</Text>
            <Text style={styles.pageSubtitle}>
              Case #82910 • Your response helps us resolve this matter fairly for both parties.
            </Text>
          </View>

          {/* Info Box */}
          <View style={styles.infoBox}>
            <Info size={18} color="#3B82F6" style={styles.infoIcon} />
            <Text style={styles.infoText}>
              Be as detailed as possible. You can include timelines, agreements, or any relevant context.
            </Text>
          </View>

          {/* Form Fields */}
          <View style={styles.formContainer}>
            {/* Response Message Field */}
            <View style={styles.inputGroup}>
              <View style={styles.labelRow}>
                <Text style={styles.label}>Response Message</Text>
                <Text style={styles.requiredStar}>*</Text>
              </View>
              <Controller
                control={control}
                name="responseMessage"
                render={({ field: { onChange, onBlur, value } }) => (
                  <View style={[
                    styles.textAreaWrapper,
                    errors.responseMessage && styles.inputErrorBorder
                  ]}>
                    <TextInput
                      style={styles.textArea}
                      placeholder="Describe your side of the story..."
                      placeholderTextColor="#94A3B8"
                      multiline
                      onBlur={onBlur}
                      onChangeText={onChange}
                      value={value}
                      textAlignVertical="top"
                    />
                  </View>
                )}
              />
              {errors.responseMessage && (
                <Text style={styles.errorText}>{errors.responseMessage.message}</Text>
              )}
            </View>

            {/* Settlement Proposal Field */}
            <View style={styles.inputGroup}>
              <Text style={styles.label}>Settlement Proposal (Optional)</Text>
              <Controller
                control={control}
                name="settlementProposal"
                render={({ field: { onChange, onBlur, value } }) => (
                  <View style={styles.inputWrapper}>
                    <TextInput
                      style={styles.input}
                      placeholder="e.g. Full refund or replacement"
                      placeholderTextColor="#94A3B8"
                      onBlur={onBlur}
                      onChangeText={onChange}
                      value={value}
                    />
                  </View>
                )}
              />
              <Text style={styles.fieldHint}>Suggesting a solution can speed up the resolution.</Text>
            </View>

            {/* Supporting Evidence Field */}
            <View style={styles.inputGroup}>
              <Text style={styles.label}>Supporting Evidence (Optional)</Text>
              <TouchableOpacity 
                style={styles.uploadArea}
                activeOpacity={0.6}
              >
                <View style={styles.uploadContent}>
                  <View style={styles.uploadIconCircle}>
                    <Upload size={20} color="#475569" />
                  </View>
                  <View>
                    <Text style={styles.uploadTitle}>Upload Documents</Text>
                    <Text style={styles.uploadSubtitle}>Max 10MB • PDF, PNG, JPG</Text>
                  </View>
                </View>
              </TouchableOpacity>
            </View>
          </View>

          {/* Guidelines */}
          <View style={styles.guidelines}>
            <Text style={styles.guidelinesTitle}>Quick Tips:</Text>
            <View style={styles.guidelineItem}>
              <CheckCircle2 size={14} color="#10B981" />
              <Text style={styles.guidelineText}>Keep it professional and factual.</Text>
            </View>
            <View style={styles.guidelineItem}>
              <CheckCircle2 size={14} color="#10B981" />
              <Text style={styles.guidelineText}>Attach screenshots if applicable.</Text>
            </View>
          </View>
        </ScrollView>

        {/* Fixed Footer Action */}
        <View style={styles.footer}>
          <TouchableOpacity
            style={[styles.submitButton, isSubmitting && styles.submitButtonDisabled]}
            onPress={handleSubmit(handleFormSubmit)}
            disabled={isSubmitting}
            activeOpacity={0.8}
          >
            <Text style={styles.submitButtonText}>
              {isSubmitting ? 'Sending...' : 'Submit Response'}
            </Text>
          </TouchableOpacity>
        </View>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: '#F4F4F4'
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 16,
    height: 56,
    borderBottomWidth: 1,
    borderBottomColor: '#F1F5F9',
  },
  backButton: {
    padding: 8,
    marginLeft: -8,
  },
  headerTitle: {
    fontSize: 17,
    fontWeight: '700',
    color: '#0F172A',
  },
  headerRightPlaceholder: {
    width: 40,
  },
  container: {
    flex: 1,
  },
  scrollContent: {
    padding: 24,
    paddingBottom: 100, // Space for fixed footer
  },
  heroSection: {
    alignItems: 'center',
    marginBottom: 32,
  },
  iconBadge: {
    backgroundColor: '#DCFCE7',
    width: 64,
    height: 64,
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 16,
  },
  pageTitle: {
    fontSize: 24,
    fontWeight: '800',
    color: '#0F172A',
    letterSpacing: -0.5,
    textAlign: 'center',
  },
  pageSubtitle: {
    fontSize: 14,
    color: '#64748B',
    textAlign: 'center',
    marginTop: 8,
    lineHeight: 20,
    paddingHorizontal: 20,
  },
  infoBox: {
    flexDirection: 'row',
    backgroundColor: '#F0F9FF',
    padding: 16,
    borderRadius: 16,
    marginBottom: 32,
    borderWidth: 1,
    borderColor: '#BAE6FD',
  },
  infoIcon: {
    marginRight: 12,
  },
  infoText: {
    flex: 1,
    fontSize: 13,
    color: '#0369A1',
    lineHeight: 18,
    fontWeight: '500',
  },
  formContainer: {
    gap: 24,
  },
  inputGroup: {
    width: '100%',
  },
  labelRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 8,
  },
  label: {
    fontSize: 15,
    fontWeight: '700',
    color: '#334155',
  },
  requiredStar: {
    color: '#EF4444',
    marginLeft: 4,
    fontWeight: 'bold',
  },
  inputWrapper: {
    backgroundColor: '#F8FAFC',
    borderWidth: 1.5,
    borderColor: '#E2E8F0',
    borderRadius: 14,
  },
  textAreaWrapper: {
    backgroundColor: '#F8FAFC',
    borderWidth: 1.5,
    borderColor: '#E2E8F0',
    borderRadius: 14,
    minHeight: 160,
  },
  input: {
    paddingHorizontal: 16,
    paddingVertical: 14,
    fontSize: 16,
    color: '#0F172A',
  },
  textArea: {
    paddingHorizontal: 16,
    paddingVertical: 16,
    fontSize: 16,
    color: '#0F172A',
    flex: 1,
  },
  fieldHint: {
    fontSize: 12,
    color: '#94A3B8',
    marginTop: 6,
    marginLeft: 4,
  },
  inputErrorBorder: {
    borderColor: '#FCA5A5',
    backgroundColor: '#FFF1F2',
  },
  errorText: {
    color: '#EF4444',
    fontSize: 12,
    marginTop: 6,
    fontWeight: '600',
    marginLeft: 4,
  },
  uploadArea: {
    borderWidth: 2,
    borderColor: '#E2E8F0',
    borderStyle: 'dashed',
    borderRadius: 16,
    padding: 20,
    backgroundColor: '#F8FAFC',
  },
  uploadContent: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 16,
  },
  uploadIconCircle: {
    width: 44,
    height: 44,
    borderRadius: 12,
    backgroundColor: '#FFFFFF',
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 4,
    elevation: 2,
  },
  uploadTitle: {
    fontSize: 15,
    fontWeight: '700',
    color: '#334155',
  },
  uploadSubtitle: {
    fontSize: 12,
    color: '#94A3B8',
    marginTop: 2,
  },
  guidelines: {
    marginTop: 32,
    padding: 20,
    backgroundColor: '#F8FAFC',
    borderRadius: 16,
  },
  guidelinesTitle: {
    fontSize: 14,
    fontWeight: '700',
    color: '#475569',
    marginBottom: 12,
  },
  guidelineItem: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    marginBottom: 8,
  },
  guidelineText: {
    fontSize: 13,
    color: '#64748B',
  },
  footer: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    padding: 20,
    paddingBottom: Platform.OS === 'ios' ? 34 : 20,
    backgroundColor: '#FFFFFF',
    borderTopWidth: 1,
    borderTopColor: '#F1F5F9',
  },
  submitButton: {
    backgroundColor: '#0F172A',
    paddingVertical: 16,
    borderRadius: 16,
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: '#0F172A',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.2,
    shadowRadius: 8,
    elevation: 4,
  },
  submitButtonDisabled: {
    opacity: 0.6,
  },
  submitButtonText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: '700',
  },
});

export default RespondToDisputePage;
