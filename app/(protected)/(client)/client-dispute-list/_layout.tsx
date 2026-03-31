import ChatHeader from '@/components/header/detail-header';
import TabsHeader from '@/components/header/tabs-header';
import { Stack } from 'expo-router';

export default function ClientDisputeLayout() {
  return (
    <Stack
      screenOptions={{
        headerShown: true,
        headerTransparent: true,
        headerStyle: { backgroundColor: 'transparent' },
        header: () => <TabsHeader title='Disputes' />,
      }}
    >
      <Stack.Screen name="index" options={{ title: "Dispute" }} />
      <Stack.Screen
        name="[id]"
        options={{
          title: "Dispute Detail",
          headerShown: true,
          headerTransparent: true,
          header: () => <ChatHeader title='Dispute Detail' />,
        }}
      />
      <Stack.Screen
        name="raise-dispute"
        options={{
          title: "Raise Dispute",
          headerShown: true,
          headerTransparent: true,
          header: () => <ChatHeader title='Raise Dispute' />,
        }}
      />
    </Stack>
  );
}