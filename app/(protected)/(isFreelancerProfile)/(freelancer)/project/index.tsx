import { useGetAllProjects } from "@/api/client/project";
import { ProjectCard } from "@/components/cards/project-card";
import SearchBar from "@/components/ui/search-bar";
import { useState } from "react";
import { FlatList, StyleSheet, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import ICCDLoader from '@/components/ui/loader2';

export default function PostedProject() {

  const [search, setSearch] = useState("")
  const { data, totalPages, isError, isLoading } = useGetAllProjects()

  if (isLoading) return <ICCDLoader />

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: '#F4F4F4' }}>
      <View style={styles.mainContainer}>
        <SearchBar search={search} setSearch={setSearch} placeholder="Search Project..." />
        <FlatList
          data={data}
          keyExtractor={(item) => item.id}
          renderItem={({ item }) => <ProjectCard item={item} />}
          contentContainerStyle={styles.listContent}
          showsVerticalScrollIndicator={false}
        />
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  mainContainer: {
    flex: 1,
    padding: 10,
  },
  listContent: {
    marginTop: 20,
    paddingBottom: 20,
  },
  buttonContainer: {
    marginTop: 10,
    alignItems: "flex-end",
  },
});
