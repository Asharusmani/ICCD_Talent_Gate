import React from "react";
import { View, StyleSheet } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import TestStripeCheckout from '../../../../components/payment/TestStripeCheckout';
import EditProfileScreen from "@/components/profile/edit-profile-form";
import EditProfile from "@/app/(protected)/(client)/edit-Profiles/edit-Profiles";


function Testing() {
  // const [isLoading, setIsLoading] = useState(true);

  // Comment out or remove the useEffect
  // useEffect(() => {
  //   setTimeout(() => {
  //     setIsLoading(false);
  //   }, 3000);
  // }, []);

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <View style={styles.container}>
        <View style={{ flex: 1 }}>
          {/* Uncomment the component you want to test */}
          {/* <AddGigScreen/> */}
          {/* <DescriptionScreen /> */}
          {/* <GalleryScreen/> */}
          {/* <PricingScreen /> */}
          {/* <TestStripeCheckout /> */}
          {/* <EditProfileScreen/> */}
                  {/* <NotFoundScreen/> */}
                  <EditProfile/>

        </View>

        {/* <ICCDLoader /> */}
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f0f0f0",
  },
  text: {
    fontSize: 24,
    fontWeight: "bold",
    textAlign: "center",
    marginTop: 20,
  },
});

export default Testing;