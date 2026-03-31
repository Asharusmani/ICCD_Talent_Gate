import { useGetProjectsById } from "@/api/client/project";
import { formatDate } from "@/functions/date-format";
import { useAuth } from "@/utils/auth-context";
import {
    MaterialCommunityIcons,
    MaterialIcons
} from "@expo/vector-icons";
import { LinearGradient } from "expo-linear-gradient";
import { router, useLocalSearchParams } from "expo-router";
import {
    ScrollView,
    StyleSheet,
    Text,
    TouchableOpacity,
    View
} from "react-native";
import { BlurView } from "expo-blur";
import ICCDLoader from '@/components/ui/loader2';
import { useHeaderHeight } from '@react-navigation/elements';

const ACCENT = '#0d9488';
const BORDER = 'rgba(255,255,255,0.55)';
const TEXT_PRIMARY = '#0f172a';
const TEXT_SECONDARY = '#6b7280';

interface User {
  name: string;
  email: string;
}

const ProjectDetail = () => {
  const headerHeight = useHeaderHeight();
  const { freelancer } = useAuth()
  const { id } = useLocalSearchParams()
  const { data, isSuccess, isPending, isError, isLoading } = useGetProjectsById(id)

  if (isLoading) return <ICCDLoader />

  const { clientID } = data[0]

  return (
    <LinearGradient
      colors={['#f0f9ff', '#e0f2fe', '#bae6fd', '#7dd3fc']}
      style={{ flex: 1 }}
      start={{ x: 0, y: 0 }}
      end={{ x: 0.6, y: 1 }}
    >
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={[
          styles.scrollContent,
          { paddingTop: headerHeight + 16 }
        ]}
      >
        {/* SECTION 1 */}
        <BlurView intensity={45} tint="light" style={styles.card}>
          <View style={styles.titleRow}>
            <View style={styles.accentBar} />
            <Text style={styles.mainTitle}>We're looking for a...</Text>
          </View>

          <Text style={styles.subTitle}>{data[0]?.title || 'N/A'}</Text>

          <View style={styles.tagContainer}>
            <View style={styles.tagBubble}>
              <MaterialCommunityIcons name="earth" size={16} color="#fff" />
              <Text style={styles.tagText}>Remote</Text>
            </View>
            <View style={styles.tagBubble}>
              <MaterialCommunityIcons name="clock-time-four-outline" size={16} color="#fff" />
              <Text style={styles.tagText}>{data[0]?.duration || 'N/A'}</Text>
            </View>
          </View>

          <View style={[styles.tagBubble, { alignSelf: 'flex-start', marginTop: 12 }]}>
            <MaterialIcons name="group" size={16} color="#fff" />
            <Text style={styles.tagText}>Hiring freelancer</Text>
          </View>
        </BlurView>

        {/* SECTION 2 */}
        <BlurView intensity={45} tint="light" style={styles.budgetCard}>
          <Text style={styles.budgetTextSmall}>Client Budget</Text>
          <Text style={styles.budgetAmount}>{data[0]?.budget || 'N/A'}</Text>

          <View style={styles.proposalRow}>
            <View style={styles.proposalSegments}>
              {[1, 2, 3].map((i) => (
                <View key={i} style={[styles.segment, styles.activeSegment]} />
              ))}
              {[4, 5].map((i) => (
                <View key={i} style={[styles.segment, styles.inactiveSegment]} />
              ))}
            </View>
            <Text style={styles.proposalText}>2 Proposals</Text>
          </View>

          <TouchableOpacity
            style={styles.interestButton}
            onPress={() => router.push({
              pathname: '/project/step1-project-details',
              params: { freelancerId: freelancer.id, projectId: id, clientId: clientID }
            })}
          >
            <LinearGradient
              colors={[ACCENT, '#0891b2']}
              start={{ x: 0, y: 0 }}
              end={{ x: 1, y: 0 }}
              style={styles.interestGradient}
            >
              <Text style={styles.interestButtonText}>I'm Interested</Text>
            </LinearGradient>
          </TouchableOpacity>
        </BlurView>

        {/* SECTION 3 */}
        <BlurView intensity={45} tint="light" style={styles.cardWithHeader}>
          <View style={styles.cardHeaderArea}>
            <Text style={styles.cardHeaderText}>Deliverables</Text>
          </View>
          <View style={styles.cardBody}>
            <Text style={styles.descriptionText}>
              {data[0]?.deliverable || 'N/A'}
            </Text>

            {/* <View style={styles.deadlineBox}>
              <View style={styles.deadlineHeader}>
                <MaterialCommunityIcons name="calendar-month" size={20} color="#0A5A72" />
                <Text style={styles.deadlineTitle}>Deadline</Text>
              </View>
              <Text style={styles.deadlineDate}>April 3 - April 3, 2010</Text>
            </View> */}
          </View>
        </BlurView>

        {/* SECTION 4 */}
        <BlurView intensity={45} tint="light" style={styles.card}>
          {/* <View style={styles.infoItem}>
            <View style={styles.iconCircle}>
              <MaterialIcons name="business-center" size={24} color="white" />
            </View>
            <Text style={styles.infoLabel}>Project type</Text>
            <Text style={styles.infoValue}>Fixed Prize</Text>
          </View> */}

          <View style={styles.infoItem}>
            <View style={styles.iconCircle}>
              <MaterialCommunityIcons name="earth" size={22} color="#fff" />
            </View>
            <Text style={styles.infoLabel}>Language</Text>
            {data[0]?.languages?.split(",")?.map((item: string, index: number) => (
              <Text key={index} style={styles.infoValue}>{item}</Text>
            ))}
          </View>

          <View style={styles.infoItem}>
            <View style={styles.iconCircle}>
              <MaterialCommunityIcons name="calendar-check" size={22} color="#fff" />
            </View>
            <Text style={styles.infoLabel}>Project Deadline</Text>
            <Text style={styles.infoValue}>
              {formatDate(data[0]?.deadline) || 'N/A'}
            </Text>
          </View>
        </BlurView>

        {/* SECTION 6 */}
        <BlurView intensity={45} tint="light" style={styles.cardWithHeader}>
          <View style={styles.cardHeaderArea}>
            <Text style={styles.cardHeaderText}>Required Skills</Text>
          </View>
          <View style={styles.skillTagRow}>
            {data[0]?.skills?.split(",")?.map((item: string, index: number) => (
              <View key={index} style={styles.skillTag}>
                <Text style={styles.skillTagText}>{item}</Text>
              </View>
            ))}
          </View>
        </BlurView>

        {/* SECTION 7 */}
        {/* <View style={[styles.cardWithHeader, styles.cardShadow]}>
          <View style={styles.cardHeaderArea}>
            <Text style={styles.cardHeaderText}>{data[0]?.freelancerType || 'N/A'}</Text>
          </View>
          <View style={styles.skillTagRow}>
            <View style={styles.skillTag}>
              <Text style={styles.skillTagText}>Web</Text>
            </View>
          </View>
        </View> */}

      </ScrollView>
    </LinearGradient>
  );
};

