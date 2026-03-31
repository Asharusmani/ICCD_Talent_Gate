import { Stack } from 'expo-router';
import { useRouter } from 'expo-router';
import TabsFreelancerHeader from '@/components/header/tabs-header-freelancer';

export default function PostedGigsLayout() {
    const router = useRouter();
    return (
        <Stack
            screenOptions={{
                headerShown: true,
                headerTransparent: true,
                header: ({ options }) => (
                    <TabsFreelancerHeader title={options.title ?? ''} />
                ),
            }}
        >
            <Stack.Screen name="index" options={{ title: "Posted Gigs" }} />
            <Stack.Screen name="add-gig" options={{ headerShown: false }} />
            <Stack.Screen name="[id]" options={{ headerShown: false }} />
        </Stack>
    );
}