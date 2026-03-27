import ChatHeader from '@/components/header/detail-header';
import { Stack, useRouter } from 'expo-router';

export default function AddGigsLayout() {
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
            <Stack.Screen name="gig-overview" options={{ title: "Gig Overview" }} />
            <Stack.Screen name="gig-description" options={{ title: "Gig Description" }} />
            <Stack.Screen name="gig-price" options={{ title: "Gig Price" }} />
            <Stack.Screen name="gig-gallery" options={{ title: "Gig Gallery" }} />
        </Stack>
    );
}