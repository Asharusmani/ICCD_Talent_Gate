import { Ionicons } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import { useState } from "react";
import {
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
  Alert,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useForm, Controller } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import GigHeader from "@/components/header/gig-header";
import services from "@/data/gig-services-data";

/* TYPES */
interface PackageData {
  package_type: "basic" | "standard" | "premium";
  name: string;
  description: string;
  delivery_time: string;
  revisions: string;
  concepts: string;
  price: string;
  color_palette: boolean;
  logo_usage: boolean;
  typography: boolean;
  "3d_logo": boolean;
  mascot_logo: boolean;
  minimalist_logo: boolean;
  signature_logo: boolean;
  vintage_logo: boolean;
}

interface PricingFormData {
  packages: {
    basic: PackageData;
    standard: PackageData;
    premium: PackageData;
  };
}

interface Step {
  label: string;
  screen: string;
}

const packageSchema = yup.object().shape({
  name: yup.string().required("Package name is required").min(3),
  description: yup.string().required("Description is required").min(20),
  delivery_time: yup.string().required("Delivery time required").matches(/^\d+$/),
  revisions: yup.string().required("Revisions required").matches(/^\d+$/),
  concepts: yup.string().required("Concepts required"),
  price: yup.string().required("Price required").matches(/^\d+(\.\d{1,2})?$/),
  color_palette: yup.boolean(),
  logo_usage: yup.boolean(),
  typography: yup.boolean(),
  "3d_logo": yup.boolean(),
  mascot_logo: yup.boolean(),
  minimalist_logo: yup.boolean(),
  signature_logo: yup.boolean(),
  vintage_logo: yup.boolean(),
});

const schema = yup.object().shape({
  packages: yup.object().shape({
    basic: packageSchema,
    standard: packageSchema,
    premium: packageSchema,
  }),
});

