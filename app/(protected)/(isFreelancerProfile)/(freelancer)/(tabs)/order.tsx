import { useGetOrderByFreelancer } from "@/api/client/order";
import OrderCard from "@/components/cards/order-card";
import Header from '@/components/header/banner-header';
import DialogModal from '@/components/modal/dialog-modal';
import ICCDLoader from '@/components/ui/loader2';
import { Info, Send } from 'lucide-react-native';
import { useState } from 'react';
import { FlatList, StyleSheet, Text, View } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { useHeaderHeight } from '@react-navigation/elements';

export default function OrderScreen() {
  const headerHeight = useHeaderHeight();
  const [modal, setModal] = useState('')
  const { data, totalPages, isError, error, isLoading } = useGetOrderByFreelancer();

  console.log('ORDER DATA:', JSON.stringify(data?.[0], null, 2));

  if (isLoading) return <ICCDLoader />
  if (isError) return <Text>{error.message}</Text>

  return (
    <LinearGradient
      colors={['#f0f9ff', '#e0f2fe', '#bae6fd', '#7dd3fc']}
      style={{ flex: 1 }}
      start={{ x: 0, y: 0 }}
      end={{ x: 0.6, y: 1 }}
    >
      <FlatList
        data={data}
        keyExtractor={(_, index) => index.toString()}
        renderItem={({ item }) => (
          <OrderCard
            item={item}
            handleClickComplete={() => setModal('complete-order-modal')}
          />
        )}
        contentContainerStyle={[
          styles.listContent,
          { paddingTop: headerHeight + 16 }
        ]}
        showsVerticalScrollIndicator={false}
        ListHeaderComponent={
          <View style={styles.headerContainer}>
            <Header
              title="Order Management"
              description="Manage orders easily with smart tools – track progress, get updates, and chat all in one place."
            />
          </View>
        }
      />

      {modal === 'complete-order-modal' && (
        <DialogModal
          icon={<Info size={42} color={ACCENT} />}
          title="Complete Order"
          subtitle="Complete order description"
          confirmText="Confirm"
          onConfirm={() => setModal('transfer-payment-modal')}
          onClose={() => setModal('')}
        />
      )}

      {modal === 'transfer-payment-modal' && (
        <DialogModal
          icon={<Send size={42} color={ACCENT} />}
          title="Transfer Payment"
          subtitle="Transfer payment description"
          confirmText="Confirm"
          onClose={() => setModal('')}
        />
      )}
    </LinearGradient>
  );
}

const ACCENT = '#0d9488';

const styles = StyleSheet.create({
  headerContainer: {
    marginBottom: 20,
  },
  listContent: {
    paddingHorizontal: 16,
    paddingBottom: 120,
    gap: 14,
  },
});