import ChatHeader from '@/components/header/detail-header';
import TabsHeader from '@/components/header/tabs-header';
import { Stack } from 'expo-router';

export default function PostedJobLayout() {
    return (
        <Stack
            screenOptions={{
                headerShown: true,
                header: () => <TabsHeader title='Posted Jobs' />,
            }}
        >
            <Stack.Screen name="index" options={{ title: "Posted Jobs" }} />
            <Stack.Screen
                name="[id]"
                options={{
                    title: "Job Detail",
                    headerShown: true,
                    header: () => <ChatHeader title='Job Detail' />,
                }}
            />
        </Stack>
    );
}