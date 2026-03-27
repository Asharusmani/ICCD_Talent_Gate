import { LinearGradient } from "expo-linear-gradient";
import { Modal, StyleSheet, Text, TextInput, TouchableOpacity, View } from "react-native";

export default function AddEducationModal({ visible, onClose }) {
  return (
    <Modal
      transparent
      animationType="slide"
      visible={visible}
      onRequestClose={onClose}
    >
      <View style={styles.overlay}>
        <View style={styles.container}>
          
          <Text style={styles.title}>Education</Text>

          <TextInput
            placeholder="College / University Country"
            placeholderTextColor="#8A96A0"
            style={styles.input}
          />

          <TextInput
            placeholder="College / University Name"
            placeholderTextColor="#8A96A0"
            style={styles.input}
          />

          <View style={styles.row}>
            <TextInput
              placeholder="Degree"
              placeholderTextColor="#8A96A0"
              style={[styles.input, { flex: 1, marginRight: 8 }]}
            />
            <TextInput
              placeholder="Major"
              placeholderTextColor="#8A96A0"
              style={[styles.input, { flex: 1 }]}
            />
          </View>

          <TextInput
            placeholder="Year of Graduation"
            placeholderTextColor="#8A96A0"
            keyboardType="numeric"
            style={styles.input}
          />

          <TouchableOpacity onPress={onClose}>
            <LinearGradient
              colors={["#15A9B2", "#17747A"]}
              style={styles.button}
            >
              <Text style={styles.buttonText}>Add Education</Text>
            </LinearGradient>
          </TouchableOpacity>
          <TouchableOpacity style={styles.cancelBtn} onPress={onClose}>
            <Text style={styles.cancelText}>Cancel</Text>
          </TouchableOpacity>

        </View>
      </View>
    </Modal>
  );
}

const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    backgroundColor: "rgba(0,0,0,0.4)",
    justifyContent: "flex-end",
  },
  container: {
    backgroundColor: "#fff",
    padding: 20,
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
  },
  title: {
    fontSize: 18,
    fontWeight: "700",
    color: "#043A53",
    marginBottom: 15,
  },
  input: {
    borderWidth: 1,
    borderColor: "#043A53",
    borderRadius: 10,
    paddingHorizontal: 12,
    paddingVertical: 12,
    marginBottom: 12,
    color: "#043A53",
  },
  row: {
    flexDirection: "row",
  },
  button: {
    paddingVertical: 14,
    borderRadius: 10,
    alignItems: "center",
    marginTop: 10,
  },
  buttonText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "600",
  },
  btnText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "700",
  },
  cancelBtn: {
    marginTop: 15,
    alignItems: "center",
  },
  cancelText: {
    color: "#8A96A0",
    fontSize: 14,
    fontWeight: "600",
  },
});
