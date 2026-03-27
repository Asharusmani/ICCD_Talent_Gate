import { useGetJobById } from '@/api/client/job';
import { useAuth } from '@/utils/auth-context';
import { Ionicons, MaterialCommunityIcons } from '@expo/vector-icons';
import { useLocalSearchParams, useRouter } from 'expo-router';
import {
    ScrollView,
    StyleSheet,
    Text,
    TouchableOpacity,
    View,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import ICCDLoader from '@/components/ui/loader2';

const PostedJobDetail = () => {

  const router = useRouter();
  const { freelancer } = useAuth()
  const { id } = useLocalSearchParams()

  const { data, isPending, isError, isLoading } = useGetJobById(id);

  if (isLoading) return <ICCDLoader />

  const { clientID } = data[0]

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={styles.scrollContent}>

        {/* Section 1: Main Header Card */}
        <View style={[styles.card]}>
          <View style={styles.headerRow}>
            <View style={styles.logoBox}>
              {/* <Text style={styles.logoText}>{data[0]?.jobTitle[0]}</Text> */}
            </View>
            <View style={styles.titleColumn}>
              <Text style={styles.jobTitle}>{data[0]?.jobTitle}</Text>
              <View style={styles.postedRow}>
                <MaterialCommunityIcons name="history" size={14} color="#888" />
                <Text style={styles.postedText}>Recently posted</Text>
              </View>
            </View>
          </View>

          <View style={styles.locationRow}>
            <Ionicons name="location-sharp" size={16} color="#000" />
            <Text style={styles.locationText}>{data[0]?.country}, {data[0]?.city}</Text>
          </View>

          <View style={styles.badgeRow}>
            <View style={styles.badge}>
              <Text style={styles.badgeText}>${data[0]?.minSalaray} - ${data[0]?.maxSalaray}/{data[0]?.payType}</Text>
            </View>
            <View style={styles.badge}>
              <MaterialCommunityIcons name="briefcase-variant" size={16} color="#2D5D63" />
              <Text style={[styles.badgeText, { marginLeft: 5 }]}>{data[0]?.jobType}</Text>
            </View>
          </View>

          <TouchableOpacity style={styles.applyButton}
            onPress={() => router.push({
              pathname: '/job/apply-job',
              params: { freelancerId: freelancer.id, projectId: id, clientId: clientID }
            })}
          >
            <Text style={styles.applyButtonText}>Apply for this position</Text>
          </TouchableOpacity>
        </View>

        {/* Section 2: Job Details Card */}
        <View style={styles.card}>
          <View style={styles.detailsHeader}>
            <MaterialCommunityIcons name="briefcase" size={22} color="#4A7A7C" />
            <Text style={styles.sectionTitle}>Job Details</Text>
          </View>

          <View style={styles.detailItem}>
            <Text style={styles.detailLabel}>Compensation</Text>
            <Text style={styles.detailValue}>$22-$33/commission</Text>
          </View>
          <View style={styles.divider} />

          <View style={styles.detailItem}>
            <Text style={styles.detailLabel}>Employee Type</Text>
            <Text style={styles.detailValue}>Contract</Text>
          </View>
          <View style={styles.divider} />

          <View style={styles.detailItem}>
            <Text style={styles.detailLabel}>Location</Text>
            <Text style={styles.detailValue}>Pakistan</Text>
          </View>
        </View>

        {/* Section 3: About this role Section */}
        <View style={styles.card}>
          <Text style={styles.sectionTitleLarge}>About this role</Text>
          <View style={[styles.divider, { marginVertical: 15 }]} />

          <Text style={styles.subHeading}>Key Responsibilities</Text>
          <View style={styles.bulletItem}>
            <Text style={styles.bullet}>•</Text>
            <Text style={styles.bulletText}>Develop and maintain mobile applications using mobile applications</Text>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F4F4F4'
  },
  //
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
    paddingBottom: 20,
  },
  card: {
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
    padding: 20,
    marginTop: 20,
    elevation: 3,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
  headerRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 15,
  },
  logoBox: {
    width: 60,
    height: 60,
    backgroundColor: '#102A43',
    borderRadius: 12,
    justifyContent: 'center',
    alignItems: 'center',
  },
  logoText: {
    color: '#FFF',
    fontSize: 22,
    fontWeight: 'bold',
  },
  titleColumn: {
    marginLeft: 15,
  },
  jobTitle: {
    fontSize: 20,
    fontWeight: '700',
    color: '#000',
  },
  postedRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 4,
  },
  postedText: {
    fontSize: 14,
    color: '#888',
    marginLeft: 4,
  },
  locationRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 15,
  },
  locationText: {
    fontSize: 15,
    color: '#000',
    marginLeft: 6,
  },
  badgeRow: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    marginBottom: 15,
  },
  badge: {
    backgroundColor: '#E5E7EB',
    paddingHorizontal: 12,
    paddingVertical: 8,
    borderRadius: 20,
    marginRight: 10,
    flexDirection: 'row',
    alignItems: 'center',
  },
  badgeText: {
    fontSize: 13,
    color: '#374151',
    fontWeight: '500',
  },
  applyButton: {
    backgroundColor: '#21818B',
    paddingVertical: 12,
    paddingHorizontal: 20,
    borderRadius: 8,
    alignSelf: 'flex-end',
  },
  applyButtonText: {
    color: '#FFF',
    fontSize: 14,
    fontWeight: '600',
  },
  detailsHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 20,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: '700',
    color: '#000',
    marginLeft: 10,
  },
  sectionTitleLarge: {
    fontSize: 20,
    fontWeight: '700',
    color: '#000',
  },
  detailItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 12,
  },
  detailLabel: {
    color: '#9CA3AF',
    fontSize: 15,
  },
  detailValue: {
    color: '#1F2937',
    fontSize: 14,
    fontWeight: '500',
    textAlign: 'right',
  },
  divider: {
    height: 1,
    backgroundColor: '#F3F4F6',
    width: '100%',
  },
  subHeading: {
    fontSize: 16,
    fontWeight: '700',
    color: '#000',
    marginBottom: 10,
  },
  bulletItem: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    paddingLeft: 5,
  },
  bullet: {
    fontSize: 18,
    marginRight: 8,
    color: '#000',
    marginTop: -4,
  },
  bulletText: {
    fontSize: 14,
    color: '#4B5563',
    lineHeight: 20,
  },
});

export default PostedJobDetail;