import MessageCard from "@/components/cards/message-card";
import SearchBar from "@/components/ui/search-bar";
import { useState } from 'react';
import { FlatList, StyleSheet, Text, View } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { MessageCircle } from 'lucide-react-native';

const ACCENT = '#0d9488';
const BORDER = 'rgba(14,165,233,0.18)';
const TEXT_PRIMARY = '#0f172a';
const TEXT_SECONDARY = '#6b7280';

const DUMMY_CONVERSATIONS = [
    {
        chat_partner_id: 2,
        chat_partner_name: 'Ahmed Raza',
        pic: 'https://i.pravatar.cc/150?img=1',
        messages: 'Sure! I can start the project next week.',
        created_at: new Date('2024-01-10T14:30:00'),
        receiverId: 1,
        senderId: 2,
        unread: 2,
    },
    {
        chat_partner_id: 3,
        chat_partner_name: 'Sara Khan',
        pic: 'https://i.pravatar.cc/150?img=5',
        messages: 'My rate is $40/hour. Let me know if that works.',
        created_at: new Date('2024-01-09T10:15:00'),
        receiverId: 1,
        senderId: 3,
        unread: 0,
    },
    {
        chat_partner_id: 4,
        chat_partner_name: 'Usman Ali',
        pic: 'https://i.pravatar.cc/150?img=3',
        messages: 'I have sent you the proposal. Please review it.',
        created_at: new Date('2024-01-08T18:45:00'),
        receiverId: 1,
        senderId: 4,
        unread: 1,
    },
    {
        chat_partner_id: 5,
        chat_partner_name: 'Fatima Malik',
        pic: 'https://i.pravatar.cc/150?img=9',
        messages: 'Thank you for the opportunity!',
        created_at: new Date('2024-01-07T09:00:00'),
        receiverId: 1,
        senderId: 5,
        unread: 0,
    },
    {
        chat_partner_id: 6,
        chat_partner_name: 'Bilal Hassan',
        pic: 'https://i.pravatar.cc/150?img=7',
        messages: 'Can we schedule a call to discuss requirements?',
        created_at: new Date('2024-01-06T16:20:00'),
        receiverId: 1,
        senderId: 6,
        unread: 3,
    },
];

export default function Message() {
    const [search, setSearch] = useState('');
    const insets = useSafeAreaInsets();

    // ── State mein conversations rakho taake delete kaam kare
    const [conversations, setConversations] = useState(DUMMY_CONVERSATIONS);

    // ── Jab backend ready ho to yeh uncomment karo:
    // const { user } = useAuth();
    // const { data, isLoading } = useGetAllMessagesByUser({ id: user.id, type: "client" });
    // if (isLoading) return <ICCDLoader />;
    // setConversations(data); // ya directly data use karo

    // ── Delete handler
    const handleDelete = (deletedItem: any) => {
        setConversations(prev =>
            prev.filter(c => c.chat_partner_id !== deletedItem.chat_partner_id)
        );
    };

    // ── Search filter
    const filtered = conversations.filter((item) =>
        item.chat_partner_name.toLowerCase().includes(search.toLowerCase())
    );

    return (
        <LinearGradient
            colors={['#f0f9ff', '#e0f2fe', '#bae6fd', '#7dd3fc']}
            style={{ flex: 1 }}
            start={{ x: 0, y: 0 }}
            end={{ x: 0.6, y: 1 }}
        >
            <View style={[styles.container, { paddingTop: 16 }]}>

                {/* Header */}
                <View style={styles.headerRow}>
                    <View>
                        <Text style={styles.heading}>Messages</Text>
                        <Text style={styles.subHeading}>
                            {filtered.length} conversation{filtered.length !== 1 ? 's' : ''}
                        </Text>
                    </View>
                    <View style={styles.headerIconBox}>
                        <MessageCircle size={22} color={ACCENT} />
                    </View>
                </View>

                {/* Search */}
                <View style={styles.searchWrapper}>
                    <SearchBar
                        search={search}
                        setSearch={setSearch}
                        placeholder="Search conversations..."
                    />
                </View>

                {/* List */}
                <FlatList
                    data={filtered}
                    keyExtractor={(item) => item.chat_partner_id.toString()}
                    contentContainerStyle={styles.listContent}
                    showsVerticalScrollIndicator={false}
                    ItemSeparatorComponent={() => <View style={{ height: 10 }} />}
                    renderItem={({ item }) => (
                        <MessageCard
                            item={item}
                            onDelete={handleDelete}
                        />
                    )}
                    ListEmptyComponent={
                        <View style={styles.emptyBox}>
                            <MessageCircle size={40} color="rgba(14,165,233,0.30)" />
                            <Text style={styles.emptyText}>No conversations found</Text>
                            <Text style={styles.emptySub}>Try a different search term</Text>
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
    searchWrapper: {
        marginBottom: 16,
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