import { useState } from 'react';
import React, { useEffect } from 'react';
import { useAppDispatch } from '@/hooks/use-apply-project';
import { setOrder } from '@/store/slices/order-details-slice';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { CheckCircle2, Clock, RotateCcw, XCircle } from 'lucide-react-native';

function GigPricing({ packagesDetails }: any) {

    const dispatch = useAppDispatch()
    const [activeTab, setActiveTab] = useState('Basic');
    const selectedPackage = packagesDetails?.find(
        (pkg) => pkg?.packageType?.toLowerCase() === activeTab.toLowerCase()
    );
    const features = JSON.parse(selectedPackage?.packages)

    useEffect(() => {
        dispatch(setOrder(selectedPackage))
    }, [])

    return (
        <View style={{ flex: 1 }}>
            <View style={styles.pricingCard}>
                <View style={styles.tabBar}>
                    {["Basic", "Standard", "Premium"].map((item, index) => (
                        <TouchableOpacity
                            key={index}
                            style={[styles.tab, activeTab === item && styles.activeTab]}
                            onPress={() => {
                                setActiveTab(item)
                                const newSelectedPackage = packagesDetails?.find(
                                    (pkg) => pkg?.packageType?.toLowerCase() === item.toLowerCase()
                                );
                                dispatch(setOrder(newSelectedPackage))
                            }}
                        >
                            <Text style={[styles.tabText, activeTab === item && styles.activeTabText]}>{item}</Text>
                        </TouchableOpacity>
                    ))}
                </View>

                <View style={styles.pricingContent}>
                    <Text style={styles.priceTitle}>{activeTab}</Text>
                    <Text style={styles.priceValue}>$ {selectedPackage?.price}</Text>

                    <Text style={styles.vendorName}>{selectedPackage?.packageName}</Text>
                    <Text style={styles.vendorSub}>{selectedPackage?.packageDescription}</Text>

                    <View style={styles.statsRow}>
                        <View style={styles.statItem}>
                            <Clock size={16} color="#A0A0A0" />
                            <Text style={styles.statText}>{features?.concepts} Concepts</Text>
                        </View>
                        <View style={styles.statItem}>
                            <Clock size={16} color="#A0A0A0" />
                            <Text style={styles.statText}>{selectedPackage?.deliveryTime} day delivery</Text>
                        </View>
                        <View style={styles.statItem}>
                            <RotateCcw size={16} color="#A0A0A0" />
                            <Text style={styles.statText}>{selectedPackage?.revisions} Revisions</Text>
                        </View>
                    </View>

                    {/* Features */}
                    {Object.entries(JSON.parse(selectedPackage.packages)).map(([key, value], index) => (
                        <View key={index} style={styles.featureItem}>
                            {value ?
                                <CheckCircle2 size={20} color="#147D7E" fill="#E8F2F2" />
                                :
                                <XCircle size={20} color="#B0B0B0" />
                            }
                            <Text style={styles.featureText}>{key.replaceAll("_", " ")}</Text>
                        </View>
                    ))}
                </View>
            </View>
        </View>
    )
}

export default GigPricing;

const styles = StyleSheet.create({
    pricingCard: {
        backgroundColor: '#FFF',
        borderRadius: 12,
        borderWidth: 1,
        borderColor: '#EFEFEF',
        overflow: 'hidden',
        marginBottom: 20,
    },
    tabBar: {
        flexDirection: 'row',
        backgroundColor: '#F7F7F7',
    },
    tab: {
        flex: 1,
        paddingVertical: 15,
        alignItems: 'center',
        borderBottomWidth: 3,
        borderBottomColor: 'transparent',
    },
    activeTab: {
        backgroundColor: '#FFF',
        borderBottomColor: '#00334E',
    },
    tabText: {
        fontSize: 14,
        fontWeight: '600',
        color: '#00334E',
    },
    activeTabText: {
        color: '#00334E',
    },
    pricingContent: {
        padding: 20,
    },
    priceTitle: {
        fontSize: 18,
        fontWeight: 'bold',
    },
    priceValue: {
        fontSize: 22,
        fontWeight: 'bold',
        color: '#043A53',
        marginVertical: 5,
    },
    vendorName: {
        fontSize: 16,
        fontWeight: 'bold',
        marginTop: 10,
    },
    vendorSub: {
        color: '#78A5A6',
        marginBottom: 15,
    },
    statsRow: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginBottom: 20,
    },
    statItem: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    statText: {
        fontSize: 12,
        color: '#A0A0A0',
        marginLeft: 5,
    },
    featureItem: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 12,
    },
    featureText: {
        fontSize: 14,
        color: '#00334E',
        fontWeight: '500',
        marginLeft: 10,
    },
    continueBtn: {
        backgroundColor: '#147D7E',
        height: 55,
        borderRadius: 10,
        justifyContent: 'center',
        alignItems: 'center',
        marginBottom: 12,
    },
    continueBtnText: {
        color: '#FFF',
        fontSize: 18,
        fontWeight: 'bold',
    },
    contactBtn: {
        backgroundColor: '#FFF',
        height: 55,
        borderRadius: 10,
        justifyContent: 'center',
        alignItems: 'center',
        borderWidth: 1,
        borderColor: '#147D7E',
    },
    contactBtnText: {
        color: '#147D7E',
        fontSize: 18,
        fontWeight: 'bold',
    },
});