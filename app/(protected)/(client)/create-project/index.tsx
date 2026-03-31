import React, { useState } from 'react';
import {
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  TextInput,
  Platform,
} from 'react-native';
import SearchBar from '@/components/ui/search-bar';
import SelectBox from '@/components/ui/select-box';
import { useAddproject } from '@/api/client/project';
import { Controller, useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import InputField from '@/components/ui/input-field';
import * as DocumentPicker from 'expo-document-picker';
import { formatDateDay } from '@/functions/date-format';
import { createProjectSchema } from '@/components/schemas/schema';
import DateTimePicker from '@react-native-community/datetimepicker';
import { LinearGradient } from 'expo-linear-gradient';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import {
  FileText, Tag, AlignLeft, Package,
  DollarSign, Calendar, Upload, Briefcase,
  Clock, Star, CheckCircle2, Plus, X,
  ArrowRight
} from 'lucide-react-native';

const ACCENT = '#0d9488';
const BORDER = 'rgba(14,165,233,0.18)';
const TEXT_PRIMARY = '#0f172a';
const TEXT_SECONDARY = '#6b7280';

interface Attachment {
  uri: string;
  name: string;
  type?: string;
}

interface CreateProjectProps {
  title: string;
  category: string;
  subCategory: string;
  skills: string[];
  budget: number;
  deadline: Date;
  mode: string;
  duration: string;
  language: string;
  freelancerType: string;
  description: string;
  deliverable: string;
  experienceLevel: 'beginner' | 'intermediate' | 'expert';
  termsAccepted: boolean;
  attachments?: Attachment | null;
}

const CreateProjectScreen: React.FC = () => {
  const [showDatePicker, setShowDatePicker] = useState(false);
  const [selectedSkill, setSelectedSkill] = useState('');
  const insets = useSafeAreaInsets();

  const {
    control,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<CreateProjectProps>({
    resolver: yupResolver(createProjectSchema) as any,
    defaultValues: {
      title: '',
      category: '',
      subCategory: '',
      skills: [],
      budget: 0,
      deadline: new Date(),
      mode: '',
      duration: '',
      language: '',
      freelancerType: '',
      description: '',
      deliverable: '',
      experienceLevel: 'beginner',
      termsAccepted: false,
      attachments: null,
    },
  });

  const modeOptions = [
    { label: 'Physical', value: 'physical' },
    { label: 'Remote', value: 'remote' },
    { label: 'Hybrid', value: 'hybrid' },
  ];

  const skillsOptions = [
    { label: 'React', value: 'react' },
    { label: 'Node.js', value: 'node' },
    { label: 'UI/UX', value: 'uiux' },
    { label: 'Figma', value: 'figma' },
    { label: 'MongoDB', value: 'mongodb' },
  ];

  const { addProject } = useAddproject();

  const onSubmit = (data: CreateProjectProps) => {
    const formData = new FormData();
    formData.append('title', data.title);
    formData.append('budget', data.budget.toString());
    formData.append('description', data.description);
    formData.append('category', data.category);
    formData.append('subCategory', data.subCategory);
    formData.append('deadline', data.deadline.toISOString());
    formData.append('duration', data.duration);
    formData.append('freelancerType', data.freelancerType);
    formData.append('deliverable', data.deliverable);
    formData.append('skills', JSON.stringify(data.skills));
    if (data.attachments) {
      formData.append('files', {
        uri: data.attachments.uri,
        type: data.attachments.type || 'application/pdf',
        name: data.attachments.name,
      } as any);
    }
    addProject(formData as any);
    reset();
  };

  const SectionCard = ({ icon, title, children }: any) => (
    <View style={styles.sectionCard}>
      <View style={styles.sectionHeader}>
        <View style={styles.sectionIconBox}>{icon}</View>
        <Text style={styles.sectionTitle}>{title}</Text>
      </View>
      <View style={styles.sectionBody}>{children}</View>
    </View>
  );

  return (
    <LinearGradient
      colors={['#f0f9ff', '#e0f2fe', '#bae6fd', '#7dd3fc']}
      style={styles.gradient}
      start={{ x: 0, y: 0 }}
      end={{ x: 0.6, y: 1 }}
    >
      <ScrollView
        style={styles.scroll}
        contentContainerStyle={[styles.container, { paddingTop: insets.top + 60 }]}
        showsVerticalScrollIndicator={false}
        keyboardShouldPersistTaps="handled"
      >

        {/* Hero Header */}
        <LinearGradient
          colors={[ACCENT, '#0891b2']}
          start={{ x: 0, y: 0 }}
          end={{ x: 1, y: 1 }}
          style={styles.heroCard}
        >
          <Text style={styles.heroTitle}>Create Project</Text>
          <Text style={styles.heroSub}>Fill in the details to post your project</Text>
        </LinearGradient>

        {/* Project Title */}
        <SectionCard icon={<FileText size={18} color={ACCENT} />} title="Project Title">
          <Controller
            control={control}
            name="title"
            render={({ field: { onChange, value } }) => (
              <SearchBar
                label=""
                placeholder="Enter project title"
                value={value}
                onChangeText={onChange}
                required
              />
            )}
          />
          {errors.title && <Text style={styles.error}>{errors.title.message}</Text>}
        </SectionCard>

        {/* Category */}
        <SectionCard icon={<Tag size={18} color={ACCENT} />} title="Category">
          <View style={styles.row}>
            <View style={styles.half}>
              <Controller
                control={control}
                name="category"
                render={({ field: { onChange, value } }) => (
                  <SelectBox
                    label="Category"
                    selectedValue={value as string}
                    onValueChange={onChange}
                    required
                    options={[
                      { label: 'Development', value: 'development' },
                      { label: 'Design', value: 'design' },
                    ]}
                  />
                )}
              />
              {errors.category && <Text style={styles.error}>{errors.category.message}</Text>}
            </View>
            <View style={styles.half}>
              <Controller
                control={control}
                name="subCategory"
                render={({ field: { onChange, value } }) => (
                  <SelectBox
                    label="Subcategory"
                    selectedValue={value as string}
                    onValueChange={onChange}
                    required
                    options={[
                      { label: 'Web', value: 'web' },
                      { label: 'Mobile', value: 'mobile' },
                    ]}
                  />
                )}
              />
              {errors.subCategory && <Text style={styles.error}>{errors.subCategory.message}</Text>}
            </View>
          </View>
        </SectionCard>

        {/* Description */}
        <SectionCard icon={<AlignLeft size={18} color={ACCENT} />} title="Project Description">
          <Controller
            control={control}
            name="description"
            render={({ field: { onChange, value } }) => (
              <TextInput
                style={styles.textarea}
                multiline
                numberOfLines={5}
                placeholder="Describe your project in detail..."
                value={value}
                onChangeText={onChange}
                placeholderTextColor="rgba(15,23,42,0.30)"
                textAlignVertical="top"
              />
            )}
          />
          {errors.description && <Text style={styles.error}>{errors.description.message}</Text>}
        </SectionCard>

        {/* Deliverables */}
        <SectionCard icon={<Package size={18} color={ACCENT} />} title="Deliverables">
          <Controller
            control={control}
            name="deliverable"
            render={({ field: { onChange, value } }) => (
              <TextInput
                style={styles.textarea}
                multiline
                numberOfLines={4}
                placeholder="Files, documents, outcomes..."
                value={value}
                onChangeText={onChange}
                placeholderTextColor="rgba(15,23,42,0.30)"
                textAlignVertical="top"
              />
            )}
          />
          {errors.deliverable && <Text style={styles.error}>{errors.deliverable.message}</Text>}
        </SectionCard>

        {/* Skills */}
        <SectionCard icon={<Star size={18} color={ACCENT} />} title="Required Skills">
          <SelectBox
            selectedValue={selectedSkill}
            onValueChange={setSelectedSkill}
            options={skillsOptions}
          />
          <Controller
            control={control}
            name="skills"
            render={({ field: { value, onChange } }) => (
              <View>
                <TouchableOpacity
                  style={styles.addSkillBtn}
                  onPress={() => {
                    if (!selectedSkill || value.includes(selectedSkill)) return;
                    onChange([...value, selectedSkill]);
                    setSelectedSkill('');
                  }}
                  activeOpacity={0.85}
                >
                  <LinearGradient
                    colors={[ACCENT, '#0891b2']}
                    start={{ x: 0, y: 0 }}
                    end={{ x: 1, y: 0 }}
                    style={styles.addSkillGradient}
                  >
                    <Plus size={15} color="#fff" />
                    <Text style={styles.addSkillText}>Add Skill</Text>
                  </LinearGradient>
                </TouchableOpacity>
                <View style={styles.skillList}>
                  {value.map(skill => (
                    <View key={skill} style={styles.skillChip}>
                      <Text style={styles.skillChipText}>{skill}</Text>
                      <TouchableOpacity onPress={() => onChange(value.filter(v => v !== skill))}>
                        <X size={13} color={ACCENT} />
                      </TouchableOpacity>
                    </View>
                  ))}
                </View>
              </View>
            )}
          />
          {errors.skills && <Text style={styles.error}>{errors.skills.message}</Text>}
        </SectionCard>

        {/* Budget */}
        <SectionCard icon={<DollarSign size={18} color={ACCENT} />} title="Budget">
          <Controller
            control={control}
            name="budget"
            render={({ field: { onChange, value } }) => (
              <InputField
                label=""
                placeholder="e.g. 5000"
                value={value ? String(value) : ''}
                onChangeText={text => onChange(isNaN(parseFloat(text)) ? 0 : parseFloat(text))}
                required
                keyboardType="numeric"
              />
            )}
          />
          {errors.budget && <Text style={styles.error}>{errors.budget.message}</Text>}
        </SectionCard>

        {/* Deadline */}
        <SectionCard icon={<Calendar size={18} color={ACCENT} />} title="Deadline">
          <Controller
            control={control}
            name="deadline"
            render={({ field: { onChange, value } }) => (
              <>
                <TouchableOpacity
                  style={styles.dateBtn}
                  onPress={() => setShowDatePicker(true)}
                >
                  <Calendar size={16} color={ACCENT} />
                  <Text style={styles.dateBtnText}>{formatDateDay(value)}</Text>
                </TouchableOpacity>
                {showDatePicker && (
                  <DateTimePicker
                    value={value}
                    mode="date"
                    display={Platform.OS === 'ios' ? 'spinner' : 'default'}
                    onChange={(event, selectedDate) => {
                      setShowDatePicker(Platform.OS === 'ios');
                      if (selectedDate) onChange(selectedDate);
                    }}
                    minimumDate={new Date()}
                  />
                )}
              </>
            )}
          />
          {errors.deadline && <Text style={styles.error}>{errors.deadline.message}</Text>}
        </SectionCard>

        {/* Attachments */}
        <SectionCard icon={<Upload size={18} color={ACCENT} />} title="Attachments (Optional)">
          <Controller
            control={control}
            name="attachments"
            render={({ field: { onChange, value } }) => (
              <TouchableOpacity
                style={styles.uploadBox}
                onPress={async () => {
                  const result = await DocumentPicker.getDocumentAsync({
                    type: [
                      'application/pdf',
                      'application/msword',
                      'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
                    ],
                  });
                  if (!result.canceled && result.assets?.[0]) {
                    onChange({
                      uri: result.assets[0].uri,
                      name: result.assets[0].name,
                      type: result.assets[0].mimeType ?? 'application/pdf',
                    });
                  }
                }}
                activeOpacity={0.8}
              >
                <Upload size={32} color="rgba(13,148,136,0.50)" />
                <Text style={styles.uploadText}>
                  {value ? (value as Attachment).name : 'Tap to upload PDF or Word file'}
                </Text>
                <Text style={styles.uploadSub}>PDF, DOC, DOCX supported</Text>
              </TouchableOpacity>
            )}
          />
          {errors.attachments && <Text style={styles.error}>{errors.attachments.message}</Text>}
        </SectionCard>

        {/* Mode */}
        <SectionCard icon={<Briefcase size={18} color={ACCENT} />} title="Work Mode">
          <Controller
            control={control}
            name="mode"
            render={({ field: { onChange, value } }) => (
              <View style={styles.radioGroup}>
                {modeOptions.map(option => (
                  <TouchableOpacity
                    key={option.value}
                    style={[styles.radioRow, value === option.value && styles.radioRowActive]}
                    onPress={() => onChange(option.value)}
                    activeOpacity={0.8}
                  >
                    <View style={[styles.radioOuter, value === option.value && styles.radioOuterActive]}>
                      {value === option.value && <View style={styles.radioInner} />}
                    </View>
                    <Text style={[styles.radioText, value === option.value && styles.radioTextActive]}>
                      {option.label}
                    </Text>
                  </TouchableOpacity>
                ))}
              </View>
            )}
          />
          {errors.mode && <Text style={styles.error}>{errors.mode.message}</Text>}
        </SectionCard>

        {/* Duration, Freelancer Type, Experience */}
        <SectionCard icon={<Clock size={18} color={ACCENT} />} title="Project Preferences">
          {(['duration', 'freelancerType', 'experienceLevel'] as const).map(name => (
            <View style={{ marginBottom: 12 }} key={name}>
              <Controller
                control={control}
                name={name}
                render={({ field: { onChange, value } }) => (
                  <SelectBox
                    label={
                      name === 'duration' ? 'Hiring Timeline'
                        : name === 'freelancerType' ? 'Freelancer Type'
                          : 'Experience Level'
                    }
                    selectedValue={value as string}
                    onValueChange={onChange}
                    required
                    options={
                      name === 'duration'
                        ? [
                          { label: 'Immediately', value: 'immediate' },
                          { label: 'Within a week', value: 'week' },
                          { label: 'Flexible', value: 'flexible' },
                        ]
                        : name === 'freelancerType'
                          ? [
                            { label: 'Individual', value: 'individual' },
                            { label: 'Agency', value: 'agency' },
                          ]
                          : [
                            { label: 'Beginner', value: 'beginner' },
                            { label: 'Intermediate', value: 'intermediate' },
                            { label: 'Expert', value: 'expert' },
                          ]
                    }
                  />
                )}
              />
              {errors[name] && (
                <Text style={styles.error}>{errors[name]?.message}</Text>
              )}
            </View>
          ))}
        </SectionCard>

        {/* Terms */}
        <View style={styles.termsCard}>
          <Controller
            control={control}
            name="termsAccepted"
            render={({ field: { value, onChange } }) => (
              <TouchableOpacity
                style={styles.checkboxRow}
                onPress={() => onChange(!value)}
                activeOpacity={0.8}
              >
                <View style={[styles.checkboxOuter, value && styles.checkboxChecked]}>
                  {value && <CheckCircle2 size={14} color="#fff" />}
                </View>
                <Text style={styles.checkboxText}>
                  I confirm that the project details are accurate and comply with ICCD Talent Gates Terms of Service.
                </Text>
              </TouchableOpacity>
            )}
          />
          {errors.termsAccepted && <Text style={styles.error}>{errors.termsAccepted.message}</Text>}
        </View>

        {/* Submit */}
        <TouchableOpacity
          style={styles.submitBtnWrapper}
          onPress={handleSubmit(onSubmit)}
          activeOpacity={0.85}
        >
          <LinearGradient
            colors={[ACCENT, '#0891b2']}
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 0 }}
            style={styles.submitBtn}
          >
            <Text style={styles.submitText}>Submit Project</Text>
            <ArrowRight size={20} color="#fff" />
          </LinearGradient>
        </TouchableOpacity>

        <View style={{ height: 40 }} />
      </ScrollView>
    </LinearGradient>
  );
};

