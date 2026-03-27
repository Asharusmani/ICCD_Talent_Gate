import { useAppSelector } from "@/hooks/use-apply-project";
import services from "@/data/gig-services-data";
import { View, TouchableOpacity, Text, TextInput, StyleSheet } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import CheckBox from "../ui/check-box";
import { Controller } from "react-hook-form";

interface PackageCardProps {
    context: string;
    title: string;
    packageKey: "basic" | "standard" | "premium";
    control: any;
    errors: any;
    isExpanded: boolean;
    onToggle: () => void;
}

function PackageCard({ context, title, packageKey, control, errors, isExpanded, onToggle }: PackageCardProps) {

    const isEdit = context === 'edit-gigs'
    const gigs_details = useAppSelector(state => state.gig.gig)
    const features = services?.categories?.filter(item => item.name === gigs_details.category)[0]?.
        subcategories?.filter(item => item.name === gigs_details.subCategory)[0]?.services

    return (
        <View style={styles.card}>
            <TouchableOpacity style={[styles.cardHeader, { borderLeftColor: "#043A53" }]} onPress={onToggle}>
                <Text style={styles.cardHeaderText}>{title}</Text>
                <Ionicons name={isExpanded ? "chevron-up" : "chevron-down"} size={24} color="#043A53" />
            </TouchableOpacity>

            {isExpanded && (
                <View style={styles.cardBody}>
                    {/* Inputs */}
                    {["name", "description", "deliveryTime", "revisions", "concepts", "price"].map((field) => (
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
                        {features?.map((item, index) => (
                            <Controller
                                key={index}
                                control={control}
                                name={`packages.${packageKey}.${item}` as any}
                                render={({ field: { onChange, value } }) => (
                                    <CheckBox label={item} value={isEdit ? value : false} onValueChange={(val) => {
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

export default PackageCard

const styles = StyleSheet.create({
    featuresSection: { marginTop: 8 },
    featuresTitle: { fontSize: 14, fontWeight: "600", color: "#374151", marginBottom: 12 },
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
});