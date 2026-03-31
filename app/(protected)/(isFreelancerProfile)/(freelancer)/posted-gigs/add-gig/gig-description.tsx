import { useRouter } from "expo-router";
import { Ionicons } from "@expo/vector-icons";
import {
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { useDispatch } from "react-redux";
import { useForm, Controller } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { setGig } from "@/store/slices/gig-detail-slice";
import { useAppDispatch } from "@/hooks/use-apply-project";
import { DescriptionSchema } from "@/components/schemas/schema";

interface DescriptionFormData {
  description: string;
}

// Step type
interface Step {
  label: string;
  screen: string;
}

export default function DescriptionScreen() {

  const router = useRouter();
  const dispatch = useDispatch()
  const insets = useSafeAreaInsets();

  const {
    control,
    handleSubmit,
    formState: { errors, isValid },
  } = useForm<DescriptionFormData>({
    resolver: yupResolver(DescriptionSchema),
    mode: "onChange",
    defaultValues: {
      description: "",
    },
  });

  const onSubmit = (data: DescriptionFormData) => {
    dispatch(setGig(data))
    router.push("/posted-gigs/add-gig/gig-gallery");
  };

  return (
    <LinearGradient
      colors={['#f0f9ff', '#e0f2fe', '#bae6fd', '#7dd3fc']}
      style={{ flex: 1 }}
      start={{ x: 0, y: 0 }}
      end={{ x: 0.6, y: 1 }}
    >
      <KeyboardAvoidingView
        behavior={Platform.OS === "ios" ? "padding" : undefined}
        keyboardVerticalOffset={Platform.OS === "ios" ? 0 : 0}
        style={{ flex: 1 }}
      >
        <ScrollView
          contentContainerStyle={{ flexGrow: 1, paddingBottom: 30, paddingTop: insets.top + 16 }}
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
                      placeholderTextColor="#94a3b8"
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
                <Ionicons name="arrow-forward" size={16} color="#fff" />
              </TouchableOpacity>
            </View>
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
    </LinearGradient>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
  },

  /* Back Button */
  backBtn: {
    width: 40,
    height: 40,
    borderRadius: 10,
    margin: 10,
    backgroundColor: '#0d9488',
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
    backgroundColor: '#0d9488',
    borderColor: '#0d9488',
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
    color: '#0d9488',
    fontWeight: "700",
  },

  /* Card */
  card: {
    backgroundColor: "#fff",
    borderRadius: 20,
    overflow: "hidden",
    elevation: 4,
    shadowColor: '#0d9488',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.10,
    shadowRadius: 12,
    paddingBottom: 20,
    marginTop: 20,
  },
  cardHeader: {
    backgroundColor: '#0d9488',
    padding: 16,
  },
  cardHeaderText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "700",
    letterSpacing: 0.3,
  },

  /* Input Container */
  inputContainer: {
    marginHorizontal: 16,
    marginTop: 16,
  },

  /* Input */
  input: {
    backgroundColor: '#f8fafc',
    borderRadius: 12,
    padding: 14,
    borderWidth: 1.5,
    borderColor: '#e2e8f0',
    color: '#1F2937',
    fontSize: 14,
  },
  textArea: {
    height: 300,
  },
  inputError: {
    borderColor: "#ef4444",
    borderWidth: 1.5,
  },

  /* Error Text */
  errorText: {
    color: "#ef4444",
    fontSize: 12,
    marginTop: 6,
    marginLeft: 4,
  },

  /* Button */
  button: {
    backgroundColor: '#0d9488',
    paddingVertical: 13,
    paddingHorizontal: 20,
    borderRadius: 12,
    alignItems: "center",
    justifyContent: 'center',
    flexDirection: 'row',
    gap: 6,
    marginTop: 16,
    alignSelf: "flex-end",
    marginHorizontal: 16,
    opacity: 0.45,
    elevation: 2,
    shadowColor: '#0d9488',
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.25,
    shadowRadius: 6,
  },
  buttonActive: {
    opacity: 1,
  },
  buttonText: {
    color: "#fff",
    fontWeight: "700",
    fontSize: 15,
  },
});