export default ProjectDetail;

const styles = StyleSheet.create({
  scrollContent: {
    paddingHorizontal: 16,
    paddingBottom: 120,
    gap: 14,
  },

  headerNav: { paddingHorizontal: 15, paddingVertical: 10 },
  backButton: {
    width: 40, height: 40, borderRadius: 10,
    backgroundColor: "#8CB4B8",
    justifyContent: "center", alignItems: "center",
  },

  cardShadow: {
    elevation: 10,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.15,
    shadowRadius: 6,
  },

  // Glass Card
  card: {
    borderRadius: 20,
    overflow: 'hidden',
    borderWidth: 1,
    borderColor: BORDER,
    padding: 20,
  },

  titleRow: { flexDirection: "row", alignItems: "center", marginBottom: 8 },
  accentBar: {
    width: 4,
    height: 28,
    backgroundColor: ACCENT,
    marginRight: 10,
    borderRadius: 2,
  },
  mainTitle: { fontSize: 18, fontWeight: '800', color: TEXT_PRIMARY },
  subTitle: {
    fontSize: 16,
    color: ACCENT,
    marginLeft: 14,
    marginBottom: 14,
    fontWeight: '700',
  },

  tagContainer: { flexDirection: "row", flexWrap: 'wrap', gap: 8 },
  tagBubble: {
    flexDirection: "row",
    backgroundColor: ACCENT,
    paddingVertical: 7,
    paddingHorizontal: 14,
    borderRadius: 30,
    alignItems: "center",
    gap: 6,
  },
  tagText: { color: "#fff", fontSize: 12, fontWeight: '600' },

  // Budget Card
  budgetCard: {
    borderRadius: 20,
    overflow: 'hidden',
    borderWidth: 1,
    borderColor: BORDER,
    padding: 20,
  },
  budgetTextSmall: { fontSize: 13, color: TEXT_SECONDARY, fontWeight: '600', marginBottom: 4 },
  budgetAmount: {
    fontSize: 28,
    fontWeight: '900',
    color: TEXT_PRIMARY,
    letterSpacing: -0.5,
    marginBottom: 14,
  },
  proposalRow: { flexDirection: "row", alignItems: "center", marginBottom: 18 },
  proposalSegments: { flexDirection: "row", marginRight: 10, gap: 4 },
  segment: { width: 16, height: 7, borderRadius: 4 },
  activeSegment: { backgroundColor: ACCENT },
  inactiveSegment: { backgroundColor: 'rgba(14,165,233,0.2)' },
  proposalText: { fontSize: 12, color: TEXT_SECONDARY, fontWeight: '600' },

  interestButton: {
    borderRadius: 14,
    overflow: 'hidden',
    alignSelf: 'flex-start',
  },
  interestGradient: {
    paddingVertical: 12,
    paddingHorizontal: 28,
  },
  interestButtonText: { color: '#fff', fontWeight: '700', fontSize: 14 },

  // Card with Header
  cardWithHeader: {
    borderRadius: 20,
    overflow: 'hidden',
    borderWidth: 1,
    borderColor: BORDER,
  },
  cardHeaderArea: {
    backgroundColor: 'rgba(13,148,136,0.12)',
    borderBottomWidth: 1,
    borderBottomColor: 'rgba(13,148,136,0.15)',
    padding: 16,
  },
  cardHeaderText: {
    fontSize: 15,
    fontWeight: '800',
    color: ACCENT,
    letterSpacing: -0.3,
  },
  cardBody: { padding: 16 },
  descriptionText: {
    color: TEXT_SECONDARY,
    lineHeight: 22,
    fontSize: 14,
    marginBottom: 15,
  },

  deadlineBox: {
    backgroundColor: "#E8EAF6",
    padding: 15,
    borderRadius: 5,
    borderWidth: 1,
    borderColor: "#C5CAE9",
  },
  deadlineHeader: { flexDirection: "row", alignItems: "center" },
  deadlineTitle: { fontSize: 14, fontWeight: "bold", marginLeft: 8 },
  deadlineDate: { marginLeft: 28 },

  // Info Items
  infoItem: { alignItems: "center", marginBottom: 20 },
  iconCircle: {
    width: 48, height: 48, borderRadius: 24,
    backgroundColor: ACCENT,
    justifyContent: "center", alignItems: "center",
    marginBottom: 8,
    shadowColor: ACCENT,
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 6,
  },
  infoLabel: { fontSize: 14, fontWeight: '800', color: TEXT_PRIMARY, marginBottom: 3 },
  infoValue: { fontSize: 13, color: TEXT_SECONDARY, fontWeight: '500' },

  tableHeader: {
    flexDirection: "row",
    backgroundColor: ACCENT,
    paddingVertical: 12, paddingHorizontal: 15,
  },
  tableHeaderText: { flex: 1, color: "white", fontWeight: "bold", textAlign: "center" },
  tableRow: {
    flexDirection: "row",
    paddingVertical: 15, paddingHorizontal: 15,
    borderBottomWidth: 1, borderBottomColor: "#F0F0F0",
    alignItems: "center",
  },
  nameCell: { flex: 1, flexDirection: "row", alignItems: "center" },
  avatar: { width: 35, height: 35, borderRadius: 17.5, marginRight: 10 },
  rowText: { flex: 1, textAlign: "center", color: TEXT_PRIMARY, fontWeight: "500" },
  cvText: { flex: 1, color: TEXT_SECONDARY, fontSize: 11, textAlign: "center", fontWeight: "bold" },

  // Skills
  skillTagRow: { flexDirection: "row", flexWrap: 'wrap', padding: 14, gap: 8 },
  skillTag: {
    backgroundColor: 'rgba(13,148,136,0.10)',
    borderWidth: 1,
    borderColor: 'rgba(13,148,136,0.2)',
    paddingVertical: 8,
    paddingHorizontal: 16,
    borderRadius: 30,
  },
  skillTagText: { fontWeight: '700', color: ACCENT, fontSize: 12 },
});