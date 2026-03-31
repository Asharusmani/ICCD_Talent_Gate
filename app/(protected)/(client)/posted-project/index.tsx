import { useGetProjectsByClient } from "@/api/client/project";
import { ProjectCard } from "@/components/cards/project-card";
import List from "@/components/ui/list";
import ICCDLoader from '@/components/ui/loader2';
import { router } from "expo-router";
import { useCallback, useState } from "react";
import { StyleSheet, View, Text, TextInput, TouchableOpacity } from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { Search, Plus, FolderDot } from "lucide-react-native";

const ACCENT = '#0d9488';
const BORDER = 'rgba(14,165,233,0.18)';
const TEXT_PRIMARY = '#0f172a';
const TEXT_SECONDARY = '#6b7280';

export default function PostedProject() {
  const [search, setSearch] = useState("");
  const insets = useSafeAreaInsets();

  const {
    data,
    isLoading,
    error,
    hasNextPage,
    isFetchingNextPage,
    fetchNextPage
  } = useGetProjectsByClient({ search });

  const handleAddProject = useCallback(() => {
    router.push('/create-project');
  }, []);

  const renderProjectCard = useCallback(({ item }: any) => (
    <ProjectCard item={item} />
  ), []);

  if (isLoading && !data) return <ICCDLoader />;

  const showEmptyState = !isLoading && !error && data?.length === 0;

  return (
    <LinearGradient
      colors={['#f0f9ff', '#e0f2fe', '#bae6fd', '#7dd3fc']}
      style={styles.gradient}
      start={{ x: 0, y: 0 }}
      end={{ x: 0.6, y: 1 }}
    >
      <View style={[styles.container, { paddingTop: insets.top + 90 }]}>

        {/* Header Row */}
        <View style={styles.headerRow}>
          <View>
            <Text style={styles.heading}>Posted Projects</Text>
            <Text style={styles.subHeading}>
              {data?.length || 0} project{data?.length !== 1 ? 's' : ''}
            </Text>
          </View>
          <TouchableOpacity
            style={styles.addBtn}
            onPress={handleAddProject}
            activeOpacity={0.85}
          >
            <LinearGradient
              colors={[ACCENT, '#0891b2']}
              start={{ x: 0, y: 0 }}
              end={{ x: 1, y: 0 }}
              style={styles.addBtnGradient}
            >
              <Plus size={16} color="#fff" />
              <Text style={styles.addBtnText}>New</Text>
            </LinearGradient>
          </TouchableOpacity>
        </View>

        {/* Search */}
        <View style={styles.searchBox}>
          <Search size={15} color="rgba(15,23,42,0.40)" />
          <TextInput
            style={styles.searchInput}
            placeholder="Search projects..."
            placeholderTextColor="rgba(15,23,42,0.30)"
            value={search}
            onChangeText={setSearch}
          />
        </View>

        {/* List or Empty */}
        {showEmptyState ? (
          <View style={styles.emptyBox}>
            <View style={styles.emptyIconBox}>
              <FolderDot size={36} color="rgba(13,148,136,0.40)" />
            </View>
            <Text style={styles.emptyText}>
              {search ? "No projects found" : "No projects yet"}
            </Text>
            <Text style={styles.emptySub}>
              {search
                ? "Try a different search term"
                : "Tap 'New' to create your first project"}
            </Text>
          </View>
        ) : (
          <List
            data={data}
            error={error}
            isLoading={isLoading}
            hasNextPage={hasNextPage}
            isFetchingNextPage={isFetchingNextPage}
            fetchNextPage={fetchNextPage}
            renderItem={renderProjectCard}
          />
        )}
      </View>
    </LinearGradient>
  );
}

const styles = StyleSheet.create({
  gradient: { flex: 1 },
  container: {
    flex: 1,
    paddingHorizontal: 16,
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
  addBtn: {
    borderRadius: 12,
    overflow: 'hidden',
    shadowColor: ACCENT,
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.25,
    shadowRadius: 6,
    elevation: 5,
  },
  addBtnGradient: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingVertical: 10,
    gap: 6,
  },
  addBtnText: {
    fontSize: 13,
    fontWeight: '700',
    color: '#fff',
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
  emptyBox: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    gap: 10,
    paddingBottom: 60,
  },
  emptyIconBox: {
    width: 80,
    height: 80,
    borderRadius: 24,
    backgroundColor: 'rgba(255,255,255,0.70)',
    borderWidth: 1,
    borderColor: BORDER,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 6,
  },
  emptyText: {
    fontSize: 16,
    fontWeight: '700',
    color: TEXT_PRIMARY,
  },
  emptySub: {
    fontSize: 13,
    color: TEXT_SECONDARY,
    textAlign: 'center',
  },
});