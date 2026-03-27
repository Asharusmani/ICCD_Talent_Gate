import 'react-native-reanimated';
import { Stack } from 'expo-router';
import { router } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';
import { TouchableOpacity } from 'react-native';

export const unstable_settings = {
    anchor: '(tabs)',
};

export default function EditProfileLayout() {
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
            <Stack.Screen name="edit-personal-info-form" />
            <Stack.Screen name="edit-portfolio-form" />
            <Stack.Screen name="edit-professional-info-form" />
        </Stack>
    );
}