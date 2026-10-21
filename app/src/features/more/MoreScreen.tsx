import React from 'react';
import { ScrollView, StyleSheet } from 'react-native';
import { ListRow } from '../../components/ui';
import { useTheme } from '../../theme/useTheme';

export function MoreScreen({ onStations, onMods }: { onStations: () => void; onMods: () => void }) {
  const theme = useTheme();
  return <ScrollView contentContainerStyle={[styles.page, { backgroundColor: theme.colors.background }]}><ListRow title="Nearby fuel stations" subtitle="Find an open station and navigate there." onPress={onStations} /><ListRow title="Modifications" subtitle="Compare useful changes for your bike." onPress={onMods} /><ListRow title="Settings" subtitle="Theme, reminders, and app preferences." onPress={() => undefined} /></ScrollView>;
}
const styles = StyleSheet.create({ page: { padding: 16, gap: 8, paddingBottom: 100 } });
