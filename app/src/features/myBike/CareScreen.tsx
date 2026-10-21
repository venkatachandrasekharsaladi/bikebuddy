import React, { useMemo, useState } from 'react';
import { Alert, ScrollView, StyleSheet, Text, View } from 'react-native';
import * as Haptics from 'expo-haptics';
import { Button, Card, Chip, Input, ListRow, StatusBadge } from '../../components/ui';
import { Task } from '../../types';
import { useTaskStore } from '../../store';
import { useTheme } from '../../theme/useTheme';
import { scheduleDailyReminder } from '../../services/reminderService';

export function CareScreen({ tasks, odometerKm, onBack }: { tasks: Task[]; odometerKm: number; onBack: () => void }) {
  const theme = useTheme();
  const complete = useTaskStore((state) => state.complete);
  const [detail, setDetail] = useState<Task>();
  const [custom, setCustom] = useState(false);
  const [reminder, setReminder] = useState(false);
  const streak = useMemo(() => tasks.filter((task) => task.status === 'on-time').length, [tasks]);
  if (custom) return <View style={styles.page}><Button label="Back to checklist" variant="ghost" onPress={() => setCustom(false)} /><Input label="Task name" placeholder="Clean mirrors" /><Input label="Repeat every (days)" keyboardType="number-pad" placeholder="30" /><Button label="Add custom task" onPress={() => setCustom(false)} /></View>;
  if (detail) return <ScrollView contentContainerStyle={styles.page}><Button label="Back to checklist" variant="ghost" onPress={() => setDetail(undefined)} /><Text style={[styles.title, { color: theme.colors.text, fontFamily: theme.fontFamily }]}>{detail.name}</Text><Text style={[styles.copy, { color: theme.colors.textMuted, fontFamily: theme.fontFamily }]}>{detail.description}</Text><Text style={[styles.section, { color: theme.colors.text, fontFamily: theme.fontFamily }]}>Tools</Text><View style={styles.chips}>{detail.tools.map((tool) => <Chip key={tool} label={tool} />)}</View>{detail.steps.map((step, index) => <Card key={step.title}><Text style={[styles.step, { color: theme.colors.text, fontFamily: theme.fontFamily }]}>{index + 1}. {step.title}</Text><Text style={[styles.copy, { color: theme.colors.textMuted, fontFamily: theme.fontFamily }]}>{step.detail}</Text></Card>)}<Button label="Mark as done" onPress={() => { complete(detail.id, odometerKm); void Haptics.notificationAsync(Haptics.NotificationFeedbackType.Success); setDetail(undefined); }} /></ScrollView>;
  return <ScrollView contentContainerStyle={styles.page}><Button label="Back to My Bike" variant="ghost" onPress={onBack} /><Card><Text style={[styles.title, { color: theme.colors.text, fontFamily: theme.fontFamily }]}>🔥 {streak}-day care streak</Text><Text style={[styles.copy, { color: theme.colors.textMuted, fontFamily: theme.fontFamily }]}>Small checks help your bike stay ready.</Text></Card><Button label="Add custom task" variant="secondary" onPress={() => setCustom(true)} /><Button label={reminder ? 'Daily reminder on' : 'Turn on daily reminder'} variant="ghost" onPress={() => { void scheduleDailyReminder().then(() => setReminder(true)).catch(() => Alert.alert('Reminder not enabled', 'Please allow notifications in your phone settings.')); }} />{tasks.map((task) => <ListRow key={task.id} title={task.name} subtitle={task.intervalDays ? `Every ${task.intervalDays} days` : `Every ${task.intervalKm} km`} onPress={() => setDetail(task)} trailing={<StatusBadge status={task.status} />} />)}</ScrollView>;
}
const styles = StyleSheet.create({ page: { padding: 16, gap: 16, paddingBottom: 48 }, title: { fontSize: 26, lineHeight: 32, fontWeight: '700' }, copy: { fontSize: 16, lineHeight: 24 }, section: { fontSize: 17, lineHeight: 24, fontWeight: '600' }, chips: { flexDirection: 'row', flexWrap: 'wrap', gap: 8 }, step: { fontSize: 17, lineHeight: 24, fontWeight: '600' } });
