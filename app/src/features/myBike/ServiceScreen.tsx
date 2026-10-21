import React, { useEffect, useState } from 'react';
import { ActivityIndicator, Alert, ScrollView, StyleSheet, Text, View } from 'react-native';
import * as ImagePicker from 'expo-image-picker';
import { Button, Card, Input, ListRow, StatusBadge } from '../../components/ui';
import { analyzeBill } from '../../services/billScanService';
import { useServiceStore } from '../../store';
import { BillAnalysis, ServiceRecord } from '../../types';
import { useTheme } from '../../theme/useTheme';

export function ServiceScreen({ bikeId, odometerKm, onBack }: { bikeId: string; odometerKm: number; onBack: () => void }) {
  const theme = useTheme();
  const records = useServiceStore((state) => state.records);
  const load = useServiceStore((state) => state.load);
  const add = useServiceStore((state) => state.add);
  const [form, setForm] = useState(false);
  const [scan, setScan] = useState(false);
  const [processing, setProcessing] = useState(false);
  const [analysis, setAnalysis] = useState<BillAnalysis>();
  useEffect(() => { void load(bikeId); }, [bikeId, load]);
  const scanBill = async () => {
    const result = await ImagePicker.launchImageLibraryAsync({ mediaTypes: ['images'], quality: 0.8 });
    if (result.canceled) return;
    setProcessing(true);
    try { setAnalysis(await analyzeBill(result.assets[0].uri)); } catch { Alert.alert('Scan failed', 'Try a clearer bill photo.'); } finally { setProcessing(false); }
  };
  if (analysis) return <ScrollView contentContainerStyle={styles.page}><Button label="Back to service history" variant="ghost" onPress={() => setAnalysis(undefined)} /><Text style={[styles.title, { color: theme.colors.text, fontFamily: theme.fontFamily }]}>Bill results</Text>{analysis.items.map((item) => <Card key={item.id}><View style={styles.row}><Text style={[styles.item, { color: theme.colors.text, fontFamily: theme.fontFamily }]}>{item.name}</Text><StatusBadge status={item.flag} /></View><Text style={[styles.copy, { color: theme.colors.textMuted, fontFamily: theme.fontFamily }]}>{item.explanation}</Text>{item.reason ? <Text style={[styles.copy, { color: theme.colors.warning, fontFamily: theme.fontFamily }]}>{item.reason}</Text> : null}<Text style={[styles.price, { color: theme.colors.text, fontFamily: theme.fontFamily }]}>₹{item.priceInr}</Text></Card>)}<Card><Text style={[styles.item, { color: theme.colors.text, fontFamily: theme.fontFamily }]}>Total: ₹{analysis.totalInr}</Text><Text style={[styles.copy, { color: theme.colors.textMuted, fontFamily: theme.fontFamily }]}>Typical fair price: ₹{analysis.fairPriceMinInr}–₹{analysis.fairPriceMaxInr}</Text></Card><Button label="Save to history" onPress={() => { add({ id: `service-${Date.now()}`, bikeId, date: new Date().toISOString(), odometerKm, centre: 'Saved from bill', totalCostInr: analysis.totalInr, partsChanged: analysis.items.map((item) => item.name) }); setAnalysis(undefined); }} /></ScrollView>;
  if (form) return <ScrollView contentContainerStyle={styles.page}><Button label="Back to history" variant="ghost" onPress={() => setForm(false)} /><Input label="Service centre" placeholder="City Bike Care" /><Input label="Total cost (₹)" keyboardType="number-pad" placeholder="2500" /><Button label="Save service" onPress={() => setForm(false)} /></ScrollView>;
  if (scan) return <View style={[styles.capture, { backgroundColor: theme.colors.background }]}>{processing ? <><ActivityIndicator color={theme.colors.primary} /><Text style={[styles.copy, { color: theme.colors.textMuted }]}>Reading your bill…</Text></> : <><Text style={[styles.title, { color: theme.colors.text, fontFamily: theme.fontFamily }]}>Scan service bill</Text><Text style={[styles.copy, { color: theme.colors.textMuted, fontFamily: theme.fontFamily }]}>Keep the whole bill inside the box.</Text><View style={[styles.edgeGuide, { borderColor: theme.colors.primary }]}><Text style={{ color: theme.colors.textMuted }}>Bill edges go here</Text></View><Button label="Choose bill photo" onPress={() => void scanBill()} /><Button label="Cancel" variant="ghost" onPress={() => setScan(false)} /></>}</View>;
  return <ScrollView contentContainerStyle={styles.page}><Button label="Back to My Bike" variant="ghost" onPress={onBack} /><Card><Text style={[styles.item, { color: theme.colors.text, fontFamily: theme.fontFamily }]}>Next service in 18 days / 420 km</Text><View style={[styles.progress, { backgroundColor: theme.colors.surfaceAlt }]}><View style={[styles.progressFill, { backgroundColor: theme.colors.primary }]} /></View></Card><Button label="Scan service bill" onPress={() => setScan(true)} /><Button label="Add service manually" variant="secondary" onPress={() => setForm(true)} />{records.map((record) => <ListRow key={record.id} title={record.centre} subtitle={`${record.date.slice(0, 10)} · ${record.odometerKm} km · ₹${record.totalCostInr}`} trailing={<Text style={{ color: theme.colors.textMuted }}>{record.partsChanged.length} parts</Text>} />)}</ScrollView>;
}
const styles = StyleSheet.create({ page: { padding: 16, gap: 16, paddingBottom: 48 }, center: { flex: 1, alignItems: 'center', justifyContent: 'center', gap: 16 }, capture: { flex: 1, alignItems: 'center', justifyContent: 'center', gap: 16, padding: 24 }, edgeGuide: { width: '100%', height: 240, borderWidth: 3, borderRadius: 20, borderStyle: 'dashed', alignItems: 'center', justifyContent: 'center' }, title: { fontSize: 26, lineHeight: 32, fontWeight: '700' }, item: { fontSize: 17, lineHeight: 24, fontWeight: '600' }, copy: { fontSize: 16, lineHeight: 24 }, price: { fontSize: 16, lineHeight: 24, fontWeight: '700', marginTop: 8 }, row: { flexDirection: 'row', justifyContent: 'space-between', gap: 8 }, progress: { height: 8, borderRadius: 8, marginTop: 12, overflow: 'hidden' }, progressFill: { height: 8, width: '64%' } });
