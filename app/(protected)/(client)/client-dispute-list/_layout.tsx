// app/(client)/gigs/_layout.tsx
import ChatHeader from '@/components/header/detail-header';
import TabsHeader from '@/components/header/tabs-header';
import { Stack, useRouter } from 'expo-router';

export default function ClientDisputeLayout() {
  const router = useRouter();
  return (
    <Stack
      screenOptions={{
        headerShown: true,
       header: () => <TabsHeader title='Disputes'/>
      }}
    >
      <Stack.Screen name="index" options={{ title: "Dispute" }} />
      <Stack.Screen name="[id]" options={{ title: "Dispute Detail", headerShown: true, header: () => <ChatHeader title='Dispute Detail' /> }} />
      <Stack.Screen name="raise-dispute" options={{ title: "Raise Dispute", headerShown: true, header: () => <ChatHeader title='Raise Dispute' /> }} />
    </Stack>
  );
}