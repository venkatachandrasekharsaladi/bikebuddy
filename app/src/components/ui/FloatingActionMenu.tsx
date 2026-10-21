import React, { useState } from 'react';
import { Pressable, StyleSheet, Text, View } from 'react-native';
import { useTheme } from '../../theme/useTheme';
type Action = { label: string; onPress: () => void };
export function FloatingActionMenu({ actions, label = 'Quick actions' }: { actions: Action[]; label?: string }) {
  const [open, setOpen] = useState(false);
  const theme = useTheme();
  return <View pointerEvents="box-none" style={styles.wrapper}>{open ? <View style={styles.actions}>{actions.map((action) => <Pressable key={action.label} accessibilityRole="button" accessibilityLabel={action.label} onPress={() => { setOpen(false); action.onPress(); }} style={[styles.action, { backgroundColor: theme.colors.surface, borderColor: theme.colors.border }]}><Text allowFontScaling style={[styles.actionText, { color: theme.colors.text, fontFamily: theme.fontFamily }]}>{action.label}</Text></Pressable>)}</View> : null}<Pressable accessibilityRole="button" accessibilityLabel={open ? 'Close quick actions' : label} accessibilityState={{ expanded: open }} onPress={() => setOpen((value) => !value)} style={[styles.fab, { backgroundColor: theme.colors.primary }]}><Text style={[styles.plus, { color: theme.colors.onPrimary }]}>{open ? '×' : '+'}</Text></Pressable></View>;
}
const styles = StyleSheet.create({ wrapper: { position: 'absolute', right: 20, bottom: 20, alignItems: 'flex-end' }, actions: { alignItems: 'flex-end', gap: 8, marginBottom: 12 }, action: { minHeight: 48, paddingHorizontal: 16, borderWidth: 1, borderRadius: 16, justifyContent: 'center' }, actionText: { fontSize: 14, lineHeight: 20, fontWeight: '600' }, fab: { width: 56, height: 56, borderRadius: 28, alignItems: 'center', justifyContent: 'center' }, plus: { fontSize: 32, lineHeight: 36, fontWeight: '300' } });
