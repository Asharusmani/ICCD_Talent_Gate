import React from "react";
import { Modal, StyleSheet, Text, TextInput, TouchableOpacity, View } from "react-native";
import { LinearGradient } from "expo-linear-gradient";

export default function AddCertificationModal({ visible, onClose }) {
  return (
    <Modal visible={visible} transparent animationType="slide" onRequestClose={onClose}>
      <View style={styles.overlay}>
        <View style={styles.modal}>
          <Text style={styles.title}>Add Certification</Text>

          <View style={styles.inputContainer}>
            <Text style={styles.label}>Certification Name</Text>
            <TextInput 
                placeholder="e.g. Google UX Design" 
                placeholderTextColor="#8A96A0" 
                style={styles.input} 
            />
          </View>

          <View style={styles.inputContainer}>
            <Text style={styles.label}>Issued By</Text>
            <TextInput 
                placeholder="e.g. Coursera / Google" 
                placeholderTextColor="#8A96A0" 
                style={styles.input} 
            />
          </View>

          <TouchableOpacity activeOpacity={0.8} onPress={onClose}>
            <LinearGradient
              colors={["#15A9B2", "#17747A"]}
              start={{ x: 0, y: 0 }}
              end={{ x: 1, y: 0 }}
              style={styles.btn}
            >
              <Text style={styles.btnText}>Save Certification</Text>
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
    backgroundColor: "rgba(0,0,0,0.5)", // Dimmed background
    justifyContent: "flex-end", // Positions modal at bottom
  },
  modal: {
    backgroundColor: "#fff",
    borderTopLeftRadius: 30,
    borderTopRightRadius: 30,
    padding: 25,
    paddingBottom: 40,
    elevation: 20,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: -10 },
    shadowOpacity: 0.1,
    shadowRadius: 10,
  },
  title: {
    fontSize: 20,
    fontWeight: "700",
    color: "#043A53",
    marginBottom: 20,
    textAlign: "center",
  },
  inputContainer: {
    marginBottom: 16,
  },
  label: {
    fontSize: 14,
    fontWeight: "600",
    color: "#043A53",
    marginBottom: 6,
  },
  input: {
    borderWidth: 1,
    borderColor: "#043A53",
    borderRadius: 12,
    paddingHorizontal: 15,
    paddingVertical: 12,
    fontSize: 15,
    color: "#043A53",
  },
  btn: {
    borderRadius: 12,
    paddingVertical: 14,
    alignItems: "center",
    marginTop: 10,
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