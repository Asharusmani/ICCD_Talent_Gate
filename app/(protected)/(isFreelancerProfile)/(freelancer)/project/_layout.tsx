import ChatHeader from '@/components/header/detail-header';
import TabsHeader from '@/components/header/tabs-header';
import TabsFreelancerHeader from '@/components/header/tabs-header-freelancer';
import { Stack, useRouter } from 'expo-router';

export default function ProjectLayout() {
  const router = useRouter();
  return (
    <Stack
      screenOptions={{
        headerShown: true,
        headerTransparent: true,
         header: ({ options }) => <TabsFreelancerHeader title={options.title ?? ''} />
      }}
    >
      <Stack.Screen name="index" options={{ title: "Posted Project" }} />
      <Stack.Screen name="[id]" options={{ title: "Project Detail", headerShown: true, header: () => <ChatHeader title='Project Detail'/> }} />
      <Stack.Screen name="(apply-project)" options={{ title: "Apply Project", headerShown: false, presentation: "pageSheet" }} />
    </Stack>
  );
}