import { useGetNotification, useUpdateReadNot } from "@/api/client/notification";
import NotificationList from '@/components/ui/notification-list';
import { useAuth } from '@/utils/auth-context';
import { FlatList, StyleSheet, Text, View } from 'react-native';
import ICCDLoader from '@/components/ui/loader2';
import { LinearGradient } from 'expo-linear-gradient';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { Bell } from 'lucide-react-native';

const ACCENT = '#0d9488';
const BORDER = 'rgba(14,165,233,0.18)';
const TEXT_PRIMARY = '#0f172a';
const TEXT_SECONDARY = '#6b7280';

export default function NotificationScreen() {

    const { freelancer } = useAuth()
    const insets = useSafeAreaInsets();

    const { data, error, isLoading, isError } = useGetNotification({ id: freelancer.userID, type: "freelancer" })
    const { error: isUpdateErr, isLoading: isUpdateLoad, isError: isUpdateLoadIsErr } = useUpdateReadNot({ id: freelancer.userID, type: "client" })

    if (isLoading) return <ICCDLoader />

    return (
        <LinearGradient
            colors={['#f0f9ff', '#e0f2fe', '#bae6fd', '#7dd3fc']}
            style={{ flex: 1 }}
            start={{ x: 0, y: 0 }}
            end={{ x: 0.6, y: 1 }}
        >
            <View style={[styles.container, { paddingTop:  20 }]}>

                {/* Header */}
                <View style={styles.headerRow}>
                    <View>
                        <Text style={styles.heading}>Notifications</Text>
                        <Text style={styles.subHeading}>
                            {data?.length ?? 0} notification{data?.length !== 1 ? 's' : ''}
                        </Text>
                    </View>
                    <View style={styles.headerIconBox}>
                        <Bell size={22} color={ACCENT} />
                    </View>
                </View>

                {/* List */}
                <FlatList
                    data={data}
                    keyExtractor={(item) => item.id}
                    contentContainerStyle={styles.listContent}
                    showsVerticalScrollIndicator={false}
                    ItemSeparatorComponent={() => <View style={{ height: 10 }} />}
                    renderItem={({ item }) => <NotificationList item={item} />}
                    ListEmptyComponent={
                        <View style={styles.emptyBox}>
                            <Bell size={40} color="rgba(14,165,233,0.30)" />
                            <Text style={styles.emptyText}>No notifications yet</Text>
                            <Text style={styles.emptySub}>You are all caught up!</Text>
                        </View>
                    }
                />
            </View>
        </LinearGradient>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        paddingHorizontal: 16,
    },
    headerRow: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: 18,
    },
    heading: {
        fontSize: 26,
        fontWeight: '800',
        color: TEXT_PRIMARY,
        letterSpacing: -0.4,
    },
    subHeading: {
        fontSize: 13,
        color: TEXT_SECONDARY,
        fontWeight: '500',
        marginTop: 2,
    },
    headerIconBox: {
        width: 44,
        height: 44,
        borderRadius: 22,
        backgroundColor: 'rgba(255,255,255,0.75)',
        borderWidth: 1,
        borderColor: BORDER,
        alignItems: 'center',
        justifyContent: 'center',
    },
    listContent: {
        paddingBottom: 100,
    },
    emptyBox: {
        alignItems: 'center',
        justifyContent: 'center',
        paddingTop: 80,
        gap: 10,
    },
    emptyText: {
        fontSize: 16,
        fontWeight: '700',
        color: TEXT_PRIMARY,
    },
    emptySub: {
        fontSize: 13,
        color: TEXT_SECONDARY,
        textAlign: 'center',
    },
});