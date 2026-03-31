import { useGetSingleGigs } from "@/api/client/gigs";
import GigPricing from "@/components/gig-detail/gig-pricing";
import ProductSlider from "@/components/order-detail/product-slider";
import { LinearGradient } from "expo-linear-gradient";
import { router, useLocalSearchParams } from "expo-router";
import { Image, ScrollView, StyleSheet, Text, TouchableOpacity, View, Animated } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import ICCDLoader from '@/components/ui/loader2';
import { Ionicons } from '@expo/vector-icons';
import { ArrowLeft, MessageCircle } from 'lucide-react-native';
import { useEffect, useRef } from 'react';

const ACCENT = '#0d9488';
const BORDER = 'rgba(14,165,233,0.18)';
const TEXT_PRIMARY = '#0f172a';
const TEXT_SECONDARY = '#6b7280';

const GigDetail = () => {
  const { id } = useLocalSearchParams();
  const { data, isLoading } = useGetSingleGigs(id);
  const insets = useSafeAreaInsets();
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
    <View style={styles.container}>
      <ScrollView
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
        bounces={true}
      >
        {/* Hero */}
        <View style={styles.heroSection}>
          <ProductSlider images={gigsDescription?.gigsFiles?.split(',') || []} />
          <LinearGradient
            colors={['transparent', 'rgba(9,30,39,0.88)']}
            style={styles.heroGradient}
          >
            <View style={styles.heroContent}>
              <View style={styles.profileChip}>
                <Image
                  source={{ uri: freelancerDetails?.freelancerPic }}
                  style={styles.chipAvatar}
                />
                <Text style={styles.chipName}>{freelancerDetails?.freelancerName}</Text>
                <Ionicons name="checkmark-circle" size={15} color="#10b981" />
              </View>
              <Text style={styles.heroTitle}>{gigsDescription?.gigsTitle}</Text>
            </View>
          </LinearGradient>

          {/* Back button */}
          {/* <TouchableOpacity
            style={[styles.backBtn, { top: insets.top + 10 }]}
            onPress={() => router.back()}
          >
            <ArrowLeft size={20} color="#fff" />
          </TouchableOpacity> */}
        </View>

        {/* Body */}
        <LinearGradient
          colors={['#f0f9ff', '#e0f2fe', '#bae6fd', '#7dd3fc']}
          style={styles.bodyGradient}
          start={{ x: 0, y: 0 }}
          end={{ x: 0.6, y: 1 }}
        >
          <Animated.View
            style={[
              styles.contentContainer,
              {
                opacity: fadeAnim,
                transform: [{ translateY: slideAnim }],
              },
            ]}
          >
            {/* Stats */}
            <View style={styles.statsContainer}>
              <View style={styles.statBox}>
                <Ionicons name="star" size={20} color="#fbbf24" />
                <Text style={styles.statValue}>4.9</Text>
                <Text style={styles.statLabel}>Rating</Text>
              </View>
              <View style={styles.statDivider} />
              <View style={styles.statBox}>
                <Ionicons name="briefcase-outline" size={20} color={ACCENT} />
                <Text style={styles.statValue}>127</Text>
                <Text style={styles.statLabel}>Orders</Text>
              </View>
              <View style={styles.statDivider} />
              <View style={styles.statBox}>
                <Ionicons name="time-outline" size={20} color={ACCENT} />
                <Text style={styles.statValue}>2 Days</Text>
                <Text style={styles.statLabel}>Delivery</Text>
              </View>
            </View>

            {/* About */}
            <View style={styles.sectionContainer}>
              <View style={styles.sectionHeader}>
                <View style={styles.sectionIconBox}>
                  <Ionicons name="information-circle" size={20} color={ACCENT} />
                </View>
                <Text style={styles.sectionTitle}>About This Gig</Text>
              </View>
              <View style={styles.card}>
                <Text style={styles.descriptionText}>{gigsDescription?.gigsDescription}</Text>
              </View>
            </View>

            {/* Freelancer */}
            <View style={styles.sectionContainer}>
              <View style={styles.sectionHeader}>
                <View style={styles.sectionIconBox}>
                  <Ionicons name="person" size={20} color={ACCENT} />
                </View>
                <Text style={styles.sectionTitle}>Meet Your Freelancer</Text>
              </View>
              <View style={styles.card}>
                <View style={styles.freelancerRow}>
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
                      <Ionicons name="arrow-forward" size={13} color={ACCENT} />
                    </TouchableOpacity>
                  </View>
                </View>
              </View>
            </View>

            {/* Pricing */}
            <View style={styles.sectionContainer}>
              <View style={styles.sectionHeader}>
                <View style={styles.sectionIconBox}>
                  <Ionicons name="pricetag" size={20} color={ACCENT} />
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
                  colors={[ACCENT, '#0891b2']}
                  start={{ x: 0, y: 0 }}
                  end={{ x: 1, y: 0 }}
                  style={styles.primaryBtn}
                >
                  <Text style={styles.primaryBtnText}>Continue to Order</Text>
                  <Ionicons name="arrow-forward-circle" size={22} color="#FFF" />
                </LinearGradient>
              </TouchableOpacity>

              <TouchableOpacity style={styles.secondaryBtn} activeOpacity={0.8}>
                <MessageCircle size={20} color={ACCENT} />
                <Text style={styles.secondaryBtnText}>Contact Seller</Text>
              </TouchableOpacity>
            </View>

            <View style={{ height: 40 }} />
          </Animated.View>
        </LinearGradient>
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f0f9ff',
  },
  scrollContent: {
    paddingBottom: 0,
  },

  // Hero
  heroSection: {
    position: 'relative',
    height: 320,
    backgroundColor: '#0f2a35',
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
    gap: 10,
  },
  backBtn: {
    position: 'absolute',
    left: 16,
    width: 38,
    height: 38,
    borderRadius: 19,
    backgroundColor: 'rgba(255,255,255,0.18)',
    borderWidth: 1,
    borderColor: 'rgba(255,255,255,0.30)',
    alignItems: 'center',
    justifyContent: 'center',
  },
  profileChip: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'rgba(255,255,255,0.95)',
    paddingVertical: 6,
    paddingHorizontal: 10,
    borderRadius: 24,
    alignSelf: 'flex-start',
    gap: 7,
  },
  chipAvatar: {
    width: 28,
    height: 28,
    borderRadius: 14,
    borderWidth: 2,
    borderColor: ACCENT,
  },
  chipName: {
    fontSize: 13,
    fontWeight: '700',
    color: '#1f2937',
  },
  heroTitle: {
    fontSize: 22,
    fontWeight: '800',
    color: '#fff',
    lineHeight: 30,
  },

  // Body
  bodyGradient: {
    flex: 1,
  },
  contentContainer: {
    paddingHorizontal: 16,
    marginTop: 0,
    paddingTop: 16,
  },

  // Stats
  statsContainer: {
    flexDirection: 'row',
    backgroundColor: 'rgba(255,255,255,0.85)',
    borderRadius: 16,
    padding: 16,
    borderWidth: 1,
    borderColor: BORDER,
    marginBottom: 20,
  },
  statBox: {
    flex: 1,
    alignItems: 'center',
    gap: 4,
  },
  statValue: {
    fontSize: 17,
    fontWeight: '800',
    color: TEXT_PRIMARY,
    marginTop: 4,
  },
  statLabel: {
    fontSize: 10,
    color: TEXT_SECONDARY,
    fontWeight: '600',
    textTransform: 'uppercase',
    letterSpacing: 0.5,
  },
  statDivider: {
    width: 1,
    backgroundColor: BORDER,
    marginHorizontal: 8,
  },

  // Sections
  sectionContainer: {
    marginBottom: 22,
  },
  sectionHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 12,
    gap: 10,
  },
  sectionIconBox: {
    width: 36,
    height: 36,
    borderRadius: 10,
    backgroundColor: 'rgba(13,148,136,0.12)',
    alignItems: 'center',
    justifyContent: 'center',
  },
  sectionTitle: {
    fontSize: 17,
    fontWeight: '700',
    color: TEXT_PRIMARY,
    letterSpacing: -0.3,
  },
  card: {
    backgroundColor: 'rgba(255,255,255,0.82)',
    borderRadius: 14,
    padding: 16,
    borderWidth: 1,
    borderColor: BORDER,
  },
  descriptionText: {
    fontSize: 14,
    color: '#4b5563',
    lineHeight: 22,
  },

  // Freelancer
  freelancerRow: {
    flexDirection: 'row',
    gap: 14,
  },
  freelancerImage: {
    width: 72,
    height: 72,
    borderRadius: 12,
    borderWidth: 2,
    borderColor: 'rgba(13,148,136,0.35)',
    flexShrink: 0,
  },
  freelancerInfo: {
    flex: 1,
    gap: 6,
  },
  freelancerName: {
    fontSize: 15,
    fontWeight: '700',
    color: TEXT_PRIMARY,
  },
  freelancerBio: {
    fontSize: 13,
    color: TEXT_SECONDARY,
    lineHeight: 19,
  },
  viewProfileBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 5,
    marginTop: 2,
  },
  viewProfileText: {
    fontSize: 13,
    fontWeight: '600',
    color: ACCENT,
  },

  // Actions
  actionSection: {
    gap: 12,
    marginTop: 4,
  },
  primaryBtnWrapper: {
    borderRadius: 14,
    overflow: 'hidden',
    shadowColor: ACCENT,
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 6,
  },
  primaryBtn: {
    flexDirection: 'row',
    height: 54,
    borderRadius: 14,
    justifyContent: 'center',
    alignItems: 'center',
    gap: 10,
  },
  primaryBtnText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '700',
    letterSpacing: 0.3,
  },
  secondaryBtn: {
    flexDirection: 'row',
    backgroundColor: 'rgba(255,255,255,0.82)',
    height: 54,
    borderRadius: 14,
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 1.5,
    borderColor: ACCENT,
    gap: 8,
  },
  secondaryBtnText: {
    color: ACCENT,
    fontSize: 16,
    fontWeight: '700',
  },
});

export default GigDetail;