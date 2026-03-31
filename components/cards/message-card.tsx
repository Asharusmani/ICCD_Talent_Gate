import { router } from 'expo-router';
import { Image, StyleSheet, Text, View, Animated, TouchableOpacity } from 'react-native';
import { formatDateDay } from '@/functions/date-format';
import { useRef } from 'react';
import { GestureHandlerRootView, PanGestureHandler } from 'react-native-gesture-handler';
import { Trash2 } from 'lucide-react-native';

const ACCENT = '#0d9488';
const BORDER = 'rgba(14,165,233,0.18)';
const TEXT_PRIMARY = '#0f172a';
const TEXT_SECONDARY = '#6b7280';

const SWIPE_THRESHOLD = -80;  // kitna swipe karne par delete show ho

export default function MessageCard({ item, onDelete }: any) {
    const translateX = useRef(new Animated.Value(0)).current;

    const onGestureEvent = Animated.event(
        [{ nativeEvent: { translationX: translateX } }],
        { useNativeDriver: true }
    );

    const onHandlerStateChange = ({ nativeEvent }: any) => {
        if (nativeEvent.state === 5) { // END state
            if (nativeEvent.translationX < SWIPE_THRESHOLD) {
                // Delete tak swipe ho gaya — wahan roko
                Animated.spring(translateX, {
                    toValue: SWIPE_THRESHOLD,
                    useNativeDriver: true,
                }).start();
            } else {
                // Wapas original position
                Animated.spring(translateX, {
                    toValue: 0,
                    useNativeDriver: true,
                }).start();
            }
        }
    };

    const handleDelete = () => {
        // Pehle animate karke hatao
        Animated.timing(translateX, {
            toValue: -400,
            duration: 250,
            useNativeDriver: true,
        }).start(() => {
            if (onDelete) onDelete(item);
        });
    };

    const resetSwipe = () => {
        Animated.spring(translateX, {
            toValue: 0,
            useNativeDriver: true,
        }).start();
    };

    // Delete button opacity — swipe ke saath fade in
    const deleteOpacity = translateX.interpolate({
        inputRange: [SWIPE_THRESHOLD, 0],
        outputRange: [1, 0],
        extrapolate: 'clamp',
    });

    // Clamp — sirf left swipe allow karo
    const clampedTranslateX = translateX.interpolate({
        inputRange: [-200, SWIPE_THRESHOLD, 0],
        outputRange: [-200, SWIPE_THRESHOLD, 0],
        extrapolate: 'clamp',
    });

    return (
        <GestureHandlerRootView>
            <View style={styles.wrapper}>

                {/* ── Delete button — peeche ── */}
                <Animated.View style={[styles.deleteBox, { opacity: deleteOpacity }]}>
                    <TouchableOpacity style={styles.deleteBtn} onPress={handleDelete}>
                        <Trash2 size={20} color="#fff" />
                        <Text style={styles.deleteText}>Delete</Text>
                    </TouchableOpacity>
                </Animated.View>

                {/* ── Card — swipe hoga ── */}
                <PanGestureHandler
                    onGestureEvent={onGestureEvent}
                    onHandlerStateChange={onHandlerStateChange}
                    activeOffsetX={[-10, 10]}
                >
                    <Animated.View style={{ transform: [{ translateX: clampedTranslateX }] }}>
                        <TouchableOpacity
                            activeOpacity={0.8}
                            onPress={() => {
                                resetSwipe();
                                router.push({
                                    pathname: `/message/${item.chat_partner_id}`,
                                    params: {
                                        receiverId: item.receiverId,
                                        senderId: item.senderId,
                                        name: item.chat_partner_name,
                                    }
                                });
                            }}
                        >
                            <View style={styles.row}>

                                {/* Avatar */}
                                <View style={styles.avatarWrapper}>
                                    <Image
                                        source={{ uri: item.pic ?? 'https://i.pravatar.cc/100' }}
                                        style={styles.avatar}
                                    />
                                    <View style={styles.onlineDot} />
                                </View>

                                {/* Info */}
                                <View style={styles.info}>
                                    <View style={styles.topRow}>
                                        <Text style={styles.name} numberOfLines={1}>
                                            {item.chat_partner_name}
                                        </Text>
                                        <Text style={styles.date}>
                                            {formatDateDay(item.created_at)}
                                        </Text>
                                    </View>
                                    <View style={styles.bottomRow}>
                                        <Text style={styles.lastMsg} numberOfLines={1}>
                                            {item.messages}
                                        </Text>
                                        {item.unread > 0 && (
                                            <View style={styles.unreadBadge}>
                                                <Text style={styles.unreadText}>{item.unread}</Text>
                                            </View>
                                        )}
                                    </View>
                                </View>

                            </View>
                        </TouchableOpacity>
                    </Animated.View>
                </PanGestureHandler>

            </View>
        </GestureHandlerRootView>
    );
}

const styles = StyleSheet.create({
    wrapper: {
        position: 'relative',
    },

    // Delete button — card ke peeche
    deleteBox: {
        position: 'absolute',
        right: 0,
        top: 0,
        bottom: 0,
        width: 80,
        borderRadius: 16,
        overflow: 'hidden',
    },
    deleteBtn: {
        flex: 1,
        backgroundColor: '#ef4444',
        alignItems: 'center',
        justifyContent: 'center',
        gap: 4,
        borderRadius: 16,
    },
    deleteText: {
        color: '#fff',
        fontSize: 11,
        fontWeight: '700',
    },

    // Card
    row: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: 'rgba(255,255,255,0.85)',
        borderRadius: 16,
        borderWidth: 1,
        borderColor: BORDER,
        padding: 12,
        gap: 12,
    },
    avatarWrapper: {
        position: 'relative',
        flexShrink: 0,
    },
    avatar: {
        width: 50,
        height: 50,
        borderRadius: 25,
        borderWidth: 2,
        borderColor: 'rgba(13,148,136,0.30)',
    },
    onlineDot: {
        position: 'absolute',
        bottom: 1,
        right: 1,
        width: 12,
        height: 12,
        borderRadius: 6,
        backgroundColor: '#10b981',
        borderWidth: 2,
        borderColor: '#fff',
    },
    info: {
        flex: 1,
        minWidth: 0,
        gap: 5,
    },
    topRow: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
    },
    name: {
        fontSize: 15,
        fontWeight: '700',
        color: TEXT_PRIMARY,
        flex: 1,
    },
    date: {
        fontSize: 11,
        color: TEXT_SECONDARY,
        fontWeight: '500',
        marginLeft: 8,
        flexShrink: 0,
    },
    bottomRow: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
    },
    lastMsg: {
        fontSize: 13,
        color: TEXT_SECONDARY,
        flex: 1,
    },
    unreadBadge: {
        width: 20,
        height: 20,
        borderRadius: 10,
        backgroundColor: ACCENT,
        alignItems: 'center',
        justifyContent: 'center',
        marginLeft: 8,
        flexShrink: 0,
    },
    unreadText: {
        fontSize: 10,
        fontWeight: '800',
        color: '#fff',
    },
});