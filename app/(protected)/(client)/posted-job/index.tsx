import { useGetAllJobByClient } from "@/api/client/job";
import { JobCard } from '@/components/cards/job-card';
import List from '@/components/ui/list';
import SearchBar from "@/components/ui/search-bar";
import { router } from 'expo-router';
import { useState } from 'react';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import ICCDLoader from '@/components/ui/loader2';
import { Briefcase, Plus } from 'lucide-react-native';

const ACCENT = '#0d9488';
const BORDER = 'rgba(14,165,233,0.18)';
const TEXT_PRIMARY = '#0f172a';
const TEXT_SECONDARY = '#6b7280';

export default function PostedJob() {
    const [search, setSearch] = useState("");
    const insets = useSafeAreaInsets();
    const { data, error, hasNextPage, isFetchingNextPage, fetchNextPage, isLoading } =
        useGetAllJobByClient({ search: "" });

    if (isLoading) return <ICCDLoader />;

    return (
        <LinearGradient
            colors={['#f0f9ff', '#e0f2fe', '#bae6fd', '#7dd3fc']}
            style={{ flex: 1 }}
            start={{ x: 0, y: 0 }}
            end={{ x: 0.6, y: 1 }}
        >
            <View style={[styles.container, { paddingTop:  16 }]}>

                {/* ── Header ── */}
                <View style={styles.headerRow}>
                    <View>
                        <Text style={styles.heading}>Posted Jobs</Text>
                        <Text style={styles.subHeading}>Manage your job listings</Text>
                    </View>
                    <View style={styles.headerIconBox}>
                        <Briefcase size={22} color={ACCENT} />
                    </View>
                </View>

                {/* ── Search + Add Button ── */}
                <View style={styles.searchRow}>
                    <View style={styles.searchFlex}>
                        <SearchBar
                            value={search}
                            onChangeText={(text) => setSearch(text)}
                            placeholder="Search jobs..."
                        />
                    </View>

                    {/* Add New Job Button */}
                    <TouchableOpacity
                        onPress={() => router.push('/create-job')}
                        activeOpacity={0.85}
                        style={styles.addBtnWrapper}
                    >
                        <LinearGradient
                            colors={[ACCENT, '#0891b2']}
                            style={styles.addBtn}
                            start={{ x: 0, y: 0 }}
                            end={{ x: 1, y: 0 }}
                        >
                            <Plus size={16} color="#fff" />
                            <Text style={styles.addBtnText}>New Job</Text>
                        </LinearGradient>
                    </TouchableOpacity>
                </View>

                {/* ── List ── */}
                <List
                    data={data}
                    error={error}
                    isLoading={isLoading}
                    hasNextPage={hasNextPage}
                    isFetchingNextPage={isFetchingNextPage}
                    fetchNextPage={fetchNextPage}
                    contentContainerStyle={styles.listContent}
                    renderItem={({ item }: any) => <JobCard item={item} />}
                />
            </View>
        </LinearGradient>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        paddingHorizontal: 16,
    },

    // Header
    headerRow: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: 18,
    },
    heading: {
        fontSize: 26,
        fontWeight: '800',
        color: TEXT_PRIMARY,
        letterSpacing: -0.4,
    },
    subHeading: {
        fontSize: 13,
        color: TEXT_SECONDARY,
        fontWeight: '500',
        marginTop: 2,
    },
    headerIconBox: {
        width: 44,
        height: 44,
        borderRadius: 22,
        backgroundColor: 'rgba(255,255,255,0.75)',
        borderWidth: 1,
        borderColor: BORDER,
        alignItems: 'center',
        justifyContent: 'center',
    },

    // Search row
    searchRow: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 10,
        marginBottom: 16,
    },
    searchFlex: {
        flex: 1,
    },

    // Add button
    addBtnWrapper: {
        borderRadius: 12,
        overflow: 'hidden',
        shadowColor: ACCENT,
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.3,
        shadowRadius: 8,
        elevation: 6,
        flexShrink: 0,
    },
    addBtn: {
        flexDirection: 'row',
        alignItems: 'center',
        paddingHorizontal: 14,
        height: 46,
        gap: 6,
    },
    addBtnText: {
        color: '#fff',
        fontSize: 14,
        fontWeight: '700',
    },

    listContent: {
        paddingBottom: 100,
    },
});