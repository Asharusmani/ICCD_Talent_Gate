import { Stack } from "expo-router";
import { router } from "expo-router";
import { Ionicons } from '@expo/vector-icons';
import { TouchableOpacity } from "react-native";

export default function ApplyProjectRootLayout() {
    return (
        <Stack
            screenOptions={{
                headerShown: true,
                headerLeft: () => (
                    <TouchableOpacity onPress={() => router.back()}>
                        <Ionicons name="arrow-back" size={24} color="#000" />
                    </TouchableOpacity>
                ),
            }}
        >
            <Stack.Screen name="step1-project-details" />
            <Stack.Screen name="step2-proposal-overview" />
            <Stack.Screen name="step3-pricing" />
            <Stack.Screen name="step4-experience" />
            <Stack.Screen name="step5-confirmation" />
        </Stack>
    );
}