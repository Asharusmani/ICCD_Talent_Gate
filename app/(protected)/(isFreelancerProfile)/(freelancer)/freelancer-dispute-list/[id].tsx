import { useGetDisputeById } from '@/api/client/dispute';
import ButtonRN from '@/components/ui/button';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { router, useLocalSearchParams } from 'expo-router';
import {
    Image,
    ScrollView,
    StyleSheet,
    Text,
    View
} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import ICCDLoader from '@/components/ui/loader2';

const ACCENT = '#0d9488';
const BORDER = 'rgba(14,165,233,0.18)';
const TEXT_PRIMARY = '#0f172a';
const TEXT_SECONDARY = '#6b7280';

const ViewDisputedList = () => {

  const { id } = useLocalSearchParams()
  const { data, userResponseData, isPending, isError, isLoading, error } = useGetDisputeById(id)
  const insets = useSafeAreaInsets();

  if (isLoading) return <ICCDLoader />
  if (isError) return <Text>{error.message}</Text>;

  const { id: orderId, gigId, title, raised_by, total_price, subject, reason, disputeFilesClient } = data[0]

  return (
    <LinearGradient
      colors={['#f0f9ff', '#e0f2fe', '#bae6fd', '#7dd3fc']}
      style={styles.gradient}
      start={{ x: 0, y: 0 }}
      end={{ x: 0.6, y: 1 }}
    >
      {/* <RespondToDisputeModal
        visible={true}
        onClose={() => console.log("on close button is clicked")}
        onSubmit={() => console.log("submit button is clicked")}
      /> */}
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={[styles.scrollContent, { paddingTop: insets.top + 60 }]}
      >
        {/* CARD 1: Order Summary */}
        <View style={styles.card}>
          <Text style={styles.cardTitle}>Order Summary</Text>
          <Text style={styles.orderDescription}>
            {title}
          </Text>

          <View style={styles.dataGrid}>
            <View style={styles.dataCol}>
              <Text style={styles.label}>Total Amount</Text>
              <Text style={styles.value}>{total_price}</Text>
              <View style={styles.spacer} />
              <Text style={styles.label}>Order ID</Text>
              <Text style={styles.value}>{orderId}</Text>
            </View>

            <View style={styles.dataCol}>
              <Text style={styles.label}>Paid Amount</Text>
              <Text style={[styles.value, styles.greenText]}>$50.0</Text>
              <View style={styles.spacer} />
              <Text style={styles.label}>Gig ID</Text>
              <Text style={[styles.value, styles.greenText]}>{gigId}</Text>
            </View>
          </View>

          <Text style={styles.footerText}>Payment Status: No action taken yet</Text>
        </View>

        {/* CARD 2: Dispute Details */}
        <View style={styles.card}>
          <Text style={styles.cardTitle}>Dispute Details</Text>

          <View style={styles.detailItem}>
            <Text style={styles.detailLabel}>Subject</Text>
            <Text style={styles.detailValue}>{subject}</Text>
          </View>

          <View style={styles.detailItem}>
            <Text style={styles.detailLabel}>Reason</Text>
            <Text style={styles.detailValue}>{reason}</Text>
          </View>

          <View style={styles.detailItem}>
            <Text style={styles.detailLabel}>Settlements</Text>
            <Text style={styles.detailValue}>No settlements proposed yet.</Text>
          </View>
        </View>

        {/* CARD 3: Evidence */}
        <View style={styles.card}>
          <Text style={styles.cardTitle}>Evidence</Text>
          <View style={styles.evidenceRow}>
            {disputeFilesClient?.split(",")?.map((item: string, index: number) => (
              <Image key={index} source={{ uri: item }} style={styles.image} />
            ))}
          </View>
        </View>

        {/* CARD 4: Response From The Freelancer */}
        {(userResponseData?.length === 0 && raised_by === 'client')
          &&
          <ButtonRN handleClick={() => router.push('/freelancer-dispute-list/raise-dispute')}>
            Respond
          </ButtonRN>
        }

        {(userResponseData?.length === 0 && raised_by === 'freelancer')
          &&
          <Text>Client not responded yet.</Text>
        }

        {(userResponseData?.length > 0) && (
          <View style={styles.card}>
            <View style={styles.responseHeader}>
              <MaterialCommunityIcons name="comment-multiple-outline" size={24} color="#0B3040" />
              <Text style={styles.responseTitle}>
                {userResponseData[0]?.message}
              </Text>
            </View>
            <View style={styles.freelancerEvidenceBox}>
              <Text style={styles.evidenceLabelSmall}>Evidence</Text>
              {userResponseData[0]?.disputeFilesFreelancer?.split(",")?.map((item: string, index: number) => (
                <Image key={index} source={{ uri: item }} style={styles.image} />
              ))}
            </View>
          </View>
        )}

      </ScrollView>
    </LinearGradient>
  );
};