const styles = StyleSheet.create({
  gradient: { flex: 1 },
  scroll: { flex: 1 },
  container: {
    padding: 16,
    paddingBottom: 40,
  },
  heroCard: {
    borderRadius: 18,
    padding: 22,
    marginBottom: 16,
  },
  heroTitle: {
    fontSize: 22,
    fontWeight: '800',
    color: '#fff',
    letterSpacing: -0.3,
    marginBottom: 4,
  },
  heroSub: {
    fontSize: 13,
    color: 'rgba(255,255,255,0.75)',
    fontWeight: '500',
  },
  sectionCard: {
    backgroundColor: 'rgba(255,255,255,0.82)',
    borderRadius: 16,
    borderWidth: 1,
    borderColor: BORDER,
    marginBottom: 14,
    overflow: 'hidden',
  },
  sectionHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
    padding: 14,
    borderBottomWidth: 1,
    borderBottomColor: BORDER,
  },
  sectionIconBox: {
    width: 34,
    height: 34,
    borderRadius: 10,
    backgroundColor: 'rgba(13,148,136,0.10)',
    alignItems: 'center',
    justifyContent: 'center',
  },
  sectionTitle: {
    fontSize: 15,
    fontWeight: '700',
    color: TEXT_PRIMARY,
  },
  sectionBody: {
    padding: 14,
  },
  textarea: {
    borderWidth: 1,
    borderColor: BORDER,
    borderRadius: 12,
    minHeight: 110,
    padding: 12,
    fontSize: 14,
    color: TEXT_PRIMARY,
    backgroundColor: 'rgba(255,255,255,0.80)',
    textAlignVertical: 'top',
  },
  row: { flexDirection: 'row', gap: 10 },
  half: { flex: 1 },
  addSkillBtn: {
    borderRadius: 10,
    overflow: 'hidden',
    marginTop: 10,
    marginBottom: 12,
    shadowColor: ACCENT,
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.20,
    shadowRadius: 6,
    elevation: 4,
  },
  addSkillGradient: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 11,
    gap: 6,
  },
  addSkillText: {
    color: '#fff',
    fontWeight: '700',
    fontSize: 14,
  },
  skillList: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 8,
  },
  skillChip: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'rgba(13,148,136,0.10)',
    paddingHorizontal: 12,
    paddingVertical: 7,
    borderRadius: 20,
    gap: 7,
    borderWidth: 1,
    borderColor: 'rgba(13,148,136,0.20)',
  },
  skillChipText: {
    fontSize: 13,
    fontWeight: '600',
    color: ACCENT,
  },
  dateBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
    backgroundColor: 'rgba(255,255,255,0.80)',
    borderRadius: 12,
    borderWidth: 1,
    borderColor: BORDER,
    padding: 13,
  },
  dateBtnText: {
    fontSize: 14,
    color: TEXT_PRIMARY,
    fontWeight: '500',
  },
  uploadBox: {
    borderWidth: 1.5,
    borderColor: 'rgba(13,148,136,0.25)',
    borderStyle: 'dashed',
    borderRadius: 14,
    height: 130,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(13,148,136,0.04)',
    gap: 8,
  },
  uploadText: {
    fontSize: 13,
    color: TEXT_PRIMARY,
    fontWeight: '600',
    textAlign: 'center',
  },
  uploadSub: {
    fontSize: 11,
    color: TEXT_SECONDARY,
    textAlign: 'center',
  },
  radioGroup: { gap: 8 },
  radioRow: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 12,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: BORDER,
    backgroundColor: 'rgba(255,255,255,0.60)',
    gap: 12,
  },
  radioRowActive: {
    backgroundColor: 'rgba(13,148,136,0.08)',
    borderColor: 'rgba(13,148,136,0.30)',
  },
  radioOuter: {
    width: 20,
    height: 20,
    borderRadius: 10,
    borderWidth: 2,
    borderColor: BORDER,
    alignItems: 'center',
    justifyContent: 'center',
  },
  radioOuterActive: {
    borderColor: ACCENT,
  },
  radioInner: {
    width: 9,
    height: 9,
    borderRadius: 5,
    backgroundColor: ACCENT,
  },
  radioText: {
    fontSize: 14,
    color: TEXT_SECONDARY,
    fontWeight: '500',
  },
  radioTextActive: {
    color: TEXT_PRIMARY,
    fontWeight: '700',
  },
  termsCard: {
    backgroundColor: 'rgba(255,255,255,0.82)',
    borderRadius: 16,
    borderWidth: 1,
    borderColor: BORDER,
    padding: 16,
    marginBottom: 14,
  },
  checkboxRow: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    gap: 12,
  },
  checkboxOuter: {
    width: 22,
    height: 22,
    borderWidth: 2,
    borderColor: BORDER,
    borderRadius: 6,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'rgba(255,255,255,0.80)',
    flexShrink: 0,
    marginTop: 1,
  },
  checkboxChecked: {
    backgroundColor: ACCENT,
    borderColor: ACCENT,
  },
  checkboxText: {
    flex: 1,
    fontSize: 13,
    color: TEXT_SECONDARY,
    lineHeight: 20,
  },
  submitBtnWrapper: {
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
  submitText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '700',
    letterSpacing: 0.3,
  },
  error: {
    color: '#dc2626',
    fontSize: 12,
    marginTop: 4,
  },
});

export default CreateProjectScreen;