// app/(client)/gigs/_layout.tsx
import ChatHeader from '@/components/header/detail-header';
import TabsFreelancerHeader from '@/components/header/tabs-header-freelancer';
import { Stack, useRouter } from 'expo-router';

export default function FreelancerDisputeLayout() {
  const router = useRouter();
  return (
    <Stack
      screenOptions={{
        headerShown: true,
        headerTransparent: true,
        header: ({ options }) => <TabsFreelancerHeader title={options.title ?? ''} />
      }}
    >
      <Stack.Screen name="index" options={{ title: "Dispute", headerShown: true }} />
      <Stack.Screen name="[id]" options={{ title: "Dispute Detail", headerShown: true, header: () => <ChatHeader title='Dispute Detail'/> }} />
      <Stack.Screen name="raise-dispute" options={{ title: "Raise Dispute", headerShown: true, header: () => <ChatHeader title='Raise Dispute'/> }} />
    </Stack>
  );
}