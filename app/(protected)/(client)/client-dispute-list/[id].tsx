import { useGetDisputeById } from '@/api/client/dispute';
import ButtonRN from '@/components/ui/button';
import {
  MaterialCommunityIcons
} from '@expo/vector-icons';
import { useLocalSearchParams, useRouter } from 'expo-router';
import {
  Image,
  ScrollView,
  StyleSheet,
  Text,
  View
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import ICCDLoader from '@/components/ui/loader2';

const ViewDisputedList = () => {

  const router = useRouter();
  const { id } = useLocalSearchParams()
  const { data, userResponseData, isPending, isError, isLoading, error } = useGetDisputeById(id)

  if (isLoading) return <ICCDLoader />
  if (isError) return error.message;

  const { id: orderId, gigId, raised_by, title, total_price, subject, reason, disputeFilesClient } = data[0]

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.scrollContent}
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
        {(userResponseData?.length === 0 && raised_by === 'freelancer')
          &&
          <ButtonRN handleClick={() => console.log("button clicked")}>
            Respond
          </ButtonRN>
        }

        {(userResponseData?.length === 0 && raised_by === 'client')
          &&
          <Text>Freelancer not responded yet.</Text>
        }

        {userResponseData?.length > 0 && (
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
        )
        }

      </ScrollView>
    </SafeAreaView>
  );
};


const styles = StyleSheet.create({

  container: { flex: 1, backgroundColor: '#F4F4F4' },
  header: { paddingHorizontal: 20, paddingTop: 10, paddingBottom: 20 },
  backButton: { width: 40, height: 40, borderRadius: 10, backgroundColor: '#8CB4B8', justifyContent: 'center', alignItems: 'center', marginBottom: 20 },
  headerTitleRow: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'flex-start' },
  disputeId: { fontSize: 22, fontWeight: 'bold', color: '#0B3040' },
  orderCreatedText: { fontSize: 13, color: '#0B3040', marginTop: 4 },
  statusBadge: { flexDirection: 'row', alignItems: 'center', backgroundColor: '#DCE7EE', paddingHorizontal: 10, paddingVertical: 6, borderRadius: 20 },
  statusText: { fontSize: 14, color: '#4A6173', marginLeft: 5, fontWeight: '500' },
  scrollContent: { paddingHorizontal: 16, paddingBottom: 30 },
  card: { backgroundColor: 'white', borderRadius: 12, padding: 20, marginBottom: 16, elevation: 10, shadowColor: '#000', shadowOffset: { width: 0, height: 1 }, shadowOpacity: 0.4, shadowRadius: 2 },
  cardTitle: { fontSize: 18, fontWeight: 'bold', color: '#0B3040', marginBottom: 12 },
  orderDescription: { fontSize: 14, color: '#7E8A96', lineHeight: 20, marginBottom: 20 },
  dataGrid: { flexDirection: 'row', justifyContent: 'space-between', marginBottom: 20 },
  dataCol: { flex: 1 },
  label: { fontSize: 14, fontWeight: 'bold', color: '#0B3040' },
  value: { fontSize: 14, color: '#7E8A96', marginTop: 4 },
  greenText: { color: '#2EA44F', fontWeight: '600' },
  spacer: { height: 15 },
  footerText: { fontSize: 13, color: '#9AA5B1' },
  detailItem: { marginBottom: 15 },
  detailLabel: { fontSize: 15, fontWeight: 'bold', color: '#3B556E' },
  detailValue: { fontSize: 14, color: '#7E8A96', marginTop: 4 },
  evidenceRow: { flexDirection: 'column', justifyContent: 'space-between', gap: 25 },
  image: {
    width: '100%',
    height: 180,
  },
  evidenceContainer: { width: '48%' },
  imagePlaceholder: { aspectRatio: 1, backgroundColor: '#EAEAEA', borderRadius: 12, justifyContent: 'center', alignItems: 'center', marginBottom: 10 },
  downloadButton: { flexDirection: 'row', backgroundColor: '#2EA44F', paddingVertical: 8, borderRadius: 6, justifyContent: 'center', alignItems: 'center' },
  downloadText: { color: 'white', fontSize: 13, fontWeight: 'bold', marginLeft: 6 },
  responseHeader: { flexDirection: 'row', alignItems: 'flex-start', marginBottom: 15 },
  responseTitle: { flex: 1, fontSize: 17, fontWeight: 'bold', color: '#0B3040', marginLeft: 10 },
  freelancerEvidenceBox: { backgroundColor: '#EDF2F4', borderRadius: 10, padding: 12, gap: 25 },
  evidenceLabelSmall: { fontSize: 13, fontWeight: 'bold', color: '#0B3040', marginBottom: 10 },
  smallEvidenceRow: { flexDirection: 'row', justifyContent: 'space-between' },
  smallEvidenceContainer: { width: '31%' },
  smallImagePlaceholder: { aspectRatio: 1, backgroundColor: '#E2D9D9', borderRadius: 8, justifyContent: 'center', alignItems: 'center', marginBottom: 6 },
  smallDownloadText: { color: 'white', fontSize: 9, fontWeight: 'bold', marginLeft: 3 },

});

export default ViewDisputedList;
