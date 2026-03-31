import React from 'react';
import {
  View, Text, TextInput, TouchableOpacity,
  StyleSheet, ScrollView, KeyboardAvoidingView, Platform,
} from 'react-native';
import * as yup from 'yup';
import { useForm, Controller } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { LinearGradient } from 'expo-linear-gradient';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { MessageSquare, Upload, Info, CheckCircle2, ArrowRight } from 'lucide-react-native';

const ACCENT = '#0d9488';
const BORDER = 'rgba(14,165,233,0.18)';
const TEXT_PRIMARY = '#0f172a';
const TEXT_SECONDARY = '#6b7280';

const schema = yup.object().shape({
  responseMessage: yup.string().min(10, 'Message must be at least 10 characters').required('Please provide a response message'),
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

const RespondToDisputePage: React.FC<RespondToDisputePageProps> = ({ onBack, onSubmit }) => {
  const insets = useSafeAreaInsets();
  const {
    control,
    handleSubmit,
    formState: { errors, isSubmitting },
    reset,
  } = useForm<FormData>({
    resolver: yupResolver(schema),
    defaultValues: { responseMessage: '', settlementProposal: '' },
  });

  const handleFormSubmit = (data: FormData) => {
    onSubmit(data);
  };

  return (
    <LinearGradient
      colors={['#f0f9ff', '#e0f2fe', '#bae6fd', '#7dd3fc']}
      style={styles.gradient}
      start={{ x: 0, y: 0 }}
      end={{ x: 0.6, y: 1 }}
    >
      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : undefined}
        style={styles.flex}
      >
        <ScrollView
          showsVerticalScrollIndicator={false}
          contentContainerStyle={[styles.scrollContent, { paddingTop: insets.top + 60 }]}
        >

          {/* Hero */}
          <LinearGradient
            colors={[ACCENT, '#0891b2']}
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 1 }}
            style={styles.heroCard}
          >
            <View style={styles.heroIconBox}>
              <MessageSquare size={24} color="#fff" />
            </View>
            <Text style={styles.heroTitle}>Respond to Dispute</Text>
            <Text style={styles.heroSub}>Case #82910 — Your response helps resolve this fairly.</Text>
          </LinearGradient>

          {/* Info Box */}
          <View style={styles.infoBox}>
            <Info size={16} color={ACCENT} />
            <Text style={styles.infoText}>
              Be as detailed as possible. Include timelines, agreements, or any relevant context.
            </Text>
          </View>

          {/* Response Message */}
          <View style={styles.card}>
            <View style={styles.cardHeader}>
              <View style={styles.cardIconBox}>
                <MessageSquare size={17} color={ACCENT} />
              </View>
              <Text style={styles.cardTitle}>Response Message</Text>
              <Text style={styles.required}>*</Text>
            </View>
            <View style={styles.cardBody}>
              <Controller
                control={control}
                name="responseMessage"
                render={({ field: { onChange, onBlur, value } }) => (
                  <TextInput
                    style={[styles.textarea, errors.responseMessage && styles.inputError]}
                    placeholder="Describe your side of the story..."
                    placeholderTextColor="rgba(15,23,42,0.30)"
                    multiline
                    onBlur={onBlur}
                    onChangeText={onChange}
                    value={value}
                    textAlignVertical="top"
                  />
                )}
              />
              {errors.responseMessage && (
                <Text style={styles.errorText}>{errors.responseMessage.message}</Text>
              )}
            </View>
          </View>

          {/* Settlement Proposal */}
          <View style={styles.card}>
            <View style={styles.cardHeader}>
              <View style={styles.cardIconBox}>
                <CheckCircle2 size={17} color={ACCENT} />
              </View>
              <Text style={styles.cardTitle}>Settlement Proposal</Text>
              <Text style={styles.optionalBadge}>Optional</Text>
            </View>
            <View style={styles.cardBody}>
              <Controller
                control={control}
                name="settlementProposal"
                render={({ field: { onChange, onBlur, value } }) => (
                  <TextInput
                    style={styles.input}
                    placeholder="e.g. Full refund or replacement"
                    placeholderTextColor="rgba(15,23,42,0.30)"
                    onBlur={onBlur}
                    onChangeText={onChange}
                    value={value}
                  />
                )}
              />
              <Text style={styles.hint}>Suggesting a solution can speed up resolution.</Text>
            </View>
          </View>

          {/* Upload Evidence */}
          <View style={styles.card}>
            <View style={styles.cardHeader}>
              <View style={styles.cardIconBox}>
                <Upload size={17} color={ACCENT} />
              </View>
              <Text style={styles.cardTitle}>Supporting Evidence</Text>
              <Text style={styles.optionalBadge}>Optional</Text>
            </View>
            <View style={styles.cardBody}>
              <TouchableOpacity style={styles.uploadBox} activeOpacity={0.8}>
                <Upload size={28} color="rgba(13,148,136,0.45)" />
                <Text style={styles.uploadTitle}>Tap to upload documents</Text>
                <Text style={styles.uploadSub}>Max 10MB • PDF, PNG, JPG</Text>
              </TouchableOpacity>
            </View>
          </View>

          {/* Tips */}
          <View style={styles.tipsCard}>
            <Text style={styles.tipsTitle}>Quick Tips</Text>
            <View style={styles.tipRow}>
              <CheckCircle2 size={14} color="#10b981" fill="rgba(16,185,129,0.12)" />
              <Text style={styles.tipText}>Keep it professional and factual.</Text>
            </View>
            <View style={styles.tipRow}>
              <CheckCircle2 size={14} color="#10b981" fill="rgba(16,185,129,0.12)" />
              <Text style={styles.tipText}>Attach screenshots if applicable.</Text>
            </View>
          </View>

          {/* Submit */}
          <TouchableOpacity
            style={styles.submitWrapper}
            onPress={handleSubmit(handleFormSubmit)}
            disabled={isSubmitting}
            activeOpacity={0.85}
          >
            <LinearGradient
              colors={[ACCENT, '#0891b2']}
              start={{ x: 0, y: 0 }}
              end={{ x: 1, y: 0 }}
              style={[styles.submitBtn, isSubmitting && styles.submitDisabled]}
            >
              <Text style={styles.submitText}>
                {isSubmitting ? 'Sending...' : 'Submit Response'}
              </Text>
              <ArrowRight size={20} color="#fff" />
            </LinearGradient>
          </TouchableOpacity>

          <View style={{ height: 40 }} />
        </ScrollView>
      </KeyboardAvoidingView>
    </LinearGradient>
  );
};

