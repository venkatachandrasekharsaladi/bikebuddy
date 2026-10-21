import React, { useEffect, useMemo, useState } from 'react';
import { ActivityIndicator, Alert, FlatList, Image, ScrollView, StyleSheet, Text, View } from 'react-native';
import * as ImagePicker from 'expo-image-picker';
import { Button, Card, Chip, EmptyState, Input, ListRow } from '../../components/ui';
import { getComments, getPosts } from '../../services/communityService';
import { Comment, Post } from '../../types';
import { useTheme } from '../../theme/useTheme';

type Section = 'Feed' | 'Groups' | 'Events' | 'Q&A' | 'Profile';
export function CommunityScreen() {
  const theme = useTheme();
  const [section, setSection] = useState<Section>('Feed');
  const [posts, setPosts] = useState<Post[]>([]);
  const [liked, setLiked] = useState<string[]>([]);
  const [composer, setComposer] = useState(false);
  const [selectedPost, setSelectedPost] = useState<Post>();
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  useEffect(() => { void getPosts().then(setPosts).catch(() => setError(true)).finally(() => setLoading(false)); }, []);
  if (composer) return <Composer onCancel={() => setComposer(false)} onPost={(post) => { setPosts((items) => [post, ...items]); setComposer(false); }} />;
  if (selectedPost) return <PostDetail post={selectedPost} onBack={() => setSelectedPost(undefined)} />;
  const renderPost = ({ item: post }: { item: Post }) => <Card><Text style={[styles.author, { color: theme.colors.text, fontFamily: theme.fontFamily }]}>{post.author} · {post.group}</Text><Text style={[styles.body, { color: theme.colors.textMuted, fontFamily: theme.fontFamily }]}>{post.text}</Text>{post.photoUri ? <Image source={{ uri: post.photoUri }} style={styles.photo} /> : null}<View style={styles.actions}><Button label={`${post.likeCount + (liked.includes(post.id) ? 1 : 0)} likes`} variant="ghost" onPress={() => setLiked((items) => items.includes(post.id) ? items.filter((id) => id !== post.id) : [...items, post.id])} /><Button label={`${post.commentCount} comments`} variant="ghost" onPress={() => setSelectedPost(post)} /></View></Card>;
  return <View style={[styles.screen, { backgroundColor: theme.colors.background }]}><View style={styles.header}><Text style={[styles.title, { color: theme.colors.text, fontFamily: theme.fontFamily }]}>Community</Text><ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={styles.tabs}>{(['Feed', 'Groups', 'Events', 'Q&A', 'Profile'] as Section[]).map((item) => <Chip key={item} label={item} selected={section === item} onPress={() => setSection(item)} />)}</ScrollView></View>{section === 'Feed' ? loading ? <View style={styles.center}><ActivityIndicator color={theme.colors.primary} accessibilityLabel="Loading community posts" /></View> : error ? <EmptyState title="Community is offline" message="We could not load posts. Please try again later." actionLabel="Retry" onAction={() => { setLoading(true); setError(false); void getPosts().then(setPosts).catch(() => setError(true)).finally(() => setLoading(false)); }} /> : <FlatList data={posts} renderItem={renderPost} keyExtractor={(post) => post.id} contentContainerStyle={styles.page} initialNumToRender={5} windowSize={7} ListEmptyComponent={<EmptyState title="No posts yet" message="Start the conversation with a useful bike tip." />} ListFooterComponent={<Button label="New post" onPress={() => setComposer(true)} />} /> : <SectionContent section={section} onBack={() => setSection('Feed')} />}</View>;
}
function SectionContent({ section, onBack }: { section: Section; onBack: () => void }) {
  const theme = useTheme();
  if (section === 'Profile') return <ScrollView contentContainerStyle={styles.page}><Card><Text style={[styles.title, { color: theme.colors.text, fontFamily: theme.fontFamily }]}>Asha Mehta</Text><Text style={[styles.body, { color: theme.colors.textMuted }]}>Mumbai · learning one bike part at a time.</Text></Card><ListRow title="My posts" subtitle="Your shared tips and questions" /><ListRow title="Saved groups" subtitle="Royal Enfield Club, New Riders" /></ScrollView>;
  const content = section === 'Groups' ? ['Mumbai Riders', 'Royal Enfield Club', 'New Riders'] : section === 'Events' ? ['Sunday sunrise ride', 'City service workshop', 'Beginner bike walk'] : ['How often should I check chain tension?', 'Which tyre pressure is safe for city rides?', 'What should I carry on a long ride?'];
  return <ScrollView contentContainerStyle={styles.page}><Button label="Back to feed" variant="ghost" onPress={onBack} />{content.map((item) => <ListRow key={item} title={item} subtitle={section === 'Groups' ? 'Join riders near you' : 'Tap to read more'} onPress={() => Alert.alert(item, 'This mock community page is ready for real data later.')} />)}</ScrollView>;
}
function Composer({ onCancel, onPost }: { onCancel: () => void; onPost: (post: Post) => void }) {
  const theme = useTheme(); const [text, setText] = useState(''); const [photoUri, setPhotoUri] = useState<string>();
  const choosePhoto = async () => { const result = await ImagePicker.launchImageLibraryAsync({ mediaTypes: ['images'], quality: 0.8 }); if (!result.canceled) setPhotoUri(result.assets[0].uri); };
  return <ScrollView contentContainerStyle={styles.page}><Button label="Cancel" variant="ghost" onPress={onCancel} /><Text style={[styles.title, { color: theme.colors.text, fontFamily: theme.fontFamily }]}>New post</Text><Input label="Share something useful" value={text} onChangeText={setText} multiline placeholder="A simple bike tip..." /><Button label={photoUri ? 'Photo added' : 'Add photo'} variant="secondary" onPress={() => void choosePhoto()} />{photoUri ? <Image source={{ uri: photoUri }} style={styles.photo} /> : null}<Button label="Post" onPress={() => { if (!text.trim()) { Alert.alert('Add a few words', 'Tell riders what you learned.'); return; } onPost({ id: `post-${Date.now()}`, author: 'Asha Mehta', text: text.trim(), photoUri, likeCount: 0, commentCount: 0, group: 'New Riders', createdAt: new Date().toISOString() }); }} /></ScrollView>;
}
function PostDetail({ post, onBack }: { post: Post; onBack: () => void }) {
  const theme = useTheme(); const [comments, setComments] = useState<Comment[]>([]);
  useEffect(() => { void getComments(post.id).then(setComments); }, [post.id]);
  return <ScrollView contentContainerStyle={styles.page}><Button label="Back to feed" variant="ghost" onPress={onBack} /><Card><Text style={[styles.author, { color: theme.colors.text }]}>{post.author}</Text><Text style={[styles.body, { color: theme.colors.textMuted }]}>{post.text}</Text></Card><Text style={[styles.section, { color: theme.colors.text }]}>Comments</Text>{comments.length ? comments.map((comment) => <ListRow key={comment.id} title={comment.author} subtitle={comment.text} />) : <EmptyState title="No comments yet" message="Be the first rider to reply." />}</ScrollView>;
}
const styles = StyleSheet.create({ screen: { flex: 1 }, header: { padding: 16, gap: 12 }, page: { padding: 16, gap: 16, paddingBottom: 100 }, tabs: { gap: 8 }, center: { flex: 1, alignItems: 'center', justifyContent: 'center' }, title: { fontSize: 26, lineHeight: 32, fontWeight: '700' }, author: { fontSize: 14, lineHeight: 20, fontWeight: '600' }, body: { fontSize: 16, lineHeight: 24, marginTop: 8 }, section: { fontSize: 17, lineHeight: 24, fontWeight: '600' }, actions: { flexDirection: 'row', marginTop: 8 }, photo: { width: '100%', height: 180, borderRadius: 16, marginTop: 12 } });
