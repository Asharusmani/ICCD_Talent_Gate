import { useGetDisputeById } from '@/api/client/dispute';
import ButtonRN from '@/components/ui/button';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { useLocalSearchParams, useRouter } from 'expo-router';
import { Image, ScrollView, StyleSheet, Text, View } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import ICCDLoader from '@/components/ui/loader2';
import {
  FileText, DollarSign, Hash, Info,
  MessageCircle, Paperclip, AlertTriangle
} from 'lucide-react-native';

const ACCENT = '#0d9488';
const BORDER = 'rgba(14,165,233,0.18)';
const TEXT_PRIMARY = '#0f172a';
const TEXT_SECONDARY = '#6b7280';

const ViewDisputedList = () => {
  const router = useRouter();
  const { id } = useLocalSearchParams();
  const { data, userResponseData, isPending, isError, isLoading, error } = useGetDisputeById(id);
  const insets = useSafeAreaInsets();

  if (isLoading) return <ICCDLoader />;
  if (isError) return error.message;

  const { id: orderId, gigId, raised_by, title, total_price, subject, reason, disputeFilesClient } = data[0];

  const SectionCard = ({ icon, title, children }: any) => (
    <View style={styles.card}>
      <View style={styles.cardHeader}>
        <View style={styles.cardIconBox}>{icon}</View>
        <Text style={styles.cardTitle}>{title}</Text>
      </View>
      <View style={styles.cardBody}>{children}</View>
    </View>
  );

  return (
    <LinearGradient
      colors={['#f0f9ff', '#e0f2fe', '#bae6fd', '#7dd3fc']}
      style={styles.gradient}
      start={{ x: 0, y: 0 }}
      end={{ x: 0.6, y: 1 }}
    >
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={[styles.scrollContent, { paddingTop: insets.top + 60 }]}
      >

        {/* Hero */}
        <LinearGradient
          colors={[ACCENT, '#0891b2']}
          start={{ x: 0, y: 0 }}
          end={{ x: 1, y: 1 }}
          style={styles.heroCard}
        >
          <View style={styles.statusBadge}>
            <View style={styles.statusDot} />
            <Text style={styles.statusText}>Under Review</Text>
          </View>
          <Text style={styles.heroTitle}>{title}</Text>
          <Text style={styles.heroSub}>Payment Status: No action taken yet</Text>
        </LinearGradient>

        {/* Order Summary */}
        <SectionCard icon={<FileText size={18} color={ACCENT} />} title="Order Summary">
          <View style={styles.statsGrid}>
            <View style={styles.statBox}>
              <View style={styles.statIconBox}>
                <DollarSign size={16} color={ACCENT} />
              </View>
              <Text style={styles.statLabel}>Total Amount</Text>
              <Text style={styles.statValue}>{total_price}</Text>
            </View>
            <View style={styles.statDivider} />
            <View style={styles.statBox}>
              <View style={styles.statIconBox}>
                <DollarSign size={16} color="#10b981" />
              </View>
              <Text style={styles.statLabel}>Paid Amount</Text>
              <Text style={[styles.statValue, { color: '#10b981' }]}>$50.0</Text>
            </View>
            <View style={styles.statDivider} />
            <View style={styles.statBox}>
              <View style={styles.statIconBox}>
                <Hash size={16} color={ACCENT} />
              </View>
              <Text style={styles.statLabel}>Order ID</Text>
              <Text style={styles.statValue} numberOfLines={1}>{orderId}</Text>
            </View>
          </View>
        </SectionCard>

        {/* Dispute Details */}
        <SectionCard icon={<Info size={18} color={ACCENT} />} title="Dispute Details">
          <View style={styles.detailItem}>
            <Text style={styles.detailLabel}>Subject</Text>
            <Text style={styles.detailValue}>{subject}</Text>
          </View>
          <View style={styles.detailItem}>
            <Text style={styles.detailLabel}>Reason</Text>
            <Text style={styles.detailValue}>{reason}</Text>
          </View>
          <View style={[styles.detailItem, { marginBottom: 0 }]}>
            <Text style={styles.detailLabel}>Settlements</Text>
            <Text style={styles.detailValue}>No settlements proposed yet.</Text>
          </View>
        </SectionCard>

        {/* Evidence */}
        <SectionCard icon={<Paperclip size={18} color={ACCENT} />} title="Evidence">
          <View style={styles.evidenceRow}>
            {disputeFilesClient?.split(",")?.map((item: string, index: number) => (
              <Image key={index} source={{ uri: item }} style={styles.image} />
            ))}
          </View>
        </SectionCard>

        {/* Respond Button */}
        {(userResponseData?.length === 0 && raised_by === 'freelancer') && (
          <ButtonRN handleClick={() => console.log("button clicked")}>
            Respond
          </ButtonRN>
        )}

        {(userResponseData?.length === 0 && raised_by === 'client') && (
          <View style={styles.pendingBox}>
            <AlertTriangle size={18} color="#f59e0b" />
            <Text style={styles.pendingText}>Freelancer has not responded yet.</Text>
          </View>
        )}

        {/* Response */}
        {userResponseData?.length > 0 && (
          <SectionCard icon={<MessageCircle size={18} color={ACCENT} />} title="Freelancer Response">
            <Text style={styles.responseMessage}>{userResponseData[0]?.message}</Text>
            {userResponseData[0]?.disputeFilesFreelancer && (
              <View style={styles.freelancerEvidenceBox}>
                <Text style={styles.evidenceLabelSmall}>Evidence</Text>
                {userResponseData[0]?.disputeFilesFreelancer?.split(",")?.map((item: string, index: number) => (
                  <Image key={index} source={{ uri: item }} style={styles.image} />
                ))}
              </View>
            )}
          </SectionCard>
        )}

        <View style={{ height: 40 }} />
      </ScrollView>
    </LinearGradient>
  );
};

