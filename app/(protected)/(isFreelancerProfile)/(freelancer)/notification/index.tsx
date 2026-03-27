import { useGetNotification, useUpdateReadNot } from "@/api/client/notification";
import NotificationList from '@/components/ui/notification-list';
import { useAuth } from '@/utils/auth-context';
import { FlatList, StyleSheet, View } from 'react-native';
import ICCDLoader from '@/components/ui/loader2';

export default function NotificationScreen() {

    const { freelancer } = useAuth()
    const { data, error, isLoading, isError } = useGetNotification({ id: freelancer.userID, type: "freelancer" })
    const { error: isUpdateErr, isLoading: isUpdateLoad, isError: isUpdateLoadIsErr } = useUpdateReadNot({ id: freelancer.userID, type: "client" })

    if (isLoading) return <ICCDLoader />

    return (
        <View style={styles.container}>
            <FlatList
                data={data}
                keyExtractor={(item) => item.id}
                renderItem={({ item }) => <NotificationList item={item} />}
                contentContainerStyle={{ paddingVertical: 8 }}
            />
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#F4F4F4'
    },
});
