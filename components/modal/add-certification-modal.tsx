import React from "react";
import { Modal, StyleSheet, Text, TextInput, TouchableOpacity, View, KeyboardAvoidingView, Platform } from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import { Controller, useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";

interface CertificationFormData {
  certificationName: string;
  issuedBy: string;
}

interface AddCertificationModalProps {
  visible: boolean;
  onClose: () => void;
  onAdd: (data: CertificationFormData) => void;
}

const certificationSchema = yup.object().shape({
  certificationName: yup
    .string()
    .required("Certification name is required")
    .min(3, "Certification name must be at least 3 characters")
    .max(100, "Certification name must not exceed 100 characters"),
  issuedBy: yup
    .string()
    .required("Issuer is required")
    .min(2, "Issuer must be at least 2 characters")
    .max(100, "Issuer must not exceed 100 characters"),
});

export default function AddCertificationModal({ visible, onClose, onAdd }: AddCertificationModalProps) {
  const {
    control,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<CertificationFormData>({
    resolver: yupResolver(certificationSchema),
    defaultValues: {
      certificationName: "",
      issuedBy: "",
    },
  });

  const onSubmit = (data: CertificationFormData) => {
    onAdd(data);
    reset();
    onClose();
  };

  const handleClose = () => {
    reset();
    onClose();
  };

  return (
    <Modal visible={visible} transparent animationType="slide" onRequestClose={handleClose}>
      <KeyboardAvoidingView 
        behavior={Platform.OS === "ios" ? "padding" : "height"}
        style={styles.overlay}
      >
        <TouchableOpacity 
          style={styles.backdrop} 
          activeOpacity={1} 
          onPress={handleClose}
        />
        
        <View style={styles.modal}>
          {/* Handle Bar */}
          <View style={styles.handleBar} />
          
          <View style={styles.header}>
            <View style={styles.iconContainer}>
              <Text style={styles.iconText}>🎓</Text>
            </View>
            <Text style={styles.title}>Add Certification</Text>
            <Text style={styles.subtitle}>Showcase your achievements</Text>
          </View>

          <View style={styles.formSection}>
            <Controller
              control={control}
              name="certificationName"
              render={({ field: { onChange, onBlur, value } }) => (
                <View style={styles.inputWrapper}>
                  <Text style={styles.label}>Certification Name</Text>
                  <View style={[styles.inputContainer, errors.certificationName && styles.inputContainerError]}>
                    <TextInput
                      placeholder="e.g. Google UX Design"
                      placeholderTextColor="#8A96A0"
                      style={styles.input}
                      onBlur={onBlur}
                      onChangeText={onChange}
                      value={value}
                    />
                  </View>
                  {errors.certificationName && (
                    <Text style={styles.errorText}>⚠ {errors.certificationName.message}</Text>
                  )}
                </View>
              )}
            />

            <Controller
              control={control}
              name="issuedBy"
              render={({ field: { onChange, onBlur, value } }) => (
                <View style={styles.inputWrapper}>
                  <Text style={styles.label}>Issued By</Text>
                  <View style={[styles.inputContainer, errors.issuedBy && styles.inputContainerError]}>
                    <TextInput
                      placeholder="e.g. Coursera / Google"
                      placeholderTextColor="#8A96A0"
                      style={styles.input}
                      onBlur={onBlur}
                      onChangeText={onChange}
                      value={value}
                    />
                  </View>
                  {errors.issuedBy && (
                    <Text style={styles.errorText}>⚠ {errors.issuedBy.message}</Text>
                  )}
                </View>
              )}
            />
          </View>

          <TouchableOpacity activeOpacity={0.8} onPress={handleSubmit(onSubmit)}>
            <LinearGradient
              colors={["#15A9B2", "#17747A"]}
              start={{ x: 0, y: 0 }}
              end={{ x: 1, y: 0 }}
              style={styles.btn}
            >
              <Text style={styles.btnText}>Save Certification</Text>
            </LinearGradient>
          </TouchableOpacity>

          <TouchableOpacity style={styles.cancelBtn} onPress={handleClose}>
            <Text style={styles.cancelText}>Cancel</Text>
          </TouchableOpacity>
        </View>
      </KeyboardAvoidingView>
    </Modal>
  );
}

const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    backgroundColor: "rgba(0, 0, 0, 0.6)",
    justifyContent: "flex-end",
  },
  backdrop: {
    flex: 1,
  },
  modal: {
    backgroundColor: "#FFFFFF",
    borderTopLeftRadius: 30,
    borderTopRightRadius: 30,
    paddingHorizontal: 24,
    paddingBottom: Platform.OS === "ios" ? 40 : 24,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: -4 },
    shadowOpacity: 0.15,
    shadowRadius: 12,
    elevation: 20,
  },
  handleBar: {
    width: 40,
    height: 4,
    backgroundColor: "#E0E0E0",
    borderRadius: 2,
    alignSelf: "center",
    marginTop: 12,
    marginBottom: 20,
  },
  header: {
    alignItems: "center",
    marginBottom: 24,
  },
  iconContainer: {
    width: 60,
    height: 60,
    borderRadius: 30,
    backgroundColor: "#E8F8F9",
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 12,
  },
  iconText: {
    fontSize: 28,
  },
  title: {
    fontSize: 24,
    fontWeight: "700",
    color: "#043A53",
    marginBottom: 6,
  },
  subtitle: {
    fontSize: 14,
    color: "#6B7280",
  },
  formSection: {
    gap: 16,
    marginBottom: 20,
  },
  inputWrapper: {
    marginBottom: 4,
  },
  label: {
    fontSize: 14,
    fontWeight: "600",
    color: "#043A53",
    marginBottom: 8,
  },
  inputContainer: {
    borderWidth: 1.5,
    borderColor: "#D1D5DB",
    borderRadius: 12,
    backgroundColor: "#F9FAFB",
  },
  inputContainerError: {
    borderColor: "#FF3B30",
    backgroundColor: "#FFF5F5",
  },
  input: {
    paddingHorizontal: 16,
    paddingVertical: 14,
    fontSize: 15,
    color: "#043A53",
  },
  errorText: {
    color: "#FF3B30",
    fontSize: 12,
    marginTop: 6,
    marginLeft: 4,
  },
  btn: {
    borderRadius: 12,
    paddingVertical: 16,
    alignItems: "center",
    shadowColor: "#15A9B2",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 6,
  },
  btnText: {
    color: "#FFFFFF",
    fontSize: 16,
    fontWeight: "700",
    letterSpacing: 0.5,
  },
  cancelBtn: {
    marginTop: 16,
    paddingVertical: 12,
    alignItems: "center",
  },
  cancelText: {
    color: "#6B7280",
    fontSize: 15,
    fontWeight: "600",
  },
});