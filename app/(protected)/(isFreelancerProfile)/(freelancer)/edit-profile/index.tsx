import { useState } from "react";
import { StatusBar } from "expo-status-bar";
import { Ionicons } from "@expo/vector-icons";
import { Stack, useRouter } from "expo-router";
import { LinearGradient } from "expo-linear-gradient";
import { SafeAreaView } from "react-native-safe-area-context";
import AddSkillModal from "@/components/forms/freelancer/AddSkillModal";
import AddEducationModal from "@/components/forms/freelancer/AddEducationModal";
import AddCertificationModal from "@/components/forms/freelancer/AddCertificationModal";
import { Image, ScrollView, StyleSheet, Text, TextInput, TouchableOpacity, View } from "react-native";


export default function EditProfileScreen() {
  const router = useRouter();
  
  // Accordion States
  const [isEducationOpen, setIsEducationOpen] = useState(false);
  const [isCertificationsOpen, setIsCertificationsOpen] = useState(false);
  const [isSkillsOpen, setIsSkillsOpen] = useState(false);
  
  // Modal Visibility States
  const [isEduModalVisible, setIsEduModalVisible] = useState(false);
  const [isCertModalVisible, setIsCertModalVisible] = useState(false);
  const [isSkillModalVisible, setIsSkillModalVisible] = useState(false);

  return (
    <SafeAreaView style={styles.container}>
      <Stack.Screen options={{ headerShown: false }} />

      <AddEducationModal visible={isEduModalVisible} onClose={() => setIsEduModalVisible(false)} />
      <AddCertificationModal visible={isCertModalVisible} onClose={() => setIsCertModalVisible(false)} />
      <AddSkillModal visible={isSkillModalVisible} onClose={() => setIsSkillModalVisible(false)} />

      <View style={styles.header}>
        <TouchableOpacity style={styles.backButton} onPress={() => router.back()}>
          <Ionicons name="chevron-back" size={24} color="#fff" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>EDIT PROFILE</Text>
      </View>

      {/* <Image source={require("@/assets/images/img_1.png")} style={styles.avatarFixed} /> */}

      <ScrollView 
        style={styles.scrollView} 
        contentContainerStyle={styles.scrollContent} 
        showsVerticalScrollIndicator={false}
      >
        <View style={styles.profileCard}>
          <View style={styles.formContainer}>
            <Text style={styles.label}>Name</Text>
            <View style={styles.inputRow}>
              <TextInput style={styles.input} defaultValue="Ashar Usmani" placeholderTextColor="#8A96A0" />
            </View>

            <Text style={styles.label}>Email / Description</Text>
            <View style={[styles.inputRow, { height: 190, alignItems: 'flex-start' }]}> 
              <TextInput
                style={[
                  styles.input, 
                  { 
                    textAlignVertical: "top", 
                    paddingTop: 12,           
                    height: '100%'            
                  }
                ]}
                multiline={true}
                defaultValue="I’m Asher, a passionate Flutter developer..."
                placeholderTextColor="#8A96A0"
              />
            </View>

            <TouchableOpacity 
              activeOpacity={0.7}
              onPress={() => setIsEducationOpen(!isEducationOpen)}
              style={[styles.inputRow, styles.dropdownContainer]}
            >
              <View style={styles.dropdownHeader}>
                <Text style={styles.dropdownTitle}>Education</Text>
                <Ionicons name={isEducationOpen ? "chevron-up" : "chevron-forward"} size={20} color="#15A9B2" />
              </View>
              {isEducationOpen && (
                <View style={styles.expandedContent}>
                  <Text style={styles.itemHeading}>Sir syed</Text>
                  <Text style={styles.itemSubtext}>Bachelor of Computer engineering</Text>
                  <TouchableOpacity style={styles.addBtnSmall} onPress={() => setIsEduModalVisible(true)}>
                    <Ionicons name="add" size={20} color="#043A53" />
                    <Text style={styles.addBtnText}>Add Education</Text>
                  </TouchableOpacity>
                </View>
              )}
            </TouchableOpacity>

            <TouchableOpacity 
              activeOpacity={0.7}
              onPress={() => setIsCertificationsOpen(!isCertificationsOpen)}
              style={[styles.inputRow, styles.dropdownContainer]}
            >
              <View style={styles.dropdownHeader}>
                <Text style={styles.dropdownTitle}>Certifications</Text>
                <Ionicons name={isCertificationsOpen ? "chevron-up" : "chevron-forward"} size={20} color="#15A9B2" />
              </View>
              {isCertificationsOpen && (
                <View style={styles.expandedContent}>
                  <Text style={styles.itemHeading}>Google UX Design</Text>
                  <Text style={styles.itemSubtext}>Coursera - Issued June 2023</Text>
                  <TouchableOpacity style={styles.addBtnSmall} onPress={() => setIsCertModalVisible(true)}>
                    <Ionicons name="add" size={20} color="#043A53" />
                    <Text style={styles.addBtnText}>Add Certification</Text>
                  </TouchableOpacity>
                </View>
              )}
            </TouchableOpacity>

            <TouchableOpacity 
              activeOpacity={0.7}
              onPress={() => setIsSkillsOpen(!isSkillsOpen)}
              style={[styles.inputRow, styles.dropdownContainer]}
            >
              <View style={styles.dropdownHeader}>
                <Text style={styles.dropdownTitle}>Skills and Expertise</Text>
                <Ionicons name={isSkillsOpen ? "chevron-up" : "chevron-forward"} size={20} color="#15A9B2" />
              </View>
              {isSkillsOpen && (
                <View style={styles.expandedContent}>
                  <View style={styles.skillsWrapper}>
                    {["Flutter", "React Native", "UI Design", "Firebase", "Node.js"].map((skill) => (
                      <View key={skill} style={styles.skillTag}>
                        <Text style={styles.skillText}>{skill}</Text>
                      </View>
                    ))}
                  </View>
                  <TouchableOpacity style={styles.addBtnSmall} onPress={() => setIsSkillModalVisible(true)}>
                    <Ionicons name="add" size={20} color="#043A53" />
                    <Text style={styles.addBtnText}>Add Skill</Text>
                  </TouchableOpacity>
                </View>
              )}
            </TouchableOpacity>

            <TouchableOpacity onPress={() => router.back()} style={{ alignSelf: "flex-end", marginTop: 10 }}>
              <LinearGradient colors={["#15A9B2", "#17747A"]} style={styles.gradientButton}>
                <Text style={styles.buttonText}>Submit</Text>
              </LinearGradient>
            </TouchableOpacity>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#F4F4F4' },
  header: {
    position: "absolute", top: 0, left: 0, right: 0, height: 160,
    backgroundColor: "#1F3C58", borderBottomLeftRadius: 30, borderBottomRightRadius: 30,
    justifyContent: "center", alignItems: "center", zIndex: 1,
  },
  headerTitle: { color: "#fff", fontSize: 18, fontWeight: "700" },
  backButton: {
    position: "absolute",
    left: 20,
    top: 55, 
    width: 42,
    height: 42,
    borderRadius: 12, 
    borderWidth: 1,
    borderColor: "rgba(255, 255, 255, 0.3)", 
    backgroundColor: "rgba(255, 255, 255, 0.15)", 
    justifyContent: "center",
    alignItems: "center",
    zIndex: 20,
  },
  
  avatarFixed: {
    position: 'absolute',
    top: 125,
    alignSelf: 'center',
    width: 95,
    height: 95,
    borderRadius: 47.5,
    borderWidth: 4,
    borderColor: "#fff",
    backgroundColor: '#fff',
    zIndex: 10, 
  },

  scrollView: { zIndex: 2 },
  scrollContent: { 
    paddingTop: 110, // White card starts here
    paddingBottom: 40, 
    paddingHorizontal: 16 
  },
  profileCard: { 
    borderRadius: 20, 
    padding: 20, 
    paddingTop: 75,
    alignItems: "center", 
    shadowColor: "#000", 
    shadowOpacity: 0.1, 
    zIndex: 3,  
  },
  formContainer: { width: "100%", alignItems: "flex-start", marginTop: 16 },
  label: { fontSize: 14, fontWeight: "600", color: "#043A53", marginBottom: 6 },
  inputRow: { flexDirection: "row", alignItems: "center", borderWidth: 1, borderColor: "#043A53", borderRadius: 10, paddingHorizontal: 12, marginBottom: 16, width: '100%' },
  input: { flex: 1, paddingVertical: 12, color: "#8A96A0", fontSize: 15 },
  dropdownContainer: { flexDirection: 'column', alignItems: 'stretch', paddingVertical: 12 },
  dropdownHeader: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', width: '100%' },
  dropdownTitle: { fontSize: 15, color: "#8A96A0" },
  expandedContent: { marginTop: 15, width: '100%', borderTopWidth: 1, borderTopColor: '#f0f0f0', paddingTop: 10 },
  itemHeading: { fontSize: 16, fontWeight: '700', color: '#043A53' },
  itemSubtext: { fontSize: 14, color: '#8A96A0', marginBottom: 10 },
  skillsWrapper: { flexDirection: 'row', flexWrap: 'wrap', marginBottom: 15 },
  skillTag: { backgroundColor: '#043A53', paddingHorizontal: 12, paddingVertical: 6, borderRadius: 20, marginRight: 8, marginBottom: 8, opacity: 0.5 },
  skillText: { color: '#fff', fontSize: 13, fontWeight: '600' },
  addBtnSmall: { flexDirection: 'row', alignItems: 'center', borderWidth: 1, borderColor: '#043A53', borderRadius: 8, paddingVertical: 6, paddingHorizontal: 10, alignSelf: 'flex-start', marginTop: 5 },
  addBtnText: { color: '#043A53', fontSize: 13, marginLeft: 5 },
  gradientButton: { paddingVertical: 12, paddingHorizontal: 30, borderRadius: 10, alignItems: "center" },
  buttonText: { color: "#fff", fontWeight: "600", fontSize: 16 },
});