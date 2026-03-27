import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  
  Animated,
  Dimensions,
} from 'react-native';


export default function NotFoundScreen() {
  const [glitchText, setGlitchText] = useState('404');
  const bounceAnim = new Animated.Value(0);
  const fadeAnim = new Animated.Value(0);
  const scaleAnim1 = new Animated.Value(1);
  const scaleAnim2 = new Animated.Value(1);

  useEffect(() => {
    // Glitch effect
    const glitchInterval = setInterval(() => {
      const glitchChars = ['4', '0', '@', '#', '$', '%'];
      const randomGlitch = Array(3)
        .fill(0)
        .map(() => glitchChars[Math.floor(Math.random() * glitchChars.length)])
        .join('');
      setGlitchText(randomGlitch);

      setTimeout(() => setGlitchText('404'), 100);
    }, 3000);

    // Fade in animation
    Animated.timing(fadeAnim, {
      toValue: 1,
      duration: 1000,
      useNativeDriver: true,
    }).start();

    // Bounce animation
    Animated.loop(
      Animated.sequence([
        Animated.timing(bounceAnim, {
          toValue: -20,
          duration: 1000,
          useNativeDriver: true,
        }),
        Animated.timing(bounceAnim, {
          toValue: 0,
          duration: 1000,
          useNativeDriver: true,
        }),
      ])
    ).start();

    // Blob animations
    Animated.loop(
      Animated.sequence([
        Animated.timing(scaleAnim1, {
          toValue: 1.2,
          duration: 3000,
          useNativeDriver: true,
        }),
        Animated.timing(scaleAnim1, {
          toValue: 1,
          duration: 3000,
          useNativeDriver: true,
        }),
      ])
    ).start();

    Animated.loop(
      Animated.sequence([
        Animated.timing(scaleAnim2, {
          toValue: 1.3,
          duration: 4000,
          useNativeDriver: true,
        }),
        Animated.timing(scaleAnim2, {
          toValue: 1,
          duration: 4000,
          useNativeDriver: true,
        }),
      ])
    ).start();

    return () => clearInterval(glitchInterval);
  }, []);



  return (
    <View style={styles.container}>
      <Animated.View
        style={[
          styles.blob,
          styles.blob1,
          { transform: [{ scale: scaleAnim1 }] },
        ]}
      />
      <Animated.View
        style={[
          styles.blob,
          styles.blob2,
          { transform: [{ scale: scaleAnim2 }] },
        ]}
      />

      <Animated.View style={[styles.content, { opacity: fadeAnim }]}>
        {/* 404 Text with glitch */}
        <View style={styles.glitchContainer}>
          <Text style={styles.glitchText404}>{glitchText}</Text>
          <Text style={styles.glitchTextShadow}>{glitchText}</Text>
        </View>

        {/* Main message */}
        <View style={styles.messageContainer}>
          <Text style={styles.heading}>Oops! Page Not Found</Text>
          <Text style={styles.subheading}>
            The page you're looking for doesn't exist or has been moved.
          </Text>
        </View>

        {/* Animated logo/icon placeholder */}
        <Animated.View
          style={[
            styles.iconContainer,
            { transform: [{ translateY: bounceAnim }] },
          ]}
        >
          <View style={styles.logoCircle}>
            <Text style={styles.logoText}>404</Text>
          </View>
        </Animated.View>


 

        {/* Error code */}
        <Text style={styles.errorCode}>Error Code: 404 | Page Not Found</Text>
      </Animated.View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#0f172a',
    position: 'relative',
  },
  blob: {
    position: 'absolute',
    width: 300,
    height: 300,
    borderRadius: 150,
    opacity: 0.15,
  },
  blob1: {
    backgroundColor: '#2d747e',
    top: -100,
    left: -50,
  },
  blob2: {
    backgroundColor: '#38bdf8',
    bottom: -100,
    right: -50,
  },
  content: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 24,
    zIndex: 10,
  },
  glitchContainer: {
    position: 'relative',
    marginBottom: 32,
  },
  glitchText404: {
    fontSize: 120,
    fontWeight: '900',
    color: '#ffffff',
    letterSpacing: 8,
  },
  glitchTextShadow: {
    position: 'absolute',
    fontSize: 120,
    fontWeight: '900',
    color: '#2d747e',
    letterSpacing: 8,
    opacity: 0.5,
    top: 4,
    left: 4,
  },
  messageContainer: {
    alignItems: 'center',
    marginBottom: 32,
  },
  heading: {
    fontSize: 32,
    fontWeight: 'bold',
    color: '#ffffff',
    marginBottom: 12,
    textAlign: 'center',
  },
  subheading: {
    fontSize: 16,
    color: '#cbd5e1',
    textAlign: 'center',
    lineHeight: 24,
    maxWidth: 320,
  },
  iconContainer: {
    marginVertical: 32,
  },
  logoCircle: {
    width: 100,
    height: 100,
    borderRadius: 50,
    backgroundColor: '#2d747e',
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: '#2d747e',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.5,
    shadowRadius: 16,
    elevation: 8,
  },
  logoText: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#ffffff',
  },
  buttonContainer: {
    width: '100%',
    maxWidth: 400,
    gap: 16,
    marginBottom: 32,
  },
  primaryButton: {
    backgroundColor: '#2d747e',
    paddingVertical: 16,
    paddingHorizontal: 32,
    borderRadius: 50,
    alignItems: 'center',
    shadowColor: '#2d747e',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 4,
  },
  primaryButtonText: {
    color: '#ffffff',
    fontSize: 18,
    fontWeight: '600',
  },
  secondaryButton: {
    backgroundColor: '#ffffff',
    paddingVertical: 16,
    paddingHorizontal: 32,
    borderRadius: 50,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 4,
  },
  secondaryButtonText: {
    color: '#0f172a',
    fontSize: 18,
    fontWeight: '600',
  },
  searchContainer: {
    width: '100%',
    maxWidth: 400,
    marginBottom: 32,
  },
  searchLabel: {
    color: '#94a3b8',
    fontSize: 14,
    marginBottom: 12,
    textAlign: 'center',
  },
  searchInput: {
    backgroundColor: 'rgba(255, 255, 255, 0.1)',
    borderWidth: 2,
    borderColor: 'rgba(45, 116, 126, 0.3)',
    borderRadius: 50,
    paddingVertical: 14,
    paddingHorizontal: 20,
    color: '#ffffff',
    fontSize: 16,
  },
  errorCode: {
    color: '#64748b',
    fontSize: 12,
    marginTop: 16,
  },
});