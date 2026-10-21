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

export default function App() {
  return <ThemeProvider><BikeBuddyRoot /></ThemeProvider>;
}

function BikeBuddyRoot() {
  const theme = useTheme();
  const [galleryVisible, setGalleryVisible] = useState(false);
  const [tab, setTab] = useState<'explore' | 'myBike' | 'fuel' | 'community' | 'more'>('explore');
  const [moreView, setMoreView] = useState<'hub' | 'stations' | 'mods'>('hub');
  const activeBikeId = useBikeStore((state) => state.activeBikeId);
  const content = tab === 'explore' ? <ExplorerScreen /> : tab === 'myBike' ? <MyBikeScreen /> : tab === 'fuel' ? activeBikeId ? <FuelScreen bikeId={activeBikeId} onBack={() => setTab('myBike')} /> : <MyBikeScreen /> : tab === 'community' ? <CommunityScreen /> : moreView === 'stations' ? <StationsScreen /> : moreView === 'mods' ? <ModsScreen /> : <MoreScreen onStations={() => setMoreView('stations')} onMods={() => setMoreView('mods')} />;
  const tabs = [['explore', 'Explore'], ['myBike', 'My Bike'], ['fuel', 'Fuel'], ['community', 'Community'], ['more', 'More']] as const;
  return <GestureHandlerRootView style={{ flex: 1 }}><View style={[styles.container, { backgroundColor: theme.colors.background }]}>{galleryVisible ? <DesignGallery /> : content}<View style={[styles.tabs, { backgroundColor: theme.colors.surface, borderColor: theme.colors.border }]}>{tabs.map(([key, label]) => <Pressable key={key} accessibilityRole="tab" accessibilityLabel={label} accessibilityState={{ selected: tab === key }} onPress={() => { setTab(key); if (key !== 'more') setMoreView('hub'); }} style={styles.tab}><Text numberOfLines={1} style={{ color: tab === key ? theme.colors.primary : theme.colors.textMuted, fontSize: 12 }}>{label}</Text></Pressable>)}</View><Pressable accessibilityRole="button" accessibilityLabel="Open design gallery" onLongPress={() => setGalleryVisible(true)} style={styles.galleryHotspot}><Text style={{ color: theme.colors.textMuted }}>Hold for gallery</Text></Pressable><StatusBar style={theme.scheme === 'dark' ? 'light' : 'dark'} /></View></GestureHandlerRootView>;
}

const styles = StyleSheet.create({ container: { flex: 1 }, tabs: { position: 'absolute', left: 16, right: 16, bottom: 16, minHeight: 56, borderWidth: 1, borderRadius: 20, flexDirection: 'row' }, tab: { flex: 1, minHeight: 48, alignItems: 'center', justifyContent: 'center' }, galleryHotspot: { position: 'absolute', top: 4, right: 8, minHeight: 48, justifyContent: 'center', paddingHorizontal: 8, opacity: 0.35 } });
