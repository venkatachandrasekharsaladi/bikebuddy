import React, { useCallback, useEffect, useMemo, useState } from 'react';
import { ActivityIndicator, Pressable, ScrollView, StyleSheet, Text, TextInput, View } from 'react-native';
import Animated, { useAnimatedStyle, useReducedMotion, useSharedValue, withRepeat, withTiming } from 'react-native-reanimated';
import { BottomSheet, Button, Chip, EmptyState, SegmentedToggle, Skeleton, StatusBadge } from '../../components/ui';
import { useTheme } from '../../theme/useTheme';
import { BikeComponent, BikeType, ComponentCategory } from '../../types';
import { getComponents } from '../../services/bikeService';
import { AssembledBikeArtwork } from './artwork';
import { ExplorerCanvas } from './ExplorerCanvas';

const categories: ComponentCategory[] = ['Engine', 'Transmission', 'Brakes', 'Suspension', 'Wheels & Tyres', 'Electrical', 'Body & Frame'];

export function ExplorerScreen() {
  const theme = useTheme();
  const [bikeType, setBikeType] = useState<BikeType>('motorcycle');
  const [components, setComponents] = useState<BikeComponent[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string>();
  const [exploded, setExploded] = useState(false);
  const [selected, setSelected] = useState<BikeComponent>();
  const [search, setSearch] = useState('');
  const [category, setCategory] = useState<ComponentCategory>();
  const [resetSignal, setResetSignal] = useState(0);
  const reducedMotion = useReducedMotion();
  const pulse = useSharedValue(1);

  const load = useCallback(async () => {
    setLoading(true);
    setError(undefined);
    try { setComponents(await getComponents(bikeType)); } catch { setError('We could not load the bike parts. Please try again.'); } finally { setLoading(false); }
  }, [bikeType]);
  useEffect(() => { void load(); }, [load]);
  useEffect(() => {
    if (reducedMotion) { pulse.value = 1; return; }
    pulse.value = withRepeat(withTiming(1.12, { duration: theme.motion.emphasis }), -1, true);
  }, [pulse, reducedMotion, theme.motion.emphasis]);
  const filtered = useMemo(() => components.filter((component) => (!category || component.category === category) && component.name.toLowerCase().includes(search.toLowerCase())), [category, components, search]);
  const openPart = useCallback((component: BikeComponent) => { setSelected(component); setExploded(true); }, []);
  const hintStyle = useAnimatedStyle(() => ({ transform: [{ scale: pulse.value }] }));
  const changeBikeType = (value: string) => { setBikeType(value.toLowerCase() as BikeType); setExploded(false); setSelected(undefined); setCategory(undefined); setSearch(''); };
  return (
    <View style={[styles.screen, { backgroundColor: theme.colors.background }]}>
      {loading ? <View style={styles.center}><Skeleton width="80%" height={240} /><ActivityIndicator color={theme.colors.primary} accessibilityLabel="Loading bike parts" /></View>
        : error ? <EmptyState title="Explorer is resting" message={error} actionLabel="Try again" onAction={() => void load()} />
          : components.length === 0 ? <EmptyState title="No parts yet" message="This bike does not have any parts to explore." />
            : <>
              <View style={styles.header}>
                <Text allowFontScaling style={[styles.title, { color: theme.colors.text, fontFamily: theme.fontFamily }]}>Explore your bike</Text>
                <SegmentedToggle options={['Motorcycle', 'Bicycle']} value={bikeType === 'motorcycle' ? 'Motorcycle' : 'Bicycle'} onChange={changeBikeType} />
              </View>
              {exploded ? <>
                <View style={styles.controls}>
                  <TextInput accessibilityLabel="Search bike parts" value={search} onChangeText={setSearch} placeholder="Search a part" placeholderTextColor={theme.colors.textMuted} style={[styles.search, { backgroundColor: theme.colors.surface, borderColor: theme.colors.border, color: theme.colors.text, fontFamily: theme.fontFamily }]} />
                  <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={styles.chips}>{categories.map((item) => <Chip key={item} label={item} selected={category === item} onPress={() => setCategory(category === item ? undefined : item)} />)}</ScrollView>
                </View>
                <ExplorerCanvas components={filtered.length > 0 ? filtered : components} exploded selectedId={selected?.id} onSelect={openPart} resetSignal={resetSignal} />
                <View style={styles.reassemble}><Button label="Put it back together" variant="secondary" onPress={() => { setSelected(undefined); setExploded(false); setResetSignal((value) => value + 1); }} /></View>
              </> : <Pressable accessibilityRole="button" accessibilityLabel="Tap to explore your bike" onPress={() => setExploded(true)} style={styles.assembled}>
                <AssembledBikeArtwork components={components} selectedId={selected?.id} />
                <Animated.View style={[styles.hint, { backgroundColor: theme.colors.primary }, hintStyle]}><Text allowFontScaling style={[styles.hintText, { color: theme.colors.onPrimary, fontFamily: theme.fontFamily }]}>Tap to explore</Text></Animated.View>
              </Pressable>}
            </>}
      {selected ? <BottomSheet visible={Boolean(selected)} onClose={() => setSelected(undefined)}><PartSheet component={selected} onRelated={(id) => { const related = components.find((item) => item.id === id); if (related) openPart(related); }} /></BottomSheet> : null}
    </View>
  );
}

function PartSheet({ component, onRelated }: { component: BikeComponent; onRelated: (id: string) => void }) {
  const theme = useTheme();
  return <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={styles.sheetContent}><Text allowFontScaling style={[styles.sheetTitle, { color: theme.colors.text, fontFamily: theme.fontFamily }]}>{component.name}</Text><Text allowFontScaling style={[styles.analogy, { color: theme.colors.textMuted, fontFamily: theme.fontFamily }]}>{component.analogy}</Text><SheetSection title="What it does" text={component.whatItDoes} /><SheetSection title="Why it matters" text={component.whyItMatters} /><Text allowFontScaling style={[styles.sectionTitle, { color: theme.colors.text, fontFamily: theme.fontFamily }]}>Signs it needs attention</Text>{component.warningSigns.map((sign) => <Text key={sign} allowFontScaling style={[styles.bullet, { color: theme.colors.textMuted, fontFamily: theme.fontFamily }]}>• {sign}</Text>)}<View style={styles.meta}><View><Text allowFontScaling style={[styles.metaLabel, { color: theme.colors.textMuted, fontFamily: theme.fontFamily }]}>Check interval</Text><Chip label={component.checkInterval} /></View><View><Text allowFontScaling style={[styles.metaLabel, { color: theme.colors.textMuted, fontFamily: theme.fontFamily }]}>Typical cost</Text><StatusBadge status={component.costRange === 'Low' ? 'normal' : component.costRange === 'Medium' ? 'check' : 'unnecessary'} label={component.costRange} /></View></View><Text allowFontScaling style={[styles.sectionTitle, { color: theme.colors.text, fontFamily: theme.fontFamily }]}>Related parts</Text><View style={styles.related}>{component.relatedIds.map((id) => <Chip key={id} label={id.replaceAll('-', ' ')} onPress={() => onRelated(id)} />)}</View></ScrollView>;
}

function SheetSection({ title, text }: { title: string; text: string }) {
  const theme = useTheme();
  return <View style={styles.section}><Text allowFontScaling style={[styles.sectionTitle, { color: theme.colors.text, fontFamily: theme.fontFamily }]}>{title}</Text><Text allowFontScaling style={[styles.body, { color: theme.colors.textMuted, fontFamily: theme.fontFamily }]}>{text}</Text></View>;
}

const styles = StyleSheet.create({ screen: { flex: 1 }, center: { flex: 1, alignItems: 'center', justifyContent: 'center', gap: 16, padding: 24 }, header: { gap: 16, padding: 16, paddingTop: 24 }, title: { fontSize: 26, lineHeight: 32, fontWeight: '700' }, controls: { gap: 8, paddingHorizontal: 16 }, search: { minHeight: 48, borderWidth: 1, borderRadius: 16, paddingHorizontal: 16, fontSize: 16 }, chips: { gap: 8 }, assembled: { flex: 1, minHeight: 420, alignItems: 'center', justifyContent: 'center', padding: 16 }, hint: { position: 'absolute', bottom: 48, paddingHorizontal: 20, minHeight: 48, justifyContent: 'center', borderRadius: 999 }, hintText: { fontSize: 14, fontWeight: '600' }, reassemble: { position: 'absolute', right: 16, bottom: 20 }, sheetContent: { paddingBottom: 24, gap: 10 }, sheetTitle: { fontSize: 26, lineHeight: 32, fontWeight: '700' }, analogy: { fontSize: 16, lineHeight: 24, fontStyle: 'italic', marginBottom: 8 }, section: { gap: 4 }, sectionTitle: { fontSize: 17, lineHeight: 24, fontWeight: '600' }, body: { fontSize: 16, lineHeight: 24 }, bullet: { fontSize: 16, lineHeight: 24 }, meta: { flexDirection: 'row', gap: 24, marginVertical: 8 }, metaLabel: { fontSize: 12, lineHeight: 16, marginBottom: 4 }, related: { flexDirection: 'row', flexWrap: 'wrap', gap: 8 } });
