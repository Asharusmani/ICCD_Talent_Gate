// ProfessionalInfoForm.tsx
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
import SelectBox from '@/components/ui/select-box';
import InputField from '@/components/ui/input-field';
import { yupResolver } from '@hookform/resolvers/yup';
import { useAddProfile } from '@/api/client/freelancer';
import { useAppSelector } from '@/hooks/use-apply-project';
import { SafeAreaView } from 'react-native-safe-area-context';
import FormTemplate from '@/components/template/form-template';
import { useForm, Controller, useFieldArray } from 'react-hook-form';
import { professionalInfoSchema } from '@/components/schemas/schema';
import StepsNavigation from '@/components/forms/freelancer/profile-step-navigation';
import { Education, ProfessionalInfoFormData, Skill } from '@/components/types/proposal.types';

export default function ProfessionalInfoForm() {

  const profile = useAppSelector(state => state.profile.profile)

  const {
    control,
    handleSubmit,
    formState: { errors },
    watch,
  } = useForm<ProfessionalInfoFormData>({
    resolver: yupResolver(professionalInfoSchema),
    defaultValues: {
      professionalTitle: '',
      professionalBio: '',
      primaryCategory: '',
      skills: [],
      experience: '',
      education: [],
      termsAccepted: false,
    },
  });

  const {
    fields: skillFields,
    append: appendSkill,
    remove: removeSkill,
  } = useFieldArray({
    control,
    name: 'skills',
  });

  const {
    fields: educationFields,
    append: appendEducation,
    remove: removeEducation,
  } = useFieldArray({
    control,
    name: 'education',
  });

  const professionalBio = watch('professionalBio');
  const termsAccepted = watch('termsAccepted');

  const [newSkill, setNewSkill] = useState({ skill: '', level: '' });
  const [newEducation, setNewEducation] = useState<Education>({
    institution: '',
    country: '',
    title: '',
    major: '',
    year: '',
  });

  const handleAddSkill = () => {
    if (newSkill.skill && newSkill.level) {
      appendSkill(newSkill as Skill);
      setNewSkill({ skill: '', level: '' });
    } else {
      Alert.alert('Error', 'Please select both skill and level');
    }
  };

  const handleAddEducation = () => {
    if (
      newEducation.title &&
      newEducation.major &&
      newEducation.institution &&
      newEducation.country &&
      newEducation.year
    ) {
      appendEducation(newEducation);
      setNewEducation({
        title: '',
        major: '',
        institution: '',
        country: '',
        year: '',
      });
    } else {
      Alert.alert('Error', 'Please fill all education fields');
    }
  };

  const { addProfile, isSuccess, isPending, isError, error } = useAddProfile()

  const onSubmit = (data: ProfessionalInfoFormData) => {
    const formData = new FormData();

    // Text fields
    formData.append('professionalTitle', data.professionalTitle);
    formData.append('professionalSummary', data.professionalBio);
    formData.append('categoryOfWork', data.primaryCategory);
    formData.append('firstName', profile.firstName);
    formData.append('lastName', profile.lastName);
    formData.append('email', profile.email);
    formData.append('country', profile.country);
    formData.append('city', profile.city);

    formData.append('education', JSON.stringify(data.education));
    formData.append('skills', JSON.stringify(data.skills));

    if (profile.files) {
      formData.append('files', {
        uri: profile.files.uri,
        type: profile.files.mimeType || 'application/pdf',
        name: profile.files.fileName || profile.files.name || 'document.pdf',
      } as any);
    }

    if (profile.portfolio_files && profile.portfolio_files.length > 0) {
      profile.portfolio_files.forEach((item: any, index: number) => {
        formData.append('portfolio_files', { 
          uri: item.uri,
          type: item.mimeType || 'image/jpeg', 
          name: item.fileName || item.name || `portfolio_${index}.jpg`,
        } as any);
      });
    }
    addProfile(formData);
  };

  const categoryOptions = [
    { label: 'Web Development', value: 'web_development' },
    { label: 'Mobile Development', value: 'mobile_development' },
    { label: 'UI/UX Design', value: 'ui_ux_design' },
    { label: 'Graphic Design', value: 'graphic_design' },
    { label: 'Digital Marketing', value: 'digital_marketing' },
    { label: 'Content Writing', value: 'content_writing' },
    { label: 'Video Editing', value: 'video_editing' },
    { label: 'Data Science', value: 'data_science' },
  ];

  const skillOptions = [
    { label: 'React', value: 'react' },
    { label: 'React Native', value: 'react_native' },
    { label: 'TypeScript', value: 'typescript' },
    { label: 'JavaScript', value: 'javascript' },
    { label: 'Python', value: 'python' },
    { label: 'Node.js', value: 'nodejs' },
    { label: 'UI/UX Design', value: 'ui_ux' },
    { label: 'Figma', value: 'figma' },
    { label: 'Adobe Photoshop', value: 'photoshop' },
    { label: 'SEO', value: 'seo' },
  ];

  const levelOptions = [
    { label: 'Beginner', value: 'beginner' },
    { label: 'Intermediate', value: 'intermediate' },
    { label: 'Advanced', value: 'advanced' },
    { label: 'Expert', value: 'expert' },
  ];

  const experienceOptions = [
    { label: 'Less than 1 year', value: 'less_than_1' },
    { label: '1-2 years', value: '1_2_years' },
    { label: '3-5 years', value: '3_5_years' },
    { label: '5-10 years', value: '5_10_years' },
    { label: 'More than 10 years', value: 'more_than_10' },
  ];

  return (
    <SafeAreaView style={styles.container}>

      {/* <View style={styles.header}>
        <TouchableOpacity style={styles.backButton}>
          <Text style={styles.backButtonText}>←</Text>
        </TouchableOpacity>
        <View style={styles.completionBadge}>
          <Text style={styles.completionText}>100%</Text>
        </View>
      </View> */}

      {/* <StepsNavigation currentStep={currentStep} onStepPress={setCurrentStep} /> */}

      <FormTemplate>
        {/* Active Step Card */}
        <View style={styles.activeStepCard}>
          <View style={styles.activeStepHeader}>
            <View style={styles.activeStepIcon}>
              <Text style={styles.activeStepIconText}>3</Text>
            </View>
            <Text style={styles.activeStepTitle}>Professional Info</Text>
          </View>
        </View>

        {/* Form Section */}
        <View style={styles.formSection}>
          <Text style={styles.sectionTitle}>Professional Info</Text>
          <Text style={styles.sectionDescription}>
            Tell us a bit about yourself. This information will appear on your public profile, so
            that potential buyers can get to know you better.
          </Text>
          <Text style={styles.mandatoryText}>* Mandatory fields</Text>

          {/* Professional Title */}
          <View style={styles.inputGroup}>
            <Text style={styles.inputDescription}>
              If you have a personal website, portfolio, or blog, add the link here.
            </Text>
            <Controller
              control={control}
              name="professionalTitle"
              render={({ field: { onChange, value } }) => (
                <InputField
                  label="Professional Title"
                  placeholder="Professional Title Like: Full Stack Web Developer, Graphic Designer"
                  value={value}
                  onChangeText={onChange}
                  required
                />
              )}
            />
            {errors.professionalTitle && (
              <Text style={styles.errorText}>{errors.professionalTitle.message}</Text>
            )}
          </View>

          {/* Professional Bio */}
          <View style={styles.inputGroup}>
            <Text style={styles.label}>
              Professional Summary / Bio <Text style={styles.required}>*</Text>
            </Text>
            <Text style={styles.inputDescription}>
              Briefly describe your experience, expertise, and what you offer.
            </Text>
            <Controller
              control={control}
              name="professionalBio"
              render={({ field: { onChange, onBlur, value } }) => (
                <TextInput
                  style={[styles.textarea, errors.professionalBio && styles.inputError]}
                  placeholder="Tell clients about your skills and experience..."
                  placeholderTextColor="#999"
                  value={value}
                  onChangeText={onChange}
                  onBlur={onBlur}
                  multiline
                  numberOfLines={6}
                  textAlignVertical="top"
                />
              )}
            />
            <Text style={styles.charCount}>
              min. 50 characters ({professionalBio.length}/1000)
            </Text>
            {errors.professionalBio && (
              <Text style={styles.errorText}>{errors.professionalBio.message}</Text>
            )}
          </View>

          {/* Primary Category */}
          <View style={styles.inputGroup}>
            <Controller
              control={control}
              name="primaryCategory"
              render={({ field: { onChange, value } }) => (
                <SelectBox
                  label="Primary Category of Work"
                  selectedValue={value}
                  onValueChange={onChange}
                  options={categoryOptions}
                  required
                />
              )}
            />
            {errors.primaryCategory && (
              <Text style={styles.errorText}>{errors.primaryCategory.message}</Text>
            )}
          </View>

          {/* Skills */}
          <View style={styles.inputGroup}>
            <Text style={styles.label}>
              Skills <Text style={styles.required}>*</Text>
            </Text>
            <Text style={styles.inputDescription}>
              List the skills related to the services you're offering and add your experience level.
            </Text>

            {/* Display Added Skills */}
            {skillFields.map((field, index) => (
              <View key={field.id} style={styles.addedItem}>
                <View style={styles.addedItemContent}>
                  <Text style={styles.addedItemText}>
                    {skillOptions.find((s) => s.value === field.skill)?.label || field.skill}
                  </Text>
                  <Text style={styles.addedItemSubtext}>
                    {levelOptions.find((l) => l.value === field.level)?.label || field.level}
                  </Text>
                </View>
                <TouchableOpacity
                  onPress={() => removeSkill(index)}
                  style={styles.removeButton}
                >
                  <Text style={styles.removeButtonText}>×</Text>
                </TouchableOpacity>
              </View>
            ))}

            {/* Add New Skill */}
            <View style={styles.rowInputGroup}>
              <View style={styles.halfWidth}>
                <SelectBox
                  placeholder='Select Skills'
                  selectedValue={newSkill.skill}
                  onValueChange={(value) => setNewSkill({ ...newSkill, skill: value })}
                  options={skillOptions}
                />
              </View>

              <View style={styles.halfWidth}>
                <SelectBox
                  placeholder='Select Level'
                  selectedValue={newSkill.level}
                  onValueChange={(value) => setNewSkill({ ...newSkill, level: value })}
                  options={levelOptions}
                />
              </View>

              <TouchableOpacity style={styles.addButton} onPress={handleAddSkill}>
                <Text style={styles.addButtonText}>Add</Text>
              </TouchableOpacity>
            </View>

            {errors.skills && <Text style={styles.errorText}>{errors.skills.message}</Text>}
          </View>

          {/* Experience */}
          <View style={styles.inputGroup}>
            <Controller
              control={control}
              name="experience"
              render={({ field: { onChange, value } }) => (
                <SelectBox
                  label="Experience"
                  selectedValue={value}
                  onValueChange={onChange}
                  options={experienceOptions}
                  required
                />
              )}
            />
            {errors.experience && (
              <Text style={styles.errorText}>{errors.experience.message}</Text>
            )}
          </View>

          {/* Education */}
          <View style={styles.inputGroup}>
            <Text style={styles.label}>Education</Text>
            <Text style={styles.inputDescription}>
              Add any relevant education details that will help customers to get to know you better.
            </Text>

            {/* Display Added Education */}
            {educationFields.map((field, index) => (
              <View key={field.id} style={styles.addedItem}>
                <View style={styles.addedItemContent}>
                  <Text style={styles.addedItemText}>
                    {field.title} in {field.major}
                  </Text>
                  <Text style={styles.addedItemSubtext}>
                    {field.institution}, {field.country} - {field.year}
                  </Text>
                </View>
                <TouchableOpacity
                  onPress={() => removeEducation(index)}
                  style={styles.removeButton}
                >
                  <Text style={styles.removeButtonText}>×</Text>
                </TouchableOpacity>
              </View>
            ))}

            {/* Add New Education */}
            <View style={styles.educationGrid}>
              <InputField
                placeholder="Enter program"
                value={newEducation.title}
                onChangeText={(text) => setNewEducation({ ...newEducation, title: text })}
              />
              <InputField
                placeholder="Enter degree"
                value={newEducation.major}
                onChangeText={(text) => setNewEducation({ ...newEducation, major: text })}
              />
              <Text style={styles.helperText}>Example: BS, BE</Text>
              <Text style={styles.helperText}>Example: Science</Text>
            </View>

            <View style={styles.educationGrid}>
              <InputField
                placeholder="Enter Institution"
                value={newEducation.institution}
                onChangeText={(text) => setNewEducation({ ...newEducation, institution: text })}
              />
              <InputField
                placeholder="Enter country"
                value={newEducation.country}
                onChangeText={(text) => setNewEducation({ ...newEducation, country: text })}
              />
              <InputField
                placeholder="Enter year"
                value={newEducation.year}
                onChangeText={(text) => setNewEducation({ ...newEducation, year: text })}
                keyboardType="numeric"
              />
            </View>

            <TouchableOpacity style={styles.addButton} onPress={handleAddEducation}>
              <Text style={styles.addButtonText}>Add</Text>
            </TouchableOpacity>

            {errors.education && (
              <Text style={styles.errorText}>{errors.education.message}</Text>
            )}
          </View>

          {/* Terms and Conditions */}
          <View style={styles.termsContainer}>
            <Controller
              control={control}
              name="termsAccepted"
              render={({ field: { onChange, value } }) => (
                <TouchableOpacity
                  style={styles.checkboxContainer}
                  onPress={() => onChange(!value)}
                >
                  <View
                    style={[
                      styles.checkbox,
                      value && styles.checkboxChecked,
                      errors.termsAccepted && styles.checkboxError,
                    ]}
                  >
                    {value && <Text style={styles.checkmark}>✓</Text>}
                  </View>
                  <Text style={styles.termsText}>
                    I confirm that this proposal represents my original work and aligns with{' '}
                    <Text style={styles.termsLink}>ICCD Talent Gate's guidelines</Text>.{' '}
                    <Text style={styles.termsSubtext}>
                      Please read our terms of service before submitting.
                    </Text>
                  </Text>
                </TouchableOpacity>
              )}
            />
            {errors.termsAccepted && (
              <Text style={styles.errorText}>{errors.termsAccepted.message}</Text>
            )}
          </View>
        </View>
      </FormTemplate>

      <View style={styles.footer}>
        <TouchableOpacity style={styles.submitButton} onPress={handleSubmit(onSubmit)}>
          <Text style={styles.submitButtonText}>Submit</Text>
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
  backButtonText: { color: '#fff', fontSize: 20 },
  completionBadge: {
    backgroundColor: '#5a9090',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 12,
  },
  completionText: { color: '#fff', fontSize: 12, fontWeight: '600' },
  content: { flex: 1 },
  activeStepCard: {
    backgroundColor: '#1a5f5f',
    marginHorizontal: 16,
    marginTop: 16,
    marginBottom: 8,
    padding: 16,
    borderRadius: 12,
  },
  activeStepHeader: { flexDirection: 'row', alignItems: 'center' },
  activeStepIcon: {
    width: 32,
    height: 32,
    borderRadius: 16,
    backgroundColor: 'rgba(255,255,255,0.2)',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 12,
  },
  activeStepIconText: { color: '#fff', fontSize: 16, fontWeight: '600' },
  activeStepTitle: { color: '#fff', fontSize: 16, fontWeight: '600' },
  formSection: {
    backgroundColor: '#fff',
    marginHorizontal: 16,
    marginBottom: 16,
    padding: 20,
    borderRadius: 12,
  },
  sectionTitle: { fontSize: 20, fontWeight: '700', color: '#000', marginBottom: 8 },
  sectionDescription: { fontSize: 13, color: '#666', lineHeight: 18, marginBottom: 8 },
  mandatoryText: { fontSize: 13, color: '#5a9090', marginBottom: 20, fontStyle: 'italic' },
  inputGroup: { marginBottom: 20 },
  label: { fontSize: 14, fontWeight: '600', color: '#000', marginBottom: 4 },
  required: { color: '#e74c3c' },
  inputDescription: { fontSize: 12, color: '#666', marginBottom: 8 },
  inputError: { borderColor: '#e74c3c' },
  textarea: {
    backgroundColor: '#f8f8f8',
    borderRadius: 8,
    paddingHorizontal: 16,
    paddingVertical: 14,
    fontSize: 14,
    borderWidth: 1,
    borderColor: '#e0e0e0',
    minHeight: 120,
  },
  charCount: { fontSize: 11, color: '#999', marginTop: 4 },
  errorText: { color: '#e74c3c', fontSize: 12, marginTop: 4 },
  rowInputGroup: { display: 'flex', marginBottom: 8 },
  halfWidth: { flex: 1, marginRight: 8 },
  addButton: {
    backgroundColor: '#5a9090',
    paddingHorizontal: 20,
    paddingVertical: 14,
    borderRadius: 8,
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 14,
  },
  addButtonText: { color: '#fff', fontSize: 14, fontWeight: '600' },
  addedItem: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#f8f8f8',
    borderRadius: 8,
    paddingHorizontal: 12,
    paddingVertical: 10,
    marginBottom: 8,
    borderWidth: 1,
    borderColor: '#e0e0e0',
  },
  addedItemContent: { flex: 1 },
  addedItemText: { fontSize: 13, color: '#333', fontWeight: '500' },
  addedItemSubtext: { fontSize: 11, color: '#666', marginTop: 2 },
  removeButton: {
    width: 24,
    height: 24,
    borderRadius: 12,
    backgroundColor: '#e74c3c',
    justifyContent: 'center',
    alignItems: 'center',
    marginLeft: 8,
  },
  removeButtonText: { color: '#fff', fontSize: 18, fontWeight: '600' },
  educationGrid: { marginBottom: 8 },
  helperText: { fontSize: 10, color: '#999', marginTop: -8, marginBottom: 8 },
  termsContainer: { marginTop: 20, marginBottom: 10 },
  checkboxContainer: { flexDirection: 'row', alignItems: 'flex-start' },
  checkbox: {
    width: 20,
    height: 20,
    borderRadius: 4,
    borderWidth: 2,
    borderColor: '#e0e0e0',
    marginRight: 12,
    justifyContent: 'center',
    alignItems: 'center',
  },
  checkboxChecked: { backgroundColor: '#5a9090', borderColor: '#5a9090' },
  checkboxError: { borderColor: '#e74c3c' },
  checkmark: { color: '#fff', fontSize: 14, fontWeight: '700' },
  termsText: { flex: 1, fontSize: 13, color: '#333', lineHeight: 18 },
  termsLink: { color: '#5a9090', fontWeight: '600' },
  termsSubtext: { color: '#666', fontSize: 11 },
  footer: { backgroundColor: '#fff', padding: 16, borderTopWidth: 1, borderTopColor: '#e0e0e0' },
  submitButton: {
    backgroundColor: '#5a9090',
    paddingVertical: 16,
    borderRadius: 8,
    alignItems: 'center',
  },
  submitButtonText: { color: '#fff', fontSize: 16, fontWeight: '600' },
});