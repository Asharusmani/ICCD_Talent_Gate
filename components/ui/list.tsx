import React, { useCallback } from 'react'
import { Text, View, ActivityIndicator, StyleSheet, FlatList } from 'react-native'

interface ListProps {
    data: any;
    error: string | null;
    isLoading: boolean;
    hasNextPage: boolean;
    isFetchingNextPage: boolean;
    fetchNextPage: () => void;
    renderItem: any;
    contentContainerStyle?: any;
}

function List({
    data,
    error,
    isLoading,
    hasNextPage,
    isFetchingNextPage,
    fetchNextPage,
    renderItem,
    contentContainerStyle,
}: ListProps) {

    const handleLoadMore = useCallback(() => {
        if (hasNextPage && !isFetchingNextPage) {
            fetchNextPage();
        }
    }, [hasNextPage, isFetchingNextPage, fetchNextPage]);

    const renderFooter = () => {
        if (!isFetchingNextPage) return null;
        return (
            <View style={styles.footer}>
                <ActivityIndicator size="small" color="#0d9488" />
            </View>
        );
    };

    if (isLoading) {
        return <ActivityIndicator style={{ marginTop: 20 }} color="#0d9488" />;
    }

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
            contentContainerStyle={contentContainerStyle}
        />
    );
}

export default List;

const styles = StyleSheet.create({
    footer: {
        padding: 20,
        alignItems: 'center',
    },
});