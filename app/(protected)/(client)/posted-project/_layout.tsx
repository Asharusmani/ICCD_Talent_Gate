import ChatHeader from '@/components/header/detail-header';
import TabsHeader from '@/components/header/tabs-header';
import { Stack, useRouter } from 'expo-router';

export default function PostedProjectLayout() {
  const router = useRouter();
  return (
    <Stack
      screenOptions={{
        headerShown: true,
        headerTransparent: true,        // ← yeh add karo
        header: () => <TabsHeader title='Posted Project' />
      }}
    >
      <Stack.Screen
        name="index"
        options={{ title: "Posted Project" }}
      />
      <Stack.Screen
        name="[id]"
        options={{
          title: "Project Detail",
          headerShown: true,
          headerTransparent: true,      // ← yeh bhi
          header: () => <ChatHeader title='Project Detail' />
        }}
      />
    </Stack>
  );
}