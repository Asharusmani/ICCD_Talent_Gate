import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  Image,
  TextInput,
  TouchableOpacity,
  KeyboardAvoidingView,
  Platform,
  Alert,
  ActivityIndicator,
  ScrollView,
} from "react-native";

import { useForm, Controller } from "react-hook-form";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import * as ImagePicker from "expo-image-picker";

/* ------------------ Yup Schema ------------------ */
const schema = yup.object({
  name: yup
    .string()
    .required("Name is required")
    .min(3, "Name must be at least 3 characters")
    .max(50, "Name is too long")
    .matches(/^[a-zA-Z\s]+$/, "Name can only contain letters and spaces"),
  about: yup
    .string()
    .required("About is required")
    .min(10, "Tell us a bit more about yourself")
    .max(150, "About must be under 150 characters"),
});

const EditProfile = () => {
  const [profileImage, setProfileImage] = useState(
    "https://via.placeholder.com/150"
  );
  const [loading, setLoading] = useState(false);

  const {
    control,
    handleSubmit,
    formState: { errors },
    watch,
  } = useForm({
    resolver: yupResolver(schema),
    defaultValues: {
      name: "",
      about: "",
    },
  });

  // Watch the about field for character count
  const aboutValue = watch("about");

  // Image Picker Function
  const pickImage = async () => {
    try {
      // Request permissions
      const { status } =
        await ImagePicker.requestMediaLibraryPermissionsAsync();

      if (status !== "granted") {
        Alert.alert(
          "Permission Required",
          "Sorry, we need camera roll permissions to change your profile photo!"
        );
        return;
      }

      // Launch image picker
      const result = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.Images,
        allowsEditing: true,
        aspect: [1, 1],
        quality: 0.8,
      });

      if (!result.canceled) {
        setProfileImage(result.assets[0].uri);
      }
    } catch (error) {
      Alert.alert("Error", "Failed to pick image. Please try again.");
      console.error("Image picker error:", error);
    }
  };

  // Submit Handler
  const onSubmit = async (data) => {
    setLoading(true);
    try {
      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 2000));

      console.log("Profile Data:", {
        ...data,
        profileImage,
      });

      // 🔥 Replace with actual API call
      // const response = await updateProfile({
      //   name: data.name,
      //   about: data.about,
      //   image: profileImage,
      // });

      Alert.alert("Success", "Profile updated successfully!", [
        {
          text: "OK",
          onPress: () => console.log("Profile updated"),
        },
      ]);
    } catch (error) {
      Alert.alert(
        "Error",
        "Failed to update profile. Please try again.",
        [{ text: "OK" }]
      );
      console.error("Update error:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === "ios" ? "padding" : "height"}
      style={styles.container}
    >
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.scrollContent}
      >
        {/* Profile Image */}
        <View style={styles.imageContainer}>
          <View style={styles.imageWrapper}>
            <Image
              source={{ uri: profileImage }}
              style={styles.profileImage}
            />
          </View>
          <TouchableOpacity
            onPress={pickImage}
            disabled={loading}
            accessible={true}
            accessibilityLabel="Change profile photo"
            accessibilityRole="button"
          >
            <Text style={styles.changePhoto}>Change Photo</Text>
          </TouchableOpacity>
        </View>

        {/* Name Field */}
        <View style={styles.inputGroup}>
          <Text style={styles.label}>Name</Text>
          <Controller
            control={control}
            name="name"
            render={({ field: { onChange, value, onBlur } }) => (
              <TextInput
                style={[styles.input, errors.name && styles.errorInput]}
                placeholder="Enter your name"
                placeholderTextColor="#999"
                value={value}
                onChangeText={onChange}
                onBlur={onBlur}
                editable={!loading}
                accessible={true}
                accessibilityLabel="Name input"
                accessibilityHint="Enter your full name"
              />
            )}
          />
          {errors.name && (
            <Text style={styles.errorText}>{errors.name.message}</Text>
          )}
        </View>

        {/* About Field */}
        <View style={styles.inputGroup}>
          <View style={styles.aboutHeader}>
            <Text style={styles.label}>About</Text>
            <Text
              style={[
                styles.charCount,
                (aboutValue?.length || 0) > 150 && styles.charCountError,
              ]}
            >
              {aboutValue?.length || 0}/150
            </Text>
          </View>
          <Controller
            control={control}
            name="about"
            render={({ field: { onChange, value, onBlur } }) => (
              <TextInput
                style={[
                  styles.input,
                  styles.aboutInput,
                  errors.about && styles.errorInput,
                ]}
                placeholder="Tell something about yourself"
                placeholderTextColor="#999"
                multiline
                numberOfLines={4}
                maxLength={150}
                value={value}
                onChangeText={onChange}
                onBlur={onBlur}
                editable={!loading}
                accessible={true}
                accessibilityLabel="About input"
                accessibilityHint="Enter a brief description about yourself"
              />
            )}
          />
          {errors.about && (
            <Text style={styles.errorText}>{errors.about.message}</Text>
          )}
        </View>

        {/* Save Button */}
        <TouchableOpacity
          style={[styles.saveButton, loading && styles.saveButtonDisabled]}
          onPress={handleSubmit(onSubmit)}
          disabled={loading}
          accessible={true}
          accessibilityLabel="Save changes"
          accessibilityRole="button"
        >
          {loading ? (
            <ActivityIndicator color="#fff" />
          ) : (
            <Text style={styles.saveText}>Save Changes</Text>
          )}
        </TouchableOpacity>
      </ScrollView>
    </KeyboardAvoidingView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F4F4F4'
  },

  scrollContent: {
    padding: 20,
    paddingBottom: 40,
  },

  imageContainer: {
    alignItems: "center",
    marginBottom: 30,
    marginTop: 10,
  },

  imageWrapper: {
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 5,
    borderRadius: 60,
    marginBottom: 12,
  },

  profileImage: {
    width: 120,
    height: 120,
    borderRadius: 60,
    borderWidth: 3,
    borderColor: "#fff",
  },

  changePhoto: {
    color: "#007AFF",
    fontSize: 16,
    fontWeight: "600",
  },

  inputGroup: {
    marginBottom: 24,
  },

  label: {
    fontSize: 14,
    color: "#333",
    marginBottom: 8,
    fontWeight: "600",
  },

  aboutHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 8,
  },

  charCount: {
    fontSize: 12,
    color: "#666",
  },

  charCountError: {
    color: "#FF3B30",
    fontWeight: "600",
  },

  input: {
    borderWidth: 1,
    borderColor: "#E5E5E5",
    borderRadius: 10,
    padding: 14,
    fontSize: 16,
    backgroundColor: "#FAFAFA",
    color: "#333",
  },

  aboutInput: {
    height: 120,
    textAlignVertical: "top",
    paddingTop: 14,
  },

  saveButton: {
    backgroundColor: "#007AFF",
    padding: 16,
    borderRadius: 12,
    alignItems: "center",
    marginTop: 10,
    shadowColor: "#007AFF",
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 5,
  },

  saveButtonDisabled: {
    backgroundColor: "#B0B0B0",
    shadowOpacity: 0,
    elevation: 0,
  },

  saveText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "700",
  },

  errorText: {
    color: "#FF3B30",
    marginTop: 6,
    fontSize: 13,
    fontWeight: "500",
  },

  errorInput: {
    borderColor: "#FF3B30",
    borderWidth: 1.5,
    backgroundColor: "#FFF5F5",
  },
});

export default EditProfile;