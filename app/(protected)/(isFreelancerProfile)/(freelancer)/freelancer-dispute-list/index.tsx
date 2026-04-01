import { useGetAllDisputeByFreelancer } from "@/api/client/dispute";
import { DisputeCard } from '@/components/cards/dispute-card';
import SearchBar from "@/components/ui/search-bar";
import { useState } from 'react';
import { FlatList, StyleSheet, Text } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import ICCDLoader from '@/components/ui/loader2';
import { LinearGradient } from 'expo-linear-gradient';

export default function Dispute() {

  const [search, setSearch] = useState("")
  const insets = useSafeAreaInsets();
  const { data, isSuccess, isPending, isError, isLoading, error } = useGetAllDisputeByFreelancer()

  if (isLoading) return <ICCDLoader />
  if(error) return <Text>{error.message}</Text>

  return (
    <LinearGradient
      colors={['#f0f9ff', '#e0f2fe', '#bae6fd', '#7dd3fc']}
      style={styles.container}
      start={{ x: 0, y: 0 }}
      end={{ x: 0.6, y: 1 }}
    >
      {/* <Header title="My Dispute" description="This is dispute description" /> */}
      <SearchBar search={search} setSearch={setSearch} placeholder="Search Dispute..." />
      <FlatList
        data={data}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => <DisputeCard item={item} />}
        contentContainerStyle={[styles.listPadding, { paddingTop:  10 }]}
        showsVerticalScrollIndicator={false}
      />
    </LinearGradient>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 10
  },
  listPadding: {
    // padding: 15,
    marginTop: 20,
    paddingBottom: 40,
  },
});