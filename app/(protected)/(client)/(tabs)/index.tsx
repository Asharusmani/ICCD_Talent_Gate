import { router } from 'expo-router';
import React, { useState } from 'react';
import List from '@/components/ui/list';
import { useGetGigs } from '@/api/client/gigs';
import useDebounce from '@/hooks/use-debounce';
import GigCard from '@/components/cards/gig-card';
import { ICCDLoader } from '@/components/ui/loader';
import ErrorScreen from '@/components/ui/error';
import { SlidersHorizontal, Search, ChevronRight } from 'lucide-react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import {
  StyleSheet, View, Text, TextInput,
  TouchableOpacity, ScrollView
} from 'react-native';

const PRIMARY = '#7dd3fc';
const MID = '#bae6fd';
const DARK = '#e0f2fe';
const DARKEST = '#f0f9ff';
const ACCENT = '#0d9488';
const BORDER = 'rgba(14,165,233,0.20)';
const TEXT_PRIMARY = '#0f172a';
const TEXT_SECONDARY = 'rgba(15,23,42,0.50)';

export default function HomeScreen() {
  const [search, setSearch] = useState('');
  const [activeChip, setActiveChip] = useState('All');
  const debouncedSearch = useDebounce(search, 500);
  const insets = useSafeAreaInsets();

  const { gigs, error, isLoading, hasNextPage, isFetchingNextPage, fetchNextPage } =
    useGetGigs({ search: debouncedSearch });

  const chips = ['All', 'Top Rated', 'New Arrivals', 'Under $50'];

  if (isLoading) return <ICCDLoader />;
  if (error) return <ErrorScreen />;

  return (
    <LinearGradient
      colors={[DARKEST, DARK, MID, PRIMARY]}
      style={styles.gradient}
      start={{ x: 0, y: 0 }}
      end={{ x: 0.6, y: 1 }}
    >
      <View style={[styles.container, { paddingTop: insets.top + 80 }]}>

        {/* Search Row */}
        <View style={styles.searchRow}>
          <View style={styles.searchBox}>
            <Search size={15} color="rgba(15,23,42,0.40)" />
            <TextInput
              style={styles.searchInput}
              placeholder="Search services..."
              placeholderTextColor="rgba(15,23,42,0.30)"
              value={search}
              onChangeText={setSearch}
            />
          </View>
          <TouchableOpacity style={styles.filterBtn}>
            <SlidersHorizontal size={18} color="#fff" />
          </TouchableOpacity>
        </View>

        {/* Chips */}
        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={styles.chipsContent}
        >
          {chips.map((chip) => (
            <TouchableOpacity
              key={chip}
              style={[styles.chip, activeChip === chip && styles.chipActive]}
              onPress={() => setActiveChip(chip)}
            >
              <Text style={[styles.chipText, activeChip === chip && styles.chipTextActive]}>
                {chip}
              </Text>
            </TouchableOpacity>
          ))}
        </ScrollView>

        {/* Section Title */}
        <View style={styles.sectionHead}>
          <Text style={styles.sectionTitle}>Recommended for you</Text>
          <TouchableOpacity style={styles.seeAllRow}>
            <Text style={styles.seeAll}>See all</Text>
            <ChevronRight size={14} color={ACCENT} />
          </TouchableOpacity>
        </View>

        {/* List */}
        <List
          data={gigs}
          error={error}
          isLoading={isLoading}
          hasNextPage={hasNextPage}
          isFetchingNextPage={isFetchingNextPage}
          fetchNextPage={fetchNextPage}
          renderItem={({ item }: any) => (
            <GigCard
              userImage={item?.freelancerImg}
              name={item?.firstName + ' ' + item?.lastName}
              title={item?.subCategory}
              description={item?.description}
              fileUrl={item?.fileUrls?.split(',')[0]}
              price={item?.price}
              rating={item?.rating}
              handleClick={() => router.push(`/gig-detail/${item?.id}`)}
            />
          )}
        />

      </View>
    </LinearGradient>
  );
}

const styles = StyleSheet.create({
  gradient: {
    flex: 1,
  },
  container: {
    flex: 1,
    paddingHorizontal: 16,
  },
  searchRow: {
    flexDirection: 'row',
    gap: 10,
    marginBottom: 22,
  },
  searchBox: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'rgba(255,255,255,0.80)',
    borderRadius: 12,
    paddingHorizontal: 12,
    height: 48,
    borderWidth: 1.5,
    borderColor: BORDER,
    gap: 8,
  },
  searchInput: {
    flex: 1,
    fontSize: 13,
    color: TEXT_PRIMARY,
  },
  filterBtn: {
    width: 48,
    height: 48,
    borderRadius: 12,
    backgroundColor: ACCENT,
    alignItems: 'center',
    justifyContent: 'center',
  },
  chipsContent: {
    gap: 8,
    paddingRight: 4,
    paddingVertical: 6,
    alignItems: 'center',
  },
  chip: {
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 20,
    backgroundColor: 'rgba(255,255,255,0.70)',
    borderWidth: 1.5,
    borderColor: BORDER,
    minHeight: 36,
    justifyContent: 'center',
  },
  chipActive: {
    backgroundColor: ACCENT,
    borderColor: ACCENT,
  },
  chipText: {
    fontSize: 12,
    fontWeight: '600',
    color: TEXT_SECONDARY,
    lineHeight: 16,
    includeFontPadding: false,
    textAlignVertical: 'center',
  },
  chipTextActive: {
    color: '#fff',
  },
  sectionHead: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: 22,
    marginBottom: 16,
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: '700',
    color: TEXT_PRIMARY,
  },
  seeAllRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 2,
  },
  seeAll: {
    fontSize: 12,
    fontWeight: '600',
    color: ACCENT,
  },
});