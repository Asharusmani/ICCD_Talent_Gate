import { useGetAllProjects } from "@/api/client/project";
import { ProjectCard } from "@/components/cards/project-card";
import SearchBar from "@/components/ui/search-bar";
import { useState } from "react";
import { FlatList, StyleSheet, View } from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import ICCDLoader from '@/components/ui/loader2';
import { useHeaderHeight } from '@react-navigation/elements';

export default function PostedProject() {
  const headerHeight = useHeaderHeight();
  const [search, setSearch] = useState("")
  const { data, totalPages, isError, isLoading } = useGetAllProjects()

  if (isLoading) return <ICCDLoader />

  return (
    <LinearGradient
      colors={['#f0f9ff', '#e0f2fe', '#bae6fd', '#7dd3fc']}
      style={{ flex: 1 }}
      start={{ x: 0, y: 0 }}
      end={{ x: 0.6, y: 1 }}
    >
      <FlatList
        data={data}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => <ProjectCard item={item} />}
        contentContainerStyle={[
          styles.listContent,
          { paddingTop:headerHeight + 12 }
        ]}
        showsVerticalScrollIndicator={false}
        ListHeaderComponent={
          <View style={styles.searchBox}>
            <SearchBar
              search={search}
              setSearch={setSearch}
              placeholder="Search Project..."
            />
          </View>
        }
      />
    </LinearGradient>
  );
}

const styles = StyleSheet.create({
  searchBox: {
    marginBottom: 8,
  },
  listContent: {
    paddingHorizontal: 16,
    paddingBottom: 120,
    gap: 8,
  },
  buttonContainer: {
    marginTop: 10,
    alignItems: "flex-end",
  },
});