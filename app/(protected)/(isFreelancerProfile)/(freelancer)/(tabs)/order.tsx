import { useGetOrderByFreelancer } from "@/api/client/order";
import OrderCard from "@/components/cards/order-card";
import Header from '@/components/header/banner-header';
import DialogModal from '@/components/modal/dialog-modal';
import ICCDLoader from '@/components/ui/loader2';
import { Info, Send } from 'lucide-react-native';
import { useState } from 'react';
import { FlatList, StyleSheet, Text, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

export default function OrderScreen() {

  const [modal, setModal] = useState('')
  const { data, totalPages, isError, error, isLoading } = useGetOrderByFreelancer();
  
  if (isLoading) return <ICCDLoader />
  if(isError) return <Text>{error.message}</Text>

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.headerContainer}>
        <Header
          title="Order Management"
          description="Manage orders easily with smart tools – track progress, get updates, and chat all in one place."
        />
      </View>

      <View style={styles.listContainer}>
        <FlatList
          data={data}
          keyExtractor={(_, index) => index.toString()}
          renderItem={({ item }) => <OrderCard item={item} handleClickComplete={() => setModal('complete-order-modal')} />}
          contentContainerStyle={{ gap: 15 }}
          showsVerticalScrollIndicator={false}
        />
      </View>

      {modal === 'complete-order-modal' && (
        <DialogModal
          icon={<Info size={42} color="#043A53" />}
          title="Complete Order"
          subtitle="Complete order description"
          confirmText="Confirm"
          onConfirm={() => setModal('transfer-payment-modal')}
          onClose={() => setModal('')}
        />
      )}

      {modal === 'transfer-payment-modal' && (
        <DialogModal
          icon={<Send size={42} color="#043A53" />}
          title="Transfer Payment"
          subtitle="Transfer payment description"
          confirmText="Confirm"
          onClose={() => setModal('')}
        />
      )}

    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 10,
    backgroundColor: '#F4F4F4'
  },
  listContainer: {
    marginTop: 30
  },
  headerContainer: {
    marginTop: 0
  }
});
