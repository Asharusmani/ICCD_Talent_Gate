import { router } from "expo-router";
import { ChevronLeft } from "lucide-react-native";
import { StyleSheet, TouchableOpacity, View, Text } from "react-native";
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { LinearGradient } from 'expo-linear-gradient';

const ACCENT = '#0d9488';
const TEXT_PRIMARY = '#0f172a';

export default function ChatHeader({ title = '' }) {
  const insets = useSafeAreaInsets();

  return (
    <LinearGradient
      colors={['#f0f9ff', '#e0f2fe']}
      start={{ x: 0, y: 0 }}
      end={{ x: 0.6, y: 1 }}
    >
      <View style={[styles.container, { paddingTop: insets.top + 8 }]}>

        {/* Back Button */}
        <TouchableOpacity
          style={styles.backBtn}
          onPress={() => router.back()}
          activeOpacity={0.8}
        >
          <ChevronLeft size={22} color={ACCENT} />
        </TouchableOpacity>

        {/* Title — centered absolutely so it never overlaps button */}
        {title ? (
          <View style={styles.titleWrapper}>
            <Text style={styles.title} numberOfLines={1}>{title}</Text>
          </View>
        ) : null}

        {/* Right spacer — same width as back button to keep title centered */}
        <View style={styles.spacer} />

      </View>
    </LinearGradient>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 16,
    paddingBottom: 14,
  },
  backBtn: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: 'rgba(255, 255, 255, 0.75)',
    borderWidth: 1,
    borderColor: 'rgba(14,165,233,0.25)',
    alignItems: 'center',
    justifyContent: 'center',
    flexShrink: 0,
  },
  titleWrapper: {
    flex: 1,
    alignItems: 'center',
    paddingHorizontal: 8,
  },
  title: {
    fontSize: 18,
    fontWeight: '700',
    color: TEXT_PRIMARY,
    letterSpacing: -0.3,
  },
  spacer: {
    width: 40,   // same as backBtn width — keeps title perfectly centered
    flexShrink: 0,
  },
});