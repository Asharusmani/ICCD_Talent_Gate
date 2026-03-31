import { Ionicons, MaterialIcons } from "@expo/vector-icons";
import { LinearGradient } from "expo-linear-gradient";
import { useRouter } from "expo-router";
import { StatusBar } from "expo-status-bar";
import React, { useRef, useState } from "react";
import {
    Animated,
    Dimensions,
    ScrollView,
    StyleSheet,
    Text,
    View,
} from "react-native";
// import { BarChart } from "react-native-chart-kit";
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { BlurView } from "expo-blur";
import { useHeaderHeight } from '@react-navigation/elements';

// Your existing drawer component
// import Drawer from "../../components/drawer";

const { width } = Dimensions.get("window");

const ACCENT = '#0d9488';
const BORDER = 'rgba(255,255,255,0.55)';
const TEXT_PRIMARY = '#0f172a';
const TEXT_SECONDARY = '#6b7280';

export default function HomeScreen() {
    const router = useRouter();
    const headerHeight = useHeaderHeight();      // ← component ke andar
    const [drawerVisible, setDrawerVisible] = useState(false);
    const slideAnim = useRef(new Animated.Value(-width * 0.7)).current;

    const openDrawer = () => {
        setDrawerVisible(true);
        Animated.timing(slideAnim, {
            toValue: 0,
            duration: 300,
            useNativeDriver: false,
        }).start();
    };

    const closeDrawer = () => {
        Animated.timing(slideAnim, {
            toValue: -width * 0.7,
            duration: 300,
            useNativeDriver: false,
        }).start(() => setDrawerVisible(false));
    };

    return (
        <LinearGradient
            colors={['#f0f9ff', '#e0f2fe', '#bae6fd', '#7dd3fc']}
            style={{ flex: 1 }}
            start={{ x: 0, y: 0 }}
            end={{ x: 0.6, y: 1 }}
        >
            <StatusBar style="dark" />
            <ScrollView
                contentContainerStyle={[
                    styles.scrollContent,
                    { paddingTop: headerHeight + 16 }   // ← exact header height
                ]}
                showsVerticalScrollIndicator={false}
            >

                {/* Header */}
                {/* <View style={styles.header}>
                    <TouchableOpacity onPress={openDrawer}>
                        <Ionicons name="menu" size={28} color="#000" />
                    </TouchableOpacity>
                    <View style={styles.headerIcons}>
                        <TouchableOpacity onPress={() => router.push("/chat")}>
                            <Ionicons
                                name="mail-outline"
                                size={24}
                                color="#000"
                                style={{ marginRight: 15 }}
                            />
                        </TouchableOpacity>
                        <TouchableOpacity onPress={() => router.push("/notification")}>
                            <Ionicons name="notifications-outline" size={24} color="#000" />
                        </TouchableOpacity>
                    </View>
                </View> */}

                {/* ── Header Row ── */}
                <View style={styles.headerRow}>
                    <View>
                        <Text style={styles.greeting}>Good morning</Text>
                        <Text style={styles.heading}>Dashboard</Text>
                    </View>
                    <View style={styles.avatar}>
                        <Text style={styles.avatarText}>A</Text>
                    </View>
                </View>

                {/* ── Hero Card ── */}
                <LinearGradient
                    colors={['rgba(13,148,136,0.80)', 'rgba(8,145,178,0.70)']}
                    style={styles.heroCard}
                    start={{ x: 0, y: 0 }}
                    end={{ x: 1, y: 1 }}
                >
                    <Text style={styles.heroLabel}>Total Gigs Added</Text>
                    <Text style={styles.heroValue}>55</Text>
                    <Text style={styles.heroSub}>Active listings this month</Text>
                    <View style={styles.heroIconBox}>
                        <Ionicons name="briefcase-outline" size={22} color="rgba(255,255,255,0.85)" />
                    </View>
                </LinearGradient>

                {/* ── Mini Cards ── */}
                <View style={styles.rowCards}>
                    <BlurView intensity={40} tint="light" style={styles.miniCard}>
                        <View style={[styles.miniDot, { backgroundColor: ACCENT }]} />
                        <Text style={styles.miniLabel}>Projects</Text>
                        <Text style={styles.miniValue}>23</Text>
                        <Text style={styles.miniDesc}>Applied</Text>
                    </BlurView>

                    <BlurView intensity={40} tint="light" style={styles.miniCard}>
                        <View style={[styles.miniDot, { backgroundColor: '#0891b2' }]} />
                        <Text style={styles.miniLabel}>Jobs</Text>
                        <Text style={styles.miniValue}>28</Text>
                        <Text style={styles.miniDesc}>Applied</Text>
                    </BlurView>
                </View>

                {/* ── Earning Overview ── */}
                <BlurView intensity={40} tint="light" style={styles.chartCard}>
                    <Text style={styles.chartLabel}>Earning Overview</Text>
                    {/* <BarChart
                        data={{
                            labels: ["Jan", "Feb", "Mar", "Apr", "May"],
                            datasets: [{ data: [20, 45, 28, 80, 99] }],
                        }}
                        width={width - 32}
                        height={220}
                        yAxisLabel="$"
                        chartConfig={{
                            backgroundColor: "#fff",
                            backgroundGradientFrom: "#fff",
                            backgroundGradientTo: "#fff",
                            decimalPlaces: 0,
                            color: (opacity = 1) => `rgba(0,0,0,${opacity})`,
                            labelColor: (opacity = 1) => `rgba(0,0,0,${opacity})`,
                            fillShadowGradient: "#15A9B2",
                            fillShadowGradientOpacity: 1,
                        }}
                        style={styles.chart}
                    /> */}
                    <View style={styles.chartPlaceholder}>
                        <Text style={styles.chartPlaceholderText}>Chart goes here</Text>
                    </View>
                </BlurView>

                {/* ── Recent Orders ── */}
                <View style={styles.recentHeader}>
                    <Text style={styles.recentTitle}>Recent Orders</Text>
                    <Text style={styles.viewAll}>View all</Text>
                </View>

                {[
                    { status: "In Progress", progress: 65 },
                    { status: "Completed", progress: 100 },
                ].map((order, idx) => (
                    <BlurView key={idx} intensity={45} tint="light" style={styles.orderCard}>
                        <View style={styles.orderTop}>
                            <Text style={styles.orderTitle}>
                                I Will Create Professional 2D And 3D Animation
                            </Text>
                            <View style={order.status === "In Progress" ? styles.badgeProgress : styles.badgeDone}>
                                <Text style={order.status === "In Progress" ? styles.badgeTextProgress : styles.badgeTextDone}>
                                    {order.status}
                                </Text>
                            </View>
                        </View>

                        <View style={styles.orderMeta}>
                            <Text style={styles.orderDate}>Nov 5, 2024 · 10:46 AM</Text>
                            <Text style={styles.price}>PKR 390.00</Text>
                        </View>

                        <View style={styles.progressRow}>
                            <Text style={styles.progressText}>Progress</Text>
                            <Text style={styles.progressPercent}>{order.progress}%</Text>
                        </View>
                        <View style={styles.progressBarBg}>
                            <View
                                style={[
                                    order.status === "In Progress"
                                        ? styles.progressBarFill
                                        : styles.progressBarFillGreen,
                                    { width: `${order.progress}%` },
                                ]}
                            />
                        </View>
                    </BlurView>
                ))}

            </ScrollView>
        </LinearGradient>
    );
}

