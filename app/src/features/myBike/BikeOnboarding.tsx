import React, { useState } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { Bike } from '../../types';
import { Button, Input, SegmentedToggle } from '../../components/ui';
import { useTheme } from '../../theme/useTheme';

export function BikeOnboarding({ onSave }: { onSave: (bike: Bike) => void }) {
  const theme = useTheme();
  const [brand, setBrand] = useState('');
  const [model, setModel] = useState('');
  const [year, setYear] = useState('2024');
  const [odometer, setOdometer] = useState('0');
  const [type, setType] = useState('Motorcycle');
  const [error, setError] = useState('');
  const save = () => {
    if (!brand.trim() || !model.trim() || !Number(year) || Number(odometer) < 0) { setError('Add a brand, model, year, and starting odometer.'); return; }
    onSave({ id: `bike-${Date.now()}`, brand: brand.trim(), model: model.trim(), year: Number(year), odometerKm: Number(odometer), bikeType: type === 'Motorcycle' ? 'motorcycle' : 'bicycle', healthScore: 100, createdAt: new Date().toISOString() });
  };
  return <View style={styles.content}><Text style={[styles.title, { color: theme.colors.text, fontFamily: theme.fontFamily }]}>Add your bike</Text><Text style={[styles.copy, { color: theme.colors.textMuted, fontFamily: theme.fontFamily }]}>A few details help BikeBuddy give you better reminders.</Text><Input label="Brand" value={brand} onChangeText={setBrand} placeholder="Royal Enfield" /><Input label="Model" value={model} onChangeText={setModel} placeholder="Classic 350" /><Input label="Year" value={year} onChangeText={setYear} keyboardType="number-pad" /><Input label="Starting odometer (km)" value={odometer} onChangeText={setOdometer} keyboardType="number-pad" /><Text style={[styles.label, { color: theme.colors.text, fontFamily: theme.fontFamily }]}>Bike type</Text><SegmentedToggle options={['Motorcycle', 'Bicycle']} value={type} onChange={setType} />{error ? <Text accessibilityRole="alert" style={{ color: theme.colors.danger }}>{error}</Text> : null}<Button label="Save bike" size="lg" onPress={save} /></View>;
}
const styles = StyleSheet.create({ content: { flexGrow: 1, padding: 16, gap: 16, justifyContent: 'center' }, title: { fontSize: 26, lineHeight: 32, fontWeight: '700' }, copy: { fontSize: 16, lineHeight: 24 }, label: { fontSize: 14, lineHeight: 20, fontWeight: '600' } });
