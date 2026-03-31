import ChatHeader from '@/components/header/detail-header';
import CustomClientDrawer from '@/components/ui/custom-client-drawer';
import { useColorScheme } from '@/hooks/use-color-scheme';
import { SocketProvider } from "@/utils/socket-context";
import { Ionicons, MaterialIcons } from '@expo/vector-icons';
import { DarkTheme, DefaultTheme, ThemeProvider } from '@react-navigation/native';
import { router } from 'expo-router';
import { Drawer } from 'expo-router/drawer';
import { TouchableOpacity } from 'react-native';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import 'react-native-reanimated';

export default function ClientLayout() {

  const colorScheme = useColorScheme();

  return (
    <SocketProvider>
      <GestureHandlerRootView style={{ flex: 1 }}>
        <ThemeProvider value={colorScheme === 'dark' ? DarkTheme : DefaultTheme}>
          <Drawer
            drawerContent={(props) => <CustomClientDrawer {...props} />}
            screenOptions={{
              // drawerPosition: 'right',
              drawerStyle: {
                backgroundColor: colorScheme === 'dark' ? '#1a1a1a' : '#fff',
                // width: 280,
              },
              drawerLabelStyle: {
                fontSize: 15,
                fontWeight: '600',
                lineHeight: 15
              },
              drawerItemStyle: {
                borderRadius: 25,
                marginHorizontal: 8,
                marginVertical: 4,
              },
              headerShown: false,
              // drawerActiveTintColor: '#007AFF',
              // drawerInactiveTintColor: colorScheme === 'dark' ? '#ccc' : '#666',
              // drawerActiveBackgroundColor: colorScheme === 'dark' ? '#2A2A2A' : '#F0F0F0',
              // drawerIcon: () => <MaterialIcons name="home" size={size} color={color} />
            }}
          >
            {/* TABS GROUP - Shows as single item in drawer */}
            <Drawer.Screen
              name="(tabs)"
              options={{
                drawerLabel: 'Home',
                title: 'Client App',
                headerShown: false,
                drawerIcon: ({ color, size }) => (
                  <MaterialIcons name="home" size={size} color={color} />
                ),
              }}
            />

            {/* DRAWER ITEMS (not in tabs) */}
            <Drawer.Screen
              name="client-dispute-list"
              options={{
                headerShown: false,
                drawerIcon: ({ color, size }) => (
                  <MaterialIcons name="gavel" size={size} color={color} />
                ),
              }}
            />

            <Drawer.Screen
              name="create-job/index"
              options={{
                title: 'Projects',
                headerShown: true,
                header: () => <ChatHeader title="Job Form" />
              }}
            />

            <Drawer.Screen
              name="create-project/index"
              options={{
                title: 'Projects',
                headerShown: true,
                header: () => <ChatHeader title="Create Project" />
              }}
            />

            <Drawer.Screen
              name="gig-detail"
              options={{
                title: "Gig Detail",
                headerShown: false,
                drawerItemStyle: { display: 'none' },
              }}
            />

            <Drawer.Screen
              name="client-order-detail/[id]"
              options={{
                title: 'Order Details',
                headerShown: true,
                headerLeft: () => (
                  <TouchableOpacity
                    onPress={() => router.push('/order')}
                    style={{ marginLeft: 12 }}
                  >
                    <Ionicons name="arrow-back" size={24} color="#000" />
                  </TouchableOpacity>
                ),
              }}
            />

            <Drawer.Screen
              name="posted-job"
              options={{
                drawerLabel: 'Posted Jobs',
                headerShown: false,
                drawerIcon: ({ color, size }) => (
                  <MaterialIcons name="work" size={size} color={color} />
                ),
              }}
            />
            <Drawer.Screen
              name="posted-project"
              options={{
                title: 'Projects',
                headerShown: false,
              }}
            />

            {/* Modal */}
            <Drawer.Screen
              name="modal"
              options={{
                drawerItemStyle: { display: 'none' },
              }}
            />
          </Drawer>
        </ThemeProvider>
      </GestureHandlerRootView>
    </SocketProvider>
  );
}