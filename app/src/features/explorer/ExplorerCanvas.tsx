import React, { memo, useEffect, useMemo, useState } from 'react';
import { Pressable, StyleSheet, View, useWindowDimensions } from 'react-native';
import { Gesture, GestureDetector } from 'react-native-gesture-handler';
import Animated, { useAnimatedStyle, useReducedMotion, useSharedValue, withSpring, withTiming } from 'react-native-reanimated';
import { BikeComponent } from '../../types';
import { useTheme } from '../../theme/useTheme';
import { getPositions } from './positions';
import { PartArtwork } from './artwork';

type Props = { components: BikeComponent[]; exploded: boolean; selectedId?: string; onSelect: (component: BikeComponent) => void; resetSignal: number };

export const ExplorerCanvas = memo(function ExplorerCanvas({ components, exploded, selectedId, onSelect, resetSignal }: Props) {
  const theme = useTheme();
  const reducedMotion = useReducedMotion();
  const { width, height } = useWindowDimensions();
  const positions = useMemo(() => getPositions(components), [components]);
  const [canvasSize] = useState(Math.min(width * 1.5, 620));
  const translateX = useSharedValue(0);
  const translateY = useSharedValue(0);
  const scale = useSharedValue(1);
  const start = { x: useSharedValue(0), y: useSharedValue(0), scale: useSharedValue(1) };
  useEffect(() => {
    translateX.value = reducedMotion ? 0 : withSpring(0, theme.motion.spring);
    translateY.value = reducedMotion ? 0 : withSpring(0, theme.motion.spring);
    scale.value = reducedMotion ? 1 : withSpring(1, theme.motion.spring);
  }, [reducedMotion, resetSignal, scale, theme.motion.spring, translateX, translateY]);
  const pan = Gesture.Pan().onStart(() => { start.x.value = translateX.value; start.y.value = translateY.value; }).onUpdate((event) => { translateX.value = start.x.value + event.translationX; translateY.value = start.y.value + event.translationY; });
  const pinch = Gesture.Pinch().onStart(() => { start.scale.value = scale.value; }).onUpdate((event) => { scale.value = Math.max(0.65, Math.min(2.2, start.scale.value * event.scale)); });
  const doubleTap = Gesture.Tap().numberOfTaps(2).onEnd(() => { translateX.value = reducedMotion ? 0 : withSpring(0, theme.motion.spring); translateY.value = reducedMotion ? 0 : withSpring(0, theme.motion.spring); scale.value = reducedMotion ? 1 : withSpring(1, theme.motion.spring); });
  const composed = Gesture.Simultaneous(Gesture.Simultaneous(pan, pinch), doubleTap);
  const cameraStyle = useAnimatedStyle(() => ({ transform: [{ translateX: translateX.value }, { translateY: translateY.value }, { scale: scale.value }] }));
  return <View style={[styles.viewport, { height: height * 0.62, backgroundColor: theme.colors.background }]}><GestureDetector gesture={composed}><Animated.View style={[styles.canvas, { width: canvasSize, height: canvasSize }, cameraStyle]}>{components.map((component, index) => <AnimatedPart key={component.id} component={component} index={index} total={components.length} position={positions[component.id]} exploded={exploded} selected={component.id === selectedId} onSelect={onSelect} size={Math.max(48, canvasSize * 0.12)} />)}</Animated.View></GestureDetector><View pointerEvents="none" style={[styles.miniMap, { backgroundColor: theme.colors.surface, borderColor: theme.colors.border }]}>{components.slice(0, 12).map((component, index) => <View key={component.id} style={[styles.miniDot, { left: `${12 + ((index * 19) % 72)}%`, top: `${18 + ((index * 31) % 64)}%`, backgroundColor: component.id === selectedId ? theme.colors.primary : theme.colors.textMuted }]} />)}</View></View>;
});

const AnimatedPart = memo(function AnimatedPart({ component, index, total, position, exploded, selected, onSelect, size }: { component: BikeComponent; index: number; total: number; position: { anchor: { x: number; y: number }; spread: { x: number; y: number } }; exploded: boolean; selected: boolean; onSelect: (component: BikeComponent) => void; size: number }) {
  const { width } = useWindowDimensions();
  const reducedMotion = useReducedMotion();
  const x = useSharedValue(position.anchor.x);
  const y = useSharedValue(position.anchor.y);
  useEffect(() => {
    x.value = reducedMotion ? (exploded ? position.spread.x : position.anchor.x) : withTiming(exploded ? position.spread.x : position.anchor.x, { duration: 180 });
    y.value = reducedMotion ? (exploded ? position.spread.y : position.anchor.y) : withTiming(exploded ? position.spread.y : position.anchor.y, { duration: 180 });
  }, [exploded, position.anchor.x, position.anchor.y, position.spread.x, position.spread.y, reducedMotion, x, y]);
  const style = useAnimatedStyle(() => ({ left: `${x.value}%`, top: `${y.value}%`, transform: [{ translateX: -size / 2 }, { translateY: -size / 2 }] }));
  return <Animated.View style={[styles.part, { width: size, height: size }, style]}><Pressable accessibilityRole="button" accessibilityLabel={`Explore ${component.name}`} accessibilityState={{ selected }} onPress={() => onSelect(component)}><PartArtwork component={component} selected={selected} size={size} /></Pressable></Animated.View>;
});

const styles = StyleSheet.create({ viewport: { overflow: 'hidden', alignItems: 'center', justifyContent: 'center' }, canvas: { position: 'absolute' }, part: { position: 'absolute' }, miniMap: { position: 'absolute', left: 16, bottom: 16, width: 72, height: 52, borderRadius: 12, borderWidth: 1, overflow: 'hidden' }, miniDot: { position: 'absolute', width: 4, height: 4, borderRadius: 2 } });
