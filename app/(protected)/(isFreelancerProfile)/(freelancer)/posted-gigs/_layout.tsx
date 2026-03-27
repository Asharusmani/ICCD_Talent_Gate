import { Stack } from 'expo-router';
import { useRouter } from 'expo-router';
import { TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import TabsHeader from '@/components/header/tabs-header';

export default function PostedGigsLayout() {
    const router = useRouter();
    return (
        <Stack
            screenOptions={{
                headerShown: true,
                header: () => <TabsHeader />
            }}
        >
            <Stack.Screen name="index" options={{ title: "Posted Gigs", headerShown: true }} />
            <Stack.Screen name="add-gig" options={{ title: "Add Gigs", headerShown: false }} />
            <Stack.Screen name="[id]" options={{ title: "Edit Gigs", headerShown: false }} />
        </Stack>
    );
}