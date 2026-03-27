import ChatHeader from '@/components/header/detail-header';
import { Stack } from 'expo-router';

export default function Layout() {
  return (
    <>
      <Stack>
        <Stack.Screen
          name="index"
          options={{
            header: () => <ChatHeader title="Message" />,
            headerShown: true,
          }}
        />
        <Stack.Screen
          name="[id]"
          options={({ route }) => ({
            headerShown: true,
            header: () => (
              <ChatHeader
                title={route.params.name || "User"}
              />
            ),
          })}
        />
      </Stack>
    </>
  );
}
