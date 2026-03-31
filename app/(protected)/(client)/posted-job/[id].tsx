import { useGetJobById } from '@/api/client/job';
import { Ionicons, MaterialCommunityIcons } from '@expo/vector-icons';
import { useLocalSearchParams, useRouter } from 'expo-router';
import {
    ScrollView,
    StyleSheet,
    Text,
    View,
} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import ICCDLoader from '@/components/ui/loader2';

const ACCENT = '#0d9488';
const BORDER = 'rgba(14,165,233,0.18)';
const TEXT_PRIMARY = '#0f172a';
const TEXT_SECONDARY = '#6b7280';

const PostedJobDetail = () => {
    const router = useRouter();
    const { id } = useLocalSearchParams();
    const insets = useSafeAreaInsets();
    const { data, isLoading } = useGetJobById(id);

    if (isLoading) return <ICCDLoader />;

    return (
        <LinearGradient
            colors={['#f0f9ff', '#e0f2fe', '#bae6fd', '#7dd3fc']}
            style={{ flex: 1 }}
            start={{ x: 0, y: 0 }}
            end={{ x: 0.6, y: 1 }}
        >
            <ScrollView
                showsVerticalScrollIndicator={false}
                contentContainerStyle={[styles.scrollContent, { paddingTop: 16 }]}
            >
                {/* ── Header Card ── */}
                <View style={styles.card}>
                    <View style={styles.headerRow}>
                        <LinearGradient
                            colors={[ACCENT, '#0891b2']}
                            style={styles.logoBox}
                            start={{ x: 0, y: 0 }}
                            end={{ x: 1, y: 1 }}
                        >
                            <Text style={styles.logoText}>
                                {data[0]?.jobTitle?.[0]?.toUpperCase() || 'J'}
                            </Text>
                        </LinearGradient>
                        <View style={styles.titleColumn}>
                            <Text style={styles.jobTitle}>{data[0]?.jobTitle}</Text>
                            <View style={styles.postedRow}>
                                <MaterialCommunityIcons name="history" size={14} color={TEXT_SECONDARY} />
                                <Text style={styles.postedText}>Recently posted</Text>
                            </View>
                        </View>
                    </View>

                    {/* Location */}
                    <View style={styles.locationRow}>
                        <View style={styles.iconCircle}>
                            <Ionicons name="location-sharp" size={14} color={ACCENT} />
                        </View>
                        <Text style={styles.locationText}>
                            {data[0]?.country}, {data[0]?.city}
                        </Text>
                    </View>

                    {/* Badges */}
                    <View style={styles.badgeRow}>
                        <View style={[styles.badge, styles.salaryBadge]}>
                            <MaterialCommunityIcons name="cash" size={15} color="#059669" />
                            <Text style={styles.salaryText}>
                                ${data[0]?.minSalaray} - ${data[0]?.maxSalaray}/{data[0]?.payType}
                            </Text>
                        </View>
                        <View style={[styles.badge, styles.typeBadge]}>
                            <MaterialCommunityIcons name="briefcase-variant" size={15} color={ACCENT} />
                            <Text style={styles.typeText}>{data[0]?.jobType}</Text>
                        </View>
                    </View>
                </View>

                {/* ── Job Details Card ── */}
                <View style={styles.card}>
                    <View style={styles.sectionHeader}>
                        <View style={styles.sectionIconBox}>
                            <MaterialCommunityIcons name="briefcase" size={20} color={ACCENT} />
                        </View>
                        <Text style={styles.sectionTitle}>Job Details</Text>
                    </View>

                    <View style={styles.detailItem}>
                        <View style={styles.detailLeft}>
                            <MaterialCommunityIcons name="currency-usd" size={18} color={TEXT_SECONDARY} />
                            <Text style={styles.detailLabel}>Compensation</Text>
                        </View>
                        <Text style={styles.detailValue}>$22-$33/commission</Text>
                    </View>
                    <View style={styles.divider} />

                    <View style={styles.detailItem}>
                        <View style={styles.detailLeft}>
                            <MaterialCommunityIcons name="account-tie" size={18} color={TEXT_SECONDARY} />
                            <Text style={styles.detailLabel}>Employee Type</Text>
                        </View>
                        <Text style={styles.detailValue}>Contract</Text>
                    </View>
                    <View style={styles.divider} />

                    <View style={styles.detailItem}>
                        <View style={styles.detailLeft}>
                            <Ionicons name="location" size={18} color={TEXT_SECONDARY} />
                            <Text style={styles.detailLabel}>Location</Text>
                        </View>
                        <Text style={styles.detailValue}>Pakistan</Text>
                    </View>
                </View>

                {/* ── About Role Card ── */}
                <View style={[styles.card, { marginBottom: 30 }]}>
                    <Text style={styles.sectionTitle}>About this role</Text>
                    <View style={styles.decorativeLine} />

                    <Text style={styles.subHeading}>Key Responsibilities</Text>
                    <View style={styles.bulletItem}>
                        <View style={styles.bulletDot} />
                        <Text style={styles.bulletText}>
                            Develop and maintain mobile applications using mobile applications
                        </Text>
                    </View>
                </View>

            </ScrollView>
        </LinearGradient>
    );
};

