import React, { useEffect, useMemo, useState } from 'react';
import { ScrollView, StyleSheet, Text, View } from 'react-native';
import Svg, { Circle, Path, Rect } from 'react-native-svg';
import { Button, Card, FloatingActionMenu, ListRow, ProgressRing, Skeleton } from '../../components/ui';
import { useTheme } from '../../theme/useTheme';
import { useBikeStore, useFuelStore, useServiceStore, useTaskStore } from '../../store';
import { BikeOnboarding } from './BikeOnboarding';
import { CareScreen } from './CareScreen';
import { FuelScreen } from './FuelScreen';
import { ServiceScreen } from './ServiceScreen';

type ViewName = 'dashboard' | 'care' | 'service' | 'fuel';

export function MyBikeScreen() {
  const theme = useTheme();
  const bikes = useBikeStore((state) => state.bikes);
  const activeBikeId = useBikeStore((state) => state.activeBikeId);
  const loadBikes = useBikeStore((state) => state.load);
  const addBike = useBikeStore((state) => state.addBike);
  const setActiveBike = useBikeStore((state) => state.setActiveBike);
  const tasks = useTaskStore((state) => state.tasks);
  const loadTasks = useTaskStore((state) => state.load);
  const entries = useFuelStore((state) => state.entries);
  const loadFuel = useFuelStore((state) => state.load);
  const records = useServiceStore((state) => state.records);
  const loadServices = useServiceStore((state) => state.load);
  const [view, setView] = useState<ViewName>('dashboard');
  const [loading, setLoading] = useState(true);
  const [onboarding, setOnboarding] = useState(false);

  useEffect(() => { Promise.all([loadBikes(), loadTasks()]).finally(() => setLoading(false)); }, [loadBikes, loadTasks]);
  const bike = bikes.find((item) => item.id === activeBikeId);
  useEffect(() => { if (bike) { void loadFuel(bike.id); void loadServices(bike.id); } }, [bike, loadFuel, loadServices]);

  if (loading) return <View style={styles.center}><Skeleton width="92%" height={220} /><Skeleton width="70%" height={28} /></View>;
  if (!bike && !onboarding) return <View style={styles.center}><BikeMark /><Text style={[styles.title, { color: theme.colors.text, fontFamily: theme.fontFamily }]}>Your garage is empty</Text><Text style={[styles.body, { color: theme.colors.textMuted, fontFamily: theme.fontFamily }]}>Add your bike to track its health, care, service history, and fuel.</Text><Button label="Add your bike" size="lg" onPress={() => setOnboarding(true)} /></View>;
  if (onboarding) return <ScrollView contentContainerStyle={styles.page}><BikeOnboarding onSave={(newBike) => { addBike(newBike); setOnboarding(false); }} /></ScrollView>;
  if (!bike) return null;
  if (view === 'care') return <CareScreen tasks={tasks} odometerKm={bike.odometerKm} onBack={() => setView('dashboard')} />;
  if (view === 'service') return <ServiceScreen bikeId={bike.id} odometerKm={bike.odometerKm} onBack={() => setView('dashboard')} />;
  if (view === 'fuel') return <FuelScreen bikeId={bike.id} onBack={() => setView('dashboard')} />;

  const nextTask = tasks.find((task) => task.status !== 'on-time');
  const average = entries.length > 1 ? '38' : '—';
  const lastService = records[0]?.date.slice(0, 10) ?? 'Not added';
  return <View style={styles.screen}><ScrollView contentContainerStyle={styles.page}>
    <View style={styles.heading}><View><Text style={[styles.eyebrow, { color: theme.colors.primary, fontFamily: theme.fontFamily }]}>GARAGE</Text><Text style={[styles.garageName, { color: theme.colors.text, fontFamily: theme.fontFamily }]}>{bike.brand} {bike.model}</Text></View><Text accessibilityLabel={`${bikes.length} bikes`} style={[styles.count, { color: theme.colors.textMuted, fontFamily: theme.fontFamily }]}>{bikes.length} bike{bikes.length === 1 ? '' : 's'}</Text></View>
    <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={styles.switcher}>{bikes.map((item) => <Button key={item.id} label={`${item.brand} ${item.model}`} size="md" variant={item.id === bike.id ? 'primary' : 'secondary'} onPress={() => setActiveBike(item.id)} />)}<Button label="+ Add bike" variant="ghost" onPress={() => setOnboarding(true)} /></ScrollView>
    <Card style={styles.hero}><View style={styles.heroCopy}><Text style={[styles.heroName, { color: theme.colors.text, fontFamily: theme.fontFamily }]}>{bike.brand} {bike.model}</Text><Text style={[styles.body, { color: theme.colors.textMuted, fontFamily: theme.fontFamily }]}>{bike.year} · {bike.odometerKm.toLocaleString()} km</Text><View style={[styles.readyPill, { backgroundColor: `${theme.colors.success}20` }]}><Text style={[styles.readyText, { color: theme.colors.success, fontFamily: theme.fontFamily }]}>● Ready to ride</Text></View></View><View style={styles.heroArt}><BikeMark /><ProgressRing progress={bike.healthScore / 100} label="Health" /></View></Card>
    <View style={styles.sectionHeading}><Text style={[styles.sectionTitle, { color: theme.colors.text, fontFamily: theme.fontFamily }]}>Bike health</Text><Text style={[styles.muted, { color: theme.colors.textMuted, fontFamily: theme.fontFamily }]}>Updated today</Text></View>
    <View style={styles.metrics}><Metric label="NEXT DUE" value={nextTask?.name ?? 'All clear'} detail={nextTask ? 'Needs attention' : 'You are on track'} /><Metric label="LAST SERVICE" value={lastService} detail={records[0] ? `₹${records[0].totalCostInr.toLocaleString()}` : 'Add your first record'} /><Metric label="FUEL AVERAGE" value={average === '—' ? average : `${average} km/l`} detail="Across recent fill-ups" /></View>
    <Card style={styles.dueCard}><View style={[styles.iconCircle, { backgroundColor: `${theme.colors.warning}20` }]}><Text style={{ color: theme.colors.warning, fontSize: 20 }}>!</Text></View><View style={styles.flex}><Text style={[styles.cardTitle, { color: theme.colors.text, fontFamily: theme.fontFamily }]}>Keep your bike happy</Text><Text style={[styles.muted, { color: theme.colors.textMuted, fontFamily: theme.fontFamily }]}>Small checks stop expensive surprises.</Text></View><Button label="Care" size="md" onPress={() => setView('care')} /></Card>
    <Text style={[styles.sectionTitle, { color: theme.colors.text, fontFamily: theme.fontFamily }]}>Quick actions</Text>
    <ListRow title="Care checklist" subtitle="See what needs attention today." onPress={() => setView('care')} trailing={<Text style={{ color: theme.colors.primary }}>›</Text>} />
    <ListRow title="Service history" subtitle="Bills, parts, and upcoming service." onPress={() => setView('service')} trailing={<Text style={{ color: theme.colors.primary }}>›</Text>} />
    <ListRow title="Fuel log" subtitle="Mileage and running cost over time." onPress={() => setView('fuel')} trailing={<Text style={{ color: theme.colors.primary }}>›</Text>} />
    <Card style={styles.cover}><Text style={[styles.cardTitle, { color: theme.colors.text, fontFamily: theme.fontFamily }]}>Your bike, in one place</Text><Text style={[styles.muted, { color: theme.colors.textMuted, fontFamily: theme.fontFamily }]}>Learn every part, build good habits, and ride with confidence.</Text></Card>
  </ScrollView><FloatingActionMenu actions={[{ label: 'Add fuel', onPress: () => setView('fuel') }, { label: 'Mark care done', onPress: () => setView('care') }, { label: 'Add service', onPress: () => setView('service') }, { label: 'Scan a bill', onPress: () => setView('service') }]} /></View>;
}

