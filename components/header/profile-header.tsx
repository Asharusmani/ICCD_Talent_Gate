import { router } from "expo-router";
import { Bell, MessageCircle, User } from "lucide-react-native";
import { Image, StyleSheet, TouchableOpacity, View, Text } from "react-native";
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { BlurView } from 'expo-blur';

const ACCENT = '#0d9488';
const BORDER = 'rgba(255,255,255,0.55)';
const TEXT_PRIMARY = '#0f172a';

export default function ProfileHeader({ title = 'Profile' }: any) {
    const insets = useSafeAreaInsets();

    return (
        <BlurView
            intensity={60}
            tint="light"
            style={[styles.blurContainer, { paddingTop: insets.top }]}
        >
            <View style={styles.container}>

                {/* Left — Avatar + Title */}
                <View style={styles.leftContainer}>
                    <View style={styles.avatarWrapper}>
                        <Image
                            source={{ uri: 'https://randomuser.me/api/portraits/men/32.jpg' }}
                            style={styles.avatar}
                        />
                        {/* Online dot */}
                        <View style={styles.onlineDot} />
                    </View>
                    <View>
                        <Text style={styles.title}>{title}</Text>
                        <Text style={styles.subtitle}>Freelancer</Text>
                    </View>
                </View>

                {/* Right — Icons */}
                <View style={styles.rightIcons}>
                    <TouchableOpacity
                        style={styles.iconBtn}
                        onPress={() => router.push('/message')}
                        activeOpacity={0.8}
                    >
                        <MessageCircle size={20} color={ACCENT} />
                        <View style={styles.dot} />
                    </TouchableOpacity>

                    <TouchableOpacity
                        style={styles.iconBtn}
                        onPress={() => router.push('/notification')}
                        activeOpacity={0.8}
                    >
                        <Bell size={20} color={ACCENT} />
                    </TouchableOpacity>
                </View>

            </View>
        </BlurView>
    );
}

const styles = StyleSheet.create({
    blurContainer: {
        backgroundColor: 'rgba(240,249,255,0.55)',
        borderBottomWidth: 1,
        borderBottomColor: 'rgba(14,165,233,0.18)',
    },
    container: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingHorizontal: 16,
        paddingVertical: 10,
    },
    leftContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 12,
    },
    avatarWrapper: {
        position: 'relative',
    },
    avatar: {
        width: 44,
        height: 44,
        borderRadius: 22,
        borderWidth: 2,
        borderColor: ACCENT,
    },
    onlineDot: {
        position: 'absolute',
        bottom: 1,
        right: 1,
        width: 10,
        height: 10,
        borderRadius: 5,
        backgroundColor: '#22c55e',
        borderWidth: 1.5,
        borderColor: 'rgba(240,249,255,0.9)',
    },
    title: {
        fontSize: 18,
        fontWeight: '700',
        color: TEXT_PRIMARY,
        letterSpacing: -0.3,
    },
    subtitle: {
        fontSize: 12,
        color: '#64748b',
        fontWeight: '400',
        marginTop: 1,
    },
    rightIcons: {
        flexDirection: 'row',
        gap: 10,
    },
    iconBtn: {
        width: 44,
        height: 44,
        borderRadius: 22,
        backgroundColor: 'rgba(255,255,255,0.65)',
        borderWidth: 1,
        borderColor: BORDER,
        alignItems: 'center',
        justifyContent: 'center',
    },
    dot: {
        position: 'absolute',
        top: 9,
        right: 9,
        width: 7,
        height: 7,
        borderRadius: 4,
        backgroundColor: '#f43f5e',
        borderWidth: 1.5,
        borderColor: 'rgba(240,249,255,0.9)',
    },
});