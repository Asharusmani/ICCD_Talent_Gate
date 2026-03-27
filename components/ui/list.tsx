import React from 'react'
import { Text, View, ActivityIndicator, StyleSheet, FlatList } from 'react-native'
import { useCallback } from 'react';

interface Listprops {
    data: any,
    error: string | null;
    isLoading: boolean;
    hasNextPage: boolean;
    isFetchingNextPage: boolean;
    fetchNextPage: () => void;
    renderItem: any;
}

function List({
    data, error,
    isLoading, hasNextPage,
    isFetchingNextPage, fetchNextPage,
    renderItem }: Listprops) {

    // fetch more data
    const handleLoadMore = useCallback(() => {
        if (hasNextPage && !isFetchingNextPage) {
            fetchNextPage();
        }
    }, [hasNextPage, isFetchingNextPage, fetchNextPage]);

    // show flat list footer
    const renderFooter = () => {
        if (!isFetchingNextPage) return null;
        return (
            <View style={styles.footer}>
                <ActivityIndicator size="small" color="#0000ff" />
            </View>
        );
    };

    // requested data is loading
    if (isLoading) {
        return <ActivityIndicator style={{ marginTop: 20 }} />;
    }

    // show error if anything go wrong
    if (error) {
        return <Text style={{ color: 'red' }}>{error}</Text>;
    }

    return (
        <FlatList
            data={data}
            keyExtractor={(_, index) => index.toString()}
            onEndReached={handleLoadMore}
            onEndReachedThreshold={0.8}
            ListFooterComponent={renderFooter}
            renderItem={renderItem}
            showsVerticalScrollIndicator={false}
        />
    )
}

export default List

const styles = StyleSheet.create({
    footer: {
        padding: 20,
        alignItems: 'center',
    },
})