const styles = StyleSheet.create({
  gradient: { flex: 1 },
  flex: { flex: 1 },
  scrollContent: { padding: 16 },

  // Hero
  heroCard: { borderRadius: 18, padding: 20, marginBottom: 14 },
  heroIconBox: {
    width: 48,
    height: 48,
    borderRadius: 14,
    backgroundColor: 'rgba(255,255,255,0.22)',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 12,
  },
  heroTitle: { fontSize: 22, fontWeight: '800', color: '#fff', letterSpacing: -0.3, marginBottom: 4 },
  heroSub: { fontSize: 13, color: 'rgba(255,255,255,0.75)', fontWeight: '500' },

  // Info
  infoBox: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    gap: 10,
    backgroundColor: 'rgba(13,148,136,0.08)',
    borderRadius: 12,
    padding: 14,
    borderWidth: 1,
    borderColor: 'rgba(13,148,136,0.20)',
    marginBottom: 14,
  },
  infoText: { flex: 1, fontSize: 13, color: ACCENT, lineHeight: 19, fontWeight: '500' },

  // Card
  card: {
    backgroundColor: 'rgba(255,255,255,0.82)',
    borderRadius: 16,
    marginBottom: 14,
    borderWidth: 1,
    borderColor: BORDER,
    overflow: 'hidden',
  },
  cardHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 14,
    borderBottomWidth: 1,
    borderBottomColor: BORDER,
    gap: 10,
  },
  cardIconBox: {
    width: 34,
    height: 34,
    borderRadius: 10,
    backgroundColor: 'rgba(13,148,136,0.10)',
    alignItems: 'center',
    justifyContent: 'center',
  },
  cardTitle: { fontSize: 15, fontWeight: '700', color: TEXT_PRIMARY, flex: 1 },
  required: { fontSize: 15, color: '#ef4444', fontWeight: '700' },
  optionalBadge: {
    fontSize: 10,
    fontWeight: '700',
    color: TEXT_SECONDARY,
    backgroundColor: 'rgba(14,165,233,0.10)',
    paddingHorizontal: 8,
    paddingVertical: 3,
    borderRadius: 6,
  },
  cardBody: { padding: 14 },

  // Inputs
  textarea: {
    borderWidth: 1,
    borderColor: BORDER,
    borderRadius: 12,
    minHeight: 140,
    padding: 12,
    fontSize: 14,
    color: TEXT_PRIMARY,
    backgroundColor: 'rgba(255,255,255,0.80)',
    textAlignVertical: 'top',
  },
  input: {
    borderWidth: 1,
    borderColor: BORDER,
    borderRadius: 12,
    padding: 13,
    fontSize: 14,
    color: TEXT_PRIMARY,
    backgroundColor: 'rgba(255,255,255,0.80)',
  },
  inputError: { borderColor: '#fca5a5', backgroundColor: '#fff1f2' },
  errorText: { color: '#ef4444', fontSize: 12, marginTop: 6, fontWeight: '600' },
  hint: { fontSize: 12, color: TEXT_SECONDARY, marginTop: 6 },

  // Upload
  uploadBox: {
    borderWidth: 1.5,
    borderColor: 'rgba(13,148,136,0.25)',
    borderStyle: 'dashed',
    borderRadius: 14,
    height: 120,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'rgba(13,148,136,0.04)',
    gap: 6,
  },
  uploadTitle: { fontSize: 14, fontWeight: '600', color: TEXT_PRIMARY },
  uploadSub: { fontSize: 11, color: TEXT_SECONDARY },

  // Tips
  tipsCard: {
    backgroundColor: 'rgba(255,255,255,0.82)',
    borderRadius: 16,
    padding: 16,
    marginBottom: 16,
    borderWidth: 1,
    borderColor: BORDER,
    gap: 8,
  },
  tipsTitle: { fontSize: 13, fontWeight: '700', color: TEXT_SECONDARY, textTransform: 'uppercase', letterSpacing: 0.6, marginBottom: 4 },
  tipRow: { flexDirection: 'row', alignItems: 'center', gap: 8 },
  tipText: { fontSize: 13, color: TEXT_PRIMARY },

  // Submit
  submitWrapper: {
    borderRadius: 14,
    overflow: 'hidden',
    shadowColor: ACCENT,
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.30,
    shadowRadius: 8,
    elevation: 6,
  },
  submitBtn: {
    flexDirection: 'row',
    height: 54,
    alignItems: 'center',
    justifyContent: 'center',
    gap: 10,
  },
  submitDisabled: { opacity: 0.6 },
  submitText: { color: '#fff', fontSize: 16, fontWeight: '700', letterSpacing: 0.3 },
});

export default RespondToDisputePage;