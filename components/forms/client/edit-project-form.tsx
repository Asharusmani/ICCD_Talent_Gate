import React, { useEffect } from 'react';
import { View, ScrollView, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { useForm, Controller } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import  InputField  from '@/components/ui/input-field';
import SelectBox from '../../ui/select-box';
import { editProjectSchema } from '@/components/schemas/schema';

interface EditProjectFormProps {
  projectData?: {
    title: string;
    category: string;
    subcategory: string;
    skills: string;
    budget: string;
    deadline: string;
    timeline: string;
    language: string;
    freelancerType: string;
  };
}

const EditProjectForm: React.FC<EditProjectFormProps> = ({ projectData }) => {
  const {
    control,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm({
    resolver: yupResolver(editProjectSchema),
    defaultValues: {
      title: '',
      category: '',
      subcategory: '',
      skills: '',
      budget: '',
      deadline: '',
      timeline: '',
      language: '',
      freelancerType: '',
    },
  });

  useEffect(() => {
    if (projectData) {
      reset(projectData);
    }
  }, [projectData, reset]);

  const onSubmit = (data: any) => {
    console.log('UPDATED FORM DATA ', data);
  };

  return (
    <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
      {/* Header */}
      <View style={styles.headerCard}>
        <Text style={styles.headerTitle}>Edit Project</Text>
        <Text style={styles.headerSub}>
          Update your project details and requirements
        </Text>
      </View>

      {/* Project Title */}
      <Controller
        control={control}
        name="title"
        render={({ field: { onChange, value } }) => (
          <InputField
            label="Project Title"
            placeholder="Enter project title"
            value={value}
            onChangeText={onChange}
            required
          />
        )}
      />
      {errors.title && <Text style={styles.error}>{errors.title.message}</Text>}

      {/* Category + Subcategory */}
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
          {errors.category && (
            <Text style={styles.error}>{errors.category.message}</Text>
          )}
        </View>

        <View style={styles.half}>
          <Controller
            control={control}
            name="subcategory"
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
          {errors.subcategory && (
            <Text style={styles.error}>{errors.subcategory.message}</Text>
          )}
        </View>
      </View>

      {/* Skills */}
      <Controller
        control={control}
        name="skills"
        render={({ field: { onChange, value } }) => (
          <InputField
            label="Required Skills"
            placeholder="React, Node, UI/UX"
            value={value}
            onChangeText={onChange}
            required
          />
        )}
      />
      {errors.skills && <Text style={styles.error}>{errors.skills.message}</Text>}

      {/* Budget */}
      <Controller
        control={control}
        name="budget"
        render={({ field: { onChange, value } }) => (
          <InputField
            label="Budget"
            placeholder="5000 - 8000"
            value={value}
            onChangeText={onChange}
            keyboardType="numeric"
            required
          />
        )}
      />
      {errors.budget && <Text style={styles.error}>{errors.budget.message}</Text>}

      {/* Deadline */}
      <Controller
        control={control}
        name="deadline"
        render={({ field: { onChange, value } }) => (
          <InputField
            label="Deadline"
            placeholder="mm/dd/yyyy"
            value={value}
            onChangeText={onChange}
            required
          />
        )}
      />
      {errors.deadline && (
        <Text style={styles.error}>{errors.deadline.message}</Text>
      )}

      {/* Hiring Timeline */}
      <Controller
        control={control}
        name="timeline"
        render={({ field: { onChange, value } }) => (
          <SelectBox
            label="Hiring Timeline"
            selectedValue={value}
            onValueChange={onChange}
            required
            options={[
              { label: 'Immediately', value: 'immediate' },
              { label: 'Within a week', value: 'week' },
              { label: 'Flexible', value: 'flexible' },
            ]}
          />
        )}
      />
      {errors.timeline && (
        <Text style={styles.error}>{errors.timeline.message}</Text>
      )}

      {/* Language */}
      <Controller
        control={control}
        name="language"
        render={({ field: { onChange, value } }) => (
          <SelectBox
            label="Language"
            selectedValue={value}
            onValueChange={onChange}
            required
            options={[
              { label: 'English', value: 'en' },
              { label: 'Urdu', value: 'ur' },
            ]}
          />
        )}
      />
      {errors.language && (
        <Text style={styles.error}>{errors.language.message}</Text>
      )}

      {/* Freelancer Type */}
      <Controller
        control={control}
        name="freelancerType"
        render={({ field: { onChange, value } }) => (
          <SelectBox
            label="Freelancer Type"
            selectedValue={value}
            onValueChange={onChange}
            required
            options={[
              { label: 'Individual', value: 'individual' },
              { label: 'Agency', value: 'agency' },
            ]}
          />
        )}
      />
      {errors.freelancerType && (
        <Text style={styles.error}>{errors.freelancerType.message}</Text>
      )}

      {/* Action Buttons */}
      <View style={styles.buttonContainer}>
        <TouchableOpacity
          style={[styles.button, styles.cancelButton]}
          onPress={() => {
            // Navigate back or reset form
            console.log('Cancel edit');
          }}
        >
          <Text style={styles.cancelButtonText}>Cancel</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={[styles.button, styles.updateButton]}
          onPress={handleSubmit(onSubmit)}
        >
          <Text style={styles.buttonText}>Update Project</Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    padding: 16,
  },
  headerCard: {
    backgroundColor: '#0aa',
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
  row: {
    flexDirection: 'row',
    gap: 10,
  },
  half: {
    flex: 1,
  },
  error: {
    color: '#dc2626',
    fontSize: 12,
    marginBottom: 8,
  },
  buttonContainer: {
    flexDirection: 'row',
    gap: 12,
    marginTop: 20,
    marginBottom: 40,
  },
  button: {
    flex: 1,
    padding: 14,
    borderRadius: 10,
  },
  updateButton: {
    backgroundColor: '#0aa',
  },
  cancelButton: {
    backgroundColor: '#fff',
    borderWidth: 1,
    borderColor: '#e5e7eb',
  },
  buttonText: {
    color: '#fff',
    textAlign: 'center',
    fontSize: 16,
    fontWeight: '600',
  },
  cancelButtonText: {
    color: '#374151',
    textAlign: 'center',
    fontSize: 16,
    fontWeight: '600',
  },
});

export default EditProjectForm;