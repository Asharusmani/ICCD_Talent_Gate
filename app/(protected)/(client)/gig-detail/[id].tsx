import { useGetSingleGigs } from "@/api/client/gigs";
import GigPricing from "@/components/gig-detail/gig-pricing";
import ProductSlider from "@/components/order-detail/product-slider";
import { LinearGradient } from "expo-linear-gradient";
import { router, useLocalSearchParams } from "expo-router";
import { Image, ScrollView, StyleSheet, Text, TouchableOpacity, View, Animated } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import ICCDLoader from '@/components/ui/loader2';
import { Ionicons } from '@expo/vector-icons';
import { useEffect, useRef } from 'react';

const GigDetail = () => {
  const { id } = useLocalSearchParams();
  const { data, isLoading } = useGetSingleGigs(id);
  const fadeAnim = useRef(new Animated.Value(0)).current;
  const slideAnim = useRef(new Animated.Value(30)).current;

  useEffect(() => {
    Animated.parallel([
      Animated.timing(fadeAnim, {
        toValue: 1,
        duration: 600,
        useNativeDriver: true,
      }),
      Animated.timing(slideAnim, {
        toValue: 0,
        duration: 500,
        useNativeDriver: true,
      }),
    ]).start();
  }, []);

  if (isLoading) return <ICCDLoader />;

  const { freelancerDetails, gigsDescription, packagesDetails } = data[0];

  return (
    <SafeAreaView style={styles.container} edges={['top']}>
      <ScrollView 
        contentContainerStyle={styles.scrollContent} 
        showsVerticalScrollIndicator={false}
        bounces={true}
      >
        {/* Hero Section with Gradient Overlay */}
        <View style={styles.heroSection}>
          <ProductSlider images={gigsDescription?.gigsFiles?.split(",") || []} />
          <LinearGradient
            colors={['transparent', 'rgba(0,0,0,0.7)']}
            style={styles.heroGradient}
          >
            <View style={styles.heroContent}>
              <View style={styles.profileChip}>
                <Image
                  source={{ uri: freelancerDetails?.freelancerPic }}
                  style={styles.chipAvatar}
                />
                <Text style={styles.chipName}>{freelancerDetails?.freelancerName}</Text>
                <View style={styles.verifiedBadge}>
                  <Ionicons name="checkmark-circle" size={16} color="#10b981" />
                </View>
              </View>
              <Text style={styles.heroTitle}>{gigsDescription?.gigsTitle}</Text>
            </View>
          </LinearGradient>
        </View>

        <Animated.View 
          style={[
            styles.contentContainer,
            {
              opacity: fadeAnim,
              transform: [{ translateY: slideAnim }],
            },
          ]}
        >
          {/* Quick Stats */}
          <View style={styles.statsContainer}>
            <View style={styles.statBox}>
              <Ionicons name="star" size={20} color="#fbbf24" />
              <Text style={styles.statValue}>4.9</Text>
              <Text style={styles.statLabel}>Rating</Text>
            </View>
            <View style={styles.statDivider} />
            <View style={styles.statBox}>
              <Ionicons name="briefcase-outline" size={20} color="#147D7E" />
              <Text style={styles.statValue}>127</Text>
              <Text style={styles.statLabel}>Orders</Text>
            </View>
            <View style={styles.statDivider} />
            <View style={styles.statBox}>
              <Ionicons name="time-outline" size={20} color="#147D7E" />
              <Text style={styles.statValue}>2 Days</Text>
              <Text style={styles.statLabel}>Delivery</Text>
            </View>
          </View>

          {/* About Section */}
          <View style={styles.sectionContainer}>
            <View style={styles.sectionHeader}>
              <View style={styles.sectionIconBox}>
                <Ionicons name="information-circle" size={20} color="#147D7E" />
              </View>
              <Text style={styles.sectionTitle}>About This Gig</Text>
            </View>
            <View style={styles.descriptionCard}>
              <Text style={styles.descriptionText}>{gigsDescription?.gigsDescription}</Text>
            </View>
          </View>

          {/* Freelancer Profile */}
          <View style={styles.sectionContainer}>
            <View style={styles.sectionHeader}>
              <View style={styles.sectionIconBox}>
                <Ionicons name="person" size={20} color="#147D7E" />
              </View>
              <Text style={styles.sectionTitle}>Meet Your Freelancer</Text>
            </View>
            <View style={styles.freelancerCard}>
              <Image
                source={{ uri: freelancerDetails?.freelancerPic }}
                style={styles.freelancerImage}
              />
              <View style={styles.freelancerInfo}>
                <Text style={styles.freelancerName}>{freelancerDetails?.freelancerName}</Text>
                <Text style={styles.freelancerBio} numberOfLines={3}>
                  {freelancerDetails?.professionalSummary}
                </Text>
                <TouchableOpacity style={styles.viewProfileBtn}>
                  <Text style={styles.viewProfileText}>View Full Profile</Text>
                  <Ionicons name="arrow-forward" size={14} color="#147D7E" />
                </TouchableOpacity>
              </View>
            </View>
          </View>

          {/* Pricing */}
          <View style={styles.sectionContainer}>
            <View style={styles.sectionHeader}>
              <View style={styles.sectionIconBox}>
                <Ionicons name="pricetag" size={20} color="#147D7E" />
              </View>
              <Text style={styles.sectionTitle}>Choose Your Package</Text>
            </View>
            <GigPricing packagesDetails={packagesDetails} />
          </View>

          {/* Action Buttons */}
          <View style={styles.actionSection}>
            <TouchableOpacity 
              onPress={() => router.push('/gig-detail/order-detail')} 
              activeOpacity={0.85}
              style={styles.primaryBtnWrapper}
            >
              <LinearGradient
                colors={["#147D7E", "#0f5f60"]}
                start={{ x: 0, y: 0 }}
                end={{ x: 1, y: 1 }}
                style={styles.primaryBtn}
              >
                <Text style={styles.primaryBtnText}>Continue to Order</Text>
                <Ionicons name="arrow-forward-circle" size={22} color="#FFF" />
              </LinearGradient>
            </TouchableOpacity>

            <TouchableOpacity style={styles.secondaryBtn} activeOpacity={0.8}>
              <Ionicons name="chatbubble-ellipses-outline" size={20} color="#147D7E" />
              <Text style={styles.secondaryBtnText}>Contact Seller</Text>
            </TouchableOpacity>
          </View>

          <View style={{ height: 30 }} />
        </Animated.View>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F4F4F4'
  },
  scrollContent: {
    paddingBottom: 20,
  },
  heroSection: {
    position: 'relative',
    height: 320,
    backgroundColor: '#000',
  },
  heroGradient: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    height: 200,
    justifyContent: 'flex-end',
    paddingHorizontal: 20,
    paddingBottom: 20,
  },
  heroContent: {
    gap: 12,
  },
  profileChip: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'rgba(255,255,255,0.95)',
    paddingVertical: 8,
    paddingHorizontal: 12,
    borderRadius: 24,
    alignSelf: 'flex-start',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.15,
    shadowRadius: 8,
    elevation: 4,
    gap: 8,
  },
  chipAvatar: {
    width: 32,
    height: 32,
    borderRadius: 16,
    borderWidth: 2,
    borderColor: '#147D7E',
  },
  chipName: {
    fontSize: 14,
    fontWeight: '700',
    color: '#1f2937',
  },
  verifiedBadge: {
    marginLeft: -4,
  },
  heroTitle: {
    fontSize: 24,
    fontWeight: '800',
    color: '#FFF',
    lineHeight: 32,
    textShadowColor: 'rgba(0, 0, 0, 0.5)',
    textShadowOffset: { width: 0, height: 1 },
    textShadowRadius: 4,
  },
  contentContainer: {
    paddingHorizontal: 20,
    marginTop: -30,
  },
  statsContainer: {
    flexDirection: 'row',
    backgroundColor: '#FFF',
    borderRadius: 16,
    padding: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.08,
    shadowRadius: 12,
    elevation: 3,
    marginBottom: 20,
  },
  statBox: {
    flex: 1,
    alignItems: 'center',
    gap: 4,
  },
  statValue: {
    fontSize: 18,
    fontWeight: '800',
    color: '#1f2937',
    marginTop: 4,
  },
  statLabel: {
    fontSize: 11,
    color: '#6b7280',
    fontWeight: '500',
    textTransform: 'uppercase',
    letterSpacing: 0.5,
  },
  statDivider: {
    width: 1,
    backgroundColor: '#e5e7eb',
    marginHorizontal: 8,
  },
  sectionContainer: {
    marginBottom: 24,
  },
  sectionHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 14,
    gap: 10,
  },
  sectionIconBox: {
    width: 36,
    height: 36,
    borderRadius: 10,
    backgroundColor: '#e6f7f7',
    alignItems: 'center',
    justifyContent: 'center',
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: '700',
    color: '#1f2937',
    letterSpacing: -0.3,
  },
  descriptionCard: {
    backgroundColor: '#FFF',
    borderRadius: 14,
    padding: 18,
    borderWidth: 1,
    borderColor: '#e5e7eb',
  },
  descriptionText: {
    fontSize: 15,
    color: '#4b5563',
    lineHeight: 24,
    letterSpacing: -0.1,
  },
  freelancerCard: {
    backgroundColor: '#FFF',
    borderRadius: 14,
    padding: 18,
    borderWidth: 1,
    borderColor: '#e5e7eb',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 8,
    elevation: 2,
  },
  freelancerImage: {
    width: 80,
    height: 80,
    borderRadius: 12,
    marginBottom: 14,
    borderWidth: 2,
    borderColor: '#147D7E',
  },
  freelancerInfo: {
    gap: 8,
  },
  freelancerName: {
    fontSize: 17,
    fontWeight: '700',
    color: '#1f2937',
  },
  freelancerBio: {
    fontSize: 14,
    color: '#6b7280',
    lineHeight: 20,
  },
  viewProfileBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
    marginTop: 4,
  },
  viewProfileText: {
    fontSize: 14,
    fontWeight: '600',
    color: '#147D7E',
  },
  actionSection: {
    gap: 12,
    marginTop: 8,
  },
  primaryBtnWrapper: {
    borderRadius: 14,
    overflow: 'hidden',
    shadowColor: '#147D7E',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 6,
  },
  primaryBtn: {
    flexDirection: 'row',
    height: 56,
    borderRadius: 14,
    justifyContent: 'center',
    alignItems: 'center',
    gap: 10,
  },
  primaryBtnText: {
    color: '#FFF',
    fontSize: 17,
    fontWeight: '700',
    letterSpacing: 0.3,
  },
  secondaryBtn: {
    flexDirection: 'row',
    backgroundColor: '#FFF',
    height: 56,
    borderRadius: 14,
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 2,
    borderColor: '#147D7E',
    gap: 8,
  },
  secondaryBtnText: {
    color: '#147D7E',
    fontSize: 17,
    fontWeight: '700',
  },
});

export default GigDetail;