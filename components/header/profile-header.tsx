import { LinearGradient } from 'expo-linear-gradient';
import { Image, StyleSheet, Text, View } from 'react-native';
import { ChevronLeft } from 'lucide-react-native'
import { SafeAreaView } from 'react-native-safe-area-context';

export default function ProfileHeader({ title }: any) {
    return (
        <View style={styles.container}>
            <LinearGradient
                colors={['#11445C', '#40ADB6']}
                start={{ x: 0, y: 0 }}
                end={{ x: 1, y: 1 }}
            >
                <View style={styles.header}>
                    <View style={styles.backgroundContainer}>
                        <Image
                            source={require("@/assets/images/profile-background-icon.png")}
                            style={styles.backgroundImage} />
                    </View>

                    <View style={styles.content}>
                        <View style={styles.arrowContainer}>
                            <ChevronLeft size={30} />
                        </View>
                        <Text style={styles.title}>{title}</Text>
                    </View>
                </View>
            </LinearGradient>

            <View style={styles.profileImageContainer}>
                <Image
                    source={{ uri: 'https://randomuser.me/api/portraits/men/32.jpg' }}
                    style={styles.profileImage}
                />
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        backgroundColor: "#F9F9F9"
    },
    header: {
        height: 150
    },
    backgroundContainer: {
        position: 'absolute',
        right: 70,
        top: -35,
        height: 70,
        width: 70
    },
    backgroundImage: {

    },
    title: {
        fontSize: 20,
        fontWeight: '500',
        color: 'white',
        marginLeft: 100
    },
    content: {
        alignItems: "center",
        flexDirection: "row",
        marginTop: 30,
        paddingLeft: 20
    },
    arrowContainer: {
        alignItems: "center",
        justifyContent: "center",
        backgroundColor: "white",
        height: 40,
        width: 40,
        borderRadius: 30
    },
    profileImageContainer: {
        top: -5,
        // left: 20,
        backgroundColor: "#F9F9F9",
        borderTopEndRadius: 10,
        borderTopStartRadius: 10,
        position: "relative"
    },
    profileImage: {
        // position: "absolute",
        marginTop: -45,
        left: 20,
        width: 100,
        height: 100,
        borderRadius: 50,
        borderWidth: 3,
        borderColor: '#fff',
    },
});
