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
import  InputField from '@/components/ui/input-field';
import * as DocumentPicker from 'expo-document-picker';
import { formatDateDay } from '@/functions/date-format';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { createProjectSchema } from '@/components/schemas/schema';
import DateTimePicker from '@react-native-community/datetimepicker';
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

  const {
    control,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<CreateProjectProps>({
    resolver: yupResolver(createProjectSchema),
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
    addProject(formData);
    reset()
  };

  return (
    <ScrollView
      style={styles.container}
      showsVerticalScrollIndicator={false}
      keyboardShouldPersistTaps="handled"
    >
      {/* Header */}
      <View style={styles.headerCard}>
        <Text style={styles.headerTitle}>Project Management</Text>
        <Text style={styles.headerSub}>
          Choose a freelancer persona and instantly generate work
        </Text>
      </View>

      {/* Project Title */}
      <View style={styles.field}>
        <Controller
          control={control}
          name="title"
          render={({ field: { onChange, value } }) => (
            <SearchBar
              label="Project Title"
              placeholder="Enter project title"
              value={value}
              onChangeText={onChange}
              required
            />
          )}
        />
        {errors.title && <Text style={styles.error}>{errors.title.message}</Text>}
      </View>

      {/* Category + Subcategory */}
      <View style={styles.field}>
        <View style={styles.row}>
          <View style={styles.half}>
            <Controller
              control={control}
              name="category"
              render={({ field: { onChange, value } }) => (
                <SelectBox
                  label="Category"
                  selectedValue={value}
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
                  selectedValue={value}
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
      </View>

      {/* Text Areas */}
      {['description', 'deliverable'].map(name => (
        <View style={styles.field} key={name}>
          <Controller
            control={control}
            name={name as keyof CreateProjectProps}
            render={({ field: { onChange, value } }) => (
              <View style={styles.inputContainer}>
                <Text style={styles.label}>
                  {name === 'description' ? 'Project Description' : 'Deliverables'}
                </Text>
                <TextInput
                  style={styles.input}
                  multiline
                  numberOfLines={5}
                  placeholder={
                    name === 'description'
                      ? 'Describe your project...'
                      : 'Files, documents, outcomes...'
                  }
                  value={value}
                  onChangeText={onChange}
                  placeholderTextColor="#9ca3af"
                  textAlignVertical="top"
                />
              </View>
            )}
          />
          {errors[name as keyof CreateProjectProps] && (
            <Text style={styles.error}>{errors[name as keyof CreateProjectProps]?.message}</Text>
          )}
        </View>
      ))}

      {/* Skills */}
      <View style={styles.field}>
        <Text style={styles.label}>Required Skills</Text>
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
              >
                <Text style={styles.addSkillText}>+ Add Skill</Text>
              </TouchableOpacity>

              <View style={styles.skillList}>
                {value.map(skill => (
                  <View key={skill} style={styles.skillChip}>
                    <Text style={styles.skillChipText}>{skill}</Text>
                    <TouchableOpacity
                      onPress={() => onChange(value.filter(v => v !== skill))}
                    >
                      <Text style={styles.removeSkill}>✕</Text>
                    </TouchableOpacity>
                  </View>
                ))}
              </View>
            </View>
          )}
        />
        {errors.skills && <Text style={styles.error}>{errors.skills.message}</Text>}
      </View>

      {/* Budget */}
      <View style={styles.field}>
        <Controller
          control={control}
          name="budget"
          render={({ field: { onChange, value } }) => (
            <InputField
              label="Budget"
              placeholder="5000 - 8000"
              value={value ? String(value) : ''}
              onChangeText={text => onChange(isNaN(parseFloat(text)) ? 0 : parseFloat(text))}
              required
              keyboardType="numeric"
            />
          )}
        />
        {errors.budget && <Text style={styles.error}>{errors.budget.message}</Text>}
      </View>

      {/* Deadline */}
      <View style={styles.field}>
        <Text style={styles.headingtext}>Deadline</Text>
        <Controller
          control={control}
          name="deadline"
          render={({ field: { onChange, value } }) => (
            <>
              <TouchableOpacity
                style={styles.datePickerButton}
                onPress={() => setShowDatePicker(true)}
              >
                <Text style={styles.datePickerText}>{formatDateDay(value)}</Text>
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
      </View>

      {/* Upload Attachments */}
      <View style={styles.field}>
        <Text style={styles.headingtext}>Upload Attachments (Optional)</Text>
        <Controller
          control={control}
          name="attachments"
          render={({ field: { onChange, value } }) => (
            <>
              <TouchableOpacity
                style={styles.uploadContainer}
                onPress={async () => {
                  const result = await DocumentPicker.getDocumentAsync({
                    type: ['application/pdf', 'application/msword', 'application/vnd.openxmlformats-officedocument.wordprocessingml.document'],
                  });

                  if (result.type === 'success') {
                    onChange(result);
                  }
                }}
              >
                <MaterialCommunityIcons
                  name="file-upload-outline"
                  size={40}
                  color="#808080"
                />
                <Text style={styles.uploadText}>
                  {value ? value.name : 'Click to upload Attachments'}
                </Text>
              </TouchableOpacity>
              {errors.attachments && (
                <Text style={styles.error}>{errors.attachments.message}</Text>
              )}
            </>
          )}
        />
      </View>

      {/* Mode */}
      <View style={styles.field}>
        <Text style={styles.label}>Mode</Text>
        <Controller
          control={control}
          name="mode"
          render={({ field: { onChange, value } }) => (
            <>
              {modeOptions.map(option => (
                <TouchableOpacity
                  key={option.value}
                  style={styles.radioRow}
                  onPress={() => onChange(option.value)}
                >
                  <View style={styles.radioOuter}>
                    {value === option.value && <View style={styles.radioInner} />}
                  </View>
                  <Text style={styles.radioText}>{option.label}</Text>
                </TouchableOpacity>
              ))}
            </>
          )}
        />
        {errors.mode && <Text style={styles.error}>{errors.mode.message}</Text>}
      </View>

      {/* Duration, Freelancer Type, Experience */}
      {['duration', 'freelancerType', 'experienceLevel'].map(name => (
        <View style={styles.field} key={name}>
          <Controller
            control={control}
            name={name as keyof CreateProjectProps}
            render={({ field: { onChange, value } }) => (
              <SelectBox
                label={
                  name === 'duration'
                    ? 'Hiring Timeline'
                    : name === 'freelancerType'
                    ? 'Freelancer Type'
                    : 'Experience Level'
                }
                selectedValue={value}
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
          {errors[name as keyof CreateProjectProps] && (
            <Text style={styles.error}>{errors[name as keyof CreateProjectProps]?.message}</Text>
          )}
        </View>
      ))}

      {/* Terms */}
      <View style={styles.field}>
        <Controller
          control={control}
          name="termsAccepted"
          render={({ field: { value, onChange } }) => (
            <TouchableOpacity
              style={styles.checkboxRow}
              onPress={() => onChange(!value)}
              activeOpacity={0.8}
            >
              <View
                style={[styles.checkboxOuter, value && styles.checkboxOuterChecked]}
              >
                {value && <View style={styles.checkboxInner} />}
              </View>
              <Text style={styles.checkboxText}>
                I confirm that the project details are accurate and comply with ICCD
                Talent Gates Terms of Service.
              </Text>
            </TouchableOpacity>
          )}
        />
        {errors.termsAccepted && (
          <Text style={styles.error}>{errors.termsAccepted.message}</Text>
        )}
      </View>

      {/* Submit */}
      <TouchableOpacity style={styles.button} onPress={handleSubmit(onSubmit)}>
        <Text style={styles.buttonText}>Submit</Text>
      </TouchableOpacity>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F4F4F4',
    padding: 16,
  },
  headerCard: {
    backgroundColor: 'rgba(27, 97, 97, 1)',
    borderRadius: 12,
    padding: 16,
    marginBottom: 20,
  },
  headerTitle: {
    color: '#fff',
    fontSize: 18,
    fontWeight: '600',
  },
  headerSub: {
    color: '#e5ffff',
    marginTop: 4,
  },
  field: {
    marginBottom: 14,
  },
  row: {
    flexDirection: 'row',
    gap: 10,
  },
  half: {
    flex: 1,
  },
  inputContainer: {
    marginBottom: 8,
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
    marginBottom: 30,
  },
  uploadText: {
    fontSize: 12,
    color: '#808080',
    marginTop: 10,
    textAlign: 'center',
  },
  input: {
    borderWidth: 1,
    borderColor: '#e5e7eb',
    borderRadius: 8,
    minHeight: 120,
    padding: 12,
    fontSize: 14,
    color: '#1f2937',
    backgroundColor: '#fff',
  },
  label: {
    fontSize: 14,
    fontWeight: '500',
    marginBottom: 8,
  },
  error: {
    color: '#dc2626',
    fontSize: 12,
    marginTop: 4,
  },
  radioRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10,
  },
  radioOuter: {
    width: 20,
    height: 20,
    borderRadius: 10,
    borderWidth: 2,
    borderColor: '#0aa',
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 10,
  },
  radioInner: {
    width: 10,
    height: 10,
    borderRadius: 5,
    backgroundColor: '#0aa',
  },
  radioText: {
    fontSize: 14,
  },
  checkboxRow: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  checkboxOuter: {
    width: 20,
    height: 20,
    borderWidth: 2,
    borderColor: '#0aa',
    borderRadius: 4,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 10,
    backgroundColor: '#fff',
  },
  checkboxOuterChecked: {
    backgroundColor: '#0aa',
  },

  addSkillContainer: {
  flexDirection: 'row',
  alignItems: 'center',
  marginBottom: 12,
},

addSkillBtn: {
  flex: 1,
  backgroundColor: '#0aa',
  paddingVertical: 12,
  paddingHorizontal: 16,
  borderRadius: 25,
  alignItems: 'center',
  justifyContent: 'center',
  shadowColor: '#000',
  shadowOpacity: 0.1,
  shadowOffset: { width: 0, height: 2 },
  shadowRadius: 4,
  elevation: 2,
},

addSkillText: {
  color: '#fff',
  fontWeight: '600',
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
  backgroundColor: '#e0f2f1',
  paddingHorizontal: 12,
  paddingVertical: 6,
  borderRadius: 20,
  marginBottom: 8,
},

skillChipText: {
  marginRight: 8,
  fontSize: 13,
  fontWeight: '500',
  color: '#111827',
},

removeSkill: {
  color: '#dc2626',
  fontWeight: '700',
  fontSize: 12,
  paddingHorizontal: 4,
},

  checkboxInner: {
    width: 10,
    height: 10,
    backgroundColor: '#fff',
    borderRadius: 2,
  },
  checkboxText: {
    flex: 1,
    fontSize: 13,
  },
  button: {
    backgroundColor: '#0aa',
    padding: 14,
    borderRadius: 10,
    marginTop: 20,
    marginBottom: 40,
  },
  buttonText: {
    color: '#fff',
    textAlign: 'center',
    fontSize: 16,
    fontWeight: '600',
  },
  headingtext: {
    color: '#111827',
    fontSize: 13,
    fontWeight: '600',
    marginBottom: 6,
  },
  datePickerButton: {
    borderWidth: 1,
    borderColor: '#e5e7eb',
    borderRadius: 8,
    padding: 12,
    backgroundColor: '#fff',
  },
  datePickerText: {
    fontSize: 14,
    color: '#1f2937',
  },
});

export default CreateProjectScreen;