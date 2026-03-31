import { Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { router, useSegments } from 'expo-router';

interface GigItem {
    id: number;
    gigsID: number;
    gigsTitle: string;
    gigsDescription: string;
    gigsImage: string;
    base_price: string;
    status: string;
    package_type: string;
    created_at: string;
}

interface CardProps {
    item: GigItem;
    handleClickComplete: () => void;
}

function getStatusConfig(status: string) {
    const s = status?.toLowerCase();
    if (s === 'completed') return {
        label: 'Completed',
        badgeBg: '#f0fdf4',
        dotColor: '#16a34a',
        textColor: '#15803d',
    };
    if (s === 'paid' || s === 'in progress' || s === 'inprogress') return {
        label: s === 'paid' ? 'Paid' : 'In Progress',
        badgeBg: '#fffbeb',
        dotColor: '#d97706',
        textColor: '#b45309',
    };
    return {
        label: status ?? 'Pending',
        badgeBg: '#f5f3ff',
        dotColor: '#7c3aed',
        textColor: '#6d28d9',
    };
}

function formatDate(dateStr: string) {
    if (!dateStr) return '—';
    const d = new Date(dateStr);
    return d.toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' });
}

export default function OrderCard({ item, handleClickComplete }: CardProps) {
    const segments = useSegments();
    const cfg = getStatusConfig(item.status);

    const route = segments.includes('(client)')
        ? `/client-order-detail/${item.id}`
        : `/freelancer-order-detail/${item.id}`;

    return (
        <View style={styles.card}>
            <View style={styles.cardBody}>
                <Image
                    source={{ uri: item?.gigsImage?.split(',')[0] }}
                    style={styles.thumb}
                    resizeMode="cover"
                />
                <View style={styles.info}>
                    <View style={styles.topRow}>
                        <Text numberOfLines={2} style={styles.title}>{item.gigsTitle}</Text>
                        <Text style={styles.orderId}>#{item.id}</Text>
                    </View>
                    <Text style={styles.price}>${item.base_price}</Text>
                    <View style={styles.bottomRow}>
                        <View style={[styles.badge, { backgroundColor: cfg.badgeBg }]}>
                            <View style={[styles.dot, { backgroundColor: cfg.dotColor }]} />
                            <Text style={[styles.badgeText, { color: cfg.textColor }]}>
                                {cfg.label}
                            </Text>
                        </View>
                    </View>
                </View>
            </View>

            <View style={styles.divider} />

            <View style={styles.footer}>
                <Text style={styles.footerLabel}>
                    Ordered <Text style={styles.footerMeta}>{formatDate(item.created_at)}</Text>
                </Text>
                <TouchableOpacity onPress={() => router.push(route)} activeOpacity={0.6}>
                    <Text style={styles.detailBtn}>See details →</Text>
                </TouchableOpacity>
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    card: {
        backgroundColor: '#ffffff',
        borderRadius: 16,
        borderWidth: 0.5,
        borderColor: '#e5e7eb',
        overflow: 'hidden',
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 1 },
        shadowOpacity: 0.05,
        shadowRadius: 4,
        elevation: 2,
    },
    cardBody: {
        flexDirection: 'row',
    },
    thumb: {
        width: 108,
        height: 108,
        flexShrink: 0,
    },
    info: {
        flex: 1,
        paddingHorizontal: 14,
        paddingTop: 14,
        paddingBottom: 12,
        justifyContent: 'space-between',
    },
    topRow: {
        flexDirection: 'row',
        alignItems: 'flex-start',
        gap: 8,
    },
    title: {
        flex: 1,
        fontSize: 13,
        fontWeight: '500',
        color: '#111827',
        lineHeight: 19,
    },
    orderId: {
        fontSize: 10,
        color: '#9ca3af',
        paddingTop: 2,
        flexShrink: 0,
    },
    price: {
        fontSize: 18,
        fontWeight: '600',
        color: '#0d7c85',
        marginTop: 6,
        letterSpacing: -0.3,
    },
    bottomRow: {
        marginTop: 8,
    },
    badge: {
        flexDirection: 'row',
        alignItems: 'center',
        alignSelf: 'flex-start',
        gap: 5,
        paddingHorizontal: 10,
        paddingVertical: 4,
        borderRadius: 6,
    },
    dot: {
        width: 5,
        height: 5,
        borderRadius: 3,
    },
    badgeText: {
        fontSize: 11,
        fontWeight: '500',
    },
    divider: {
        height: 0.5,
        backgroundColor: '#f3f4f6',
        marginHorizontal: 14,
    },
    footer: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        paddingHorizontal: 14,
        paddingVertical: 10,
    },
    footerLabel: {
        fontSize: 11,
        color: '#9ca3af',
    },
    footerMeta: {
        fontSize: 11,
        color: '#374151',
        fontWeight: '500',
    },
    detailBtn: {
        fontSize: 12,
        fontWeight: '500',
        color: '#0d7c85',
    },
});