const styles = StyleSheet.create({
    scrollContent: {
        paddingHorizontal: 20,
        paddingBottom: 120,       // tab bar ke liye space
    },

    overlay: {
        position: "absolute",
        top: 0, bottom: 0, left: 0, right: 0,
        backgroundColor: "rgba(0,0,0,0.5)",
        zIndex: 9,
    },
    drawerContainer: {
        position: "absolute",
        top: 0, bottom: 0,
        width: width * 0.7,
        zIndex: 10,
    },
    header: { flexDirection: "row", justifyContent: "space-between", padding: 16 },
    headerIcons: { flexDirection: "row", alignItems: "center" },

    headerRow: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: 24,
    },
    greeting: {
        fontSize: 13,
        color: TEXT_SECONDARY,
        fontWeight: '600',
        letterSpacing: 0.4,
        marginBottom: 3,
    },
    heading: {
        fontSize: 26,
        fontWeight: '800',
        color: TEXT_PRIMARY,
        letterSpacing: -0.5,
    },
    avatar: {
        width: 46,
        height: 46,
        borderRadius: 23,
        backgroundColor: ACCENT,
        alignItems: 'center',
        justifyContent: 'center',
        borderWidth: 2,
        borderColor: 'rgba(255,255,255,0.7)',
        shadowColor: ACCENT,
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.3,
        shadowRadius: 8,
        elevation: 6,
    },
    avatarText: { fontSize: 17, fontWeight: '800', color: '#fff' },

    heroCard: {
        borderRadius: 24,
        padding: 24,
        marginBottom: 14,
        borderWidth: 1,
        borderColor: 'rgba(255,255,255,0.55)',
        overflow: 'hidden',
    },
    heroLabel: {
        fontSize: 11,
        color: 'rgba(255,255,255,0.8)',
        fontWeight: '700',
        letterSpacing: 1.2,
        textTransform: 'uppercase',
        marginBottom: 8,
    },
    heroValue: {
        fontSize: 48,
        fontWeight: '900',
        color: '#fff',
        letterSpacing: -1.5,
        lineHeight: 52,
    },
    heroSub: {
        fontSize: 13,
        color: 'rgba(255,255,255,0.7)',
        fontWeight: '500',
        marginTop: 8,
    },
    heroIconBox: {
        position: 'absolute',
        right: 22,
        bottom: 22,
        width: 48,
        height: 48,
        borderRadius: 16,
        backgroundColor: 'rgba(255,255,255,0.18)',
        borderWidth: 1,
        borderColor: 'rgba(255,255,255,0.3)',
        alignItems: 'center',
        justifyContent: 'center',
    },

    rowCards: { flexDirection: 'row', gap: 12, marginBottom: 14 },
    miniCard: {
        flex: 1,
        padding: 18,
        borderRadius: 20,
        overflow: 'hidden',
        borderWidth: 1,
        borderColor: BORDER,
    },
    miniDot: {
        width: 8, height: 8, borderRadius: 4,
        position: 'absolute', top: 16, right: 16,
    },
    miniLabel: {
        fontSize: 10,
        color: TEXT_SECONDARY,
        fontWeight: '700',
        letterSpacing: 0.9,
        textTransform: 'uppercase',
        marginBottom: 6,
    },
    miniValue: { fontSize: 30, fontWeight: '900', color: TEXT_PRIMARY, letterSpacing: -0.5 },
    miniDesc: { fontSize: 11, color: TEXT_SECONDARY, marginTop: 3, fontWeight: '500' },

    chartCard: {
        borderRadius: 20,
        padding: 18,
        overflow: 'hidden',
        borderWidth: 1,
        borderColor: BORDER,
        marginBottom: 4,
    },
    chartLabel: {
        fontSize: 11,
        color: TEXT_SECONDARY,
        fontWeight: '700',
        letterSpacing: 0.9,
        textTransform: 'uppercase',
        marginBottom: 14,
    },
    chart: { marginVertical: 10, borderRadius: 16, alignSelf: "center" },
    chartPlaceholder: {
        height: 80,
        borderRadius: 12,
        backgroundColor: 'rgba(14,165,233,0.08)',
        alignItems: 'center',
        justifyContent: 'center',
    },
    chartPlaceholderText: { color: TEXT_SECONDARY, fontSize: 12 },

    recentHeader: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginTop: 22,
        marginBottom: 14,
    },
    recentTitle: { fontSize: 17, fontWeight: '800', color: TEXT_PRIMARY, letterSpacing: -0.3 },
    viewAll: { fontSize: 12, fontWeight: '700', color: ACCENT },

    orderCard: {
        borderRadius: 20,
        padding: 18,
        marginBottom: 12,
        overflow: 'hidden',
        borderWidth: 1,
        borderColor: BORDER,
    },
    orderTop: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'flex-start',
        marginBottom: 12,
    },
    orderTitle: {
        fontSize: 13, fontWeight: '700', color: TEXT_PRIMARY,
        lineHeight: 19, flex: 1, marginRight: 10,
    },
    badgeProgress: {
        backgroundColor: 'rgba(109,40,217,0.12)',
        borderWidth: 1,
        borderColor: 'rgba(109,40,217,0.2)',
        paddingHorizontal: 10, paddingVertical: 4, borderRadius: 30,
    },
    badgeDone: {
        backgroundColor: 'rgba(21,128,61,0.12)',
        borderWidth: 1,
        borderColor: 'rgba(21,128,61,0.2)',
        paddingHorizontal: 10, paddingVertical: 4, borderRadius: 30,
    },
    badgeTextProgress: { fontSize: 10, fontWeight: '700', color: '#6d28d9' },
    badgeTextDone: { fontSize: 10, fontWeight: '700', color: '#15803d' },
    orderMeta: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: 14,
    },
    orderDate: { fontSize: 11, color: TEXT_SECONDARY, fontWeight: '500' },
    price: { fontSize: 14, fontWeight: '800', color: TEXT_PRIMARY },
    progressRow: { flexDirection: 'row', justifyContent: 'space-between', marginBottom: 6 },
    progressText: { fontSize: 11, color: TEXT_SECONDARY, fontWeight: '500' },
    progressPercent: { fontSize: 11, fontWeight: '700', color: TEXT_PRIMARY },
    progressBarBg: { height: 5, backgroundColor: 'rgba(14,165,233,0.15)', borderRadius: 10 },
    progressBarFill: { height: 5, borderRadius: 10, backgroundColor: '#7c3aed' },
    progressBarFillGreen: { height: 5, borderRadius: 10, backgroundColor: ACCENT },
});