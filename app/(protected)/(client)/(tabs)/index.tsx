import { router } from 'expo-router';
import React, { useState } from 'react';
import List from '@/components/ui/list';
import { useGetGigs } from '@/api/client/gigs';
import useDebounce from '@/hooks/use-debounce';
import GigCard from '@/components/cards/gig-card'
import SearchBar from '@/components/ui/search-bar';
import { ICCDLoader } from '@/components/ui/loader';
import { StyleSheet, View, Text, TouchableOpacity } from 'react-native';
import ErrorScreen from '@/components/ui/error';
import ButtonRN from '@/components/ui/button';

export default function HomeScreen() {

  const [search, setSearch] = useState('')
  const debouncedSearch = useDebounce(search, 500);
  const { gigs, error, isLoading, hasNextPage, isFetchingNextPage, fetchNextPage } = useGetGigs({ search: debouncedSearch })
  
  if (isLoading) return <ICCDLoader />
  if(error) return <ErrorScreen />

  return (
    <View style={styles.container}>
      <TouchableOpacity style={{ marginTop: 20, backgroundColor: "pink", padding: 10, alignItems: "center", justifyContent: "center" }}
        onPress={() => router.push('/(protected)/(client)/testing')}>
        <Text>Testing</Text>
      </TouchableOpacity>
      <View style={styles.searchBarContainer}>
        <SearchBar value={search} onChangeText={(text) => setSearch(text)}
          placeholder="What services are you looking for today?"
        />
        {/* <ButtonRN  isLoading={false} handleClick={()=>console.log("button clicked")}>
          <Text>View Details</Text>
        </ButtonRN> */}
      </View>
      <Text style={{ fontWeight: 'bold', fontSize: 18, marginBottom: 12, marginTop: 18 }}>
        Based on what you might be looking for
      </Text>

      {isLoading ? <ICCDLoader /> :
        <List
          data={gigs}
          error={error}
          isLoading={isLoading}
          hasNextPage={hasNextPage}
          isFetchingNextPage={isFetchingNextPage}
          fetchNextPage={fetchNextPage}
          renderItem={({ item }: any) => (
            <GigCard
              userImage={item?.freelancerImg}
              name={item?.firstName + " " + item?.lastName}
              title={item?.subCategory}
              description={item?.description}
              fileUrl={item?.fileUrls?.split(",")[0]}
              handleClick={() => router.push(`/gig-detail/${item?.id}`)}
            />
          )}
        />
      }
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 0,
    paddingHorizontal: 15,
    backgroundColor: '#F4F4F4'
  },
  searchBarContainer: {
    marginTop: 20,
    display: 'flex',
    flexDirection: "row"
  },

  footer: {
    padding: 20,
    alignItems: 'center',
  },

  center: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  }

});
