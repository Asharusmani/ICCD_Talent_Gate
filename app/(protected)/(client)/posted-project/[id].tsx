import { useGetProjectProposalByClient, useGetProjectsById, useGetProjectShortlistProposals } from "@/api/client/project";
import { formatDate } from "@/functions/date-format";
import {
    MaterialCommunityIcons,
    MaterialIcons,
    Ionicons
} from "@expo/vector-icons";
import { LinearGradient } from "expo-linear-gradient";
import { useLocalSearchParams } from "expo-router";
import {
    ScrollView,
    StyleSheet,
    Text,
    TouchableOpacity,
    View,
    Animated,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import ICCDLoader from '@/components/ui/loader2';
import { useEffect, useRef, useState } from "react";

interface User {
  name: string;
  email: string;
}

const ProjectDetail = () => {
  const { id } = useLocalSearchParams();
  const { data, isSuccess, isLoading } = useGetProjectsById(id);
  const { data: propData } = useGetProjectProposalByClient(id);

  const [expandedProposal, setExpandedProposal] = useState<number | null>(null);

  // Animations
  const fadeAnim = useRef(new Animated.Value(0)).current;
  const slideAnim = useRef(new Animated.Value(20)).current;

  useEffect(() => {
    if (isSuccess) {
      Animated.parallel([
        Animated.timing(fadeAnim, {
          toValue: 1,
          duration: 600,
          useNativeDriver: true,
        }),
        Animated.spring(slideAnim, {
          toValue: 0,
          friction: 8,
          useNativeDriver: true,
        }),
      ]).start();
    }
  }, [isSuccess]);

  if (isLoading) return <ICCDLoader />;

  const proposalCount = propData?.length || 0;

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.scrollContent}
      >
        <Animated.View style={{ 
          opacity: fadeAnim, 
          transform: [{ translateY: slideAnim }] 
        }}>
          
          {/* HERO HEADER */}
          <LinearGradient
            colors={["#3A8F97", "#2E7D85"]}
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 1 }}
            style={[styles.heroCard, styles.elevation]}
          >
            <View style={styles.heroContent}>
              <View style={styles.statusBadge}>
                <View style={styles.statusDot} />
                <Text style={styles.statusText}>Active</Text>
              </View>

              <Text style={styles.heroTitle}>{data[0]?.title || 'Project Title'}</Text>

              <View style={styles.heroMetaRow}>
                <View style={styles.metaChip}>
                  <MaterialCommunityIcons name="map-marker" size={14} color="#3A8F97" />
                  <Text style={styles.metaChipText}>Remote</Text>
                </View>
                <View style={styles.metaChip}>
                  <MaterialCommunityIcons name="clock-outline" size={14} color="#3A8F97" />
                  <Text style={styles.metaChipText}>{data[0]?.duration || 'N/A'}</Text>
                </View>
                <View style={styles.metaChip}>
                  <MaterialIcons name="person-outline" size={14} color="#3A8F97" />
                  <Text style={styles.metaChipText}>Freelancer</Text>
                </View>
              </View>
            </View>
          </LinearGradient>

          {/* STATS CARDS */}
         <View style={styles.statsGrid}>
  {/* Budget Card */}
  <View style={[styles.statCard, styles.elevation]}>
    <View style={styles.statTop}>
      <MaterialCommunityIcons
        name="cash"
        size={22}
        color="#2E7D32"
        style={styles.statIcon}
      />

      <View style={styles.statInfo}>
        <Text style={styles.statLabel}>Budget</Text>
        <Text style={styles.statValue}>
          {data[0]?.budget || 'N/A'}
        </Text>
      </View>
    </View>

    <View style={styles.statTag}>
      <Text style={styles.statTagText}>Fixed Price</Text>
    </View>
  </View>

  {/* Proposals Card */}
  <View style={[styles.statCard, styles.elevation]}>
    <View style={styles.statTop}>
      <MaterialCommunityIcons
        name="file-document"
        size={22}
        color="#1565C0"
        style={styles.statIcon}
      />

      <View style={styles.statInfo}>
        <Text style={styles.statLabel}>Proposals</Text>
        <Text style={styles.statValue}>{proposalCount}</Text>
      </View>
    </View>

    <View style={styles.progressWrapper}>
      <View style={styles.progressBar}>
        <View
          style={[
            styles.progressFill,
            { width: `${Math.min((proposalCount / 10) * 100, 100)}%` },
          ]}
        />
      </View>
      <Text style={styles.progressLabel}>
        {proposalCount}/10 Received
      </Text>
    </View>
  </View>