const styles = StyleSheet.create({
  gradient: {
    flex: 1,
  },
  header: { paddingHorizontal: 20, paddingTop: 10, paddingBottom: 20 },
  backButton: { width: 40, height: 40, borderRadius: 10, backgroundColor: '#8CB4B8', justifyContent: 'center', alignItems: 'center', marginBottom: 20 },
  headerTitleRow: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'flex-start' },
  disputeId: { fontSize: 22, fontWeight: 'bold', color: '#0B3040' },
  orderCreatedText: { fontSize: 13, color: '#0B3040', marginTop: 4 },
  statusBadge: { flexDirection: 'row', alignItems: 'center', backgroundColor: '#DCE7EE', paddingHorizontal: 10, paddingVertical: 6, borderRadius: 20 },
  statusText: { fontSize: 14, color: '#4A6173', marginLeft: 5, fontWeight: '500' },
  scrollContent: {
    paddingHorizontal: 16,
    paddingBottom: 40,
  },
  card: {
    backgroundColor: 'rgba(255,255,255,0.82)',
    borderRadius: 16,
    padding: 20,
    marginBottom: 14,
    borderWidth: 1,
    borderColor: BORDER,
  },
  cardTitle: { fontSize: 16, fontWeight: '700', color: TEXT_PRIMARY, marginBottom: 12 },
  orderDescription: { fontSize: 14, color: TEXT_SECONDARY, lineHeight: 20, marginBottom: 20 },
  dataGrid: { flexDirection: 'row', justifyContent: 'space-between', marginBottom: 20 },
  dataCol: { flex: 1 },
  label: { fontSize: 13, fontWeight: '700', color: TEXT_PRIMARY },
  value: { fontSize: 13, color: TEXT_SECONDARY, marginTop: 4 },
  greenText: { color: '#10b981', fontWeight: '600' },
  spacer: { height: 15 },
  footerText: { fontSize: 12, color: TEXT_SECONDARY },
  detailItem: { marginBottom: 15 },
  detailLabel: { fontSize: 13, fontWeight: '700', color: TEXT_PRIMARY },
  detailValue: { fontSize: 13, color: TEXT_SECONDARY, marginTop: 4 },
  evidenceRow: { flexDirection: 'column', justifyContent: 'space-between', gap: 25 },
  image: { width: '100%', height: 180, borderRadius: 10 },
  evidenceContainer: { width: '48%' },
  imagePlaceholder: { aspectRatio: 1, backgroundColor: '#EAEAEA', borderRadius: 12, justifyContent: 'center', alignItems: 'center', marginBottom: 10 },
  downloadButton: { flexDirection: 'row', backgroundColor: '#2EA44F', paddingVertical: 8, borderRadius: 6, justifyContent: 'center', alignItems: 'center' },
  downloadText: { color: 'white', fontSize: 13, fontWeight: 'bold', marginLeft: 6 },
  responseHeader: { flexDirection: 'row', alignItems: 'flex-start', marginBottom: 15 },
  responseTitle: { flex: 1, fontSize: 15, fontWeight: '700', color: TEXT_PRIMARY, marginLeft: 10 },
  freelancerEvidenceBox: {
    backgroundColor: 'rgba(14,165,233,0.06)',
    borderRadius: 12,
    padding: 12,
    gap: 25,
    borderWidth: 1,
    borderColor: BORDER,
  },
  evidenceLabelSmall: { fontSize: 12, fontWeight: '700', color: TEXT_SECONDARY, marginBottom: 10 },
  smallEvidenceRow: { flexDirection: 'row', justifyContent: 'space-between' },
  smallEvidenceContainer: { width: '31%' },
  smallImagePlaceholder: { aspectRatio: 1, backgroundColor: '#E2D9D9', borderRadius: 8, justifyContent: 'center', alignItems: 'center', marginBottom: 6 },
  smallDownloadText: { color: 'white', fontSize: 9, fontWeight: 'bold', marginLeft: 3 },
});

export default ViewDisputedList;