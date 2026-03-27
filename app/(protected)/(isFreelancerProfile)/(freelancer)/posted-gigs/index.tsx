import { useGetGigsByUser } from "@/api/client/gigs";
import GigCard2 from "@/components/cards/gig-card-2";
import ICCDLoader from "@/components/ui/loader2";
import { LinearGradient } from "expo-linear-gradient";
import { useRouter } from "expo-router";
import { useState } from "react";
import {
    FlatList,
    StyleSheet,
    Text,
    TextInput,
    TouchableOpacity,
    View
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

const List = () => {

  const router = useRouter();
  const [search, setSearch] = useState("");

  const { data, totalPages, isLoading, isError, error } = useGetGigsByUser();
  if (isLoading) return <ICCDLoader />
  if (isError) return <Text>{error.message}</Text>

  return (
    <SafeAreaView style={styles.safeContainer}>
      <TextInput
        placeholder="Search Gigs..."
        placeholderTextColor="#777"
        value={search}
        onChangeText={setSearch}
        style={styles.searchBar}
      />

      {/* Gradient Button */}
      <View style={styles.buttonRow}>
        <View style={{ flex: 1 }} />
        <TouchableOpacity
          onPress={() => router.push("/posted-gigs/add-gig/gig-overview")}
        >
          <LinearGradient
            colors={["#15A9B2", "#17747A"]}
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 0 }}
            style={styles.addButton}
          >
            <Text style={styles.addButtonText}>Add New Gig</Text>
          </LinearGradient>
        </TouchableOpacity>
      </View>

      <FlatList
        data={data}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => <GigCard2 item={item} />}
        contentContainerStyle={{ paddingBottom: 40 }}
        showsVerticalScrollIndicator={false}
      />
    </SafeAreaView>
  );
};

export default List;

const styles = StyleSheet.create({
  safeContainer: { flex: 1, backgroundColor: '#F4F4F4', padding: 15 },

  headerCard: {
    padding: 15,
    borderRadius: 10,
    marginBottom: 15
  },
  headerTitle: { fontSize: 18, fontWeight: "bold", color: "#fff" },
  headerSubtitle: { fontSize: 13, color: "#fff", marginTop: 5 },

  searchBar: {
    backgroundColor: "#fff",
    borderRadius: 8,
    padding: 12,
    borderWidth: 1,
    borderColor: "#BDBDBD",
    marginBottom: 10
  },

  buttonRow: {
    flexDirection: "row",
    justifyContent: "flex-end",
    marginBottom: 15
  },

  addButton: {
    width: 123,
    paddingVertical: 12,
    borderRadius: 8,
    alignItems: "center",
    elevation: 2
  },

  addButtonText: {
    color: "#fff",
    fontWeight: "bold",
    fontSize: 14
  },

  card: {
    flexDirection: "row",
    backgroundColor: "#fff",
    borderRadius: 10,
    padding: 10,
    marginBottom: 15,
    elevation: 2,
    position: "relative",
    alignItems: "center"
  },

  cardImage: { width: 120, height: 80, borderRadius: 10 },
  cardContent: { flex: 1, marginLeft: 10, justifyContent: "center" },

  menuBtn: {
    position: "absolute",
    right: 10,
    top: 10
  },

  cardDesc: { fontSize: 14, color: "#075458", fontWeight: "600" },
  categoryText: { fontSize: 12, color: "#075458", fontWeight: "500", marginTop: 4 },
  typeText: { fontSize: 12, color: "#075458", fontWeight: "400", marginTop: 2 }
});
