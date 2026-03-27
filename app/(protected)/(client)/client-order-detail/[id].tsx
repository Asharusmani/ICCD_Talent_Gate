import { useSingleOrderByClient } from "@/api/client/order";
import OrderCategory from '@/components/order-detail/order-category';
import OrderDescription from '@/components/order-detail/order-description';
import OrderDetailHeader from '@/components/order-detail/order-etail-header';
import OrderSummaryCards from '@/components/order-detail/order-summary-cards';
import PackageDetails from '@/components/order-detail/package-details';
import ProductSlider from '@/components/order-detail/product-slider';
import { useLocalSearchParams } from 'expo-router';
import { ScrollView, StyleSheet, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import ICCDLoader from '@/components/ui/loader2';

export default function OrderDetailsScreen() {

    const { id } = useLocalSearchParams()
    const { data: orderData, isLoading, isError, error } = useSingleOrderByClient(id);

    if (isLoading) return <ICCDLoader />
    if (isError) return error.message

    const { id: orderId, status, category, description, gigsImage } = orderData?.order
    const { name: packName, packDescription, packType, deliveryTime, revisions, price, packages } = orderData?.packages[0]

    const parsePack = JSON.parse(packages)
    const features = Object.entries(parsePack)
        .filter(([_, value]) => value === true)
        .map(([key]) => key);

    return (
        <SafeAreaView style={styles.container}>
            <ScrollView showsVerticalScrollIndicator={false}>
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
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 16,
        backgroundColor: '#F4F4F4'
    },
    box: {
        backgroundColor: '#FFFFFF',
        borderRadius: 12,
        padding: 0,
        marginBottom: 20,
        elevation: 0.3,
    },
    // boxSlider: {
    //   padding: 10,
    //   paddingTop: 0,
    // },
});
