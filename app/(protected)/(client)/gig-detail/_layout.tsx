// app/(client)/gigs/_layout.tsx
import ChatHeader from '@/components/header/detail-header';
import { Stack, useRouter } from 'expo-router';

export default function GigsLayout() {
  const router = useRouter();

  return (
    <Stack
      screenOptions={{
        headerShown: true,
        header: ({options}) => <ChatHeader title={options.title || 'No route match'} />
      }}
    >
      <Stack.Screen name="[id]" options={{ title: "Gig Detail" }} />
      <Stack.Screen name="order-detail" options={{ title: "Order Detail" }} />
    </Stack>
  );
}