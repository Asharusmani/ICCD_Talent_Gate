import { useGetAllMessagesByUser } from "@/api/client/message";
import MessageCard from "@/components/cards/message-card";
import SearchBar from "@/components/ui/search-bar";
import { useAuth } from '@/utils/auth-context';
import { useState } from 'react';
import { FlatList, StyleSheet, View } from 'react-native';
import ICCDLoader from '@/components/ui/loader2';

export default function Message() {

    const { freelancer } = useAuth()
    let [search, setSearch] = useState('')
    const { data, isLoading } = useGetAllMessagesByUser({ id: freelancer.userID, type: "freelancer" });

    if (isLoading) return <ICCDLoader />

    return (
        <View style={styles.container}>
            <View style={styles.searchContainer}>
                <SearchBar search={search} setSearch={setSearch} placeholder='Search...' />
            </View>
            <FlatList style={styles.list}
                data={data}
                keyExtractor={(_, index) => index.toString()}
                renderItem={({ item }) => <MessageCard item={item} />}
            />
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        paddingHorizontal: 10,
        backgroundColor: '#F4F4F4'
    },
    searchContainer: { marginTop: 30 },
    list: {
        marginTop: 5,
        paddingHorizontal: 10
    },
    row: {
        flexDirection: 'row',
        alignItems: 'center',
        paddingVertical: 14,
        borderBottomWidth: 1,
        borderColor: '#F1F1F1',
    },
    avatar: {
        width: 44,
        height: 44,
        borderRadius: 22,
        marginRight: 12,
    },
    info: {
        flex: 1,
    },
    name: {
        fontFamily: 'Poppins-Medium',
    },
    date: {
        fontSize: 11,
        color: '#9CA3AF',
    },

});
