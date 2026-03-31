import { Ionicons } from "@expo/vector-icons";
import { LinearGradient } from "expo-linear-gradient";
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
import { Controller, useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { useHeaderHeight } from "@react-navigation/elements";

import AddSkillModal from "../modal/add-skill-modal";
import AddEducationModal from "../modal/add-education-modal";
import AddCertificationModal from "../modal/add-certification-modal";

interface Education {
  id: string;
  country: string;
  universityName: string;
  degree: string;
  major: string;
  graduationYear: string;
}

interface Certification {
  id: string;
  certificationName: string;
  issuedBy: string;
}

interface ProfileFormData {
  name: string;
  description: string;
}

const profileSchema = yup.object().shape({
  name: yup.string().required("Name is required").min(2).max(50),
  description: yup.string().required("Description is required").min(10).max(500),
});

// ─── Banner Header (same as Order Screen) ────────────────────────────────────
function BannerHeader() {
  return (
    <View style={styles.bannerWrapper}>
      <LinearGradient
        colors={["#0a4f54", "#0d7c85", "#15A9B2"]}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 1 }}
        style={styles.bannerGradient}
      >
        {/* Decorative circles */}
        <View style={styles.decorCircleLarge} />
        <View style={styles.decorCircleSmall} />

        <View style={styles.bannerCard}>
          <LinearGradient
            colors={["#ffffff22", "#ffffff44"]}
            style={styles.bannerIconGradient}
          >
            <Ionicons name="person-outline" size={22} color="#fff" />
          </LinearGradient>
          <View style={styles.bannerTextBlock}>
            <Text style={styles.bannerTitle}>Edit Profile</Text>
            <View style={styles.bannerDivider} />
            <Text style={styles.bannerSubtitle}>
              Update your personal info, skills, education & certifications.
            </Text>
          </View>
        </View>

        <View style={styles.bannerTagRow}>
          <View style={styles.bannerTag}>
            <View style={[styles.bannerTagDot, { backgroundColor: "#4ade80" }]} />
            <Text style={styles.bannerTagText}>Personal Info</Text>
          </View>
          <View style={styles.bannerTag}>
            <View style={[styles.bannerTagDot, { backgroundColor: "#facc15" }]} />
            <Text style={styles.bannerTagText}>Skills & Education</Text>
          </View>
        </View>
      </LinearGradient>
    </View>
  );
}

// ─── Section Header ───────────────────────────────────────────────────────────
function SectionHeader({ icon, title }: { icon: any; title: string }) {
  return (
    <View style={styles.sectionHeader}>
      <View style={styles.iconWrapper}>
        <Ionicons name={icon} size={18} color="#15A9B2" />
      </View>
      <Text style={styles.sectionTitle}>{title}</Text>
    </View>
  );
}

// ─── Accordion ────────────────────────────────────────────────────────────────
function Accordion({
  title, count, isOpen, onToggle, onAdd, children,
}: {
  title: string; count: number;
  isOpen: boolean; onToggle: () => void; onAdd: () => void;
  children: React.ReactNode;
}) {
  return (
    <View style={styles.accordionCard}>
      <TouchableOpacity activeOpacity={0.7} onPress={onToggle} style={styles.accordionHeader}>
        <View style={styles.accordionLeft}>
          <View style={[styles.accordionIconBox, isOpen && styles.accordionIconBoxActive]}>
            <Ionicons name={isOpen ? "chevron-down" : "chevron-forward"} size={16} color={isOpen ? "#15A9B2" : "#94a3b8"} />
          </View>
          <Text style={styles.accordionTitle}>{title}</Text>
          <View style={styles.countPill}>
            <Text style={styles.countText}>{count}</Text>
          </View>
        </View>
        <TouchableOpacity
          onPress={(e) => { e.stopPropagation(); onAdd(); }}
          style={styles.addButton}
          activeOpacity={0.7}
        >
          <Ionicons name="add" size={18} color="#15A9B2" />
        </TouchableOpacity>
      </TouchableOpacity>

      {isOpen && (
        <View style={styles.accordionBody}>
          <View style={styles.accordionDivider} />
          {children}
        </View>
      )}
    </View>
  );
}

