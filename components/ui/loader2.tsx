import React, { useState, useEffect, useRef } from 'react';
import { View, Text, StyleSheet, Image, Animated, Modal } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';

export default function ICCDLoader({ isLoading = true }) {

  const [isVisible, setIsVisible] = useState(isLoading);
  const fadeAnim = useRef(new Animated.Value(1)).current;
  const spinAnim = useRef(new Animated.Value(0)).current;
  const pulseAnim = useRef(new Animated.Value(1)).current;

  useEffect(() => {
    // Spin animation
    const spinAnimation = Animated.loop(
      Animated.timing(spinAnim, {
        toValue: 1,
        duration: 2000,
        useNativeDriver: true,
      })
    );

    // Pulse animation
    const pulseAnimation = Animated.loop(
      Animated.sequence([
        Animated.timing(pulseAnim, {
          toValue: 1.05,
          duration: 500,
          useNativeDriver: true,
        }),
        Animated.timing(pulseAnim, {
          toValue: 1,
          duration: 500,
          useNativeDriver: true,
        }),
      ])
    );

    spinAnimation.start();
    pulseAnimation.start();

    return () => {
      spinAnimation.stop();
      pulseAnimation.stop();
    };
  }, []);

  useEffect(() => {
    if (!isLoading) {
      Animated.timing(fadeAnim, {
        toValue: 0,
        duration: 500,
        useNativeDriver: true,
      }).start(() => {
        setIsVisible(false);
      });
    } else {
      setIsVisible(true);
      fadeAnim.setValue(1);
    }
  }, [isLoading]);

  if (!isVisible) return null;

  const spin = spinAnim.interpolate({
    inputRange: [0, 1],
    outputRange: ['0deg', '360deg'],
  });

  return (
    <Modal transparent visible={isVisible} animationType="none">
      <Animated.View style={[styles.container, { opacity: fadeAnim }]}>
        <LinearGradient
          colors={['#4AADB6', '#FFFFFF', '#F8F9FA']}
          start={{ x: 0, y: 1 }}
          end={{ x: 0, y: 0 }}
          style={styles.gradient}
        >
          <View style={styles.content}>
            {/* Logo with spinning ring and pulse */}
            <View style={styles.logoContainer}>
              {/* Spinning ring */}
              <Animated.View
                style={[
                  styles.spinningRing,
                  {
                    transform: [{ rotate: spin }],
                  },
                ]}
              />

              {/* Logo with pulse */}
              <Animated.View
                style={[
                  styles.logoWrapper,
                  {
                    transform: [{ scale: pulseAnim }],
                    opacity: pulseAnim.interpolate({
                      inputRange: [1, 1.05],
                      outputRange: [1, 0.7],
                    }),
                  },
                ]}
              >
                <Image
                  source={require('@/assets/images/ICCD-01.png')}
                  style={styles.logo}
                  resizeMode="contain"
                />
              </Animated.View>
            </View>

            {/* Text content */}
            <View style={styles.textContainer}>
              <Text style={styles.title}>ICCD</Text>
              <Text style={styles.subtitle}>
                Islamic Chamber of{'\n'}Commerce & Development
              </Text>
            </View>
          </View>
        </LinearGradient>
      </Animated.View>
    </Modal>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  gradient: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  content: {
    alignItems: 'center',
  },
  logoContainer: {
    width: 160,
    height: 160,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 16,
  },
  spinningRing: {
    position: 'absolute',
    width: 160,
    height: 160,
    borderRadius: 80,
    borderWidth: 12,
    borderTopColor: '#4AADB6',
    borderRightColor: 'transparent',
    borderBottomColor: 'transparent',
    borderLeftColor: 'transparent',
  },
  logoWrapper: {
    width: 120,
    height: 120,
    justifyContent: 'center',
    alignItems: 'center',
  },
  logo: {
    width: 120,
    height: 120,
  },
  textContainer: {
    alignItems: 'center',
  },
  title: {
    fontSize: 24,
    fontWeight: '600',
    color: '#1F2937',
    marginBottom: 8,
  },
  subtitle: {
    fontSize: 16,
    color: '#4B5563',
    textAlign: 'center',
    lineHeight: 24,
  },
});