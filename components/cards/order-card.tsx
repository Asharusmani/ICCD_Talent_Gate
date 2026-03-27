import { Image, StyleSheet, Text, View } from 'react-native';
import ButtonRN from '../ui/button';
import { router, useSegments } from 'expo-router';
import { BadgeCheck } from 'lucide-react-native';

interface GigItem {
    orderId: string;
    image: string;
    title: string;
    description: string;
    status: string;
    price: string;
    gigsImage: string;
    base_price: string;
}

interface card {
    item: GigItem;
    handleClickComplete: () => void
}

export default function OrderCard({ item, handleClickComplete }: card) {

    const segmants = useSegments()
    const route = segmants.includes('(client)') ? `/client-order-detail/${item.orderId}}` : `/freelancer-order-detail/${item.id}}`
    
    return (
        <View style={styles.container}>
            <View style={styles.card}>
                <Image source={{ uri: item?.gigsImage?.split(",")[0] }} style={styles.image} />
                <View style={styles.content}>
                    <Text numberOfLines={2} style={styles.title}>{item.title}</Text>
                    {/* <Text style={styles.desc}>{item.description}</Text> */}
                    <View style={styles.row}>
                    </View>
                    <View style={styles.right}>
                        <View style={styles.status}>
                            <BadgeCheck color="#16A34A" size="20"/>
                            <Text style={styles.statusText}>{item.status}</Text>
                        </View>
                        <Text style={styles.price}>Price: {item.base_price}</Text>
                    </View>
                </View>
            </View>
            {/* <View style={styles.buttonContainer}>
                <ButtonRN style={styles.button} handleClick={() => router.push(route)}>
                    View Details
                </ButtonRN>
                <ButtonRN handleClick={handleClickComplete} style={styles.button}>
                    Complete Order
                </ButtonRN>
            </View> */}
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        padding: 12,
        borderRadius: 14,
        // borderColor: '#15A9B2',
        // borderWidth: 1,
        backgroundColor: '#FFFFFF'
    },
    card: {
        flexDirection: 'row',
        marginBottom: 14,
        elevation: 3,
    },
    image: {
        width: 120,
        height: 82,
        borderRadius: 10,
        marginRight: 12,
    },
    content: {
        flex: 1,
    },
    title: {
        fontSize: 13,
        fontWeight: '600',
    },
    desc: {
        fontSize: 10,
        color: '#6B7280',
        marginVertical: 2,
        width: 150
    },
    row: {
        flexDirection: 'row',
        alignItems: 'center',
        marginTop: 6,
    },
    status: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: '#ECFDF5',
        paddingHorizontal: 8,
        paddingVertical: 5,
        borderRadius: 20,
        marginRight: 8,
        marginTop: 14
    },
    statusText: {
        fontSize: 11,
        marginLeft: 4,
        color: '#16A34A',
        textTransform: "capitalize"
    },
    button: {
        flex: 1
    },
    buttonText: {
        fontSize: 11,
    },
    right: {
        display: "flex",
        flexDirection: "row",
        alignItems: 'flex-end',
        justifyContent: 'space-between',
    },
    price: {
        fontSize: 11,
        color: '#374151',
        marginBottom: 4,
        fontWeight: 700
    },
    dropdown: {
        position: 'absolute',
        top: 26,
        right: 0,
        width: 140,
        backgroundColor: '#fff',
        borderRadius: 10,
        elevation: 6,
        shadowColor: '#000',
        shadowOpacity: 0.1,
        shadowRadius: 10,
    },
    menuItem: {
        paddingVertical: 10,
        paddingHorizontal: 12,
    },
    menuText: {
        fontSize: 12,
        color: '#111827',
    },
    buttonContainer: {
        flex: 1,
        display: "flex",
        flexDirection: "row",
        gap: 8,
    }
});
