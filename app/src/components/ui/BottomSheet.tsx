import React, { PropsWithChildren } from 'react';
import { StyleSheet, useWindowDimensions, View } from 'react-native';
import { Gesture, GestureDetector } from 'react-native-gesture-handler';
import Animated, { runOnJS, useAnimatedStyle, useSharedValue, withSpring, withTiming } from 'react-native-reanimated';
import { useTheme } from '../../theme/useTheme';

export function BottomSheet({ children, visible, onClose }: PropsWithChildren<{ visible: boolean; onClose: () => void }>) {
  const theme = useTheme();
  const { height } = useWindowDimensions();
  const closed = height;
  const half = height * 0.6;
  const full = height * 0.1;
  const translateY = useSharedValue(visible ? half : closed);
  const startY = useSharedValue(translateY.value);
  const gesture = Gesture.Pan().onStart(() => { startY.value = translateY.value; }).onUpdate((event) => { translateY.value = Math.max(full, Math.min(closed, startY.value + event.translationY)); }).onEnd((event) => {
    const destination = event.velocityY > 700 || translateY.value > height * 0.72 ? closed : translateY.value < height * 0.35 ? full : half;
    translateY.value = withSpring(destination, theme.motion.spring, (finished) => { if (finished && destination === closed) runOnJS(onClose)(); });
  });
  const sheetStyle = useAnimatedStyle(() => ({ transform: [{ translateY: visible ? translateY.value : withTiming(closed, { duration: theme.motion.standard }) }] }));
  if (!visible && translateY.value >= closed) return null;
  return <GestureDetector gesture={gesture}><Animated.View accessibilityViewIsModal accessibilityRole="dialog" style={[styles.sheet, { backgroundColor: theme.colors.surface, borderColor: theme.colors.border }, sheetStyle]}><View style={[styles.handle, { backgroundColor: theme.colors.textMuted }]} />{children}</Animated.View></GestureDetector>;
}
const styles = StyleSheet.create({ sheet: { position: 'absolute', left: 0, right: 0, bottom: 0, minHeight: '40%', borderTopLeftRadius: 28, borderTopRightRadius: 28, borderWidth: 1, padding: 20, shadowColor: '#000', shadowOpacity: 0.25, shadowRadius: 16, shadowOffset: { width: 0, height: -4 }, elevation: 12 }, handle: { alignSelf: 'center', width: 48, height: 4, borderRadius: 999, marginBottom: 16 } });
