import ChatHeader from '@/components/header/detail-header';
import { Stack, useRouter } from 'expo-router';

export default function EditGigLayout() {
    const router = useRouter();
    return (
        <Stack
            screenOptions={{
                headerShown: true,
                header: ({ options }) => (
                    <ChatHeader title={options.title || 'No route match'} />
                )
            }}
        >
            <Stack.Screen name="edit-gig-overview" options={{ title: "Edit Gig Overview" }} />
            <Stack.Screen name="edit-gig-description" options={{ title: "Edit Gig Description" }} />
            <Stack.Screen name="edit-gig-price" options={{ title: "Edit Gig Price" }} />
            <Stack.Screen name="edit-gig-gallery" options={{ title: "Edit Gig Gallery" }} />
        </Stack>
    );
}