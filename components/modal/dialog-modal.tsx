import { Ionicons } from '@expo/vector-icons';
import { router } from 'expo-router';
import { StyleSheet, Text, TouchableOpacity, View, Modal } from 'react-native';

interface modal {
  icon: React.ReactNode,
  title: string;
  subtitle: string;
  confirmText: string;
  onConfirm?: ()=> void;
  onClose: ()=> void
}
export default function DialogModal({
  icon,
  title,
  subtitle,
  confirmText,
  onConfirm,
  onClose,
}: modal) {
  return (
    <Modal transparent visible={true} animationType="fade" onRequestClose={onClose}>
      <View style={styles.backdrop}>
        <View style={styles.card}>
          {/* Close */}
          <TouchableOpacity style={styles.closeIcon} onPress={onClose}>
            <Ionicons name="close" size={22} color="#6B7280" />
          </TouchableOpacity>

          {/* Icon */}
          {icon}

          {/* Text */}
          <Text style={styles.title}>{title}</Text>
          <Text style={styles.subtitle}>{subtitle}</Text>

          {/* Buttons */}
          <View style={styles.row}>
            <TouchableOpacity style={styles.outlineBtn} onPress={onClose}>
              <Text>Cancel</Text>
            </TouchableOpacity>

            <TouchableOpacity style={styles.primaryBtn} onPress={onConfirm}>
              <Text style={{ color: '#fff' }}>{confirmText}</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </Modal>
  );
}

const styles = StyleSheet.create({
  card: {
    // flex:1,
    backgroundColor: '#fff',
    width: '90%',
    borderRadius: 16,
    padding: 20,
    alignItems: 'center',
    position: 'relative',
  },
  closeIcon: {
    position: 'absolute',
    top: 12,
    right: 12,
    padding: 4,
  },
  title: {
    fontSize: 16,
    fontWeight: '600',
    marginTop: 12,
  },
  subtitle: {
    fontSize: 12,
    color: '#6B7280',
    textAlign: 'center',
    marginVertical: 10,
  },
  row: {
    width: '100%',
    flexDirection: 'row',
    marginTop: 14,
    // backgroundColor: "red",
    justifyContent: "center"
  },
  outlineBtn: {
    // width: '100%',
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#CBD5E1',
    paddingVertical: 10,
    paddingHorizontal: 16,
    borderRadius: 10,
    marginRight: 10,
  },
  primaryBtn: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 1,
    backgroundColor: '#043A53',
    paddingVertical: 10,
    paddingHorizontal: 16,
    borderRadius: 10,
    marginRight: 10
  },
  backdrop: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.4)',
    justifyContent: 'center',
    alignItems: 'center',
  },
});


