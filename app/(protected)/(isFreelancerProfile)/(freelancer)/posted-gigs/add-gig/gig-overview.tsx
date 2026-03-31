import { useRouter } from "expo-router";
import { Ionicons } from "@expo/vector-icons";
import {
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  TextInput,
} from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import services from "@/data/gig-services-data";
import SelectBox from '@/components/ui/select-box';
import { yupResolver } from "@hookform/resolvers/yup";
import { useForm, Controller } from "react-hook-form";
import GigHeader from "@/components/header/gig-header";
import { setGig } from "@/store/slices/gig-detail-slice";
import { useAppDispatch } from "@/hooks/use-apply-project";
import { GigOverviewschema } from "@/components/schemas/schema";

interface OverviewFormData {
  gigsTitle: string;
  category: string;
  subCategory: string;
}

export default function AddGigScreen() {
  const router   = useRouter();
  const dispatch = useAppDispatch();
  const insets   = useSafeAreaInsets();

  const {
    control,
    handleSubmit,
    watch,
    formState: { errors, isValid },
  } = useForm<OverviewFormData>({
    resolver: yupResolver(GigOverviewschema),
    mode: "onChange",
    defaultValues: {
      gigsTitle: "",
      category: "",
      subCategory: "",
    },
  });

  const gigsTitle       = watch("gigsTitle");
  const titleLength     = gigsTitle.length;
  const categoryValue   = watch("category");
  const categoryOptions = services.categories?.map((item) => ({ value: item.name, label: item.name }));
  const filterCategory  = services.categories?.filter((item) => item.name === categoryValue);
  const subCategoryOptions = filterCategory[0]?.subcategories?.map((item) => ({ value: item.name, label: item.name }));

  const onSubmit = (data: OverviewFormData) => {
    dispatch(setGig(data));
    router.push('/posted-gigs/add-gig/gig-price');
  };

  return (
    <LinearGradient
      colors={['#f0f9ff', '#e0f2fe', '#bae6fd', '#7dd3fc']}
      style={styles.gradient}
      start={{ x: 0, y: 0 }}
      end={{ x: 0.6, y: 1 }}
    >
      <KeyboardAvoidingView
        behavior={Platform.OS === "ios" ? "padding" : undefined}
        style={{ flex: 1 }}
      >
        <ScrollView
          contentContainerStyle={[styles.scrollContent, { paddingTop: insets.top + 16 }]}
          keyboardShouldPersistTaps="handled"
          showsVerticalScrollIndicator={false}
        >
          <View style={styles.container}>

            {/* Main Card */}
            <View style={styles.card}>
              <GigHeader
                title="Overview"
                step="1"
                icon={<Ionicons name="document-text" size={24} color="#fff" />}
              />

              <View style={styles.cardBody}>
                {/* Gig Title */}
                <View style={styles.inputGroup}>
                  <View style={styles.labelRow}>
                    <Text style={styles.label}>Gig Title *</Text>
                    <Text style={[styles.charCount, titleLength > 80 && styles.charCountError]}>
                      {titleLength}/80
                    </Text>
                  </View>
                  <Controller
                    control={control}
                    name="gigsTitle"
                    render={({ field: { onChange, onBlur, value } }) => (
                      <TextInput
                        placeholder="I will design a professional logo for your business"
                        style={[styles.input, styles.textArea, errors.gigsTitle && styles.inputError]}
                        placeholderTextColor="#9CA3AF"
                        value={value}
                        onBlur={onBlur}
                        onChangeText={onChange}
                        multiline
                        textAlignVertical="top"
                      />
                    )}
                  />
                  {errors.gigsTitle && (
                    <Text style={styles.errorTextSmall}>{errors.gigsTitle.message}</Text>
                  )}
                </View>

                {/* Category & subCategory */}
                <View style={styles.rowInputs}>
                  <View style={styles.halfWidth}>
                    <Controller
                      control={control}
                      name="category"
                      render={({ field: { onChange, value } }) => (
                        <>
                          <SelectBox
                            label="Category"
                            selectedValue={value}
                            onValueChange={onChange}
                            options={categoryOptions}
                            required
                            placeholder="Select a category"
                          />
                          {errors.category && (
                            <Text style={styles.errorTextSmall}>{errors.category.message}</Text>
                          )}
                        </>
                      )}
                    />
                  </View>

                  {categoryValue && (
                    <View style={styles.halfWidth}>
                      <Controller
                        control={control}
                        name="subCategory"
                        render={({ field: { onChange, value } }) => (
                          <>
                            <SelectBox
                              label="Sub Category"
                              selectedValue={value}
                              onValueChange={onChange}
                              options={subCategoryOptions}
                              required
                              placeholder="Select Sub Category"
                            />
                            {errors.subCategory && (
                              <Text style={styles.errorTextSmall}>{errors.subCategory.message}</Text>
                            )}
                          </>
                        )}
                      />
                    </View>
                  )}
                </View>

                {/* Save & Continue */}
                <TouchableOpacity
                  style={[styles.button, isValid && styles.buttonActive]}
                  onPress={handleSubmit(onSubmit)}
                  disabled={!isValid}
                  activeOpacity={0.8}
                >
                  <Text style={styles.buttonText}>Save & Continue</Text>
                  <Ionicons name="arrow-forward" size={20} color="#fff" />
                </TouchableOpacity>
              </View>
            </View>

          </View>
        </ScrollView>
      </KeyboardAvoidingView>
    </LinearGradient>
  );
}

const styles = StyleSheet.create({
  gradient: {
    flex: 1,
  },
  scrollContent: {
    flexGrow: 1,
    paddingBottom: 30,
  },
  container: {
    flex: 1,
    padding: 16,
  },

  /* Card */
  card: {
    backgroundColor: "#fff",
    borderRadius: 16,
    overflow: "hidden",
    elevation: 4,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
  },
  cardBody: {
    padding: 20,
  },

  /* Input Groups */
  inputGroup: {
    marginBottom: 20,
  },
  labelRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 8,
  },
  label: {
    fontSize: 14,
    fontWeight: "600",
    color: "#374151",
  },
  charCount: {
    fontSize: 12,
    color: "#6B7280",
  },
  charCountError: {
    color: "#EF4444",
    fontWeight: "600",
  },
  input: {
    backgroundColor: "#F9FAFB",
    borderRadius: 10,
    padding: 14,
    borderWidth: 1,
    borderColor: "#E5E7EB",
    fontSize: 14,
    color: "#1F2937",
  },
  textArea: {
    height: 100,
    textAlignVertical: "top",
  },
  inputError: {
    borderColor: "#EF4444",
    borderWidth: 2,
  },
  errorTextSmall: {
    color: "#EF4444",
    fontSize: 11,
    marginTop: 4,
  },

  /* Row Inputs */
  rowInputs: {
    gap: 12,
    marginBottom: 24,
  },
  halfWidth: {
    flex: 1,
  },

  /* Button */
  button: {
    backgroundColor: "#0d9488",
    padding: 16,
    borderRadius: 10,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    gap: 8,
    opacity: 0.5,
    elevation: 2,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.2,
    shadowRadius: 2,
  },
  buttonActive: {
    opacity: 1,
  },
  buttonText: {
    color: "#fff",
    fontWeight: "700",
    fontSize: 16,
  },
});