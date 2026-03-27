import { useGetAllDisputeByFreelancer } from "@/api/client/dispute";
import { DisputeCard } from '@/components/cards/dispute-card';
import SearchBar from "@/components/ui/search-bar";
import { useState } from 'react';
import { FlatList, StyleSheet, Text } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import ICCDLoader from '@/components/ui/loader2';

export default function Dispute() {

  const [search, setSearch] = useState("")
  const { data, isSuccess, isPending, isError, isLoading, error } = useGetAllDisputeByFreelancer()

  if (isLoading) return <ICCDLoader />
  if(error) return <Text>{error.message}</Text>

  return (
    <SafeAreaView style={styles.container}>
      {/* <Header title="My Dispute" description="This is dispute description" /> */}
      <SearchBar search={search} setSearch={setSearch} placeholder="Search Dispute..." />
      <FlatList
        data={data}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => <DisputeCard item={item} />}
        contentContainerStyle={styles.listPadding}
        showsVerticalScrollIndicator={false}
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F4F4F4',
    padding: 10
  },
  listPadding: {
    // padding: 15,
    marginTop: 20
  },
});
