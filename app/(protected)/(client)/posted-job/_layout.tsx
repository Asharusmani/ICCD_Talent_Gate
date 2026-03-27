import ChatHeader from '@/components/header/detail-header';
import TabsHeader from '@/components/header/tabs-header';
import { Stack, useRouter } from 'expo-router';

export default function PostedprojectLayout() {
  const router = useRouter();
  return (
    <Stack
      screenOptions={{
        headerShown: true,
        header: () => <TabsHeader title='Posted Job'/>
      }}
    >
      <Stack.Screen name="index" options={{ title: "Posted Jobs" }} />
      <Stack.Screen name="[id]" options={{ title: "Job Detail", headerShown: true, header: () => <ChatHeader title='Project Detail' /> }} />
    </Stack>
  );
}