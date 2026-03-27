// app/(client)/gigs/_layout.tsx
import ChatHeader from '@/components/header/detail-header';
import TabsHeader from '@/components/header/tabs-header';
import { Stack, useRouter } from 'expo-router';

export default function JobLayout() {
  const router = useRouter();
  return (
    <Stack
      screenOptions={{
        headerShown: true,
        header: () => <TabsHeader />
      }}
    >
      <Stack.Screen name="index" options={{ title: "Jobs" }} />
      <Stack.Screen name="[id]" options={{ title: "Job Detail", headerShown: true ,header: () => <ChatHeader title='Job Detail'/> }} />
      <Stack.Screen name="apply-job"  options={{ title: "Apply Job", presentation: "pageSheet", headerShown: true ,header: () => <ChatHeader title='Apply Job'/> }} />

    </Stack>
  );
}