function Metric({ label, value, detail }: { label: string; value: string; detail: string }) {
  const theme = useTheme();
  return <Card style={styles.metric}><Text style={[styles.metricLabel, { color: theme.colors.textMuted, fontFamily: theme.fontFamily }]}>{label}</Text><Text numberOfLines={1} style={[styles.metricValue, { color: theme.colors.text, fontFamily: theme.fontFamily }]}>{value}</Text><Text numberOfLines={1} style={[styles.metricDetail, { color: theme.colors.textMuted, fontFamily: theme.fontFamily }]}>{detail}</Text></Card>;
}

function BikeMark() {
  const theme = useTheme();
  return <Svg width={132} height={82} viewBox="0 0 132 82" accessibilityLabel="Illustration of a motorcycle"><Circle cx="25" cy="62" r="16" fill="none" stroke={theme.colors.primary} strokeWidth="4" /><Circle cx="105" cy="62" r="16" fill="none" stroke={theme.colors.primary} strokeWidth="4" /><Path d="M25 62 45 38h25l18 24M52 38l11-18h17l8 18M70 38l18 0 17 24M43 38l-9-12" fill="none" stroke={theme.colors.text} strokeWidth="4" strokeLinecap="round" strokeLinejoin="round" /><Rect x="55" y="45" width="21" height="9" rx="4" fill={theme.colors.primary} /></Svg>;
}

