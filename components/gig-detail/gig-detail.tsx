import React, { useState } from 'react';
import {
  View,
  Text,
  ScrollView,
  Image,
  TouchableOpacity,
  StyleSheet,
  StatusBar,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context'

const FreelancerGigScreen = () => {
     type PackageKey = "Basic" | "Standard" | "Premium";

const [selectedPackage, setSelectedPackage] = useState<PackageKey>("Basic");

  const packages = {
    Basic: {
      price: 644,
      title: 'Violet Garza',
      description: 'Amet ut nostrud ea',
      features: [
        { name: '1 Concepts', included: true },
        { name: '1 day delivery', included: true },
        { name: '1 Revisions', included: true },
        { name: 'Instagram promotion', included: true },
        { name: 'Facebook ads', included: false },
        { name: 'Youtube channel marketing', included: true },
      ],
    },
    Standard: {
      price: 899,
      title: 'Standard Package',
      description: 'Perfect for growing businesses',
      features: [
        { name: '3 Concepts', included: true },
        { name: '2 day delivery', included: true },
        { name: '3 Revisions', included: true },
        { name: 'Instagram promotion', included: true },
        { name: 'Facebook ads', included: true },
        { name: 'Youtube channel marketing', included: true },
      ],
    },
    Premium: {
      price: 1299,
      title: 'Premium Package',
      description: 'Complete branding solution',
      features: [
        { name: '5 Concepts', included: true },
        { name: 'Same day delivery', included: true },
        { name: 'Unlimited Revisions', included: true },
        { name: 'Instagram promotion', included: true },
        { name: 'Facebook ads', included: true },
        { name: 'Youtube channel marketing', included: true },
      ],
    },
  };

  return (
    <SafeAreaView style={styles.container}>
      
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity style={styles.backButton}>
          <Text style={styles.backIcon}>←</Text>
        </TouchableOpacity>
      </View>

      <ScrollView style={styles.scrollView} showsVerticalScrollIndicator={false}>
        {/* Profile Section */}
        <View style={styles.profileSection}>
          <Image
            source={{ uri: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=100&h=100&fit=crop' }}
            style={styles.profileImage}
          />
          <Text style={styles.profileName}>Grace Moody</Text>
        </View>

        {/* Gig Title */}
        <Text style={styles.gigTitle}>Clean & Minimalist Logo Design</Text>

        {/* Gig Image */}
        <View style={styles.gigImageContainer}>
          <View style={styles.gigImage}>
            <View style={styles.brandTag}>
              <Text style={styles.brandText}>KINSTER</Text>
            </View>
            <Text style={styles.gigImageTitle}>Turn{'\n'}Ideas into{'\n'}Stunning{'\n'}Websites</Text>
            <View style={styles.mockupContainer}>
              <View style={styles.mockup} />
              <View style={styles.mockup} />
              <View style={styles.mockup} />
            </View>
          </View>
          <TouchableOpacity style={styles.nextButton}>
            <Text style={styles.nextIcon}>›</Text>
          </TouchableOpacity>
        </View>

        {/* About Section */}
        <View style={styles.aboutSection}>
          <Text style={styles.sectionTitle}>About This Gig</Text>
          <Text style={styles.aboutTitle}>Clean & Minimalist Logo Design</Text>
          <Text style={styles.aboutDescription}>
            I design unique, professional, and eye-catching logos tailored to your brands identity. Whether you need a minimalist, vintage, 3D, mascot, or signature style, I deliver high-quality designs that make your business stand out.
          </Text>
        </View>

        {/* Get To Know Section */}
        <View style={styles.knowSection}>
          <Text style={styles.sectionTitle}>Get To Know Grace Moody</Text>
          <View style={styles.knowCard}>
            <Image
              source={{ uri: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=200&h=200&fit=crop' }}
              style={styles.knowImage}
            />
            <Text style={styles.knowName}>Grace Moody</Text>
            <Text style={styles.knowDescription}>
              Deserunt quisquam maDeserunt quisquam maDeserunt quisquam maDeserunt quisquam maDeserunt quisquam maDeserunt quisquam ma
            </Text>
          </View>
        </View>

        {/* Package Tabs */}
        <View style={styles.packageTabs}>
          {Object.keys(packages).map((pkg) => (
            <TouchableOpacity
              key={pkg}
              style={[
                styles.packageTab,
                selectedPackage === pkg && styles.packageTabActive,
              ]}
              onPress={() => setSelectedPackage(pkg)}
            >
              <Text
                style={[
                  styles.packageTabText,
                  selectedPackage === pkg && styles.packageTabTextActive,
                ]}
              >
                {pkg}
              </Text>
            </TouchableOpacity>
          ))}
        </View>

        {/* Package Details */}
        <View style={styles.packageDetails}>
          <Text style={styles.packageTitle}>{selectedPackage}</Text>
          <Text style={styles.packagePrice}>$ {packages[selectedPackage].price}</Text>
          <Text style={styles.packageSubtitle}>{packages[selectedPackage].title}</Text>
          <Text style={styles.packageDescription}>{packages[selectedPackage].description}</Text>

          {/* Features */}
          <View style={styles.features}>
            {packages[selectedPackage].features.map((feature, index) => (
              <View key={index} style={styles.featureRow}>
                <View
                  style={[
                    styles.checkbox,
                    feature.included && styles.checkboxActive,
                  ]}
                >
                  {feature.included && <Text style={styles.checkmark}>✓</Text>}
                </View>
                <Text
                  style={[
                    styles.featureText,
                    !feature.included && styles.featureTextDisabled,
                  ]}
                >
                  {feature.name}
                </Text>
              </View>
            ))}
          </View>

          {/* Action Buttons */}
          <TouchableOpacity style={styles.continueButton}>
            <Text style={styles.continueButtonText}>Continue</Text>
          </TouchableOpacity>

          <TouchableOpacity style={styles.contactButton}>
            <Text style={styles.contactButtonText}>Contact me</Text>
          </TouchableOpacity>
        </View>

        <View style={{ height: 100 }} />
      </ScrollView>

     
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingVertical: 15,
  },
  backButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: '#B8D4D4',
    alignItems: 'center',
    justifyContent: 'center',
  },
  backIcon: {
    fontSize: 20,
    color: '#fff',
  },
  scrollView: {
    flex: 1,
  },
  profileSection: {
    alignItems: 'center',
    paddingVertical: 20,
  },
  profileImage: {
    width: 60,
    height: 60,
    borderRadius: 30,
    marginBottom: 10,
  },
  profileName: {
    fontSize: 20,
    fontWeight: '600',
    color: '#000',
  },
  gigTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#1a5f7a',
    textAlign: 'center',
    paddingHorizontal: 20,
    marginBottom: 20,
  },
  gigImageContainer: {
    marginHorizontal: 20,
    marginBottom: 20,
    position: 'relative',
  },
  gigImage: {
    backgroundColor: '#3d5a80',
    borderRadius: 15,
    padding: 30,
    minHeight: 250,
  },
  brandTag: {
    position: 'absolute',
    top: 15,
    left: 15,
  },
  brandText: {
    color: '#fff',
    fontSize: 12,
    fontWeight: '600',
    letterSpacing: 2,
  },
  gigImageTitle: {
    color: '#fff',
    fontSize: 28,
    fontWeight: '700',
    marginTop: 40,
    lineHeight: 36,
  },
  mockupContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    gap: 10,
    marginTop: 30,
  },
  mockup: {
    width: 60,
    height: 80,
    backgroundColor: 'rgba(255,255,255,0.2)',
    borderRadius: 8,
  },
  nextButton: {
    position: 'absolute',
    right: 10,
    top: '45%',
    width: 30,
    height: 30,
    borderRadius: 15,
    backgroundColor: 'rgba(255,255,255,0.3)',
    alignItems: 'center',
    justifyContent: 'center',
  },
  nextIcon: {
    color: '#fff',
    fontSize: 20,
    fontWeight: '600',
  },
  aboutSection: {
    paddingHorizontal: 20,
    marginBottom: 20,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: '700',
    color: '#000',
    marginBottom: 10,
  },
  aboutTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#000',
    marginBottom: 8,
  },
  aboutDescription: {
    fontSize: 14,
    color: '#999',
    lineHeight: 20,
  },
  knowSection: {
    paddingHorizontal: 20,
    marginBottom: 20,
  },
  knowCard: {
    alignItems: 'flex-start',
  },
  knowImage: {
    width: 80,
    height: 80,
    borderRadius: 12,
    marginBottom: 10,
  },
  knowName: {
    fontSize: 16,
    fontWeight: '600',
    color: '#000',
    marginBottom: 5,
  },
  knowDescription: {
    fontSize: 14,
    color: '#999',
    lineHeight: 20,
  },
  packageTabs: {
    flexDirection: 'row',
    paddingHorizontal: 20,
    marginBottom: 20,
    gap: 15,
  },
  packageTab: {
    paddingVertical: 10,
    paddingHorizontal: 20,
  },
  packageTabActive: {
    borderBottomWidth: 2,
    borderBottomColor: '#5BA5A5',
  },
  packageTabText: {
    fontSize: 15,
    color: '#999',
    fontWeight: '500',
  },
  packageTabTextActive: {
    color: '#5BA5A5',
    fontWeight: '600',
  },
  packageDetails: {
    paddingHorizontal: 20,
  },
  packageTitle: {
    fontSize: 20,
    fontWeight: '700',
    color: '#000',
    marginBottom: 5,
  },
  packagePrice: {
    fontSize: 24,
    fontWeight: '700',
    color: '#000',
    marginBottom: 10,
  },
  packageSubtitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#000',
    marginBottom: 5,
  },
  packageDescription: {
    fontSize: 14,
    color: '#999',
    marginBottom: 20,
  },
  features: {
    marginBottom: 20,
  },
  featureRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 12,
  },
  checkbox: {
    width: 20,
    height: 20,
    borderRadius: 4,
    borderWidth: 2,
    borderColor: '#ddd',
    marginRight: 10,
    alignItems: 'center',
    justifyContent: 'center',
  },
  checkboxActive: {
    backgroundColor: '#5BA5A5',
    borderColor: '#5BA5A5',
  },
  checkmark: {
    color: '#fff',
    fontSize: 12,
    fontWeight: '700',
  },
  featureText: {
    fontSize: 14,
    color: '#000',
  },
  featureTextDisabled: {
    color: '#ccc',
  },
  continueButton: {
    backgroundColor: '#5BA5A5',
    paddingVertical: 16,
    borderRadius: 8,
    alignItems: 'center',
    marginBottom: 10,
  },
  continueButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '600',
  },
  contactButton: {
    backgroundColor: '#fff',
    paddingVertical: 16,
    borderRadius: 8,
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#5BA5A5',
  },
  contactButtonText: {
    color: '#5BA5A5',
    fontSize: 16,
    fontWeight: '600',
  },
  bottomNav: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    paddingVertical: 15,
    backgroundColor: '#fff',
    borderTopWidth: 1,
    borderTopColor: '#f0f0f0',
  },
  navItem: {
    alignItems: 'center',
  },
  navIcon: {
    fontSize: 24,
  },
});

export default FreelancerGigScreen;