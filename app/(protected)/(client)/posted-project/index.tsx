import { useGetProjectsByClient } from "@/api/client/project";
import { ProjectCard } from "@/components/cards/project-card";
import ButtonRN from "@/components/ui/button";
import List from "@/components/ui/list";
import SearchBar from "@/components/ui/search-bar";
import ICCDLoader from '@/components/ui/loader2';
import { router } from "expo-router";
import { useCallback, useMemo, useState } from "react";
import { StyleSheet, View, Text } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

export default function PostedProject() {
  const [search, setSearch] = useState("");
  
  // Use search state in the query
  const { 
    data, 
    isLoading, 
    error, 
    hasNextPage, 
    isFetchingNextPage, 
    fetchNextPage 
  } = useGetProjectsByClient({ search });

  // Memoize handlers
  const handleAddProject = useCallback(() => {
    router.push('/create-project');
  }, []);

  const handleSearchChange = useCallback((value: string) => {
    setSearch(value);
  }, []);

  // Memoize render item to prevent unnecessary re-renders
  const renderProjectCard = useCallback(({ item }: any) => (
    <ProjectCard item={item} />
  ), []);

  // Show loader only on initial load
  if (isLoading && !data) {
    return (
      <SafeAreaView style={styles.loaderContainer}>
        <ICCDLoader />
      </SafeAreaView>
    );
  }

  // Show empty state
  const showEmptyState = !isLoading && !error && data?.length === 0;

  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={styles.mainContainer}>
        {/* Search Bar */}
        <SearchBar 
          search={search} 
          setSearch={handleSearchChange} 
          placeholder="Search projects..." 
        />

        {/* Add Project Button */}
        <View style={styles.buttonContainer}>
          <ButtonRN
            style={styles.addButton}
            handleClick={handleAddProject}
          >
            Add New Project
          </ButtonRN>
        </View>

        {/* Project List */}
        {showEmptyState ? (
          <View style={styles.emptyState}>
            <Text style={styles.emptyStateText}>
              {search ? "No projects found matching your search" : "No projects yet"}
            </Text>
            {!search && (
              <Text style={styles.emptyStateSubtext}>
                Get started by creating your first project
              </Text>
            )}
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
            contentContainerStyle={styles.listContent}
          />
        )}
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: '#F4F4F4',
  },
  loaderContainer: {
    flex: 1,
    backgroundColor: '#F4F4F4',
    justifyContent: 'center',
    alignItems: 'center',
  },
  mainContainer: {
    flex: 1,
    padding: 16,
  },
  buttonContainer: {
    marginTop: 12,
    marginBottom: 16,
    alignItems: "flex-end",
  },
  addButton: {
    width: 160,
    height: 45,
    paddingVertical: 0,
  },
  listContent: {
    paddingBottom: 20,
  },
  emptyState: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 32,
  },
  emptyStateText: {
    fontSize: 18,
    fontWeight: '600',
    color: '#666',
    textAlign: 'center',
    marginBottom: 8,
  },
  emptyStateSubtext: {
    fontSize: 14,
    color: '#999',
    textAlign: 'center',
  },
});