export default PostedJobDetail;

const styles = StyleSheet.create({
    scrollContent: {
        paddingHorizontal: 16,
        paddingBottom: 30,
    },

    // Card
    card: {
        backgroundColor: 'rgba(255,255,255,0.85)',
        borderRadius: 20,
        borderWidth: 1,
        borderColor: BORDER,
        padding: 18,
        marginBottom: 14,
    },

    // Header card
    headerRow: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 16,
        gap: 14,
    },
    logoBox: {
        width: 60,
        height: 60,
        borderRadius: 16,
        justifyContent: 'center',
        alignItems: 'center',
        flexShrink: 0,
    },
    logoText: {
        color: '#fff',
        fontSize: 26,
        fontWeight: '800',
    },
    titleColumn: {
        flex: 1,
        minWidth: 0,
    },
    jobTitle: {
        fontSize: 20,
        fontWeight: '800',
        color: TEXT_PRIMARY,
        letterSpacing: -0.3,
    },
    postedRow: {
        flexDirection: 'row',
        alignItems: 'center',
        marginTop: 5,
        gap: 5,
    },
    postedText: {
        fontSize: 12,
        color: TEXT_SECONDARY,
        fontWeight: '500',
    },
    locationRow: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 14,
        gap: 8,
    },
    iconCircle: {
        width: 28,
        height: 28,
        borderRadius: 14,
        backgroundColor: 'rgba(13,148,136,0.10)',
        justifyContent: 'center',
        alignItems: 'center',
    },
    locationText: {
        fontSize: 14,
        color: TEXT_PRIMARY,
        fontWeight: '500',
    },
    badgeRow: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        gap: 10,
    },
    badge: {
        flexDirection: 'row',
        alignItems: 'center',
        paddingHorizontal: 12,
        paddingVertical: 8,
        borderRadius: 12,
        gap: 6,
        borderWidth: 1,
    },
    salaryBadge: {
        backgroundColor: 'rgba(5,150,105,0.08)',
        borderColor: 'rgba(5,150,105,0.20)',
    },
    salaryText: {
        fontSize: 13,
        fontWeight: '600',
        color: '#047857',
    },
    typeBadge: {
        backgroundColor: 'rgba(13,148,136,0.08)',
        borderColor: 'rgba(13,148,136,0.20)',
    },
    typeText: {
        fontSize: 13,
        fontWeight: '600',
        color: ACCENT,
    },

    // Section header
    sectionHeader: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 16,
        gap: 10,
    },
    sectionIconBox: {
        width: 36,
        height: 36,
        borderRadius: 10,
        backgroundColor: 'rgba(13,148,136,0.10)',
        alignItems: 'center',
        justifyContent: 'center',
    },
    sectionTitle: {
        fontSize: 17,
        fontWeight: '700',
        color: TEXT_PRIMARY,
        letterSpacing: -0.2,
    },

    // Detail items
    detailItem: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingVertical: 13,
    },
    detailLeft: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 8,
    },
    detailLabel: {
        fontSize: 14,
        color: TEXT_SECONDARY,
        fontWeight: '500',
    },
    detailValue: {
        fontSize: 14,
        color: TEXT_PRIMARY,
        fontWeight: '600',
    },
    divider: {
        height: 1,
        backgroundColor: BORDER,
    },

    // About
    decorativeLine: {
        width: 36,
        height: 3,
        backgroundColor: ACCENT,
        borderRadius: 2,
        marginTop: 8,
        marginBottom: 18,
    },
    subHeading: {
        fontSize: 15,
        fontWeight: '700',
        color: TEXT_PRIMARY,
        marginBottom: 12,
    },
    bulletItem: {
        flexDirection: 'row',
        alignItems: 'flex-start',
        gap: 10,
        paddingVertical: 4,
    },
    bulletDot: {
        width: 7,
        height: 7,
        borderRadius: 4,
        backgroundColor: ACCENT,
        marginTop: 7,
        flexShrink: 0,
    },
    bulletText: {
        flex: 1,
        fontSize: 14,
        color: TEXT_SECONDARY,
        lineHeight: 22,
    },
});