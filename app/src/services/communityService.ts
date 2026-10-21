import { Comment, Post } from '../types';
import posts from '../data/posts.json';
import comments from '../data/comments.json';
export async function getPosts(): Promise<Post[]> { return posts as Post[]; }
export async function getComments(postId: string): Promise<Comment[]> { return (comments as Comment[]).filter((comment) => comment.postId === postId); }
export async function createPost(post: Post): Promise<Post> { return post; }
