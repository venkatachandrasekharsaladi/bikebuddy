import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, Pressable } from 'react-native';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { useState } from 'react';
import { DesignGallery } from './src/screens/DesignGallery';
import { ExplorerScreen } from './src/features/explorer/ExplorerScreen';
import { MyBikeScreen } from './src/features/myBike/MyBikeScreen';
import { CommunityScreen } from './src/features/community/CommunityScreen';
import { StationsScreen } from './src/features/stations/StationsScreen';
import { ModsScreen } from './src/features/mods/ModsScreen';
import { MoreScreen } from './src/features/more/MoreScreen';
import { FuelScreen } from './src/features/myBike/FuelScreen';
import { useBikeStore } from './src/store';
import { ThemeProvider } from './src/theme/ThemeProvider';
import { useTheme } from './src/theme/useTheme';
import { BrandHeader } from './src/components/BrandHeader';

export default function App() {
  return <ThemeProvider><BikeBuddyRoot /></ThemeProvider>;
}

function BikeBuddyRoot() {
  const theme = useTheme();
  const [galleryVisible, setGalleryVisible] = useState(false);
  const [tab, setTab] = useState<'explore' | 'myBike' | 'fuel' | 'community' | 'stations' | 'mods'>('explore');
  const [profileVisible, setProfileVisible] = useState(false);
  const activeBikeId = useBikeStore((state) => state.activeBikeId);
  const content = profileVisible ? <MoreScreen profileOnly /> : tab === 'explore' ? <ExplorerScreen /> : tab === 'myBike' ? <MyBikeScreen /> : tab === 'fuel' ? activeBikeId ? <FuelScreen bikeId={activeBikeId} onBack={() => setTab('myBike')} /> : <MyBikeScreen /> : tab === 'community' ? <CommunityScreen /> : tab === 'stations' ? <StationsScreen /> : <ModsScreen />;
  const tabs = [['explore', 'Explore'], ['myBike', 'My Bike'], ['fuel', 'Fuel'], ['community', 'Community'], ['stations', 'PFS'], ['mods', 'Mods']] as const;
  return <GestureHandlerRootView style={{ flex: 1 }}><View style={[styles.container, { backgroundColor: theme.colors.background }]}>{galleryVisible ? <DesignGallery /> : <><BrandHeader title={profileVisible ? 'Profile' : tab === 'myBike' ? 'My Bike' : tab === 'stations' ? 'PFS' : tab === 'mods' ? 'Mods' : 'BikeBuddy'} subtitle={!profileVisible && tab === 'explore' ? 'EXPLORE' : undefined} onProfile={() => setProfileVisible((value) => !value)} /><View style={styles.content}>{content}</View></>}<View style={[styles.tabs, { backgroundColor: theme.colors.surface, borderColor: theme.colors.border }]}>{tabs.map(([key, label]) => <Pressable key={key} accessibilityRole="tab" accessibilityLabel={label} accessibilityState={{ selected: !profileVisible && tab === key }} onPress={() => { setProfileVisible(false); setTab(key); }} style={styles.tab}><Text style={[styles.tabIcon, { color: !profileVisible && tab === key ? theme.colors.primary : theme.colors.textMuted }]}>{key === 'explore' ? '◎' : key === 'myBike' ? '♧' : key === 'fuel' ? '▥' : key === 'community' ? '♧' : key === 'stations' ? '⌖' : '✦'}</Text><Text numberOfLines={1} style={{ color: !profileVisible && tab === key ? theme.colors.primary : theme.colors.textMuted, fontSize: 11, fontWeight: '600' }}>{label}</Text></Pressable>)}</View><Pressable accessibilityRole="button" accessibilityLabel="Open design gallery" onLongPress={() => setGalleryVisible(true)} style={styles.galleryHotspot}><Text style={{ color: theme.colors.textMuted }}>Hold for gallery</Text></Pressable><StatusBar style={theme.scheme === 'dark' ? 'light' : 'dark'} /></View></GestureHandlerRootView>;
}

const styles = StyleSheet.create({ container: { flex: 1 }, content: { flex: 1 }, tabs: { position: 'absolute', left: 12, right: 12, bottom: 12, minHeight: 64, borderWidth: 1, borderRadius: 20, flexDirection: 'row', paddingVertical: 4 }, tab: { flex: 1, minHeight: 48, alignItems: 'center', justifyContent: 'center', gap: 2 }, tabIcon: { fontSize: 20, lineHeight: 22 }, galleryHotspot: { position: 'absolute', top: 4, right: 8, minHeight: 48, justifyContent: 'center', paddingHorizontal: 8, opacity: 0.25 } });
