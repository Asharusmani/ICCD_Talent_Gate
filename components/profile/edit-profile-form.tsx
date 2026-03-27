import { Ionicons } from "@expo/vector-icons";
import { LinearGradient } from "expo-linear-gradient";
import { useRouter } from "expo-router";
import { StatusBar } from "expo-status-bar";
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

// Importing your separate components
import AddSkillModal from "../modal/add-skill-modal";
import AddEducationModal from "../modal/add-education-modal";
import AddCertificationModal from "../modal/add-certification-modal";

// Type definitions for better type safety
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

// Validation Schema
const profileSchema = yup.object().shape({
  name: yup
    .string()
    .required("Name is required")
    .min(2, "Name must be at least 2 characters")
    .max(50, "Name must not exceed 50 characters"),
  description: yup
    .string()
    .required("Description is required")
    .min(10, "Description must be at least 10 characters")
    .max(500, "Description must not exceed 500 characters"),
});

export default function EditProfileScreen() {
  const router = useRouter();

  // React Hook Form setup
  const {
    control,
    handleSubmit,
    formState: { errors },
    watch,
  } = useForm<ProfileFormData>({
    resolver: yupResolver(profileSchema),
    defaultValues: {
      name: "Syed Mohiuddin",
      description:
        "I'm Mohid, a passionate Full Stack developer with expertise in building beautiful, performant mobile applications. I love creating seamless user experiences.",
    },
  });

  // Watch description for character count
  const description = watch("description");

  // Education State
  const [educationList, setEducationList] = useState<Education[]>([
    {
      id: "1",
      country: "Pakistan",
      universityName: "KSBL",
      degree: "Bachelor's",
      major: "Computer Science",
      graduationYear: "2027",
    },
  ]);

  // Certifications State
  const [certifications, setCertifications] = useState<Certification[]>([
    {
      id: "1",
      certificationName: "Google UX Design",
      issuedBy: "Coursera",
    },
  ]);

  // Skills State
  const [skills, setSkills] = useState<string[]>([
    "Flutter",
    "React Native",
    "UI Design",
    "Firebase",
    "Node.js",
  ]);

  // Accordion States
  const [isEducationOpen, setIsEducationOpen] = useState(false);
  const [isCertificationsOpen, setIsCertificationsOpen] = useState(false);
  const [isSkillsOpen, setIsSkillsOpen] = useState(false);

  // Modal Visibility States
  const [isEduModalVisible, setIsEduModalVisible] = useState(false);
  const [isCertModalVisible, setIsCertModalVisible] = useState(false);
  const [isSkillModalVisible, setIsSkillModalVisible] = useState(false);

  // Loading state for submit
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Handler Functions
  const handleAddEducation = (newEducation: Omit<Education, "id">) => {
    const education: Education = {
      id: Date.now().toString(),
      ...newEducation,
    };
    console.log(" Adding Education:", education);
    setEducationList([...educationList, education]);
  };

  const handleRemoveEducation = (id: string) => {
    Alert.alert(
      "Remove Education",
      "Are you sure you want to remove this education entry?",
      [
        { text: "Cancel", style: "cancel" },
        {
          text: "Remove",
          style: "destructive",
          onPress: () => {
            console.log("🗑️ Removing Education ID:", id);
            setEducationList(educationList.filter((edu) => edu.id !== id));
          },
        },
      ]
    );
  };

  const handleAddCertification = (newCertification: Omit<Certification, "id">) => {
    const certification: Certification = {
      id: Date.now().toString(),
      ...newCertification,
    };
    console.log("🏆 Adding Certification:", certification);
    setCertifications([...certifications, certification]);
  };

  const handleRemoveCertification = (id: string) => {
    Alert.alert(
      "Remove Certification",
      "Are you sure you want to remove this certification?",
      [
        { text: "Cancel", style: "cancel" },
        {
          text: "Remove",
          style: "destructive",
          onPress: () => {
            console.log("🗑️ Removing Certification ID:", id);
            setCertifications(certifications.filter((cert) => cert.id !== id));
          },
        },
      ]
    );
  };

  const handleAddSkill = (data: { skillName: string }) => {
    console.log("⚡ Adding Skill:", data.skillName);
    if (data.skillName.trim() && !skills.includes(data.skillName.trim())) {
      setSkills([...skills, data.skillName.trim()]);
    } else if (skills.includes(data.skillName.trim())) {
      Alert.alert("Duplicate Skill", "This skill already exists in your profile.");
    }
  };

  const handleRemoveSkill = (skillToRemove: string) => {
    Alert.alert(
      "Remove Skill",
      `Remove "${skillToRemove}" from your skills?`,
      [
        { text: "Cancel", style: "cancel" },
        {
          text: "Remove",
          style: "destructive",
          onPress: () => {
            console.log("🗑️ Removing Skill:", skillToRemove);
            setSkills(skills.filter((skill) => skill !== skillToRemove));
          },
        },
      ]
    );
  };

  const onSubmit = async (data: ProfileFormData) => {
    setIsSubmitting(true);

    // Compile all profile data
    const profileData = {
      ...data,
      education: educationList,
      certifications: certifications,
      skills: skills,
    };

    console.log("=".repeat(50));
    console.log("profile data");
    console.log("profile",data);
    console.log("profile",educationList);
    console.log("Certifications",certifications);
    console.log("Skills",skills);
    console.log("Complete Profile Object:" , profileData);

    try {
      await new Promise((resolve) => setTimeout(resolve, 1000));
      console.log(" Profile updated successfully!");
      Alert.alert("Success", "Profile updated successfully!", [
        {
          text: "OK",
          onPress: () => router.back(),
        },
      ]);
    } catch (error) {
      console.error("❌ Profile update error:", error);
      Alert.alert("Error", "Failed to update profile. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <View style={styles.container}>
      {/* Modals */}
      <AddEducationModal
        visible={isEduModalVisible}
        onClose={() => setIsEduModalVisible(false)}
        onAdd={handleAddEducation}
      />
      <AddCertificationModal
        visible={isCertModalVisible}
        onClose={() => setIsCertModalVisible(false)}
        onAdd={handleAddCertification}
      />
      <AddSkillModal
        visible={isSkillModalVisible}
        onClose={() => setIsSkillModalVisible(false)}
        onAdd={handleAddSkill}
      />

      <KeyboardAvoidingView
        behavior={Platform.OS === "ios" ? "padding" : undefined}
        style={styles.keyboardAvoid}
      >
        <ScrollView
          style={styles.scrollView}
          contentContainerStyle={styles.scrollContent}
          showsVerticalScrollIndicator={false}
        >
          {/* Profile Info Section */}
          <View style={styles.section}>
            <View style={styles.sectionHeader}>
              <View style={styles.iconWrapper}>
                <Ionicons name="person" size={20} color="#15A9B2" />
              </View>
              <Text style={styles.sectionTitle}>Personal Information</Text>
            </View>

            <View style={styles.card}>
              {/* Name Input with Controller */}
              <Controller
                control={control}
                name="name"
                render={({ field: { onChange, onBlur, value } }) => (
                  <View style={styles.inputGroup}>
                    <Text style={styles.label}>Full Name</Text>
                    <View
                      style={[
                        styles.inputContainer,
                        errors.name && styles.inputError,
                      ]}
                    >
                      <TextInput
                        style={styles.input}
                        value={value}
                        onChangeText={onChange}
                        onBlur={onBlur}
                        placeholder="Enter your name"
                        placeholderTextColor="#9CA3AF"
                      />
                    </View>
                    {errors.name && (
                      <Text style={styles.errorText}>
                        ⚠ {errors.name.message}
                      </Text>
                    )}
                  </View>
                )}
              />

              {/* Description Input with Controller */}
              <Controller
                control={control}
                name="description"
                render={({ field: { onChange, onBlur, value } }) => (
                  <View style={styles.inputGroup}>
                    <Text style={styles.label}>About You</Text>
                    <View
                      style={[
                        styles.inputContainer,
                        styles.textAreaContainer,
                        errors.description && styles.inputError,
                      ]}
                    >
                      <TextInput
                        style={[styles.input, styles.textArea]}
                        multiline={true}
                        numberOfLines={4}
                        value={value}
                        onChangeText={onChange}
                        onBlur={onBlur}
                        placeholder="Tell us about yourself..."
                        placeholderTextColor="#9CA3AF"
                      />
                    </View>
                    <View style={styles.helperRow}>
                      {errors.description ? (
                        <Text style={styles.errorText}>
                          ⚠ {errors.description.message}
                        </Text>
                      ) : (
                        <View />
                      )}
                      <Text
                        style={[
                          styles.helperText,
                          description.length > 500 && styles.errorText,
                        ]}
                      >
                        {description.length}/500 characters
                      </Text>
                    </View>
                  </View>
                )}
              />
            </View>
          </View>

          {/* Education Section */}
          <View style={styles.section}>
            <View style={styles.sectionHeader}>
              <View style={styles.iconWrapper}>
                <Ionicons name="school" size={20} color="#15A9B2" />
              </View>
              <Text style={styles.sectionTitle}>Education</Text>
            </View>

            <TouchableOpacity
              activeOpacity={0.7}
              onPress={() => setIsEducationOpen(!isEducationOpen)}
              style={styles.accordion}
            >
              <View style={styles.accordionHeader}>
                <View style={styles.accordionLeft}>
                  <Ionicons
                    name={isEducationOpen ? "chevron-down" : "chevron-forward"}
                    size={20}
                    color="#043A53"
                  />
                  <Text style={styles.accordionTitle}>
                    Education History ({educationList.length})
                  </Text>
                </View>
                <TouchableOpacity
                  onPress={(e) => {
                    e.stopPropagation();
                    setIsEduModalVisible(true);
                  }}
                  style={styles.quickAddButton}
                >
                  <Ionicons name="add-circle" size={24} color="#15A9B2" />
                </TouchableOpacity>
              </View>

              {isEducationOpen && (
                <View style={styles.accordionContent}>
                  {educationList.length === 0 ? (
                    <View style={styles.emptyState}>
                      <Ionicons name="school-outline" size={48} color="#D1D5DB" />
                      <Text style={styles.emptyStateText}>
                        No education added yet
                      </Text>
                      <TouchableOpacity
                        onPress={() => setIsEduModalVisible(true)}
                        style={styles.emptyStateButton}
                      >
                        <Text style={styles.emptyStateButtonText}>
                          Add Education
                        </Text>
                      </TouchableOpacity>
                    </View>
                  ) : (
                    educationList.map((edu, index) => (
                      <View key={edu.id} style={styles.itemCard}>
                        <View style={styles.itemHeader}>
                          <View style={styles.itemBadge}>
                            <Text style={styles.itemBadgeText}>
                              {index + 1}
                            </Text>
                          </View>
                          <TouchableOpacity
                            onPress={() => handleRemoveEducation(edu.id)}
                            style={styles.deleteButton}
                          >
                            <Ionicons
                              name="trash-outline"
                              size={20}
                              color="#EF4444"
                            />
                          </TouchableOpacity>
                        </View>
                        <Text style={styles.itemTitle}>
                          {edu.universityName}
                        </Text>
                        <Text style={styles.itemSubtitle}>
                          {edu.degree} in {edu.major}
                        </Text>
                        <View style={styles.itemFooter}>
                          <View style={styles.itemTag}>
                            <Ionicons
                              name="location-outline"
                              size={14}
                              color="#6B7280"
                            />
                            <Text style={styles.itemTagText}>{edu.country}</Text>
                          </View>
                          <View style={styles.itemTag}>
                            <Ionicons
                              name="calendar-outline"
                              size={14}
                              color="#6B7280"
                            />
                            <Text style={styles.itemTagText}>
                              Class of {edu.graduationYear}
                            </Text>
                          </View>
                        </View>
                      </View>
                    ))
                  )}
                </View>
              )}
            </TouchableOpacity>
          </View>

          {/* Certifications Section */}
          <View style={styles.section}>
            <View style={styles.sectionHeader}>
              <View style={styles.iconWrapper}>
                <Ionicons name="ribbon" size={20} color="#15A9B2" />
              </View>
              <Text style={styles.sectionTitle}>Certifications</Text>
            </View>

            <TouchableOpacity
              activeOpacity={0.7}
              onPress={() => setIsCertificationsOpen(!isCertificationsOpen)}
              style={styles.accordion}
            >
              <View style={styles.accordionHeader}>
                <View style={styles.accordionLeft}>
                  <Ionicons
                    name={
                      isCertificationsOpen ? "chevron-down" : "chevron-forward"
                    }
                    size={20}
                    color="#043A53"
                  />
                  <Text style={styles.accordionTitle}>
                    Certificates ({certifications.length})
                  </Text>
                </View>
                <TouchableOpacity
                  onPress={(e) => {
                    e.stopPropagation();
                    setIsCertModalVisible(true);
                  }}
                  style={styles.quickAddButton}
                >
                  <Ionicons name="add-circle" size={24} color="#15A9B2" />
                </TouchableOpacity>
              </View>

              {isCertificationsOpen && (
                <View style={styles.accordionContent}>
                  {certifications.length === 0 ? (
                    <View style={styles.emptyState}>
                      <Ionicons
                        name="ribbon-outline"
                        size={48}
                        color="#D1D5DB"
                      />
                      <Text style={styles.emptyStateText}>
                        No certifications added yet
                      </Text>
                      <TouchableOpacity
                        onPress={() => setIsCertModalVisible(true)}
                        style={styles.emptyStateButton}
                      >
                        <Text style={styles.emptyStateButtonText}>
                          Add Certification
                        </Text>
                      </TouchableOpacity>
                    </View>
                  ) : (
                    certifications.map((cert, index) => (
                      <View key={cert.id} style={styles.itemCard}>
                        <View style={styles.itemHeader}>
                          <View style={[styles.itemBadge, styles.certBadge]}>
                            <Ionicons name="ribbon" size={16} color="#fff" />
                          </View>
                          <TouchableOpacity
                            onPress={() => handleRemoveCertification(cert.id)}
                            style={styles.deleteButton}
                          >
                            <Ionicons
                              name="trash-outline"
                              size={20}
                              color="#EF4444"
                            />
                          </TouchableOpacity>
                        </View>
                        <Text style={styles.itemTitle}>
                          {cert.certificationName}
                        </Text>
                        <View style={styles.itemFooter}>
                          <View style={styles.itemTag}>
                            <Ionicons
                              name="business-outline"
                              size={14}
                              color="#6B7280"
                            />
                            <Text style={styles.itemTagText}>
                              {cert.issuedBy}
                            </Text>
                          </View>
                        </View>
                      </View>
                    ))
                  )}
                </View>
              )}
            </TouchableOpacity>
          </View>

          {/* Skills Section */}
          <View style={styles.section}>
            <View style={styles.sectionHeader}>
              <View style={styles.iconWrapper}>
                <Ionicons name="flash" size={20} color="#15A9B2" />
              </View>
              <Text style={styles.sectionTitle}>Skills & Expertise</Text>
            </View>

            <TouchableOpacity
              activeOpacity={0.7}
              onPress={() => setIsSkillsOpen(!isSkillsOpen)}
              style={styles.accordion}
            >
              <View style={styles.accordionHeader}>
                <View style={styles.accordionLeft}>
                  <Ionicons
                    name={isSkillsOpen ? "chevron-down" : "chevron-forward"}
                    size={20}
                    color="#043A53"
                  />
                  <Text style={styles.accordionTitle}>
                    Skills ({skills.length})
                  </Text>
                </View>
                <TouchableOpacity
                  onPress={(e) => {
                    e.stopPropagation();
                    setIsSkillModalVisible(true);
                  }}
                  style={styles.quickAddButton}
                >
                  <Ionicons name="add-circle" size={24} color="#15A9B2" />
                </TouchableOpacity>
              </View>

              {isSkillsOpen && (
                <View style={styles.accordionContent}>
                  {skills.length === 0 ? (
                    <View style={styles.emptyState}>
                      <Ionicons name="flash-outline" size={48} color="#D1D5DB" />
                      <Text style={styles.emptyStateText}>
                        No skills added yet
                      </Text>
                      <TouchableOpacity
                        onPress={() => setIsSkillModalVisible(true)}
                        style={styles.emptyStateButton}
                      >
                        <Text style={styles.emptyStateButtonText}>Add Skill</Text>
                      </TouchableOpacity>
                    </View>
                  ) : (
                    <View style={styles.skillsGrid}>
                      {skills.map((skill) => (
                        <View key={skill} style={styles.skillChip}>
                          <Text style={styles.skillText}>{skill}</Text>
                          <TouchableOpacity
                            onPress={() => handleRemoveSkill(skill)}
                            style={styles.skillRemove}
                          >
                            <Ionicons name="close" size={16} color="#fff" />
                          </TouchableOpacity>
                        </View>
                      ))}
                    </View>
                  )}
                </View>
              )}
            </TouchableOpacity>
          </View>

          {/* Submit Button */}
          <TouchableOpacity
            onPress={handleSubmit(onSubmit)}
            disabled={isSubmitting}
            activeOpacity={0.8}
            style={styles.submitButton}
          >
            <LinearGradient
              colors={
                isSubmitting ? ["#9CA3AF", "#6B7280"] : ["#15A9B2", "#17747A"]
              }
              style={styles.gradientButton}
              start={{ x: 0, y: 0 }}
              end={{ x: 1, y: 0 }}
            >
              {isSubmitting ? (
                <Text style={styles.buttonText}>Saving Changes...</Text>
              ) : (
                <>
                  <Ionicons name="checkmark-circle" size={20} color="#fff" />
                  <Text style={styles.buttonText}>Save Changes</Text>
                </>
              )}
            </LinearGradient>
          </TouchableOpacity>
        </ScrollView>
      </KeyboardAvoidingView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F3F4F6",
  },
  keyboardAvoid: {
    flex: 1,
  },
  scrollView: {
    flex: 1,
  },
  scrollContent: {
    padding: 16,
    paddingBottom: 40,
  },
  section: {
    marginBottom: 24,
  },
  sectionHeader: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 12,
  },
  iconWrapper: {
    width: 36,
    height: 36,
    borderRadius: 10,
    backgroundColor: "#E8F8F9",
    justifyContent: "center",
    alignItems: "center",
    marginRight: 12,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: "700",
    color: "#043A53",
  },
  card: {
    backgroundColor: "#fff",
    borderRadius: 16,
    padding: 16,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 8,
    elevation: 2,
  },
  inputGroup: {
    marginBottom: 16,
  },
  label: {
    fontSize: 14,
    fontWeight: "600",
    color: "#374151",
    marginBottom: 8,
  },
  inputContainer: {
    borderWidth: 1.5,
    borderColor: "#E5E7EB",
    borderRadius: 12,
    backgroundColor: "#F9FAFB",
  },
  inputError: {
    borderColor: "#FF3B30",
    backgroundColor: "#FFF5F5",
  },
  input: {
    paddingHorizontal: 16,
    paddingVertical: 12,
    fontSize: 15,
    color: "#043A53",
  },
  textAreaContainer: {
    minHeight: 120,
  },
  textArea: {
    textAlignVertical: "top",
    paddingTop: 12,
    minHeight: 120,
  },
  helperRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginTop: 6,
  },
  helperText: {
    fontSize: 12,
    color: "#9CA3AF",
  },
  errorText: {
    fontSize: 12,
    color: "#FF3B30",
  },
  accordion: {
    backgroundColor: "#fff",
    borderRadius: 16,
    padding: 16,
    shadowColor: "#000",
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
  },
  accordionTitle: {
    fontSize: 16,
    fontWeight: "600",
    color: "#043A53",
    marginLeft: 8,
  },
  quickAddButton: {
    padding: 4,
  },
  accordionContent: {
    marginTop: 16,
    paddingTop: 16,
    borderTopWidth: 1,
    borderTopColor: "#F3F4F6",
  },
  emptyState: {
    alignItems: "center",
    paddingVertical: 32,
  },
  emptyStateText: {
    fontSize: 14,
    color: "#9CA3AF",
    marginTop: 12,
    marginBottom: 16,
  },
  emptyStateButton: {
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderRadius: 8,
    borderWidth: 1.5,
    borderColor: "#15A9B2",
    borderStyle: "dashed",
  },
  emptyStateButtonText: {
    color: "#15A9B2",
    fontSize: 14,
    fontWeight: "600",
  },
  itemCard: {
    backgroundColor: "#F9FAFB",
    borderRadius: 12,
    padding: 16,
    marginBottom: 12,
    borderWidth: 1,
    borderColor: "#E5E7EB",
  },
  itemHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 12,
  },
  itemBadge: {
    width: 32,
    height: 32,
    borderRadius: 8,
    backgroundColor: "#15A9B2",
    justifyContent: "center",
    alignItems: "center",
  },
  itemBadgeText: {
    color: "#fff",
    fontSize: 14,
    fontWeight: "700",
  },
  certBadge: {
    backgroundColor: "#F59E0B",
  },
  deleteButton: {
    padding: 4,
  },
  itemTitle: {
    fontSize: 16,
    fontWeight: "700",
    color: "#043A53",
    marginBottom: 4,
  },
  itemSubtitle: {
    fontSize: 14,
    color: "#6B7280",
    marginBottom: 12,
  },
  itemFooter: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: 8,
  },
  itemTag: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#fff",
    paddingHorizontal: 10,
    paddingVertical: 6,
    borderRadius: 8,
    gap: 4,
  },
  itemTagText: {
    fontSize: 12,
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
    paddingLeft: 14,
    paddingRight: 8,
    paddingVertical: 8,
    borderRadius: 20,
    gap: 6,
  },
  skillText: {
    color: "#fff",
    fontSize: 14,
    fontWeight: "600",
  },
  skillRemove: {
    width: 24,
    height: 24,
    borderRadius: 12,
    backgroundColor: "rgba(255, 255, 255, 0.2)",
    justifyContent: "center",
    alignItems: "center",
  },
  submitButton: {
    marginTop: 8,
    marginBottom: 16,
  },
  gradientButton: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    paddingVertical: 16,
    borderRadius: 12,
    gap: 8,
    shadowColor: "#15A9B2",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 6,
  },
  buttonText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "700",
  },
});