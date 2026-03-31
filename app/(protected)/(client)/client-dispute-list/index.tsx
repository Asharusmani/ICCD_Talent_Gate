import { useGetAllDisputeByClient } from "@/api/client/dispute";
import { DisputeCard } from '@/components/cards/dispute-card';
import List from '@/components/ui/list';
import { ICCDLoader } from '@/components/ui/loader';
import { useState } from 'react';
import { StyleSheet, Text, View, TextInput } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { Search, AlertCircle } from 'lucide-react-native';

const ACCENT = '#0d9488';
const BORDER = 'rgba(14,165,233,0.18)';
const TEXT_PRIMARY = '#0f172a';
const TEXT_SECONDARY = '#6b7280';

export default function Dispute() {
  const [search, setSearch] = useState("")
  const insets = useSafeAreaInsets();
  const { data, hasNextPage, fetchNextPage, isFetchingNextPage, isLoading, error } = useGetAllDisputeByClient()

  if (isLoading) return <ICCDLoader />
  if (error) return <Text>{error}</Text>

  return (
    <LinearGradient
      colors={['#f0f9ff', '#e0f2fe', '#bae6fd', '#7dd3fc']}
      style={styles.gradient}
      start={{ x: 0, y: 0 }}
      end={{ x: 0.6, y: 1 }}
    >
      <View style={[styles.container, { paddingTop: insets.top + 70 }]}>

        {/* Header */}
        <View style={styles.headerRow}>
          <View>
            <Text style={styles.heading}>Disputes</Text>
            <Text style={styles.subHeading}>
              {data?.length || 0} case{data?.length !== 1 ? 's' : ''}
            </Text>
          </View>
          <View style={styles.headerIconBox}>
            <AlertCircle size={22} color={ACCENT} />
          </View>
        </View>

        {/* Search */}
        <View style={styles.searchBox}>
          <Search size={15} color="rgba(15,23,42,0.40)" />
          <TextInput
            style={styles.searchInput}
            placeholder="Search disputes..."
            placeholderTextColor="rgba(15,23,42,0.30)"
            value={search}
            onChangeText={setSearch}
          />
        </View>

        {/* List */}
        <View style={styles.listContainer}>
          <List
            data={data}
            error={error}
            isLoading={isLoading}
            hasNextPage={hasNextPage}
            isFetchingNextPage={isFetchingNextPage}
            fetchNextPage={fetchNextPage}
            renderItem={({ item }: any) => (
              <DisputeCard item={item} />
            )}
          />
        </View>
      </View>
    </LinearGradient>
  );
}

const styles = StyleSheet.create({
  gradient: { flex: 1 },
  container: {
    flex: 1,
    paddingHorizontal: 16,
    backgroundColor: 'transparent',
  },
  headerRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 16,
  },
  heading: {
    fontSize: 24,
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
  searchBox: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'rgba(255,255,255,0.80)',
    borderRadius: 12,
    paddingHorizontal: 12,
    height: 46,
    borderWidth: 1.5,
    borderColor: BORDER,
    gap: 8,
    marginBottom: 16,
  },
  searchInput: {
    flex: 1,
    fontSize: 13,
    color: TEXT_PRIMARY,
  },
  listContainer: {
    flex: 1,
  },
});