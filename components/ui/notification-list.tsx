import { formatDateDay } from '@/functions/date-format';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { Bell } from "lucide-react-native";

const ACCENT = '#0d9488';
const BORDER = 'rgba(14,165,233,0.18)';
const TEXT_PRIMARY = '#0f172a';
const TEXT_SECONDARY = '#6b7280';

export default function NotificationList({ item, onPress }: any) {
    const isUnread = !item.is_read;

    return (
        <TouchableOpacity
            style={[styles.item, isUnread && styles.unreadItem]}
            onPress={onPress}
            activeOpacity={0.8}
        >
            {/* Icon Box */}
            <View style={[styles.iconBox, isUnread && styles.iconBoxUnread]}>
                <Bell size={20} color={isUnread ? '#fff' : ACCENT} />
            </View>

            {/* Content */}
            <View style={styles.content}>
                <Text style={styles.message} numberOfLines={3}>
                    <Text style={styles.name}>{item.name} </Text>
                    {item.message}
                </Text>
                <Text style={styles.time}>{formatDateDay(item.created_at)}</Text>
            </View>

            {/* Unread dot */}
            {isUnread && <View style={styles.dot} />}

        </TouchableOpacity>
    );
}

const styles = StyleSheet.create({
    item: {
        flexDirection: 'row',
        alignItems: 'flex-start',
        backgroundColor: 'rgba(255,255,255,0.85)',
        borderRadius: 16,
        borderWidth: 1,
        borderColor: BORDER,
        paddingHorizontal: 14,
        paddingVertical: 14,
        gap: 12,
    },
    unreadItem: {
        backgroundColor: 'rgba(255,255,255,0.95)',
        borderColor: 'rgba(13,148,136,0.30)',
    },

    // Icon
    iconBox: {
        width: 42,
        height: 42,
        borderRadius: 21,
        backgroundColor: 'rgba(13,148,136,0.10)',
        borderWidth: 1,
        borderColor: 'rgba(13,148,136,0.20)',
        alignItems: 'center',
        justifyContent: 'center',
        flexShrink: 0,
    },
    iconBoxUnread: {
        backgroundColor: ACCENT,
        borderColor: ACCENT,
    },

    // Content
    content: {
        flex: 1,
        minWidth: 0,
        gap: 5,
    },
    name: {
        fontSize: 14,
        fontWeight: '700',
        color: TEXT_PRIMARY,
    },
    message: {
        fontSize: 13,
        color: TEXT_SECONDARY,
        lineHeight: 20,
        fontWeight: '400',
    },
    time: {
        fontSize: 11,
        color: 'rgba(15,23,42,0.40)',
        fontWeight: '500',
    },

    // Unread dot
    dot: {
        width: 8,
        height: 8,
        borderRadius: 4,
        backgroundColor: ACCENT,
        marginTop: 6,
        flexShrink: 0,
    },
});


