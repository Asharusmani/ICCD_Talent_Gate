import { LinearGradient } from 'expo-linear-gradient';
import { Controller, useForm } from 'react-hook-form';
import * as DocumentPicker from 'expo-document-picker';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { Stack, useLocalSearchParams, useRouter } from 'expo-router';
import {
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import * as yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
import { useApplyJob } from '@/api/client/job';


const createApplyjobSchema: yup.ObjectSchema<ApplyJobForm> = yup.object({
  name: yup.string().required('Full name is required'),
  email: yup.string().email('Invalid email').required('Email is required'),
  experience: yup
    .string()
    .matches(/^\d+$/, 'Experience must be a number')
    .required('Experience is required'),
  files: yup
    .mixed<DocumentPicker.DocumentPickerAsset>()
    .nullable()
    .required('CV is required'),
});


type ApplyJobForm = {
  name: string;
  email: string;
  experience: string;
  files: DocumentPicker.DocumentPickerAsset | null;
};

export default function ApplyJob() {

  const router = useRouter();
  const { freelancerId, projectId, clientId } = useLocalSearchParams()
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<ApplyJobForm>({
    resolver: yupResolver(createApplyjobSchema),
    defaultValues: {
      name: '',
      email: '',
      experience: '',
      files: null,
    },
  });

  const { submitJob, isPending, isError, error } = useApplyJob();

  const onSubmit = (data: any) => {
    const formData = new FormData();

    formData.append('name', data.name);
    formData.append('email', data.email);
    formData.append('experience', data.experience);
    formData.append('freelancerId', freelancerId);
    formData.append('projectId', projectId);
    formData.append('clientId', clientId);

    if (data.files) {
      formData.append('files', {
        uri: data.files.uri,
        type: data.files.mimeType || 'application/pdf',
        name: data.files.name,
      } as any);
    }
    submitJob(formData)
    router.back()
  };

  return (
    <KeyboardAvoidingView
      style={styles.container}
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
    >
      <Stack.Screen
        options={{
          headerShown: true,
          title: 'Apply Position',
          headerStyle: { backgroundColor: '#109f93ff' },
          headerTintColor: '#fff',
        }}
      />

      <ScrollView contentContainerStyle={styles.body} showsVerticalScrollIndicator={false}>
        {/* Full Name */}
        <Text style={styles.label}>Full Name</Text>
        <Controller
          control={control}
          name="name"
          render={({ field: { onChange, value } }) => (
            <TextInput
              style={styles.input}
              value={value}
              onChangeText={onChange}
              placeholder="Enter full name"
              placeholderTextColor="#A0A0A0"
            />
          )}
        />
        {errors.name && <Text style={styles.error}>{errors.name.message}</Text>}

        {/* Email */}
        <Text style={styles.label}>Email</Text>
        <Controller
          control={control}
          name="email"
          render={({ field: { onChange, value } }) => (
            <TextInput
              style={styles.input}
              value={value}
              onChangeText={onChange}
              placeholder="Enter email address"
              keyboardType="email-address"
              autoCapitalize="none"
              placeholderTextColor="#A0A0A0"
            />
          )}
        />
        {errors.email && <Text style={styles.error}>{errors.email.message}</Text>}

        {/* Experience */}
        <Text style={styles.label}>Year of experience</Text>
        <Controller
          control={control}
          name="experience"
          render={({ field: { onChange, value } }) => (
            <TextInput
              style={styles.input}
              value={String(value)}
              onChangeText={onChange}
              placeholder="e.g. 5"
              keyboardType="numeric"
              placeholderTextColor="#A0A0A0"
            />
          )}
        />
        {errors.experience && <Text style={styles.error}>{errors.experience.message}</Text>}

        {/* Upload CV */}
        <Controller
          control={control}
          name="files"
          render={({ field: { onChange, value } }) => (
            <>
              <TouchableOpacity
                style={styles.uploadContainer}
                activeOpacity={0.7}
                onPress={async () => {
                  const result = await DocumentPicker.getDocumentAsync({
                    type: [
                      'application/pdf',
                      'application/msword',
                      'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
                    ],
                  });

                  if (!result.canceled) {
                    onChange(result.assets[0]);
                  }
                }}
              >
                <MaterialCommunityIcons
                  name="upload-network-outline"
                  size={40}
                  color="#4A7A7C"
                />

                <Text style={styles.uploadText}>
                  {value ? value.name : 'Click to upload CV'}
                </Text>
              </TouchableOpacity>

              {errors.files && <Text style={styles.error}>{errors.files.message}</Text>}
            </>
          )}
        />
        {/* Buttons */}
        <View style={styles.footer}>
          <TouchableOpacity
            style={styles.cancelButton}
            activeOpacity={0.8}
            onPress={() => router.back()}
          >
            <Text style={styles.cancelButtonText}>Back</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.flexButton}
            activeOpacity={0.8}
            onPress={handleSubmit(onSubmit)}
          >
            <LinearGradient
              colors={['#15A9B2', '#115B60']}
              start={{ x: 0, y: 0 }}
              end={{ x: 1, y: 0 }}
              style={styles.gradientButton}
            >
              <Text style={styles.gradientButtonText}>Submit</Text>
            </LinearGradient>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
}


const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F4F4F4'
  },
  body: { padding: 20 },

  label: {
    fontSize: 14,
    fontWeight: '600',
    color: '#333',
    marginBottom: 8,
  },

  input: {
    backgroundColor: '#fff',
    borderRadius: 8,
    paddingHorizontal: 15,
    paddingVertical: 12,
    marginBottom: 20,
    borderWidth: 1,
    borderColor: '#E0E0E0',
    fontSize: 14,
    color: '#000',
  },

  error: {
    color: 'red',
    fontSize: 12,
    marginTop: -15,
    marginBottom: 10,
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

  footer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingBottom: 10,
  },

  cancelButton: {
    flex: 1,
    borderWidth: 1,
    borderColor: '#21818B',
    borderRadius: 10,
    paddingVertical: 12,
    marginRight: 5,
    alignItems: 'center',
  },

  cancelButtonText: {
    color: '#21818B',
    fontWeight: 'bold',
    fontSize: 16,
  },

  flexButton: {
    flex: 1,
    marginLeft: 5,
  },

  gradientButton: {
    paddingVertical: 12,
    borderRadius: 10,
    alignItems: 'center',
  },

  gradientButtonText: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 16,
  },
});
