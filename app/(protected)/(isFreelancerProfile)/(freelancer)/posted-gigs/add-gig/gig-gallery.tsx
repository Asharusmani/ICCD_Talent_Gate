import { Ionicons } from "@expo/vector-icons";
import {
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  Image,
  Alert,
  ScrollView,
  ActivityIndicator,
  Platform,
} from "react-native";
import { useState } from "react";
import { router } from "expo-router";
import { useAddGigs } from "@/api/client/gigs";
import { useAuth } from "@/utils/auth-context";
import * as ImagePicker from "expo-image-picker";
import { useForm, Controller } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import GigHeader from "@/components/header/gig-header";
import { resetGig } from "@/store/slices/gig-detail-slice";
import { useAppDispatch, useAppSelector } from "@/hooks/use-apply-project";
import { GallerySchema } from "@/components/schemas/schema";
import { LinearGradient } from "expo-linear-gradient";
import { useSafeAreaInsets } from "react-native-safe-area-context";

interface GalleryImage {
  uri: string;
  fileName?: string;
  mimeType?: string;
}

interface GalleryFormData {
  images: (GalleryImage | null)[];
}

export default function GalleryScreen() {
  const dispatch  = useAppDispatch();
  const { freelancer } = useAuth();
  const insets    = useSafeAreaInsets();
  const [loading, setLoading] = useState(false);
  const gigsData  = useAppSelector(state => state.gig.gig);

  const {
    control,
    handleSubmit,
    setValue,
    watch,
    formState: { errors, isValid },
  } = useForm<GalleryFormData>({
    resolver: yupResolver(GallerySchema),
    mode: "onChange",
    defaultValues: { images: [null, null, null] },
  });

  const images        = watch("images");
  const uploadedCount = images.filter((img) => img !== null).length;

  const pickImage = async (index: number) => {
    try {
      if (Platform.OS !== 'web') {
        const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
        if (status !== 'granted') {
          Alert.alert('Permission Required', 'Sorry, we need camera roll permissions to upload images.');
          return;
        }
      }
      setLoading(true);
      const result = await ImagePicker.launchImageLibraryAsync({ mediaTypes: ['images'] });
      if (!result.canceled && result.assets[0]) {
        const { uri, fileName, mimeType } = result.assets[0];
        const newImages = [...images];
        newImages[index] = { uri, fileName, mimeType };
        setValue("images", newImages, { shouldValidate: true });
      }
    } catch (error) {
      Alert.alert("Error", "Failed to pick image. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const removeImage = (index: number) => {
    const newImages = [...images];
    newImages[index] = null;
    setValue("images", newImages, { shouldValidate: true });
  };

  const { addGigs } = useAddGigs();

  const onSubmit = (data: GalleryFormData) => {
    const { images } = data;
    const { gigsTitle, category, subCategory, description, packages } = gigsData;
    const formData = new FormData();
    formData.append('gigsTitle', gigsTitle);
    formData.append('category', category);
    formData.append('subCategory', subCategory);
    formData.append('description', description);
    formData.append('packages', packages);
    formData.append("freelancerId", freelancer.id);
    for (const image of images) {
      if (image !== null) {
        formData.append('files', {
          uri: image.uri,
          type: image.mimeType || 'application/pdf',
          name: image.fileName || 'document.pdf',
        } as any);
      }
    }
    addGigs(formData);
  };

  return (
    <LinearGradient
      colors={['#f0f9ff', '#e0f2fe', '#bae6fd', '#7dd3fc']}
      style={styles.gradient}
      start={{ x: 0, y: 0 }}
      end={{ x: 0.6, y: 1 }}
    >
      <ScrollView
        contentContainerStyle={[styles.scrollContent, { paddingTop: insets.top + 16 }]}
        showsVerticalScrollIndicator={false}
      >
        <View style={styles.container}>
          <View style={styles.card}>
            <GigHeader title="Gallery" step="4" icon={<Ionicons name="document-text" size={24} color="#fff" />} />
            <View style={styles.cardBody}>
              <Text style={styles.title}>Showcase Your Services</Text>
              <Text style={styles.subtitle}>
                Upload high-quality images to attract more buyers. You can upload up to 3 images.
              </Text>

              {/* Image Counter */}
              <View style={styles.counterContainer}>
                <Ionicons name="images-outline" size={20} color="#0d9488" />
                <Text style={styles.counterText}>{uploadedCount} of 3 images uploaded</Text>
              </View>

              {/* Image Upload Grid */}
              <Controller
                control={control}
                name="images"
                render={({ field: { value = [] } }) => (
                  <View style={styles.imageGrid}>
                    {value?.map((image, index) => (
                      <View key={index} style={styles.imageWrapper}>
                        <TouchableOpacity
                          style={[
                            styles.imageBox,
                            image && styles.imageBoxFilled,
                            errors.images && !image && styles.imageBoxError,
                          ]}
                          onPress={() => pickImage(index)}
                          disabled={loading}
                          activeOpacity={0.7}
                        >
                          {image ? (
                            <View style={styles.imageContainer}>
                              <Image source={{ uri: image.uri }} style={styles.image} resizeMode="cover" />
                              <View style={styles.imageOverlay}>
                                <TouchableOpacity style={styles.changeButton} onPress={() => pickImage(index)}>
                                  <Ionicons name="camera" size={16} color="#fff" />
                                  <Text style={styles.changeButtonText}>Change</Text>
                                </TouchableOpacity>
                              </View>
                            </View>
                          ) : (
                            <View style={styles.uploadPrompt}>
                              <View style={styles.uploadIconContainer}>
                                <Ionicons name="cloud-upload-outline" size={40} color="#0d9488" />
                              </View>
                              <Text style={styles.uploadText}>Upload Photo</Text>
                            </View>
                          )}
                        </TouchableOpacity>
                        {image && (
                          <TouchableOpacity style={styles.removeButton} onPress={() => removeImage(index)}>
                            <Ionicons name="close-circle" size={28} color="#EF4444" />
                          </TouchableOpacity>
                        )}
                      </View>
                    ))}
                  </View>
                )}
              />

              {errors.images && (
                <View style={styles.errorContainer}>
                  <Ionicons name="alert-circle" size={16} color="#EF4444" />
                  <Text style={styles.errorText}>{errors.images.message}</Text>
                </View>
              )}

              <TouchableOpacity
                onPress={handleSubmit(onSubmit)}
                style={[styles.button, isValid && styles.buttonActive]}
                disabled={!isValid || loading}
              >
                {loading ? (
                  <ActivityIndicator color="#fff" />
                ) : (
                  <>
                    <Text style={styles.buttonText}>Save & Continue</Text>
                    <Ionicons name="arrow-forward" size={20} color="#fff" />
                  </>
                )}
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </ScrollView>
    </LinearGradient>
  );
}

const styles = StyleSheet.create({
  gradient: {
    flex: 1,
  },
  scrollContent: {
    flexGrow: 1,
    paddingBottom: 30,
  },
  container: {
    flex: 1,
    padding: 16,
  },
  card: {
    backgroundColor: "#fff",
    borderRadius: 16,
    overflow: "hidden",
    elevation: 4,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
  },
  cardBody: { padding: 20 },
  title: { fontSize: 22, fontWeight: "700", color: "#1F2937", marginBottom: 8 },
  subtitle: { fontSize: 14, color: "#6B7280", lineHeight: 20, marginBottom: 20 },
  counterContainer: {
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
    backgroundColor: "#f0f9ff",
    padding: 12,
    borderRadius: 8,
    marginBottom: 20,
    borderLeftWidth: 3,
    borderLeftColor: "#0d9488",
  },
  counterText: { fontSize: 14, color: "#0d9488", fontWeight: "600" },
  imageGrid: { flexDirection: "row", flexWrap: "wrap", gap: 10, marginBottom: 16 },
  imageWrapper: { width: "31%", aspectRatio: 1, position: "relative" },
  imageBox: {
    width: "100%",
    height: "100%",
    backgroundColor: "#F9FAFB",
    borderRadius: 12,
    borderWidth: 2,
    borderColor: "#E5E7EB",
    borderStyle: "dashed",
    alignItems: "center",
    justifyContent: "center",
    overflow: "hidden",
  },
  imageBoxFilled: { borderStyle: "solid", borderColor: "#10B981", borderWidth: 2 },
  imageBoxError: { borderColor: "#EF4444" },
  uploadPrompt: { alignItems: "center", justifyContent: "center", padding: 8 },
  uploadIconContainer: { marginBottom: 8 },
  uploadText: { fontSize: 12, color: "#0d9488", fontWeight: "600", marginBottom: 2, textAlign: "center" },
  imageContainer: { width: "100%", height: "100%", position: "relative" },
  image: { width: "100%", height: "100%" },
  imageOverlay: {
    position: "absolute",
    bottom: 0,
    left: 0,
    right: 0,
    backgroundColor: "rgba(0,0,0,0.6)",
    padding: 6,
    alignItems: "center",
  },
  changeButton: { flexDirection: "row", alignItems: "center", gap: 4 },
  changeButtonText: { color: "#fff", fontSize: 10, fontWeight: "600" },
  removeButton: {
    position: "absolute",
    top: -10,
    right: -10,
    backgroundColor: "#fff",
    borderRadius: 14,
    elevation: 3,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.2,
    shadowRadius: 2,
  },
  errorContainer: {
    flexDirection: "row",
    alignItems: "center",
    gap: 6,
    backgroundColor: "#FEF2F2",
    padding: 12,
    borderRadius: 8,
    marginBottom: 16,
    borderLeftWidth: 3,
    borderLeftColor: "#EF4444",
  },
  errorText: { color: "#EF4444", fontSize: 13, fontWeight: "500", flex: 1 },
  button: {
    backgroundColor: "#0d9488",
    padding: 16,
    borderRadius: 10,
    alignItems: "center",
    justifyContent: "center",
    flexDirection: "row",
    gap: 8,
    opacity: 0.5,
    elevation: 2,
    shadowColor: "#0d9488",
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.2,
    shadowRadius: 2,
  },
  buttonActive: { opacity: 1 },
  buttonText: { color: "#fff", fontWeight: "700", fontSize: 16 },
});