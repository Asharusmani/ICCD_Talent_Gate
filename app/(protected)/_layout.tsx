import 'react-native-reanimated';
import { Stack } from 'expo-router';
import { useAuth } from '@/utils/auth-context';
import { useColorScheme } from '@/hooks/use-color-scheme';

export const unstable_settings = {
    anchor: '(tabs)',
};

export default function ProtectedLayout() {

    const colorScheme = useColorScheme();
    const { isAuthenticated } = useAuth();

    return (
        <Stack>
            <Stack.Protected guard={isAuthenticated}>
                <Stack.Screen name="(client)" options={{ headerShown: false }} />
                <Stack.Screen name="(isFreelancerProfile)" options={{ headerShown: false }} />
            </Stack.Protected>
            <Stack.Screen name="login" options={{ headerShown: false }} />
            <Stack.Screen name="sign-up" options={{ headerShown: false }} />
        </Stack>
    );
}