</View>


          {/* DELIVERABLES */}
          <View style={[styles.card, styles.elevation]}>
            <View style={styles.cardHeader}>
              <View style={styles.headerLeft}>
                <View style={styles.cardIconBadge}>
                  <MaterialCommunityIcons name="package-variant" size={20} color="#3A8F97" />
                </View>
                <Text style={styles.cardTitle}>Deliverables</Text>
              </View>
            </View>
            <View style={styles.cardBody}>
              <Text style={styles.bodyText}>
                {data[0]?.deliverable || 'No deliverables specified'}
              </Text>
            </View>
          </View>

          {/* PROJECT INFO */}
          <View style={[styles.card, styles.elevation]}>
            <View style={styles.cardHeader}>
              <View style={styles.headerLeft}>
                <View style={styles.cardIconBadge}>
                  <MaterialIcons name="info-outline" size={20} color="#3A8F97" />
                </View>
                <Text style={styles.cardTitle}>Project Information</Text>
              </View>
            </View>
            <View style={styles.cardBody}>
              {/* Languages */}
              <View style={styles.infoItem}>
                <View style={styles.infoRow}>
                  <View style={styles.infoIconCircle}>
                    <MaterialCommunityIcons name="translate" size={18} color="#3A8F97" />
                  </View>
                  <Text style={styles.infoLabel}>Languages</Text>
                </View>
                <View style={styles.languageChips}>
                  {data[0]?.languages?.split(",")?.map((item: string, index: number) => (
                    <View key={index} style={styles.languageChip}>
                      <Text style={styles.languageText}>{item.trim()}</Text>
                    </View>
                  ))}
                </View>
              </View>

              {/* Deadline */}
              <View style={styles.infoItem}>
                <View style={styles.infoRow}>
                  <View style={styles.infoIconCircle}>
                    <MaterialCommunityIcons name="calendar-clock" size={18} color="#3A8F97" />
                  </View>
                  <Text style={styles.infoLabel}>Project Deadline</Text>
                </View>
                <Text style={styles.infoValue}>
                  {formatDate(data[0]?.deadline) || 'No deadline set'}
                </Text>
              </View>
            </View>
          </View>

          {/* PROPOSALS */}
          {propData && propData.length > 0 && (
            <View style={[styles.card, styles.elevation]}>
              <View style={styles.cardHeader}>
                <View style={styles.headerLeft}>
                  <View style={styles.cardIconBadge}>
                    <MaterialIcons name="people-outline" size={20} color="#3A8F97" />
                  </View>
                  <Text style={styles.cardTitle}>Proposals Received</Text>
                </View>
                <View style={styles.countBadge}>
                  <Text style={styles.countBadgeText}>{propData.length}</Text>
                </View>
              </View>

              <View style={styles.cardBody}>
                {propData.map((item: User, index: number) => {
                  const isExpanded = expandedProposal === index;
                  const initials = item?.name
                    ?.split(' ')
                    .map(n => n[0])
                    .join('')
                    .toUpperCase()
                    .substring(0, 2) || 'U';

                  return (
                    <TouchableOpacity
                      key={index}
                      style={[
                        styles.proposalCard,
                        isExpanded && styles.proposalCardActive,
                      ]}
                      onPress={() => setExpandedProposal(isExpanded ? null : index)}
                      activeOpacity={0.7}
                    >
                      <View style={styles.proposalHeader}>
                        <LinearGradient
                          colors={['#3A8F97', '#2E7D85']}
                          style={styles.avatar}
                        >
                          <Text style={styles.avatarText}>{initials}</Text>
                        </LinearGradient>
                        
                        <View style={styles.proposalInfo}>
                          <Text style={styles.proposalName}>{item?.name}</Text>
                          <Text style={styles.proposalEmail}>{item?.email}</Text>
                        </View>

                        <View style={styles.proposalActions}>
                          <TouchableOpacity style={styles.iconButton}>
                            <MaterialCommunityIcons name="download-outline" size={18} color="#3A8F97" />
                          </TouchableOpacity>
                          <Ionicons 
                            name={isExpanded ? "chevron-up" : "chevron-down"} 
                            size={18} 
                            color="#94a3b8" 
                          />
                        </View>
                      </View>

                      {isExpanded && (
                        <View style={styles.proposalExpanded}>
                          <TouchableOpacity style={styles.btnPrimary}>
                            <Text style={styles.btnPrimaryText}>View Full Profile</Text>
                            <Ionicons name="arrow-forward" size={16} color="white" />
                          </TouchableOpacity>
                          <TouchableOpacity style={styles.btnOutline}>
                            <MaterialCommunityIcons name="message-outline" size={16} color="#3A8F97" />
                            <Text style={styles.btnOutlineText}>Send Message</Text>
                          </TouchableOpacity>
                        </View>
                      )}
                    </TouchableOpacity>
                  );
                })}
              </View>
            </View>
          )}

          {/* SKILLS */}
          <View style={[styles.card, styles.elevation]}>
            <View style={styles.cardHeader}>
              <View style={styles.headerLeft}>
                <View style={styles.cardIconBadge}>
                  <MaterialCommunityIcons name="star-outline" size={20} color="#3A8F97" />
                </View>
                <Text style={styles.cardTitle}>Required Skills</Text>
              </View>
            </View>
            <View style={styles.cardBody}>
              <View style={styles.skillsGrid}>
                {data[0]?.skills?.split(",")?.map((item: string, index: number) => (
                  <View key={index} style={styles.skillBadge}>
                    <View style={styles.skillDot} />
                    <Text style={styles.skillText}>{item.trim()}</Text>
                    <Ionicons name="checkmark-circle" size={14} color="#10b981" />
                  </View>
                ))}
              </View>
            </View>
          </View>

          {/* APPLY BUTTON */}
          <TouchableOpacity activeOpacity={0.8}>
            <LinearGradient
              colors={["#3A8F97", "#2E7D85"]}
              start={{ x: 0, y: 0 }}
              end={{ x: 1, y: 1 }}
              style={[styles.applyButton, styles.elevation]}
            >
              <Text style={styles.applyText}>Apply for this Project</Text>
              <Ionicons name="arrow-forward-circle" size={22} color="white" />
            </LinearGradient>
          </TouchableOpacity>

        </Animated.View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default ProjectDetail;

