import { Ionicons } from "@expo/vector-icons";
import { useRouter, useLocalSearchParams } from "expo-router";
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
import { useEffect } from "react";
import services from "@/data/gig-services-data";
import SelectBox from "@/components/ui/select-box";
import { useGetSingleGigs } from "@/api/client/gigs";
import { useForm, Controller } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import GigHeader from "@/components/header/gig-header";
import { setGig } from "@/store/slices/gig-detail-slice";
import { useAppDispatch } from "@/hooks/use-apply-project";
import { SafeAreaView } from "react-native-safe-area-context";
import { GigOverviewschema } from "@/components/schemas/schema";

/* ================= TYPES ================= */
interface OverviewFormData {
  gigsTitle: string;
  category: string;
  subCategory: string;
}

/* ================= COMPONENT ================= */
export default function EditGigScreen() {

  const router = useRouter();
  const dispatch = useAppDispatch();
  const { id } = useLocalSearchParams();

  const { data: gigsData, isSuccess } = useGetSingleGigs(id);

  /* ================= FORM ================= */
  const {
    control,
    handleSubmit,
    watch,
    reset,
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

  /* ================= RESET FORM AFTER API ================= */
  useEffect(() => {
    if (isSuccess && Array.isArray(gigsData) && gigsData.length > 0) {
      const gig = gigsData[0]?.gigsDescription;
      reset({
        gigsTitle: gig?.gigsTitle || "",
        category: gig?.gigsCategory || "",
        subCategory: gig?.gigsSubcategory || "",
      });
    }
  }, [isSuccess, gigsData, reset]);

  /* ================= WATCH VALUES ================= */

  const gigsTitle = watch("gigsTitle") || "";
  const categoryValue = watch("category");
  const titleLength = gigsTitle.length;

  /* ================= CATEGORY OPTIONS ================= */
  const categoryOptions =
    services.categories?.map((item) => ({
      value: item.name,
      label: item.name,
    })) || [];

  const selectedCategory = services.categories?.find(
    (item) => item.name === categoryValue
  );

  const subCategoryOptions =
    selectedCategory?.subcategories?.map((item) => ({
      value: item.name,
      label: item.name,
    })) || [];

  /* ================= SUBMIT ================= */
  const onSubmit = (data: OverviewFormData) => {
    dispatch(setGig(data));
    // router.push(`/posted-gigs/${id}/edit-gig-gallery`);
    router.push(`/posted-gigs/${id}/edit-gig-price`);
    // router.push(`/posted-gigs/${id}/edit-gig-description`);
  };

  /* ================= UI ================= */
  return (
    <SafeAreaView style={styles.safeArea}>
      <KeyboardAvoidingView
        behavior={Platform.OS === "ios" ? "padding" : undefined}
        style={{ flex: 1 }}
      >
        <ScrollView
          contentContainerStyle={styles.scrollContent}
          keyboardShouldPersistTaps="handled"
          showsVerticalScrollIndicator={false}
        >
          <View style={styles.container}>
            <View style={styles.card}>
              <GigHeader
                title="Overview"
                step="1"
                icon={<Ionicons name="document-text" size={24} color="#fff" />}
              />

              <View style={styles.cardBody}>
                {/* ================= GIG TITLE ================= */}
                <View style={styles.inputGroup}>
                  <View style={styles.labelRow}>
                    <Text style={styles.label}>Gig Title *</Text>
                    <Text
                      style={[
                        styles.charCount,
                        titleLength > 80 && styles.charCountError,
                      ]}
                    >
                      {titleLength}/80
                    </Text>
                  </View>

                  <Controller
                    control={control}
                    name="gigsTitle"
                    render={({ field: { onChange, onBlur, value } }) => (
                      <TextInput
                        value={value}
                        onChangeText={onChange}
                        onBlur={onBlur}
                        placeholder="I will design a professional logo for your business"
                        placeholderTextColor="#9CA3AF"
                        multiline
                        textAlignVertical="top"
                        style={[
                          styles.input,
                          styles.textArea,
                          errors.gigsTitle && styles.inputError,
                        ]}
                      />
                    )}
                  />

                  {errors.gigsTitle && (
                    <Text style={styles.errorTextSmall}>
                      {errors.gigsTitle.message}
                    </Text>
                  )}
                </View>

                {/* ================= CATEGORY ================= */}
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
                            options={categoryOptions}
                            onValueChange={(val) => {
                              onChange(val);
                              // reset subCategory when category changes
                              reset((prev) => ({
                                ...prev,
                                subCategory: "",
                              }));
                            }}
                            required
                            placeholder="Select a category"
                          />
                          {errors.category && (
                            <Text style={styles.errorTextSmall}>
                              {errors.category.message}
                            </Text>
                          )}
                        </>
                      )}
                    />
                  </View>

                  {/* ================= SUB CATEGORY ================= */}
                  {categoryValue ? (
                    <View style={styles.halfWidth}>
                      <Controller
                        control={control}
                        name="subCategory"
                        render={({ field: { onChange, value } }) => (
                          <>
                            <SelectBox
                              label="Sub Category"
                              selectedValue={value}
                              options={subCategoryOptions}
                              onValueChange={onChange}
                              required
                              placeholder="Select sub category"
                            />
                            {errors.subCategory && (
                              <Text style={styles.errorTextSmall}>
                                {errors.subCategory.message}
                              </Text>
                            )}
                          </>
                        )}
                      />
                    </View>
                  ) : null}
                </View>

                {/* ================= SUBMIT ================= */}
                <TouchableOpacity
                  style={[styles.button, isValid && styles.buttonActive]}
                  onPress={handleSubmit(onSubmit)}
                  disabled={!isValid}
                >
                  <Text style={styles.buttonText}>Save & Continue</Text>
                  <Ionicons name="arrow-forward" size={20} color="#fff" />
                </TouchableOpacity>
              </View>
            </View>
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}

/* ================= STYLES ================= */
const styles = StyleSheet.create({
  safeArea: { flex: 1, backgroundColor: '#F4F4F4' },
  scrollContent: { flexGrow: 1, paddingBottom: 30 },
  container: { flex: 1, padding: 16 },
  card: {
    backgroundColor: "#fff",
    borderRadius: 16,
    overflow: "hidden",
    elevation: 4,
  },
  cardBody: { padding: 20 },
  inputGroup: { marginBottom: 20 },
  labelRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 8,
  },
  label: { fontSize: 14, fontWeight: "600" },
  charCount: { fontSize: 12, color: "#6B7280" },
  charCountError: { color: "#EF4444" },
  input: {
    backgroundColor: "#F9FAFB",
    borderRadius: 10,
    padding: 14,
    borderWidth: 1,
    borderColor: "#E5E7EB",
  },
  textArea: { height: 100 },
  inputError: { borderColor: "#EF4444", borderWidth: 2 },
  rowInputs: { gap: 12, marginBottom: 24 },
  halfWidth: { flex: 1 },
  errorTextSmall: {
    color: "#EF4444",
    fontSize: 11,
    marginTop: 4,
  },
  button: {
    backgroundColor: "#043A53",
    padding: 16,
    borderRadius: 10,
    flexDirection: "row",
    justifyContent: "center",
    gap: 8,
    opacity: 0.5,
  },
  buttonActive: { opacity: 1 },
  buttonText: { color: "#fff", fontWeight: "700", fontSize: 16 },
});
