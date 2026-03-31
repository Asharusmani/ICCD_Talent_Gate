import { Ionicons } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';
import { StyleSheet, Text, View } from 'react-native';

export default function Header({ title, description }: any) {
    return (
        <View style={styles.wrapper}>
            <LinearGradient
                colors={['#0a4f54', '#0d7c85', '#15A9B2']}
                start={{ x: 0, y: 0 }}
                end={{ x: 1, y: 1 }}
                style={styles.gradient}
            >
                {/* Decorative circles for depth */}
                <View style={styles.decorCircleLarge} />
                <View style={styles.decorCircleSmall} />

                <View style={styles.card}>
                    {/* Icon Box */}
                    <View style={styles.iconBox}>
                        <LinearGradient
                            colors={['#ffffff22', '#ffffff44']}
                            style={styles.iconGradient}
                        >
                            <Ionicons name="cube-outline" size={22} color="#fff" />
                        </LinearGradient>
                    </View>

                    {/* Text */}
                    <View style={styles.textBlock}>
                        <Text style={styles.title}>{title}</Text>
                        <View style={styles.divider} />
                        <Text style={styles.subtitle}>{description}</Text>
                    </View>
                </View>

                {/* Bottom tag */}
                <View style={styles.tagRow}>
                    <View style={styles.tag}>
                        <View style={styles.tagDot} />
                        <Text style={styles.tagText}>Live Orders</Text>
                    </View>
                    <View style={styles.tag}>
                        <View style={[styles.tagDot, { backgroundColor: '#facc15' }]} />
                        <Text style={styles.tagText}>Smart Tracking</Text>
                    </View>
                </View>
            </LinearGradient>
        </View>
    );
}

const styles = StyleSheet.create({
    wrapper: {
        borderRadius: 20,
        overflow: 'hidden',
        shadowColor: '#0a4f54',
        shadowOffset: { width: 0, height: 6 },
        shadowOpacity: 0.3,
        shadowRadius: 14,
        elevation: 8,
    },
    gradient: {
        padding: 18,
        paddingBottom: 14,
        borderRadius: 20,
        overflow: 'hidden',
    },
    decorCircleLarge: {
        position: 'absolute',
        width: 160,
        height: 160,
        borderRadius: 80,
        backgroundColor: '#ffffff0d',
        top: -50,
        right: -40,
    },
    decorCircleSmall: {
        position: 'absolute',
        width: 80,
        height: 80,
        borderRadius: 40,
        backgroundColor: '#ffffff0a',
        bottom: 10,
        left: -20,
    },
    card: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 14,
    },
    iconBox: {
        borderRadius: 14,
        overflow: 'hidden',
        marginRight: 14,
    },
    iconGradient: {
        width: 48,
        height: 48,
        borderRadius: 14,
        alignItems: 'center',
        justifyContent: 'center',
        borderWidth: 1,
        borderColor: '#ffffff33',
    },
    textBlock: {
        flex: 1,
    },
    title: {
        color: '#ffffff',
        fontSize: 17,
        fontWeight: '700',
        letterSpacing: 0.3,
    },
    divider: {
        width: 32,
        height: 2,
        backgroundColor: '#15A9B2',
        borderRadius: 2,
        marginVertical: 5,
    },
    subtitle: {
        color: '#cdf4f7',
        fontSize: 11,
        lineHeight: 16,
        opacity: 0.9,
    },
    tagRow: {
        flexDirection: 'row',
        gap: 10,
        borderTopWidth: 1,
        borderTopColor: '#ffffff1a',
        paddingTop: 10,
    },
    tag: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: '#ffffff14',
        paddingHorizontal: 10,
        paddingVertical: 4,
        borderRadius: 20,
        gap: 6,
    },
    tagDot: {
        width: 6,
        height: 6,
        borderRadius: 3,
        backgroundColor: '#4ade80',
    },
    tagText: {
        color: '#e0fafb',
        fontSize: 10,
        fontWeight: '500',
    },
});