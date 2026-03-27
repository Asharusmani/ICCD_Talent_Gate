import React, { useCallback, useRef } from 'react';
import {
  Text,
  View,
  ActivityIndicator,
  StyleSheet,
  FlatList,
} from 'react-native';

interface ListProps {
  data: any[];
  error: string | null;
  isLoading: boolean;
  hasNextPage: boolean;
  isFetchingNextPage: boolean;
  fetchNextPage: () => void;
  renderItem: any;
}

function MessageList({
  data,
  error,
  isLoading,
  hasNextPage,
  isFetchingNextPage,
  fetchNextPage,
  renderItem,
}: ListProps) {
  const onStartReachedCalledDuringMomentum = useRef(false);

  // Fetch more data safely
  const handleLoadMore = useCallback(() => {
    if (
      hasNextPage &&
      !isFetchingNextPage &&
      !onStartReachedCalledDuringMomentum.current
    ) {
      fetchNextPage();
      onStartReachedCalledDuringMomentum.current = true;
    }
  }, [hasNextPage, isFetchingNextPage, fetchNextPage]);

  // Footer loader
  const renderFooter = () => {
    if (!isFetchingNextPage) return null;
    return (
      <View style={styles.footer}>
        <ActivityIndicator size="small" />
      </View>
    );
  };

  if (isLoading) {
    return <ActivityIndicator style={{ marginTop: 20 }} />;
  }

  if (error) {
    return <Text style={{ color: 'red' }}>{error}</Text>;
  }

  return (
    <FlatList
      data={data}
      inverted
      renderItem={renderItem}
      keyExtractor={(_, index) => index.toString()}
      onEndReached={handleLoadMore}
      onEndReachedThreshold={0.1}
      onMomentumScrollBegin={() => {
        onStartReachedCalledDuringMomentum.current = false;
      }}
      ListFooterComponent={renderFooter}
      showsVerticalScrollIndicator={false}
    />
  );
}

export default MessageList;

const styles = StyleSheet.create({
  footer: {
    padding: 20,
    alignItems: 'center',
  },
});