const styles = StyleSheet.create({
  container: { 
    flex: 1, 
    backgroundColor: '#F4F4F4',
  },
  
  scrollContent: { 
    padding: 16,
    paddingBottom: 40,
  },

  elevation: {
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.08,
    shadowRadius: 12,
    elevation: 4,
  },

  /* HERO */
  heroCard: {
    borderRadius: 20,
    marginBottom: 20,
    overflow: 'hidden',
  },

  heroContent: {
    padding: 24,
  },

  statusBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'rgba(255,255,255,0.25)',
    alignSelf: 'flex-start',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 20,
    gap: 6,
    marginBottom: 16,
  },

  statusDot: {
    width: 6,
    height: 6,
    borderRadius: 3,
    backgroundColor: '#10b981',
  },

  statusText: {
    color: 'white',
    fontSize: 12,
    fontWeight: '600',
  },

  heroTitle: {
    fontSize: 26,
    fontWeight: '800',
    color: 'white',
    lineHeight: 34,
    marginBottom: 16,
  },

  heroMetaRow: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 8,
  },

  metaChip: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'white',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 20,
    gap: 4,
  },

  metaChipText: {
    color: '#3A8F97',
    fontSize: 12,
    fontWeight: '600',
  },

 statsGrid: {
  flexDirection: 'row',
  gap: 12,
  marginBottom: 20,
},

statCard: {
  flex: 1,
  backgroundColor: '#fff',
  borderRadius: 14,
  padding: 14,
},

statTop: {
  flexDirection: 'row',
  alignItems: 'center',
  gap: 10,
  marginBottom: 12,
},

statIcon: {
  backgroundColor: '#F1F5F9',
  padding: 8,
  borderRadius: 10,
},

statInfo: {
  flex: 1,
},

statLabel: {
  fontSize: 13,
  color: '#6B7280',
},

statValue: {
  fontSize: 18,
  fontWeight: '700',
  color: '#111827',
  marginTop: 2,
},

statTag: {
  alignSelf: 'flex-start',
  backgroundColor: '#E8F5E9',
  paddingHorizontal: 10,
  paddingVertical: 4,
  borderRadius: 20,
},

statTagText: {
  fontSize: 12,
  color: '#2E7D32',
  fontWeight: '600',
},

progressWrapper: {
  marginTop: 8,
},

progressBar: {
  height: 6,
  backgroundColor: '#E5E7EB',
  borderRadius: 6,
  overflow: 'hidden',
},

