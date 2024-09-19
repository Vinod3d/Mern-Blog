/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable no-unused-vars */
import { Spinner } from 'flowbite-react';
import { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Badge } from "@/components/ui/badge"
import { Separator } from '@/components/ui/separator';
import CommentSection from '../components/CommentSection';
import PostCard from '../components/PostCard';

const PostPage = () => {
  const { postSlug } = useParams();
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  const [post, setPost] = useState(null);
  const [author, setAuthor] = useState(null)
  const [recentPosts, setRecentPosts] = useState(null);
  
  useEffect(() => {
    const fetchPost = async () => {
      try {
        setLoading(true);
        const res = await fetch(`/api/v1/posts/getposts?slug=${postSlug}`);
        const data = await res.json();

        if (!res.ok) {
          setError(true);
          setLoading(false);
          return;
        }
        if (res.ok) {
          setPost(data.posts[0]);
          setLoading(false);
          setError(false);
        }
      } catch (error) {
        setLoading(false);
        setError(true);
      }
    };
    fetchPost();
  }, [postSlug]);

  useEffect(() => {
    try {
      const fetchRecentPosts = async () => {
        const res = await fetch(`/api/v1/posts/getposts?limit=3`);
        const data = await res.json();
        if (res.ok) {
          setRecentPosts(data.posts);
        }
      };
      fetchRecentPosts();
    } catch (error) {
      console.log(error.message);
    }
  }, []);

  useEffect(() => {
    if (!post?.userId) return; // Exit if userId is not available
  
    const fetchAuthor = async () => {
      try {
        const res = await fetch(`/api/v1/users/${post.userId}`);
        const data = await res.json();

        if (res.ok) {
          setAuthor(data);
        } else {
          console.error('Failed to fetch author:', data);
        }
      } catch (error) {
        console.error('Fetch error:', error.message);
      }
    };
  
    fetchAuthor();
  }, [post]);

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <Spinner size="xl" />
      </div>
    );
  }

  return (
    <main className="flex flex-col  max-w-6xl mx-auto min-h-screen px-4 py-12 post-content">
      <header className="mb-8">
        <h1 className="text-4xl font-bold tracking-tight lg:text-5xl mb-4">
          {post && post?.title}
        </h1>
        <p className="text-muted-foreground">
          Published on {post && new Date(post?.createdAt).toLocaleDateString()}
        </p>
      </header>

      {/* Author Section */}
      <div className="flex items-center mb-8">
        <Avatar className="h-10 w-10 mr-4">
          <img src={author && author.profilePicture} alt="Author" />
          <AvatarFallback>VC</AvatarFallback>
        </Avatar>
        <div>
          <p className="font-semibold">{author?.name}</p>
          <p className="text-sm text-muted-foreground">FullStack Developer</p>
        </div>
      </div>

      {/* Cover Image */}
      <img
        src={post && post?.image}
        alt="Blog cover image"
        width="100%"
        height={400}
        className="rounded-lg mb-8 object-cover"
      />

      {/* Post Content */}
      <section className="prose prose-lg dark:prose-invert max-w-none mb-8">
        <div dangerouslySetInnerHTML={{ __html: post && post?.content }}></div>
      </section>

      {/* Tags Section */}
      <div className="mb-8">
        <h3 className="text-lg font-semibold mb-4">Tags</h3>
        <div className="flex flex-wrap gap-2">
            <Badge variant="secondary">{post.category}</Badge>
        </div>
      </div>

      <Separator className="my-8" />



      {/* Comment Section */}
      <CommentSection postId={post?._id} />

      {/* Recent Posts */}
      <section className="w-full max-w-6xl mx-auto my-10">
        <h2 className="text-2xl font-semibold text-center mb-6">Recent Articles</h2>
        <div className="flex flex-wrap justify-center gap-8">
          {recentPosts &&
            recentPosts.map(post => (
              <PostCard key={post?._id} post={post} />
            ))}
        </div>
      </section>

      <Link
        to={`/search`}
        className="text-teal-500 hover:underline text-lg font-semibold mt-6"
      >
        View all posts
      </Link>
    </main>
  );
};

export default PostPage;
