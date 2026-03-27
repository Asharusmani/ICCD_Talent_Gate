import { StyleSheet, Text, View } from 'react-native';

interface GigHeaderProps {
    title: string;
    step: string;
    icon: React.ReactNode
}

export default function GigHeader({ title, step, icon }: GigHeaderProps) {
    return (
        <View style={styles.cardHeader}>
            <View style={styles.headerContent}>
                {icon}
                <Text style={styles.cardHeaderText}>{title}</Text>
            </View>
            <View style={styles.badge}>
                <Text style={styles.badgeText}>Step {step} / 4</Text>
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    cardHeader: {
        backgroundColor: "#043A53",
        padding: 18,
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
        borderTopStartRadius: 20,
        borderTopEndRadius: 20,
    },
    headerContent: {
        flexDirection: "row",
        alignItems: "center",
        gap: 10,
    },
    cardHeaderText: {
        color: "#fff",
        fontSize: 18,
        fontWeight: "700",
    },
    badge: {
        backgroundColor: "rgba(255, 255, 255, 0.2)",
        paddingHorizontal: 12,
        paddingVertical: 4,
        borderRadius: 12,
    },
    badgeText: {
        color: "#fff",
        fontSize: 12,
        fontWeight: "600",
    },
});