progressFill: {
  height: '100%',
  backgroundColor: '#1565C0',
},

progressLabel: {
  fontSize: 12,
  color: '#6B7280',
  marginTop: 6,
},


  /* CARD */
  card: {
    backgroundColor: 'white',
    borderRadius: 16,
    marginBottom: 16,
    overflow: 'hidden',
  },

  cardHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: 20,
    borderBottomWidth: 1,
    borderBottomColor: '#f1f5f9',
  },

  headerLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
  },

  cardIconBadge: {
    width: 40,
    height: 40,
    borderRadius: 10,
    backgroundColor: '#f0f9fa',
    justifyContent: 'center',
    alignItems: 'center',
  },

  cardTitle: {
    fontSize: 17,
    fontWeight: '700',
    color: '#0f172a',
  },

  countBadge: {
    backgroundColor: '#3A8F97',
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 10,
    minWidth: 28,
    alignItems: 'center',
  },

  countBadgeText: {
    color: 'white',
    fontSize: 12,
    fontWeight: '700',
  },

  cardBody: {
    padding: 20,
  },

  bodyText: {
    fontSize: 14,
    color: '#475569',
    lineHeight: 22,
  },

  /* INFO */
  infoItem: {
    marginBottom: 20,
  },

  infoRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
    marginBottom: 10,
  },

  infoIconCircle: {
    width: 36,
    height: 36,
    borderRadius: 18,
    backgroundColor: '#f0f9fa',
    justifyContent: 'center',
    alignItems: 'center',
  },

  infoLabel: {
    fontSize: 14,
    fontWeight: '600',
    color: '#64748b',
  },

  infoValue: {
    fontSize: 15,
    fontWeight: '600',
    color: '#0f172a',
    marginLeft: 46,
  },

  languageChips: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 8,
    marginLeft: 46,
  },

  languageChip: {
    backgroundColor: '#f0f9fa',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 8,
  },

  languageText: {
    fontSize: 13,
    fontWeight: '600',
    color: '#3A8F97',
  },

  /* PROPOSALS */
  proposalCard: {
    backgroundColor: '#f8fafc',
    borderRadius: 14,
    padding: 16,
    marginBottom: 12,
  },

  proposalCardActive: {
    backgroundColor: '#f0f9fa',
    borderWidth: 1,
    borderColor: '#3A8F97',
  },

  proposalHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
  },

  avatar: {
    width: 48,
    height: 48,
    borderRadius: 24,
    justifyContent: 'center',
    alignItems: 'center',
  },

  avatarText: {
    fontSize: 16,
    fontWeight: '700',
    color: 'white',
  },

  proposalInfo: {
    flex: 1,
  },

  proposalName: {
    fontSize: 15,
    fontWeight: '700',
    color: '#0f172a',
    marginBottom: 2,
  },

  proposalEmail: {
    fontSize: 13,
    color: '#64748b',
  },

  proposalActions: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },

  iconButton: {
    width: 36,
    height: 36,
    borderRadius: 10,
    backgroundColor: '#f0f9fa',
    justifyContent: 'center',
    alignItems: 'center',
  },

  proposalExpanded: {
    marginTop: 16,
    paddingTop: 16,
    borderTopWidth: 1,
    borderTopColor: '#e2e8f0',
    gap: 8,
  },

  btnPrimary: {
    backgroundColor: '#3A8F97',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 12,
    borderRadius: 10,
    gap: 6,
  },

  btnPrimaryText: {
    color: 'white',
    fontSize: 14,
    fontWeight: '600',
  },

  btnOutline: {
    backgroundColor: 'white',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 12,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: '#e2e8f0',
    gap: 6,
  },

  btnOutlineText: {
    color: '#3A8F97',
    fontSize: 14,
    fontWeight: '600',
  },

  /* SKILLS */
  skillsGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 8,
  },

  skillBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#f8fafc',
    paddingVertical: 8,
    paddingHorizontal: 12,
    borderRadius: 10,
    gap: 6,
    borderWidth: 1,
    borderColor: '#e2e8f0',
  },

  skillDot: {
    width: 5,
    height: 5,
    borderRadius: 2.5,
    backgroundColor: '#3A8F97',
  },

  skillText: {
    fontSize: 13,
    fontWeight: '600',
    color: '#334155',
  },

  /* APPLY */
  applyButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 18,
    borderRadius: 16,
    gap: 10,
  },

  applyText: {
    color: 'white',
    fontSize: 17,
    fontWeight: '700',
  },
});