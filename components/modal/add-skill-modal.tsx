import { LinearGradient } from "expo-linear-gradient";
import { Modal, StyleSheet, Text, TextInput, TouchableOpacity, View, KeyboardAvoidingView, Platform } from "react-native";
import { Controller, useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";

interface SkillFormData {
  skillName: string;
}

interface AddSkillModalProps {
  visible: boolean;
  onClose: () => void;
  onAdd: (data: SkillFormData) => void;
}

const skillSchema = yup.object().shape({
  skillName: yup
    .string()
    .required("Skill name is required")
    .min(2, "Skill name must be at least 2 characters")
    .max(50, "Skill name must not exceed 50 characters")
    .matches(
      /^[a-zA-Z0-9\s\+\#\.\-\/]+$/,
      "Skill name can only contain letters, numbers, and common symbols (+, #, ., -, /)"
    ),
});

export default function AddSkillModal({ visible, onClose, onAdd }: AddSkillModalProps) {
  const {
    control,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<SkillFormData>({
    resolver: yupResolver(skillSchema),
    defaultValues: {
      skillName: "",
    },
  });

  const onSubmit = (data: SkillFormData) => {
    const trimmedData = {
      skillName: data.skillName.trim(),
    };
    onAdd(trimmedData);
    reset();
    onClose();
  };

  const handleClose = () => {
    reset();
    onClose();
  };

  return (
    <Modal 
      visible={visible} 
      transparent 
      animationType="slide" 
      onRequestClose={handleClose}
    >
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
              <Text style={styles.iconText}>⚡</Text>
            </View>
            <Text style={styles.title}>Add Skill</Text>
            <Text style={styles.subtitle}>Build your expertise profile</Text>
          </View>

          <Controller
            control={control}
            name="skillName"
            render={({ field: { onChange, onBlur, value } }) => (
              <View style={styles.inputWrapper}>
                <Text style={styles.label}>Skill Name</Text>
                <View style={[styles.inputContainer, errors.skillName && styles.inputContainerError]}>
                  <TextInput 
                    placeholder="e.g. Flutter, UI Design, Python" 
                    placeholderTextColor="#8A96A0" 
                    style={styles.input}
                    onBlur={onBlur}
                    onChangeText={onChange}
                    value={value}
                    autoFocus
                  />
                </View>
                {errors.skillName && (
                  <Text style={styles.errorText}>⚠ {errors.skillName.message}</Text>
                )}
              </View>
            )}
          />

          <TouchableOpacity activeOpacity={0.8} onPress={handleSubmit(onSubmit)}>
            <LinearGradient
              colors={["#15A9B2", "#17747A"]}
              start={{ x: 0, y: 0 }}
              end={{ x: 1, y: 0 }}
              style={styles.btn}
            >
              <Text style={styles.btnText}>Add Skill</Text>
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
    paddingTop: 8,
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
    marginBottom: 28,
  },
  iconContainer: {
    width: 60,
    height: 60,
    borderRadius: 30,
    backgroundColor: "#FFF4E6",
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
  inputWrapper: {
    marginBottom: 24,
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