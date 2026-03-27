import { useGetJobById } from '@/api/client/job';
import { Ionicons, MaterialCommunityIcons } from '@expo/vector-icons';
import { useLocalSearchParams, useRouter } from 'expo-router';
import { useState } from 'react';
import {
    ScrollView,
    StyleSheet,
    Text,
    View
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import ICCDLoader from '@/components/ui/loader2';

const PostedJobDetail = () => {

  const router = useRouter();
  const { id } = useLocalSearchParams()
  const [model, SetModal] = useState(false);

  const { data, isPending, isError, isLoading } = useGetJobById(id);
  if (isLoading) return <ICCDLoader />
  
  return (
    <SafeAreaView style={styles.container}>
      <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={styles.scrollContent}>

        {/* Section 1: Main Header Card */}
        <View style={[styles.card, styles.headerCard]}>
          <View style={styles.headerRow}>
            <View style={styles.logoBox}>
              <Text style={styles.logoText}>{data[0]?.jobTitle?.[0]?.toUpperCase() || 'J'}</Text>
              <View style={styles.logoGradientOverlay} />
            </View>
            <View style={styles.titleColumn}>
              <Text style={styles.jobTitle}>{data[0]?.jobTitle}</Text>
              <View style={styles.postedRow}>
                <MaterialCommunityIcons name="history" size={14} color="#6B7280" />
                <Text style={styles.postedText}>Recently posted</Text>
              </View>
            </View>
          </View>
          
          <View style={styles.locationRow}>
            <View style={styles.iconCircle}>
              <Ionicons name="location-sharp" size={14} color="#21818B" />
            </View>
            <Text style={styles.locationText}>{data[0]?.country}, {data[0]?.city}</Text>
          </View>

          <View style={styles.badgeRow}>
            <View style={[styles.badge, styles.salaryBadge]}>
              <MaterialCommunityIcons name="cash" size={16} color="#059669" />
              <Text style={[styles.badgeText, styles.salaryText]}>${data[0]?.minSalaray} - ${data[0]?.maxSalaray}/{data[0]?.payType}</Text>
            </View>
            <View style={[styles.badge, styles.typeBadge]}>
              <MaterialCommunityIcons name="briefcase-variant" size={16} color="#21818B" />
              <Text style={[styles.badgeText, styles.typeText]}>{data[0]?.jobType}</Text>
            </View>
          </View>
        </View>

        {/* Section 2: Job Details Card */}
        <View style={[styles.card, styles.detailsCard]}>
          <View style={styles.detailsHeader}>
            <View style={styles.iconWrapper}>
              <MaterialCommunityIcons name="briefcase" size={20} color="#21818B" />
            </View>
            <Text style={styles.sectionTitle}>Job Details</Text>
          </View>

          <View style={styles.detailItem}>
            <View style={styles.detailLabelContainer}>
              <MaterialCommunityIcons name="currency-usd" size={18} color="#9CA3AF" />
              <Text style={styles.detailLabel}>Compensation</Text>
            </View>
            <Text style={styles.detailValue}>$22-$33/commission</Text>
          </View>
          <View style={styles.divider} />

          <View style={styles.detailItem}>
            <View style={styles.detailLabelContainer}>
              <MaterialCommunityIcons name="account-tie" size={18} color="#9CA3AF" />
              <Text style={styles.detailLabel}>Employee Type</Text>
            </View>
            <Text style={styles.detailValue}>Contract</Text>
          </View>
          <View style={styles.divider} />

          <View style={styles.detailItem}>
            <View style={styles.detailLabelContainer}>
              <Ionicons name="location" size={18} color="#9CA3AF" />
              <Text style={styles.detailLabel}>Location</Text>
            </View>
            <Text style={styles.detailValue}>Pakistan</Text>
          </View>
        </View>

        {/* Section 3: About this role Section */}
        <View style={[styles.card, styles.aboutCard]}>
          <View style={styles.aboutHeader}>
            <Text style={styles.sectionTitleLarge}>About this role</Text>
            <View style={styles.decorativeLine} />
          </View>

          <View style={styles.responsibilitiesSection}>
            <Text style={styles.subHeading}>Key Responsibilities</Text>
            <View style={styles.bulletItem}>
              <View style={styles.bulletPoint} />
              <Text style={styles.bulletText}>Develop and maintain mobile applications using mobile applications</Text>
            </View>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F4F4F4",
  },
  headerNav: {
    paddingHorizontal: 16,
    paddingVertical: 10,
  },
  backButton: {
    width: 45,
    height: 45,
    backgroundColor: '#8CB4B8',
    borderRadius: 12,
    justifyContent: 'center',
    alignItems: 'center',
    elevation: 2,
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowRadius: 2,
  },
  scrollContent: {
    paddingHorizontal: 16,
    paddingBottom: 30,
  },
  card: {
    backgroundColor: '#FFFFFF',
    borderRadius: 16,
    padding: 20,
    marginTop: 16,
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.08,
    shadowRadius: 8,
  },
  headerCard: {
    paddingVertical: 24,
    borderLeftWidth: 4,
    borderLeftColor: '#21818B',
  },
  detailsCard: {
    paddingVertical: 20,
  },
  aboutCard: {
    paddingVertical: 24,
    marginBottom: 10,
  },
  headerRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 20,
  },
  logoBox: {
    width: 64,
    height: 64,
    backgroundColor: '#21818B',
    borderRadius: 16,
    justifyContent: 'center',
    alignItems: 'center',
    overflow: 'hidden',
    elevation: 3,
    shadowColor: '#21818B',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.2,
    shadowRadius: 8,
  },
  logoGradientOverlay: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: 'rgba(255, 255, 255, 0.1)',
  },
  logoText: {
    color: '#FFF',
    fontSize: 28,
    fontWeight: '800',
    zIndex: 1,
  },
  titleColumn: {
    flex: 1,
    marginLeft: 16,
  },
  jobTitle: {
    fontSize: 22,
    fontWeight: '700',
    color: '#111827',
    lineHeight: 28,
  },
  postedRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 6,
  },
  postedText: {
    fontSize: 13,
    color: '#6B7280',
    marginLeft: 5,
    fontWeight: '500',
  },
  locationRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 18,
    paddingLeft: 2,
  },
  iconCircle: {
    width: 28,
    height: 28,
    borderRadius: 14,
    backgroundColor: '#E0F2F4',
    justifyContent: 'center',
    alignItems: 'center',
  },
  locationText: {
    fontSize: 15,
    color: '#374151',
    marginLeft: 10,
    fontWeight: '500',
  },
  badgeRow: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 10,
  },
  badge: {
    paddingHorizontal: 14,
    paddingVertical: 10,
    borderRadius: 12,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
  },
  salaryBadge: {
    backgroundColor: '#D1FAE5',
    borderWidth: 1,
    borderColor: '#A7F3D0',
  },
  typeBadge: {
    backgroundColor: '#E0F2F4',
    borderWidth: 1,
    borderColor: '#B3E0E5',
  },
  badgeText: {
    fontSize: 13,
    fontWeight: '600',
  },
  salaryText: {
    color: '#047857',
  },
  typeText: {
    color: '#0D5F68',
  },
  detailsHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 20,
  },
  iconWrapper: {
    width: 36,
    height: 36,
    borderRadius: 10,
    backgroundColor: '#E0F2F4',
    justifyContent: 'center',
    alignItems: 'center',
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: '700',
    color: '#111827',
    marginLeft: 12,
  },
  sectionTitleLarge: {
    fontSize: 20,
    fontWeight: '700',
    color: '#111827',
  },
  detailItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 14,
  },
  detailLabelContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  detailLabel: {
    color: '#6B7280',
    fontSize: 15,
    fontWeight: '500',
  },
  detailValue: {
    color: '#111827',
    fontSize: 15,
    fontWeight: '600',
    textAlign: 'right',
  },
  divider: {
    height: 1,
    backgroundColor: '#E5E7EB',
    width: '100%',
  },
  aboutHeader: {
    marginBottom: 20,
  },
  decorativeLine: {
    width: 40,
    height: 3,
    backgroundColor: '#21818B',
    borderRadius: 2,
    marginTop: 8,
  },
  responsibilitiesSection: {
    marginTop: 4,
  },
  subHeading: {
    fontSize: 16,
    fontWeight: '700',
    color: '#374151',
    marginBottom: 14,
  },
  bulletItem: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    paddingLeft: 4,
    paddingVertical: 6,
  },
  bulletPoint: {
    width: 6,
    height: 6,
    borderRadius: 3,
    backgroundColor: '#21818B',
    marginTop: 7,
    marginRight: 12,
  },
  bulletText: {
    flex: 1,
    fontSize: 15,
    color: '#4B5563',
    lineHeight: 22,
  },
});

export default PostedJobDetail;