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
import { useState } from "react";
import { router } from "expo-router";
import { useAddGigs } from "@/api/client/gigs";
import { useAuth } from "@/utils/auth-context";
import * as ImagePicker from "expo-image-picker";
import { useForm, Controller } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import GigHeader from "@/components/header/gig-header";
import { resetGig } from "@/store/slices/gig-detail-slice";
import { useAppDispatch } from "@/hooks/use-apply-project";
import { useAppSelector } from "@/hooks/use-apply-project";
import { GallerySchema } from "@/components/schemas/schema";
import { SafeAreaView } from "react-native-safe-area-context";
interface GalleryImage {
  uri: string;
  fileName?: string;
  mimeType?: string;
}

interface GalleryFormData {
  images: (GalleryImage | null)[];
}

export default function GalleryScreen() {

  const dispatch = useAppDispatch()
  const { freelancer } = useAuth()
  const [loading, setLoading] = useState(false);
  const gigsData = useAppSelector(state => state.gig.gig)

  const {
    control,
    handleSubmit,
    setValue,
    watch,
    formState: { errors, isValid },
  } = useForm<GalleryFormData>({
    resolver: yupResolver(GallerySchema),
    mode: "onChange",
    defaultValues: {
      images: [null, null, null],
    },
  });

  const images = watch("images");
  const uploadedCount = images.filter((img) => img !== null).length;

  const pickImage = async (index: number) => {
    try {
      const requestPermission = async () => {
        if (Platform.OS !== 'web') {
          const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();

          if (status !== 'granted') {
            Alert.alert(
              'Permission Required',
              'Sorry, we need camera roll permissions to upload images.',
              [{ text: 'OK' }]
            );
            return false;
          }
        }
        return true;
      };

      const hasPermission = await requestPermission();
      if (!hasPermission) return;

      setLoading(true);
      // Launch image picker
      const result = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ['images'],
        // allowsEditing: true,
        // aspect: [16, 9],
        // quality: 0.8,
      });

      if (!result.canceled && result.assets[0]) {
        const { uri, fileName, mimeType } = result.assets[0]
        const files = { uri, fileName, mimeType }

        const newImages = [...images];
        newImages[index] = files;
        setValue("images", newImages, { shouldValidate: true });
      }
    } catch (error) {
      Alert.alert("Error", "Failed to pick image. Please try again.");
      console.error("Image picker error:", error);
    } finally {
      setLoading(false);
    }
  };

  const removeImage = (index: number) => {
    const newImages = [...images];
    newImages[index] = null;
    setValue("images", newImages, { shouldValidate: true });
  };

  const { addGigs, isSuccess, isPending, isError, error } = useAddGigs();

  const onSubmit = (data: GalleryFormData) => {

    const { images } = data
    let { gigsTitle, category, subCategory, description, packages } = gigsData

    const formData = new FormData()
    formData.append('gigsTitle', gigsTitle)
    formData.append('category', category)
    formData.append('subCategory', subCategory)
    formData.append('description', description)
    formData.append('packages', packages)
    formData.append("freelancerId", freelancer.id)
    for (const image of images) {
      if (image !== null) {
        formData.append('files', {
          uri: image.uri,
          type: image.mimeType || 'application/pdf',
          name: image.fileName || 'document.pdf',
        } as any);
      }
    }
    addGigs(formData)
    
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <ScrollView
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        <View style={styles.container}>
          {/* Main Card */}
          <View style={styles.card}>
            {/* Header */}
            <GigHeader title="Gallery" step="4" icon={<Ionicons name="document-text" size={24} color="#fff" />} />
            {/* Content */}
            <View style={styles.cardBody}>
              <Text style={styles.title}>
                Showcase Your Services
              </Text>
              <Text style={styles.subtitle}>
                Upload high-quality images to attract more buyers. You can upload up to 3 images.
              </Text>

              {/* Image Counter */}
              <View style={styles.counterContainer}>
                <Ionicons name="images-outline" size={20} color="#043A53" />
                <Text style={styles.counterText}>
                  {uploadedCount} of 3 images uploaded
                </Text>
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
                              <Image
                                source={{ uri: image.uri }}
                                style={styles.image}
                                resizeMode="cover"
                              />
                              <View style={styles.imageOverlay}>
                                <TouchableOpacity
                                  style={styles.changeButton}
                                  onPress={() => pickImage(index)}
                                >
                                  <Ionicons name="camera" size={16} color="#fff" />
                                  <Text style={styles.changeButtonText}>Change</Text>
                                </TouchableOpacity>
                              </View>
                            </View>
                          ) : (
                            <View style={styles.uploadPrompt}>
                              <View style={styles.uploadIconContainer}>
                                <Ionicons name="cloud-upload-outline" size={40} color="#043A53" />
                              </View>
                              <Text style={styles.uploadText}>Upload Photo</Text>
                              {/* <Text style={styles.uploadSubtext}>Tap to browse</Text> */}
                            </View>
                          )}
                        </TouchableOpacity>
                        {image && (
                          <TouchableOpacity
                            style={styles.removeButton}
                            onPress={() => removeImage(index)}
                          >
                            <Ionicons name="close-circle" size={28} color="#EF4444" />
                          </TouchableOpacity>
                        )}
                      </View>
                    ))}
                  </View>
                )}
              />

              {/* Error Message */}
              {errors.images && (
                <View style={styles.errorContainer}>
                  <Ionicons name="alert-circle" size={16} color="#EF4444" />
                  <Text style={styles.errorText}>{errors.images.message}</Text>
                </View>
              )}


              {/* Submit Button */}
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
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: '#F4F4F4'
  },
  scrollContent: {
    flexGrow: 1,
    paddingBottom: 30,
  },
  container: {
    flex: 1,
    padding: 16,
  },

  /* Steps */
  stepsRow: {
    marginTop: 10,
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 24,
  },
  stepItem: {
    alignItems: "center",
    flex: 1,
  },
  stepCircle: {
    width: 32,
    height: 32,
    borderRadius: 16,
    borderWidth: 2,
    borderColor: "#D1D5DB",
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#fff",
  },
  activeCircle: {
    backgroundColor: "#043A53",
    borderColor: "#043A53",
  },
  completedCircle: {
    backgroundColor: "#10B981",
    borderColor: "#10B981",
  },
  stepText: {
    fontSize: 14,
    color: "#9AA0A6",
    fontWeight: "600",
  },
  activeText: {
    color: "#fff",
    fontWeight: "700",
  },
  stepLabel: {
    fontSize: 11,
    color: "#9AA0A6",
    marginTop: 6,
    fontWeight: "500",
  },
  activeLabel: {
    color: "#043A53",
    fontWeight: "700",
  },

  /* Card */
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
  cardHeader: {
    backgroundColor: "#043A53",
    padding: 18,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  headerContent: {
    flexDirection: "row",
    alignItems: "center",
    gap: 10,
  },
  cardHeaderText: {
    color: "#fff",
    fontSize: 18,
    fontWeight: "700",
  },
  badge: {
    backgroundColor: "rgba(255, 255, 255, 0.2)",
    paddingHorizontal: 12,
    paddingVertical: 4,
    borderRadius: 12,
  },
  badgeText: {
    color: "#fff",
    fontSize: 12,
    fontWeight: "600",
  },
  cardBody: {
    padding: 20,
  },

  title: {
    fontSize: 22,
    fontWeight: "700",
    color: "#1F2937",
    marginBottom: 8,
  },
  subtitle: {
    fontSize: 14,
    color: "#6B7280",
    lineHeight: 20,
    marginBottom: 20,
  },

  /* Counter */
  counterContainer: {
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
    backgroundColor: "#F0F9FF",
    padding: 12,
    borderRadius: 8,
    marginBottom: 20,
    borderLeftWidth: 3,
    borderLeftColor: "#043A53",
  },
  counterText: {
    fontSize: 14,
    color: "#043A53",
    fontWeight: "600",
  },

  imageGrid: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: 10,
    marginBottom: 16,
  },
  imageWrapper: {
    width: "31%",
    aspectRatio: 1,
    position: "relative",
  },
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
  imageBoxFilled: {
    borderStyle: "solid",
    borderColor: "#10B981",
    borderWidth: 2,
  },
  imageBoxError: {
    borderColor: "#EF4444",
  },
  uploadPrompt: {
    alignItems: "center",
    justifyContent: "center",
    padding: 8,
  },
  uploadIconContainer: {
    marginBottom: 8,
  },
  uploadText: {
    fontSize: 12,
    color: "#043A53",
    fontWeight: "600",
    marginBottom: 2,
    textAlign: "center"
  },
  uploadSubtext: {
    fontSize: 10,
    color: "#9AA0A6",
  },
  imageContainer: {
    width: "100%",
    height: "100%",
    position: "relative",
  },
  image: {
    width: "100%",
    height: "100%",
  },
  imageOverlay: {
    position: "absolute",
    bottom: 0,
    left: 0,
    right: 0,
    backgroundColor: "rgba(0, 0, 0, 0.6)",
    padding: 6,
    alignItems: "center",
  },
  changeButton: {
    flexDirection: "row",
    alignItems: "center",
    gap: 4,
  },
  changeButtonText: {
    color: "#fff",
    fontSize: 10,
    fontWeight: "600",
  },
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
  errorText: {
    color: "#EF4444",
    fontSize: 13,
    fontWeight: "500",
    flex: 1,
  },


  /* Button */
  button: {
    backgroundColor: "#043A53",
    padding: 16,
    borderRadius: 10,
    alignItems: "center",
    justifyContent: "center",
    flexDirection: "row",
    gap: 8,
    opacity: 0.5,
    elevation: 2,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.2,
    shadowRadius: 2,
  },
  buttonActive: {
    opacity: 1,
    backgroundColor: "#043A53",
  },
  buttonText: {
    color: "#fff",
    fontWeight: "700",
    fontSize: 16,
  },
});