/* MAIN COMPONENT */
export default function PricingScreen() {
  const router = useRouter();
  const [expandedPackage, setExpandedPackage] = useState<"basic" | "standard" | "premium">("basic");

  const { control, handleSubmit, formState: { errors, isValid } } = useForm<PricingFormData>({
    resolver: yupResolver(schema),
    mode: "onChange",
    defaultValues: {
      packages: {
        basic: {
          package_type: "basic",
          name: "",
          description: "",
          delivery_time: "",
          revisions: "",
          concepts: "",
          price: "",
          color_palette: false,
          logo_usage: false,
          typography: false,
          "3d_logo": false,
          mascot_logo: false,
          minimalist_logo: false,
          signature_logo: false,
          vintage_logo: false,
        },
        standard: { package_type: "standard", name: "", description: "", delivery_time: "", revisions: "", concepts: "", price: "", color_palette: false, logo_usage: false, typography: false, "3d_logo": false, mascot_logo: false, minimalist_logo: false, signature_logo: false, vintage_logo: false },
        premium: { package_type: "premium", name: "", description: "", delivery_time: "", revisions: "", concepts: "", price: "", color_palette: false, logo_usage: false, typography: false, "3d_logo": false, mascot_logo: false, minimalist_logo: false, signature_logo: false, vintage_logo: false },
      },
    },
  });

  const onSubmit = (data: PricingFormData) => {
    console.log("Pricing Data:", data);
    Alert.alert("Success!", "Pricing packages saved successfully!", [
      { text: "Continue", onPress: () => router.push("/posted-gigs/add-gig/gig-description") },
    ]);
  };

  const togglePackage = (packageName: "basic" | "standard" | "premium") => {
    setExpandedPackage(expandedPackage === packageName ? null : packageName);
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <KeyboardAvoidingView behavior={Platform.OS === "ios" ? "padding" : undefined} style={{ flex: 1 }}>
        <ScrollView contentContainerStyle={styles.scrollContent} showsVerticalScrollIndicator={false} keyboardShouldPersistTaps="handled">
          <View style={styles.container}>
            {/* Header */}
            <GigHeader title="Pricing" step="2" icon={<Ionicons name="document-text" size={24} color="#fff" />} />
            {/* Package Cards */}
            {(["basic", "standard", "premium"] as const).map((pkgKey) => (
              <PackageCard
                key={pkgKey}
                title={pkgKey.charAt(0).toUpperCase() + pkgKey.slice(1)}
                packageKey={pkgKey}
                control={control}
                errors={errors?.packages?.[pkgKey]}
                isExpanded={expandedPackage === pkgKey}
                onToggle={() => togglePackage(pkgKey)}
              />
            ))}

            {/* Footer Buttons */}
            <View style={styles.footerButtons}>
              <TouchableOpacity style={styles.backButton} onPress={() => router.back()}>
                <Ionicons name="arrow-back" size={20} color="#fff" />
                <Text style={styles.backText}>Back</Text>
              </TouchableOpacity>

              <TouchableOpacity style={[styles.continueButton, isValid && styles.continueButtonActive]} onPress={handleSubmit(onSubmit)} disabled={!isValid}>
                <Text style={styles.continueText}>Continue</Text>
                <Ionicons name="arrow-forward" size={20} color="#fff" />
              </TouchableOpacity>
            </View>
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}

/* PACKAGE CARD COMPONENT */
interface PackageCardProps {
  title: string;
  packageKey: "basic" | "standard" | "premium";
  control: any;
  errors: any;
  isExpanded: boolean;
  onToggle: () => void;
}

function PackageCard({ title, packageKey, control, errors, isExpanded, onToggle }: PackageCardProps) {
  
  console.log("services: ", services)
    // const features = services.categories.filter(item => item.name === gigs_details.category)[0]?.
    // subcategories?.filter(item => item.name === gigs_details.subCategory)[0]?.services
  
  const logoFields: { label: string; key: keyof PackageData }[] = [
    { label: "3D Logo", key: "3d_logo" },
    { label: "Mascot Logo", key: "mascot_logo" },
    { label: "Minimalist Logo", key: "minimalist_logo" },
    { label: "Signature Logo", key: "signature_logo" },
    { label: "Vintage Logo", key: "vintage_logo" },
  ];

  return (
    <View style={styles.card}>
      <TouchableOpacity style={[styles.cardHeader, { borderLeftColor: "s" }]} onPress={onToggle}>
        <Text style={styles.cardHeaderText}>{title}</Text>
        <Ionicons name={isExpanded ? "chevron-up" : "chevron-down"} size={24} color="#043A53" />
      </TouchableOpacity>

      {isExpanded && (
        <View style={styles.cardBody}>
          {/* Inputs */}
          {["name", "description", "delivery time", "revisions", "concepts", "price"].map((field) => (
            <View key={field} style={styles.inputGroup}>
              <Text style={styles.label}>{field.replace("_", " ").charAt(0).toUpperCase() + field.slice(1)} *</Text>
              <Controller
                control={control}
                name={`packages.${packageKey}.${field}` as any}
                render={({ field: { onChange, onBlur, value } }) => (
                  <TextInput
                    style={[styles.input, errors?.[field] && styles.inputError, field === "description" && styles.textArea]}
                    placeholder={`Enter ${field}`}
                    placeholderTextColor="#9CA3AF"
                    multiline={field === "description"}
                    textAlignVertical={field === "description" ? "top" : "auto"}
                    keyboardType={["delivery_time", "revisions", "price", "concepts"].includes(field) ? "numeric" : "default"}
                    onBlur={onBlur}
                    onChangeText={onChange}
                    value={value}
                  />
                )}
              />
              {errors?.[field] && <Text style={styles.errorText}>{errors[field]?.message}</Text>}
            </View>
          ))}

          {/* Checkboxes */}
          <View style={styles.featuresSection}>
            <Text style={styles.featuresTitle}>Features</Text>
            <Controller
              control={control}
              name={`packages.${packageKey}.color_palette` as any}
              render={({ field: { onChange, value } }) => <CheckBox label="Color Palette" value={value} onValueChange={onChange} />}
            />
            <Controller
              control={control}
              name={`packages.${packageKey}.typography` as any}
              render={({ field: { onChange, value } }) => <CheckBox label="Typography Guide" value={value} onValueChange={onChange} />}
            />
            {logoFields.map((logo) => (
              <Controller
                key={logo.key}
                control={control}
                name={`packages.${packageKey}.${logo.key}` as any}
                render={({ field: { onChange, value } }) => (
                  <CheckBox label={logo.label} value={value} onValueChange={(val) => {
                    onChange(val);
                  }} />
                )}
              />
            ))}
          </View>
        </View>
      )}
    </View>
  );
}

/* CHECKBOX COMPONENT */
interface CheckBoxProps {
  label: string;
  value: boolean;
  onValueChange: (value: boolean) => void;
}

function CheckBox({ label, value, onValueChange }: CheckBoxProps) {
  return (
    <TouchableOpacity style={styles.checkItem} onPress={() => onValueChange(!value)} activeOpacity={0.7}>
      <View style={[styles.checkbox, value && styles.checkedBox]}>
        {value && <Ionicons name="checkmark" size={16} color="#fff" />}
      </View>
      <Text style={styles.checkboxLabel}>{label}</Text>
    </TouchableOpacity>
  );
}

/* STYLES */
const styles = StyleSheet.create({
  safeArea: { flex: 1, backgroundColor: "#F8F9FB" },
  scrollContent: { flexGrow: 1, paddingBottom: 30 },
  container: { padding: 16 },
  stepsRow: { marginTop: 10, flexDirection: "row", justifyContent: "space-between", marginBottom: 20 },
  stepItem: { alignItems: "center", flex: 1 },
  stepCircle: { width: 32, height: 32, borderRadius: 16, borderWidth: 2, borderColor: "#D1D5DB", justifyContent: "center", alignItems: "center", backgroundColor: "#fff" },
  activeCircle: { backgroundColor: "#043A53", borderColor: "#043A53" },
  completedCircle: { backgroundColor: "#10B981", borderColor: "#10B981" },
  stepText: { fontSize: 14, color: "#9AA0A6", fontWeight: "600" },
  activeText: { color: "#fff", fontWeight: "700" },
  stepLabel: { fontSize: 11, color: "#9AA0A6", marginTop: 6, fontWeight: "500" },
  activeLabel: { color: "#043A53", fontWeight: "700" },
  card: { backgroundColor: "#fff", borderRadius: 12, marginBottom: 16, overflow: "hidden", elevation: 2, shadowColor: "#000", shadowOffset: { width: 0, height: 1 }, shadowOpacity: 0.1, shadowRadius: 3 },
  cardHeader: { backgroundColor: "#fff", padding: 16, flexDirection: "row", justifyContent: "space-between", alignItems: "center", borderLeftWidth: 4 },
  cardHeaderText: { color: "#1F2937", fontSize: 18, fontWeight: "700" },
  cardBody: { padding: 16, backgroundColor: "#F9FAFB" },
  inputGroup: { marginBottom: 16 },
  label: { fontSize: 14, fontWeight: "600", color: "#374151", marginBottom: 8 },
  input: { backgroundColor: "#fff", borderRadius: 8, padding: 14, borderWidth: 1, borderColor: "#D1D5DB", fontSize: 14, color: "#1F2937" },
  inputError: { borderColor: "#EF4444", borderWidth: 2 },
  textArea: { height: 100, textAlignVertical: "top" },
  errorText: { color: "#EF4444", fontSize: 12, marginTop: 4 },
  rowInputs: { flexDirection: "row", gap: 12 },
  halfWidth: { flex: 1 },
  featuresSection: { marginTop: 8 },
  featuresTitle: { fontSize: 14, fontWeight: "600", color: "#374151", marginBottom: 12 },
  checkItem: { flexDirection: "row", alignItems: "center", marginBottom: 8 },
  checkbox: { width: 24, height: 24, borderWidth: 2, borderColor: "#D1D5DB", borderRadius: 6, marginRight: 10, justifyContent: "center", alignItems: "center", backgroundColor: "#fff" },
  checkedBox: { backgroundColor: "#043A53", borderColor: "#043A53" },
  checkboxLabel: { fontSize: 14, color: "#374151", fontWeight: "500" },
  footerButtons: { flexDirection: "row", justifyContent: "space-between", marginTop: 24, gap: 12 },
  backButton: { backgroundColor: "#6B7280", paddingVertical: 14, paddingHorizontal: 24, borderRadius: 10, flexDirection: "row", alignItems: "center", gap: 8, flex: 1, justifyContent: "center" },
  backText: { color: "#fff", fontWeight: "700", fontSize: 16 },
  continueButton: { backgroundColor: "#043A53", paddingVertical: 14, paddingHorizontal: 24, borderRadius: 10, flexDirection: "row", alignItems: "center", gap: 8, flex: 1, justifyContent: "center", opacity: 0.5 },
  continueButtonActive: { opacity: 1 },
  continueText: { color: "#fff", fontWeight: "700", fontSize: 16 },
  headerContent: {
    flexDirection: "row",
    alignItems: "center",
    gap: 10,
  },
  badge: {
    backgroundColor: "rgba(255, 255, 255, 0.2)",
    paddingHorizontal: 12,
    paddingVertical: 4,
    borderRadius: 12,
  },
  badgeText: {
    color: "#fff",
    fontSize: 12,
    fontWeight: "600",
  },
});
