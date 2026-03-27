import { router } from "expo-router";
import { Bell, Mail, Menu, MessageCircle } from "lucide-react-native";
import { StyleSheet, TouchableOpacity, View, Image } from "react-native";
import { SafeAreaView } from 'react-native-safe-area-context';
import { useNavigation } from '@react-navigation/native';
import { SHADOWS } from '@/components/styles/global-style'
import { Text } from "react-native";

export default function TabsHeader({ title = '' }) {
    const navigation = useNavigation<any>()
    const handleOpenDrawer = () => {
        navigation.openDrawer();
    };
    return (
        <SafeAreaView style={{ backgroundColor: "#F4F4F4" }}>
            <View style={styles.container}>
                <View style={styles.leftContainer}>
                    {/* Menu button to toggle drawer */}
                    {/* <TouchableOpacity style={[styles.icon, SHADOWS.medium]} onPress={handleOpenDrawer}>
                        <Menu size={20} color="#000" />
                    </TouchableOpacity> */}

                    {/* Centered title */}
                     {title && (
                        <View >
                            <Text style={styles.title}>{title}</Text>
                        </View>
                    )}
                    {/* {title && (
                        <View style={styles.titleContainer}>
                            <Text style={styles.title}>{title}</Text>
                        </View>
                    )} */}
                </View>

                {/* Right icons */}
                <View style={styles.rightIcons}>
                    <TouchableOpacity style={[styles.icon, SHADOWS.medium]}
                        onPress={() => router.push('/message')}
                    >
                        <MessageCircle size={20} color="#000" />
                    </TouchableOpacity>
                    <TouchableOpacity style={[styles.icon, SHADOWS.medium]}
                        onPress={() => router.push('/notification')}
                    >
                        <Bell size={20} color="#000" />
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
        alignItems: "center",
        paddingHorizontal: 15,
        paddingTop: 6,
        marginTop: 5,
    },
    leftContainer: {
        // flex:1,
        flexDirection: "row",
        alignItems:"center",
        gap: 15
    },
    titleContainer: {
        position: 'absolute',
        left: 0,
        right: 0,
        alignItems: 'center',
        zIndex: -1,  // Place behind buttons so they remain clickable
    },
    title: {
        fontSize: 26,
        fontWeight: '700',
    },
    rightIcons: {
        flexDirection: "row",
        gap: 10
    },
    icon: {
        backgroundColor: "#FFFFFF",
        padding: 10,
        borderRadius: 20
    },
});