const styles = StyleSheet.create({
  gradient: { flex: 1 },
  scrollContent: {
    padding: 16,
    paddingBottom: 40,
  },

  // Hero
  heroCard: {
    borderRadius: 18,
    padding: 20,
    marginBottom: 14,
  },
  statusBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'rgba(255,255,255,0.22)',
    alignSelf: 'flex-start',
    paddingHorizontal: 12,
    paddingVertical: 5,
    borderRadius: 20,
    gap: 6,
    marginBottom: 12,
  },
  statusDot: { width: 6, height: 6, borderRadius: 3, backgroundColor: '#fbbf24' },
  statusText: { color: 'white', fontSize: 12, fontWeight: '600' },
  heroTitle: {
    fontSize: 20,
    fontWeight: '800',
    color: '#fff',
    lineHeight: 28,
    marginBottom: 6,
    letterSpacing: -0.3,
  },
  heroSub: { fontSize: 12, color: 'rgba(255,255,255,0.75)', fontWeight: '500' },

  // Card
  card: {
    backgroundColor: 'rgba(255,255,255,0.82)',
    borderRadius: 16,
    marginBottom: 14,
    borderWidth: 1,
    borderColor: BORDER,
    overflow: 'hidden',
  },
  cardHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 14,
    borderBottomWidth: 1,
    borderBottomColor: BORDER,
    gap: 10,
  },
  cardIconBox: {
    width: 34,
    height: 34,
    borderRadius: 10,
    backgroundColor: 'rgba(13,148,136,0.10)',
    alignItems: 'center',
    justifyContent: 'center',
  },
  cardTitle: { fontSize: 15, fontWeight: '700', color: TEXT_PRIMARY },
  cardBody: { padding: 14 },

  // Stats
  statsGrid: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  statBox: {
    flex: 1,
    alignItems: 'center',
    gap: 4,
  },
  statIconBox: {
    width: 32,
    height: 32,
    borderRadius: 9,
    backgroundColor: 'rgba(13,148,136,0.10)',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 4,
  },
  statLabel: { fontSize: 10, color: TEXT_SECONDARY, fontWeight: '600', textTransform: 'uppercase', letterSpacing: 0.4 },
  statValue: { fontSize: 14, fontWeight: '700', color: TEXT_PRIMARY },
  statDivider: { width: 1, height: 40, backgroundColor: BORDER, marginHorizontal: 8 },

  // Detail
  detailItem: { marginBottom: 14 },
  detailLabel: { fontSize: 12, fontWeight: '700', color: TEXT_SECONDARY, textTransform: 'uppercase', letterSpacing: 0.5, marginBottom: 4 },
  detailValue: { fontSize: 14, color: TEXT_PRIMARY, lineHeight: 20 },

  // Evidence
  evidenceRow: { gap: 12 },
  image: { width: '100%', height: 180, borderRadius: 10 },

  // Pending
  pendingBox: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
    backgroundColor: 'rgba(245,158,11,0.10)',
    borderRadius: 12,
    padding: 14,
    borderWidth: 1,
    borderColor: 'rgba(245,158,11,0.22)',
    marginBottom: 14,
  },
  pendingText: { fontSize: 14, color: '#92400e', fontWeight: '600' },

  // Response
  responseMessage: { fontSize: 14, color: TEXT_PRIMARY, lineHeight: 22, marginBottom: 14 },
  freelancerEvidenceBox: {
    backgroundColor: 'rgba(14,165,233,0.06)',
    borderRadius: 12,
    padding: 12,
    gap: 10,
    borderWidth: 1,
    borderColor: BORDER,
  },
  evidenceLabelSmall: { fontSize: 12, fontWeight: '700', color: TEXT_SECONDARY, marginBottom: 6 },
});

export default ViewDisputedList;