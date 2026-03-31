import { router } from "expo-router";
import { Bell, MessageCircle, ShoppingCart } from "lucide-react-native";
import { StyleSheet, TouchableOpacity, View, Text } from "react-native";
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { BlurView } from 'expo-blur';

const ACCENT = '#0d9488';
const BORDER = 'rgba(255,255,255,0.55)';
const TEXT_PRIMARY = '#0f172a';

export default function OrderHeader({ title = 'Orders' }) {
    const insets = useSafeAreaInsets();

    return (
        <BlurView
            intensity={60}
            tint="light"
            style={[styles.blurContainer, { paddingTop: insets.top }]}
        >
            <View style={styles.container}>

                {/* Left — Title with icon */}
                <View style={styles.leftContainer}>
                    <View style={styles.titleIconWrapper}>
                        <ShoppingCart size={20} color={ACCENT} />
                    </View>
                    <Text style={styles.title}>{title}</Text>
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
        paddingVertical: 14,
    },
    leftContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 10,
    },
    titleIconWrapper: {
        width: 36,
        height: 36,
        borderRadius: 18,
        backgroundColor: 'rgba(255,255,255,0.65)',
        borderWidth: 1,
        borderColor: 'rgba(255,255,255,0.55)',
        alignItems: 'center',
        justifyContent: 'center',
    },
    title: {
        fontSize: 22,
        fontWeight: '700',
        color: TEXT_PRIMARY,
        letterSpacing: -0.3,
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
        borderColor: 'rgba(255,255,255,0.55)',
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