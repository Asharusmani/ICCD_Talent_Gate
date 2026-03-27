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
  Platform
} from "react-native";
import { useEffect, useState } from "react";
import * as ImagePicker from "expo-image-picker";
import { useForm, Controller } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import GigHeader from "@/components/header/gig-header";
import { useAppSelector } from "@/hooks/use-apply-project";
import { resetGig } from "@/store/slices/gig-detail-slice";
import { router, useLocalSearchParams } from "expo-router";
import { useAppDispatch } from "@/hooks/use-apply-project";
import { SafeAreaView } from "react-native-safe-area-context";
import { GalleryEditSchema } from "@/components/schemas/schema";
import { useGetGigsFiles, useEditGigsFiles } from "@/api/client/gigs";

interface GalleryImage {
  uri: string;
  fileName?: string;
  mimeType?: string;
  fileUrl?: string;
  fileKey?: string;
}

interface GalleryFormData {
  images: (GalleryImage | null)[];
}

export default function GalleryScreen() {
  const dispatch = useAppDispatch();
  const { id } = useLocalSearchParams();
  const [loading, setLoading] = useState(false);
  const [fileKey, setFileKey] = useState<string[]>([]);
  
  const gigsData = useAppSelector(state => state.gig.gig);
  const { data: gigsFilesData } = useGetGigsFiles(id);
  const { editGigsFiles, isPending: editGigIsPending } = useEditGigsFiles(id);

  const {
    control,
    handleSubmit,
    setValue,
    watch,
    reset,
    formState: { errors, isValid },
  } = useForm<GalleryFormData>({
    resolver: yupResolver(GalleryEditSchema),
    mode: "onChange",
    defaultValues: {
      images: [null, null, null],
    },
  });

  // Ensure images is always an array to avoid map errors
  const images = watch("images") || [null, null, null];
  const uploadedCount = images.filter((img) => img !== null).length;

  // Sync API data to Form State
  useEffect(() => {
    if (gigsFilesData && Array.isArray(gigsFilesData)) {
      const initialImages = [null, null, null];
      gigsFilesData.forEach((item, index) => {
        if (index < 3) initialImages[index] = item;
      });
      reset({ images: initialImages });
    }
  }, [gigsFilesData, reset]);

  const pickImage = async (index: number) => {
    try {
      const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
      if (status !== 'granted') {
        Alert.alert('Permission Required', 'We need camera roll permissions to upload images.');
        return;
      }

      setLoading(true);
      const result = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ['images'],
        quality: 0.8,
      });

      if (!result.canceled && result.assets[0]) {
        const { uri, fileName, mimeType } = result.assets[0];
        const newImages = [...images];
        newImages[index] = { uri, fileName, mimeType };
        setValue("images", newImages, { shouldValidate: true });
      }
    } catch (error) {
      Alert.alert("Error", "Failed to pick image.");
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  const removeImage = (index: number, existingFileKey: string | null) => {
    if (existingFileKey) {
      setFileKey(prev => [...prev, existingFileKey]);
    }
    const newImages = [...images];
    newImages[index] = null;
    setValue("images", newImages, { shouldValidate: true });
  };

  const onSubmit = (formDataValues: GalleryFormData) => {
    const { images: finalImages } = formDataValues;
    const { gigsTitle, category, subCategory, description, packages } = gigsData;

    const formData = new FormData();
    formData.append('gigsTitle', gigsTitle);
    formData.append('category', category);
    formData.append('subCategory', subCategory);
    formData.append('description', description);
    formData.append('packages', packages);

    if (fileKey.length > 0) {
      formData.append('delFilesKey', JSON.stringify(fileKey));
    }

    finalImages.forEach((image) => {
      if (image && image.uri) {
        // Only append if it's a new local image (has uri but no fileUrl)
        // If it has fileUrl, it's already on the server
        if (!image.fileUrl) {
          formData.append('files', {
            uri: image.uri,
            type: image.mimeType || 'image/jpeg',
            name: image.fileName || `photo_${Date.now()}.jpg`,
          } as any);
        }
      }
    });

    editGigsFiles(formData);
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <ScrollView contentContainerStyle={styles.scrollContent} showsVerticalScrollIndicator={false}>
        <View style={styles.container}>
          <View style={styles.card}>
            <GigHeader title="Gallery" step="4" icon={<Ionicons name="images" size={24} color="#fff" />} />
            
            <View style={styles.cardBody}>
              <Text style={styles.title}>Showcase Your Services</Text>
              <Text style={styles.subtitle}>Upload high-quality images to attract buyers (Max 3).</Text>

              <View style={styles.counterContainer}>
                <Ionicons name="images-outline" size={20} color="#043A53" />
                <Text style={styles.counterText}>{uploadedCount} of 3 images uploaded</Text>
              </View>

              <Controller
                control={control}
                name="images"
                render={({ field: { value } }) => (
                  <View style={styles.imageGrid}>
                    {(value || [null, null, null]).map((image, index) => (
                      <View key={index} style={styles.imageWrapper}>
                        <TouchableOpacity
                          style={[
                            styles.imageBox,
                            image && styles.imageBoxFilled,
                            errors.images && !image && styles.imageBoxError,
                          ]}
                          onPress={() => pickImage(index)}
                          disabled={loading}
                        >
                          {image ? (
                            <View style={styles.imageContainer}>
                              <Image
                                source={{ uri: image.fileUrl || image.uri }}
                                style={styles.image}
                                resizeMode="cover"
                              />
                              <View style={styles.imageOverlay}>
                                <View style={styles.changeButton}>
                                  <Ionicons name="camera" size={16} color="#fff" />
                                  <Text style={styles.changeButtonText}>Change</Text>
                                </View>
                              </View>
                            </View>
                          ) : (
                            <View style={styles.uploadPrompt}>
                              <Ionicons name="cloud-upload-outline" size={32} color="#043A53" />
                              <Text style={styles.uploadText}>Upload</Text>
                            </View>
                          )}
                        </TouchableOpacity>

                        {image && (
                          <TouchableOpacity
                            style={styles.removeButton}
                            onPress={() => removeImage(index, image.fileKey || null)}
                          >
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
                style={[styles.button, isValid && !editGigIsPending && styles.buttonActive]}
                disabled={!isValid || editGigIsPending}
              >
                {editGigIsPending ? (
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
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: { flex: 1, backgroundColor: '#F4F4F4' },
  scrollContent: { flexGrow: 1, paddingBottom: 30 },
  container: { flex: 1, padding: 16 },
  card: { backgroundColor: "#fff", borderRadius: 16, overflow: "hidden", elevation: 4, shadowColor: "#000", shadowOffset: { width: 0, height: 2 }, shadowOpacity: 0.1, shadowRadius: 8 },
  cardBody: { padding: 20 },
  title: { fontSize: 22, fontWeight: "700", color: "#1F2937", marginBottom: 8 },
  subtitle: { fontSize: 14, color: "#6B7280", marginBottom: 20 },
  counterContainer: { flexDirection: "row", alignItems: "center", gap: 8, backgroundColor: "#F0F9FF", padding: 12, borderRadius: 8, marginBottom: 20, borderLeftWidth: 3, borderLeftColor: "#043A53" },
  counterText: { fontSize: 14, color: "#043A53", fontWeight: "600" },
  imageGrid: { flexDirection: "row", flexWrap: "wrap", gap: 10, marginBottom: 16 },
  imageWrapper: { width: "31%", aspectRatio: 1, position: "relative" },
  imageBox: { width: "100%", height: "100%", backgroundColor: "#F9FAFB", borderRadius: 12, borderWidth: 2, borderColor: "#E5E7EB", borderStyle: "dashed", alignItems: "center", justifyContent: "center", overflow: "hidden" },
  imageBoxFilled: { borderStyle: "solid", borderColor: "#10B981" },
  imageBoxError: { borderColor: "#EF4444" },
  uploadPrompt: { alignItems: "center" },
  uploadText: { fontSize: 12, color: "#043A53", fontWeight: "600", marginTop: 4 },
  imageContainer: { width: "100%", height: "100%" },
  image: { width: "100%", height: "100%" },
  imageOverlay: { position: "absolute", bottom: 0, left: 0, right: 0, backgroundColor: "rgba(0, 0, 0, 0.5)", padding: 4 },
  changeButton: { flexDirection: "row", alignItems: "center", justifyContent: "center", gap: 4 },
  changeButtonText: { color: "#fff", fontSize: 10, fontWeight: "600" },
  removeButton: { position: "absolute", top: -10, right: -10, backgroundColor: "#fff", borderRadius: 15 },
  errorContainer: { flexDirection: "row", alignItems: "center", gap: 6, backgroundColor: "#FEF2F2", padding: 10, borderRadius: 8, marginBottom: 16 },
  errorText: { color: "#EF4444", fontSize: 12 },
  button: { backgroundColor: "#043A53", padding: 16, borderRadius: 10, alignItems: "center", justifyContent: "center", flexDirection: "row", gap: 8, opacity: 0.5 },
  buttonActive: { opacity: 1 },
  buttonText: { color: "#fff", fontWeight: "700", fontSize: 16 },
});