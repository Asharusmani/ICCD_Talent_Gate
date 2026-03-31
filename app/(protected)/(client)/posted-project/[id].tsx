import { useGetProjectProposalByClient, useGetProjectsById } from "@/api/client/project";
import { formatDate } from "@/functions/date-format";
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
import { useSafeAreaInsets } from "react-native-safe-area-context";
import ICCDLoader from '@/components/ui/loader2';
import { useEffect, useRef, useState } from "react";
import {
    MapPin, Clock, User, DollarSign, FileText,
    Package, Info, Languages, Calendar,
    Users, Download, ChevronDown, ChevronUp,
    ArrowRight, MessageCircle, Star, CheckCircle2
} from "lucide-react-native";

const ACCENT = '#0d9488';
const BORDER = 'rgba(14,165,233,0.18)';
const TEXT_PRIMARY = '#0f172a';
const TEXT_SECONDARY = '#6b7280';

interface User {
    name: string;
    email: string;
}

const ProjectDetail = () => {
    const { id } = useLocalSearchParams();
    const { data, isSuccess, isLoading } = useGetProjectsById(id);
    const { data: propData } = useGetProjectProposalByClient(id);
    const insets = useSafeAreaInsets();
    const [expandedProposal, setExpandedProposal] = useState<number | null>(null);

    const fadeAnim = useRef(new Animated.Value(0)).current;
    const slideAnim = useRef(new Animated.Value(20)).current;

    useEffect(() => {
        if (isSuccess) {
            Animated.parallel([
                Animated.timing(fadeAnim, { toValue: 1, duration: 600, useNativeDriver: true }),
                Animated.spring(slideAnim, { toValue: 0, friction: 8, useNativeDriver: true }),
            ]).start();
        }
    }, [isSuccess]);

    if (isLoading) return <ICCDLoader />;

    const proposalCount = propData?.length || 0;

    return (
        <LinearGradient
            colors={['#f0f9ff', '#e0f2fe', '#bae6fd', '#7dd3fc']}
            style={styles.gradient}
            start={{ x: 0, y: 0 }}
            end={{ x: 0.6, y: 1 }}
        >
            <ScrollView
                showsVerticalScrollIndicator={false}
                contentContainerStyle={[styles.scrollContent, { paddingTop: insets.top + 70 }]}
            >
                <Animated.View style={{ opacity: fadeAnim, transform: [{ translateY: slideAnim }] }}>

                    {/* HERO */}
                    <LinearGradient
                        colors={[ACCENT, '#0891b2']}
                        start={{ x: 0, y: 0 }}
                        end={{ x: 1, y: 1 }}
                        style={styles.heroCard}
                    >
                        <View style={styles.statusBadge}>
                            <View style={styles.statusDot} />
                            <Text style={styles.statusText}>Active</Text>
                        </View>
                        <Text style={styles.heroTitle}>{data[0]?.title || 'Project Title'}</Text>
                        <View style={styles.heroMetaRow}>
                            <View style={styles.metaChip}>
                                <MapPin size={13} color={ACCENT} />
                                <Text style={styles.metaChipText}>Remote</Text>
                            </View>
                            <View style={styles.metaChip}>
                                <Clock size={13} color={ACCENT} />
                                <Text style={styles.metaChipText}>{data[0]?.duration || 'N/A'}</Text>
                            </View>
                            <View style={styles.metaChip}>
                                <User size={13} color={ACCENT} />
                                <Text style={styles.metaChipText}>Freelancer</Text>
                            </View>
                        </View>
                    </LinearGradient>

                    {/* STATS */}
                    <View style={styles.statsGrid}>
                        <View style={styles.statCard}>
                            <View style={styles.statIconBox}>
                                <DollarSign size={18} color={ACCENT} />
                            </View>
                            <Text style={styles.statLabel}>Budget</Text>
                            <Text style={styles.statValue}>{data[0]?.budget || 'N/A'}</Text>
                            <View style={styles.statTag}>
                                <Text style={styles.statTagText}>Fixed Price</Text>
                            </View>
                        </View>

                        <View style={styles.statCard}>
                            <View style={styles.statIconBox}>
                                <FileText size={18} color={ACCENT} />
                            </View>
                            <Text style={styles.statLabel}>Proposals</Text>
                            <Text style={styles.statValue}>{proposalCount}</Text>
                            <View style={styles.progressWrapper}>
                                <View style={styles.progressBar}>
                                    <View style={[styles.progressFill, { width: `${Math.min((proposalCount / 10) * 100, 100)}%` }]} />
                                </View>
                                <Text style={styles.progressLabel}>{proposalCount}/10</Text>
                            </View>
                        </View>
                    </View>

                    {/* DELIVERABLES */}
                    <View style={styles.card}>
                        <View style={styles.cardHeader}>
                            <View style={styles.cardIconBadge}>
                                <Package size={18} color={ACCENT} />
                            </View>
                            <Text style={styles.cardTitle}>Deliverables</Text>
                        </View>
                        <View style={styles.cardBody}>
                            <Text style={styles.bodyText}>{data[0]?.deliverable || 'No deliverables specified'}</Text>
                        </View>
                    </View>

                    {/* PROJECT INFO */}
                    <View style={styles.card}>
                        <View style={styles.cardHeader}>
                            <View style={styles.cardIconBadge}>
                                <Info size={18} color={ACCENT} />
                            </View>
                            <Text style={styles.cardTitle}>Project Information</Text>
                        </View>
                        <View style={styles.cardBody}>
                            <View style={styles.infoItem}>
                                <View style={styles.infoRow}>
                                    <View style={styles.infoIconCircle}>
                                        <Languages size={16} color={ACCENT} />
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

                            <View style={[styles.infoItem, { marginBottom: 0 }]}>
                                <View style={styles.infoRow}>
                                    <View style={styles.infoIconCircle}>
                                        <Calendar size={16} color={ACCENT} />
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
                        <View style={styles.card}>
                            <View style={styles.cardHeader}>
                                <View style={styles.cardIconBadge}>
                                    <Users size={18} color={ACCENT} />
                                </View>
                                <Text style={styles.cardTitle}>Proposals Received</Text>
                                <View style={styles.countBadge}>
                                    <Text style={styles.countBadgeText}>{propData.length}</Text>
                                </View>
                            </View>
                            <View style={styles.cardBody}>
                                {propData.map((item: User, index: number) => {
                                    const isExpanded = expandedProposal === index;
                                    const initials = item?.name?.split(' ').map(n => n[0]).join('').toUpperCase().substring(0, 2) || 'U';
                                    return (
                                        <TouchableOpacity
                                            key={index}
                                            style={[styles.proposalCard, isExpanded && styles.proposalCardActive]}
                                            onPress={() => setExpandedProposal(isExpanded ? null : index)}
                                            activeOpacity={0.7}
                                        >
                                            <View style={styles.proposalHeader}>
                                                <LinearGradient
                                                    colors={[ACCENT, '#0891b2']}
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
                                                        <Download size={16} color={ACCENT} />
                                                    </TouchableOpacity>
                                                    {isExpanded
                                                        ? <ChevronUp size={18} color="#94a3b8" />
                                                        : <ChevronDown size={18} color="#94a3b8" />
                                                    }
                                                </View>
                                            </View>
                                            {isExpanded && (
                                                <View style={styles.proposalExpanded}>
                                                    <TouchableOpacity style={styles.btnPrimary}>
                                                        <Text style={styles.btnPrimaryText}>View Full Profile</Text>
                                                        <ArrowRight size={16} color="white" />
                                                    </TouchableOpacity>
                                                    <TouchableOpacity style={styles.btnOutline}>
                                                        <MessageCircle size={16} color={ACCENT} />
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
                    <View style={styles.card}>
                        <View style={styles.cardHeader}>
                            <View style={styles.cardIconBadge}>
                                <Star size={18} color={ACCENT} />
                            </View>
                            <Text style={styles.cardTitle}>Required Skills</Text>
                        </View>
                        <View style={styles.cardBody}>
                            <View style={styles.skillsGrid}>
                                {data[0]?.skills?.split(",")?.map((item: string, index: number) => (
                                    <View key={index} style={styles.skillBadge}>
                                        <View style={styles.skillDot} />
                                        <Text style={styles.skillText}>{item.trim()}</Text>
                                        <CheckCircle2 size={13} color="#10b981" fill="rgba(16,185,129,0.12)" />
                                    </View>
                                ))}
                            </View>
                        </View>
                    </View>

                    {/* APPLY BUTTON */}
                    <TouchableOpacity
                        activeOpacity={0.85}
                        style={styles.applyBtnWrapper}
                    >
                        <LinearGradient
                            colors={[ACCENT, '#0891b2']}
                            start={{ x: 0, y: 0 }}
                            end={{ x: 1, y: 0 }}
                            style={styles.applyButton}
                        >
                            <Text style={styles.applyText}>Apply for this Project</Text>
                            <ArrowRight size={20} color="white" />
                        </LinearGradient>
                    </TouchableOpacity>

                    <View style={{ height: 40 }} />
                </Animated.View>
            </ScrollView>
        </LinearGradient>
    );
};

export default ProjectDetail;

const styles = StyleSheet.create({
    gradient: { flex: 1 },
    scrollContent: {
        padding: 16,
        paddingBottom: 40,
    },

    // Hero
    heroCard: {
        borderRadius: 20,
        padding: 22,
        marginBottom: 16,
    },
    statusBadge: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: 'rgba(255,255,255,0.22)',
        alignSelf: 'flex-start',
        paddingHorizontal: 12,
        paddingVertical: 6,
        borderRadius: 20,
        gap: 6,
        marginBottom: 14,
    },
    statusDot: { width: 6, height: 6, borderRadius: 3, backgroundColor: '#10b981' },
    statusText: { color: 'white', fontSize: 12, fontWeight: '600' },
    heroTitle: {
        fontSize: 24,
        fontWeight: '800',
        color: 'white',
        lineHeight: 32,
        marginBottom: 14,
        letterSpacing: -0.3,
    },
    heroMetaRow: { flexDirection: 'row', flexWrap: 'wrap', gap: 8 },
    metaChip: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: 'rgba(255,255,255,0.92)',
        paddingHorizontal: 10,
        paddingVertical: 6,
        borderRadius: 20,
        gap: 5,
    },
    metaChipText: { color: ACCENT, fontSize: 12, fontWeight: '600' },

    // Stats
    statsGrid: { flexDirection: 'row', gap: 12, marginBottom: 16 },
    statCard: {
        flex: 1,
        backgroundColor: 'rgba(255,255,255,0.82)',
        borderRadius: 14,
        padding: 14,
        borderWidth: 1,
        borderColor: BORDER,
    },
    statIconBox: {
        width: 36,
        height: 36,
        borderRadius: 10,
        backgroundColor: 'rgba(13,148,136,0.10)',
        alignItems: 'center',
        justifyContent: 'center',
        marginBottom: 8,
    },
    statLabel: { fontSize: 12, color: TEXT_SECONDARY, fontWeight: '500' },
    statValue: { fontSize: 20, fontWeight: '800', color: TEXT_PRIMARY, marginTop: 2, marginBottom: 8 },
    statTag: {
        alignSelf: 'flex-start',
        backgroundColor: 'rgba(13,148,136,0.10)',
        paddingHorizontal: 8,
        paddingVertical: 3,
        borderRadius: 6,
        borderWidth: 1,
        borderColor: 'rgba(13,148,136,0.18)',
    },
    statTagText: { fontSize: 11, color: ACCENT, fontWeight: '700' },
    progressWrapper: { marginTop: 4 },
    progressBar: {
        height: 5,
        backgroundColor: 'rgba(14,165,233,0.15)',
        borderRadius: 4,
        overflow: 'hidden',
    },
    progressFill: { height: '100%', backgroundColor: ACCENT, borderRadius: 4 },
    progressLabel: { fontSize: 11, color: TEXT_SECONDARY, marginTop: 5, fontWeight: '600' },

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
        padding: 16,
        borderBottomWidth: 1,
        borderBottomColor: BORDER,
        gap: 12,
    },
    cardIconBadge: {
        width: 36,
        height: 36,
        borderRadius: 10,
        backgroundColor: 'rgba(13,148,136,0.10)',
        justifyContent: 'center',
        alignItems: 'center',
    },
    cardTitle: { fontSize: 16, fontWeight: '700', color: TEXT_PRIMARY, flex: 1 },
    countBadge: {
        backgroundColor: ACCENT,
        paddingHorizontal: 10,
        paddingVertical: 4,
        borderRadius: 8,
        minWidth: 28,
        alignItems: 'center',
    },
    countBadgeText: { color: 'white', fontSize: 12, fontWeight: '700' },
    cardBody: { padding: 16 },
    bodyText: { fontSize: 14, color: '#475569', lineHeight: 22 },

    // Info
    infoItem: { marginBottom: 18 },
    infoRow: { flexDirection: 'row', alignItems: 'center', gap: 10, marginBottom: 10 },
    infoIconCircle: {
        width: 34,
        height: 34,
        borderRadius: 17,
        backgroundColor: 'rgba(13,148,136,0.10)',
        justifyContent: 'center',
        alignItems: 'center',
    },
    infoLabel: { fontSize: 14, fontWeight: '600', color: TEXT_SECONDARY },
    infoValue: { fontSize: 14, fontWeight: '600', color: TEXT_PRIMARY, marginLeft: 44 },
    languageChips: { flexDirection: 'row', flexWrap: 'wrap', gap: 8, marginLeft: 44 },
    languageChip: {
        backgroundColor: 'rgba(13,148,136,0.08)',
        paddingHorizontal: 12,
        paddingVertical: 6,
        borderRadius: 8,
        borderWidth: 1,
        borderColor: 'rgba(13,148,136,0.18)',
    },
    languageText: { fontSize: 13, fontWeight: '600', color: ACCENT },

    // Proposals
    proposalCard: {
        backgroundColor: 'rgba(14,165,233,0.05)',
        borderRadius: 12,
        padding: 14,
        marginBottom: 10,
        borderWidth: 1,
        borderColor: BORDER,
    },
    proposalCardActive: {
        backgroundColor: 'rgba(13,148,136,0.07)',
        borderColor: ACCENT,
    },
    proposalHeader: { flexDirection: 'row', alignItems: 'center', gap: 12 },
    avatar: {
        width: 44,
        height: 44,
        borderRadius: 22,
        justifyContent: 'center',
        alignItems: 'center',
    },
    avatarText: { fontSize: 14, fontWeight: '700', color: 'white' },
    proposalInfo: { flex: 1 },
    proposalName: { fontSize: 14, fontWeight: '700', color: TEXT_PRIMARY, marginBottom: 2 },
    proposalEmail: { fontSize: 12, color: TEXT_SECONDARY },
    proposalActions: { flexDirection: 'row', alignItems: 'center', gap: 8 },
    iconButton: {
        width: 32,
        height: 32,
        borderRadius: 8,
        backgroundColor: 'rgba(13,148,136,0.10)',
        justifyContent: 'center',
        alignItems: 'center',
    },
    proposalExpanded: {
        marginTop: 14,
        paddingTop: 14,
        borderTopWidth: 1,
        borderTopColor: BORDER,
        gap: 8,
    },
    btnPrimary: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: 10,
        overflow: 'hidden',
        backgroundColor: ACCENT,
        paddingVertical: 11,
        gap: 6,
    },
    btnPrimaryText: { color: 'white', fontSize: 14, fontWeight: '600' },
    btnOutline: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        paddingVertical: 11,
        borderRadius: 10,
        borderWidth: 1.5,
        borderColor: ACCENT,
        backgroundColor: 'rgba(255,255,255,0.80)',
        gap: 6,
    },
    btnOutlineText: { color: ACCENT, fontSize: 14, fontWeight: '600' },

    // Skills
    skillsGrid: { flexDirection: 'row', flexWrap: 'wrap', gap: 8 },
    skillBadge: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: 'rgba(255,255,255,0.80)',
        paddingVertical: 7,
        paddingHorizontal: 11,
        borderRadius: 10,
        gap: 6,
        borderWidth: 1,
        borderColor: BORDER,
    },
    skillDot: { width: 5, height: 5, borderRadius: 3, backgroundColor: ACCENT },
    skillText: { fontSize: 13, fontWeight: '600', color: TEXT_PRIMARY },

    // Apply
    applyBtnWrapper: {
        borderRadius: 14,
        overflow: 'hidden',
        shadowColor: ACCENT,
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.3,
        shadowRadius: 8,
        elevation: 6,
    },
    applyButton: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        paddingVertical: 17,
        gap: 10,
    },
    applyText: { color: 'white', fontSize: 16, fontWeight: '700' },
});