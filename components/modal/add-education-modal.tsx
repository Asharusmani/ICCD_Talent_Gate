import { LinearGradient } from "expo-linear-gradient";
import { Modal, StyleSheet, Text, TextInput, TouchableOpacity, View, KeyboardAvoidingView, Platform, ScrollView } from "react-native";
import { Controller, useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";

interface EducationFormData {
  country: string;
  universityName: string;
  degree: string;
  major: string;
  graduationYear: string;
}

interface AddEducationModalProps {
  visible: boolean;
  onClose: () => void;
  onAdd: (data: EducationFormData) => void;
}

const educationSchema = yup.object().shape({
  country: yup
    .string()
    .required("Country is required")
    .min(2, "Country must be at least 2 characters"),
  universityName: yup
    .string()
    .required("University name is required")
    .min(3, "University name must be at least 3 characters"),
  degree: yup
    .string()
    .required("Degree is required")
    .min(2, "Degree must be at least 2 characters"),
  major: yup
    .string()
    .required("Major is required")
    .min(2, "Major must be at least 2 characters"),
  graduationYear: yup
    .string()
    .required("Graduation year is required")
    .matches(/^\d{4}$/, "Must be a valid 4-digit year")
    .test("valid-year", "Year must be between 1950 and 2030", (value) => {
      if (!value) return false;
      const year = parseInt(value, 10);
      return year >= 1950 && year <= 2030;
    }),
});

export default function AddEducationModal({ visible, onClose, onAdd }: AddEducationModalProps) {
  const {
    control,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<EducationFormData>({
    resolver: yupResolver(educationSchema),
    defaultValues: {
      country: "",
      universityName: "",
      degree: "",
      major: "",
      graduationYear: "",
    },
  });

  const onSubmit = (data: EducationFormData) => {
    onAdd(data);
    reset();
    onClose();
  };

  const handleClose = () => {
    reset();
    onClose();
  };

  return (
    <Modal
      transparent
      animationType="slide"
      visible={visible}
      onRequestClose={handleClose}
    >
      <KeyboardAvoidingView 
        behavior={Platform.OS === "ios" ? "padding" : "height"}
        style={styles.overlay}
      >
        <TouchableOpacity 
          style={styles.backdrop} 
          activeOpacity={1} 
          onPress={handleClose}
        />
        
        <View style={styles.container}>
          {/* Handle Bar */}
          <View style={styles.handleBar} />
          
          <ScrollView 
            showsVerticalScrollIndicator={false}
            bounces={false}
            contentContainerStyle={styles.scrollContent}
          >
            <Text style={styles.title}>Add Education</Text>
            <Text style={styles.subtitle}>Fill in your educational background</Text>

            <View style={styles.formSection}>
              <Controller
                control={control}
                name="country"
                render={({ field: { onChange, onBlur, value } }) => (
                  <View style={styles.inputWrapper}>
                    <Text style={styles.label}>Country</Text>
                    <View style={[styles.inputContainer, errors.country && styles.inputContainerError]}>
                      <TextInput
                        placeholder="e.g. United States"
                        placeholderTextColor="#8A96A0"
                        style={styles.input}
                        onBlur={onBlur}
                        onChangeText={onChange}
                        value={value}
                      />
                    </View>
                    {errors.country && (
                      <Text style={styles.errorText}>⚠ {errors.country.message}</Text>
                    )}
                  </View>
                )}
              />

              <Controller
                control={control}
                name="universityName"
                render={({ field: { onChange, onBlur, value } }) => (
                  <View style={styles.inputWrapper}>
                    <Text style={styles.label}>University Name</Text>
                    <View style={[styles.inputContainer, errors.universityName && styles.inputContainerError]}>
                      <TextInput
                        placeholder="e.g. Stanford University"
                        placeholderTextColor="#8A96A0"
                        style={styles.input}
                        onBlur={onBlur}
                        onChangeText={onChange}
                        value={value}
                      />
                    </View>
                    {errors.universityName && (
                      <Text style={styles.errorText}>⚠ {errors.universityName.message}</Text>
                    )}
                  </View>
                )}
              />

              <View style={styles.row}>
                <Controller
                  control={control}
                  name="degree"
                  render={({ field: { onChange, onBlur, value } }) => (
                    <View style={[styles.inputWrapper, styles.halfWidth]}>
                      <Text style={styles.label}>Degree</Text>
                      <View style={[styles.inputContainer, errors.degree && styles.inputContainerError]}>
                        <TextInput
                          placeholder="e.g. Bachelor's"
                          placeholderTextColor="#8A96A0"
                          style={styles.input}
                          onBlur={onBlur}
                          onChangeText={onChange}
                          value={value}
                        />
                      </View>
                      {errors.degree && (
                        <Text style={styles.errorText}>⚠ {errors.degree.message}</Text>
                      )}
                    </View>
                  )}
                />

                <Controller
                  control={control}
                  name="major"
                  render={({ field: { onChange, onBlur, value } }) => (
                    <View style={[styles.inputWrapper, styles.halfWidth]}>
                      <Text style={styles.label}>Major</Text>
                      <View style={[styles.inputContainer, errors.major && styles.inputContainerError]}>
                        <TextInput
                          placeholder="e.g. Computer Science"
                          placeholderTextColor="#8A96A0"
                          style={styles.input}
                          onBlur={onBlur}
                          onChangeText={onChange}
                          value={value}
                        />
                      </View>
                      {errors.major && (
                        <Text style={styles.errorText}>⚠ {errors.major.message}</Text>
                      )}
                    </View>
                  )}
                />
              </View>

              <Controller
                control={control}
                name="graduationYear"
                render={({ field: { onChange, onBlur, value } }) => (
                  <View style={styles.inputWrapper}>
                    <Text style={styles.label}>Year of Graduation</Text>
                    <View style={[styles.inputContainer, errors.graduationYear && styles.inputContainerError]}>
                      <TextInput
                        placeholder="e.g. 2024"
                        placeholderTextColor="#8A96A0"
                        keyboardType="numeric"
                        maxLength={4}
                        style={styles.input}
                        onBlur={onBlur}
                        onChangeText={onChange}
                        value={value}
                      />
                    </View>
                    {errors.graduationYear && (
                      <Text style={styles.errorText}>⚠ {errors.graduationYear.message}</Text>
                    )}
                  </View>
                )}
              />
            </View>

            <TouchableOpacity 
              activeOpacity={0.8} 
              onPress={handleSubmit(onSubmit)}
              style={styles.buttonWrapper}
            >
              <LinearGradient 
                colors={["#15A9B2", "#17747A"]} 
                style={styles.button}
                start={{ x: 0, y: 0 }}
                end={{ x: 1, y: 0 }}
              >
                <Text style={styles.buttonText}>Add Education</Text>
              </LinearGradient>
            </TouchableOpacity>

            <TouchableOpacity style={styles.cancelBtn} onPress={handleClose}>
              <Text style={styles.cancelText}>Cancel</Text>
            </TouchableOpacity>
          </ScrollView>
        </View>
      </KeyboardAvoidingView>
    </Modal>
  );
}

const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    backgroundColor: "rgba(0, 0, 0, 0.6)",
    justifyContent: "flex-end",
  },
  backdrop: {
    flex: 1,
  },
  container: {
    backgroundColor: "#FFFFFF",
    borderTopLeftRadius: 30,
    borderTopRightRadius: 30,
    paddingHorizontal: 24,
    paddingBottom: Platform.OS === "ios" ? 40 : 24,
    maxHeight: "90%",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: -4 },
    shadowOpacity: 0.15,
    shadowRadius: 12,
    elevation: 20,
  },
  handleBar: {
    width: 40,
    height: 4,
    backgroundColor: "#E0E0E0",
    borderRadius: 2,
    alignSelf: "center",
    marginTop: 12,
    marginBottom: 20,
  },
  scrollContent: {
    paddingBottom: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: "700",
    color: "#043A53",
    marginBottom: 8,
    textAlign: "center",
  },
  subtitle: {
    fontSize: 14,
    color: "#6B7280",
    textAlign: "center",
    marginBottom: 24,
  },
  formSection: {
    gap: 16,
  },
  inputWrapper: {
    marginBottom: 4,
  },
  label: {
    fontSize: 14,
    fontWeight: "600",
    color: "#043A53",
    marginBottom: 8,
  },
  inputContainer: {
    borderWidth: 1.5,
    borderColor: "#D1D5DB",
    borderRadius: 12,
    backgroundColor: "#F9FAFB",
  },
  inputContainerError: {
    borderColor: "#FF3B30",
    backgroundColor: "#FFF5F5",
  },
  input: {
    paddingHorizontal: 16,
    paddingVertical: 14,
    fontSize: 15,
    color: "#043A53",
  },
  errorText: {
    color: "#FF3B30",
    fontSize: 12,
    marginTop: 6,
    marginLeft: 4,
  },
  row: {
    flexDirection: "row",
    gap: 12,
  },
  halfWidth: {
    flex: 1,
  },
  buttonWrapper: {
    marginTop: 24,
  },
  button: {
    paddingVertical: 16,
    borderRadius: 12,
    alignItems: "center",
    shadowColor: "#15A9B2",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 6,
  },
  buttonText: {
    color: "#FFFFFF",
    fontSize: 16,
    fontWeight: "700",
    letterSpacing: 0.5,
  },
  cancelBtn: {
    marginTop: 16,
    paddingVertical: 12,
    alignItems: "center",
  },
  cancelText: {
    color: "#6B7280",
    fontSize: 15,
    fontWeight: "600",
  },
});