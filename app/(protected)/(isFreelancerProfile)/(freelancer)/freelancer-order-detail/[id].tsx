import { useSingleOrderByClient } from "@/api/client/order";
import OrderCategory from '@/components/order-detail/order-category';
import OrderDescription from '@/components/order-detail/order-description';
import OrderDetailHeader from '@/components/order-detail/order-etail-header';
import OrderSummaryCards from '@/components/order-detail/order-summary-cards';
import PackageDetails from '@/components/order-detail/package-details';
import ProductSlider from '@/components/order-detail/product-slider';
import { useLocalSearchParams } from 'expo-router';
import { ScrollView, StyleSheet, Text, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { LinearGradient } from 'expo-linear-gradient';
import ICCDLoader from '@/components/ui/loader2';

export default function OrderDetailsScreen() {

    const { id } = useLocalSearchParams()
    const insets = useSafeAreaInsets();
    const { data: orderData, isLoading, isError, error } = useSingleOrderByClient(id);

    if (isLoading) return <ICCDLoader />
    if (isError) return <Text>{error?.message}</Text>

    const { id: orderId, status, category, description, gigsImage } = orderData?.order
    const { name: packName, packDescription, packType, deliveryTime, revisions, price, packages } = orderData?.packages[0]

    const parsePack = JSON.parse(packages)
    const features = Object.entries(parsePack)
        .filter(([_, value]) => value === true)
        .map(([key]) => key);

    return (
        <LinearGradient
            colors={['#f0f9ff', '#e0f2fe', '#bae6fd', '#7dd3fc']}
            style={styles.container}
            start={{ x: 0, y: 0 }}
            end={{ x: 0.6, y: 1 }}
        >
            <ScrollView
                showsVerticalScrollIndicator={false}
                contentContainerStyle={{ paddingTop: insets.top + 14, paddingHorizontal: 16, paddingBottom: 40 }}
            >
                <View>
                    <OrderDetailHeader
                        orderNo={orderId}
                        status={status}
                    />
                </View>

                <View style={styles.box}>
                    <ProductSlider images={gigsImage?.split(",")} />
                    <PackageDetails
                        name={packName}
                        price={price}
                        features={features}
                    />
                </View>

                <OrderSummaryCards
                    packageName={packName}
                    price={price}
                    revisions={revisions}
                    deliveryDays={deliveryTime}
                />

                <OrderCategory category={category} />
                <OrderDescription description={description} />

            </ScrollView>
        </LinearGradient>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    box: {
        backgroundColor: 'rgba(255,255,255,0.85)',
        borderRadius: 16,
        padding: 0,
        marginBottom: 20,
        borderWidth: 1,
        borderColor: 'rgba(14,165,233,0.12)',
        elevation: 2,
        shadowColor: '#0d9488',
        shadowOffset: { width: 0, height: 3 },
        shadowOpacity: 0.08,
        shadowRadius: 8,
    },
    // boxSlider: {
    //   padding: 10,
    //   paddingTop: 0,
    // },
});