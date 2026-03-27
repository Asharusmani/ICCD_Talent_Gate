import { Ionicons } from "@expo/vector-icons";
import { Stack, useRouter } from "expo-router";
import {
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useForm, Controller } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";

// Type for form data
interface DescriptionFormData {
  description: string;
}

// Validation schema
const schema = yup.object().shape({
  description: yup
    .string()
    .required("Description is required")
    .min(50, "Description must be at least 50 characters")
    .max(1000, "Description must not exceed 1000 characters")
    .trim(),
});

// Step type
interface Step {
  label: string;
  screen: string;
}

export default function DescriptionScreen() {
  const router = useRouter();

  const {
    control,
    handleSubmit,
    formState: { errors, isValid },
  } = useForm<DescriptionFormData>({
    resolver: yupResolver(schema),
    mode: "onChange",
    defaultValues: {
      description: "",
    },
  });

  const steps: Step[] = [
    { label: "Overview", screen: "/posted-gigs/add-gig/gig-overview" },
    { label: "Pricing", screen: "/posted-gigs/add-gig/gig-price" },
    { label: "Description", screen: "/posted-gigs/add-gig/gig-description" },
    { label: "Gallery", screen: "/posted-gigs/add-gig/gig-gallery" },
  ];

  const onSubmit = (data: DescriptionFormData) => {
    router.push("/posted-gigs/add-gig/gig-gallery");
  };

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: "#fff" }}>
      <KeyboardAvoidingView
        behavior={Platform.OS === "ios" ? "padding" : undefined}
        keyboardVerticalOffset={Platform.OS === "ios" ? 0 : 0}
        style={{ flex: 1 }}
      >
        <ScrollView
          contentContainerStyle={{ flexGrow: 1, paddingBottom: 30 }}
          keyboardShouldPersistTaps="handled"
        >
          <View style={styles.container}>

            {/* Card */}
            <View style={styles.card}>
              {/* Card Header */}
              <View style={styles.cardHeader}>
                <Text style={styles.cardHeaderText}>③ Description</Text>
              </View>

              {/* Description Input with Controller */}
              <View style={styles.inputContainer}>
                <Controller
                  control={control}
                  name="description"
                  render={({ field: { onChange, onBlur, value } }) => (
                    <TextInput
                      placeholder="Briefly Describe Your Gig"
                      multiline
                      style={[
                        styles.input,
                        styles.textArea,
                        errors.description && styles.inputError,
                      ]}
                      placeholderTextColor="#9F9F9F"
                      onBlur={onBlur}
                      onChangeText={onChange}
                      value={value}
                      textAlignVertical="top"
                    />
                  )}
                />
                {errors.description && (
                  <Text style={styles.errorText}>
                    {errors.description.message}
                  </Text>
                )}
              </View>

              <TouchableOpacity
                onPress={handleSubmit(onSubmit)}
                style={[styles.button, isValid && styles.buttonActive]}
                disabled={!isValid}
              >
                <Text style={styles.buttonText}>Submit</Text>
              </TouchableOpacity>
            </View>
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    padding: 16,
  },

  /* Back Button */
  backBtn: {
    width: 40,
    height: 40,
    borderRadius: 10,
    margin: 10,
    backgroundColor: "#17747A",
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 12,
    elevation: 2,
  },


  /* Steps */
  stepsRow: {
    marginTop: 10,
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 24,
  },
  stepItem: {
    alignItems: "center",
    flex: 1,
  },
  stepCircle: {
    width: 32,
    height: 32,
    borderRadius: 16,
    borderWidth: 2,
    borderColor: "#D1D5DB",
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#fff",
  },
  activeCircle: {
    backgroundColor: "#043A53",
    borderColor: "#043A53",
  },
  completedCircle: {
    backgroundColor: "#10B981",
    borderColor: "#10B981",
  },
  stepText: {
    fontSize: 14,
    color: "#9AA0A6",
    fontWeight: "600",
  },
  activeText: {
    color: "#fff",
    fontWeight: "700",
  },
  stepLabel: {
    fontSize: 11,
    color: "#9AA0A6",
    marginTop: 6,
    fontWeight: "500",
  },
  activeLabel: {
    color: "#043A53",
    fontWeight: "700",
  },

  /* Card */
  card: {
    backgroundColor: "#F8F9FB",
    borderRadius: 12,
    overflow: "hidden",
    elevation: 5,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
    paddingBottom: 20,
    marginTop: 20,
  },
  cardHeader: {
    backgroundColor: "#043A53",
    padding: 14,
  },
  cardHeaderText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "600",
  },

  /* Input Container */
  inputContainer: {
    marginHorizontal: 16,
    marginTop: 16,
  },

  /* Input */
  input: {
    backgroundColor: "#F8F9FB",
    borderRadius: 8,
    padding: 14,
    borderWidth: 1,
    borderColor: "#ddd",
    color: "#333",
    fontSize: 14,
  },
  textArea: {
    height: 300,
  },
  inputError: {
    borderColor: "#EF4444",
    borderWidth: 2,
  },

  /* Error Text */
  errorText: {
    color: "#EF4444",
    fontSize: 12,
    marginTop: 6,
    marginLeft: 4,
  },

  /* Button */
  button: {
    backgroundColor: "#043A53",
    padding: 14,
    borderRadius: 8,
    alignItems: "center",
    marginTop: 16,
    alignSelf: "flex-end",
    width: 120,
    marginHorizontal: 16,
    opacity: 0.6,
  },
  buttonActive: {
    opacity: 1,
  },
  buttonText: {
    color: "#fff",
    fontWeight: "600",
  },
});