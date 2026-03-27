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
import { SafeAreaView } from "react-native-safe-area-context";

// Your existing drawer component
// import Drawer from "../../components/drawer";

const { width } = Dimensions.get("window");

export default function HomeScreen() {
    const router = useRouter();
    const [drawerVisible, setDrawerVisible] = useState(false);
    const slideAnim = useRef(new Animated.Value(-width * 0.7)).current; // drawer offscreen

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
        <SafeAreaView style={styles.container}>
            <ScrollView contentContainerStyle={{ paddingBottom: 50 }}>
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

                {/* Summary Cards */}
                <View style={styles.cardsContainer}>
                    <LinearGradient colors={["#15A9B2", "#737373"]} style={styles.bigCard}>
                        <Text style={styles.cardTitle}>Total Gig Added</Text>
                        <Text style={styles.cardValue}>55</Text>
                        <Ionicons
                            name="person-add-outline"
                            size={28}
                            color="#fff"
                            style={styles.cardIcon}
                        />
                    </LinearGradient>

                    <View style={styles.rowCards}>
                        <LinearGradient colors={["#15A9B2", "#737373"]} style={styles.smallCard}>
                            <Text style={styles.cardTitle}>Applied Projects</Text>
                            <Text style={styles.cardValue}>23</Text>
                            <MaterialIcons
                                name="folder-open"
                                size={24}
                                color="#fff"
                                style={styles.cardIcon}
                            />
                        </LinearGradient>

                        <LinearGradient colors={["#15A9B2", "#737373"]} style={styles.smallCard}>
                            <Text style={styles.cardTitle}>Applied Jobs</Text>
                            <Text style={styles.cardValue}>28</Text>
                            <MaterialIcons
                                name="work-outline"
                                size={24}
                                color="#fff"
                                style={styles.cardIcon}
                            />
                        </LinearGradient>
                    </View>
                </View>

                {/* Chart */}
                <Text style={styles.sectionTitle}>Earning Overview</Text>
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

                {/* Recent Orders */}
                <View style={styles.recentHeader}>
                    <Text style={styles.recentTitle}>Recent Orders</Text>
                    <Text style={styles.viewAll}>View all</Text>
                </View>

                {[
                    { status: "In Progress", progress: 65 },
                    { status: "Completed", progress: 100 },
                ].map((order, idx) => (
                    <LinearGradient key={idx} colors={["#fff", "#fff"]} style={styles.orderCard}>
                        <Text style={styles.orderTitle}>
                            I Will Create Professional 2D And 3D Animation
                        </Text>

                        <View style={styles.rowBetween}>
                            <Text style={styles.orderDate}>Nov 5, 2024 • 10:46 AM</Text>
                            <View
                                style={[
                                    order.status === "In Progress"
                                        ? styles.inProgressBadge
                                        : styles.completedBadge,
                                ]}
                            >
                                <Text style={styles.badgeText}>{order.status}</Text>
                            </View>
                        </View>

                        <Text style={styles.price}>PKR 390.00</Text>

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
                    </LinearGradient>
                ))}
            </ScrollView>
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    container: { flex: 1, 
        backgroundColor: '#F4F4F4'
        // backgroundColor: "#fff" 
    },
    overlay: {
        position: "absolute",
        top: 0,
        bottom: 0,
        left: 0,
        right: 0,
        backgroundColor: "rgba(0,0,0,0.5)",
        zIndex: 9,
    },
    drawerContainer: {
        position: "absolute",
        top: 0,
        bottom: 0,
        width: width * 0.7,
        zIndex: 10,
    },
    header: { flexDirection: "row", justifyContent: "space-between", padding: 16 },
    headerIcons: { flexDirection: "row", alignItems: "center" },
    cardsContainer: { paddingHorizontal: 16 },
    bigCard: { borderRadius: 16, padding: 20, marginBottom: 12 },
    rowCards: { flexDirection: "row", justifyContent: "space-between" },
    smallCard: { flex: 1, borderRadius: 16, padding: 16, marginRight: 10 },
    cardTitle: { color: "#fff", fontSize: 14 },
    cardValue: { color: "#fff", fontSize: 22, fontWeight: "700", marginTop: 5 },
    cardIcon: { position: "absolute", right: 12, top: 12 },
    sectionTitle: { fontSize: 18, fontWeight: "700", marginLeft: 16, marginTop: 20 },
    chart: { marginVertical: 10, borderRadius: 16, alignSelf: "center" },
    recentHeader: { flexDirection: "row", justifyContent: "space-between", paddingHorizontal: 16, marginTop: 20 },
    recentTitle: { fontSize: 18, fontWeight: "700" },
    viewAll: { color: "#15A9B2", fontWeight: "600" },
    orderCard: {
        backgroundColor: "#fff",
        marginHorizontal: 16,
        marginTop: 12,
        borderRadius: 16,
        padding: 16,
        elevation: 5,
        shadowColor: "#000",
        shadowOffset: { width: 2, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 4,
        borderColor: "#E0E0E0",
        borderWidth: 1
    },
    orderTitle: { fontSize: 14, fontWeight: "600" },
    orderDate: { fontSize: 12, color: "#777", marginTop: 10 },
    price: { fontWeight: "700", marginVertical: 6 },
    rowBetween: { flexDirection: "row", justifyContent: "space-between", alignItems: "center" },
    inProgressBadge: { backgroundColor: "#E6D9FF", paddingHorizontal: 10, paddingVertical: 4, borderRadius: 20, marginTop: 10 },
    completedBadge: { backgroundColor: "#DFF5EA", paddingHorizontal: 10, paddingVertical: 4, borderRadius: 20, marginTop: 10 },
    badgeText: { fontSize: 12, fontWeight: "600", color: "#6A4BC3", marginTop: 2 },
    progressRow: { flexDirection: "row", justifyContent: "space-between", marginTop: 10 },
    progressText: { fontSize: 12 },
    progressPercent: { fontSize: 12, fontWeight: "600" },
    progressBarBg: { height: 6, backgroundColor: "#E0E0E0", borderRadius: 4, marginTop: 6 },
    progressBarFill: { height: 6, backgroundColor: "#9C6BFF", borderRadius: 4 },
    progressBarFillGreen: { height: 6, backgroundColor: "#22C55E", borderRadius: 4 },
});