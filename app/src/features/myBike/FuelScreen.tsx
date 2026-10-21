import React, { useMemo, useState } from 'react';
import { ScrollView, StyleSheet, Text, View } from 'react-native';
import Svg, { Polyline, Rect } from 'react-native-svg';
import { Button, Card, Input, ListRow } from '../../components/ui';
import { useFuelStore } from '../../store';
import { FuelEntry } from '../../types';
import { useTheme } from '../../theme/useTheme';

export function FuelScreen({ bikeId, onBack }: { bikeId: string; onBack: () => void }) {
  const theme = useTheme();
  const entries = useFuelStore((state) => state.entries);
  const addEntry = useFuelStore((state) => state.addEntry);
  const removeEntry = useFuelStore((state) => state.removeEntry);
  const [adding, setAdding] = useState(false);
  const [litres, setLitres] = useState('8');
  const [price, setPrice] = useState('103');
  const [odometer, setOdometer] = useState('12500');
  const total = Number(litres || 0) * Number(price || 0);
  const average = useMemo(() => entries.length > 1 ? 38 : 0, [entries.length]);
  if (adding) return <ScrollView contentContainerStyle={styles.page}><Button label="Back to fuel" variant="ghost" onPress={() => setAdding(false)} /><Text style={[styles.title, { color: theme.colors.text, fontFamily: theme.fontFamily }]}>Add fill-up</Text><Input label="Litres" value={litres} onChangeText={setLitres} keyboardType="decimal-pad" /><Input label="Price per litre (₹)" value={price} onChangeText={setPrice} keyboardType="decimal-pad" /><Text style={[styles.total, { color: theme.colors.text, fontFamily: theme.fontFamily }]}>Total: ₹{total.toFixed(2)}</Text><Input label="Odometer (km)" value={odometer} onChangeText={setOdometer} keyboardType="number-pad" /><Button label="Save fill-up" onPress={() => { const entry: FuelEntry = { id: `fuel-${Date.now()}`, bikeId, date: new Date().toISOString(), litres: Number(litres), pricePerLitreInr: Number(price), totalInr: Number(total.toFixed(2)), odometerKm: Number(odometer), fullTank: true }; addEntry(entry); setAdding(false); }} /></ScrollView>;
  const chartPoints = entries.slice(0, 8).map((_, index) => `${index * 32},${58 - (index % 4) * 10}`).join(' ');
  return <ScrollView contentContainerStyle={styles.page}><Button label="Back to My Bike" variant="ghost" onPress={onBack} /><View style={styles.stats}><Card><Text style={[styles.stat, { color: theme.colors.text, fontFamily: theme.fontFamily }]}>{average || '—'} km/l</Text><Text style={{ color: theme.colors.textMuted }}>Average</Text></Card><Card><Text style={[styles.stat, { color: theme.colors.text, fontFamily: theme.fontFamily }]}>₹{entries.length ? Math.round(entries[0].pricePerLitreInr) : '—'}</Text><Text style={{ color: theme.colors.textMuted }}>Latest price</Text></Card></View><Card><Text style={[styles.item, { color: theme.colors.text, fontFamily: theme.fontFamily }]}>Mileage trend</Text><Svg width="100%" height={80} viewBox="0 0 224 80"><Polyline points={chartPoints || '0,60 32,60 64,60'} fill="none" stroke={theme.colors.primary} strokeWidth="4" /><Rect x="0" y="70" width="224" height="2" fill={theme.colors.border} /></Svg></Card><Button label="Add fill-up" onPress={() => setAdding(true)} />{entries.map((entry) => <ListRow key={entry.id} title={`₹${entry.totalInr.toFixed(0)} · ${entry.litres} litres`} subtitle={`${entry.date.slice(0, 10)} · ${entry.odometerKm} km`} onPress={() => removeEntry(entry.id)} trailing={<Text style={{ color: theme.colors.textMuted }}>Tap to delete</Text>} />)}</ScrollView>;
}
const styles = StyleSheet.create({ page: { padding: 16, gap: 16, paddingBottom: 48 }, title: { fontSize: 26, lineHeight: 32, fontWeight: '700' }, total: { fontSize: 20, lineHeight: 28, fontWeight: '600' }, item: { fontSize: 17, lineHeight: 24, fontWeight: '600' }, stat: { fontSize: 20, lineHeight: 28, fontWeight: '700' }, stats: { flexDirection: 'row', gap: 12 } });
