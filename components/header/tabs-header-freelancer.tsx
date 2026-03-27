import { router } from "expo-router";
import { Bell, Mail, Menu } from "lucide-react-native";
import { StyleSheet, TouchableOpacity, View } from "react-native";
import { SafeAreaView } from 'react-native-safe-area-context';
import { useNavigation } from '@react-navigation/native';

export default function TabsFreelancerHeader({title}) {

    const navigation = useNavigation()
    const handleOpenDrawer = () => {
        navigation.openDrawer();
    };
    return (
        <SafeAreaView>
            <View style={styles.container}>
                {/* Menu button to toggle drawer */}
                <TouchableOpacity onPress={handleOpenDrawer}>
                    <Menu size={24} color="#000" />
                </TouchableOpacity>

                <Text>{title}</Text>
                {/* Right icons */}
                <View style={styles.rightIcons}>
                    <TouchableOpacity style={styles.icon}
                        onPress={() => router.push('/message')}
                    >
                        <Mail size={24} color="#000" />
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.icon}
                        onPress={() => router.push('/notification')}
                    >
                        <Bell size={24} color="#000" />
                    </TouchableOpacity>
                </View>
            </View>
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    container: {
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",  // ensures vertical alignment
        paddingHorizontal: 15,
        paddingTop: 6,
        // backgroundColor: "#F9FAFB",
        marginTop: 5
    },
    rightIcons: {
        flexDirection: "row",
    },
    icon: {
        marginLeft: 16,
    },
});