import ChatHeader from '@/components/header/detail-header';
import { Stack } from 'expo-router';

export default function Layout() {
  return (
    <>
      <Stack>
        <Stack.Screen
          name="index"
          options={{
            header: () => <ChatHeader title="Notification"/>,
            headerShown: true,
          }}
        />
      </Stack>
    </>
  );
}
