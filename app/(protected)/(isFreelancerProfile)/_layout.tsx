import 'react-native-reanimated';
import { Stack } from 'expo-router';
import { router } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';
import { useAuth } from '@/utils/auth-context';
import { TouchableOpacity } from 'react-native';
import { useColorScheme } from '@/hooks/use-color-scheme';

export const unstable_settings = {
    anchor: '(tabs)',
};

export default function IsFreelancerProfileLayout() {

    const colorScheme = useColorScheme();
    const { freelancer } = useAuth()
    const isFreelancerProfile = freelancer ? true : false;

    return (
        <Stack
            screenOptions={{
                headerLeft: () => (
                    <TouchableOpacity onPress={() => router.back()}>
                        <Ionicons name="arrow-back" size={24} color="#000" />
                    </TouchableOpacity>
                ),
            }}
        >
            <Stack.Protected guard={isFreelancerProfile}>
                <Stack.Screen name="(freelancer)" options={{ headerShown: false }} />
            </Stack.Protected>
            <Stack.Screen name="personal-info-form" />
            <Stack.Screen name="portfolio-form" />
            <Stack.Screen name="professional-info-form" />
        </Stack>
    );
}