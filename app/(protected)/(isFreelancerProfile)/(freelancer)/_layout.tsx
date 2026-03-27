import CustomFreelancerDrawer from '@/components/ui/custom-freelancer-drawer';
import { useColorScheme } from '@/hooks/use-color-scheme';
import { Ionicons, MaterialIcons } from '@expo/vector-icons';
import { DarkTheme, DefaultTheme, ThemeProvider } from '@react-navigation/native';
import { useRouter } from 'expo-router';
import { Drawer } from 'expo-router/drawer';
import { TouchableOpacity } from 'react-native';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import 'react-native-reanimated';

export default function FreelancerLayout() {

  const router = useRouter()
  const colorScheme = useColorScheme();
  const isFreelancer = false

  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <ThemeProvider value={colorScheme === 'dark' ? DarkTheme : DefaultTheme}>
        <Drawer
          drawerContent={(props) => <CustomFreelancerDrawer {...props} />}
          screenOptions={{
            drawerStyle: {
              backgroundColor: colorScheme === 'dark' ? '#1a1a1a' : '#fff',
              width: 280,
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
            headerShown: false, // We'll handle headers in tabs
            drawerActiveTintColor: '#007AFF',
            drawerInactiveTintColor: colorScheme === 'dark' ? '#ccc' : '#666',
            drawerActiveBackgroundColor: colorScheme === 'dark' ? '#2A2A2A' : '#F0F0F0',
          }}
        >
          {/* TABS GROUP - Shows as single item in drawer */}
          <Drawer.Screen
            name="(tabs)"
            options={{
              title: 'Freelancer App',
              drawerLabel: 'Home',
              drawerIcon: ({ color, size }) => (
                <MaterialIcons name="home" size={size} color={color} />
              ),
            }}
          />

          <Drawer.Screen
            name="freelancer-dispute-list"
            options={{
              title: 'Dispute',
              headerShown: false,
            }}
          />

          <Drawer.Screen
            name="posted-gigs"
            options={{
              // header: ()=> <ChatHeader title="Posted Gigs"/>,
              headerShown: false,
              title: 'Posted Gigs',
              drawerLabel: 'Posted Gigs',
              drawerIcon: ({ color, size }) => (
                <MaterialIcons name="folder" size={size} color={color} />
              ),
            }}
          />

          <Drawer.Screen
            name="freelancer-order-detail/[id]"
            options={{
              headerShown: true,
              title: 'Order Details',
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
            name="job"
            options={{
              title: "Jobs",
              headerShown: false,
            }}
          />

          <Drawer.Screen
            name="project"
            options={{
              title: "Projects",
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
  );
}