function ItemTag({ icon, label }: { icon: any; label: string }) {
  return (
    <View style={styles.itemTag}>
      <Ionicons name={icon} size={13} color="#94a3b8" />
      <Text style={styles.itemTagText}>{label}</Text>
    </View>
  );
}

function EmptyState({ icon, label, onAdd, buttonLabel }: { icon: any; label: string; onAdd: () => void; buttonLabel: string }) {
  return (
    <View style={styles.emptyState}>
      <Ionicons name={icon} size={40} color="#D1D5DB" />
      <Text style={styles.emptyStateText}>{label}</Text>
      <TouchableOpacity onPress={onAdd} style={styles.emptyStateButton}>
        <Text style={styles.emptyStateButtonText}>{buttonLabel}</Text>
      </TouchableOpacity>
    </View>
  );
}

// ─── Main Component ───────────────────────────────────────────────────────────
export default function EditProfileScreen() {
  const router = useRouter();
  const headerHeight = useHeaderHeight();

  const { control, handleSubmit, formState: { errors }, watch } = useForm<ProfileFormData>({
    resolver: yupResolver(profileSchema),
    defaultValues: {
      name: "Syed Mohiuddin",
      description: "I'm Mohid, a passionate Full Stack developer with expertise in building beautiful, performant mobile applications.",
    },
  });

  const description = watch("description");

  const [educationList, setEducationList] = useState<Education[]>([
    { id: "1", country: "Pakistan", universityName: "KSBL", degree: "Bachelor's", major: "Computer Science", graduationYear: "2027" },
  ]);
  const [certifications, setCertifications] = useState<Certification[]>([
    { id: "1", certificationName: "Google UX Design", issuedBy: "Coursera" },
  ]);
  const [skills, setSkills] = useState<string[]>(["Flutter", "React Native", "UI Design", "Firebase", "Node.js"]);

  const [isEducationOpen, setIsEducationOpen] = useState(false);
  const [isCertificationsOpen, setIsCertificationsOpen] = useState(false);
  const [isSkillsOpen, setIsSkillsOpen] = useState(false);

  const [isEduModalVisible, setIsEduModalVisible] = useState(false);
  const [isCertModalVisible, setIsCertModalVisible] = useState(false);
  const [isSkillModalVisible, setIsSkillModalVisible] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleAddEducation = (newEdu: Omit<Education, "id">) =>
    setEducationList([...educationList, { id: Date.now().toString(), ...newEdu }]);

  const handleRemoveEducation = (id: string) =>
    Alert.alert("Remove Education", "Are you sure?", [
      { text: "Cancel", style: "cancel" },
      { text: "Remove", style: "destructive", onPress: () => setEducationList(educationList.filter((e) => e.id !== id)) },
    ]);

  const handleAddCertification = (newCert: Omit<Certification, "id">) =>
    setCertifications([...certifications, { id: Date.now().toString(), ...newCert }]);

  const handleRemoveCertification = (id: string) =>
    Alert.alert("Remove Certification", "Are you sure?", [
      { text: "Cancel", style: "cancel" },
      { text: "Remove", style: "destructive", onPress: () => setCertifications(certifications.filter((c) => c.id !== id)) },
    ]);

  const handleAddSkill = (data: { skillName: string }) => {
    if (data.skillName.trim() && !skills.includes(data.skillName.trim())) {
      setSkills([...skills, data.skillName.trim()]);
    } else {
      Alert.alert("Duplicate Skill", "This skill already exists.");
    }
  };

  const handleRemoveSkill = (skill: string) =>
    Alert.alert("Remove Skill", `Remove "${skill}"?`, [
      { text: "Cancel", style: "cancel" },
      { text: "Remove", style: "destructive", onPress: () => setSkills(skills.filter((s) => s !== skill)) },
    ]);

  const onSubmit = async (data: ProfileFormData) => {
    setIsSubmitting(true);
    try {
      await new Promise((resolve) => setTimeout(resolve, 1000));
      Alert.alert("Success", "Profile updated successfully!", [{ text: "OK", onPress: () => router.back() }]);
    } catch {
      Alert.alert("Error", "Failed to update profile.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <LinearGradient
      colors={["#f0f9ff", "#e0f2fe", "#bae6fd", "#7dd3fc"]}
      style={{ flex: 1 }}
      start={{ x: 0, y: 0 }}
      end={{ x: 0.6, y: 1 }}
    >
      <AddEducationModal visible={isEduModalVisible} onClose={() => setIsEduModalVisible(false)} onAdd={handleAddEducation} />
      <AddCertificationModal visible={isCertModalVisible} onClose={() => setIsCertModalVisible(false)} onAdd={handleAddCertification} />
      <AddSkillModal visible={isSkillModalVisible} onClose={() => setIsSkillModalVisible(false)} onAdd={handleAddSkill} />

      <KeyboardAvoidingView behavior={Platform.OS === "ios" ? "padding" : undefined} style={{ flex: 1 }}>
        <ScrollView
          contentContainerStyle={[styles.scrollContent, { paddingTop: headerHeight + 16 }]}
          showsVerticalScrollIndicator={false}
        >
          {/* Banner Header */}
          <View style={styles.headerContainer}>
            <BannerHeader />
          </View>

          {/* ── Personal Info ── */}
          <View style={styles.section}>
            <SectionHeader icon="person" title="Personal Information" />
            <View style={styles.card}>
              <Controller
                control={control}
                name="name"
                render={({ field: { onChange, onBlur, value } }) => (
                  <View style={styles.inputGroup}>
                    <Text style={styles.label}>Full Name</Text>
                    <View style={[styles.inputContainer, errors.name && styles.inputError]}>
                      <TextInput
                        style={styles.input}
                        value={value}
                        onChangeText={onChange}
                        onBlur={onBlur}
                        placeholder="Enter your name"
                        placeholderTextColor="#9CA3AF"
                      />
                    </View>
                    {errors.name && <Text style={styles.errorText}>⚠ {errors.name.message}</Text>}
                  </View>
                )}
              />
              <Controller
                control={control}
                name="description"
                render={({ field: { onChange, onBlur, value } }) => (
                  <View style={[styles.inputGroup, { marginBottom: 0 }]}>
                    <Text style={styles.label}>About You</Text>
                    <View style={[styles.inputContainer, styles.textAreaContainer, errors.description && styles.inputError]}>
                      <TextInput
                        style={[styles.input, styles.textArea]}
                        multiline
                        numberOfLines={4}
                        value={value}
                        onChangeText={onChange}
                        onBlur={onBlur}
                        placeholder="Tell us about yourself..."
                        placeholderTextColor="#9CA3AF"
                      />
                    </View>
                    <View style={styles.helperRow}>
                      {errors.description
                        ? <Text style={styles.errorText}>⚠ {errors.description.message}</Text>
                        : <View />}
                      <Text style={[styles.helperText, (description?.length ?? 0) > 500 && styles.errorText]}>
                        {description?.length ?? 0}/500
                      </Text>
                    </View>
                  </View>
                )}
              />
            </View>
          </View>

          {/* ── Education ── */}
          <View style={styles.section}>
            <SectionHeader icon="school" title="Education" />
            <Accordion
              title="Education History" count={educationList.length}
              isOpen={isEducationOpen} onToggle={() => setIsEducationOpen(!isEducationOpen)}
              onAdd={() => setIsEduModalVisible(true)}
            >
              {educationList.length === 0 ? (
                <EmptyState icon="school-outline" label="No education added yet" onAdd={() => setIsEduModalVisible(true)} buttonLabel="Add Education" />
              ) : (
                educationList.map((edu, index) => (
                  <View key={edu.id} style={styles.itemCard}>
                    <View style={styles.itemHeader}>
                      <View style={styles.itemBadge}><Text style={styles.itemBadgeText}>{index + 1}</Text></View>
                      <TouchableOpacity onPress={() => handleRemoveEducation(edu.id)} style={styles.deleteButton}>
                        <Ionicons name="trash-outline" size={18} color="#EF4444" />
                      </TouchableOpacity>
                    </View>
                    <Text style={styles.itemTitle}>{edu.universityName}</Text>
                    <Text style={styles.itemSubtitle}>{edu.degree} in {edu.major}</Text>
                    <View style={styles.itemFooter}>
                      <ItemTag icon="location-outline" label={edu.country} />
                      <ItemTag icon="calendar-outline" label={`Class of ${edu.graduationYear}`} />
                    </View>
                  </View>
                ))
              )}
            </Accordion>
          </View>

          {/* ── Certifications ── */}
          <View style={styles.section}>
            <SectionHeader icon="ribbon" title="Certifications" />
            <Accordion
              title="Certificates" count={certifications.length}
              isOpen={isCertificationsOpen} onToggle={() => setIsCertificationsOpen(!isCertificationsOpen)}
              onAdd={() => setIsCertModalVisible(true)}
            >
              {certifications.length === 0 ? (
                <EmptyState icon="ribbon-outline" label="No certifications added yet" onAdd={() => setIsCertModalVisible(true)} buttonLabel="Add Certification" />
              ) : (
                certifications.map((cert) => (
                  <View key={cert.id} style={styles.itemCard}>
                    <View style={styles.itemHeader}>
                      <View style={[styles.itemBadge, { backgroundColor: "#F59E0B" }]}>
                        <Ionicons name="ribbon" size={14} color="#fff" />
                      </View>
                      <TouchableOpacity onPress={() => handleRemoveCertification(cert.id)} style={styles.deleteButton}>
                        <Ionicons name="trash-outline" size={18} color="#EF4444" />
                      </TouchableOpacity>
                    </View>
                    <Text style={styles.itemTitle}>{cert.certificationName}</Text>
                    <View style={styles.itemFooter}>
                      <ItemTag icon="business-outline" label={cert.issuedBy} />
                    </View>
                  </View>
                ))
              )}
            </Accordion>
          </View>

          {/* ── Skills ── */}
          <View style={styles.section}>
            <SectionHeader icon="flash" title="Skills & Expertise" />
            <Accordion
              title="Skills" count={skills.length}
              isOpen={isSkillsOpen} onToggle={() => setIsSkillsOpen(!isSkillsOpen)}
              onAdd={() => setIsSkillModalVisible(true)}
            >
              {skills.length === 0 ? (
                <EmptyState icon="flash-outline" label="No skills added yet" onAdd={() => setIsSkillModalVisible(true)} buttonLabel="Add Skill" />
              ) : (
                <View style={styles.skillsGrid}>
                  {skills.map((skill) => (
                    <View key={skill} style={styles.skillChip}>
                      <Text style={styles.skillText}>{skill}</Text>
                      <TouchableOpacity onPress={() => handleRemoveSkill(skill)} style={styles.skillRemove}>
                        <Ionicons name="close" size={13} color="#fff" />
                      </TouchableOpacity>
                    </View>
                  ))}
                </View>
              )}
            </Accordion>
          </View>

          {/* ── Save Button ── */}
          <TouchableOpacity onPress={handleSubmit(onSubmit)} disabled={isSubmitting} activeOpacity={0.85} style={{ marginBottom: 16 }}>
            <LinearGradient
              colors={isSubmitting ? ["#9CA3AF", "#6B7280"] : ["#0a4f54", "#15A9B2"]}
              style={styles.gradientButton}
              start={{ x: 0, y: 0 }}
              end={{ x: 1, y: 0 }}
            >
              <Ionicons name={isSubmitting ? "hourglass-outline" : "checkmark-circle"} size={20} color="#fff" />
              <Text style={styles.buttonText}>{isSubmitting ? "Saving..." : "Save Changes"}</Text>
            </LinearGradient>
          </TouchableOpacity>

        </ScrollView>
      </KeyboardAvoidingView>
    </LinearGradient>
  );
}

const styles = StyleSheet.create({
  scrollContent: {
    paddingHorizontal: 16,
    paddingBottom: 40,
    gap: 0,
  },
  headerContainer: {
    marginBottom: 20,
  },

  // ── Banner ──
  bannerWrapper: {
    borderRadius: 20,
    overflow: "hidden",
    shadowColor: "#0a4f54",
    shadowOffset: { width: 0, height: 6 },
    shadowOpacity: 0.25,
    shadowRadius: 14,
    elevation: 8,
  },
  bannerGradient: {
    padding: 18,
    paddingBottom: 14,
    borderRadius: 20,
    overflow: "hidden",
  },
  decorCircleLarge: {
    position: "absolute",
    width: 160,
    height: 160,
    borderRadius: 80,
    backgroundColor: "#ffffff0d",
    top: -50,
    right: -40,
  },
  decorCircleSmall: {
    position: "absolute",
    width: 80,
    height: 80,
    borderRadius: 40,
    backgroundColor: "#ffffff0a",
    bottom: 10,
    left: -20,
  },
  bannerCard: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 14,
  },
  bannerIconGradient: {
    width: 48,
    height: 48,
    borderRadius: 14,
    alignItems: "center",
    justifyContent: "center",
    borderWidth: 1,
    borderColor: "#ffffff33",
    marginRight: 14,
  },
  bannerTextBlock: {
    flex: 1,
  },
  bannerTitle: {
    color: "#ffffff",
    fontSize: 17,
    fontWeight: "700",
    letterSpacing: 0.3,
  },
  bannerDivider: {
    width: 32,
    height: 2,
    backgroundColor: "#15A9B2",
    borderRadius: 2,
    marginVertical: 5,
  },
  bannerSubtitle: {
    color: "#cdf4f7",
    fontSize: 11,
    lineHeight: 16,
    opacity: 0.9,
  },
  bannerTagRow: {
    flexDirection: "row",
    gap: 10,
    borderTopWidth: 1,
    borderTopColor: "#ffffff1a",
    paddingTop: 10,
  },
  bannerTag: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#ffffff14",
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 20,
    gap: 6,
  },
  bannerTagDot: {
    width: 6,
    height: 6,
    borderRadius: 3,
  },
  bannerTagText: {
    color: "#e0fafb",
    fontSize: 10,
    fontWeight: "500",
  },

  // ── Sections ──
  section: {
    marginBottom: 20,
  },
  sectionHeader: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 10,
  },
  iconWrapper: {
    width: 34,
    height: 34,
    borderRadius: 10,
    backgroundColor: "#e0f7f9",
    justifyContent: "center",
    alignItems: "center",
    marginRight: 10,
  },
  sectionTitle: {
    fontSize: 15,
    fontWeight: "700",
    color: "#043A53",
  },
  card: {
    backgroundColor: "#fff",
    borderRadius: 16,
    padding: 16,
    borderWidth: 0.5,
    borderColor: "#e5e7eb",
    shadowColor: "#0a4f54",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 8,
    elevation: 2,
  },
  inputGroup: {
    marginBottom: 16,
  },
  label: {
    fontSize: 13,
    fontWeight: "600",
    color: "#043A53",
    marginBottom: 8,
  },
  inputContainer: {
    borderWidth: 1.5,
    borderColor: "#E5E7EB",
    borderRadius: 12,
    backgroundColor: "#F9FAFB",
  },
  inputError: {
    borderColor: "#EF4444",
    backgroundColor: "#FFF5F5",
  },
  input: {
    paddingHorizontal: 14,
    paddingVertical: 12,
    fontSize: 14,
    color: "#043A53",
  },
  textAreaContainer: {
    minHeight: 110,
  },
  textArea: {
    textAlignVertical: "top",
    paddingTop: 12,
    minHeight: 110,
  },
  helperRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: 5,
  },
  helperText: {
    fontSize: 11,
    color: "#9CA3AF",
  },
  errorText: {
    fontSize: 11,
    color: "#EF4444",
  },
  accordionCard: {
    backgroundColor: "#fff",
    borderRadius: 16,
    padding: 16,
    borderWidth: 0.5,
    borderColor: "#e5e7eb",
    shadowColor: "#0a4f54",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 8,
    elevation: 2,
  },
  accordionHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  accordionLeft: {
    flexDirection: "row",
    alignItems: "center",
    flex: 1,
    gap: 8,
  },
  accordionIconBox: {
    width: 28,
    height: 28,
    borderRadius: 8,
    backgroundColor: "#F1F5F9",
    alignItems: "center",
    justifyContent: "center",
  },
  accordionIconBoxActive: {
    backgroundColor: "#e0f7f9",
  },
  accordionTitle: {
    fontSize: 14,
    fontWeight: "600",
    color: "#043A53",
  },
  countPill: {
    backgroundColor: "#e0f7f9",
    borderRadius: 20,
    paddingHorizontal: 8,
    paddingVertical: 2,
  },
  countText: {
    fontSize: 11,
    fontWeight: "700",
    color: "#0d7c85",
  },
  addButton: {
    width: 32,
    height: 32,
    borderRadius: 10,
    backgroundColor: "#e0f7f9",
    alignItems: "center",
    justifyContent: "center",
  },
  accordionBody: {
    marginTop: 12,
  },
  accordionDivider: {
    height: 0.5,
    backgroundColor: "#f1f5f9",
    marginBottom: 14,
  },
  emptyState: {
    alignItems: "center",
    paddingVertical: 24,
  },
  emptyStateText: {
    fontSize: 13,
    color: "#9CA3AF",
    marginTop: 10,
    marginBottom: 14,
  },
  emptyStateButton: {
    paddingHorizontal: 18,
    paddingVertical: 8,
    borderRadius: 8,
    borderWidth: 1.5,
    borderColor: "#15A9B2",
    borderStyle: "dashed",
  },
  emptyStateButtonText: {
    color: "#15A9B2",
    fontSize: 13,
    fontWeight: "600",
  },
  itemCard: {
    backgroundColor: "#F9FAFB",
    borderRadius: 12,
    padding: 14,
    marginBottom: 10,
    borderWidth: 0.5,
    borderColor: "#E5E7EB",
  },
  itemHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 10,
  },
  itemBadge: {
    width: 30,
    height: 30,
    borderRadius: 8,
    backgroundColor: "#15A9B2",
    justifyContent: "center",
    alignItems: "center",
  },
  itemBadgeText: {
    color: "#fff",
    fontSize: 13,
    fontWeight: "700",
  },
  deleteButton: {
    padding: 4,
  },
  itemTitle: {
    fontSize: 14,
    fontWeight: "700",
    color: "#043A53",
    marginBottom: 3,
  },
  itemSubtitle: {
    fontSize: 12,
    color: "#6B7280",
    marginBottom: 10,
  },
  itemFooter: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: 6,
  },
  itemTag: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#fff",
    paddingHorizontal: 9,
    paddingVertical: 5,
    borderRadius: 8,
    gap: 4,
    borderWidth: 0.5,
    borderColor: "#e5e7eb",
  },
  itemTagText: {
    fontSize: 11,
    color: "#6B7280",
    fontWeight: "500",
  },
  skillsGrid: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: 8,
  },
  skillChip: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#043A53",
    paddingLeft: 12,
    paddingRight: 6,
    paddingVertical: 7,
    borderRadius: 20,
    gap: 6,
  },
  skillText: {
    color: "#fff",
    fontSize: 13,
    fontWeight: "600",
  },
  skillRemove: {
    width: 20,
    height: 20,
    borderRadius: 10,
    backgroundColor: "rgba(255,255,255,0.20)",
    justifyContent: "center",
    alignItems: "center",
  },
  gradientButton: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    paddingVertical: 16,
    borderRadius: 14,
    gap: 8,
    shadowColor: "#0a4f54",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.25,
    shadowRadius: 8,
    elevation: 5,
    marginBottom:35
  },
  buttonText: {
    color: "#fff",
    fontSize: 15,
    fontWeight: "700",
  },
});