import { useGetAllDisputeByClient } from "@/api/client/dispute";
import { DisputeCard } from '@/components/cards/dispute-card';
import List from '@/components/ui/list';
import { ICCDLoader } from '@/components/ui/loader';
import SearchBar from "@/components/ui/search-bar";
import { useState } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

export default function Dispute() {

  const [search, setSearch] = useState("")
  const { data, hasNextPage, isPending, fetchNextPage, isFetchingNextPage, isLoading, error } = useGetAllDisputeByClient()

  if (isLoading) return <ICCDLoader />
  if (error) return <Text>{error}</Text>

  return (
    <SafeAreaView style={styles.container}>
      {/* <Header title="My Dispute" description="This is dispute description" /> */}
      <SearchBar search={search} setSearch={setSearch} placeholder="Search Dispute..." />
      {/* <FlatList
        data={data}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => <DisputeCard item={item} />}
        contentContainerStyle={styles.listPadding}
        showsVerticalScrollIndicator={false}
      /> */}
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
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F4F4F4',
    padding: 10
  },
  listContainer:{
    marginTop: 20
  },
  listPadding: {
    // padding: 15,
    marginTop: 20
  },
});
