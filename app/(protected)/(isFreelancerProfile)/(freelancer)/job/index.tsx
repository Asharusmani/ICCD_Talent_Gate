import { useGetAllJobs } from '@/api/client/job';
import { JobCard } from '@/components/cards/job-card';
import SearchBar from "@/components/ui/search-bar";
import { useState } from 'react';
import { FlatList, StyleSheet, Text, View } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import ICCDLoader from '@/components/ui/loader2';
import { Briefcase } from 'lucide-react-native';

const ACCENT = '#0d9488';
const BORDER = 'rgba(14,165,233,0.18)';
const TEXT_PRIMARY = '#0f172a';
const TEXT_SECONDARY = '#6b7280';

export default function Job() {
    const [search, setSearch] = useState("");
    const insets = useSafeAreaInsets();
    const { data, isLoading } = useGetAllJobs();

    if (isLoading) return <ICCDLoader />;

    return (
        <LinearGradient
            colors={['#f0f9ff', '#e0f2fe', '#bae6fd', '#7dd3fc']}
            style={{ flex: 1 }}
            start={{ x: 0, y: 0 }}
            end={{ x: 0.6, y: 1 }}
        >
            <View style={[styles.container, { paddingTop: insets.top + 16 }]}>

                {/* Header */}
                <View style={styles.headerRow}>
                    <View>
                        <Text style={styles.heading}>Browse Jobs</Text>
                        <Text style={styles.subHeading}>Find your next opportunity</Text>
                    </View>
                    <View style={styles.headerIconBox}>
                        <Briefcase size={22} color={ACCENT} />
                    </View>
                </View>

                {/* Search */}
                <View style={styles.searchWrapper}>
                    <SearchBar
                        search={search}
                        setSearch={setSearch}
                        placeholder="Search jobs..."
                    />
                </View>

                {/* List */}
                <FlatList
                    data={data}
                    keyExtractor={(item) => item.id}
                    renderItem={({ item }) => <JobCard item={item} />}
                    contentContainerStyle={styles.listContent}
                    showsVerticalScrollIndicator={false}
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
    searchWrapper: {
        marginBottom: 16,
    },
    listContent: {
        paddingBottom: 100,
    },
});