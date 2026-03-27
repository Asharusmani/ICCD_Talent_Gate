import { useGetAllJobByClient } from "@/api/client/job";
import { JobCard } from '@/components/cards/job-card';
import ButtonRN from '@/components/ui/button';
import List from '@/components/ui/list';
import SearchBar from "@/components/ui/search-bar";
import { router } from 'expo-router';
import { useState } from 'react';
import { StyleSheet, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import ICCDLoader from '@/components/ui/loader2';

export default function PostedJob() {
  const [search, setSearch] = useState("")
  const { data, error, hasNextPage, isFetchingNextPage, fetchNextPage, isLoading } = useGetAllJobByClient({ search: "" })
  if (isLoading) return <ICCDLoader />

  return (
    <SafeAreaView style={styles.container}>
      {/* <Header title="Posted Jobs" description="This is job description" /> */}
      <SearchBar value={search} onChangeText={(text) => setSearch(text)} placeholder="Search Project..." />
      <View style={styles.buttonContainer}>
        <ButtonRN handleClick={() => router.push('/create-job')} style={{ width: 150, height: 45, paddingVertical: 0 }}>Add New Job</ButtonRN>
      </View>
      {/* <FlatList
        data={data}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => <JobCard item={item} />}
        contentContainerStyle={styles.listContent}
        showsVerticalScrollIndicator={false}
      /> */}
      <List
        data={data}
        error={error}
        isLoading={isLoading}
        hasNextPage={hasNextPage}
        isFetchingNextPage={isFetchingNextPage}
        fetchNextPage={fetchNextPage}
        renderItem={({ item }: any) => (
          <JobCard item={item} />
        )}
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 10,
    backgroundColor: "#F4F4F4",
  },
  listContent: {
    marginTop: 20,
    paddingBottom: 20,
  },
  card: {
    backgroundColor: '#FFFFFF',
    padding: 20,
    borderRadius: 15,
    width: '100%',
    elevation: 4,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 6,
    marginBottom: 16,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 20,
  },
  logoContainer: {
    backgroundColor: '#1E293B',
    width: 60,
    height: 60,
    borderRadius: 12,
    justifyContent: 'center',
    alignItems: 'center',
  },
  buttonContainer: {
    // flex:1,
    marginTop: 10,
    alignItems: "flex-end",
    // justifyContent:"center"
  },
  logoText: {
    color: '#fff',
    fontSize: 22,
    fontWeight: 'bold',
  },
  titleContainer: {
    marginLeft: 15,
  },
  jobTitle: {
    fontSize: 18,
    fontWeight: '700',
    color: '#000',
  },
  postedContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 4,
    backgroundColor: 'rgba(0,0,0,0.03)',
  },
  postedText: {
    fontSize: 13,
    color: '#8A7B7B',
    marginLeft: 5,
  },
  grid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
  },
  tag: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'rgba(0,0,0,0.04)',
    paddingVertical: 8,
    paddingHorizontal: 12,
    borderRadius: 20,
    width: '48%',
    marginBottom: 10,
  },
  tagText: {
    marginLeft: 6,
    fontSize: 13,
    fontWeight: '500',
    color: '#333',
  },
  iconCircle: {
    width: 16,
    height: 16,
    borderRadius: 8,
    borderWidth: 1.2,
    borderColor: '#1E293B',
    justifyContent: 'center',
    alignItems: 'center',
  }
});
