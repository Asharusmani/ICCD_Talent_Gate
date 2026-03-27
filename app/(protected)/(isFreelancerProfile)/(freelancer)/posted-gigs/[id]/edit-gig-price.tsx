import { useRouter } from "expo-router";
import { useEffect, useState } from "react";
import { Ionicons } from "@expo/vector-icons";
import {
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { useForm } from "react-hook-form";
import services from "@/data/gig-services-data";
import { useLocalSearchParams } from "expo-router";
import { yupResolver } from "@hookform/resolvers/yup";
import GigHeader from "@/components/header/gig-header";
import { setGig } from "@/store/slices/gig-detail-slice";
import { useAppDispatch } from "@/hooks/use-apply-project";
import { packageSchema } from "@/components/schemas/schema";
import { SafeAreaView } from "react-native-safe-area-context";
import PackageCard from "@/components/cards/gig-package-card";
import { useEditGigs, useGetGigsPackages } from "@/api/client/gigs";
interface PackageData {
  packageType: "basic" | "standard" | "premium";
  name: string;
  description: string;
  deliveryTime: string;
  revisions: string;
  concepts: string;
  price: string;
}
interface PricingFormData {
  packages: {
    basic: PackageData;
    standard: PackageData;
    premium: PackageData;
  };
}

/* DATA */

const packageTypes = ['Basic', 'Standard', 'Premium'];

const deliveryOptions = [
  { value: '1', label: '1 Day' },
  { value: '3', label: '3 Days' },
  { value: '7', label: '7 Days' },
];

const revisionsOptions = [
  { value: '1', label: '1 Revision' },
  { value: '3', label: '3 Revisions' },
  { value: 'Unlimited', label: 'Unlimited' },
];

const conceptsOptions = [
  { value: '1', label: '1 Concept' },
  { value: '2', label: '2 Concepts' },
  { value: '3', label: '3 Concepts' },
];

/* MAIN COMPONENT */
export default function EditPricingScreen() {

  const router = useRouter();
  const dispatch = useAppDispatch()
  const { id } = useLocalSearchParams()
  const { editGigs, isPending: editGigIsPend } = useEditGigs(id, 'json');
  const { gigsPackages, isLoading: packageIsLoad } = useGetGigsPackages(id)
  const [expandedPackage, setExpandedPackage] = useState<"basic" | "standard" | "premium">("basic");

  const { control, handleSubmit, reset, formState: { errors, isValid } } = useForm<PricingFormData>({
    resolver: yupResolver(packageSchema),
    mode: "onChange",
    defaultValues: {
      packages: {
        basic: { packageType: "basic", name: "", description: "", deliveryTime: "", revisions: "", concepts: "", price: "" },
        standard: { packageType: "standard", name: "", description: "", deliveryTime: "", revisions: "", concepts: "", price: "" },
        premium: { packageType: "premium", name: "", description: "", deliveryTime: "", revisions: "", concepts: "", price: "" },
      },
    },
  });

  const onSubmit = (data: PricingFormData) => {
    dispatch(setGig({ packages: JSON.stringify(data.packages) }))
    router.push(`/posted-gigs/${id}/edit-gig-description`)
  };

  const togglePackage = (packageName: "basic" | "standard" | "premium") => {
    setExpandedPackage(expandedPackage === packageName ? null : packageName);
  };

  useEffect(() => {
    if (!gigsPackages) return;
    const format = gigsPackages.reduce((acc, item) => {
      const { packages, ...rest } = item
      const parsedPkg = JSON.parse(packages);
      acc[item.packageType] = { ...rest, ...parsedPkg };
      return acc;
    }, {});
    reset({ packages: format })
  }, [gigsPackages]);

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
                context="edit-gigs"
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

/* STYLES */
const styles = StyleSheet.create({
  safeArea: { flex: 1, backgroundColor: '#F4F4F4' },
  scrollContent: { flexGrow: 1, paddingBottom: 30 },
  container: { padding: 16 },
  footerButtons: { flexDirection: "row", justifyContent: "space-between", marginTop: 24, gap: 12 },
  backButton: { backgroundColor: "#6B7280", paddingVertical: 14, paddingHorizontal: 24, borderRadius: 10, flexDirection: "row", alignItems: "center", gap: 8, flex: 1, justifyContent: "center" },
  backText: { color: "#fff", fontWeight: "700", fontSize: 16 },
  continueButton: { backgroundColor: "#043A53", paddingVertical: 14, paddingHorizontal: 24, borderRadius: 10, flexDirection: "row", alignItems: "center", gap: 8, flex: 1, justifyContent: "center", opacity: 0.5 },
  continueButtonActive: { opacity: 1 },
  continueText: { color: "#fff", fontWeight: "700", fontSize: 16 },
});
