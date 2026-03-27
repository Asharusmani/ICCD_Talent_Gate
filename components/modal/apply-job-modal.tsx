import { Ionicons, MaterialCommunityIcons } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';
import {
  KeyboardAvoidingView,
  Modal,
  Platform,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View
} from 'react-native';

interface applyJobProps{
  visible: boolean; 
  onClose: ()=> void; 
  onSubmit: ()=> void;
}

export default function ApplyJobModal({ visible, onClose, onSubmit }: applyJobProps) {
  return (
    <Modal
      animationType="fade"
      transparent={true}
      visible={visible}
      onRequestClose={onClose}
    >
      <View style={styles.overlay}>
        <KeyboardAvoidingView 
          behavior={Platform.OS === "ios" ? "padding" : "height"}
          style={styles.modalContainer}
        >
          <View style={styles.modalCard}>
            
            {/* HEADER */}
            <View style={styles.header}>
              <Text style={styles.headerTitle}>Details</Text>
              <TouchableOpacity onPress={onClose} style={styles.closeIconButton}>
                <Ionicons name="close" size={22} color="#fff" />
              </TouchableOpacity>
            </View>

            {/* BODY */}
            <ScrollView style={styles.body} showsVerticalScrollIndicator={false}>
              
              <Text style={styles.label}>Full-Name</Text>
              <TextInput 
                style={styles.input} 
                placeholder="Enter full name" 
                placeholderTextColor="#A0A0A0"
              />

              <Text style={styles.label}>Email</Text>
              <TextInput 
                style={styles.input} 
                placeholder="Enter email address" 
                keyboardType="email-address"
                placeholderTextColor="#A0A0A0"
              />

              <Text style={styles.label}>Year of experience</Text>
              <TextInput 
                style={styles.input} 
                placeholder="e.g. 5" 
                keyboardType="numeric"
                placeholderTextColor="#A0A0A0"
              />

              <Text style={styles.label}>Upload your CV</Text>
              <TouchableOpacity style={styles.uploadContainer} activeOpacity={0.6}>
                <MaterialCommunityIcons name="upload-network-outline" size={40} color="#4A7A7C" />
                <Text style={styles.uploadText}>Click to upload or drag and drop</Text>
              </TouchableOpacity>

              {/* FOOTER */}
              <View style={styles.footer}>
                
                <TouchableOpacity
                  style={styles.cancelButton}
                  activeOpacity={0.8}
                  onPress={onClose} 
                >
                  <Text style={styles.cancelButtonText}>Cancel</Text>
                </TouchableOpacity>

                <TouchableOpacity
                  style={styles.flexButton}
                  activeOpacity={0.8}
                  onPress={() => {
                    onClose();     // close modal first
                    onSubmit();    // navigate to another screen
                  }}
                >
                  <LinearGradient
                    colors={['#15A9B2', '#115B60']}
                    start={{ x: 0, y: 0 }}
                    end={{ x: 1, y: 0 }}
                    style={styles.gradientButton}
                  >
                    <Text style={styles.gradientButtonText}>Submit</Text>
                  </LinearGradient>
                </TouchableOpacity>

              </View>
              
            </ScrollView>
          </View>
        </KeyboardAvoidingView>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  overlay: { flex: 1, backgroundColor: 'rgba(0,0,0,0.6)', justifyContent: 'center', alignItems: 'center', padding: 20 },
  modalContainer: { width: '100%', maxWidth: 400 },
  modalCard: { backgroundColor: '#fff', borderRadius: 15, overflow: 'hidden', elevation: 10, shadowColor: '#000', shadowOpacity: 0.25, shadowRadius: 10 },
  header: { backgroundColor: '#043A53', flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', paddingHorizontal: 20, paddingVertical: 15 },
  headerTitle: { color: '#fff', fontSize: 18, fontWeight: 'bold' },
  closeIconButton: { backgroundColor: 'rgba(255,255,255,0.2)', borderRadius: 5, padding: 2 },
  body: { padding: 20, backgroundColor: '#FFFFFF' },
  label: { fontSize: 14, fontWeight: '600', color: '#333', marginBottom: 8 },
  input: { backgroundColor: '#fff', borderRadius: 8, paddingHorizontal: 15, paddingVertical: 12, marginBottom: 20, borderWidth: 1, borderColor: '#E0E0E0', fontSize: 14, color: '#000' },
  uploadContainer: { borderWidth: 1, borderColor: '#B0B0B0', borderStyle: 'dashed', borderRadius: 10, height: 140, justifyContent: 'center', alignItems: 'center', backgroundColor: 'rgba(255,255,255,0.5)', marginBottom: 30 },
  uploadText: { fontSize: 12, color: '#808080', marginTop: 10, textAlign: 'center' },
  footer: { flexDirection: 'row', justifyContent: 'space-between', paddingBottom: 10 },
  cancelButton: { flex: 1, borderWidth: 1, borderColor: '#21818B', borderRadius: 10, paddingVertical: 12, marginRight: 5, alignItems: 'center' },
  cancelButtonText: { color: '#21818B', fontWeight: 'bold', fontSize: 16 },
  flexButton: { flex: 1, marginLeft: 5 },
  gradientButton: { paddingVertical: 12, borderRadius: 10, alignItems: 'center' },
  gradientButtonText: { color: '#fff', fontWeight: 'bold', fontSize: 16 },
});
