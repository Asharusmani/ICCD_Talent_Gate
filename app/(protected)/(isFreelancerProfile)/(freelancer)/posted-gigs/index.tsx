import { useGetGigsByUser } from "@/api/client/gigs";
import GigCard2 from "@/components/cards/gig-card-2";
import ICCDLoader from "@/components/ui/loader2";
import { LinearGradient } from "expo-linear-gradient";
import { useRouter } from "expo-router";
import { useHeaderHeight } from "@react-navigation/elements";
import { Search, Plus } from "lucide-react-native";
import { useState } from "react";
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import {
  FlatList,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";

const PRIMARY        = '#7dd3fc';
const MID            = '#bae6fd';
const DARK           = '#e0f2fe';
const DARKEST        = '#f0f9ff';
const ACCENT         = '#0d9488';
const BORDER         = 'rgba(14,165,233,0.20)';
const TEXT_PRIMARY   = '#0f172a';
const TEXT_SECONDARY = 'rgba(15,23,42,0.50)';

const List = () => {
  const router      = useRouter();
  const headerHeight = useHeaderHeight();
  const insets      = useSafeAreaInsets(); // ✅ top pe — early return se pehle
  const [search, setSearch] = useState("");

  const { data, isLoading, isError, error } = useGetGigsByUser();

  if (isLoading) return <ICCDLoader />;
  if (isError)   return <Text>{error.message}</Text>;

  return (
    <LinearGradient
      colors={[DARKEST, DARK, MID, PRIMARY]}
      style={styles.gradient}
      start={{ x: 0, y: 0 }}
      end={{ x: 0.6, y: 1 }}
    >
      <FlatList
        data={data}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => <GigCard2 item={item} />}
        contentContainerStyle={[
          styles.listContent,
          { paddingTop: insets.top + 80 },
        ]}
        showsVerticalScrollIndicator={false}
        ListHeaderComponent={
          <>
            {/* Header Row */}
            <View style={styles.headerRow}>
              <View>
                <Text style={styles.greeting}>Manage</Text>
                <Text style={styles.heading}>My Gigs</Text>
              </View>
              <TouchableOpacity
                onPress={() => router.push("/posted-gigs/add-gig/gig-description")}
                style={styles.addButton}
              >
                <Plus size={16} color="#fff" />
                <Text style={styles.addButtonText}>Add New Gig</Text>
              </TouchableOpacity>
            </View>

            {/* Search Bar */}
            <View style={styles.searchRow}>
              <View style={styles.searchBox}>
                <Search size={15} color="rgba(15,23,42,0.40)" />
                <TextInput
                  placeholder="Search gigs..."
                  placeholderTextColor="rgba(15,23,42,0.30)"
                  value={search}
                  onChangeText={setSearch}
                  style={styles.searchInput}
                />
              </View>
            </View>
          </>
        }
      />
    </LinearGradient>
  );
};

export default List;

const styles = StyleSheet.create({
  gradient: {
    flex: 1,
  },
  listContent: {
    paddingHorizontal: 16,
    paddingBottom: 120,
  },
  headerRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 22,
  },
  greeting: {
    fontSize: 13,
    color: TEXT_SECONDARY,
    fontWeight: "600",
    letterSpacing: 0.4,
    marginBottom: 3,
  },
  heading: {
    fontSize: 26,
    fontWeight: "800",
    color: TEXT_PRIMARY,
    letterSpacing: -0.5,
  },
  addButton: {
    flexDirection: "row",
    alignItems: "center",
    gap: 6,
    paddingHorizontal: 16,
    paddingVertical: 12,
    borderRadius: 12,
    backgroundColor: ACCENT,
  },
  addButtonText: {
    color: "#fff",
    fontWeight: "700",
    fontSize: 13,
  },
  searchRow: {
    marginBottom: 22,
  },
  searchBox: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "rgba(255,255,255,0.80)",
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
});