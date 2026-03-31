import { useState } from "react";
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
} from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import GigHeader from "@/components/header/gig-header";
import { setGig } from "@/store/slices/gig-detail-slice";
import { useAppDispatch } from "@/hooks/use-apply-project";
import { packageSchema } from "@/components/schemas/schema";
import PackageCard from "@/components/cards/gig-package-card";

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

export default function PricingScreen() {
  const router   = useRouter();
  const dispatch = useAppDispatch();
  const insets   = useSafeAreaInsets();
  const [expandedPackage, setExpandedPackage] = useState<"basic" | "standard" | "premium">("basic");

  const { control, handleSubmit, formState: { errors, isValid } } = useForm<PricingFormData>({
    resolver: yupResolver(packageSchema),
    mode: "onChange",
    defaultValues: {
      packages: {
        basic:    { packageType: "basic",    name: "", description: "", deliveryTime: "", revisions: "", concepts: "", price: "" },
        standard: { packageType: "standard", name: "", description: "", deliveryTime: "", revisions: "", concepts: "", price: "" },
        premium:  { packageType: "premium",  name: "", description: "", deliveryTime: "", revisions: "", concepts: "", price: "" },
      },
    },
  });

  const onSubmit = (data: PricingFormData) => {
    dispatch(setGig({ packages: JSON.stringify(data.packages) }));
    router.push('/posted-gigs/add-gig/gig-description');
  };

  const togglePackage = (packageName: "basic" | "standard" | "premium") => {
    setExpandedPackage(expandedPackage === packageName ? null : packageName);
  };

  return (
    <LinearGradient
      colors={['#f0f9ff', '#e0f2fe', '#bae6fd', '#7dd3fc']}
      style={styles.gradient}
      start={{ x: 0, y: 0 }}
      end={{ x: 0.6, y: 1 }}
    >
      <KeyboardAvoidingView behavior={Platform.OS === "ios" ? "padding" : undefined} style={{ flex: 1 }}>
        <ScrollView
          contentContainerStyle={[styles.scrollContent, { paddingTop: insets.top + 16 }]}
          showsVerticalScrollIndicator={false}
          keyboardShouldPersistTaps="handled"
        >
          <View style={styles.container}>
            <GigHeader title="Pricing" step="2" icon={<Ionicons name="document-text" size={24} color="#fff" />} />

            {(["basic", "standard", "premium"] as const).map((pkgKey) => (
              <PackageCard
                context="add-gigs"
                key={pkgKey}
                title={pkgKey.charAt(0).toUpperCase() + pkgKey.slice(1)}
                packageKey={pkgKey}
                control={control}
                errors={errors?.packages?.[pkgKey]}
                isExpanded={expandedPackage === pkgKey}
                onToggle={() => togglePackage(pkgKey)}
              />
            ))}

            <View style={styles.footerButtons}>
              <TouchableOpacity style={styles.backButton} onPress={() => router.back()}>
                <Ionicons name="arrow-back" size={20} color="#fff" />
                <Text style={styles.backText}>Back</Text>
              </TouchableOpacity>

              <TouchableOpacity
                style={[styles.continueButton, isValid && styles.continueButtonActive]}
                onPress={handleSubmit(onSubmit)}
                disabled={!isValid}
              >
                <Text style={styles.continueText}>Continue</Text>
                <Ionicons name="arrow-forward" size={20} color="#fff" />
              </TouchableOpacity>
            </View>
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
    </LinearGradient>
  );
}

const styles = StyleSheet.create({
  gradient: { flex: 1 },
  scrollContent: { flexGrow: 1, paddingBottom: 30 },
  container: { padding: 16 },
  footerButtons: { flexDirection: "row", justifyContent: "space-between", marginTop: 24, gap: 12 },
  backButton: {
    backgroundColor: "#6B7280",
    paddingVertical: 14,
    paddingHorizontal: 24,
    borderRadius: 10,
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
    flex: 1,
    justifyContent: "center",
  },
  backText: { color: "#fff", fontWeight: "700", fontSize: 16 },
  continueButton: {
    backgroundColor: "#0d9488",
    paddingVertical: 14,
    paddingHorizontal: 24,
    borderRadius: 10,
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
    flex: 1,
    justifyContent: "center",
    opacity: 0.5,
  },
  continueButtonActive: { opacity: 1 },
  continueText: { color: "#fff", fontWeight: "700", fontSize: 16 },
});