const styles = StyleSheet.create({ screen: { flex: 1 }, page: { padding: 20, gap: 16, paddingBottom: 132 }, center: { flex: 1, alignItems: 'center', justifyContent: 'center', gap: 16, padding: 28 }, heading: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'flex-end' }, eyebrow: { fontSize: 11, lineHeight: 16, fontWeight: '700', letterSpacing: 1.5 }, garageName: { fontSize: 23, lineHeight: 29, fontWeight: '700' }, title: { fontSize: 30, lineHeight: 36, fontWeight: '700' }, body: { fontSize: 15, lineHeight: 22 }, muted: { fontSize: 13, lineHeight: 19 }, count: { fontSize: 13, lineHeight: 20 }, switcher: { gap: 8 }, hero: { minHeight: 190, padding: 20, overflow: 'hidden', flexDirection: 'row', alignItems: 'center' }, heroCopy: { flex: 1, gap: 5 }, heroArt: { width: 150, minHeight: 150, alignItems: 'center', justifyContent: 'space-between', gap: 6 }, heroName: { fontSize: 22, lineHeight: 28, fontWeight: '700' }, readyPill: { alignSelf: 'flex-start', borderRadius: 999, paddingHorizontal: 10, paddingVertical: 5, marginTop: 8 }, readyText: { fontSize: 12, fontWeight: '700' }, sectionHeading: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }, sectionTitle: { fontSize: 18, lineHeight: 26, fontWeight: '700' }, metrics: { flexDirection: 'row', gap: 8 }, metric: { flex: 1, minHeight: 108, padding: 12 }, metricLabel: { fontSize: 10, lineHeight: 14, fontWeight: '700', letterSpacing: 0.6 }, metricValue: { fontSize: 16, lineHeight: 22, fontWeight: '700', marginTop: 8 }, metricDetail: { fontSize: 11, lineHeight: 16, marginTop: 4 }, dueCard: { flexDirection: 'row', alignItems: 'center', gap: 12, padding: 14 }, iconCircle: { width: 38, height: 38, borderRadius: 19, alignItems: 'center', justifyContent: 'center' }, flex: { flex: 1 }, cardTitle: { fontSize: 16, lineHeight: 22, fontWeight: '700' }, cover: { padding: 20, minHeight: 105, justifyContent: 'center', gap: 6 } });
