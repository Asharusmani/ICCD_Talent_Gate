import { Ionicons } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';
import { StyleSheet, Text, View } from 'react-native';

export default function Header({ title, description }: any) {
    return (
        <View>
            <LinearGradient
                colors={['#075458ED', '#15A9B2C2']}
                start={{ x: 0, y: 1 }}
                end={{ x: 1, y: 1 }}
                style={styles.gradient}
            >
                <View style={styles.card}>
                    <View style={styles.setIcon}>
                        <Ionicons name="cube-outline" size={20} color="#075458ED" />
                    </View>
                    <View style={{ marginLeft: 12 }}>
                        <Text style={styles.title}>{title}</Text>
                        <Text style={styles.subtitle}>{description}</Text>
                    </View>
                </View>
            </LinearGradient>
        </View>
    );
}

const styles = StyleSheet.create({
    card: {
        flexDirection: 'row',
        padding: 10,
        borderRadius: 14,
        marginBottom: 20,
    },
    title: {
        color: '#fff',
        fontSize: 16,
        fontWeight: '600',
    },
    subtitle: {
        color: '#E5FFFA',
        fontSize: 10,
        paddingTop: 5,
    },
    gradient: {
        flexDirection: 'row',
        backgroundColor: '',
        borderRadius: 14,
    },
    setIcon: {
        height: 25,
        width: 25,
        padding: 2,
        borderRadius: 8,
        backgroundColor: '#FFF',
        margin: 10,
        marginRight: 0,
        marginTop: 5
    }
});
